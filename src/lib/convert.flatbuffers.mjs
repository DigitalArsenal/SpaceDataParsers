import flatbuffers from "./flatbuffers.mjs";
import { required } from "../lib/required.mjs";

const wrapFlatBuffer = (input = required`input`, schema = required`schema`, fbClass = required`class`, fbCollection) => {
    let schemaKeys = Object.keys(schema.definitions[fbClass.name].properties);
    let results = [];
    if (Array.isArray(input)) {
        results = input.map((fb) => wrapFlatBuffer(fb, schema, fbClass, fbCollection)[0]);
    } else {
        let buf = new flatbuffers.ByteBuffer(input);
        if (fbCollection) {
            let SCOLLECTION = fbCollection[`getRootAs${fbCollection.name}`](buf);
            for (let i = 0; i < SCOLLECTION.RECORDSLength(); i++) {
                let result = {};
                Object.defineProperty(result, "flatbuffer", {
                    get() {
                        return SCOLLECTION.RECORDS(i);
                    },
                    configurable: false,
                    enumerable: false
                });
                for (let key in schemaKeys) {
                    let sK = schemaKeys[key];
                    result[sK] = null;
                    if (typeof SCOLLECTION.RECORDS(i)[sK] === "function") {
                        Object.defineProperty(result, sK, {
                            get() {
                                return SCOLLECTION.RECORDS(i)[sK]();
                            },
                        });
                    }
                }
                results.push(result);
            }
        } else {
            try {
                let SFBDATA = fbClass[`getSizePrefixedRootAs${fbClass.name}`](buf);
                let result = {};
                Object.defineProperty(result, "flatbuffer", {
                    get() {
                        return SFBDATA;
                    },
                    configurable: false,
                    enumerable: false
                });
                for (let key in schemaKeys) {
                    let sK = schemaKeys[key];
                    if (typeof SFBDATA[sK] === "function") {
                        Object.defineProperty(result, sK, {
                            enumerable: true,
                            get() {
                                return SFBDATA[sK]();
                            },
                        });
                    }
                }
                results.push(result);
            } catch (e) {
                console.log(e);
            }
        }
    }
    return results;
};

export { wrapFlatBuffer };