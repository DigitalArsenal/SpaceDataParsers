import { parse } from "./main"
import { LegacyFormat } from "./lib/legacyformat.enum";
import { SerializationFormat } from "./lib/serialization.enum";
import { readFileSync, writeFileSync } from "fs";

let results = {
  tle: JSON.parse(readFileSync("./test/data/celestrak/catalog.json", "utf-8")),
  //satcat: JSON.parse(readFileSync("./test/data/celestrak/satcat.json", "utf-8"))
}

let tle = {
  csv: readFileSync("./test/data/celestrak/catalog.csv", "utf-8"),
  fbs: readFileSync("./test/data/celestrak/catalog.fbs")
}
/*
let satcat = {
  csv: readFileSync("./test/data/celestrak/satcat.csv", "utf-8"),
}*/

test("parse TLE", async () => {
  let { TLE } = LegacyFormat;
  for (let format in tle) {
    expect(results.tle)
      .toStrictEqual(
        (await parse(tle[format],
          TLE,
          SerializationFormat[format])).RECORDS.map((r, i) => {
            let rObj = {};
            for (let prop in results.tle[0]) {
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