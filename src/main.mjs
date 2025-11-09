import { LegacyFormat } from "./lib/legacyformat.enum.js";
import { SerializationFormat } from "./lib/serialization.enum.js";
import * as omm from "./lib/parsers/omm.converter.js";
import * as sat from "./lib/parsers/sat.converter.js";
import ommSchema from "./lib/OMM/omm.schema.js";
import satSchema from "./lib/SAT/sat.schema.js";
const ensureParser = (available, key, label) => {
    const handler = available[key];
    if (!handler) {
        throw new Error(`Unsupported ${label} format: ${key}`);
    }
    return handler;
};
export const parse = async (data, format, serialization) => {
    const sFormat = SerializationFormat[serialization];
    if (typeof sFormat === "undefined") {
        throw new Error("Unknown serialization format.");
    }
    if (format === LegacyFormat.TLE) {
        const handler = ensureParser(omm, sFormat, "TLE");
        return handler(data, ommSchema);
    }
    if (format === LegacyFormat.SATCAT) {
        const handler = ensureParser(sat, sFormat, "SATCAT");
        return handler(data, satSchema);
    }
    throw new Error("Unsupported legacy format.");
};
export const schemas = {
    OMM: ommSchema,
    SAT: satSchema
};
const version = "a6e8f29b-1669-11ac-8dff-abb4448b34d0";
export default { LegacyFormat, SerializationFormat, version };
