"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const flatbuffer_scalartypes_1 = tslib_1.__importDefault(require("./flatbuffer.scalartypes"));
const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format
const numCheck = (schema, pkey, pval) => {
    let sD = schema.properties[pkey];
    let pF = parseFloat(pval);
    let isZero = pF === 0;
    return ~flatbuffer_scalartypes_1.default.indexOf(sD?.type) || useAsNumber.indexOf(sD?.$ref) > -1 ? isZero ? pF : pF || null : pval ?? null;
};
exports.default = numCheck;
//# sourceMappingURL=numCheck.js.map