import flatbuffers from "./flatbuffers.mjs";
import { required } from "../lib/required.mjs";
import { Buffer } from "buffer";

const transformType = (builder, _value, type) => {
    switch (type) {
        case "number":
            _value = +_value;
            break;
        case "string":
            _value = builder.createString(new Uint8Array(Buffer.from(_value.toString())));
    }
    return _value;
};
const wrapFlatBuffer = (input = required`input`, schema = required`schema`, fbClass = required`class`, fbCollection, SCOLLECTION, scollBUF) => {
    let schemaKeys = Object.keys(schema.definitions[fbClass.name].properties);
    let results = [];
    if (Array.isArray(input) && input.length) {
        results = input.map((fb) => wrapFlatBuffer(fb, schema, fbClass, fbCollection, false, false)[0]);
    } else {
        if (SCOLLECTION && SCOLLECTION.RECORDSLength() > 0) {
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

                let SFBDATA = fbClass[`getSizePrefixedRootAs${fbClass.name}`](new flatbuffers.ByteBuffer(input));
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

export { wrapFlatBuffer, transformType };