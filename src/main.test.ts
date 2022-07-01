import { parse } from "./main"
import { LegacyFormat } from "./lib/legacyformat.enum";
import { SerializationFormat } from "./lib/serialization.enum";
import { readFileSync, writeFileSync } from "fs";

let jsonResults = {
  tle: JSON.parse(readFileSync("./test/data/celestrak/catalog.json", "utf-8")),
  //satcat: JSON.parse(readFileSync("./test/data/celestrak/satcat.json", "utf-8"))
}

let tleFBSPath = "./test/data/celestrak/catalog.fbs";

let tle = {
  "csv": readFileSync("./test/data/celestrak/catalog.csv", "utf-8"),
  "xml": readFileSync("./test/data/celestrak/catalog.xml", "utf-8"),
  //"tle": readFileSync("./test/data/celestrak/catalog.tle.txt", "utf-8"),
  "json": jsonResults.tle,
  "fbs": null
}

/*
let satcat = {
  csv: readFileSync("./test/data/celestrak/satcat.csv", "utf-8"),
}*/

beforeAll(async () => {
  writeFileSync(tleFBSPath, await parse(tle.csv,
    LegacyFormat.TLE,
    SerializationFormat.csv, SerializationFormat.fbs));
  tle.fbs = readFileSync(tleFBSPath);

});

test("parse TLE", async () => {
  let { TLE } = LegacyFormat;
  for (let format in tle) {
    console.log(`Testing FileType: ${format}`);
    expect(jsonResults.tle)
      .toStrictEqual(
        (await parse(tle[format],
          TLE,
          SerializationFormat[format])).RECORDS.map((r, i) => {
            let rObj = {};
            for (let prop in jsonResults.tle[0]) {
              rObj[prop] = r[prop];
            }
            return rObj;
          }));
  }
});

/*
test("parse SATCAT", async () => {
  let { SATCAT } = LegacyFormat;
  for (let format in satcat) {
    expect(results.satcat)
      .toStrictEqual(
        (await parse(satcat[format],
          SATCAT,
          SerializationFormat[format]))
          .results);
  }
});
*/
/*
test("parse VCM", () => {
  let { VCM } = LegacyFormat;
  expect(parse(VCM)).toBe(VCM);
});

test("parse VCEPH", () => {
  let { VCEPH } = LegacyFormat;
  expect(parse(VCEPH)).toBe(VCEPH);
});*/