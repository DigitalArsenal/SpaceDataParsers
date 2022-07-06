import * as flatbuffers from 'flatbuffers';
import { SATCAT, SATCATT } from './SATCAT';
export declare class SATCATCOLLECTION {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): SATCATCOLLECTION;
    static getRootAsSATCATCOLLECTION(bb: flatbuffers.ByteBuffer, obj?: SATCATCOLLECTION): SATCATCOLLECTION;
    static getSizePrefixedRootAsSATCATCOLLECTION(bb: flatbuffers.ByteBuffer, obj?: SATCATCOLLECTION): SATCATCOLLECTION;
    RECORDS(index: number, obj?: SATCAT): SATCAT | null;
    RECORDSLength(): number;
    static startSATCATCOLLECTION(builder: flatbuffers.Builder): void;
    static addRECORDS(builder: flatbuffers.Builder, RECORDSOffset: flatbuffers.Offset): void;
    static createRECORDSVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startRECORDSVector(builder: flatbuffers.Builder, numElems: number): void;
    static endSATCATCOLLECTION(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createSATCATCOLLECTION(builder: flatbuffers.Builder, RECORDSOffset: flatbuffers.Offset): flatbuffers.Offset;
    unpack(): SATCATCOLLECTIONT;
    unpackTo(_o: SATCATCOLLECTIONT): void;
}
export declare class SATCATCOLLECTIONT {
    RECORDS: (SATCATT)[];
    constructor(RECORDS?: (SATCATT)[]);
    pack(builder: flatbuffers.Builder): flatbuffers.Offset;
}
