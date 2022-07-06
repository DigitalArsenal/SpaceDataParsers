"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.SerializationFormat = exports.LegacyFormat = exports.schemas = exports.parse = void 0;
/**
 * This file is the entrypoint of browser builds.
 * The code executes when loaded in a browser.
 */
var main_1 = require("./main");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return main_1.parse; } });
Object.defineProperty(exports, "schemas", { enumerable: true, get: function () { return main_1.schemas; } });
Object.defineProperty(exports, "LegacyFormat", { enumerable: true, get: function () { return main_1.LegacyFormat; } });
Object.defineProperty(exports, "SerializationFormat", { enumerable: true, get: function () { return main_1.SerializationFormat; } });
Object.defineProperty(exports, "version", { enumerable: true, get: function () { return main_1.version; } });
//# sourceMappingURL=browser.js.map