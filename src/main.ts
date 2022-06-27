import { LegacyFormat } from "./lib/legacyformat.enum";
import { SerializationFormat } from "./lib/serialization.enum";
import * as omm from "@/lib/parsers/omm.converter";
import ommSchema from "@/lib/OMM/omm.schema";
import { OMMCOLLECTIONT } from "./lib/OMM/OMMCOLLECTION";
import * as flatbuffers from "flatbuffers";

type KVI = {
  [key: string]: any
};

export const parse = async (data: any, format: LegacyFormat, serialization: SerializationFormat, resultSerialization: SerializationFormat.json | SerializationFormat.fbs = SerializationFormat.json): Promise<any> => {
  let sFormat: string = SerializationFormat[serialization];
  if (format === LegacyFormat.TLE) {
    let parser: KVI = omm;
    let ommCollection: OMMCOLLECTIONT = await parser[sFormat](data, ommSchema);
    if (resultSerialization === SerializationFormat.fbs) {
      let flatBufferBuilder = new flatbuffers.Builder(1);
      flatBufferBuilder.finish(ommCollection.pack(flatBufferBuilder));
      return flatBufferBuilder.asUint8Array();
    }
    return ommCollection;
  }
};
