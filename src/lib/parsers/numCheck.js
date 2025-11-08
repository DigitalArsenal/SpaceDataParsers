import flatbufferScalartypes from "./flatbuffer.scalartypes.js";
const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format
const numCheck = (schema, pkey, pval) => {
    let sD = schema.properties[pkey];
    let pF = parseFloat(pval);
    let isZero = pF === 0;
    return ~flatbufferScalartypes.indexOf(sD?.type) || useAsNumber.indexOf(sD?.$ref) > -1 ? isZero ? pF : pF || null : pval ?? null;
};
export default numCheck;
