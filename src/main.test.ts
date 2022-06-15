import { parse } from "./main"
import { LegacyFormat } from "./lib/legacyformat.enum";
import { SerializationFormat } from "./lib/serialization.enum";
import { readFileSync } from "fs";

let results = { tle: JSON.parse(readFileSync("./test/data/celestrak/catalog.json", "utf-8")) }

let tle = {
  csv: readFileSync("./test/data/celestrak/catalog.csv", "utf-8")
}

test("parse TLE", async () => {
  let { TLE } = LegacyFormat;
  for (let format in tle) {
    expect(results.tle)
      .toStrictEqual(
        (await parse(tle[format],
          TLE,
          SerializationFormat[format]))
          .results);
  }
});

test("parse SATCAT", () => {
  let { SATCAT } = LegacyFormat;
  expect(parse(SATCAT)).toBe(SATCAT);
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