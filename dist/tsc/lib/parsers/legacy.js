"use strict";
//https://celestrak.com/NORAD/documentation/spacetrk.pdf
//https://cdf.gsfc.nasa.gov/html/leapseconds_requirements.html
Object.defineProperty(exports, "__esModule", { value: true });
exports.vcm = exports.satcat = exports.tle = void 0;
const tslib_1 = require("tslib");
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const definitions_js_1 = require("./definitions.js");
class lineReader {
    reader;
    processLine;
    readLines;
    constructor(reader) {
        this.reader = reader;
        this.processLine = (line) => line;
        this.readLines = async () => {
            async function* rr(reader) {
                const utf8Decoder = new TextDecoder("utf-8");
                let leRegex = /[\r\n]{1,2}/gm;
                let result = await reader.read();
                if (result === null)
                    yield;
                let value, done;
                done = result === null;
                if (result?.value) {
                    value = result.value;
                }
                else {
                    value = result;
                }
                let startIndex = 0;
                for (;;) {
                    let remline = leRegex.exec(value);
                    //only progress if there are more lines
                    if (!remline) {
                        if (done)
                            break;
                        //loop through each successive line
                        let remainder = value.substr(startIndex);
                        result = await reader.read();
                        if (result?.value) {
                            value = result.value;
                            done = result.done;
                        }
                        else {
                            value = result;
                            done = result === null;
                        }
                        //add more if available
                        value = remainder + (value ? value instanceof ArrayBuffer || ArrayBuffer.isView(value) ? utf8Decoder.decode(value) : value : "");
                        startIndex = leRegex.lastIndex = 0;
                    }
                    else {
                        yield value.substring(startIndex, remline.index);
                    }
                    startIndex = leRegex.lastIndex;
                }
                if (startIndex < value?.length) {
                    yield value.substr(startIndex);
                }
            }
            for await (let line of rr(this.reader)) {
                this.processLine(line);
            }
            return new Date();
        };
    }
}
class tle extends lineReader {
    constructor(reader) {
        super(reader);
        this.lines = [];
        this._line = [];
        this.processLine = (line) => {
            this._line.push(line);
            let l0 = this._line[0].length;
            let l1 = this._line.length;
            if ((l0 === 24 && l1 === 3) || (l0 >= 68 && l1 === 2)) {
                this.processTLE(this._line);
                this._line = [];
            }
        };
        this.processTLE = (tle) => {
            this.lines.push(tle);
        };
        this.format = {
            RAW: (tle) => tle,
            OMM: (tle) => {
                if (!tle)
                    return;
                let OBJECT_NAME;
                let _OMM = {};
                if (tle.length === 3) {
                    OBJECT_NAME = tle[0].trim();
                    tle = tle.slice(-2);
                }
                tle.forEach((_line, i) => {
                    //@ts-ignore
                    let tt = definitions_js_1.tle_map[i + 1];
                    for (let prop in tt) {
                        let tp = tt[prop];
                        let _tp = [];
                        _tp = tp.length === 2 ? [tp[0] - 1, tp[1]] : [tp[0] - 1, tp[0]];
                        let value = _line.substring(_tp[0], _tp[1]);
                        //@ts-ignore
                        _OMM[prop] = (definitions_js_1.tle_transform[prop] || bignumber_js_1.default)(value);
                        if (_OMM[prop] instanceof bignumber_js_1.default)
                            _OMM[prop] = _OMM[prop].toNumber();
                    }
                });
                if (OBJECT_NAME)
                    _OMM.OBJECT_NAME = OBJECT_NAME;
                return _OMM;
            },
        };
    }
}
exports.tle = tle;
class satcat extends lineReader {
    lines = [];
    format;
    constructor(reader) {
        super(reader);
        this.lines = [];
        this.processLine = (line) => {
            this.lines.push(line);
        };
        this.format = {
            RAW: (satcat) => satcat,
            CAT: (satcat) => {
                if (!satcat)
                    return;
                let _satcat = {};
                for (let prop in definitions_js_1.satcat_map) {
                    //@ts-ignore
                    let sp = definitions_js_1.satcat_map[prop];
                    if (sp[1]) {
                        let value = satcat.substring(sp[0], sp[1]);
                        //@ts-ignore
                        _satcat[prop] = definitions_js_1.satcat_transform[prop]
                            //@ts-ignore
                            ? definitions_js_1.satcat_transform[prop](value, _satcat)
                            : (new bignumber_js_1.default(value)).toNumber();
                    }
                    else {
                        _satcat[prop] = _satcat[prop];
                    }
                }
                return _satcat;
            },
        };
    }
}
exports.satcat = satcat;
const vcm = null;
exports.vcm = vcm;
//# sourceMappingURL=legacy.js.map