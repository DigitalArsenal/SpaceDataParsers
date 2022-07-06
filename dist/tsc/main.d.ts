import { LegacyFormat } from "./lib/legacyformat.enum";
import { SerializationFormat } from "./lib/serialization.enum";
declare type KVI = {
    [key: string]: any;
};
export declare const parse: (data: any, format: LegacyFormat, serialization: SerializationFormat, resultSerialization?: SerializationFormat.json | SerializationFormat.fbs) => Promise<any>;
export declare const schemas: KVI;
declare const version = "a6e8f29b-1669-11ac-8dff-abb4448b34d0";
export { LegacyFormat, SerializationFormat, version };
