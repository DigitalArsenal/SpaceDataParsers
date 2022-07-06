import { SATCATCOLLECTIONT as SATCATCOLLECTION } from "@/lib/SAT/SATCATCOLLECTION";
import { SATCATT as SAT } from "@/lib/SAT/SATCAT";
import numCheck from "./numCheck";
declare const json: (input: string | Array<SAT>, schema: any) => SATCATCOLLECTION;
declare const csv: (input: any, schema: any) => Promise<SATCATCOLLECTION>;
declare const txt: (input: any) => Promise<any>;
declare const fbs: (input: Uint8Array) => Promise<SATCATCOLLECTION>;
export { numCheck, json, csv, txt, fbs };
