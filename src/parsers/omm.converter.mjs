import { tle, satcat, vcm } from "../parsers/legacy.mjs";
import csv from "neat-csv";
const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format

const numCheck = (schema, pkey, pval) => {
  let sD = schema.definitions.OMM.properties[pkey];
  return sD?.type === "number" || useAsNumber.indexOf(sD?.$ref) > -1 ? parseFloat(pval) ?? null : pval ?? null;
};

let tagTemplate = (tagName) => new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");

const readOMMXML = async (input, schema) => {
  let results = [];
  let xmlOMMArray = input.toString().match(tagTemplate("omm"));
  let schemaTags = Object.keys(schema.definitions.OMM.properties);
  for (let x = 0; x < xmlOMMArray.length; x++) {
    let iOMM = {};
    for (let s = 0; s < schemaTags.length; s++) {
      let tagMatch = [...xmlOMMArray[x].matchAll(tagTemplate(schemaTags[s]))];
      if (tagMatch.length) {
        for (let t = 0; t < tagMatch.length; t++) {
          iOMM[schemaTags[s]] = numCheck(schema, schemaTags[s], tagMatch[t][1]);
        }
      }
    }
    results.push(iOMM);
  }
  return { results };
};

const readOMMJSON = (input, schema) => {
  let results = (JSON.parse(input)).map((r) => {
    for (let p in r) {
      r[p] = numCheck(schema, p, r[p]);
    }
    return r;
  });
  return { results };
};

const readOMMCSV = async (input, schema) => {
  let results = (await csv(input)).map((row) => {
    for (let prop in row) {
      row[prop] = numCheck(schema, prop, row[prop]);
    }
    return row;
  });

  return { results };
};

/*
    let rStream = */

const readTLE = (input, schema) => {
  return new Promise((resolve, reject) => {
    let isRStream = input.hasOwnProperty("_readableState");
    input = isRStream
      ? input
      : {
        data: input,
        init: false,
        async read() {
          if (!this.init) {
            this.init = true;
            return "";
          } else {
            return { value: this.data, done: true };
          }
        },
      };
    let tles = new tle(input);
    let started = false;
    const init = async () => {
      if (started) return;
      started = true;
      let stop = await tles.readLines();
      let results = tles.lines.map(tles.format.OMM);
      let raw = tles.lines;
      resolve({ results, raw });
    };
    if (!isRStream) {
      init();
    } else {
      input.on("readable", init);
    }
  });
};

export { numCheck, readOMMXML, readOMMJSON, readOMMCSV, readTLE };
