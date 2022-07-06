"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializationFormat = exports.LegacyFormat = exports.schemas = exports.parse = void 0;
const tslib_1 = require("tslib");
const legacyformat_enum_1 = require("./lib/legacyformat.enum");
Object.defineProperty(exports, "LegacyFormat", { enumerable: true, get: function () { return legacyformat_enum_1.LegacyFormat; } });
const serialization_enum_1 = require("./lib/serialization.enum");
Object.defineProperty(exports, "SerializationFormat", { enumerable: true, get: function () { return serialization_enum_1.SerializationFormat; } });
const omm = tslib_1.__importStar(require("@/lib/parsers/omm.converter"));
const sat = tslib_1.__importStar(require("@/lib/parsers/sat.converter"));
const omm_schema_1 = tslib_1.__importDefault(require("@/lib/OMM/omm.schema"));
const sat_schema_1 = tslib_1.__importDefault(require("@/lib/SAT/sat.schema"));
const flatbuffers = tslib_1.__importStar(require("flatbuffers"));
const parse = async (data, format, serialization, resultSerialization = serialization_enum_1.SerializationFormat.json) => {
    let sFormat = serialization_enum_1.SerializationFormat[serialization];
    if (format === legacyformat_enum_1.LegacyFormat.TLE) {
        let parser = omm;
        let ommCollection = await parser[sFormat](data, omm_schema_1.default);
        if (resultSerialization === serialization_enum_1.SerializationFormat.fbs) {
            let flatBufferBuilder = new flatbuffers.Builder(1);
            flatBufferBuilder.finish(ommCollection.pack(flatBufferBuilder));
            return flatBufferBuilder.asUint8Array();
        }
        return ommCollection;
    }
    else if (format === legacyformat_enum_1.LegacyFormat.SATCAT) {
        let parser = sat;
        let satCollection = await parser[sFormat](data, sat_schema_1.default);
        if (resultSerialization === serialization_enum_1.SerializationFormat.fbs) {
            let flatBufferBuilder = new flatbuffers.Builder(1);
            flatBufferBuilder.finish(satCollection.pack(flatBufferBuilder));
            return flatBufferBuilder.asUint8Array();
        }
        return satCollection;
    }
};
exports.parse = parse;
exports.schemas = {
    OMM: omm_schema_1.default,
    SAT: sat_schema_1.default
};
//# sourceMappingURL=main.js.map