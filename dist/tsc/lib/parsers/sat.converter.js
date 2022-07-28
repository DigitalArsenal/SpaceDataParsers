"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fbs = exports.csv = exports.json = exports.numCheck = void 0;
const tslib_1 = require("tslib");
const sync_1 = require("csv-parse/browser/esm/sync");
const flatbuffers = tslib_1.__importStar(require("flatbuffers"));
const SATCATCOLLECTION_1 = require("@/lib/SAT/SATCATCOLLECTION");
const SATCAT_1 = require("@/lib/SAT/SATCAT");
const numCheck_1 = tslib_1.__importDefault(require("./numCheck"));
exports.numCheck = numCheck_1.default;
const json = async (input, schema) => {
    if (typeof input === "string") {
        input = JSON.parse(input);
    }
    ;
    let resultsSATCATCOLLECTION = new SATCATCOLLECTION_1.SATCATCOLLECTIONT;
    for (let i = 0; i < input.length; i++) {
        let newSAT = new SATCAT_1.SATCATT();
        for (let p in input[i]) {
            let inputSat = input[i];
            if (newSAT.hasOwnProperty(p)) {
                newSAT[p] = (0, numCheck_1.default)(schema.definitions.SATCAT, p, inputSat[p]);
            }
        }
        resultsSATCATCOLLECTION.RECORDS.push(newSAT);
    }
    ;
    return resultsSATCATCOLLECTION;
};
exports.json = json;
const csv = async (input, schema) => {
    let resultsSATCATCOLLECTION = new SATCATCOLLECTION_1.SATCATCOLLECTIONT;
    let intermediateResults = (await (0, sync_1.parse)(input, {
        columns: true,
        skip_empty_lines: true
    }));
    intermediateResults.forEach((row) => {
        let newSAT = new SATCAT_1.SATCATT();
        for (let prop in row) {
            if (newSAT.hasOwnProperty(prop)) {
                //@ts-ignore
                newSAT[prop] = (0, numCheck_1.default)(schema.definitions.SATCAT, prop, row[prop]);
            }
        }
        resultsSATCATCOLLECTION.RECORDS.push(newSAT);
    });
    return resultsSATCATCOLLECTION;
};
exports.csv = csv;
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
const fbs = async (input) => {
    let satCollection = new SATCATCOLLECTION_1.SATCATCOLLECTIONT;
    SATCATCOLLECTION_1.SATCATCOLLECTION.getRootAsSATCATCOLLECTION(new flatbuffers.ByteBuffer(input)).unpackTo(satCollection);
    return satCollection;
};
exports.fbs = fbs;
//# sourceMappingURL=sat.converter.js.map