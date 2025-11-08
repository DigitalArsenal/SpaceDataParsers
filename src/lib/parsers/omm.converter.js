import { tle as ntle } from "../parsers/legacy.js";
import { parse as csvparse } from 'csv-parse/browser/esm/sync';
import { decode } from "html-entities";
import numCheck from "./numCheck.js";
const createCollection = () => ({ RECORDS: [] });
const isKnownField = (schema, field) => Boolean(schema.definitions?.OMM?.properties?.[field]);
let tagTemplate = (tagName) => new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");
const xml = (input, schema) => {
    let resultsOMMCOLLECTION = createCollection();
    let xmlOMMArray = input.toString().match(tagTemplate("omm")) || [];
    let schemaTags = Object.keys(schema.definitions.OMM.properties);
    for (let x = 0; x < xmlOMMArray.length; x++) {
        let iOMM = {};
        for (let s = 0; s < schemaTags.length; s++) {
            let tagMatch = [...xmlOMMArray[x].matchAll(tagTemplate(schemaTags[s]))];
            if (tagMatch.length) {
                for (let t = 0; t < tagMatch.length; t++) {
                    iOMM[schemaTags[s]] = numCheck(schema.definitions.OMM, schemaTags[s], decode(tagMatch[t][1]));
                }
            }
        }
        resultsOMMCOLLECTION.RECORDS.push(iOMM);
    }
    return resultsOMMCOLLECTION;
};
const json = (input, schema) => {
    if (typeof input === "string") {
        input = JSON.parse(input);
    }
    ;
    let resultsOMMCOLLECTION = createCollection();
    resultsOMMCOLLECTION.RECORDS = (input).map((record) => {
        let normalized = {};
        for (let p in record) {
            if (!isKnownField(schema, p))
                continue;
            normalized[p] = numCheck(schema.definitions.OMM, p, record[p]);
        }
        return normalized;
    });
    return resultsOMMCOLLECTION;
};
const csv = async (input, schema) => {
    let resultsOMMCOLLECTION = createCollection();
    let intermediateResults = (await csvparse(input, {
        columns: true,
        skip_empty_lines: true
    }));
    intermediateResults.forEach((row) => {
        let newOMM = {};
        for (let prop in row) {
            if (isKnownField(schema, prop)) {
                newOMM[prop] = numCheck(schema.definitions.OMM, prop, row[prop]);
            }
        }
        resultsOMMCOLLECTION.RECORDS.push(newOMM);
    });
    return resultsOMMCOLLECTION;
};
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
        let tles = new ntle(input);
        let started = false;
        const init = async () => {
            if (started)
                return;
            started = true;
            let stop = await tles.readLines();
            if (!stop)
                return;
            let resultsOMMCOLLECTION = createCollection();
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
const kvn = async (input, schema) => {
    let lines = input.split(/\r?\n/g);
    let resultsOMMCOLLECTION = createCollection();
    let _OMM = {};
    for (let i = 0; i < lines.length; i++) {
        let [predicate, value] = lines[i].split("=").map(x => x.trim());
        if (predicate === "CCSDS_OMM_VERS") {
            if (_OMM.CCSDS_OMM_VERS) {
                resultsOMMCOLLECTION.RECORDS.push(_OMM);
            }
            _OMM = {};
        }
        if (isKnownField(schema, predicate)) {
            _OMM[predicate] = numCheck(schema.definitions.OMM, predicate, value);
        }
    }
    resultsOMMCOLLECTION.RECORDS.push(_OMM);
    return resultsOMMCOLLECTION;
};
export { numCheck, xml, json, csv, txt, txt as tle, kvn };
