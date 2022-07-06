import { SATCATCOLLECTIONT as SATCOLLECTION } from "@/lib/SAT/SATCATCOLLECTION";
import { SATCATT as SAT } from "@/lib/SAT/SATCAT";
import numCheck from "./numCheck";
declare const json: (input: string | Array<SAT>, schema: any) => SATCOLLECTION;
declare const csv: (input: any, schema: any) => Promise<SATCOLLECTION>;
declare const txt: (input: any) => Promise<any>;
declare const fbs: (input: Uint8Array) => Promise<SATCOLLECTION>;
export { numCheck, json, csv, txt, fbs };
