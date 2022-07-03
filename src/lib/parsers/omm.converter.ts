import { tle as ntle } from "../parsers/legacy";
import * as ncsv from "csv/sync";
import flatbufferScalartypes from "./flatbuffer.scalartypes";
import * as flatbuffers from "flatbuffers";
import { OMMCOLLECTION as _OMMCOLLECTION, OMMCOLLECTIONT as OMMCOLLECTION } from "@/lib/OMM/OMMCOLLECTION";
import { OMMT as OMM } from "@/lib/OMM/OMM";
import { decode } from "html-entities";

const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format

const numCheck = (schema: any, pkey: string, pval: any) => {
  let sD = schema.definitions.OMM.properties[pkey];
  return ~flatbufferScalartypes.indexOf(sD?.type) || useAsNumber.indexOf(sD?.$ref) > -1 ? parseFloat(pval) ?? null : pval ?? null;
};

let tagTemplate = (tagName: string) => new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");

const xml = (input: string, schema: any): OMMCOLLECTION => {
  let resultsOMMCOLLECTION = new OMMCOLLECTION;
  let xmlOMMArray = input.toString().match(tagTemplate("omm")) || [];
  let schemaTags = Object.keys(schema.definitions.OMM.properties);
  for (let x = 0; x < xmlOMMArray.length; x++) {
    let iOMM: any = {};
    for (let s = 0; s < schemaTags.length; s++) {
      let tagMatch = [...xmlOMMArray[x].matchAll(tagTemplate(schemaTags[s]))];
      if (tagMatch.length) {
        for (let t = 0; t < tagMatch.length; t++) {
          iOMM[schemaTags[s]] = numCheck(schema, schemaTags[s], decode(tagMatch[t][1]));
        }
      }
    }
    resultsOMMCOLLECTION.RECORDS.push(iOMM);
  }
  return resultsOMMCOLLECTION;
};

const json = (input: string | Array<OMM>, schema: any): OMMCOLLECTION => {
  if (typeof input === "string") {
    input = JSON.parse(input)
  };

  let resultsOMMCOLLECTION = new OMMCOLLECTION;
  resultsOMMCOLLECTION.RECORDS = ((input) as Array<OMM>).map((r: any) => {
    for (let p in r) {
      r[p] = numCheck(schema, p, r[p]);
    }
    return r;
  });

  return resultsOMMCOLLECTION;
};

const csv = async (input: any, schema: any): Promise<OMMCOLLECTION> => {
  let resultsOMMCOLLECTION = new OMMCOLLECTION;
  let intermediateResults = (await ncsv.parse(input, {
    columns: true,
    skip_empty_lines: true
  }));
  intermediateResults.forEach((row: any) => {
    let newOMM: OMM = new OMM();
    for (let prop in row) {
      if (newOMM.hasOwnProperty(prop)) {
        //@ts-ignore
        newOMM[prop] = numCheck(schema, prop, row[prop]);
      }
    }
    resultsOMMCOLLECTION.RECORDS.push(newOMM);
  });
  return resultsOMMCOLLECTION;
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
    let tles = new ntle(input);
    let started = false;
    const init = async () => {
      if (started) return;
      started = true;
      let stop = await tles.readLines();
      if (!stop) return;
      let resultsOMMCOLLECTION = new OMMCOLLECTION;
      resultsOMMCOLLECTION.RECORDS = tles.lines.map(tles.format.OMM);
      resolve(resultsOMMCOLLECTION);
    };
    if (!isRStream) {
      init();
    } else {
      input.on("readable", init);
    }
  });
};

const kvn = async (input: string, schema: any): Promise<OMMCOLLECTION> => {
  let lines = input.split(/\r?\n/g);
  let resultsOMMCOLLECTION = new OMMCOLLECTION;
  let _OMM: OMM = new OMM;

  for (let i = 0; i < lines.length; i++) {

    let [predicate, value] = lines[i].split("=").map(x => x.trim());

    if (predicate === "CCSDS_OMM_VERS") {
      if (_OMM.CCSDS_OMM_VERS) {
        resultsOMMCOLLECTION.RECORDS.push(_OMM);
      }
      _OMM = new OMM;
    }

    if (_OMM.hasOwnProperty(predicate)) {
      //@ts-ignore
      _OMM[predicate] = numCheck(schema, predicate, value);
    }
  }
  resultsOMMCOLLECTION.RECORDS.push(_OMM);
  return resultsOMMCOLLECTION;
}

const fbs = async (input: Uint8Array): Promise<OMMCOLLECTION> => {
  let ommcollection = new OMMCOLLECTION;
  _OMMCOLLECTION.getRootAsOMMCOLLECTION(new flatbuffers.ByteBuffer(input)).unpackTo(ommcollection);
  return ommcollection;
}
export { numCheck, xml, json, csv, txt, txt as tle, kvn, fbs };
