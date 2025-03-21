import { readdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
const cPJ = JSON.parse(readFileSync("./package.json", "utf-8"));
const packageJSON = JSON.parse(readFileSync("./package.json", "utf-8"));
packageJSON.version = `${cPJ.version.split("+")[0]}+${Date.now()}`;
writeFileSync("package.json", JSON.stringify(packageJSON, null, 4));

const assetDir = "./dist/esbuild";

readdirSync(assetDir).forEach(file => {
    if (path.extname(file).slice(-2) === "js") {
        let ff = path.join(assetDir, file);
        let _file = readFileSync(ff, "utf8").replace(
            /a6e8f29b-1669-11ac-8dff-abb4448b34d0/g,
            packageJSON.version
        );
        writeFileSync(ff, _file);
    }
});


