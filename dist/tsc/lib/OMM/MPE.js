"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.MPET = exports.MPE = void 0;
const tslib_1 = require("tslib");
const flatbuffers = tslib_1.__importStar(require("flatbuffers"));
class MPE {
    bb = null;
    bb_pos = 0;
    __init(i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    }
    static getRootAsMPE(bb, obj) {
        return (obj || new MPE()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    static getSizePrefixedRootAsMPE(bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new MPE()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    }
    MEAN_MOTION() {
        const offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
    }
    ECCENTRICITY() {
        const offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
    }
    INCLINATION() {
        const offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
    }
    RA_OF_ASC_NODE() {
        const offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
    }
    ARG_OF_PERICENTER() {
        const offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
    }
    MEAN_ANOMALY() {
        const offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
    }
    NORAD_CAT_ID() {
        const offset = this.bb.__offset(this.bb_pos, 16);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    }
    BSTAR() {
        const offset = this.bb.__offset(this.bb_pos, 18);
        return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
    }
    USER_DEFINED_EPOCH_TIMESTAMP() {
        const offset = this.bb.__offset(this.bb_pos, 20);
        return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
    }
    static startMPE(builder) {
        builder.startObject(9);
    }
    static addMEAN_MOTION(builder, MEAN_MOTION) {
        builder.addFieldFloat64(0, MEAN_MOTION, 0.0);
    }
    static addECCENTRICITY(builder, ECCENTRICITY) {
        builder.addFieldFloat64(1, ECCENTRICITY, 0.0);
    }
    static addINCLINATION(builder, INCLINATION) {
        builder.addFieldFloat64(2, INCLINATION, 0.0);
    }
    static addRA_OF_ASC_NODE(builder, RA_OF_ASC_NODE) {
        builder.addFieldFloat64(3, RA_OF_ASC_NODE, 0.0);
    }
    static addARG_OF_PERICENTER(builder, ARG_OF_PERICENTER) {
        builder.addFieldFloat64(4, ARG_OF_PERICENTER, 0.0);
    }
    static addMEAN_ANOMALY(builder, MEAN_ANOMALY) {
        builder.addFieldFloat64(5, MEAN_ANOMALY, 0.0);
    }
    static addNORAD_CAT_ID(builder, NORAD_CAT_ID) {
        builder.addFieldInt32(6, NORAD_CAT_ID, 0);
    }
    static addBSTAR(builder, BSTAR) {
        builder.addFieldFloat64(7, BSTAR, 0.0);
    }
    static addUSER_DEFINED_EPOCH_TIMESTAMP(builder, USER_DEFINED_EPOCH_TIMESTAMP) {
        builder.addFieldFloat64(8, USER_DEFINED_EPOCH_TIMESTAMP, 0.0);
    }
    static endMPE(builder) {
        const offset = builder.endObject();
        return offset;
    }
    static createMPE(builder, MEAN_MOTION, ECCENTRICITY, INCLINATION, RA_OF_ASC_NODE, ARG_OF_PERICENTER, MEAN_ANOMALY, NORAD_CAT_ID, BSTAR, USER_DEFINED_EPOCH_TIMESTAMP) {
        MPE.startMPE(builder);
        MPE.addMEAN_MOTION(builder, MEAN_MOTION);
        MPE.addECCENTRICITY(builder, ECCENTRICITY);
        MPE.addINCLINATION(builder, INCLINATION);
        MPE.addRA_OF_ASC_NODE(builder, RA_OF_ASC_NODE);
        MPE.addARG_OF_PERICENTER(builder, ARG_OF_PERICENTER);
        MPE.addMEAN_ANOMALY(builder, MEAN_ANOMALY);
        MPE.addNORAD_CAT_ID(builder, NORAD_CAT_ID);
        MPE.addBSTAR(builder, BSTAR);
        MPE.addUSER_DEFINED_EPOCH_TIMESTAMP(builder, USER_DEFINED_EPOCH_TIMESTAMP);
        return MPE.endMPE(builder);
    }
    unpack() {
        return new MPET(this.MEAN_MOTION(), this.ECCENTRICITY(), this.INCLINATION(), this.RA_OF_ASC_NODE(), this.ARG_OF_PERICENTER(), this.MEAN_ANOMALY(), this.NORAD_CAT_ID(), this.BSTAR(), this.USER_DEFINED_EPOCH_TIMESTAMP());
    }
    unpackTo(_o) {
        _o.MEAN_MOTION = this.MEAN_MOTION();
        _o.ECCENTRICITY = this.ECCENTRICITY();
        _o.INCLINATION = this.INCLINATION();
        _o.RA_OF_ASC_NODE = this.RA_OF_ASC_NODE();
        _o.ARG_OF_PERICENTER = this.ARG_OF_PERICENTER();
        _o.MEAN_ANOMALY = this.MEAN_ANOMALY();
        _o.NORAD_CAT_ID = this.NORAD_CAT_ID();
        _o.BSTAR = this.BSTAR();
        _o.USER_DEFINED_EPOCH_TIMESTAMP = this.USER_DEFINED_EPOCH_TIMESTAMP();
    }
}
exports.MPE = MPE;
class MPET {
    MEAN_MOTION;
    ECCENTRICITY;
    INCLINATION;
    RA_OF_ASC_NODE;
    ARG_OF_PERICENTER;
    MEAN_ANOMALY;
    NORAD_CAT_ID;
    BSTAR;
    USER_DEFINED_EPOCH_TIMESTAMP;
    constructor(MEAN_MOTION = 0.0, ECCENTRICITY = 0.0, INCLINATION = 0.0, RA_OF_ASC_NODE = 0.0, ARG_OF_PERICENTER = 0.0, MEAN_ANOMALY = 0.0, NORAD_CAT_ID = 0, BSTAR = 0.0, USER_DEFINED_EPOCH_TIMESTAMP = 0.0) {
        this.MEAN_MOTION = MEAN_MOTION;
        this.ECCENTRICITY = ECCENTRICITY;
        this.INCLINATION = INCLINATION;
        this.RA_OF_ASC_NODE = RA_OF_ASC_NODE;
        this.ARG_OF_PERICENTER = ARG_OF_PERICENTER;
        this.MEAN_ANOMALY = MEAN_ANOMALY;
        this.NORAD_CAT_ID = NORAD_CAT_ID;
        this.BSTAR = BSTAR;
        this.USER_DEFINED_EPOCH_TIMESTAMP = USER_DEFINED_EPOCH_TIMESTAMP;
    }
    pack(builder) {
        return MPE.createMPE(builder, this.MEAN_MOTION, this.ECCENTRICITY, this.INCLINATION, this.RA_OF_ASC_NODE, this.ARG_OF_PERICENTER, this.MEAN_ANOMALY, this.NORAD_CAT_ID, this.BSTAR, this.USER_DEFINED_EPOCH_TIMESTAMP);
    }
}
exports.MPET = MPET;
//# sourceMappingURL=MPE.js.map