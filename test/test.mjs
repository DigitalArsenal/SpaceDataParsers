import flatbuffers from './flatbuffers.js';
import { OMM, OMMCOLLECTION, schema, referenceFrame, timeSystem, meanElementTheory, ephemerisType } from './OMM_generated.js';
import btoa from 'btoa';
import { writeFileSync, readFileSync, fstat } from 'fs';
import satellite from 'satellite.js';
import Ajv from 'ajv';
import xml2js from 'xml2js';
import { tmpdir } from 'os';
import sgp4module from '../src/SGP4Propagator/sgp4propagator.mjs'


(async function () {
  sgp4module.then(function (wasmModule) {

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
      HEAP8,
      HEAPU8,
      stackAlloc } = wasmModule;
    /*
    function stringToUTF8(str, outPtr, maxBytesToWrite) {
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    }
    function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
        return 0;

      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u >= 0x200000) warnOnce('Invalid Unicode code point 0x' + u.toString(16) + ' encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    }
    // Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
    function lengthBytesUTF8(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
        if (u <= 0x7F) ++len;
        else if (u <= 0x7FF) len += 2;
        else if (u <= 0xFFFF) len += 3;
        else len += 4;
      }
      return len;
    }

    let writeString = function (str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    };*/
    let tle = ["1     5U 58002B   20126.81463012 +.00000185 +00000-0 +23100-3 0  9999",
      "2     5 034.2494 359.6658 1847113 160.4367 207.7732 10.84842166200625"];

    //let tlen = tle.map(r => writeString(r));
    
    let pointer = registerEntity(
      tle[0],
      tle[1],
      true,
      0,
      0,
      0,
      null
    );
    
    console.log(pointer);
    return;
    let _now = new Date().getTime();
    let flatArray = new Float64Array(
      wasmModule.HEAP8.buffer,
      wasmModule.getValueInReferenceFrame(
        pointer,
        _now,
        true, //convert in Cesium
        true
      ), // Choice of reference frames for velocity
      3
    );
    console.log(flatArray);

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