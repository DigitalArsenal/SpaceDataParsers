"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "definitions": {
        "referenceFrame": {
            "type": "string",
            "enum": [
                "EME2000",
                "GCRF",
                "GRC",
                "ICRF",
                "ITRF2000",
                "ITRF93",
                "ITRF97",
                "MCI",
                "TDR",
                "TEME",
                "TOD"
            ]
        },
        "ephemerisType": {
            "type": "string",
            "enum": [
                "SGP",
                "SGP4",
                "SDP4",
                "SGP8",
                "SDP8"
            ]
        },
        "timeSystem": {
            "type": "string",
            "enum": [
                "GMST",
                "GPS",
                "MET",
                "MRT",
                "SCLK",
                "TAI",
                "TCB",
                "TDB",
                "TCG",
                "TT",
                "UT1",
                "UTC"
            ]
        },
        "meanElementTheory": {
            "type": "string",
            "enum": [
                "SGP4",
                "DSST",
                "USM"
            ]
        },
        "manCovRefFrame": {
            "type": "string",
            "enum": [
                "RSW",
                "RTN",
                "TNW"
            ]
        },
        "OMM": {
            "type": "object",
            "properties": {
                "CCSDS_OMM_VERS": {
                    "type": "number"
                },
                "CREATION_DATE": {
                    "type": "string"
                },
                "ORIGINATOR": {
                    "type": "string"
                },
                "OBJECT_NAME": {
                    "type": "string"
                },
                "OBJECT_ID": {
                    "type": "string"
                },
                "CENTER_NAME": {
                    "type": "string"
                },
                "REF_FRAME": {
                    "$ref": "#/definitions/referenceFrame"
                },
                "REF_FRAME_EPOCH": {
                    "type": "string"
                },
                "TIME_SYSTEM": {
                    "$ref": "#/definitions/timeSystem"
                },
                "MEAN_ELEMENT_THEORY": {
                    "$ref": "#/definitions/meanElementTheory"
                },
                "COMMENT": {
                    "type": "string"
                },
                "EPOCH": {
                    "type": "string"
                },
                "SEMI_MAJOR_AXIS": {
                    "type": "number"
                },
                "MEAN_MOTION": {
                    "type": "number"
                },
                "ECCENTRICITY": {
                    "type": "number"
                },
                "INCLINATION": {
                    "type": "number"
                },
                "RA_OF_ASC_NODE": {
                    "type": "number"
                },
                "ARG_OF_PERICENTER": {
                    "type": "number"
                },
                "MEAN_ANOMALY": {
                    "type": "number"
                },
                "GM": {
                    "type": "number"
                },
                "MASS": {
                    "type": "number"
                },
                "SOLAR_RAD_AREA": {
                    "type": "number"
                },
                "SOLAR_RAD_COEFF": {
                    "type": "number"
                },
                "DRAG_AREA": {
                    "type": "number"
                },
                "DRAG_COEFF": {
                    "type": "number"
                },
                "EPHEMERIS_TYPE": {
                    "$ref": "#/definitions/ephemerisType"
                },
                "CLASSIFICATION_TYPE": {
                    "type": "string"
                },
                "NORAD_CAT_ID": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 4294967295
                },
                "ELEMENT_SET_NO": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 4294967295
                },
                "REV_AT_EPOCH": {
                    "type": "number"
                },
                "BSTAR": {
                    "type": "number"
                },
                "MEAN_MOTION_DOT": {
                    "type": "number"
                },
                "MEAN_MOTION_DDOT": {
                    "type": "number"
                },
                "COV_REF_FRAME": {
                    "$ref": "#/definitions/manCovRefFrame"
                },
                "CX_X": {
                    "type": "number"
                },
                "CY_X": {
                    "type": "number"
                },
                "CY_Y": {
                    "type": "number"
                },
                "CZ_X": {
                    "type": "number"
                },
                "CZ_Y": {
                    "type": "number"
                },
                "CZ_Z": {
                    "type": "number"
                },
                "CX_DOT_X": {
                    "type": "number"
                },
                "CX_DOT_Y": {
                    "type": "number"
                },
                "CX_DOT_Z": {
                    "type": "number"
                },
                "CX_DOT_X_DOT": {
                    "type": "number"
                },
                "CY_DOT_X": {
                    "type": "number"
                },
                "CY_DOT_Y": {
                    "type": "number"
                },
                "CY_DOT_Z": {
                    "type": "number"
                },
                "CY_DOT_X_DOT": {
                    "type": "number"
                },
                "CY_DOT_Y_DOT": {
                    "type": "number"
                },
                "CZ_DOT_X": {
                    "type": "number"
                },
                "CZ_DOT_Y": {
                    "type": "number"
                },
                "CZ_DOT_Z": {
                    "type": "number"
                },
                "CZ_DOT_X_DOT": {
                    "type": "number"
                },
                "CZ_DOT_Y_DOT": {
                    "type": "number"
                },
                "CZ_DOT_Z_DOT": {
                    "type": "number"
                },
                "USER_DEFINED_BIP_0044_TYPE": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 4294967295
                },
                "USER_DEFINED_OBJECT_DESIGNATOR": {
                    "type": "string"
                },
                "USER_DEFINED_EARTH_MODEL": {
                    "type": "string"
                },
                "USER_DEFINED_EPOCH_TIMESTAMP": {
                    "type": "number"
                },
                "USER_DEFINED_MICROSECONDS": {
                    "type": "number"
                }
            },
            "additionalProperties": false
        },
        "MPE": {
            "type": "object",
            "properties": {
                "MEAN_MOTION": {
                    "type": "number"
                },
                "ECCENTRICITY": {
                    "type": "number"
                },
                "INCLINATION": {
                    "type": "number"
                },
                "RA_OF_ASC_NODE": {
                    "type": "number"
                },
                "ARG_OF_PERICENTER": {
                    "type": "number"
                },
                "MEAN_ANOMALY": {
                    "type": "number"
                },
                "NORAD_CAT_ID": {
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 4294967295
                },
                "BSTAR": {
                    "type": "number"
                },
                "USER_DEFINED_EPOCH_TIMESTAMP": {
                    "type": "number"
                }
            },
            "additionalProperties": false
        },
        "OMMCOLLECTION": {
            "type": "object",
            "properties": {
                "RECORDS": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/OMM"
                    }
                }
            },
            "additionalProperties": false
        },
        "MPECOLLECTION": {
            "type": "object",
            "properties": {
                "RECORDS": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/MPE"
                    }
                }
            },
            "additionalProperties": false
        }
    },
    "$ref": "#/definitions/OMM"
};
//# sourceMappingURL=omm.schema.js.map