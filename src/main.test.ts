import { parse } from "./main"
import { LegacyFormat } from "./lib/legacyformat.enum";
import { SerializationFormat } from "./lib/serialization.enum";
import { readFileSync, writeFile, writeFileSync } from "fs";

const nullHack = (a) => {
  return a.map(c => {
    for (let x in c) {
      if (c[x] === null) {
        c[x] = 0;
      }
    }
    return c;
  });
}


let jsonResults = {
  tle: JSON.parse(readFileSync("./test/data/celestrak/catalog/catalog.json", "utf-8")),
  satcat: nullHack(JSON.parse(readFileSync("./test/data/celestrak/satcat/satcat.json", "utf-8")))
}

let tleFBSPath = "./test/data/celestrak/catalog/catalog.fbs";
let satFBSPath = "./test/data/celestrak/satcat/satcat.txt";

let tle = {
  "csv": readFileSync("./test/data/celestrak/catalog/catalog.csv", "utf-8"),
  "xml": readFileSync("./test/data/celestrak/catalog/catalog.xml", "utf-8"),
  "txt": readFileSync("./test/data/celestrak/catalog/catalog.tle.txt", "utf-8"),
  "kvn": readFileSync("./test/data/celestrak/catalog/catalog.kvn.txt", "utf-8"),
  "json": jsonResults.tle,
  "fbs": null
};

let satcat = {
  csv: readFileSync("./test/data/celestrak/satcat/satcat.csv", "utf-8"),
  json: jsonResults.satcat,
  "fbs": null
}

beforeAll(async () => {
  let { TLE, SATCAT } = LegacyFormat;
  writeFileSync(tleFBSPath, await parse(tle.csv,
    TLE,
    SerializationFormat.csv, SerializationFormat.fbs));
  writeFileSync(satFBSPath, await parse(satcat.json,
    SATCAT,
    SerializationFormat.json, SerializationFormat.fbs));
  /*writeFileSync(satFBSPath, await parse(satcat.csv,
    SATCAT,
    SerializationFormat.csv, SerializationFormat.fbs));*/
  tle.fbs = readFileSync(tleFBSPath);
  satcat.fbs = readFileSync(satFBSPath);

});

let tleFormatCheck = (records) => records.filter(r => {
  return r.OBJECT_NAME.length < 24 && r.NORAD_CAT_ID.toString().length < 6
});



test("parse TLE", async () => {
  let { TLE } = LegacyFormat;
  for (let format in tle) {
    let resultCheck = format === "txt" ? tleFormatCheck(jsonResults.tle) : jsonResults.tle;
    let toCheck = (await parse(tle[format],
      TLE,
      SerializationFormat[format])).RECORDS.map((r, i) => {
        let rObj = {};
        for (let prop in jsonResults.tle[0]) {
          rObj[prop] = r[prop];
        }
        return rObj;
      });
    expect(resultCheck)
      .toStrictEqual(
        format === "txt" ? tleFormatCheck(toCheck) : toCheck
      );
  }
});

/**/
test("parse SATCAT", async () => {
  let { SATCAT } = LegacyFormat;
  for (let format in satcat) {
    if (format === "fbs") {
      let results = (await parse(satcat[format],
        SATCAT,
        SerializationFormat[format])).RECORDS;
      expect(jsonResults.satcat)
        .toEqual(results);
    }
  }
});

/*
test("parse VCM", () => {
  let { VCM } = LegacyFormat;
  expect(parse(VCM)).toBe(VCM);
});

test("parse VCEPH", () => {
  let { VCEPH } = LegacyFormat;
  expect(parse(VCEPH)).toBe(VCEPH);
});*/