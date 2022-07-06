import { LegacyFormat } from "./lib/legacyformat.enum";
import { SerializationFormat } from "./lib/serialization.enum";
declare type KVI = {
    [key: string]: any;
};
export declare const parse: (data: any, format: LegacyFormat, serialization: SerializationFormat, resultSerialization?: SerializationFormat.json | SerializationFormat.fbs) => Promise<any>;
export declare const schemas: KVI;
export { LegacyFormat, SerializationFormat };
