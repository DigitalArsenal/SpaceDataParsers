export namespace satcat_map {
    const OBJECT_ID: number[];
    const NORAD_CAT_ID: number[];
    const MULTIPLE_NAMES: number[];
    const PAYLOAD: number[];
    const OPS_STATUS_CODE: number[];
    const OBJECT_NAME: number[];
    const ORIGINATOR: number[];
    const LAUNCH_DATE: number[];
    const LAUNCH_SITE: number[];
    const DECAY_DATE: number[];
    const PERIOD: number[];
    const INCLINATION: number[];
    const APOGEE: number[];
    const PERIGEE: number[];
    const RCS: number[];
    const ORBITAL_STATUS_CODE: number[];
    const ORBIT_CENTER: number[];
    const ORBIT_TYPE: number[];
    const TYPE: number[];
}
export namespace satcat_transform {
    export function TYPE_1(d: any, _satcat: any): 1 | 0 | 2 | 3 | 4;
    export { TYPE_1 as TYPE };
    export function MULTIPLE_NAMES_1(d: any): boolean;
    export { MULTIPLE_NAMES_1 as MULTIPLE_NAMES };
    export function PAYLOAD_1(d: any): boolean;
    export { PAYLOAD_1 as PAYLOAD };
    export function LAUNCH_SITE_1(d: any): any;
    export { LAUNCH_SITE_1 as LAUNCH_SITE };
    export function ORIGINATOR_1(d: any): any;
    export { ORIGINATOR_1 as ORIGINATOR };
    export function OBJECT_NAME_1(d: any): any;
    export { OBJECT_NAME_1 as OBJECT_NAME };
    export function OBJECT_ID_1(d: any): any;
    export { OBJECT_ID_1 as OBJECT_ID };
    export function OPS_STATUS_CODE_1(d: any): any;
    export { OPS_STATUS_CODE_1 as OPS_STATUS_CODE };
    export function LAUNCH_DATE_1(d: any): Date;
    export { LAUNCH_DATE_1 as LAUNCH_DATE };
    export function DECAY_DATE_1(d: any): Date;
    export { DECAY_DATE_1 as DECAY_DATE };
    export function ORBITAL_STATUS_CODE_1(d: any, _satcat: any): number;
    export { ORBITAL_STATUS_CODE_1 as ORBITAL_STATUS_CODE };
    export function RCS_1(d: any): any;
    export { RCS_1 as RCS };
}
export const tle_map: {
    1: {
        NORAD_CAT_ID: number[];
        CLASSIFICATION_TYPE: number[];
        OBJECT_ID: number[];
        EPOCH: number[];
        MEAN_MOTION_DOT: number[];
        MEAN_MOTION_DDOT: number[];
        BSTAR: number[];
        EPHEMERIS_TYPE: number[];
        ELEMENT_SET_NO: number[];
        CHECKSUM: number[];
    };
    2: {
        NORAD_CAT_ID: number[];
        INCLINATION: number[];
        RA_OF_ASC_NODE: number[];
        ECCENTRICITY: number[];
        ARG_OF_PERICENTER: number[];
        MEAN_ANOMALY: number[];
        MEAN_MOTION: number[];
        REV_AT_EPOCH: number[];
        CHECKSUM: number[];
    };
};
export namespace tle_transform {
    export { dpAParse as BSTAR };
    export function CLASSIFICATION_TYPE(value: any): any;
    export function OBJECT_ID_2(value: any): string;
    export { OBJECT_ID_2 as OBJECT_ID };
    export { decimalAssumed as ECCENTRICITY };
    export { dpAParse as MEAN_MOTION_DDOT };
    export function EPOCH(value: any): string;
}
declare function dpAParse(value: any): number;
declare function decimalAssumed(value: any): any;
export {};
