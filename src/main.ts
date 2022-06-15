import { LegacyFormat } from "./lib/legacyformat.enum";
import { SerializationFormat } from "./lib/serialization.enum";
//import { ReadableStream } from "stream/web";
import * as omm from "@/lib/parsers/omm.converter";
import ommSchema from "@/lib/OMM/omm.schema";


type KVI = {
  [key: string]: any
};

export const parse = async (data: any, format: LegacyFormat, serialization: SerializationFormat): Promise<any> => {
  //const rS: ReadableStream = new ReadableStream();
  let sFormat: string = SerializationFormat[serialization];
  if (format === LegacyFormat.TLE) {
    let parser: KVI = omm;
    console.log(await parser[sFormat](data, ommSchema))
  }
  ;//await omm[SerializationFormat[serialization]](data, ));
  return format;
}