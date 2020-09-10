import { numCheck, parseOMMXML, parseOMMJSON, parseOMMCSV, parseTLE } from "../src/index.mjs";
import flatbuffers from './flatbuffers.js';
import { OMM, OMMCOLLECTION, schema, referenceFrame, timeSystem, meanElementTheory, ephemerisType } from '../src/class/OMM.flatbuffer.class.js';
import btoa from 'btoa';
import { writeFileSync, readFileSync, createReadStream, fstat } from 'fs';
import satellite from 'satellite.js';
import Ajv from 'ajv';
import { tmpdir } from 'os';
import sgp4module from '../src/SGP4Propagator/sgp4propagator.mjs'


let OMMS = {
  xml: [],
  csv: [],
  json: []
};

let LEGACY = {
  tle: [],
  raw: []
};

(async function () {
  OMMS.xml = await parseOMMXML(readFileSync('./test/data/celestrak/omm.xml'), schema);
  OMMS.json = parseOMMJSON(readFileSync('./test/data/celestrak/omm.json', { encoding: 'utf8' }), schema);
  OMMS.csv = await parseOMMCSV(readFileSync('./test/data/celestrak/omm.csv', { encoding: 'utf8' }), schema);
  let { results, raw } = await parseTLE(createReadStream('./test/data/celestrak/3le.txt', { encoding: 'utf8' }), schema);
  LEGACY.tle = results;
  LEGACY.raw = raw;

  console.clear();

  let { methods, wasmModule } = await sgp4module;

  let {
    sizeOfsatelliteCatalog,
    registerEntity,
    registerEntityOMM,
    removeEntity,
    removeAll,
    propagate,
    generateEphemeris,
    getValue,
    getValueInReferenceFrame,
    getSatAzElRange,
    getSatAzElRangeForInterval,
    getSatAzElRangePositionForInterval,
    describeObject } = methods;

  let {
    freePtr,
    free,
    deletePtr,
    malloc,
    HEAP8,
    HEAPU8,
    stackAlloc
  } = wasmModule;

  for (let i = 0; i < 1; i++) {


    let tle = LEGACY.raw[i].slice(1);
    let tleOMM = LEGACY.tle[i];

    console.log(tle, tleOMM);

    let pointer = registerEntity(
      tle[0],
      tle[1],
      true,
      0,
      0,
      0,
      null
    );
   
    let pointerOMM = registerEntityOMM(
      tleOMM.OBJECT_ID,
      tleOMM.EPOCH,
      tleOMM.MEAN_MOTION,
      tleOMM.ECCENTRICITY,
      tleOMM.INCLINATION,
      tleOMM.RA_OF_ASC_NODE,
      tleOMM.ARG_OF_PERICENTER,
      tleOMM.MEAN_ANOMALY,
      null,//tleOMM.GM,
      tleOMM.EPHEMERIS_TYPE,
      tleOMM.CLASSIFICATION_TYPE,
      tleOMM.NORAD_CAT_ID,
      tleOMM.ELEMENT_SET_NO,
      tleOMM.REV_AT_EPOCH,
      tleOMM.BSTAR,
      tleOMM.MEAN_MOTION_DOT,
      tleOMM.MEAN_MOTION_DDOT,
      true,
      0,
      0,
      0,
      null
    );
    let _now = new Date().getTime();
    let flatArray = new Float64Array(
      HEAP8.buffer,
      getValueInReferenceFrame(
        pointer,
        _now,
        true, //convert in Cesium
        true
      ), // Choice of reference frames for velocity
      3
    );
    console.log(flatArray);
    let flatArrayOMM = new Float64Array(
      HEAP8.buffer,
      getValueInReferenceFrame(
        pointerOMM,
        _now,
        true, //convert in Cesium
        true
      ), // Choice of reference frames for velocity
      3
    );
    console.log(flatArrayOMM);
  }
  /*
  var ajv = new Ajv({ unknownFormats: true }); // options can be passed, e.g. {allErrors: true}
  var validate = ajv.compile(schema);
  var valid = validate(data);
  if (!valid) console.log(validate.errors);
  */
  let schemaKeys = Object.keys(schema.definitions.OMM.properties);

  let buf = new flatbuffers.ByteBuffer(readFileSync('./test/data/spacedatastandards/omm.fbs'));
  // Get access to the root:
  let SCOLLECTION = OMMCOLLECTION.getRootAsOMMCOLLECTION(buf);
  for (let i = 0; i < SCOLLECTION.RECORDSLength(); i++) {
    schemaKeys.forEach(key => {
      //console.log(key, ":", SCOLLECTION.RECORDS(i)[key]());
    });
  }

})()