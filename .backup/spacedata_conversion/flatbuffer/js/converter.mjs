import flatbuffers from './lib/flatbuffers.mjs';
import schema from './lib/schema.mjs';
import {
    referenceFrame,
    referenceFrameName,
    ephemerisType,
    ephemerisTypeName,
    timeSystem,
    timeSystemName,
    meanElementTheory,
    meanElementTheoryName,
    manCovRefFrame,
    manCovRefFrameName,
    OMMCOLLECTION,
    OMM,
    MPE
} from './lib/OMM.mjs';
import julian from './lib/julianDate.mjs';
import { writeFileSync, readFileSync, writeFile, statSync } from 'fs';


let SAT_TEST_OBJ = {
    MEAN_MOTION: 1.00273272,
    ECCENTRICITY: 0.0005013,
    INCLINATION: 3.0539,
    RA_OF_ASC_NODE: 81.7939,
    MEAN_ANOMALY: 150.1602,
    NORAD_CAT_ID: 23581,
    BSTAR: 0.0001,
    USER_DEFINED_EPOCH_TIMESTAMP: julian(Date.UTC('2007', '03', '05', 10, 34, 41, 426))
};

console.log(SAT_TEST_OBJ)
// Example how to use FlatBuffers to create and read binary buffers.
function main() {
    var builder = new flatbuffers.Builder(0);

    //START WRAPPER
    let shim = Object.keys(schema.definitions.MPE.properties);
    let intermediate = {};
    shim.forEach(canonicalname => {
        for (let prop in MPE) {
            if (prop.indexOf(canonicalname) > -1) {
                if (SAT_TEST_OBJ[canonicalname] || SAT_TEST_OBJ[canonicalname] === 0) {
                    let schemaValue = schema.definitions.MPE.properties[canonicalname];

                    intermediate[prop] = { canonicalname };
                    let _value = SAT_TEST_OBJ[canonicalname];
                    switch (schemaValue.type) {
                        case "number":

                            break;
                        case "string":
                            _value = builder.createString(_value);
                            break;

                    };
                    intermediate[prop].value = _value;
                }
            }
        }
    });
    //END WRAPPER

    MPE.startMPE(builder);

    for (let prop in intermediate) {
        MPE[prop](builder, intermediate[prop].value);
    }

    let _GOES9 = MPE.endMPE(builder);
    builder.finish(_GOES9);

    var buf = builder.dataBuffer();
    let uint8 = builder.asUint8Array();
    var decoder = new TextDecoder('utf8');
    var b64encoded = Buffer.from(unescape(encodeURIComponent(decoder.decode(uint8)))).toString('base64');
    let files = {
        'MPE_SAMPLE.fbs': uint8,
        'MPE_JSON.json': JSON.stringify(SAT_TEST_OBJ),
        'MPE_SAMPLE.csv': [Object.keys(SAT_TEST_OBJ).join(','), Object.values(SAT_TEST_OBJ).join(',')].join('\n'),
    }
    for (let f in files) {
        writeFileSync(f, files[f]);
        console.log(f, statSync(f).size);
    }

    console.log('\nJS GENERATED: ', new Array(30).join('-'));
    let GOES9 = MPE.getRootAsMPE(new flatbuffers.ByteBuffer(readFileSync('./MPE_SAMPLE.fbs')));
    for (let x in GOES9) {
        if (SAT_TEST_OBJ.hasOwnProperty(x)) {
            console.log(x)
            console.log(GOES9[x]());
        }
    }
    console.log('\nCPP GENERATED: ', new Array(30).join('-'));
    GOES9 = MPE.getRootAsMPE(new flatbuffers.ByteBuffer(readFileSync('../cpp/MPE_SAMPLE.fbs')));
    for (let x in GOES9) {
        if (SAT_TEST_OBJ.hasOwnProperty(x)) {
            console.log(x)
            console.log(GOES9[x]());
        }
    }
}

main();