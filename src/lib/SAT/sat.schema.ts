export default {
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "definitions": {
        "objType": {
            "type": "string",
            "enum": ["PAYLOAD", "DEBRIS", "ROCKET_BODY", "UNKNOWN"]
        },
        "opsStatusCode": {
            "type": "string",
            "enum": ["OPERATIONAL", "NONOPERATIONAL", "PARTIALLY_OPERATIONAL", "BACKUP_STANDBY", "SPARE", "EXTENDED_MISSION", "DECAYED", "UNKNOWN"]
        },
        "orbitalStatusCode": {
            "type": "string",
            "enum": ["NO_CURRENT_ELEMENTS", "NO_INITIAL_ELEMENTS", "NO_ELEMENTS_AVAILABLE", "PERMANENTLY_DOCKED", "DOCKED_TO_INTERNATIONAL_SPACE_STATION", "IN_ORBIT"]
        },
        "orbitCenter": {
            "type": "string",
            "enum": ["ASTEROID", "EARTH", "EARTH_LAGRANGE", "EARTH_MOON_BARYCENTER", "JUPITER", "MARS", "MERCURY", "MOON_EARTH", "NEPTUNE", "PLUTO", "SATURN", "SOLAR_SYSTEM_ESCAPE", "SUN", "URANUS", "VENUS"]
        },
        "orbitType": {
            "type": "string",
            "enum": ["ORBIT", "DOCKED", "LANDING", "IMPACT"]
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
                "MULTIPLE_NAMES": {
                    "type": "boolean"
                },
                "OBJECT_TYPE": {
                    "$ref": "#/definitions/objType"
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
                    "$ref": "#/definitions/orbitalStatusCode"
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
}
