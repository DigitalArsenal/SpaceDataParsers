import flatbuffers from './flatbuffers.js';
import { OMM, OMMCOLLECTION, schema, referenceFrame, timeSystem, meanElementTheory, ephemerisType } from './OMM_generated.js';
import btoa from 'btoa';
import { writeFileSync, readFileSync, fstat } from 'fs';
import satellite from 'satellite.js';
import Ajv from 'ajv';
import xml2js from 'xml2js';
import { tmpdir } from 'os';
import sgp4module from '../src/SGP4Propagator/wasmmodule.mjs'
globalThis.__dirname = "";


(async function () {
  sgp4module().then(wasmModule => {
    for (let x in wasmModule) {
      if (x[0] === "_") {
        wasmModule[x.split("_")[1]] = wasmModule[x];
      }
    }
    let { sizeOfsatelliteCatalog,
      freePtr,
      free,
      deletePtr,
      registerEntity,
      removeEntity,
      removeAll,
      propagate,
      malloc,
      generateEphemeris,
      getValue,
      getValueInReferenceFrame,
      getSatAzElRange,
      getSatAzElRangeForInterval,
      getSatAzElRangePositionForInterval,
      describeObject,
      HEAP8 } = wasmModule;

    let pointer = registerEntity(
      "1     5U 58002B   20126.81463012 +.00000185 +00000-0 +23100-3 0  9999",
      "2     5 034.2494 359.6658 1847113 160.4367 207.7732 10.84842166200625",
      true,
      0,
      0,
      0,
      null
    );
    console.log(pointer);
    console.log(sizeOfsatelliteCatalog());
    
    propagate(_now, true);

    let flatArrayPointer = this._wasmModule.propagate(_now, true);

    let flatArray = new Float64Array(
      HEAP8.buffer,
      flatArrayPointer,
      _e.length * 3
    );
    let _c = new Cartesian3();

    for (let e = 0; e < 1; e++) {
      if (_e[e]) {
        //race condition for removal, eventual consistency
        Cartesian3.fromArray(flatArray, e * 3, _c);
        _e[e].position = _c;
      }
    }

    var ajv = new Ajv({ unknownFormats: true }); // options can be passed, e.g. {allErrors: true}
    var validate = ajv.compile(schema);
    //var valid = validate(data);
    //if (!valid) console.log(validate.errors);


    //TEST
    let assert = {};

    assert.equal = (label, val1, val2) => {
      let sep = '\n----------------------------\n';
      let sep2 = '============================\n';

      if (val1 !== val2) console.log(`${sep2}${label}${sep} assert failed: ${sep}`, `${val1} is Not Equal To ${val2}`);
      // else console.log(`${sep2}${label} === ${val2}`);
    }

    let SAT_TEST_OBJ = {
      CCSDS_OMM_VERS: 2.0,
      CREATION_DATE: "2007-03-05T16:00:00",
      ORIGINATOR: "NOAA/USA",
      OBJECT_NAME: "GOES 9",
      OBJECT_ID: "1995-025A",
      CENTER_NAME: "EARTH",
      REF_FRAME: referenceFrame.TEME,
      TIME_SYSTEM: timeSystem.UTC,
      MEAN_ELEMENT_THEORY: meanElementTheory.SGP4,
      EPOCH: "2007-03-05T10:34:41.4264",
      MEAN_MOTION: 1.00273272,
      ECCENTRICITY: 0.0005013,
      INCLINATION: 3.0539,
      RA_OF_ASC_NODE: 81.7939,
      ARG_OF_PERICENTER: 249.2363,
      MEAN_ANOMALY: 150.1602,
      GM: 398600.8,
      EPHEMERIS_TYPE: ephemerisType.SGP4,
      CLASSIFICATION_TYPE: "U",
      NORAD_CAT_ID: 23581,
      ELEMENT_SET_NO: 925,
      REV_AT_EPOCH: 4316,
      BSTAR: 0.0001,
      MEAN_MOTION_DOT: -0.00000113,
      MEAN_MOTION_DDOT: 0.0,
      USER_DEFINED_EARTH_MODEL: "WGS-84"
    };


    var builder = new flatbuffers.Builder(0);
    let shim = Object.keys(schema.definitions.OMM.properties);
    let intermediate = {};
    shim.forEach(canonicalname => {
      for (let prop in OMM) {
        if (prop.indexOf(canonicalname) > -1) {
          intermediate[prop] = {
            canonicalname,
            value: schema.definitions.OMM.properties[canonicalname].type === "string" ? builder.createString(SAT_TEST_OBJ[canonicalname]) : SAT_TEST_OBJ[canonicalname]
          };
        }
      }
    });
    //END WRAPPER

    OMM.startOMM(builder);

    for (let prop in intermediate) {
      OMM[prop](builder, intermediate[prop].value);
    }

    let _GOES9 = OMM.endOMM(builder);
    builder.finish(_GOES9);
    let _GG = OMM.getRootAsOMM(builder.dataBuffer());

    let records = [_GOES9];

    //for(let x in OMMCOLLECTION)console.log(x);

    let OMMRECORDS = OMMCOLLECTION.createRECORDSVector(builder, records);

    OMMCOLLECTION.startOMMCOLLECTION(builder);

    OMMCOLLECTION.addRECORDS(builder, OMMRECORDS);

    let COLLECTION = OMMCOLLECTION.endOMMCOLLECTION(builder);

    builder.finish(COLLECTION);

    var buf = builder.dataBuffer();
    let uint8 = builder.asUint8Array();
    var decoder = new TextDecoder('utf8');
    var b64encoded = btoa(unescape(encodeURIComponent(decoder.decode(uint8))));

    writeFileSync('./test/OMM.fbs', Buffer.from(uint8));
    buf = new flatbuffers.ByteBuffer(readFileSync('./test/OMM.fbs'));
    // Get access to the root:
    let SCOLLECTION = OMMCOLLECTION.getRootAsOMMCOLLECTION(buf);
    let GOES9 = SCOLLECTION.RECORDS(0);
    if (SCOLLECTION.RECORDSLength()) {
      for (let prop in intermediate) {
        let { canonicalname } = intermediate[prop];

        if (typeof GOES9[canonicalname] === "function")
          Object.defineProperty(GOES9, canonicalname, { get: GOES9[canonicalname] });
      }

      for (let prop in SAT_TEST_OBJ) {

        if (GOES9[prop]) {
          assert.equal(prop, SAT_TEST_OBJ[prop], GOES9[prop]);
        }
      }

      console.log('The FlatBuffer was successfully created and verified!');
    } else {
      console.log('No Records: ', SCOLLECTION.RECORDSLength());
    }

  });
})()