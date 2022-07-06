declare const _default: {
    $schema: string;
    definitions: {
        referenceFrame: {
            type: string;
            enum: string[];
        };
        ephemerisType: {
            type: string;
            enum: string[];
        };
        timeSystem: {
            type: string;
            enum: string[];
        };
        meanElementTheory: {
            type: string;
            enum: string[];
        };
        manCovRefFrame: {
            type: string;
            enum: string[];
        };
        OMM: {
            type: string;
            properties: {
                CCSDS_OMM_VERS: {
                    type: string;
                };
                CREATION_DATE: {
                    type: string;
                };
                ORIGINATOR: {
                    type: string;
                };
                OBJECT_NAME: {
                    type: string;
                };
                OBJECT_ID: {
                    type: string;
                };
                CENTER_NAME: {
                    type: string;
                };
                REF_FRAME: {
                    $ref: string;
                };
                REF_FRAME_EPOCH: {
                    type: string;
                };
                TIME_SYSTEM: {
                    $ref: string;
                };
                MEAN_ELEMENT_THEORY: {
                    $ref: string;
                };
                COMMENT: {
                    type: string;
                };
                EPOCH: {
                    type: string;
                };
                SEMI_MAJOR_AXIS: {
                    type: string;
                };
                MEAN_MOTION: {
                    type: string;
                };
                ECCENTRICITY: {
                    type: string;
                };
                INCLINATION: {
                    type: string;
                };
                RA_OF_ASC_NODE: {
                    type: string;
                };
                ARG_OF_PERICENTER: {
                    type: string;
                };
                MEAN_ANOMALY: {
                    type: string;
                };
                GM: {
                    type: string;
                };
                MASS: {
                    type: string;
                };
                SOLAR_RAD_AREA: {
                    type: string;
                };
                SOLAR_RAD_COEFF: {
                    type: string;
                };
                DRAG_AREA: {
                    type: string;
                };
                DRAG_COEFF: {
                    type: string;
                };
                EPHEMERIS_TYPE: {
                    $ref: string;
                };
                CLASSIFICATION_TYPE: {
                    type: string;
                };
                NORAD_CAT_ID: {
                    type: string;
                    minimum: number;
                    maximum: number;
                };
                ELEMENT_SET_NO: {
                    type: string;
                    minimum: number;
                    maximum: number;
                };
                REV_AT_EPOCH: {
                    type: string;
                };
                BSTAR: {
                    type: string;
                };
                MEAN_MOTION_DOT: {
                    type: string;
                };
                MEAN_MOTION_DDOT: {
                    type: string;
                };
                COV_REF_FRAME: {
                    $ref: string;
                };
                CX_X: {
                    type: string;
                };
                CY_X: {
                    type: string;
                };
                CY_Y: {
                    type: string;
                };
                CZ_X: {
                    type: string;
                };
                CZ_Y: {
                    type: string;
                };
                CZ_Z: {
                    type: string;
                };
                CX_DOT_X: {
                    type: string;
                };
                CX_DOT_Y: {
                    type: string;
                };
                CX_DOT_Z: {
                    type: string;
                };
                CX_DOT_X_DOT: {
                    type: string;
                };
                CY_DOT_X: {
                    type: string;
                };
                CY_DOT_Y: {
                    type: string;
                };
                CY_DOT_Z: {
                    type: string;
                };
                CY_DOT_X_DOT: {
                    type: string;
                };
                CY_DOT_Y_DOT: {
                    type: string;
                };
                CZ_DOT_X: {
                    type: string;
                };
                CZ_DOT_Y: {
                    type: string;
                };
                CZ_DOT_Z: {
                    type: string;
                };
                CZ_DOT_X_DOT: {
                    type: string;
                };
                CZ_DOT_Y_DOT: {
                    type: string;
                };
                CZ_DOT_Z_DOT: {
                    type: string;
                };
                USER_DEFINED_BIP_0044_TYPE: {
                    type: string;
                    minimum: number;
                    maximum: number;
                };
                USER_DEFINED_OBJECT_DESIGNATOR: {
                    type: string;
                };
                USER_DEFINED_EARTH_MODEL: {
                    type: string;
                };
                USER_DEFINED_EPOCH_TIMESTAMP: {
                    type: string;
                };
                USER_DEFINED_MICROSECONDS: {
                    type: string;
                };
            };
            additionalProperties: boolean;
        };
        MPE: {
            type: string;
            properties: {
                MEAN_MOTION: {
                    type: string;
                };
                ECCENTRICITY: {
                    type: string;
                };
                INCLINATION: {
                    type: string;
                };
                RA_OF_ASC_NODE: {
                    type: string;
                };
                ARG_OF_PERICENTER: {
                    type: string;
                };
                MEAN_ANOMALY: {
                    type: string;
                };
                NORAD_CAT_ID: {
                    type: string;
                    minimum: number;
                    maximum: number;
                };
                BSTAR: {
                    type: string;
                };
                USER_DEFINED_EPOCH_TIMESTAMP: {
                    type: string;
                };
            };
            additionalProperties: boolean;
        };
        OMMCOLLECTION: {
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
        MPECOLLECTION: {
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
