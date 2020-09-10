import wasmmodule from "./wasmmodule.mjs";

export default wasmmodule().then(wasmModule => {

	let wrapping = {
		"wasmModuleRun": {
			rval: "number",
			params: [
				"string",
				"string",
				"number",
				"number",
				"number",
				"number",
				"number",
				"number"
			]
		},
		"registerEntity": {
			rval: "number",
			params: [
				"string",
				"string",
				"bool",
				"number",
				"number",
				"number",
				"number"
			]
		},
		"registerEntityOMM": {
			rval: "number",
			params: [
				"string", //char *OBJECT_ID,
				"string", //char *EPOCH,
				"number", //double MEAN_MOTION,
				"number", //double ECCENTRICITY,
				"number", //double INCLINATION,
				"number", //double RA_OF_ASC_NODE,
				"number", //double ARG_OF_PERICENTER,
				"number", //double MEAN_ANOMALY,
				"number", //double GM,
				"string", //signed char EPHEMERIS_TYPE,
				"string", //char * CLASSIFICATION_TYPE,
				"number", //uint32_t NORAD_CAT_ID,
				"number", //uint32_t ELEMENT_SET_NO,
				"number", //double REV_AT_EPOCH,
				"number", //double BSTAR,
				"number", //double MEAN_MOTION_DOT,
				"number", //double MEAN_MOTION_DDOT,
				"bool",   //bool visible,
				"number", //double startmfe = 0,
				"number", //double stopmfe = 0,
				"number", //double deltamin = 0,
				"number", //long * SatObjPointer = nullptr)
			]
		},
		"describeObject": {
			rval: "string",
			params: []
		},
		"sizeOfsatelliteCatalog": {
			rval: "number"
		},
		"propagate": {
			rval: "number",
			params: [
				"number",
				"bool",
				"bool"
			]
		},
		"generateEphemeris": {
			rval: "number",
			params: [
				"number",
				"number",
				"number",
				"number",
				"bool"
			]
		},
		"getValue": {
			rval: "number",
			params: [
				"number",
				"number",
				"bool",
				"bool"
			]
		},
		"getValueInReferenceFrame": {
			rval: "number",
			params: [
				"number",
				"number",
				"bool",
				"bool"
			]
		},
		"free": {
			rval: null,
			params: [
				"number"
			]
		},
		"freePtr": {
			rval: null,
			params: [
				"number"
			]
		},
		"deletePtr": {
			rval: null,
			params: [
				"number"
			]
		},
		"removeEntity": {
			rval: null,
			params: [
				"number"
			]
		},
		"removeAll": {
			rval: null,
			params: []
		},
		"getSatAzElRange": {
			rval: "number",
			params: [
				"number",
				"number",
				"number"
			]
		},
		"getSatAzElRangeForInterval": {
			rval: "number",
			params: [
				"number",
				"number",
				"number",
				"number",
				"number"
			]
		},
		"getSatAzElRangePositionForInterval": {
			rval: "number",
			params: [
				"number",
				"number",
				"number",
				"number",
				"number"
			]
		}
	};
	let methods = {};

	Object.keys(wrapping).forEach(key => {
		methods[key] = (wrapping[key].params) ? wasmModule["cwrap"](key, wrapping[key].rval, wrapping[key].params) : wasmModule["cwrap"](key, wrapping[key].rval)
	});
	return { methods, wasmModule };
});
