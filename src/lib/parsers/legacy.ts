//https://celestrak.com/NORAD/documentation/spacetrk.pdf
//https://cdf.gsfc.nasa.gov/html/leapseconds_requirements.html

import bignumber from "bignumber.js";
import {
  satcat_map,
  satcat_transform,
  tle_map,
  tle_transform,
} from "./definitions.js";

class lineReader {
  reader: { read: () => any; };
  processLine: (line: any) => any;
  readLines: () => Promise<Date>;
  constructor(reader: { read: () => any; }) {
    this.reader = reader;
    this.processLine = (line: any) => line;

    this.readLines = async () => {
      async function* rr(reader: any) {
        const utf8Decoder = new TextDecoder("utf-8");
        let leRegex = /[\r\n]{1,2}/gm;

        let result = await reader.read();

        if (result === null) yield;
        let value, done;
        done = result === null;
        if (result?.value) {
          value = result.value;
        } else {
          value = result;
        }

        let startIndex = 0;

        for (; ;) {
          let remline = leRegex.exec(value);
          //only progress if there are more lines
          if (!remline) {
            if (done) break;
            //loop through each successive line
            let remainder: any = value.substr(startIndex);
            result = await reader.read();
            if (result?.value) {
              value = result.value;
              done = result.done;
            } else {
              value = result;
              done = result === null;
            }
            //add more if available
            value = remainder + (value ? value instanceof ArrayBuffer || ArrayBuffer.isView(value) ? utf8Decoder.decode(value) : value : "");
            startIndex = leRegex.lastIndex = 0;
          } else {
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
  [x: string]: any;
  constructor(reader: any) {
    super(reader);
    this.lines = [];
    this._line = [];
    this.processLine = (line: any) => {
      this._line.push(line);
      let l0 = this._line[0].length;
      let l1 = this._line.length;
      if ((l0 === 24 && l1 === 3) || (l0 >= 68 && l1 === 2)) {
        this.processTLE(this._line);
        this._line = [];
      }
    };
    this.processTLE = (tle: any) => {
      this.lines.push(tle);
    };
    this.format = {
      RAW: (tle: any) => tle,
      OMM: (tle: any[]) => {
        if (!tle) return;
        let OBJECT_NAME;
        let _OMM: any = {};
        if (tle.length === 3) {
          OBJECT_NAME = tle[0].trim();
          tle = tle.slice(-2);
        }
        tle.forEach((_line: string, i: number) => {
          //@ts-ignore
          let tt: any = tle_map[i + 1];
          for (let prop in tt) {
            let tp = tt[prop];
            let _tp = [];
            _tp = tp.length === 2 ? [tp[0] - 1, tp[1]] : [tp[0] - 1, tp[0]];
            let value = _line.substring(_tp[0], _tp[1]);
            //@ts-ignore
            _OMM[prop] = (tle_transform[prop] || bignumber)(value);

            if (_OMM[prop] instanceof bignumber)
              _OMM[prop] = _OMM[prop].toNumber();
          }
        });
        if (OBJECT_NAME) _OMM.OBJECT_NAME = OBJECT_NAME;
        return _OMM;
      },
    };
  }
}

class satcat extends lineReader {
  lines: Array<any> = [];
  format: { RAW: (satcat: any) => any; CAT: (satcat: string) => {} | undefined; };
  constructor(reader: any) {
    super(reader);
    this.lines = [];
    this.processLine = (line: any) => {
      this.lines.push(line);
    };
    this.format = {
      RAW: (satcat: any) => satcat,
      CAT: (satcat: string) => {
        if (!satcat) return;
        let _satcat: any = {};
        for (let prop in satcat_map) {
          //@ts-ignore
          let sp = satcat_map[prop];
          if (sp[1]) {
            let value = satcat.substring(sp[0], sp[1]);
            //@ts-ignore
            _satcat[prop] = satcat_transform[prop]
              //@ts-ignore
              ? satcat_transform[prop](value, _satcat)
              : new bignumber(value);
          } else {
            _satcat[prop] = _satcat[prop];
          }
        }
        return _satcat;
      },
    };
  }
}
const vcm = null;

export { tle, satcat, vcm };
