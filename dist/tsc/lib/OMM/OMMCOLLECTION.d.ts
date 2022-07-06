import * as flatbuffers from 'flatbuffers';
import { OMM, OMMT } from './OMM';
export declare class OMMCOLLECTION {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): OMMCOLLECTION;
    static getRootAsOMMCOLLECTION(bb: flatbuffers.ByteBuffer, obj?: OMMCOLLECTION): OMMCOLLECTION;
    static getSizePrefixedRootAsOMMCOLLECTION(bb: flatbuffers.ByteBuffer, obj?: OMMCOLLECTION): OMMCOLLECTION;
    RECORDS(index: number, obj?: OMM): OMM | null;
    RECORDSLength(): number;
    static startOMMCOLLECTION(builder: flatbuffers.Builder): void;
    static addRECORDS(builder: flatbuffers.Builder, RECORDSOffset: flatbuffers.Offset): void;
    static createRECORDSVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
    static startRECORDSVector(builder: flatbuffers.Builder, numElems: number): void;
    static endOMMCOLLECTION(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createOMMCOLLECTION(builder: flatbuffers.Builder, RECORDSOffset: flatbuffers.Offset): flatbuffers.Offset;
    unpack(): OMMCOLLECTIONT;
    unpackTo(_o: OMMCOLLECTIONT): void;
}
export declare class OMMCOLLECTIONT {
    RECORDS: (OMMT)[];
    constructor(RECORDS?: (OMMT)[]);
    pack(builder: flatbuffers.Builder): flatbuffers.Offset;
}
