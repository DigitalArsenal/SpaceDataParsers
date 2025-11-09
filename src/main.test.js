import test from "node:test";
import assert from "node:assert/strict";
import { parse, LegacyFormat, SerializationFormat } from "./main.mjs";

const sampleTleJson = [
  {
    OBJECT_NAME: "TEST-SAT",
    OBJECT_ID: "2024-001A",
    NORAD_CAT_ID: 90000,
    REF_FRAME: "TEME",
    TIME_SYSTEM: "UTC",
    MEAN_ELEMENT_THEORY: "SGP4",
    ECCENTRICITY: 0.0001234,
    MEAN_MOTION: 15.5,
    MEAN_ANOMALY: 120.5,
    INCLINATION: 97.6,
    RA_OF_ASC_NODE: 88.2,
    ARG_OF_PERICENTER: 45.3,
    EPOCH: "2024-01-01T00:00:00Z"
  }
];

const sampleTleCsv = `OBJECT_NAME,NORAD_CAT_ID,ECCENTRICITY,MEAN_MOTION,MEAN_ANOMALY,INCLINATION,RA_OF_ASC_NODE,ARG_OF_PERICENTER,TIME_SYSTEM,REF_FRAME,MEAN_ELEMENT_THEORY
CSV-SAT,91000,0.001234,14.25,42.0,98.7,120.3,15.2,UTC,TEME,SGP4
`;

const sampleSatJson = [
  {
    OBJECT_NAME: "SATCAT-JS",
    OBJECT_ID: "2024-005A",
    NORAD_CAT_ID: 91001,
    OBJECT_TYPE: "PAYLOAD",
    OPS_STATUS_CODE: "OPERATIONAL",
    OWNER: "USA",
    LAUNCH_DATE: "2024-01-15",
    PERIOD: 96.5,
    INCLINATION: 52.0,
    APOGEE: 500,
    PERIGEE: 480,
    RCS: 0.01,
    DATA_STATUS_CODE: "OK",
    ORBIT_CENTER: "EARTH",
    ORBIT_TYPE: "ORBIT"
  }
];

const sampleSatCsv = `OBJECT_NAME,NORAD_CAT_ID,OBJECT_TYPE,OPS_STATUS_CODE,OWNER,LAUNCH_DATE,PERIOD,INCLINATION,APOGEE,PERIGEE,RCS,DATA_STATUS_CODE,ORBIT_CENTER,ORBIT_TYPE
SATCAT-CSV,91002,PAYLOAD,OPERATIONAL,USA,2024-02-01,97.2,53.1,510,470,0.02,OK,EARTH,ORBIT
`;

test("parse TLE JSON into plain objects", async () => {
  const result = await parse(sampleTleJson, LegacyFormat.TLE, SerializationFormat.json);
  assert.equal(result.RECORDS.length, 1);
  const record = result.RECORDS[0];
  assert.equal(record.OBJECT_NAME, "TEST-SAT");
  assert.equal(record.NORAD_CAT_ID, 90000);
  assert.equal(record.ECCENTRICITY, 0.0001234);
});

test("parse TLE CSV into plain objects", async () => {
  const result = await parse(sampleTleCsv, LegacyFormat.TLE, SerializationFormat.csv);
  assert.equal(result.RECORDS.length, 1);
  const [record] = result.RECORDS;
  assert.equal(record.OBJECT_NAME, "CSV-SAT");
  assert.equal(record.REF_FRAME, "TEME");
  assert.equal(record.MEAN_ELEMENT_THEORY, "SGP4");
  assert.equal(record.MEAN_MOTION, 14.25);
});

test("parse SATCAT JSON", async () => {
  const result = await parse(sampleSatJson, LegacyFormat.SATCAT, SerializationFormat.json);
  assert.equal(result.RECORDS.length, 1);
  const record = result.RECORDS[0];
  assert.equal(record.OBJECT_TYPE, "PAYLOAD");
  assert.equal(record.DATA_STATUS_CODE, "OK");
  assert.equal(record.PERIOD, 96.5);
});

test("parse SATCAT CSV", async () => {
  const result = await parse(sampleSatCsv, LegacyFormat.SATCAT, SerializationFormat.csv);
  assert.equal(result.RECORDS.length, 1);
  const record = result.RECORDS[0];
  assert.equal(record.OBJECT_NAME, "SATCAT-CSV");
  assert.equal(record.ORBIT_TYPE, "ORBIT");
  assert.equal(record.RCS, 0.02);
});
