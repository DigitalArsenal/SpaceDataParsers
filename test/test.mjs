import { numCheck, readOMMXML, readOMMJSON, readOMMCSV, readTLE, readFB, writeFB } from "../src/index.mjs";
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
  json: [],
  fb: null
};

let LEGACY = {
  tle: [],
  raw: []
};

(async function () {
  OMMS.xml = await readOMMXML(readFileSync('./test/data/spacedatastandards/omm.xml'), schema);
  OMMS.json = readOMMJSON(readFileSync('./test/data/spacedatastandards/omm.json', { encoding: 'utf8' }), schema);
  OMMS.csv = await readOMMCSV(readFileSync('./test/data/spacedatastandards/omm.csv', { encoding: 'utf8' }), schema);
  OMMS.fb = readFB(readFileSync('./test/data/spacedatastandards/omm.fbs'), schema);
  let { results, raw } = await readTLE(createReadStream('./test/data/spacedatastandards/3le.txt', { encoding: 'utf8' }), schema);
  LEGACY.tle = results;
  LEGACY.raw = raw;

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


  const registerOMM = (objOMM) => registerEntityOMM(
    objOMM.OBJECT_ID,
    objOMM.EPOCH,
    objOMM.MEAN_MOTION,
    objOMM.ECCENTRICITY,
    objOMM.INCLINATION,
    objOMM.RA_OF_ASC_NODE,
    objOMM.ARG_OF_PERICENTER,
    objOMM.MEAN_ANOMALY,
    null,//objOMM.GM,
    objOMM.EPHEMERIS_TYPE,
    objOMM.CLASSIFICATION_TYPE,
    objOMM.NORAD_CAT_ID,
    objOMM.ELEMENT_SET_NO,
    objOMM.REV_AT_EPOCH,
    objOMM.BSTAR,
    objOMM.MEAN_MOTION_DOT,
    objOMM.MEAN_MOTION_DDOT,
    true,
    0,
    0,
    0,
    null
  );

  for (let i = 0; i < LEGACY.tle.length; i++) {

    let tle = LEGACY.raw[i].slice(-2);
    let tleOMM = LEGACY.tle[i];
    let tleFB = OMMS.fb[i];

    let pointer = registerEntity(
      tle[0],
      tle[1],
      true,
      0,
      0,
      0,
      null
    );


    let pointerFB = registerOMM(tleFB);
    let _now = new Date(tleOMM.EPOCH).getTime();

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

    let flatArrayOMM = new Float64Array(
      HEAP8.buffer,
      getValueInReferenceFrame(
        pointerFB,
        _now,
        true, //convert in Cesium
        true
      ), // Choice of reference frames for velocity
      3
    );
    console.log(flatArray, flatArrayOMM);
    for (let ii = 0; ii < flatArray.length; ii++) {

    }

  }


})()