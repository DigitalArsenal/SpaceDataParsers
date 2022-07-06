"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fbs = exports.kvn = exports.tle = exports.txt = exports.csv = exports.json = exports.xml = exports.numCheck = void 0;
const tslib_1 = require("tslib");
const legacy_1 = require("../parsers/legacy");
const ncsv = tslib_1.__importStar(require("csv/sync"));
const flatbuffers = tslib_1.__importStar(require("flatbuffers"));
const OMMCOLLECTION_1 = require("@/lib/OMM/OMMCOLLECTION");
const OMM_1 = require("@/lib/OMM/OMM");
const html_entities_1 = require("html-entities");
const numCheck_1 = tslib_1.__importDefault(require("./numCheck"));
exports.numCheck = numCheck_1.default;
let tagTemplate = (tagName) => new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");
const xml = (input, schema) => {
    let resultsOMMCOLLECTION = new OMMCOLLECTION_1.OMMCOLLECTIONT;
    let xmlOMMArray = input.toString().match(tagTemplate("omm")) || [];
    let schemaTags = Object.keys(schema.definitions.OMM.properties);
    for (let x = 0; x < xmlOMMArray.length; x++) {
        let iOMM = {};
        for (let s = 0; s < schemaTags.length; s++) {
            let tagMatch = [...xmlOMMArray[x].matchAll(tagTemplate(schemaTags[s]))];
            if (tagMatch.length) {
                for (let t = 0; t < tagMatch.length; t++) {
                    iOMM[schemaTags[s]] = (0, numCheck_1.default)(schema.definitions.OMM, schemaTags[s], (0, html_entities_1.decode)(tagMatch[t][1]));
                }
            }
        }
        resultsOMMCOLLECTION.RECORDS.push(iOMM);
    }
    return resultsOMMCOLLECTION;
};
exports.xml = xml;
const json = (input, schema) => {
    if (typeof input === "string") {
        input = JSON.parse(input);
    }
    ;
    let resultsOMMCOLLECTION = new OMMCOLLECTION_1.OMMCOLLECTIONT;
    resultsOMMCOLLECTION.RECORDS = (input).map((r) => {
        for (let p in r) {
            r[p] = (0, numCheck_1.default)(schema.definitions.OMM, p, r[p]);
        }
        return r;
    });
    return resultsOMMCOLLECTION;
};
exports.json = json;
const csv = async (input, schema) => {
    let resultsOMMCOLLECTION = new OMMCOLLECTION_1.OMMCOLLECTIONT;
    let intermediateResults = (await ncsv.parse(input, {
        columns: true,
        skip_empty_lines: true
    }));
    intermediateResults.forEach((row) => {
        let newOMM = new OMM_1.OMMT();
        for (let prop in row) {
            if (newOMM.hasOwnProperty(prop)) {
                //@ts-ignore
                newOMM[prop] = (0, numCheck_1.default)(schema.definitions.OMM, prop, row[prop]);
            }
        }
        resultsOMMCOLLECTION.RECORDS.push(newOMM);
    });
    return resultsOMMCOLLECTION;
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
        let tles = new legacy_1.tle(input);
        let started = false;
        const init = async () => {
            if (started)
                return;
            started = true;
            let stop = await tles.readLines();
            if (!stop)
                return;
            let resultsOMMCOLLECTION = new OMMCOLLECTION_1.OMMCOLLECTIONT;
            resultsOMMCOLLECTION.RECORDS = tles.lines.map(tles.format.OMM);
            resolve(resultsOMMCOLLECTION);
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
exports.tle = txt;
const kvn = async (input, schema) => {
    let lines = input.split(/\r?\n/g);
    let resultsOMMCOLLECTION = new OMMCOLLECTION_1.OMMCOLLECTIONT;
    let _OMM = new OMM_1.OMMT;
    for (let i = 0; i < lines.length; i++) {
        let [predicate, value] = lines[i].split("=").map(x => x.trim());
        if (predicate === "CCSDS_OMM_VERS") {
            if (_OMM.CCSDS_OMM_VERS) {
                resultsOMMCOLLECTION.RECORDS.push(_OMM);
            }
            _OMM = new OMM_1.OMMT;
        }
        if (_OMM.hasOwnProperty(predicate)) {
            //@ts-ignore
            _OMM[predicate] = (0, numCheck_1.default)(schema.definitions.OMM, predicate, value);
        }
    }
    resultsOMMCOLLECTION.RECORDS.push(_OMM);
    return resultsOMMCOLLECTION;
};
exports.kvn = kvn;
const fbs = async (input) => {
    let ommcollection = new OMMCOLLECTION_1.OMMCOLLECTIONT;
    OMMCOLLECTION_1.OMMCOLLECTION.getRootAsOMMCOLLECTION(new flatbuffers.ByteBuffer(input)).unpackTo(ommcollection);
    return ommcollection;
};
exports.fbs = fbs;
//# sourceMappingURL=omm.converter.js.map