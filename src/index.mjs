import xml2js from 'xml2js';
import csv from 'neat-csv';
import { Readable } from "stream";
import { tle, satcat, vcm } from "./parsers/legacy.mjs";

const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format

const numCheck = (schema, pkey, pval) => {
    let sD = schema.definitions.OMM.properties[pkey];
    return (sD?.type === "number" || useAsNumber.indexOf(sD?.$ref) > -1) ? parseFloat(pval) ?? null : pval ?? null;
}

const parseOMMXML = async (input, schema) => {
    let xp = await new xml2js.Parser({
        parseNumbers: true
    }).parseStringPromise(input);
    return xp.ndm.omm.map(om => {
        let intermediate = {};
        [om.header[0],
        om.body[0].segment[0].metadata[0],
        om.body[0].segment[0].data[0]].forEach(xmlPath => {
            for (let prop in xmlPath) {
                if (["meanElements",
                    "covarianceMatrix",
                    "userDefinedParameters",
                    "tleParameters",
                    "spacecraftParameters"].indexOf(prop) === -1) {
                    intermediate[prop] = numCheck(schema, prop, xmlPath[prop][0]);
                } else {
                    for (let pprop in xmlPath[prop][0]) {
                        intermediate[pprop] = numCheck(schema, pprop, xmlPath[prop][0][pprop][0]);
                    }
                }
            }
        })
        for (let prop in intermediate) {
            if (intermediate[prop]?.hasOwnProperty("$")) {
                intermediate[intermediate[prop].$.parameter] = numCheck(schema, prop, intermediate[prop]._);
                delete intermediate[prop];
            }
        }
        return intermediate;
    });
}

const parseOMMJSON = (input, schema) => {
    return JSON.parse(input, function (key, value) {
        return numCheck(schema, key, value);
    });
}

const parseOMMCSV = async (input, schema) => {
    let results = (await (csv(input))).map(row => {
        for (let prop in row) {
            row[prop] = numCheck(schema, prop, row[prop]);
        }
        return row;
    });

    return results;
}

const parseTLE = (input, schema) => {
    return new Promise((resolve, reject) => {
        input = input instanceof Readable ? input : Readable.from(input);
        let tles = new tle(input);
        let started = false;
        input.on('readable', async () => {
            if (started) return;
            started = true;
            let stop = await tles.readLines();
            let results = tles.lines.map(tles.format.OMM);
            let raw = tles.lines;
            resolve({ results, raw });
        });
    })

}

export { numCheck, parseOMMXML, parseOMMJSON, parseOMMCSV, parseTLE };