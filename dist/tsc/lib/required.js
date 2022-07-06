"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.required = void 0;
function required(a) {
    throw new Error(`Missing parameter: ${a}`);
}
exports.required = required;
//# sourceMappingURL=required.js.map