import { satcat } from "../parsers/legacy";
import * as ncsv from "csv/sync";
import flatbufferScalartypes from "./flatbuffer.scalartypes";
import * as flatbuffers from "flatbuffers";
import { SATCATCOLLECTION as _SATCOLLECTION, SATCATCOLLECTIONT as SATCOLLECTION } from "@/lib/SAT/SATCATCOLLECTION";
import { SATCATT as SAT } from "@/lib/SAT/SATCAT";

const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format

const numCheck = (schema: any, pkey: string, pval: any) => {
  let sD = schema.definitions.SATCAT.properties[pkey];
  return ~flatbufferScalartypes.indexOf(sD?.type) || useAsNumber.indexOf(sD?.$ref) > -1 ? parseFloat(pval) ?? null : pval ?? null;
};


const json = (input: string | Array<SAT>, schema: any): SATCOLLECTION => {
  if (typeof input === "string") {
    input = JSON.parse(input)
  };

  let resultsSATCOLLECTION = new SATCOLLECTION;
  resultsSATCOLLECTION.RECORDS = ((input) as Array<SAT>).map((r: any) => {
    for (let p in r) {
      r[p] = numCheck(schema, p, r[p]);
    }
    return r;
  });

  return resultsSATCOLLECTION;
};

const csv = async (input: any, schema: any): Promise<SATCOLLECTION> => {
  let resultsSATCOLLECTION = new SATCOLLECTION;
  let intermediateResults = (await ncsv.parse(input, {
    columns: true,
    skip_empty_lines: true
  }));
  intermediateResults.forEach((row: any) => {
    let newSAT: SAT = new SAT();
    for (let prop in row) {
      if (newSAT.hasOwnProperty(prop)) {
        //@ts-ignore
        newSAT[prop] = numCheck(schema, prop, row[prop]);
      }
    }
    resultsSATCOLLECTION.RECORDS.push(newSAT);
  });
  return resultsSATCOLLECTION;
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
      let resultsSATCOLLECTION = new SATCOLLECTION;
      resultsSATCOLLECTION.RECORDS = satCat.lines.map(satCat.format.CAT) as Array<any>;
      resolve(resultsSATCOLLECTION);
    };
    if (!isRStream) {
      init();
    } else {
      input.on("readable", init);
    }
  });
};


const fbs = async (input: Uint8Array): Promise<SATCOLLECTION> => {
  let satCollection = new SATCOLLECTION;
  _SATCOLLECTION.getRootAsSATCATCOLLECTION(new flatbuffers.ByteBuffer(input)).unpackTo(satCollection);
  return satCollection;
}
export { numCheck, json, csv, txt, fbs };
