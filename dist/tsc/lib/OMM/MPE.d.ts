import * as flatbuffers from 'flatbuffers';
export declare class MPE {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): MPE;
    static getRootAsMPE(bb: flatbuffers.ByteBuffer, obj?: MPE): MPE;
    static getSizePrefixedRootAsMPE(bb: flatbuffers.ByteBuffer, obj?: MPE): MPE;
    MEAN_MOTION(): number;
    ECCENTRICITY(): number;
    INCLINATION(): number;
    RA_OF_ASC_NODE(): number;
    ARG_OF_PERICENTER(): number;
    MEAN_ANOMALY(): number;
    NORAD_CAT_ID(): number;
    BSTAR(): number;
    USER_DEFINED_EPOCH_TIMESTAMP(): number;
    static startMPE(builder: flatbuffers.Builder): void;
    static addMEAN_MOTION(builder: flatbuffers.Builder, MEAN_MOTION: number): void;
    static addECCENTRICITY(builder: flatbuffers.Builder, ECCENTRICITY: number): void;
    static addINCLINATION(builder: flatbuffers.Builder, INCLINATION: number): void;
    static addRA_OF_ASC_NODE(builder: flatbuffers.Builder, RA_OF_ASC_NODE: number): void;
    static addARG_OF_PERICENTER(builder: flatbuffers.Builder, ARG_OF_PERICENTER: number): void;
    static addMEAN_ANOMALY(builder: flatbuffers.Builder, MEAN_ANOMALY: number): void;
    static addNORAD_CAT_ID(builder: flatbuffers.Builder, NORAD_CAT_ID: number): void;
    static addBSTAR(builder: flatbuffers.Builder, BSTAR: number): void;
    static addUSER_DEFINED_EPOCH_TIMESTAMP(builder: flatbuffers.Builder, USER_DEFINED_EPOCH_TIMESTAMP: number): void;
    static endMPE(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createMPE(builder: flatbuffers.Builder, MEAN_MOTION: number, ECCENTRICITY: number, INCLINATION: number, RA_OF_ASC_NODE: number, ARG_OF_PERICENTER: number, MEAN_ANOMALY: number, NORAD_CAT_ID: number, BSTAR: number, USER_DEFINED_EPOCH_TIMESTAMP: number): flatbuffers.Offset;
    unpack(): MPET;
    unpackTo(_o: MPET): void;
}
export declare class MPET {
    MEAN_MOTION: number;
    ECCENTRICITY: number;
    INCLINATION: number;
    RA_OF_ASC_NODE: number;
    ARG_OF_PERICENTER: number;
    MEAN_ANOMALY: number;
    NORAD_CAT_ID: number;
    BSTAR: number;
    USER_DEFINED_EPOCH_TIMESTAMP: number;
    constructor(MEAN_MOTION?: number, ECCENTRICITY?: number, INCLINATION?: number, RA_OF_ASC_NODE?: number, ARG_OF_PERICENTER?: number, MEAN_ANOMALY?: number, NORAD_CAT_ID?: number, BSTAR?: number, USER_DEFINED_EPOCH_TIMESTAMP?: number);
    pack(builder: flatbuffers.Builder): flatbuffers.Offset;
}
