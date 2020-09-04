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

	Object.keys(wrapping).forEach(key => wasmModule[key] = (wrapping[key].params) ? wasmModule["cwrap"](key, wrapping[key].rval, wrapping[key].params) : wasmModule["cwrap"](key, wrapping[key].rval));
	return wasmModule;
});
