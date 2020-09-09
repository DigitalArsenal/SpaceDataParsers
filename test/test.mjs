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
  tle: []
};

(async function () {
  OMMS.xml = await parseOMMXML(readFileSync('./test/data/celestrak/omm.xml'), schema);
  OMMS.json = parseOMMJSON(readFileSync('./test/data/celestrak/omm.json', { encoding: 'utf8' }), schema);
  OMMS.csv = await parseOMMCSV(readFileSync('./test/data/celestrak/omm.csv', { encoding: 'utf8' }), schema);
  LEGACY.tle = await parseTLE(createReadStream('./test/data/celestrak/3le.txt', { encoding: 'utf8' }), schema);

  //console.clear();

  /*
    for (let i = 0; i < OMMS.xml.length; i++) {
      for (let prop in OMMS.xml[i]) {
        let x = OMMS.xml[i][prop];
        let j = OMMS.json[i][prop];
        let c = OMMS.csv[i][prop];
        if (x == j && j == c) { } else {
          console.log(`${prop}
          XML:  ${x}
          JSON: ${j}
          CSV:  ${c}`);
        }
      }
    }*/

  return 0;

  sgp4module.then(function (moduleMethods) {
    let { methods, wasmModule } = moduleMethods;

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
    /*
    
        let tle = ["1     5U 58002B   20126.81463012 +.00000185 +00000-0 +23100-3 0  9999",
          "2     5 034.2494 359.6658 1847113 160.4367 207.7732 10.84842166200625"];
    
        let pointer = registerEntity(
          tle[0],
          tle[1],
          true,
          0,
          0,
          0,
          null
        );
      "string", //char *EPOCH,
        "number", //double SEMI_MAJOR_AXIS,
        "number", //double MEAN_MOTION,
        "number", //double ECCENTRICITY,
        "number", //double INCLINATION,
        "number", //double RA_OF_ASC_NODE,
        "number", //double ARG_OF_PERICENTER,
        "number", //double MEAN_ANOMALY,
        "number", //double GM,
        "string", //signed char EPHEMERIS_TYPE,
        "string", //char * CLASSIFICATION_TYPE,
        "number", //uint32_t NORAD_CAT_ID,
        "number", //uint32_t ELEMENT_SET_NO,
        "number", //double REV_AT_EPOCH,
        "number", //double BSTAR,
        "number", //double MEAN_MOTION_DOT,
        "number", //double MEAN_MOTION_DDOT,
        "bool",   //bool visible,
        "number", //double startmfe = 0,
        "number", //double stopmfe = 0,
        "number", //double deltamin = 0,
        "number", //long * SatObjPointer = nullptr)
        console.log(HEAP8, pointer);
    
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
    */
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
  });
})()