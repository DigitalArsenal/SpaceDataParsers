import flatbuffers from './flatbuffers.js';
import { OMM, OMMCOLLECTION, schema, referenceFrame, timeSystem, meanElementTheory, ephemerisType } from '../src/class/OMM.flatbuffer.class.js';
import btoa from 'btoa';
import { writeFileSync, readFileSync, fstat } from 'fs';
import satellite from 'satellite.js';
import Ajv from 'ajv';
import xml2js from 'xml2js';
import { tmpdir } from 'os';
import sgp4module from '../src/SGP4Propagator/sgp4propagator.mjs'

let spaceTrack = {
  raw: {},
  xml: [],
  tle: [],
  _3le: [],
  csv: [],
};


(async function () {

  spaceTrack.raw.xml = await new xml2js.Parser().parseStringPromise(readFileSync('./test/data/space-track/omm.xml'));
  console.log(spaceTrack.raw.xml.ndm.omm.map(om => om));

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

    console.log(schemaKeys);
    let buf = new flatbuffers.ByteBuffer(readFileSync('./test/data/spacedatastandards.org/omm.fbs'));
    // Get access to the root:
    let SCOLLECTION = OMMCOLLECTION.getRootAsOMMCOLLECTION(buf);
    for (let i = 0; i < SCOLLECTION.RECORDSLength(); i++) {
      schemaKeys.forEach(key => {
        console.log(key, ":", SCOLLECTION.RECORDS(i)[key]());
      });
    }
  });
})()