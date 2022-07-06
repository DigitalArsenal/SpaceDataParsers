"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fbs = exports.txt = exports.csv = exports.json = exports.numCheck = void 0;
const tslib_1 = require("tslib");
const legacy_1 = require("../parsers/legacy");
const ncsv = tslib_1.__importStar(require("csv/sync"));
const flatbuffers = tslib_1.__importStar(require("flatbuffers"));
const SATCATCOLLECTION_1 = require("@/lib/SAT/SATCATCOLLECTION");
const SATCAT_1 = require("@/lib/SAT/SATCAT");
const numCheck_1 = tslib_1.__importDefault(require("./numCheck"));
exports.numCheck = numCheck_1.default;
const json = (input, schema) => {
    if (typeof input === "string") {
        input = JSON.parse(input);
    }
    ;
    let resultsSATCATCOLLECTION = new SATCATCOLLECTION_1.SATCATCOLLECTIONT;
    resultsSATCATCOLLECTION.RECORDS = (input).map((r) => {
        for (let p in r) {
            r[p] = (0, numCheck_1.default)(schema.definitions.SATCAT, p, r[p]);
        }
        return r;
    });
    return resultsSATCATCOLLECTION;
};
exports.json = json;
const csv = async (input, schema) => {
    let resultsSATCATCOLLECTION = new SATCATCOLLECTION_1.SATCATCOLLECTIONT;
    let intermediateResults = (await ncsv.parse(input, {
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
const txt = (input) => {
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
                    }
                    else {
                        return { value: this.data, done: true };
                    }
                },
            };
        let satCat = new legacy_1.satcat(input);
        let started = false;
        const init = async () => {
            if (started)
                return;
            started = true;
            let stop = await satCat.readLines();
            if (!stop)
                return;
            let resultsSATCATCOLLECTION = new SATCATCOLLECTION_1.SATCATCOLLECTIONT;
            resultsSATCATCOLLECTION.RECORDS = satCat.lines.map(satCat.format.CAT);
            resolve(resultsSATCATCOLLECTION);
        };
        if (!isRStream) {
            init();
        }
        else {
            input.on("readable", init);
        }
    });
};
exports.txt = txt;
const fbs = async (input) => {
    let satCollection = new SATCATCOLLECTION_1.SATCATCOLLECTIONT;
    SATCATCOLLECTION_1.SATCATCOLLECTION.getRootAsSATCATCOLLECTION(new flatbuffers.ByteBuffer(input)).unpackTo(satCollection);
    return satCollection;
};
exports.fbs = fbs;
//# sourceMappingURL=sat.converter.js.map