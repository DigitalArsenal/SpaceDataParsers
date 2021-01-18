import { builtinModules } from "module";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import path from "path";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

let ignoreGlobal = {};
builtinModules.forEach((g) => (ignoreGlobal[g] = g));
const resolveMetaUrl = () => ({
  name: "resolveMetaUrl",
  resolveImportMeta: (property, chunk) => {
    if (property === "url") {
      return `'file://${path.relative(process.cwd(), chunk.moduleId)}'`;
    }
  },
});
const production = !process.env.ROLLUP_WATCH;
export default [{
  input: "test/test.mjs",
  output: {
    file: "build/test.js",
    format: "cjs",
    sourcemap: false,
    globals: ignoreGlobal,
  },
  external: builtinModules,
  plugins: [
    resolveMetaUrl(),
    resolve({ preferBuiltins: true }),
    commonjs(), // converts date-fns to ES modules
    json(),
    //production && terser(), // minify, but only in production
  ],
},
{
  input: "src/index.mjs",
  output: {
    file: "build/SpaceDataParsers.mjs",
    format: "esm",
    sourcemap: false,
    globals: ignoreGlobal,
  },
  external: builtinModules,
  plugins: [
    resolveMetaUrl(),
    resolve({ preferBuiltins: true }),
    commonjs(), // converts date-fns to ES modules
    json(),
    terser(), // minify, but only in production
  ],
}];
