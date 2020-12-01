import { readSync, statSync, openSync, createReadStream } from "fs";
import flatbuffers from "./lib/flatbuffers.mjs";
import { required } from "./lib/required.mjs";
import schema from "./class/OMM.schema.mjs";
import { OMM, OMMCOLLECTION, MPE, referenceFrame, timeSystem, meanElementTheory, ephemerisType } from "./class/OMM.flatbuffer.class.js";
import { numCheck, readOMMXML, readOMMJSON, readOMMCSV, readTLE } from "./parsers/omm.converter.mjs";
import { Buffer } from "buffer";
import { wrapFlatBuffer } from "./lib/convert.flatbuffers.mjs";

const transformType = (builder, _value, type) => {
  switch (type) {
    case "number":
      _value = +_value;
      break;
    case "string":
      _value = builder.createString(new Uint8Array(Buffer.from(_value.toString())));
  }
  return _value;
};

const createFB = (jsonFBDATA = required`jsonFBDATA`, schema = required`schema`, fbClass = required`fbClass`, useCollection = false) => {
  let returnArray;

  if (useCollection) {

    let builder = new flatbuffers.Builder(0);

    let records = jsonFBDATA.map(intermediate => {
      let transformIntermediate = Object.assign({}, intermediate);
      for (let prop in transformIntermediate) {
        let { type } = schema.definitions[fbClass.name].properties[prop];
        transformIntermediate[prop] = transformType(builder, transformIntermediate[prop], type);
      }
      OMM.startOMM(builder);
      for (let prop in transformIntermediate) {
        OMM[`add${prop}`](builder, transformIntermediate[prop]);
      }
      let BuiltOMM = OMM.endOMM(builder)
      builder.finish(BuiltOMM);
      return BuiltOMM;
    });

    let OMMRECORDS = OMMCOLLECTION.createRECORDSVector(builder, records);

    OMMCOLLECTION.startOMMCOLLECTION(builder);

    OMMCOLLECTION.addRECORDS(builder, OMMRECORDS);

    let COLLECTION = OMMCOLLECTION.endOMMCOLLECTION(builder);

    builder.finish(COLLECTION);

    let buf = builder.dataBuffer();
    let uint8 = builder.asUint8Array();
    let decoder = new TextDecoder("utf8");

    return uint8;

  } else if (Array.isArray(jsonFBDATA)) {
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

    let BuiltFBDATA = fbClass[`end${fbClass.name}`](builder);
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
  let wrapInput = [];
  if (fbCollection) {
    wrapInput = fileData;
  } else {
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
        wrapInput.push(tempBuff.slice(startPos,));
        resetTemp();
      }
    }
  }
  return wrapFlatBuffer(wrapInput, schema, fbClass, fbCollection);
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

export { wrapFlatBuffer, createFB, readFBFile, readOMM, numCheck, readOMMXML, readOMMJSON, readOMMCSV, readTLE };
