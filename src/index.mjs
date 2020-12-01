import { readSync, statSync, openSync, createReadStream } from "fs";
import flatbuffers from "./lib/flatbuffers.mjs";
import { required } from "./lib/required.mjs";
import schema from "./class/OMM.schema.mjs";
import { OMM, OMMCOLLECTION, MPE, referenceFrame, timeSystem, meanElementTheory, ephemerisType } from "./class/OMM.flatbuffer.class.js";
import { numCheck, readOMMXML, readOMMJSON, readOMMCSV, readTLE } from "./parsers/omm.converter.mjs";
import { Buffer } from "buffer";

const readFB = (input = required`input`, schema = required`schema`, fbClass = required`class`, fbCollection) => {
  let schemaKeys = Object.keys(schema.definitions[fbClass.name].properties);
  let results = [];
  if (Array.isArray(input)) {
    results = input.map((fb) => readFB(fb, schema, fbClass, fbCollection)[0]);
  } else {
    let buf = new flatbuffers.ByteBuffer(input);

    if (fbCollection) {
      let SCOLLECTION = fbCollection[`getRootAs${fbCollection.name}`](buf);
      for (let i = 0; i < SCOLLECTION.RECORDSLength(); i++) {
        let _result = {};//SCOLLECTION.RECORDS(i);
        for (let key in schemaKeys) {
          let sK = schemaKeys[key];
          _result[sK] = null;
          if (typeof SCOLLECTION.RECORDS(i)[sK] === "function") {
            Object.defineProperty(_result, sK, {
              get() {
                return SCOLLECTION.RECORDS(i)[sK]();
              },
            });
          }
        }
        results.push(_result);
      }
    } else {
      try {
        let SFBDATA = fbClass[`getSizePrefixedRootAs${fbClass.name}`](buf);
        let result = {};
        for (let key in schemaKeys) {
          let sK = schemaKeys[key];
          if (typeof SFBDATA[sK] === "function") {
            Object.defineProperty(result, sK, {
              enumerable: true,
              get() {
                return SFBDATA[sK]();
              },
            });
          }
        }
        results.push(result);
      } catch (e) {
        console.log(e);
      }
    }
  }
  return results;
};

const transformType = (builder, _value, type) => {
  switch (type) {
    case "number":
      _value = +_value;
      break;
    case "string":
      _value = builder.createString(new Uint8Array(Buffer.from(typeof _value === "string" ? _value : _value.toString())));
  }
  return _value;
};

const createFB = (jsonFBDATA = required`jsonFBDATA`, schema = required`schema`, fbClass = required`fbClass`) => {
  let returnArray;

  if (Array.isArray(jsonFBDATA)) {
    returnArray = jsonFBDATA.map((fbdata) => createFB(fbdata, schema, fbClass));
  } else {
    let schemaKeys = Object.keys(schema.definitions[fbClass.name].properties);
    let builder = new flatbuffers.Builder(0);
    let _jsonFBDATA = {};
    for (let k = 0; k < schemaKeys.length; k++) {
      let sK = schemaKeys[k];
      let { type } = schema.definitions[fbClass.name].properties[sK];
      if (jsonFBDATA[sK] ?? false) {
        _jsonFBDATA[sK] = transformType(builder, jsonFBDATA[sK], type);
      }
    }
    fbClass[`start${fbClass.name}`](builder);

    for (let key in _jsonFBDATA) {
      if (schemaKeys.indexOf(key) === -1) continue;
      let addKey = `add${key}`;
      fbClass[addKey](builder, _jsonFBDATA[key]);
    }

    var BuiltFBDATA = fbClass[`end${fbClass.name}`](builder);
    fbClass[`finishSizePrefixed${fbClass.name}Buffer`](builder, BuiltFBDATA);

    let uint8 = builder.asUint8Array();
    return uint8;
  }
  return Buffer.concat(
    returnArray,
    returnArray.map((n) => n.length).reduce((a, b) => a + b)
  );
};

const readFBFile = (fileData, schema, fbClass, fbCollection) => {
  let returnArray = [];
  /*reset for first read*/
  let tempBuff, startPos, size, lastPos = 0;

  const resetTemp = () => {
    tempBuff = Buffer.from("");
    startPos = -1;
    size = -1;
  }

  resetTemp();

  let totalHeaderSize = flatbuffers.SIZE_PREFIX_LENGTH + flatbuffers.FILE_IDENTIFIER_LENGTH;

  fileData = Buffer.from(fileData);
  for (let d = 0; d < fileData.length; d++) {
    tempBuff = Buffer.concat([tempBuff, fileData.slice(d, d + 1)]);

    let idIndex = tempBuff.indexOf("$OMM");

    if (tempBuff.length >= totalHeaderSize && idIndex > -1 && startPos === -1) {
      let id = tempBuff.slice(idIndex, idIndex + flatbuffers.FILE_IDENTIFIER_LENGTH);
      startPos = idIndex - totalHeaderSize;
      size = tempBuff.slice(startPos, idIndex).readInt32LE(0);
    } else if (startPos > -1 && tempBuff.length - startPos === size + 1) {
      /*start over*/
      returnArray.push(tempBuff.slice(startPos,));
      resetTemp();
    }
  }

  return readFB(returnArray, schema, fbClass, fbCollection);
};

const readOMM = async (data = required`data`, format = "flatbuffer") => {
  let formatters = {
    xml: readOMMXML,
    csv: readOMMCSV,
    json: readOMMJSON,
    tle: readTLE,
    flatbuffer: readFB,
    fb: readFB,
  };
  let formatter = formatters[format] || readFB;

  return formatter(data, schema, OMM, OMMCOLLECTION);
};

export { readFB, createFB, readFBFile, readOMM, numCheck, readOMMXML, readOMMJSON, readOMMCSV, readTLE };
