import flatbuffers from "./lib/flatbuffers.mjs";
import { required } from "./lib/required.mjs";
import schema from "./class/OMM.schema.mjs";
import { OMM, OMMCOLLECTION } from "./class/OMM.flatbuffer.class.js";
import { readOMMXML, readOMMJSON, readOMMCSV, readTLE } from "./parsers/omm.converter.mjs";
import { Buffer } from "buffer";
import { wrapFlatBuffer, transformType } from "./lib/convert.flatbuffers.mjs";

const readFB = (fileData, schema, fbClass, fbCollection) => {
  if (!(fileData instanceof Uint8Array)) {
    fileData = new Uint8Array(fileData);
  }
  let wrapInput = false;
  let scollBUF = new flatbuffers.ByteBuffer(fileData);
  let SCOLLECTION = fbCollection[`getRootAs${fbCollection.name}`](scollBUF);

  if (SCOLLECTION.RECORDSLength() === 0) {
    wrapInput = [];
    SCOLLECTION = false;
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
      if (d == 1000 && !wrapInput.length) return { results: [], error: "No $OMM within 1000 chars, you sure this is an OMM?" };
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

  return wrapFlatBuffer(wrapInput, schema, fbClass, fbCollection, SCOLLECTION, scollBUF);
};

const writeFB = (jsonFBDATA = required`jsonFBDATA`, schema = required`schema`, fbClass = required`fbClass`, useCollection = false) => {
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
    returnArray = jsonFBDATA.map((fbdata) => writeFB(fbdata, schema, fbClass));
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

const readOMM = (data = required`data`, format = "flatbuffer") => {
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

const writeOMM = (data = required`data`, format = "json", useCollection = false) => {
  let formatters = {
    xml: readOMMXML,
    csv: readOMMCSV,
    json: false,
    tle: readTLE,
    flatbuffer: readFB,
    fb: readFB,
  };
  if (formatters[format]) {
    data = formatters[format](data);
  }

  return writeFB(data, schema, OMM, useCollection);
};

export { readOMM, writeOMM, readTLE };
