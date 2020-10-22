import path from "path";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import { builtinModules } from "module";
import resolve from "@rollup/plugin-node-resolve";

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
export default {
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
};
