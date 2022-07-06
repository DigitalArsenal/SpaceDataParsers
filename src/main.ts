import { LegacyFormat } from "./lib/legacyformat.enum";
import { SerializationFormat } from "./lib/serialization.enum";
import * as omm from "@/lib/parsers/omm.converter";
import * as sat from "@/lib/parsers/sat.converter";
import ommSchema from "@/lib/OMM/omm.schema";
import satSchema from "@/lib/SAT/sat.schema";
import { OMMCOLLECTIONT as OMMCOLLECTION } from "./lib/OMM/OMMCOLLECTION";
import { SATCATCOLLECTIONT as SATCATCOLLECTION } from "./lib/SAT/SATCATCOLLECTION";
import * as flatbuffers from "flatbuffers";

type KVI = {
  [key: string]: any
};

export const parse = async (
  data: any,
  format: LegacyFormat,
  serialization: SerializationFormat,
  resultSerialization: SerializationFormat.json | SerializationFormat.fbs = SerializationFormat.json
): Promise<any> => {
  let sFormat: string = SerializationFormat[serialization];
  if (format === LegacyFormat.TLE) {
    let parser: KVI = omm;
    let ommCollection: OMMCOLLECTION = await parser[sFormat](data, ommSchema);
    if (resultSerialization === SerializationFormat.fbs) {
      let flatBufferBuilder = new flatbuffers.Builder(1);
      flatBufferBuilder.finish(ommCollection.pack(flatBufferBuilder));
      return flatBufferBuilder.asUint8Array();
    }
    return ommCollection;
  } else if (format === LegacyFormat.SATCAT) {
    let parser: KVI = sat;

    let satCollection: SATCATCOLLECTION = await parser[sFormat](data, satSchema);
    if (resultSerialization === SerializationFormat.fbs) {
      let flatBufferBuilder = new flatbuffers.Builder(1);
      flatBufferBuilder.finish(satCollection.pack(flatBufferBuilder));
      return flatBufferBuilder.asUint8Array();
    }
    return satCollection;
  }
};

export const schemas: KVI = {
  OMM: ommSchema,
  SAT: satSchema
};

const version = "a6e8f29b-1669-11ac-8dff-abb4448b34d0";

export { LegacyFormat, SerializationFormat, version };