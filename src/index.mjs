import { readSync, statSync, openSync } from "fs";
import { tle, satcat, vcm } from "./parsers/legacy.mjs";
import xml2js from "xml2js";
import csv from "neat-csv";
import { Readable } from "stream";
import flatbuffers from "./lib/flatbuffers.js";
import { required } from "./lib/required.mjs";
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

const readFB = (
  input = required`input`,
  schema = required`schema`,
  fbClass = required`class`,
  fbCollection
) => {
  let schemaKeys = Object.keys(schema.definitions[fbClass.name].properties);
  let results = [];
  if (Array.isArray(input)) {
    results = input.map((fb) => readFB(fb, schema, fbClass, fbCollection)[0]);
  } else {
    let buf = new flatbuffers.ByteBuffer(input);

    if (fbCollection) {
      let SCOLLECTION = fbCollection[`getRootAs${fbCollection.name}`](buf);
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
        let SOMM = fbClass[`getSizePrefixedRootAs${fbClass.name}`](buf);
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

const createFB = (
  jsonOMM = required`jsonOMM`,
  schema = required`schema`,
  fbClass = required`fbClass`
) => {
  let returnArray;

  if (Array.isArray(jsonOMM)) {
    returnArray = jsonOMM.map((omm) => createFB(omm, schema, fbClass));
  } else {
    let schemaKeys = Object.keys(schema.definitions[fbClass.name].properties);
    let builder = new flatbuffers.Builder(0);
    let _jsonOMM = {};
    for (let k = 0; k < schemaKeys.length; k++) {
      let sK = schemaKeys[k];
      let { type } = schema.definitions.OMM.properties[sK];
      if (jsonOMM[sK] ?? false) {
        _jsonOMM[sK] = transformType(builder, jsonOMM[sK], type);
      }
    }
    fbClass[`start${fbClass.name}`](builder);

    for (let key in _jsonOMM) {
      if (schemaKeys.indexOf(key) === -1) continue;
      let addKey = `add${key}`;
      fbClass[addKey](builder, _jsonOMM[key]);
    }

    var BuiltOMM = fbClass[`end${fbClass.name}`](builder);
    builder.finishSizePrefixed(BuiltOMM);

    let uint8 = builder.asUint8Array();
    return uint8;
  }
  return Buffer.concat(
    returnArray,
    returnArray.map((n) => n.length).reduce((a, b) => a + b)
  );
};

const readHeaderLen = (fd, position = null) => {
  let headLen = flatbuffers.SIZE_PREFIX_LENGTH;
  let sizeBuf = Buffer.alloc(headLen);

  /*read header*/
  readSync(fd, sizeBuf, {
    offset: 0,
    length: headLen,
    position,
  });
  if (!position) {
    let idBuf = Buffer.alloc(256);
    readSync(fd, idBuf, {
      offset: 0,
      length: 256,
      position: 0,
    });
    console.log(idBuf.toString());
  }
  let ommLen = sizeBuf.readInt32LE(0, sizeBuf);
  return ommLen;
};

const readFBFile = (filename, schema, fbClass, fbCollection) => {
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

  return readFB(returnArray, schema, fbClass, fbCollection);
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
};
