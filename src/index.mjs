import xml2js from "xml2js";
import sax from "sax";
import saxPath from "saxpath";
import { readSync, statSync, openSync } from "fs";
import csv from "neat-csv";
import { Readable } from "stream";
import { tle, satcat, vcm } from "./parsers/legacy.mjs";
import {
  OMM,
  OMMCOLLECTION,
  schema,
  referenceFrame,
  timeSystem,
  meanElementTheory,
  ephemerisType,
} from "./class/OMM.flatbuffer.class.js";
import flatbuffers from "./lib/flatbuffers.js";
import btoa from "btoa";
globalThis.flatbuffers = flatbuffers;

const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format

const numCheck = (schema, pkey, pval) => {
  let sD = schema.definitions.OMM.properties[pkey];
  return sD?.type === "number" || useAsNumber.indexOf(sD?.$ref) > -1
    ? parseFloat(pval) ?? null
    : pval ?? null;
};

const readOMMXML = async (input, schema) => {
  let xp = await new xml2js.Parser({
    parseNumbers: true,
  }).parseStringPromise(input);
  return xp.ndm.omm.map((om) => {
    let intermediate = {};
    [
      om.header[0],
      om.body[0].segment[0].metadata[0],
      om.body[0].segment[0].data[0],
    ].forEach((xmlPath) => {
      for (let prop in xmlPath) {
        if (
          [
            "meanElements",
            "covarianceMatrix",
            "userDefinedParameters",
            "tleParameters",
            "spacecraftParameters",
          ].indexOf(prop) === -1
        ) {
          intermediate[prop] = numCheck(schema, prop, xmlPath[prop][0]);
        } else {
          for (let pprop in xmlPath[prop][0]) {
            intermediate[pprop] = numCheck(
              schema,
              pprop,
              xmlPath[prop][0][pprop][0]
            );
          }
        }
      }
    });
    for (let prop in intermediate) {
      if (intermediate[prop]?.hasOwnProperty("$")) {
        intermediate[intermediate[prop].$.parameter] = numCheck(
          schema,
          prop,
          intermediate[prop]._
        );
        delete intermediate[prop];
      }
    }
    return intermediate;
  });
};

const readOMMJSON = (input, schema) => {
  return JSON.parse(input, function (key, value) {
    return numCheck(schema, key, value);
  });
};

const readOMMCSV = async (input, schema) => {
  let results = (await csv(input)).map((row) => {
    for (let prop in row) {
      row[prop] = numCheck(schema, prop, row[prop]);
    }
    return row;
  });

  return results;
};

const readTLE = (input, schema) => {
  return new Promise((resolve, reject) => {
    input = input instanceof Readable ? input : Readable.from(input);
    let tles = new tle(input);
    let started = false;
    input.on("readable", async () => {
      if (started) return;
      started = true;
      let stop = await tles.readLines();
      let results = tles.lines.map(tles.format.OMM);
      let raw = tles.lines;
      resolve({ results, raw });
    });
  });
};

const readFB = (input, schema) => {
  let schemaKeys = Object.keys(schema.definitions.OMM.properties);
  let results = [];
  if (Array.isArray(input)) {
    results = input.map((fb) => readFB(fb, schema)[0]);
  } else {
    let buf = new flatbuffers.ByteBuffer(input);

    let SCOLLECTION = OMMCOLLECTION.getRootAsOMMCOLLECTION(buf);

    if (SCOLLECTION.RECORDSLength()) {
      for (let i = 0; i < SCOLLECTION.RECORDSLength(); i++) {
        let result = SCOLLECTION.RECORDS(i);
        for (let key in schemaKeys) {
          let sK = schemaKeys[key];
          if (typeof SCOLLECTION.RECORDS(i)[sK] === "function") {
            Object.defineProperty(result, sK, {
              get() {
                return SCOLLECTION.RECORDS(i)[sK]();
              },
            });
          }
        }
        results.push(result);
      }
    } else {
      try {
        let SOMM = OMM.getSizePrefixedRootAsOMM(buf);
        let result = {};
        for (let key in schemaKeys) {
          let sK = schemaKeys[key];
          if (typeof SOMM[sK] === "function") {
            Object.defineProperty(result, sK, {
              enumerable: true,
              get() {
                return SOMM[sK]();
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
      _value = builder.createString(
        new Uint8Array(
          Buffer.from(typeof _value === "string" ? _value : _value.toString())
        )
      );
  }
  return _value;
};

const createFB = (jsonOMM, schema) => {
  let returnArray;
  if (Array.isArray(jsonOMM)) {
    returnArray = jsonOMM.map((omm) => createFB(omm, schema));
  } else {
    let schemaKeys = Object.keys(schema.definitions.OMM.properties);
    let builder = new flatbuffers.Builder(0);
    let _jsonOMM = {};
    for (let k = 0; k < schemaKeys.length; k++) {
      let sK = schemaKeys[k];
      let { type } = schema.definitions.OMM.properties[sK];
      if (jsonOMM[sK] ?? false) {
        _jsonOMM[sK] = transformType(builder, jsonOMM[sK], type);
      }
    }
    OMM.startOMM(builder);

    for (let key in _jsonOMM) {
      if (schemaKeys.indexOf(key) === -1) continue;
      let addKey = `add${key}`;
      OMM[addKey](builder, _jsonOMM[key]);
    }

    var BuiltOMM = OMM.endOMM(builder);
    builder.finishSizePrefixed(BuiltOMM);

    let uint8 = builder.asUint8Array();
    return uint8;
  }
  return Buffer.concat(
    returnArray,
    returnArray.map((n) => n.length).reduce((a, b) => a + b)
  );
};

const writeFBFile = (filename, buf) => {};

const readHeaderLen = (fd, position = null) => {
  let headLen = flatbuffers.SIZE_PREFIX_LENGTH;
  let sizeBuf = Buffer.alloc(headLen);

  /*read header*/
  readSync(fd, sizeBuf, {
    offset: 0,
    length: headLen,
    position,
  });
  let ommLen = sizeBuf.readInt32LE(0, sizeBuf);
  return ommLen;
};

const readFBFile = (filename, schema) => {
  let fd = openSync(filename, "r");
  let spLen = flatbuffers.SIZE_PREFIX_LENGTH + readHeaderLen(fd);
  let ommBuf = Buffer.alloc(spLen);

  let returnArray = [];
  /*reset for first read*/

  let pos = readSync(fd, ommBuf, {
    offset: 0,
    length: spLen,
    position: 0,
  });
  returnArray.push(ommBuf);
  while (pos < statSync(filename).size) {
    let _spLen = flatbuffers.SIZE_PREFIX_LENGTH + readHeaderLen(fd, pos);

    let _ommBuf = Buffer.alloc(_spLen);

    readSync(fd, _ommBuf, {
      offset: 0,
      length: _spLen,
      position: pos,
    });
    returnArray.push(_ommBuf);
    pos += _spLen;
  }

  return readFB(returnArray, schema);
};

export {
  numCheck,
  readOMMXML,
  readOMMJSON,
  readOMMCSV,
  readTLE,
  readFB,
  createFB,
  readFBFile,
  writeFBFile,
};
