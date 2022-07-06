declare class lineReader {
    reader: {
        read: () => any;
    };
    processLine: (line: any) => any;
    readLines: () => Promise<Date>;
    constructor(reader: {
        read: () => any;
    });
}
declare class tle extends lineReader {
    [x: string]: any;
    constructor(reader: any);
}
declare class satcat extends lineReader {
    lines: Array<any>;
    format: {
        RAW: (satcat: any) => any;
        CAT: (satcat: string) => {} | undefined;
    };
    constructor(reader: any);
}
declare const vcm: null;
export { tle, satcat, vcm };
