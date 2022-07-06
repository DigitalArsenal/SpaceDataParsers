import * as flatbuffers from 'flatbuffers';
import { massType } from './massType';
export declare class PAYLOAD {
    bb: flatbuffers.ByteBuffer | null;
    bb_pos: number;
    __init(i: number, bb: flatbuffers.ByteBuffer): PAYLOAD;
    static getRootAsPAYLOAD(bb: flatbuffers.ByteBuffer, obj?: PAYLOAD): PAYLOAD;
    static getSizePrefixedRootAsPAYLOAD(bb: flatbuffers.ByteBuffer, obj?: PAYLOAD): PAYLOAD;
    OBJECT_ID(): string | null;
    OBJECT_ID(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    OBJECT_NAME(): string | null;
    OBJECT_NAME(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    DEPLOYMENT_DATE(): string | null;
    DEPLOYMENT_DATE(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
    MANEUVERABLE(): boolean;
    SIZE(): number;
    MASS(): number;
    MASS_TYPE(): massType;
    static startPAYLOAD(builder: flatbuffers.Builder): void;
    static addOBJECT_ID(builder: flatbuffers.Builder, OBJECT_IDOffset: flatbuffers.Offset): void;
    static addOBJECT_NAME(builder: flatbuffers.Builder, OBJECT_NAMEOffset: flatbuffers.Offset): void;
    static addDEPLOYMENT_DATE(builder: flatbuffers.Builder, DEPLOYMENT_DATEOffset: flatbuffers.Offset): void;
    static addMANEUVERABLE(builder: flatbuffers.Builder, MANEUVERABLE: boolean): void;
    static addSIZE(builder: flatbuffers.Builder, SIZE: number): void;
    static addMASS(builder: flatbuffers.Builder, MASS: number): void;
    static addMASS_TYPE(builder: flatbuffers.Builder, MASS_TYPE: massType): void;
    static endPAYLOAD(builder: flatbuffers.Builder): flatbuffers.Offset;
    static createPAYLOAD(builder: flatbuffers.Builder, OBJECT_IDOffset: flatbuffers.Offset, OBJECT_NAMEOffset: flatbuffers.Offset, DEPLOYMENT_DATEOffset: flatbuffers.Offset, MANEUVERABLE: boolean, SIZE: number, MASS: number, MASS_TYPE: massType): flatbuffers.Offset;
    unpack(): PAYLOADT;
    unpackTo(_o: PAYLOADT): void;
}
export declare class PAYLOADT {
    OBJECT_ID: string | Uint8Array | null;
    OBJECT_NAME: string | Uint8Array | null;
    DEPLOYMENT_DATE: string | Uint8Array | null;
    MANEUVERABLE: boolean;
    SIZE: number;
    MASS: number;
    MASS_TYPE: massType;
    constructor(OBJECT_ID?: string | Uint8Array | null, OBJECT_NAME?: string | Uint8Array | null, DEPLOYMENT_DATE?: string | Uint8Array | null, MANEUVERABLE?: boolean, SIZE?: number, MASS?: number, MASS_TYPE?: massType);
    pack(builder: flatbuffers.Builder): flatbuffers.Offset;
}
