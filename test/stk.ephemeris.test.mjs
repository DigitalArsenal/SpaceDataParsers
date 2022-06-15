import { readFileSync, readdirSync, fstat } from "fs";
import { join } from "path";
let dirPath = "./test/data/comspoc/ephemeris";

readdirSync(dirPath).forEach((file, f) => {
  if (f) return;
  let eFile = readFileSync(join(dirPath, file), "utf8");
  let rows = eFile.split(/[\n\r]{1,}/g);
  for (let r = 0; r < rows.length; r++) {
    let row = rows[r].split(/\s{1,}/g).filter((rr) => (rr.length ? true : false));
    console.log(row.map((rr) => Number(rr)).slice(0, 4));
  }
});
