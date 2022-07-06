import * as flatbuffers from 'flatbuffers';
import { MPE, MPET } from './MPE';
export declare class MPECOLLECTION {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): MPECOLLECTION;
    static getRootAsMPECOLLECTION(bb: flatbuffers.ByteBuffer, obj?: MPECOLLECTION): MPECOLLECTION;
    static getSizePrefixedRootAsMPECOLLECTION(bb: flatbuffers.ByteBuffer, obj?: MPECOLLECTION): MPECOLLECTION;
    RECORDS(index: number, obj?: MPE): MPE | null;
    RECORDSLength(): number;
    static startMPECOLLECTION(builder: flatbuffers.Builder): void;
    static addRECORDS(builder: flatbuffers.Builder, RECORDSOffset: flatbuffers.Offset): void;
    static createRECORDSVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startRECORDSVector(builder: flatbuffers.Builder, numElems: number): void;
    static endMPECOLLECTION(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createMPECOLLECTION(builder: flatbuffers.Builder, RECORDSOffset: flatbuffers.Offset): flatbuffers.Offset;
    unpack(): MPECOLLECTIONT;
    unpackTo(_o: MPECOLLECTIONT): void;
}
export declare class MPECOLLECTIONT {
    RECORDS: (MPET)[];
    constructor(RECORDS?: (MPET)[]);
    pack(builder: flatbuffers.Builder): flatbuffers.Offset;
}
