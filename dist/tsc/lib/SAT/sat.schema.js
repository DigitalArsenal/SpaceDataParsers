"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "definitions": {
        "objectType": {
            "type": "string",
            "enum": ["PAYLOAD", "ROCKET_BODY", "DEBRIS", "UNKNOWN"]
        },
        "opsStatusCode": {
            "type": "string",
            "enum": ["OPERATIONAL", "NONOPERATIONAL", "PARTIALLY_OPERATIONAL", "BACKUP_STANDBY", "SPARE", "EXTENDED_MISSION", "DECAYED", "UNKNOWN"]
        },
        "dataStatusCode": {
            "type": "string",
            "enum": ["NO_CURRENT_ELEMENTS", "NO_INITIAL_ELEMENTS", "NO_ELEMENTS_AVAILABLE", "OK"]
        },
        "orbitType": {
            "type": "string",
            "enum": ["ORBIT", "LANDING", "IMPACT", "DOCKED", "ROUNDTRIP"]
        },
        "massType": {
            "type": "string",
            "enum": ["DRY", "WET"]
        },
        "SATCAT": {
            "type": "object",
            "properties": {
                "OBJECT_NAME": {
                    "type": "string"
                },
                "OBJECT_ID": {
                    "type": "string"
                },
                "NORAD_CAT_ID": {
                    "type": "integer", "minimum": 0, "maximum": 4294967295
                },
                "OBJECT_TYPE": {
                    "$ref": "#/definitions/objectType"
                },
                "OPS_STATUS_CODE": {
                    "$ref": "#/definitions/opsStatusCode"
                },
                "OWNER": {
                    "type": "string"
                },
                "LAUNCH_DATE": {
                    "type": "string"
                },
                "LAUNCH_SITE": {
                    "type": "string"
                },
                "DECAY_DATE": {
                    "type": "string"
                },
                "PERIOD": {
                    "type": "number"
                },
                "INCLINATION": {
                    "type": "number"
                },
                "APOGEE": {
                    "type": "number"
                },
                "PERIGEE": {
                    "type": "number"
                },
                "RCS": {
                    "type": "number"
                },
                "DATA_STATUS_CODE": {
                    "$ref": "#/definitions/dataStatusCode"
                },
                "ORBIT_CENTER": {
                    "type": "string"
                },
                "ORBIT_TYPE": {
                    "$ref": "#/definitions/orbitType"
                }
            },
            "additionalProperties": false
        },
        "PAYLOAD": {
            "type": "object",
            "properties": {
                "OBJECT_ID": {
                    "type": "string"
                },
                "OBJECT_NAME": {
                    "type": "string"
                },
                "DEPLOYMENT_DATE": {
                    "type": "string"
                },
                "MANEUVERABLE": {
                    "type": "boolean"
                },
                "SIZE": {
                    "type": "number"
                },
                "MASS": {
                    "type": "number"
                },
                "MASS_TYPE": {
                    "$ref": "#/definitions/massType"
                }
            },
            "additionalProperties": false
        },
        "SATCATCOLLECTION": {
            "type": "object",
            "properties": {
                "RECORDS": {
                    "type": "array", "items": { "$ref": "#/definitions/SATCAT" }
                }
            },
            "additionalProperties": false
        }
    },
    "$ref": "#/definitions/SATCAT"
};
//# sourceMappingURL=sat.schema.js.map