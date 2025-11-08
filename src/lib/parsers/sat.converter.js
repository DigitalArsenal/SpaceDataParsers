import { parse as csvparse } from 'csv-parse/browser/esm/sync';
import numCheck from "./numCheck.js";
const createCollection = () => ({ RECORDS: [] });
const isKnownField = (schema, field) => Boolean(schema.definitions?.SATCAT?.properties?.[field]);
const json = async (input, schema) => {
    if (typeof input === "string") {
        input = JSON.parse(input);
    }
    ;
    let resultsSATCATCOLLECTION = createCollection();
    for (let i = 0; i < input.length; i++) {
        let newSAT = {};
        for (let p in input[i]) {
            let inputSat = input[i];
            if (isKnownField(schema, p)) {
                newSAT[p] = numCheck(schema.definitions.SATCAT, p, inputSat[p]);
            }
        }
        resultsSATCATCOLLECTION.RECORDS.push(newSAT);
    }
    ;
    return resultsSATCATCOLLECTION;
};
const csv = async (input, schema) => {
    let resultsSATCATCOLLECTION = createCollection();
    let intermediateResults = (await csvparse(input, {
        columns: true,
        skip_empty_lines: true
    }));
    intermediateResults.forEach((row) => {
        let newSAT = {};
        for (let prop in row) {
            if (isKnownField(schema, prop)) {
                newSAT[prop] = numCheck(schema.definitions.SATCAT, prop, row[prop]);
            }
        }
        resultsSATCATCOLLECTION.RECORDS.push(newSAT);
    });
    return resultsSATCATCOLLECTION;
};
/*
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
*/
export { numCheck, json, csv /*txt,*/ };
