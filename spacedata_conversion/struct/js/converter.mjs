import struct from "structurae";
import fs from 'fs';
const { BinaryProtocol, ObjectViewMixin, ArrayViewMixin, StringView } = struct;
/*{
    MEAN_MOTION: 1.00273272,
    ECCENTRICITY: 0.0005013,
    INCLINATION: 3.0539,
    RA_OF_ASC_NODE: 81.7939,
    MEAN_ANOMALY: 150.1602,
    NORAD_CAT_ID: 23581,
    BSTAR: 0.0001,
    USER_DEFINED_EPOCH_TIMESTAMP: 2454195.9407572453
  }*/
const mpeFileName = 'MPE_SAMPLE.b';
const MPE = ObjectViewMixin({
  $id: "MPE", // each object requires a unique id
  type: "object",
  properties: {
    MEAN_MOTION: { type: "number", btype: "float64" },
    ECCENTRICITY: { type: "number", btype: "float64" },
    INCLINATION: { type: "number", btype: "float64" },
    RA_OF_ASC_NODE: { type: "number", btype: "float64" },
    MEAN_ANOMALY: { type: "number", btype: "float64" },
    NORAD_CAT_ID: { type: "number", btype: "uint32" },
    BSTAR: { type: "number", btype: "float64" },
    USER_DEFINED_EPOCH_TIMESTAMP: { type: "number", btype: "float64" },
  },
});

const SAT = MPE.from({
  MEAN_MOTION: 1.00273272,
  ECCENTRICITY: 0.0005013,
  INCLINATION: 3.0539,
  RA_OF_ASC_NODE: 81.7939,
  MEAN_ANOMALY: 150.1602,
  NORAD_CAT_ID: 23581,
  BSTAR: 0.0001,
  USER_DEFINED_EPOCH_TIMESTAMP: 2454195.9407572453,
});

fs.unlinkSync(mpeFileName);

console.log(SAT.byteLength);
console.log(SAT.toJSON());

fs.writeFileSync(mpeFileName, Buffer.from(SAT.buffer));
console.log(SAT, SAT instanceof ArrayBuffer, SAT.buffer instanceof ArrayBuffer, SAT.byteOffset, SAT.byteLength);
console.log(fs.statSync(mpeFileName).size);

let diskBuff = fs.readFileSync(mpeFileName);
let arrayBuff = diskBuff.buffer.slice(diskBuff.byteOffset, diskBuff.byteOffset + diskBuff.byteLength);

let SAT2 = new MPE(arrayBuff);
console.log(arrayBuff instanceof ArrayBuffer, diskBuff.buffer instanceof ArrayBuffer, diskBuff.byteOffset, diskBuff.byteLength, diskBuff.byteOffset + diskBuff.byteLength);
console.log('SAT2', SAT2.toJSON());
