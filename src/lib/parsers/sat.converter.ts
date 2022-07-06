import { satcat } from "../parsers/legacy";
import { parse as csvparse } from 'csv-parse/browser/esm/sync';
import * as flatbuffers from "flatbuffers";
import { SATCATCOLLECTION as _SATCATCOLLECTION, SATCATCOLLECTIONT as SATCATCOLLECTION } from "@/lib/SAT/SATCATCOLLECTION";
import { SATCATT as SAT } from "@/lib/SAT/SATCAT";
import numCheck from "./numCheck";

const json = (input: string | Array<SAT>, schema: any): SATCATCOLLECTION => {
  if (typeof input === "string") {
    input = JSON.parse(input)
  };

  let resultsSATCATCOLLECTION = new SATCATCOLLECTION;
  resultsSATCATCOLLECTION.RECORDS = ((input) as Array<SAT>).map((r: any) => {
    for (let p in r) {
      r[p] = numCheck(schema.definitions.SATCAT, p, r[p]);
    }
    return r;
  });

  return resultsSATCATCOLLECTION;
};

const csv = async (input: any, schema: any): Promise<SATCATCOLLECTION> => {
  let resultsSATCATCOLLECTION = new SATCATCOLLECTION;
  let intermediateResults = (await csvparse(input, {
    columns: true,
    skip_empty_lines: true
  }));
  intermediateResults.forEach((row: any) => {
    let newSAT: SAT = new SAT();
    for (let prop in row) {
      if (newSAT.hasOwnProperty(prop)) {
        //@ts-ignore
        newSAT[prop] = numCheck(schema.definitions.SATCAT, prop, row[prop]);
      }
    }
    resultsSATCATCOLLECTION.RECORDS.push(newSAT);
  });
  return resultsSATCATCOLLECTION;
};

const txt = (input: any): Promise<any> => {
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
    let satCat = new satcat(input);
    let started = false;
    const init = async () => {
      if (started) return;
      started = true;
      let stop = await satCat.readLines();
      if (!stop) return;
      let resultsSATCATCOLLECTION = new SATCATCOLLECTION;
      resultsSATCATCOLLECTION.RECORDS = satCat.lines.map(satCat.format.CAT) as Array<any>;
      resolve(resultsSATCATCOLLECTION);
    };
    if (!isRStream) {
      init();
    } else {
      input.on("readable", init);
    }
  });
};


const fbs = async (input: Uint8Array): Promise<SATCATCOLLECTION> => {
  let satCollection = new SATCATCOLLECTION;
  _SATCATCOLLECTION.getRootAsSATCATCOLLECTION(new flatbuffers.ByteBuffer(input)).unpackTo(satCollection);
  return satCollection;
}
export { numCheck, json, csv, txt, fbs };
