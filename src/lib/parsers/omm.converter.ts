import { tle as ntle } from "../parsers/legacy";
import ncsv from "neat-csv";
const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format

const numCheck = (schema: any, pkey: string, pval: any) => {
  let sD = schema.definitions.OMM.properties[pkey];
  return sD?.type === "number" || useAsNumber.indexOf(sD?.$ref) > -1 ? parseFloat(pval) ?? null : pval ?? null;
};

let tagTemplate = (tagName: string) => new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");

const xml = (input: string, schema: any) => {
  let results = [];
  let xmlOMMArray = input.toString().match(tagTemplate("omm")) || [];
  let schemaTags = Object.keys(schema.definitions.OMM.properties);
  for (let x = 0; x < xmlOMMArray.length; x++) {
    let iOMM: any = {};
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

const json = (input: any, schema: any) => {
  let results = (JSON.parse(input)).map((r: any) => {
    for (let p in r) {
      r[p] = numCheck(schema, p, r[p]);
    }
    return r;
  });

  return { results };
};

const csv = async (input: any, schema: any) => {
  let results = (await ncsv(input)).map((row) => {
    for (let prop in row) {
      row[prop] = numCheck(schema, prop, row[prop]);
    }
    return row;
  });

  return { results };
};

const tle = (input: any): Promise<any> => {
  return new Promise((resolve) => {
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
    let tles = new ntle(input);
    let started = false;
    const init = async () => {
      if (started) return;
      started = true;
      let stop = await tles.readLines();
      let results = tles.lines.map(tles.format.OMM);
      let raw = tles.lines;
      resolve({ results, raw, stop });
    };
    if (!isRStream) {
      init();
    } else {
      input.on("readable", init);
    }
  });
};

export { numCheck, xml, json, csv, tle };