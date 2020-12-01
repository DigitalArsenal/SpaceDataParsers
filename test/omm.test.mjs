import tape from "tape";
import {
  numCheck,
  readOMMXML,
  readOMMJSON,
  readOMMCSV,
  readTLE,
  wrapFlatBuffer,
  createFB,
  readFBFile,
} from "../src/index.mjs";
import {
  OMM,
  OMMCOLLECTION,
  MPE,
  referenceFrame,
  timeSystem,
  meanElementTheory,
  ephemerisType,
} from "../src/class/OMM.flatbuffer.class.js";
import schema from "../src/class/OMM.schema.mjs";

import btoa from "btoa";
import { writeFileSync, readFileSync, createReadStream, fstat } from "fs";
import { tmpdir } from "os";
import sgp4module from "../src/SGP4Propagator/sgp4propagator.mjs";

let runTest = async () => {
  let OMMS = {
    xml: await readOMMXML(
      readFileSync("./test/data/spacedatastandards/omm.xml"),
      schema
    ),
    csv: await readOMMCSV(
      readFileSync("./test/data/spacedatastandards/omm.csv", {
        encoding: "utf8",
      }),
      schema
    ),
    json: readOMMJSON(
      readFileSync("./test/data/spacedatastandards/omm.json", {
        encoding: "utf8",
      }),
      schema
    ),
    fb: wrapFlatBuffer(
      readFileSync("./test/data/spacedatastandards/omm.fbs"),
      schema,
      OMM,
      OMMCOLLECTION
    ),
  };

  let LEGACY = await readTLE(
    createReadStream("./test/data/spacedatastandards/3le.txt", {
      encoding: "utf8",
    }),
    schema
  );
  LEGACY.tle = LEGACY.results;

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
    describeObject,
  } = methods;

  let {
    freePtr,
    free,
    deletePtr,
    malloc,
    HEAP8,
    HEAPU8,
    stackAlloc,
  } = wasmModule;

  const registerOMM = (jsonOMM) =>
    registerEntityOMM(
      null, //jsonOMM.OBJECT_ID,
      jsonOMM.EPOCH,
      jsonOMM.MEAN_MOTION,
      jsonOMM.ECCENTRICITY,
      jsonOMM.INCLINATION,
      jsonOMM.RA_OF_ASC_NODE,
      null, //jsonOMM.ARG_OF_PERICENTER,
      jsonOMM.MEAN_ANOMALY,
      null, //jsonOMM.GM,
      null, //jsonOMM.EPHEMERIS_TYPE,
      null, //jsonOMM.CLASSIFICATION_TYPE,
      jsonOMM.NORAD_CAT_ID,
      null, //jsonOMM.ELEMENT_SET_NO,
      null, //jsonOMM.REV_AT_EPOCH,
      jsonOMM.BSTAR,
      null, //jsonOMM.MEAN_MOTION_DOT,
      null, //jsonOMM.MEAN_MOTION_DDOT,
      true,
      0,
      0,
      0,
      null
    );

  process.on("uncaughtException", (err) => {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "✘ Fatality! Uncaught Exception within unit tests, error thrown:"
    );
    console.log(err);
    console.log("not ok 1");
    console.log("\x1b[31m%s\x1b[0m", "Force-Exiting process ...");
    process.exit(1);
  });
  tape("Deserialization Test", function (t) {
    t.plan(1);

    let equal = true;
    for (let i = 0; i < LEGACY.tle.length; i++) {
      let tle = LEGACY.raw[i].slice(-2);
      let jsonOMM = LEGACY.tle[i];

      for (let sFormat in OMMS) {
        for (let prop in schema.definitions.OMM.properties) {
          if (jsonOMM[prop] && jsonOMM[prop] !== OMMS[sFormat][i][prop]) {
            console.error(
              "ERROR: ",
              prop,
              " ",
              "tle JSON: ",
              jsonOMM[prop],
              " ",
              sFormat,
              ": ",
              OMMS[sFormat][i][prop],
              JSON.stringify(OMMS[sFormat])
            );
            equal = false;
          }
        }
      }
    }
    t.equal(equal, true);
  });

  tape("Propagation Test", function (t) {
    t.plan(1);

    let passes = true;
    for (let i = 0; i < LEGACY.tle.length; i++) {
      let tle = LEGACY.raw[i].slice(-2);
      let jsonOMM = LEGACY.tle[i];

      let pointer = registerEntity(tle[0], tle[1], true, 0, 0, 0, null);

      let sPointers = {};

      for (let sFormat in OMMS) {
        sPointers[sFormat] = registerOMM(OMMS[sFormat][i]);
      }

      let epoch = new Date(jsonOMM.EPOCH).getTime();

      let flatArray = new Float64Array(
        HEAP8.buffer,
        getValueInReferenceFrame(
          pointer,
          epoch,
          true, //convert in Cesium
          true
        ), // Choice of reference frames for velocity
        3
      );

      for (let sFormat in sPointers) {
        sPointers[sFormat] = new Float64Array(
          HEAP8.buffer,
          getValueInReferenceFrame(
            sPointers[sFormat],
            epoch,
            true, //convert in Cesium
            true
          ), // Choice of reference frames for velocity
          3
        );
      }
      for (let sArray in sPointers) {
        let flatArrayOMM = sPointers[sArray];
        for (let ii = 0; ii < flatArray.length; ii++) {
          if (flatArray[ii] !== flatArrayOMM[ii]) passes = false;
        }
      }
    }
    t.equal(passes, true);
  });
  tape("Collection File I/O Test", function (t) {
    t.plan(1);

    writeFileSync(
      "./test/data/spacedatastandards/omm.collection.fbs",
      createFB(
        LEGACY.tle.map((_omm) => {
          _omm.USER_DEFINED_OBJECT_DESIGNATOR =
            new Date().toISOString() +
            new Array(Math.floor(Math.random() * 100)).join("+");
          _omm.EPHEMERIS_TYPE = 1;
          delete _omm.CHECKSUM;
          return _omm;
        }),
        schema,
        OMM,
        true
      )
    );

    let fbColFile = readFileSync("./test/data/spacedatastandards/omm.collection.fbs");

    let readOMM = readFBFile(
      fbColFile,
      schema,
      OMM,
      OMMCOLLECTION
    );

    let _keys = Object.keys(LEGACY.tle[0]);
    const mfunc = (omm) => {
      let _omm = {};
      for (let k = 0; k < _keys.length; k++) {
        _omm[_keys[k]] = omm[_keys[k]];
      }
      return _omm;
    };

    t.equal(JSON.stringify(LEGACY.tle.map(mfunc)[0]),
      JSON.stringify(readOMM.map(mfunc)[0])
    );
  });

  tape("Size Prefixed File I/O Test", function (t) {
    t.plan(1);

    writeFileSync(
      "./test/data/spacedatastandards/omm.sizePrefixed.fbs",
      Buffer.concat(
        [Buffer.from('NOISEANDRANDOMSTUFF'), createFB(
          LEGACY.tle.map((_omm) => {
            _omm.USER_DEFINED_OBJECT_DESIGNATOR =
              new Date().toISOString() +
              new Array(Math.floor(Math.random() * 100)).join("+");
            _omm.EPHEMERIS_TYPE = 1;
            delete _omm.CHECKSUM;
            return _omm;
          }),
          schema,
          OMM
        )]
      )
    );

    let readOMM = readFBFile(
      readFileSync("./test/data/spacedatastandards/omm.sizePrefixed.fbs"),
      schema,
      OMM
    );

    let _keys = Object.keys(LEGACY.tle[0]);
    const mfunc = (omm) => {
      let _omm = {};
      for (let k = 0; k < _keys.length; k++) {
        _omm[_keys[k]] = omm[_keys[k]];
      }
      return _omm;
    };

    t.equal(JSON.stringify(LEGACY.tle.map(mfunc)),
      JSON.stringify(readOMM.map(mfunc))
    );
  });
};

export { runTest };
