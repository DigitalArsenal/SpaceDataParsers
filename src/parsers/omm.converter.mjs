import { tle, satcat, vcm } from "../parsers/legacy.mjs";
import convert from "xml-js";
import csv from "neat-csv";
import { Readable } from "readable-stream";
const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format

const numCheck = (schema, pkey, pval) => {
  let sD = schema.definitions.OMM.properties[pkey];
  return sD?.type === "number" || useAsNumber.indexOf(sD?.$ref) > -1
    ? parseFloat(pval) ?? null
    : pval ?? null;
};

const readOMMXML = async (input, schema) => {
  return convert
    .xml2js(input)
    .elements.filter((e) => e.name === "ndm")[0]
    .elements.filter((e) => e.name === "omm")
    .map((omm) => {
      let intermediate = {};
      let eCheck = (e) => {
        if (e.elements) findElements(e.elements);
      };
      let findElements = (el) => {
        if (Array.isArray(el)) {
          el.forEach((e) => {
            if (
              e.type === "element" &&
              Object.keys(schema.definitions.OMM.properties).indexOf(e.name) >
              -1
            ) {
              intermediate[e.name] = e.elements
                ? numCheck(schema, e.name, e.elements[0].text)
                : undefined;
            }
            eCheck(e);
          });
        } else {
          eCheck(el);
        }
      };
      eCheck(omm);
      return intermediate;
    });
};

const readOMMJSON = (input, schema) => {
  return JSON.parse(input, function (key, value) {
    return numCheck(schema, key, value);
  });
};

const readOMMCSV = async (input, schema) => {
  let results = (await csv(input)).map((row) => {
    for (let prop in row) {
      row[prop] = numCheck(schema, prop, row[prop]);
    }
    return row;
  });

  return results;
};

const readTLE = (input, schema) => {
  return new Promise((resolve, reject) => {
    input = input instanceof Readable ? input : Readable.from(input);
    let tles = new tle(input);
    let started = false;
    input.on("readable", async () => {
      if (started) return;
      started = true;
      let stop = await tles.readLines();
      let results = tles.lines.map(tles.format.OMM);
      let raw = tles.lines;
      resolve({ results, raw });
    });
  });
};

export { numCheck, readOMMXML, readOMMJSON, readOMMCSV, readTLE };
