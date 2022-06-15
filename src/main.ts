import { LegacyFormat } from "./lib/legacyformat.enum";
import { ReadableStream } from "stream/web";
import * as omm from "@/lib/parsers/omm.converter";

export const parse = (format: LegacyFormat): LegacyFormat => {
  const rS: ReadableStream = new ReadableStream();
  console.log(rS, format, omm);
  return format;
}