declare const _default: {
    $schema: string;
    definitions: {
        objType: {
            type: string;
            enum: string[];
        };
        opsStatusCode: {
            type: string;
            enum: string[];
        };
        orbitalStatusCode: {
            type: string;
            enum: string[];
        };
        orbitCenter: {
            type: string;
            enum: string[];
        };
        orbitType: {
            type: string;
            enum: string[];
        };
        massType: {
            type: string;
            enum: string[];
        };
        SATCAT: {
            type: string;
            properties: {
                OBJECT_NAME: {
                    type: string;
                };
                OBJECT_ID: {
                    type: string;
                };
                NORAD_CAT_ID: {
                    type: string;
                    minimum: number;
                    maximum: number;
                };
                MULTIPLE_NAMES: {
                    type: string;
                };
                OBJECT_TYPE: {
                    $ref: string;
                };
                OPS_STATUS_CODE: {
                    $ref: string;
                };
                OWNER: {
                    type: string;
                };
                LAUNCH_DATE: {
                    type: string;
                };
                LAUNCH_SITE: {
                    type: string;
                };
                DECAY_DATE: {
                    type: string;
                };
                PERIOD: {
                    type: string;
                };
                INCLINATION: {
                    type: string;
                };
                APOGEE: {
                    type: string;
                };
                PERIGEE: {
                    type: string;
                };
                RCS: {
                    type: string;
                };
                DATA_STATUS_CODE: {
                    $ref: string;
                };
                ORBIT_CENTER: {
                    type: string;
                };
                ORBIT_TYPE: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        PAYLOAD: {
            type: string;
            properties: {
                OBJECT_ID: {
                    type: string;
                };
                OBJECT_NAME: {
                    type: string;
                };
                DEPLOYMENT_DATE: {
                    type: string;
                };
                MANEUVERABLE: {
                    type: string;
                };
                SIZE: {
                    type: string;
                };
                MASS: {
                    type: string;
                };
                MASS_TYPE: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        SATCATCOLLECTION: {
            type: string;
            properties: {
                RECORDS: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            additionalProperties: boolean;
        };
    };
    $ref: string;
};
export default _default;
