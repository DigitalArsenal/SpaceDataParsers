'use strict';

var require$$0 = require('stream');
var fs = require('fs');
var require$$0$1 = require('util');
var path = require('path');
var require$$0$2 = require('events');
var require$$0$3 = require('buffer');
require('os');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$0__default$3 = /*#__PURE__*/_interopDefaultLegacy(require$$0$3);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var defined = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

var through_1 = createCommonjsModule(function (module, exports) {
// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through;
through.through = through;

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data); };
  end = end || function () { this.queue(null); };

  var ended = false, destroyed = false, buffer = [], _ended = false;
  var stream = new require$$0__default['default']();
  stream.readable = stream.writable = true;
  stream.paused = false;

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false);

  stream.write = function (data) {
    write.call(this, data);
    return !stream.paused
  };

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift();
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data);
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true;
    buffer.push(data);
    drain();
    return stream
  };

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false;
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy();
      });
  });

  function _end () {
    stream.writable = false;
    end.call(stream);
    if(!stream.readable && stream.autoDestroy)
      stream.destroy();
  }

  stream.end = function (data) {
    if(ended) return
    ended = true;
    if(arguments.length) stream.write(data);
    _end(); // will emit or queue
    return stream
  };

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true;
    ended = true;
    buffer.length = 0;
    stream.writable = stream.readable = false;
    stream.emit('close');
    return stream
  };

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true;
    return stream
  };

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false;
      stream.emit('resume');
    }
    drain();
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain');
    return stream
  };
  return stream
}
});

var default_stream = function () {
    var line = '';
    var stream = through_1(write, flush);
    return stream;

    function write(buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }

    function flush() {
        if (fs__default['default'].writeSync && /^win/.test(process.platform)) {
            try { fs__default['default'].writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e); }
        } else {
            try { console.log(line); }
            catch (e) { stream.emit('error', e); }
        }
        line = '';
    }
};

var toStr = Object.prototype.toString;

var isArguments = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr$1 = Object.prototype.toString;
	var isArgs = isArguments; // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr$1.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr$1.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
var implementation = keysShim;

var slice = Array.prototype.slice;


var origKeys = Object.keys;
var keysShim$1 = origKeys ? function keys(o) { return origKeys(o); } : implementation;

var originalKeys = Object.keys;

keysShim$1.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArguments(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim$1;
	}
	return Object.keys || keysShim$1;
};

var objectKeys = keysShim$1;

var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var toStr$2 = Object.prototype.toString;

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return toStr$2.call(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		toStr$2.call(value) !== '[object Array]' &&
		toStr$2.call(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

var isArguments$1 = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr$3 = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr$3.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = objectKeys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

var defineProperties_1 = defineProperties;

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice$1 = Array.prototype.slice;
var toStr$4 = Object.prototype.toString;
var funcType = '[object Function]';

var implementation$1 = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr$4.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice$1.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice$1.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice$1.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

var functionBind = Function.prototype.bind || implementation$1;

/* eslint complexity: [2, 18], max-statements: [2, 33] */
var shams = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

var origSymbol = commonjsGlobal.Symbol;


var hasSymbols$1 = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return shams();
};

/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined$1;

var $TypeError = TypeError;

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () { throw new $TypeError(); };
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols$2 = hasSymbols$1();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto
var generatorFunction =  undefined$1;
var asyncFunction =  undefined$1;
var asyncGenFunction =  undefined$1;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

var INTRINSICS = {
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
	'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer.prototype,
	'%ArrayIteratorPrototype%': hasSymbols$2 ? getProto([][Symbol.iterator]()) : undefined$1,
	'%ArrayPrototype%': Array.prototype,
	'%ArrayProto_entries%': Array.prototype.entries,
	'%ArrayProto_forEach%': Array.prototype.forEach,
	'%ArrayProto_keys%': Array.prototype.keys,
	'%ArrayProto_values%': Array.prototype.values,
	'%AsyncFromSyncIteratorPrototype%': undefined$1,
	'%AsyncFunction%': asyncFunction,
	'%AsyncFunctionPrototype%':  undefined$1,
	'%AsyncGenerator%':  undefined$1,
	'%AsyncGeneratorFunction%': asyncGenFunction,
	'%AsyncGeneratorPrototype%':  undefined$1,
	'%AsyncIteratorPrototype%':  undefined$1,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
	'%Boolean%': Boolean,
	'%BooleanPrototype%': Boolean.prototype,
	'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
	'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined$1 : DataView.prototype,
	'%Date%': Date,
	'%DatePrototype%': Date.prototype,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%ErrorPrototype%': Error.prototype,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%EvalErrorPrototype%': EvalError.prototype,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
	'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array.prototype,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
	'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array.prototype,
	'%Function%': Function,
	'%FunctionPrototype%': Function.prototype,
	'%Generator%':  undefined$1,
	'%GeneratorFunction%': generatorFunction,
	'%GeneratorPrototype%':  undefined$1,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
	'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array.prototype,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
	'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined$1 : Int8Array.prototype,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
	'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array.prototype,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols$2 ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
	'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined$1,
	'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$2 ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
	'%MapPrototype%': typeof Map === 'undefined' ? undefined$1 : Map.prototype,
	'%Math%': Math,
	'%Number%': Number,
	'%NumberPrototype%': Number.prototype,
	'%Object%': Object,
	'%ObjectPrototype%': Object.prototype,
	'%ObjProto_toString%': Object.prototype.toString,
	'%ObjProto_valueOf%': Object.prototype.valueOf,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
	'%PromisePrototype%': typeof Promise === 'undefined' ? undefined$1 : Promise.prototype,
	'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined$1 : Promise.prototype.then,
	'%Promise_all%': typeof Promise === 'undefined' ? undefined$1 : Promise.all,
	'%Promise_reject%': typeof Promise === 'undefined' ? undefined$1 : Promise.reject,
	'%Promise_resolve%': typeof Promise === 'undefined' ? undefined$1 : Promise.resolve,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
	'%RangeError%': RangeError,
	'%RangeErrorPrototype%': RangeError.prototype,
	'%ReferenceError%': ReferenceError,
	'%ReferenceErrorPrototype%': ReferenceError.prototype,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
	'%RegExp%': RegExp,
	'%RegExpPrototype%': RegExp.prototype,
	'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$2 ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
	'%SetPrototype%': typeof Set === 'undefined' ? undefined$1 : Set.prototype,
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
	'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer.prototype,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols$2 ? getProto(''[Symbol.iterator]()) : undefined$1,
	'%StringPrototype%': String.prototype,
	'%Symbol%': hasSymbols$2 ? Symbol : undefined$1,
	'%SymbolPrototype%': hasSymbols$2 ? Symbol.prototype : undefined$1,
	'%SyntaxError%': SyntaxError,
	'%SyntaxErrorPrototype%': SyntaxError.prototype,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined$1,
	'%TypeError%': $TypeError,
	'%TypeErrorPrototype%': $TypeError.prototype,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
	'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array.prototype,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
	'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray.prototype,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
	'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array.prototype,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
	'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array.prototype,
	'%URIError%': URIError,
	'%URIErrorPrototype%': URIError.prototype,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
	'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap.prototype,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet,
	'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet.prototype
};


var $replace = functionBind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	if (!(name in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[name];
};

var GetIntrinsic = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	var value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, parts[i]);
				if (!allowMissing && !(parts[i] in value)) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				value = desc ? (desc.get || desc.value) : value[parts[i]];
			} else {
				value = value[parts[i]];
			}
		}
	}
	return value;
};

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || functionBind.call($call, $apply);

var callBind = function callBind() {
	return $reflectApply(functionBind, $call, arguments);
};

var apply = function applyBind() {
	return $reflectApply(functionBind, $apply, arguments);
};
callBind.apply = apply;

var numberIsNaN = function (value) {
	return value !== value;
};

var implementation$2 = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};

var polyfill = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation$2;
};

var shim = function shimObjectIs() {
	var polyfill$1 = polyfill();
	defineProperties_1(Object, { is: polyfill$1 }, {
		is: function testObjectIs() {
			return Object.is !== polyfill$1;
		}
	});
	return polyfill$1;
};

var polyfill$1 = callBind(polyfill(), Object);

defineProperties_1(polyfill$1, {
	getPolyfill: polyfill,
	implementation: implementation$2,
	shim: shim
});

var objectIs = polyfill$1;

var hasSymbols$3 = hasSymbols$1();
var hasToStringTag$1 = hasSymbols$3 && typeof Symbol.toStringTag === 'symbol';
var hasOwnProperty;
var regexExec;
var isRegexMarker;
var badStringifier;

if (hasToStringTag$1) {
	hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
	regexExec = Function.call.bind(RegExp.prototype.exec);
	isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}
}

var toStr$5 = Object.prototype.toString;
var gOPD = Object.getOwnPropertyDescriptor;
var regexClass = '[object RegExp]';

var isRegex = hasToStringTag$1
	// eslint-disable-next-line consistent-return
	? function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		var descriptor = gOPD(value, 'lastIndex');
		var hasLastIndexDataProperty = descriptor && hasOwnProperty(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			regexExec(value, badStringifier);
		} catch (e) {
			return e === isRegexMarker;
		}
	}
	: function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return toStr$5.call(value) === regexClass;
	};

var $Object = Object;
var $TypeError$1 = TypeError;

var implementation$3 = function flags() {
	if (this != null && this !== $Object(this)) {
		throw new $TypeError$1('RegExp.prototype.flags getter called on non-object');
	}
	var result = '';
	if (this.global) {
		result += 'g';
	}
	if (this.ignoreCase) {
		result += 'i';
	}
	if (this.multiline) {
		result += 'm';
	}
	if (this.dotAll) {
		result += 's';
	}
	if (this.unicode) {
		result += 'u';
	}
	if (this.sticky) {
		result += 'y';
	}
	return result;
};

var supportsDescriptors$1 = defineProperties_1.supportsDescriptors;
var $gOPD$1 = Object.getOwnPropertyDescriptor;
var $TypeError$2 = TypeError;

var polyfill$2 = function getPolyfill() {
	if (!supportsDescriptors$1) {
		throw new $TypeError$2('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	if ((/a/mig).flags === 'gim') {
		var descriptor = $gOPD$1(RegExp.prototype, 'flags');
		if (descriptor && typeof descriptor.get === 'function' && typeof (/a/).dotAll === 'boolean') {
			return descriptor.get;
		}
	}
	return implementation$3;
};

var supportsDescriptors$2 = defineProperties_1.supportsDescriptors;

var gOPD$1 = Object.getOwnPropertyDescriptor;
var defineProperty$1 = Object.defineProperty;
var TypeErr = TypeError;
var getProto$1 = Object.getPrototypeOf;
var regex = /a/;

var shim$1 = function shimFlags() {
	if (!supportsDescriptors$2 || !getProto$1) {
		throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	var polyfill = polyfill$2();
	var proto = getProto$1(regex);
	var descriptor = gOPD$1(proto, 'flags');
	if (!descriptor || descriptor.get !== polyfill) {
		defineProperty$1(proto, 'flags', {
			configurable: true,
			enumerable: false,
			get: polyfill
		});
	}
	return polyfill;
};

var flagsBound = callBind(implementation$3);

defineProperties_1(flagsBound, {
	getPolyfill: polyfill$2,
	implementation: implementation$3,
	shim: shim$1
});

var regexp_prototype_flags = flagsBound;

var toString = {}.toString;

var isarray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateGetDayCall(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr$6 = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag$2 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isDateObject = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	return hasToStringTag$2 ? tryDateObject(value) : toStr$6.call(value) === dateClass;
};

var strValue = String.prototype.valueOf;
var tryStringObject = function tryStringObject(value) {
	try {
		strValue.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr$7 = Object.prototype.toString;
var strClass = '[object String]';
var hasToStringTag$3 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isString = function isString(value) {
	if (typeof value === 'string') {
		return true;
	}
	if (typeof value !== 'object') {
		return false;
	}
	return hasToStringTag$3 ? tryStringObject(value) : toStr$7.call(value) === strClass;
};

var numToStr = Number.prototype.toString;
var tryNumberObject = function tryNumberObject(value) {
	try {
		numToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr$8 = Object.prototype.toString;
var numClass = '[object Number]';
var hasToStringTag$4 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isNumberObject = function isNumberObject(value) {
	if (typeof value === 'number') {
		return true;
	}
	if (typeof value !== 'object') {
		return false;
	}
	return hasToStringTag$4 ? tryNumberObject(value) : toStr$8.call(value) === numClass;
};

var boolToStr = Boolean.prototype.toString;

var tryBooleanObject = function booleanBrandCheck(value) {
	try {
		boolToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr$9 = Object.prototype.toString;
var boolClass = '[object Boolean]';
var hasToStringTag$5 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isBooleanObject = function isBoolean(value) {
	if (typeof value === 'boolean') {
		return true;
	}
	if (value === null || typeof value !== 'object') {
		return false;
	}
	return hasToStringTag$5 && Symbol.toStringTag in value ? tryBooleanObject(value) : toStr$9.call(value) === boolClass;
};

var isSymbol = createCommonjsModule(function (module) {

var toStr = Object.prototype.toString;
var hasSymbols = hasSymbols$1();

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isRealSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {

	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false ;
	};
}
});

var isBigint = createCommonjsModule(function (module) {

if (typeof BigInt === 'function') {
	var bigIntValueOf = BigInt.prototype.valueOf;
	var tryBigInt = function tryBigIntObject(value) {
		try {
			bigIntValueOf.call(value);
			return true;
		} catch (e) {
		}
		return false;
	};

	module.exports = function isBigInt(value) {
		if (
			value === null
			|| typeof value === 'undefined'
			|| typeof value === 'boolean'
			|| typeof value === 'string'
			|| typeof value === 'number'
			|| typeof value === 'symbol'
			|| typeof value === 'function'
		) {
			return false;
		}
		if (typeof value === 'bigint') { // eslint-disable-line valid-typeof
			return true;
		}

		return tryBigInt(value);
	};
} else {
	module.exports = function isBigInt(value) {
		return false ;
	};
}
});

// eslint-disable-next-line consistent-return
var whichBoxedPrimitive = function whichBoxedPrimitive(value) {
	// eslint-disable-next-line eqeqeq
	if (value == null || (typeof value !== 'object' && typeof value !== 'function')) {
		return null;
	}
	if (isString(value)) {
		return 'String';
	}
	if (isNumberObject(value)) {
		return 'Number';
	}
	if (isBooleanObject(value)) {
		return 'Boolean';
	}
	if (isSymbol(value)) {
		return 'Symbol';
	}
	if (isBigint(value)) {
		return 'BigInt';
	}
};

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

var callBound = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

var $Map = typeof Map === 'function' && Map.prototype ? Map : null;
var $Set = typeof Set === 'function' && Set.prototype ? Set : null;

var exported;

if (!$Map) {
	// eslint-disable-next-line no-unused-vars
	exported = function isMap(x) {
		// `Map` is not present in this environment.
		return false;
	};
}

var $mapHas = $Map ? Map.prototype.has : null;
var $setHas = $Set ? Set.prototype.has : null;
if (!exported && !$mapHas) {
	// eslint-disable-next-line no-unused-vars
	exported = function isMap(x) {
		// `Map` does not have a `has` method
		return false;
	};
}

var isMap = exported || function isMap(x) {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$mapHas.call(x);
		if ($setHas) {
			try {
				$setHas.call(x);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $Map; // core-js workaround, pre-v2.5.0
	} catch (e) {}
	return false;
};

var $Map$1 = typeof Map === 'function' && Map.prototype ? Map : null;
var $Set$1 = typeof Set === 'function' && Set.prototype ? Set : null;

var exported$1;

if (!$Set$1) {
	// eslint-disable-next-line no-unused-vars
	exported$1 = function isSet(x) {
		// `Set` is not present in this environment.
		return false;
	};
}

var $mapHas$1 = $Map$1 ? Map.prototype.has : null;
var $setHas$1 = $Set$1 ? Set.prototype.has : null;
if (!exported$1 && !$setHas$1) {
	// eslint-disable-next-line no-unused-vars
	exported$1 = function isSet(x) {
		// `Set` does not have a `has` method
		return false;
	};
}

var isSet = exported$1 || function isSet(x) {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$setHas$1.call(x);
		if ($mapHas$1) {
			try {
				$mapHas$1.call(x);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $Set$1; // core-js workaround, pre-v2.5.0
	} catch (e) {}
	return false;
};

var $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;
var $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;

var exported$2;

if (!$WeakMap) {
	// eslint-disable-next-line no-unused-vars
	exported$2 = function isWeakMap(x) {
		// `WeakMap` is not present in this environment.
		return false;
	};
}

var $mapHas$2 = $WeakMap ? $WeakMap.prototype.has : null;
var $setHas$2 = $WeakSet ? $WeakSet.prototype.has : null;
if (!exported$2 && !$mapHas$2) {
	// eslint-disable-next-line no-unused-vars
	exported$2 = function isWeakMap(x) {
		// `WeakMap` does not have a `has` method
		return false;
	};
}

var isWeakmap = exported$2 || function isWeakMap(x) {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$mapHas$2.call(x, $mapHas$2);
		if ($setHas$2) {
			try {
				$setHas$2.call(x, $setHas$2);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $WeakMap; // core-js workaround, pre-v3
	} catch (e) {}
	return false;
};

var isWeakset = createCommonjsModule(function (module) {

var $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;
var $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;

var exported;

if (!$WeakMap) {
	// eslint-disable-next-line no-unused-vars
	exported = function isWeakSet(x) {
		// `WeakSet` is not present in this environment.
		return false;
	};
}

var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
var $setHas = $WeakSet ? $WeakSet.prototype.has : null;
if (!exported && !$setHas) {
	// eslint-disable-next-line no-unused-vars
	module.exports = function isWeakSet(x) {
		// `WeakSet` does not have a `has` method
		return false;
	};
}

module.exports = exported || function isWeakSet(x) {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$setHas.call(x, $setHas);
		if ($mapHas) {
			try {
				$mapHas.call(x, $mapHas);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $WeakSet; // core-js workaround, pre-v3
	} catch (e) {}
	return false;
};
});

var whichCollection = function whichCollection(value) {
	if (value && typeof value === 'object') {
		if (isMap(value)) {
			return 'Map';
		}
		if (isSet(value)) {
			return 'Set';
		}
		if (isWeakmap(value)) {
			return 'WeakMap';
		}
		if (isWeakset(value)) {
			return 'WeakSet';
		}
	}
	return false;
};

var esGetIterator = createCommonjsModule(function (module) {

/* eslint global-require: 0 */
// the code is structured this way so that bundlers can
// alias out `has-symbols` to `() => true` or `() => false` if your target
// environments' Symbol capabilities are known, and then use
// dead code elimination on the rest of this module.
//
// Similarly, `isarray` can be aliased to `Array.isArray` if
// available in all target environments.



if (hasSymbols$1() || shams()) {
	var $iterator = Symbol.iterator;
	// Symbol is available natively or shammed
	// natively:
	//  - Chrome >= 38
	//  - Edge 12-14?, Edge >= 15 for sure
	//  - FF >= 36
	//  - Safari >= 9
	//  - node >= 0.12
	module.exports = function getIterator(iterable) {
		// alternatively, `iterable[$iterator]?.()`
		if (iterable != null && typeof iterable[$iterator] !== 'undefined') {
			return iterable[$iterator]();
		}
		if (isArguments$1(iterable)) {
			// arguments objects lack Symbol.iterator
			// - node 0.12
			return Array.prototype[$iterator].call(iterable);
		}
	};
} else {
	// Symbol is not available, native or shammed
	var isArray = isarray;
	var isString$1 = isString;
	var GetIntrinsic$1 = GetIntrinsic;
	var $Map = GetIntrinsic$1('%Map%', true);
	var $Set = GetIntrinsic$1('%Set%', true);
	var callBound$1 = callBound;
	var $arrayPush = callBound$1('Array.prototype.push');
	var $charCodeAt = callBound$1('String.prototype.charCodeAt');
	var $stringSlice = callBound$1('String.prototype.slice');

	var advanceStringIndex = function advanceStringIndex(S, index) {
		var length = S.length;
		if ((index + 1) >= length) {
			return index + 1;
		}

		var first = $charCodeAt(S, index);
		if (first < 0xD800 || first > 0xDBFF) {
			return index + 1;
		}

		var second = $charCodeAt(S, index + 1);
		if (second < 0xDC00 || second > 0xDFFF) {
			return index + 1;
		}

		return index + 2;
	};

	var getArrayIterator = function getArrayIterator(arraylike) {
		var i = 0;
		return {
			next: function next() {
				var done = i >= arraylike.length;
				var value;
				if (!done) {
					value = arraylike[i];
					i += 1;
				}
				return {
					done: done,
					value: value
				};
			}
		};
	};

	var getNonCollectionIterator = function getNonCollectionIterator(iterable) {
		if (isArray(iterable) || isArguments$1(iterable)) {
			return getArrayIterator(iterable);
		}
		if (isString$1(iterable)) {
			var i = 0;
			return {
				next: function next() {
					var nextIndex = advanceStringIndex(iterable, i);
					var value = $stringSlice(iterable, i, nextIndex);
					i = nextIndex;
					return {
						done: nextIndex > iterable.length,
						value: value
					};
				}
			};
		}
	};

	if (!$Map && !$Set) {
		// the only language iterables are Array, String, arguments
		// - Safari <= 6.0
		// - Chrome < 38
		// - node < 0.12
		// - FF < 13
		// - IE < 11
		// - Edge < 11

		module.exports = getNonCollectionIterator;
	} else {
		// either Map or Set are available, but Symbol is not
		// - es6-shim on an ES5 browser
		// - Safari 6.2 (maybe 6.1?)
		// - FF v[13, 36)
		// - IE 11
		// - Edge 11
		// - Safari v[6, 9)

		var isMap$1 = isMap;
		var isSet$1 = isSet;

		// Firefox >= 27, IE 11, Safari 6.2 - 9, Edge 11, es6-shim in older envs, all have forEach
		var $mapForEach = callBound$1('Map.prototype.forEach', true);
		var $setForEach = callBound$1('Set.prototype.forEach', true);
		if (typeof process === 'undefined' || !process.versions || !process.versions.node) { // "if is not node"

			// Firefox 17 - 26 has `.iterator()`, whose iterator `.next()` either
			// returns a value, or throws a StopIteration object. These browsers
			// do not have any other mechanism for iteration.
			var $mapIterator = callBound$1('Map.prototype.iterator', true);
			var $setIterator = callBound$1('Set.prototype.iterator', true);
			var getStopIterationIterator = function (iterator) {
				var done = false;
				return {
					next: function next() {
						try {
							return {
								done: done,
								value: done ? undefined : iterator.next()
							};
						} catch (e) {
							done = true;
							return {
								done: true,
								value: undefined
							};
						}
					}
				};
			};
		}
		// Firefox 27-35, and some older es6-shim versions, use a string "@@iterator" property
		// this returns a proper iterator object, so we should use it instead of forEach.
		// newer es6-shim versions use a string "_es6-shim iterator_" property.
		var $mapAtAtIterator = callBound$1('Map.prototype.@@iterator', true) || callBound$1('Map.prototype._es6-shim iterator_', true);
		var $setAtAtIterator = callBound$1('Set.prototype.@@iterator', true) || callBound$1('Set.prototype._es6-shim iterator_', true);

		var getCollectionIterator = function getCollectionIterator(iterable) {
			if (isMap$1(iterable)) {
				if ($mapIterator) {
					return getStopIterationIterator($mapIterator(iterable));
				}
				if ($mapAtAtIterator) {
					return $mapAtAtIterator(iterable);
				}
				if ($mapForEach) {
					var entries = [];
					$mapForEach(iterable, function (v, k) {
						$arrayPush(entries, [k, v]);
					});
					return getArrayIterator(entries);
				}
			}
			if (isSet$1(iterable)) {
				if ($setIterator) {
					return getStopIterationIterator($setIterator(iterable));
				}
				if ($setAtAtIterator) {
					return $setAtAtIterator(iterable);
				}
				if ($setForEach) {
					var values = [];
					$setForEach(iterable, function (v) {
						$arrayPush(values, v);
					});
					return getArrayIterator(values);
				}
			}
		};

		module.exports = function getIterator(iterable) {
			return getCollectionIterator(iterable) || getNonCollectionIterator(iterable);
		};
	}
}
});

var src = functionBind.call(Function.call, Object.prototype.hasOwnProperty);

/* globals
	AggregateError,
	Atomics,
	FinalizationRegistry,
	SharedArrayBuffer,
	WeakRef,
*/

var undefined$2;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError$3 = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		// eslint-disable-next-line no-new-func
		return Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD$2 = Object.getOwnPropertyDescriptor;
if ($gOPD$2) {
	try {
		$gOPD$2({}, '');
	} catch (e) {
		$gOPD$2 = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError$1 = function () { throw new $TypeError$3(); };
var ThrowTypeError$1 = $gOPD$2
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError$1;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD$2(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError$1;
			}
		}
	}())
	: throwTypeError$1;

var hasSymbols$4 = hasSymbols$1();

var getProto$2 = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var asyncGenFunction$1 = getEvalledConstructor('async function* () {}');
var asyncGenFunctionPrototype = asyncGenFunction$1 ? asyncGenFunction$1.prototype : undefined$2;
var asyncGenPrototype = asyncGenFunctionPrototype ? asyncGenFunctionPrototype.prototype : undefined$2;

var TypedArray$1 = typeof Uint8Array === 'undefined' ? undefined$2 : getProto$2(Uint8Array);

var INTRINSICS$1 = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$2 : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$2 : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols$4 ? getProto$2([][Symbol.iterator]()) : undefined$2,
	'%AsyncFromSyncIteratorPrototype%': undefined$2,
	'%AsyncFunction%': getEvalledConstructor('async function () {}'),
	'%AsyncGenerator%': asyncGenFunctionPrototype,
	'%AsyncGeneratorFunction%': asyncGenFunction$1,
	'%AsyncIteratorPrototype%': asyncGenPrototype ? getProto$2(asyncGenPrototype) : undefined$2,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$2 : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined$2 : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined$2 : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$2 : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$2 : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$2 : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': getEvalledConstructor('function* () {}'),
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$2 : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$2 : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$2 : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols$4 ? getProto$2(getProto$2([][Symbol.iterator]())) : undefined$2,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$2,
	'%Map%': typeof Map === 'undefined' ? undefined$2 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$4 ? undefined$2 : getProto$2(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$2 : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$2 : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$2 : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined$2 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$4 ? undefined$2 : getProto$2(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$2 : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols$4 ? getProto$2(''[Symbol.iterator]()) : undefined$2,
	'%Symbol%': hasSymbols$4 ? Symbol : undefined$2,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError$1,
	'%TypedArray%': TypedArray$1,
	'%TypeError%': $TypeError$3,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$2 : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$2 : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$2 : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$2 : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$2 : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$2 : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$2 : WeakSet
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};



var $concat = functionBind.call(Function.call, Array.prototype.concat);
var $spliceApply = functionBind.call(Function.apply, Array.prototype.splice);
var $replace$1 = functionBind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName$1 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar$1 = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath$1 = function stringToPath(string) {
	var result = [];
	$replace$1(string, rePropName$1, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace$1(subString, reEscapeChar$1, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic$1 = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (src(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (src(INTRINSICS$1, intrinsicName)) {
		var value = INTRINSICS$1[intrinsicName];
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError$3('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

var GetIntrinsic$1 = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError$3('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError$3('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath$1(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic$1('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (src(INTRINSICS$1, intrinsicRealName)) {
			value = INTRINSICS$1[intrinsicRealName];
		} else if (value != null) {
			if ($gOPD$2 && (i + 1) >= parts.length) {
				var desc = $gOPD$2(value, part);
				isOwn = !!desc;

				if (!allowMissing && !(part in value)) {
					throw new $TypeError$3('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				value = isOwn ? desc.get || desc.value : value[part];
			} else {
				isOwn = src(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS$1[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

var $apply$1 = GetIntrinsic$1('%Function.prototype.apply%');
var $call$1 = GetIntrinsic$1('%Function.prototype.call%');
var $reflectApply$1 = GetIntrinsic$1('%Reflect.apply%', true) || functionBind.call($call$1, $apply$1);

var callBind$1 = function callBind() {
	return $reflectApply$1(functionBind, $call$1, arguments);
};

var apply$1 = function applyBind() {
	return $reflectApply$1(functionBind, $apply$1, arguments);
};
callBind$1.apply = apply$1;

var $indexOf$1 = callBind$1(GetIntrinsic$1('String.prototype.indexOf'));

var callBound$1 = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic$1(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf$1(name, '.prototype.')) {
		return callBind$1(intrinsic);
	}
	return intrinsic;
};

var util_inspect = require$$0__default$1['default'].inspect;

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;

var inspectCustom = util_inspect.custom;
var inspectSymbol = inspectCustom && isSymbol$1(inspectCustom) ? inspectCustom : null;

var objectInspect = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has$1(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has$1(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has$1(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean') {
        throw new TypeError('option "customInspect", if provided, must be `true` or `false`');
    }

    if (
        has$1(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        return String(obj);
    }
    if (typeof obj === 'bigint') { // eslint-disable-line valid-typeof
        return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has$1(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']';
    }
    if (isSymbol$1(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap$1(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet$1(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString$1(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        if (ys.length === 0) { return '{}'; }
        if (indent) {
            return '{' + indentedJoin(ys, indent) + '}';
        }
        return '{ ' + ys.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray(obj) { return toStr$a(obj) === '[object Array]'; }
function isDate(obj) { return toStr$a(obj) === '[object Date]'; }
function isRegExp(obj) { return toStr$a(obj) === '[object RegExp]'; }
function isError(obj) { return toStr$a(obj) === '[object Error]'; }
function isSymbol$1(obj) { return toStr$a(obj) === '[object Symbol]'; }
function isString$1(obj) { return toStr$a(obj) === '[object String]'; }
function isNumber(obj) { return toStr$a(obj) === '[object Number]'; }
function isBigInt(obj) { return toStr$a(obj) === '[object BigInt]'; }
function isBoolean(obj) { return toStr$a(obj) === '[object Boolean]'; }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has$1(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr$a(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap$1(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isSet$1(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = Array(opts.indent + 1).join(' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: Array(depth + 1).join(baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has$1(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has$1(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if ((/[^\w$]/).test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    return xs;
}

var $TypeError$4 = GetIntrinsic$1('%TypeError%');
var $WeakMap$1 = GetIntrinsic$1('%WeakMap%', true);
var $Map$2 = GetIntrinsic$1('%Map%', true);
var $push = callBound$1('Array.prototype.push');

var $weakMapGet = callBound$1('WeakMap.prototype.get', true);
var $weakMapSet = callBound$1('WeakMap.prototype.set', true);
var $weakMapHas = callBound$1('WeakMap.prototype.has', true);
var $mapGet = callBound$1('Map.prototype.get', true);
var $mapSet = callBound$1('Map.prototype.set', true);
var $mapHas$3 = callBound$1('Map.prototype.has', true);
var objectGet = function (objects, key) { // eslint-disable-line consistent-return
	for (var i = 0; i < objects.length; i += 1) {
		if (objects[i].key === key) {
			return objects[i].value;
		}
	}
};
var objectSet = function (objects, key, value) {
	for (var i = 0; i < objects.length; i += 1) {
		if (objects[i].key === key) {
			objects[i].value = value; // eslint-disable-line no-param-reassign
			return;
		}
	}
	$push(objects, {
		key: key,
		value: value
	});
};
var objectHas = function (objects, key) {
	for (var i = 0; i < objects.length; i += 1) {
		if (objects[i].key === key) {
			return true;
		}
	}
	return false;
};

var sideChannel = function getSideChannel() {
	var $wm;
	var $m;
	var $o;
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError$4('Side channel does not contain ' + objectInspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap$1 && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map$2) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return objectGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap$1 && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map$2) {
				if ($m) {
					return $mapHas$3($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return objectHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap$1 && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap$1();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map$2) {
				if (!$m) {
					$m = new $Map$2();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					$o = [];
				}
				objectSet($o, key, value);
			}
		}
	};
	return channel;
};

var hasOwn$1 = Object.prototype.hasOwnProperty;
var toString$1 = Object.prototype.toString;

var foreach = function forEach (obj, fn, ctx) {
    if (toString$1.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn$1.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};

/**
 * Array#filter.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object=} self
 * @return {Array}
 * @throw TypeError
 */

var arrayFilter = function (arr, fn, self) {
  if (arr.filter) return arr.filter(fn, self);
  if (void 0 === arr || null === arr) throw new TypeError;
  if ('function' != typeof fn) throw new TypeError;
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (!hasOwn$2.call(arr, i)) continue;
    var val = arr[i];
    if (fn.call(self, val, i, arr)) ret.push(val);
  }
  return ret;
};

var hasOwn$2 = Object.prototype.hasOwnProperty;

var availableTypedArrays = function availableTypedArrays() {
	return arrayFilter([
		'BigInt64Array',
		'BigUint64Array',
		'Float32Array',
		'Float64Array',
		'Int16Array',
		'Int32Array',
		'Int8Array',
		'Uint16Array',
		'Uint32Array',
		'Uint8Array',
		'Uint8ClampedArray'
	], function (typedArray) {
		return typeof commonjsGlobal[typedArray] === 'function';
	});
};

var $gOPD$3 = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD$3) {
	try {
		$gOPD$3([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD$3 = null;
	}
}

var getOwnPropertyDescriptor = $gOPD$3;

var $toString = callBound('Object.prototype.toString');
var hasSymbols$5 = hasSymbols$1();
var hasToStringTag$6 = hasSymbols$5 && typeof Symbol.toStringTag === 'symbol';

var typedArrays = availableTypedArrays();

var $indexOf$2 = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};

var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag$6 && getOwnPropertyDescriptor && getPrototypeOf) {
	foreach(typedArrays, function (typedArray) {
		var arr = new commonjsGlobal[typedArray]();
		if (!(Symbol.toStringTag in arr)) {
			throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
		}
		var proto = getPrototypeOf(arr);
		var descriptor = getOwnPropertyDescriptor(proto, Symbol.toStringTag);
		if (!descriptor) {
			var superProto = getPrototypeOf(proto);
			descriptor = getOwnPropertyDescriptor(superProto, Symbol.toStringTag);
		}
		toStrTags[typedArray] = descriptor.get;
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	foreach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

var isTypedArray = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag$6) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf$2(typedArrays, tag) > -1;
	}
	if (!getOwnPropertyDescriptor) { return false; }
	return tryTypedArrays(value);
};

var $toString$1 = callBound('Object.prototype.toString');
var hasSymbols$6 = hasSymbols$1();
var hasToStringTag$7 = hasSymbols$6 && typeof Symbol.toStringTag === 'symbol';

var typedArrays$1 = availableTypedArrays();

var $slice$1 = callBound('String.prototype.slice');
var toStrTags$1 = {};

var getPrototypeOf$1 = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag$7 && getOwnPropertyDescriptor && getPrototypeOf$1) {
	foreach(typedArrays$1, function (typedArray) {
		if (typeof commonjsGlobal[typedArray] === 'function') {
			var arr = new commonjsGlobal[typedArray]();
			if (!(Symbol.toStringTag in arr)) {
				throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
			}
			var proto = getPrototypeOf$1(arr);
			var descriptor = getOwnPropertyDescriptor(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf$1(proto);
				descriptor = getOwnPropertyDescriptor(superProto, Symbol.toStringTag);
			}
			toStrTags$1[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays$1 = function tryAllTypedArrays(value) {
	var foundName = false;
	foreach(toStrTags$1, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};



var whichTypedArray = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag$7) { return $slice$1($toString$1(value), 8, -1); }
	return tryTypedArrays$1(value);
};

/* globals
	AggregateError,
	Atomics,
	FinalizationRegistry,
	SharedArrayBuffer,
	WeakRef,
*/

var undefined$3;

var $SyntaxError$1 = SyntaxError;
var $Function$1 = Function;
var $TypeError$5 = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor$1 = function (expressionSyntax) {
	try {
		// eslint-disable-next-line no-new-func
		return Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD$4 = Object.getOwnPropertyDescriptor;
if ($gOPD$4) {
	try {
		$gOPD$4({}, '');
	} catch (e) {
		$gOPD$4 = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError$2 = function () { throw new $TypeError$5(); };
var ThrowTypeError$2 = $gOPD$4
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError$2;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD$4(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError$2;
			}
		}
	}())
	: throwTypeError$2;

var hasSymbols$7 = hasSymbols$1();

var getProto$3 = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var asyncGenFunction$2 = getEvalledConstructor$1('async function* () {}');
var asyncGenFunctionPrototype$1 = asyncGenFunction$2 ? asyncGenFunction$2.prototype : undefined$3;
var asyncGenPrototype$1 = asyncGenFunctionPrototype$1 ? asyncGenFunctionPrototype$1.prototype : undefined$3;

var TypedArray$2 = typeof Uint8Array === 'undefined' ? undefined$3 : getProto$3(Uint8Array);

var INTRINSICS$2 = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$3 : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$3 : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols$7 ? getProto$3([][Symbol.iterator]()) : undefined$3,
	'%AsyncFromSyncIteratorPrototype%': undefined$3,
	'%AsyncFunction%': getEvalledConstructor$1('async function () {}'),
	'%AsyncGenerator%': asyncGenFunctionPrototype$1,
	'%AsyncGeneratorFunction%': asyncGenFunction$2,
	'%AsyncIteratorPrototype%': asyncGenPrototype$1 ? getProto$3(asyncGenPrototype$1) : undefined$3,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined$3 : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined$3 : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined$3 : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$3 : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$3 : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$3 : FinalizationRegistry,
	'%Function%': $Function$1,
	'%GeneratorFunction%': getEvalledConstructor$1('function* () {}'),
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$3 : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$3 : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$3 : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols$7 ? getProto$3(getProto$3([][Symbol.iterator]())) : undefined$3,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined$3,
	'%Map%': typeof Map === 'undefined' ? undefined$3 : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols$7 ? undefined$3 : getProto$3(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined$3 : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined$3 : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined$3 : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined$3 : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols$7 ? undefined$3 : getProto$3(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$3 : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols$7 ? getProto$3(''[Symbol.iterator]()) : undefined$3,
	'%Symbol%': hasSymbols$7 ? Symbol : undefined$3,
	'%SyntaxError%': $SyntaxError$1,
	'%ThrowTypeError%': ThrowTypeError$2,
	'%TypedArray%': TypedArray$2,
	'%TypeError%': $TypeError$5,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$3 : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$3 : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$3 : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$3 : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$3 : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$3 : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$3 : WeakSet
};

var LEGACY_ALIASES$1 = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};



var $concat$1 = functionBind.call(Function.call, Array.prototype.concat);
var $spliceApply$1 = functionBind.call(Function.apply, Array.prototype.splice);
var $replace$2 = functionBind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName$2 = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar$2 = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath$2 = function stringToPath(string) {
	var result = [];
	$replace$2(string, rePropName$2, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace$2(subString, reEscapeChar$2, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic$2 = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (src(LEGACY_ALIASES$1, intrinsicName)) {
		alias = LEGACY_ALIASES$1[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (src(INTRINSICS$2, intrinsicName)) {
		var value = INTRINSICS$2[intrinsicName];
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError$5('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError$1('intrinsic ' + name + ' does not exist!');
};

var GetIntrinsic$2 = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError$5('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError$5('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath$2(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic$2('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply$1(parts, $concat$1([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (src(INTRINSICS$2, intrinsicRealName)) {
			value = INTRINSICS$2[intrinsicRealName];
		} else if (value != null) {
			if ($gOPD$4 && (i + 1) >= parts.length) {
				var desc = $gOPD$4(value, part);
				isOwn = !!desc;

				if (!allowMissing && !(part in value)) {
					throw new $TypeError$5('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				value = isOwn ? desc.get || desc.value : value[part];
			} else {
				isOwn = src(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS$2[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

var $apply$2 = GetIntrinsic$2('%Function.prototype.apply%');
var $call$2 = GetIntrinsic$2('%Function.prototype.call%');
var $reflectApply$2 = GetIntrinsic$2('%Reflect.apply%', true) || functionBind.call($call$2, $apply$2);

var callBind$2 = function callBind() {
	return $reflectApply$2(functionBind, $call$2, arguments);
};

var apply$2 = function applyBind() {
	return $reflectApply$2(functionBind, $apply$2, arguments);
};
callBind$2.apply = apply$2;

var $indexOf$3 = callBind$2(GetIntrinsic$2('String.prototype.indexOf'));

var callBound$2 = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic$2(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf$3(name, '.prototype.')) {
		return callBind$2(intrinsic);
	}
	return intrinsic;
};

// modified from https://github.com/es-shims/es6-shim

var canBeObject = function (obj) {
	return typeof obj !== 'undefined' && obj !== null;
};
var hasSymbols$8 = shams();

var toObject = Object;
var $push$1 = callBound$2('Array.prototype.push');
var $propIsEnumerable = callBound$2('Object.prototype.propertyIsEnumerable');
var originalGetSymbols = hasSymbols$8 ? Object.getOwnPropertySymbols : null;

// eslint-disable-next-line no-unused-vars
var implementation$4 = function assign(target, source1) {
	if (!canBeObject(target)) { throw new TypeError('target must be an object'); }
	var objTarget = toObject(target);
	var s, source, i, props, syms, value, key;
	for (s = 1; s < arguments.length; ++s) {
		source = toObject(arguments[s]);
		props = objectKeys(source);
		var getSymbols = hasSymbols$8 && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			syms = getSymbols(source);
			for (i = 0; i < syms.length; ++i) {
				key = syms[i];
				if ($propIsEnumerable(source, key)) {
					$push$1(props, key);
				}
			}
		}
		for (i = 0; i < props.length; ++i) {
			key = props[i];
			value = source[key];
			if ($propIsEnumerable(source, key)) {
				objTarget[key] = value;
			}
		}
	}
	return objTarget;
};

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	/*
	 * v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	 * note: this does not detect the bug unless there's 20 characters
	 */
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	/*
	 * Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	 * which is 72% slower than our shim, and Firefox 40's native implementation.
	 */
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

var polyfill$3 = function getPolyfill() {
	if (!Object.assign) {
		return implementation$4;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation$4;
	}
	if (assignHasPendingExceptions()) {
		return implementation$4;
	}
	return Object.assign;
};

var shim$2 = function shimAssign() {
	var polyfill = polyfill$3();
	defineProperties_1(
		Object,
		{ assign: polyfill },
		{ assign: function () { return Object.assign !== polyfill; } }
	);
	return polyfill;
};

var polyfill$4 = callBind$2.apply(polyfill$3());
// eslint-disable-next-line no-unused-vars
var bound = function assign(target, source1) {
	return polyfill$4(Object, arguments);
};

defineProperties_1(bound, {
	getPolyfill: polyfill$3,
	implementation: implementation$4,
	shim: shim$2
});

var object_assign = bound;

var $getTime = callBound('Date.prototype.getTime');
var gPO = Object.getPrototypeOf;
var $objToString = callBound('Object.prototype.toString');

var $Set$2 = GetIntrinsic('%Set%', true);
var $mapHas$4 = callBound('Map.prototype.has', true);
var $mapGet$1 = callBound('Map.prototype.get', true);
var $mapSize = callBound('Map.prototype.size', true);
var $setAdd = callBound('Set.prototype.add', true);
var $setDelete = callBound('Set.prototype.delete', true);
var $setHas$3 = callBound('Set.prototype.has', true);
var $setSize = callBound('Set.prototype.size', true);

// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L401-L414
function setHasEqualElement(set, val1, opts, channel) {
  var i = esGetIterator(set);
  var result;
  while ((result = i.next()) && !result.done) {
    if (internalDeepEqual(val1, result.value, opts, channel)) { // eslint-disable-line no-use-before-define
      // Remove the matching element to make sure we do not check that again.
      $setDelete(set, result.value);
      return true;
    }
  }

  return false;
}

// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L416-L439
function findLooseMatchingPrimitives(prim) {
  if (typeof prim === 'undefined') {
    return null;
  }
  if (typeof prim === 'object') { // Only pass in null as object!
    return void 0;
  }
  if (typeof prim === 'symbol') {
    return false;
  }
  if (typeof prim === 'string' || typeof prim === 'number') {
    // Loose equal entries exist only if the string is possible to convert to a regular number and not NaN.
    return +prim === +prim; // eslint-disable-line no-implicit-coercion
  }
  return true;
}

// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L449-L460
function mapMightHaveLoosePrim(a, b, prim, item, opts, channel) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }
  var curB = $mapGet$1(b, altValue);
  var looseOpts = object_assign({}, opts, { strict: false });
  if (
    (typeof curB === 'undefined' && !$mapHas$4(b, altValue))
    // eslint-disable-next-line no-use-before-define
    || !internalDeepEqual(item, curB, looseOpts, channel)
  ) {
    return false;
  }
  // eslint-disable-next-line no-use-before-define
  return !$mapHas$4(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel);
}

// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L441-L447
function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }

  return $setHas$3(b, altValue) && !$setHas$3(a, altValue);
}

// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L518-L533
function mapHasEqualEntry(set, map, key1, item1, opts, channel) {
  var i = esGetIterator(set);
  var result;
  var key2;
  while ((result = i.next()) && !result.done) {
    key2 = result.value;
    if (
      // eslint-disable-next-line no-use-before-define
      internalDeepEqual(key1, key2, opts, channel)
      // eslint-disable-next-line no-use-before-define
      && internalDeepEqual(item1, $mapGet$1(map, key2), opts, channel)
    ) {
      $setDelete(set, key2);
      return true;
    }
  }

  return false;
}

function internalDeepEqual(actual, expected, options, channel) {
  var opts = options || {};

  // 7.1. All identical values are equivalent, as determined by ===.
  if (opts.strict ? objectIs(actual, expected) : actual === expected) {
    return true;
  }

  var actualBoxed = whichBoxedPrimitive(actual);
  var expectedBoxed = whichBoxedPrimitive(expected);
  if (actualBoxed !== expectedBoxed) {
    return false;
  }

  // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.
  if (!actual || !expected || (typeof actual !== 'object' && typeof expected !== 'object')) {
    return opts.strict ? objectIs(actual, expected) : actual == expected; // eslint-disable-line eqeqeq
  }

  /*
   * 7.4. For all other Object pairs, including Array objects, equivalence is
   * determined by having the same number of owned properties (as verified
   * with Object.prototype.hasOwnProperty.call), the same set of keys
   * (although not necessarily the same order), equivalent values for every
   * corresponding key, and an identical 'prototype' property. Note: this
   * accounts for both named and indexed properties on Arrays.
   */
  // see https://github.com/nodejs/node/commit/d3aafd02efd3a403d646a3044adcf14e63a88d32 for memos/channel inspiration

  var hasActual = channel.has(actual);
  var hasExpected = channel.has(expected);
  var sentinel;
  if (hasActual && hasExpected) {
    if (channel.get(actual) === channel.get(expected)) {
      return true;
    }
  } else {
    sentinel = {};
  }
  if (!hasActual) { channel.set(actual, sentinel); }
  if (!hasExpected) { channel.set(expected, sentinel); }

  // eslint-disable-next-line no-use-before-define
  return objEquiv(actual, expected, opts, channel);
}

function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
    return false;
  }
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') {
    return false;
  }

  return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));
}

function setEquiv(a, b, opts, channel) {
  if ($setSize(a) !== $setSize(b)) {
    return false;
  }
  var iA = esGetIterator(a);
  var iB = esGetIterator(b);
  var resultA;
  var resultB;
  var set;
  while ((resultA = iA.next()) && !resultA.done) {
    if (resultA.value && typeof resultA.value === 'object') {
      if (!set) { set = new $Set$2(); }
      $setAdd(set, resultA.value);
    } else if (!$setHas$3(b, resultA.value)) {
      if (opts.strict) { return false; }
      if (!setMightHaveLoosePrim(a, b, resultA.value)) {
        return false;
      }
      if (!set) { set = new $Set$2(); }
      $setAdd(set, resultA.value);
    }
  }
  if (set) {
    while ((resultB = iB.next()) && !resultB.done) {
      // We have to check if a primitive value is already matching and only if it's not, go hunting for it.
      if (resultB.value && typeof resultB.value === 'object') {
        if (!setHasEqualElement(set, resultB.value, opts.strict, channel)) {
          return false;
        }
      } else if (
        !opts.strict
        && !$setHas$3(a, resultB.value)
        && !setHasEqualElement(set, resultB.value, opts.strict, channel)
      ) {
        return false;
      }
    }
    return $setSize(set) === 0;
  }
  return true;
}

function mapEquiv(a, b, opts, channel) {
  if ($mapSize(a) !== $mapSize(b)) {
    return false;
  }
  var iA = esGetIterator(a);
  var iB = esGetIterator(b);
  var resultA;
  var resultB;
  var set;
  var key;
  var item1;
  var item2;
  while ((resultA = iA.next()) && !resultA.done) {
    key = resultA.value[0];
    item1 = resultA.value[1];
    if (key && typeof key === 'object') {
      if (!set) { set = new $Set$2(); }
      $setAdd(set, key);
    } else {
      item2 = $mapGet$1(b, key);
      if ((typeof item2 === 'undefined' && !$mapHas$4(b, key)) || !internalDeepEqual(item1, item2, opts, channel)) {
        if (opts.strict) {
          return false;
        }
        if (!mapMightHaveLoosePrim(a, b, key, item1, opts, channel)) {
          return false;
        }
        if (!set) { set = new $Set$2(); }
        $setAdd(set, key);
      }
    }
  }

  if (set) {
    while ((resultB = iB.next()) && !resultB.done) {
      key = resultB.value[0];
      item2 = resultB.value[1];
      if (key && typeof key === 'object') {
        if (!mapHasEqualEntry(set, a, key, item2, opts, channel)) {
          return false;
        }
      } else if (
        !opts.strict
        && (!a.has(key) || !internalDeepEqual($mapGet$1(a, key), item2, opts, channel))
        && !mapHasEqualEntry(set, a, key, item2, object_assign({}, opts, { strict: false }), channel)
      ) {
        return false;
      }
    }
    return $setSize(set) === 0;
  }
  return true;
}

function objEquiv(a, b, opts, channel) {
  /* eslint max-statements: [2, 100], max-lines-per-function: [2, 120], max-depth: [2, 5] */
  var i, key;

  if (typeof a !== typeof b) { return false; }
  if (a == null || b == null) { return false; }

  if ($objToString(a) !== $objToString(b)) { return false; }

  if (isArguments$1(a) !== isArguments$1(b)) { return false; }

  var aIsArray = isarray(a);
  var bIsArray = isarray(b);
  if (aIsArray !== bIsArray) { return false; }

  // TODO: replace when a cross-realm brand check is available
  var aIsError = a instanceof Error;
  var bIsError = b instanceof Error;
  if (aIsError !== bIsError) { return false; }
  if (aIsError || bIsError) {
    if (a.name !== b.name || a.message !== b.message) { return false; }
  }

  var aIsRegex = isRegex(a);
  var bIsRegex = isRegex(b);
  if (aIsRegex !== bIsRegex) { return false; }
  if ((aIsRegex || bIsRegex) && (a.source !== b.source || regexp_prototype_flags(a) !== regexp_prototype_flags(b))) {
    return false;
  }

  var aIsDate = isDateObject(a);
  var bIsDate = isDateObject(b);
  if (aIsDate !== bIsDate) { return false; }
  if (aIsDate || bIsDate) { // && would work too, because both are true or both false here
    if ($getTime(a) !== $getTime(b)) { return false; }
  }
  if (opts.strict && gPO && gPO(a) !== gPO(b)) { return false; }

  if (whichTypedArray(a) !== whichTypedArray(b)) {
    return false;
  }

  var aIsBuffer = isBuffer(a);
  var bIsBuffer = isBuffer(b);
  if (aIsBuffer !== bIsBuffer) { return false; }
  if (aIsBuffer || bIsBuffer) { // && would work too, because both are true or both false here
    if (a.length !== b.length) { return false; }
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) { return false; }
    }
    return true;
  }

  if (typeof a !== typeof b) { return false; }

  var ka = objectKeys(a);
  var kb = objectKeys(b);
  // having the same number of owned properties (keys incorporates hasOwnProperty)
  if (ka.length !== kb.length) { return false; }

  // the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  // ~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) { return false; } // eslint-disable-line eqeqeq
  }

  // equivalent values for every corresponding key, and ~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!internalDeepEqual(a[key], b[key], opts, channel)) { return false; }
  }

  var aCollection = whichCollection(a);
  var bCollection = whichCollection(b);
  if (aCollection !== bCollection) {
    return false;
  }
  if (aCollection === 'Set' || bCollection === 'Set') { // aCollection === bCollection
    return setEquiv(a, b, opts, channel);
  }
  if (aCollection === 'Map') { // aCollection === bCollection
    return mapEquiv(a, b, opts, channel);
  }

  return true;
}

var deepEqual = function deepEqual(a, b, opts) {
  return internalDeepEqual(a, b, opts, sideChannel());
};

var inherits_browser = createCommonjsModule(function (module) {
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}
});

var inherits = createCommonjsModule(function (module) {
try {
  var util = require$$0__default$1['default'];
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = inherits_browser;
}
});

var $TypeError$6 = GetIntrinsic('%TypeError%');

// http://www.ecma-international.org/ecma-262/5.1/#sec-9.10

var CheckObjectCoercible = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError$6(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

var $String = GetIntrinsic('%String%');
var $TypeError$7 = GetIntrinsic('%TypeError%');

// https://www.ecma-international.org/ecma-262/6.0/#sec-tostring

var ToString = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError$7('Cannot convert a Symbol value to a string');
	}
	return $String(argument);
};

var $replace$3 = callBound('String.prototype.replace');

/* eslint-disable no-control-regex */
var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;
/* eslint-enable no-control-regex */

var implementation$5 = function trim() {
	var S = ToString(CheckObjectCoercible(this));
	return $replace$3($replace$3(S, leftWhitespace, ''), rightWhitespace, '');
};

var zeroWidthSpace = '\u200b';

var polyfill$5 = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation$5;
};

var shim$3 = function shimStringTrim() {
	var polyfill = polyfill$5();
	defineProperties_1(String.prototype, { trim: polyfill }, {
		trim: function testTrim() {
			return String.prototype.trim !== polyfill;
		}
	});
	return polyfill;
};

var boundTrim = callBind(polyfill$5());

defineProperties_1(boundTrim, {
	getPolyfill: polyfill$5,
	implementation: implementation$5,
	shim: shim$3
});

var string_prototype_trim = boundTrim;

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
	} catch (_) {
		reflectApply = null;
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr$b = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag$8 = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

var isCallable = reflectApply
	? function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag$8) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr$b.call(value);
		return strClass === fnClass || strClass === genClass;
	};

var toStr$c = Object.prototype.toString;
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

var forEachArray = function forEachArray(array, iterator, receiver) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (hasOwnProperty$1.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};

var forEachString = function forEachString(string, iterator, receiver) {
    for (var i = 0, len = string.length; i < len; i++) {
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};

var forEachObject = function forEachObject(object, iterator, receiver) {
    for (var k in object) {
        if (hasOwnProperty$1.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};

var forEach = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }

    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }

    if (toStr$c.call(list) === '[object Array]') {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};

var forEach_1 = forEach;

var EventEmitter = require$$0__default$2['default'].EventEmitter;







var isEnumerable$1 = functionBind.call(Function.call, Object.prototype.propertyIsEnumerable);
var toLowerCase = functionBind.call(Function.call, String.prototype.toLowerCase);
var isProto = functionBind.call(Function.call, Object.prototype.isPrototypeOf);
var $test = functionBind.call(Function.call, RegExp.prototype.test);

var test = Test;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick;
var safeSetTimeout = setTimeout;
var safeClearTimeout = clearTimeout;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        } else if (t === 'object') {
            opts = arg || opts;
        } else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test(name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._todo = args.opts.todo || false;
    this._timeout = args.opts.timeout;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;
    var depthEnvVar = process.env.NODE_TAPE_OBJECT_PRINT_DEPTH;
    if (args.opts.objectPrintDepth) {
        this._objectPrintDepth = args.opts.objectPrintDepth;
    } else if (depthEnvVar) {
        if (toLowerCase(depthEnvVar) === 'infinity') {
            this._objectPrintDepth = Infinity;
        } else {
            this._objectPrintDepth = depthEnvVar;
        }
    } else {
        this._objectPrintDepth = 5;
    }

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    this.emit('prerun');
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }

    var callbackReturn = this._cb(this);

    if (
        typeof Promise === 'function' &&
        callbackReturn &&
        typeof callbackReturn.then === 'function'
    ) {
        var self = this;
        Promise.resolve(callbackReturn).then(function onResolve() {
            if (!self.calledEnd) {
                self.end();
            }
        })['catch'](function onError(err) {
            self.fail(err);
            self.end();
        });
        return;
    }

    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    });

    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }

    nextTick(function () {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    forEach_1(string_prototype_trim(msg).split('\n'), function (aMsg) {
        that.emit('result', string_prototype_trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function (ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = safeSetTimeout(function () {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function () {
        safeClearTimeout(timeout);
    });
};

Test.prototype.end = function (err) {
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }

    if (this.calledEnd) {
        this.fail('.end() already called');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;

    if (!this._cb && !this._todo && !this._skip) this.fail('# TODO ' + this.name);

    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end(); });
        t.run();
        return;
    }

    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected: this._plan,
            actual: this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected: this._plan,
            actual: this.assertCount,
            exiting: true
        });
    } else if (!this.ended) {
        this.fail('test exited without ending: ' + this.name, {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    return this._plan - (this._progeny.length + this.assertCount);
};

Test.prototype._assert = function assert(ok, opts) {
    var self = this;
    var extra = opts.extra || {};

    ok = !!ok || !!extra.skip;

    var name = defined(extra.message, opts.message, '(unnamed assert)');
    if (this.calledEnd && opts.operator !== 'fail') {
        this.fail('.end() already called: ' + name);
        return;
    }

    var res = {
        id: self.assertCount++,
        ok: ok,
        skip: defined(extra.skip, opts.skip),
        todo: defined(extra.todo, opts.todo, self._todo),
        name: name,
        operator: defined(extra.operator, opts.operator),
        objectPrintDepth: self._objectPrintDepth
    };
    if (src(opts, 'actual') || src(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (src(opts, 'expected') || src(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = !!(this._ok && ok);

    if (!ok && !res.todo) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }

    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = __dirname + path__default['default'].sep;

        for (var i = 0; i < err.length; i++) {
            /*
                Stack trace lines may resemble one of the following. We need
                to correctly extract a function name (if any) and path / line
                number for each line.

                    at myFunction (/path/to/file.js:123:45)
                    at myFunction (/path/to/file.other-ext:123:45)
                    at myFunction (/path to/file.js:123:45)
                    at myFunction (C:\path\to\file.js:123:45)
                    at myFunction (/path/to/file.js:123)
                    at Test.<anonymous> (/path/to/file.js:123:45)
                    at Test.bound [as run] (/path/to/file.js:123:45)
                    at /path/to/file.js:123:45

                Regex has three parts. First is non-capturing group for 'at '
                (plus anything preceding it).

                    /^(?:[^\s]*\s*\bat\s+)/

                Second captures function call description (optional). This is
                not necessarily a valid JS function name, but just what the
                stack trace is using to represent a function call. It may look
                like `<anonymous>` or 'Test.bound [as run]'.

                For our purposes, we assume that, if there is a function
                name, it's everything leading up to the first open
                parentheses (trimmed) before our pathname.

                    /(?:(.*)\s+\()?/

                Last part captures file path plus line no (and optional
                column no).

                    /((?:\/|[a-zA-Z]:\\)[^:\)]+:(\d+)(?::(\d+))?)\)?/
            */
            var re = /^(?:[^\s]*\s*\bat\s+)(?:(.*)\s+\()?((?:\/|[a-zA-Z]:\\)[^:\)]+:(\d+)(?::(\d+))?)\)?$/;
            var lineWithTokens = err[i].replace(process.cwd(), '/\$CWD').replace(__dirname, '/\$TEST');
            var m = re.exec(lineWithTokens);

            if (!m) {
                continue;
            }

            var callDescription = m[1] || '<anonymous>';
            var filePath = m[2].replace('/$CWD', process.cwd()).replace('/$TEST', __dirname);

            if (filePath.slice(0, dir.length) === dir) {
                continue;
            }

            // Function call description may not (just) be a function name.
            // Try to extract function name by looking at first "word" only.
            res.functionName = callDescription.split(/\s+/)[0];
            res.file = filePath;
            res.line = Number(m[3]);
            if (m[4]) res.column = Number(m[4]);

            res.at = callDescription + ' (' + filePath + ')';
            break;
        }
    }

    self.emit('result', res);

    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }

    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected: self._plan,
            actual: self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message: msg,
        operator: 'fail',
        extra: extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message: msg,
        operator: 'pass',
        extra: extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message: msg,
        operator: 'skip',
        skip: true,
        extra: extra
    });
};

function assert(value, msg, extra) {
    this._assert(value, {
        message: defined(msg, 'should be truthy'),
        operator: 'ok',
        expected: true,
        actual: value,
        extra: extra
    });
}
Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= assert;

function notOK(value, msg, extra) {
    this._assert(!value, {
        message: defined(msg, 'should be falsy'),
        operator: 'notOk',
        expected: false,
        actual: value,
        extra: extra
    });
}
Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= notOK;

function error(err, msg, extra) {
    this._assert(!err, {
        message: defined(msg, String(err)),
        operator: 'error',
        error: err,
        extra: extra
    });
}
Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= error;

function strictEqual(a, b, msg, extra) {
    if (arguments.length < 2) {
        throw new TypeError('two arguments must be provided to compare');
    }
    this._assert(objectIs(a, b), {
        message: defined(msg, 'should be strictly equal'),
        operator: 'equal',
        actual: a,
        expected: b,
        extra: extra
    });
}
Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= Test.prototype.is
= strictEqual;

function notStrictEqual(a, b, msg, extra) {
    if (arguments.length < 2) {
        throw new TypeError('two arguments must be provided to compare');
    }
    this._assert(!objectIs(a, b), {
        message: defined(msg, 'should not be strictly equal'),
        operator: 'notEqual',
        actual: a,
        expected: b,
        extra: extra
    });
}

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.isNotEqual
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNot
= Test.prototype.not
= notStrictEqual;

function looseEqual(a, b, msg, extra) {
    if (arguments.length < 2) {
        throw new TypeError('two arguments must be provided to compare');
    }
    this._assert(a == b, {
        message: defined(msg, 'should be loosely equal'),
        operator: 'looseEqual',
        actual: a,
        expected: b,
        extra: extra
    });
}

Test.prototype.looseEqual
= Test.prototype.looseEquals
= looseEqual;

function notLooseEqual(a, b, msg, extra) {
    if (arguments.length < 2) {
        throw new TypeError('two arguments must be provided to compare');
    }
    this._assert(a != b, {
        message: defined(msg, 'should not be loosely equal'),
        operator: 'notLooseEqual',
        actual: a,
        expected: b,
        extra: extra
    });
}
Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= notLooseEqual;

function tapeDeepEqual(a, b, msg, extra) {
    if (arguments.length < 2) {
        throw new TypeError('two arguments must be provided to compare');
    }
    this._assert(deepEqual(a, b, { strict: true }), {
        message: defined(msg, 'should be deeply equivalent'),
        operator: 'deepEqual',
        actual: a,
        expected: b,
        extra: extra
    });
}
Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= tapeDeepEqual;

function notDeepEqual(a, b, msg, extra) {
    if (arguments.length < 2) {
        throw new TypeError('two arguments must be provided to compare');
    }
    this._assert(!deepEqual(a, b, { strict: true }), {
        message: defined(msg, 'should not be deeply equivalent'),
        operator: 'notDeepEqual',
        actual: a,
        expected: b,
        extra: extra
    });
}
Test.prototype.notDeepEqual
= Test.prototype.notDeepEquals
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= notDeepEqual;

function deepLooseEqual(a, b, msg, extra) {
    if (arguments.length < 2) {
        throw new TypeError('two arguments must be provided to compare');
    }
    this._assert(deepEqual(a, b), {
        message: defined(msg, 'should be loosely deeply equivalent'),
        operator: 'deepLooseEqual',
        actual: a,
        expected: b,
        extra: extra
    });
}

Test.prototype.deepLooseEqual
= deepLooseEqual;

function notDeepLooseEqual(a, b, msg, extra) {
    if (arguments.length < 2) {
        throw new TypeError('two arguments must be provided to compare');
    }
    this._assert(!deepEqual(a, b), {
        message: defined(msg, 'should not be loosely deeply equivalent'),
        operator: 'notDeepLooseEqual',
        actual: a,
        expected: b,
        extra: extra
    });
}
Test.prototype.notDeepLooseEqual
= notDeepLooseEqual;

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error: err };
        if (Object(err) === err && (!isEnumerable$1(err, 'message') || !src(err, 'message'))) {
            var message = err.message;
            delete err.message;
            err.message = message;
        }
    }

    var passed = caught;

    if (caught) {
        if (typeof expected === 'string' && caught.error && caught.error.message === expected) {
            throw new TypeError('The "error/message" argument is ambiguous. The error message ' + objectInspect(expected) + ' is identical to the message.');
        }
        if (typeof expected === 'function') {
            if (typeof expected.prototype !== 'undefined' && caught.error instanceof expected) {
                passed = true;
            } else if (isProto(Error, expected)) {
                passed = false;
            } else {
                passed = expected.call({}, caught.error) === true;
            }
        } else if (isRegex(expected)) {
            passed = expected.test(caught.error);
            expected = objectInspect(expected);
        } else if (expected && typeof expected === 'object') { // Handle validation objects.
            var keys = Object.keys(expected);
            // Special handle errors to make sure the name and the message are compared as well.
            if (expected instanceof Error) {
                keys.push('name', 'message');
            } else if (keys.length === 0) {
                throw new TypeError('`throws` validation object must not be empty');
            }
            passed = keys.every(function (key) {
                if (typeof caught.error[key] === 'string' && isRegex(expected[key]) && expected[key].test(caught.error[key])) {
                    return true;
                }
                if (key in caught.error && deepEqual(caught.error[key], expected[key], { strict: true })) {
                    return true;
                }
                return false;
            });
        }
    }

    this._assert(!!passed, {
        message: defined(msg, 'should throw'),
        operator: 'throws',
        actual: caught && caught.error,
        expected: expected,
        error: !passed && caught && caught.error,
        extra: extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error: err };
    }
    this._assert(!caught, {
        message: defined(msg, 'should not throw'),
        operator: 'throws',
        actual: caught && caught.error,
        expected: expected,
        error: caught && caught.error,
        extra: extra
    });
};

Test.prototype.match = function match(string, regexp, msg, extra) {
    if (!isRegex(regexp)) {
        throw new TypeError('The "regexp" argument must be an instance of RegExp. Received type ' + typeof regexp + ' (' + objectInspect(regexp) + ')');
    }
    if (typeof string !== 'string') {
        throw new TypeError('The "string" argument must be of type string. Received type ' + typeof string + ' (' + objectInspect(string) + ')');
    }

    var matches = $test(regexp, string);
    var message = defined(
        msg,
        'The input ' + (matches ? 'matched' : 'did not match') + ' the regular expression ' + objectInspect(regexp) + '. Input: ' + objectInspect(string)
    );
    this._assert(matches, {
        message: message,
        operator: 'match',
        actual: string,
        expected: regexp,
        extra: extra
    });
};

Test.prototype.doesNotMatch = function doesNotMatch(string, regexp, msg, extra) {
    if (!isRegex(regexp)) {
        throw new TypeError('The "regexp" argument must be an instance of RegExp. Received type ' + typeof regexp + ' (' + objectInspect(regexp) + ')');
    }
    if (typeof string !== 'string') {
        throw new TypeError('The "string" argument must be of type string. Received type ' + typeof string + ' (' + objectInspect(string) + ')');
    }
    var matches = $test(regexp, string);
    var message = defined(
        msg,
        'The input ' + (matches ? 'was expected to not match' : 'did not match') + ' the regular expression ' + objectInspect(regexp) + '. Input: ' + objectInspect(string)
    );
    this._assert(!matches, {
        message: message,
        operator: 'doesNotMatch',
        actual: string,
        expected: regexp,
        extra: extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

var nextTick$1 = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

var resumer = function (write, end) {
    var tr = through_1(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick$1(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

var EventEmitter$1 = require$$0__default$2['default'].EventEmitter;






var regexpTest = functionBind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick$2 = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

var results = Results;
inherits(Results, EventEmitter$1);

function coalesceWhiteSpaces(str) {
    return String(str).replace(/\s+/g, ' ');
}

function Results() {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this.todo = 0;
    this._stream = through_1();
    this.tests = [];
    this._only = null;
    this._isRunning = false;
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through_1();
        self.on('_push', function ontest(t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id,
                    skip: t._skip,
                    todo: t._todo
                };
                if (src(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                if (res && typeof res === 'object') {
                    res.test = id;
                    res.type = 'assert';
                }
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null); });
    } else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }

    if (!this._isRunning) {
        this._isRunning = true;
        nextTick$2(function next() {
            var t;
            while (t = getNextTest(self)) {
                t.run();
                if (!t.ended) return t.once('end', function () { nextTick$2(next); });
            }
            self.emit('done');
        });
    }

    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (t) {
    this._only = t;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s); };
    t.once('prerun', function () {
        var premsg = '';
        if (t._skip) premsg = 'SKIP ';
        else if (t._todo) premsg = 'TODO ';
        write('# ' + premsg + coalesceWhiteSpaces(t.name) + '\n');
    });

    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok || res.todo) self.pass ++;
        else {
            self.fail ++;
            self.emit('fail');
        }
    });

    t.on('test', function (st) { self._watch(st); });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s); };

    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + (self.pass + self.todo) + '\n');
    if (self.todo) write('# todo  ' + self.todo + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n');
    else write('\n# ok\n');

    self._stream.queue(null);
};

function encodeResult(res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + coalesceWhiteSpaces(res.name) : '';

    if (res.skip) {
        output += ' # SKIP' + ((typeof res.skip === 'string') ? ' ' + coalesceWhiteSpaces(res.skip) : '');
    } else if (res.todo) {
        output += ' # TODO' + ((typeof res.todo === 'string') ? ' ' + coalesceWhiteSpaces(res.todo) : '');
    }
    output += '\n';
    if (res.ok) return output;

    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';

    if (src(res, 'expected') || src(res, 'actual')) {
        var ex = objectInspect(res.expected, {depth: res.objectPrintDepth});
        var ac = objectInspect(res.actual, {depth: res.objectPrintDepth});

        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        } else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }

    var actualStack = res.actual && (typeof res.actual === 'object' || typeof res.actual === 'function') ? res.actual.stack : undefined;
    var errorStack = res.error && res.error.stack;
    var stack = defined(actualStack, errorStack);
    if (stack) {
        var lines = String(stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }

    output += outer + '...\n';
    return output;
}

function getNextTest(results) {
    if (!results._only) {
        return results.tests.shift();
    }

    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t) {
            return t;
        }
    } while (results.tests.length !== 0);
}

function invalidYaml(str) {
    return regexpTest(yamlIndicators, str);
}

var tape = createCommonjsModule(function (module, exports) {







var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };

    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };

    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through_1();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };

    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.onFailure = function () {
        return getHarness().onFailure.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness;

    return lazyLoad;

    function getHarness(opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness(conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });

    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || default_stream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1; });
    }

    var ended = false;
    stream.on('end', function () { ended = true; });

    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return;
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });

    return harness;
}

exports.createHarness = createHarness;
exports.Test = test;
exports.test = exports; // tap compat
exports.test.skip = test.skip;

function createHarness(conf_) {
    if (!conf_) conf_ = {};
    var results$1 = results();
    if (conf_.autoclose !== false) {
        results$1.once('done', function () { results$1.close(); });
    }

    var test$1 = function (name, conf, cb) {
        var t = new test(name, conf, cb);
        test$1._tests.push(t);

        (function inspectCode(st) {
            st.on('test', function sub(st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.todo && !r.ok && typeof r !== 'string') test$1._exitCode = 1;
            });
        })(t);

        results$1.push(t);
        return t;
    };
    test$1._results = results$1;

    test$1._tests = [];

    test$1.createStream = function (opts) {
        return results$1.createStream(opts);
    };

    test$1.onFinish = function (cb) {
        results$1.on('done', cb);
    };

    test$1.onFailure = function (cb) {
        results$1.on('fail', cb);
    };

    var only = false;
    test$1.only = function () {
        if (only) throw new Error('there can only be one only test');
        only = true;
        var t = test$1.apply(null, arguments);
        results$1.only(t);
        return t;
    };
    test$1._exitCode = 0;

    test$1.close = function () { results$1.close(); };

    return test$1;
}
});

/// @file
/// @addtogroup flatbuffers_javascript_api
/// @{
/// @cond FLATBUFFERS_INTERNAL

/**
 * @fileoverview
 *
 * Need to suppress 'global this' error so the Node.js export line doesn't cause
 * closure compile to error out.
 * @suppress {globalThis}
 */

/**
 * @const
 * @namespace
 */
var flatbuffers = {};

/**
 * @type {number}
 * @const
 */
flatbuffers.SIZEOF_SHORT = 2;

/**
 * @type {number}
 * @const
 */
flatbuffers.SIZEOF_INT = 4;

/**
 * @type {number}
 * @const
 */
flatbuffers.FILE_IDENTIFIER_LENGTH = 4;

/**
 * @type {number}
 * @const
 */
flatbuffers.SIZE_PREFIX_LENGTH = 4;

/**
 * @param {number} low
 * @param {number} high
 * @returns {flatbuffers.Long}
 */
flatbuffers.createLong = function (low, high) {
  return flatbuffers.Long.create(low, high);
};

/**
 * @enum {number}
 */
flatbuffers.Encoding = {
  UTF8_BYTES: 1,
  UTF16_STRING: 2,
};

/**
 * @type {Int32Array}
 * @const
 */
flatbuffers.int32 = new Int32Array(2);

/**
 * @type {Float32Array}
 * @const
 */
flatbuffers.float32 = new Float32Array(flatbuffers.int32.buffer);

/**
 * @type {Float64Array}
 * @const
 */
flatbuffers.float64 = new Float64Array(flatbuffers.int32.buffer);

/**
 * @type {boolean}
 * @const
 */
flatbuffers.isLittleEndian =
  new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;

////////////////////////////////////////////////////////////////////////////////

/**
 * @constructor
 * @param {number} low
 * @param {number} high
 */
flatbuffers.Long = function (low, high) {
  /**
   * @type {number}
   * @const
   */
  this.low = low | 0;

  /**
   * @type {number}
   * @const
   */
  this.high = high | 0;
};

/**
 * @param {number} low
 * @param {number} high
 * @returns {!flatbuffers.Long}
 */
flatbuffers.Long.create = function (low, high) {
  // Special-case zero to avoid GC overhead for default values
  return low == 0 && high == 0
    ? flatbuffers.Long.ZERO
    : new flatbuffers.Long(low, high);
};

/**
 * @returns {number}
 */
flatbuffers.Long.prototype.toFloat64 = function () {
  return (this.low >>> 0) + this.high * 0x100000000;
};

/**
 * @param {flatbuffers.Long} other
 * @returns {boolean}
 */
flatbuffers.Long.prototype.equals = function (other) {
  return this.low == other.low && this.high == other.high;
};

/**
 * @type {!flatbuffers.Long}
 * @const
 */
flatbuffers.Long.ZERO = new flatbuffers.Long(0, 0);

/// @endcond
////////////////////////////////////////////////////////////////////////////////
/**
 * Create a FlatBufferBuilder.
 *
 * @constructor
 * @param {number=} opt_initial_size
 */
flatbuffers.Builder = function (opt_initial_size) {
  if (!opt_initial_size) {
    var initial_size = 1024;
  } else {
    var initial_size = opt_initial_size;
  }

  /**
   * @type {flatbuffers.ByteBuffer}
   * @private
   */
  this.bb = flatbuffers.ByteBuffer.allocate(initial_size);

  /**
   * Remaining space in the ByteBuffer.
   *
   * @type {number}
   * @private
   */
  this.space = initial_size;

  /**
   * Minimum alignment encountered so far.
   *
   * @type {number}
   * @private
   */
  this.minalign = 1;

  /**
   * The vtable for the current table.
   *
   * @type {Array.<number>}
   * @private
   */
  this.vtable = null;

  /**
   * The amount of fields we're actually using.
   *
   * @type {number}
   * @private
   */
  this.vtable_in_use = 0;

  /**
   * Whether we are currently serializing a table.
   *
   * @type {boolean}
   * @private
   */
  this.isNested = false;

  /**
   * Starting offset of the current struct/table.
   *
   * @type {number}
   * @private
   */
  this.object_start = 0;

  /**
   * List of offsets of all vtables.
   *
   * @type {Array.<number>}
   * @private
   */
  this.vtables = [];

  /**
   * For the current vector being built.
   *
   * @type {number}
   * @private
   */
  this.vector_num_elems = 0;

  /**
   * False omits default values from the serialized data
   *
   * @type {boolean}
   * @private
   */
  this.force_defaults = false;
};

flatbuffers.Builder.prototype.clear = function () {
  this.bb.clear();
  this.space = this.bb.capacity();
  this.minalign = 1;
  this.vtable = null;
  this.vtable_in_use = 0;
  this.isNested = false;
  this.object_start = 0;
  this.vtables = [];
  this.vector_num_elems = 0;
  this.force_defaults = false;
  this.string_maps = null;
};

/**
 * In order to save space, fields that are set to their default value
 * don't get serialized into the buffer. Forcing defaults provides a
 * way to manually disable this optimization.
 *
 * @param {boolean} forceDefaults true always serializes default values
 */
flatbuffers.Builder.prototype.forceDefaults = function (forceDefaults) {
  this.force_defaults = forceDefaults;
};

/**
 * Get the ByteBuffer representing the FlatBuffer. Only call this after you've
 * called finish(). The actual data starts at the ByteBuffer's current position,
 * not necessarily at 0.
 *
 * @returns {flatbuffers.ByteBuffer}
 */
flatbuffers.Builder.prototype.dataBuffer = function () {
  return this.bb;
};

/**
 * Get the bytes representing the FlatBuffer. Only call this after you've
 * called finish().
 *
 * @returns {!Uint8Array}
 */
flatbuffers.Builder.prototype.asUint8Array = function () {
  return this.bb
    .bytes()
    .subarray(this.bb.position(), this.bb.position() + this.offset());
};

/// @cond FLATBUFFERS_INTERNAL
/**
 * Prepare to write an element of `size` after `additional_bytes` have been
 * written, e.g. if you write a string, you need to align such the int length
 * field is aligned to 4 bytes, and the string data follows it directly. If all
 * you need to do is alignment, `additional_bytes` will be 0.
 *
 * @param {number} size This is the of the new element to write
 * @param {number} additional_bytes The padding size
 */
flatbuffers.Builder.prototype.prep = function (size, additional_bytes) {
  // Track the biggest thing we've ever aligned to.
  if (size > this.minalign) {
    this.minalign = size;
  }

  // Find the amount of alignment needed such that `size` is properly
  // aligned after `additional_bytes`
  var align_size =
    (~(this.bb.capacity() - this.space + additional_bytes) + 1) & (size - 1);

  // Reallocate the buffer if needed.
  while (this.space < align_size + size + additional_bytes) {
    var old_buf_size = this.bb.capacity();
    this.bb = flatbuffers.Builder.growByteBuffer(this.bb);
    this.space += this.bb.capacity() - old_buf_size;
  }

  this.pad(align_size);
};

/**
 * @param {number} byte_size
 */
flatbuffers.Builder.prototype.pad = function (byte_size) {
  for (var i = 0; i < byte_size; i++) {
    this.bb.writeInt8(--this.space, 0);
  }
};

/**
 * @param {number} value
 */
flatbuffers.Builder.prototype.writeInt8 = function (value) {
  this.bb.writeInt8((this.space -= 1), value);
};

/**
 * @param {number} value
 */
flatbuffers.Builder.prototype.writeInt16 = function (value) {
  this.bb.writeInt16((this.space -= 2), value);
};

/**
 * @param {number} value
 */
flatbuffers.Builder.prototype.writeInt32 = function (value) {
  this.bb.writeInt32((this.space -= 4), value);
};

/**
 * @param {flatbuffers.Long} value
 */
flatbuffers.Builder.prototype.writeInt64 = function (value) {
  this.bb.writeInt64((this.space -= 8), value);
};

/**
 * @param {number} value
 */
flatbuffers.Builder.prototype.writeFloat32 = function (value) {
  this.bb.writeFloat32((this.space -= 4), value);
};

/**
 * @param {number} value
 */
flatbuffers.Builder.prototype.writeFloat64 = function (value) {
  this.bb.writeFloat64((this.space -= 8), value);
};
/// @endcond

/**
 * Add an `int8` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `int8` to add the the buffer.
 */
flatbuffers.Builder.prototype.addInt8 = function (value) {
  this.prep(1, 0);
  this.writeInt8(value);
};

/**
 * Add an `int16` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `int16` to add the the buffer.
 */
flatbuffers.Builder.prototype.addInt16 = function (value) {
  this.prep(2, 0);
  this.writeInt16(value);
};

/**
 * Add an `int32` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `int32` to add the the buffer.
 */
flatbuffers.Builder.prototype.addInt32 = function (value) {
  this.prep(4, 0);
  this.writeInt32(value);
};

/**
 * Add an `int64` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {flatbuffers.Long} value The `int64` to add the the buffer.
 */
flatbuffers.Builder.prototype.addInt64 = function (value) {
  this.prep(8, 0);
  this.writeInt64(value);
};

/**
 * Add a `float32` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `float32` to add the the buffer.
 */
flatbuffers.Builder.prototype.addFloat32 = function (value) {
  this.prep(4, 0);
  this.writeFloat32(value);
};

/**
 * Add a `float64` to the buffer, properly aligned, and grows the buffer (if necessary).
 * @param {number} value The `float64` to add the the buffer.
 */
flatbuffers.Builder.prototype.addFloat64 = function (value) {
  this.prep(8, 0);
  this.writeFloat64(value);
};

/// @cond FLATBUFFERS_INTERNAL
/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */
flatbuffers.Builder.prototype.addFieldInt8 = function (
  voffset,
  value,
  defaultValue
) {
  if (this.force_defaults || value != defaultValue) {
    this.addInt8(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */
flatbuffers.Builder.prototype.addFieldInt16 = function (
  voffset,
  value,
  defaultValue
) {
  if (this.force_defaults || value != defaultValue) {
    this.addInt16(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */
flatbuffers.Builder.prototype.addFieldInt32 = function (
  voffset,
  value,
  defaultValue
) {
  if (this.force_defaults || value != defaultValue) {
    this.addInt32(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {flatbuffers.Long} value
 * @param {flatbuffers.Long} defaultValue
 */
flatbuffers.Builder.prototype.addFieldInt64 = function (
  voffset,
  value,
  defaultValue
) {
  if (this.force_defaults || !value.equals(defaultValue)) {
    this.addInt64(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */
flatbuffers.Builder.prototype.addFieldFloat32 = function (
  voffset,
  value,
  defaultValue
) {
  if (this.force_defaults || value != defaultValue) {
    this.addFloat32(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {number} value
 * @param {number} defaultValue
 */
flatbuffers.Builder.prototype.addFieldFloat64 = function (
  voffset,
  value,
  defaultValue
) {
  if (this.force_defaults || value != defaultValue) {
    this.addFloat64(value);
    this.slot(voffset);
  }
};

/**
 * @param {number} voffset
 * @param {flatbuffers.Offset} value
 * @param {flatbuffers.Offset} defaultValue
 */
flatbuffers.Builder.prototype.addFieldOffset = function (
  voffset,
  value,
  defaultValue
) {
  if (this.force_defaults || value != defaultValue) {
    this.addOffset(value);
    this.slot(voffset);
  }
};

/**
 * Structs are stored inline, so nothing additional is being added. `d` is always 0.
 *
 * @param {number} voffset
 * @param {flatbuffers.Offset} value
 * @param {flatbuffers.Offset} defaultValue
 */
flatbuffers.Builder.prototype.addFieldStruct = function (
  voffset,
  value,
  defaultValue
) {
  if (value != defaultValue) {
    this.nested(value);
    this.slot(voffset);
  }
};

/**
 * Structures are always stored inline, they need to be created right
 * where they're used.  You'll get this assertion failure if you
 * created it elsewhere.
 *
 * @param {flatbuffers.Offset} obj The offset of the created object
 */
flatbuffers.Builder.prototype.nested = function (obj) {
  if (obj != this.offset()) {
    throw new Error("FlatBuffers: struct must be serialized inline.");
  }
};

/**
 * Should not be creating any other object, string or vector
 * while an object is being constructed
 */
flatbuffers.Builder.prototype.notNested = function () {
  if (this.isNested) {
    throw new Error("FlatBuffers: object serialization must not be nested.");
  }
};

/**
 * Set the current vtable at `voffset` to the current location in the buffer.
 *
 * @param {number} voffset
 */
flatbuffers.Builder.prototype.slot = function (voffset) {
  this.vtable[voffset] = this.offset();
};

/**
 * @returns {flatbuffers.Offset} Offset relative to the end of the buffer.
 */
flatbuffers.Builder.prototype.offset = function () {
  return this.bb.capacity() - this.space;
};

/**
 * Doubles the size of the backing ByteBuffer and copies the old data towards
 * the end of the new buffer (since we build the buffer backwards).
 *
 * @param {flatbuffers.ByteBuffer} bb The current buffer with the existing data
 * @returns {!flatbuffers.ByteBuffer} A new byte buffer with the old data copied
 * to it. The data is located at the end of the buffer.
 *
 * uint8Array.set() formally takes {Array<number>|ArrayBufferView}, so to pass
 * it a uint8Array we need to suppress the type check:
 * @suppress {checkTypes}
 */
flatbuffers.Builder.growByteBuffer = function (bb) {
  var old_buf_size = bb.capacity();

  // Ensure we don't grow beyond what fits in an int.
  if (old_buf_size & 0xc0000000) {
    throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");
  }

  var new_buf_size = old_buf_size << 1;
  var nbb = flatbuffers.ByteBuffer.allocate(new_buf_size);
  nbb.setPosition(new_buf_size - old_buf_size);
  nbb.bytes().set(bb.bytes(), new_buf_size - old_buf_size);
  return nbb;
};
/// @endcond

/**
 * Adds on offset, relative to where it will be written.
 *
 * @param {flatbuffers.Offset} offset The offset to add.
 */
flatbuffers.Builder.prototype.addOffset = function (offset) {
  this.prep(flatbuffers.SIZEOF_INT, 0); // Ensure alignment is already done.
  this.writeInt32(this.offset() - offset + flatbuffers.SIZEOF_INT);
};

/// @cond FLATBUFFERS_INTERNAL
/**
 * Start encoding a new object in the buffer.  Users will not usually need to
 * call this directly. The FlatBuffers compiler will generate helper methods
 * that call this method internally.
 *
 * @param {number} numfields
 */
flatbuffers.Builder.prototype.startObject = function (numfields) {
  this.notNested();
  if (this.vtable == null) {
    this.vtable = [];
  }
  this.vtable_in_use = numfields;
  for (var i = 0; i < numfields; i++) {
    this.vtable[i] = 0; // This will push additional elements as needed
  }
  this.isNested = true;
  this.object_start = this.offset();
};

/**
 * Finish off writing the object that is under construction.
 *
 * @returns {flatbuffers.Offset} The offset to the object inside `dataBuffer`
 */
flatbuffers.Builder.prototype.endObject = function () {
  if (this.vtable == null || !this.isNested) {
    throw new Error("FlatBuffers: endObject called without startObject");
  }

  this.addInt32(0);
  var vtableloc = this.offset();

  // Trim trailing zeroes.
  var i = this.vtable_in_use - 1;
  for (; i >= 0 && this.vtable[i] == 0; i--) {}
  var trimmed_size = i + 1;

  // Write out the current vtable.
  for (; i >= 0; i--) {
    // Offset relative to the start of the table.
    this.addInt16(this.vtable[i] != 0 ? vtableloc - this.vtable[i] : 0);
  }

  var standard_fields = 2; // The fields below:
  this.addInt16(vtableloc - this.object_start);
  var len = (trimmed_size + standard_fields) * flatbuffers.SIZEOF_SHORT;
  this.addInt16(len);

  // Search for an existing vtable that matches the current one.
  var existing_vtable = 0;
  var vt1 = this.space;
  outer_loop: for (i = 0; i < this.vtables.length; i++) {
    var vt2 = this.bb.capacity() - this.vtables[i];
    if (len == this.bb.readInt16(vt2)) {
      for (
        var j = flatbuffers.SIZEOF_SHORT;
        j < len;
        j += flatbuffers.SIZEOF_SHORT
      ) {
        if (this.bb.readInt16(vt1 + j) != this.bb.readInt16(vt2 + j)) {
          continue outer_loop;
        }
      }
      existing_vtable = this.vtables[i];
      break;
    }
  }

  if (existing_vtable) {
    // Found a match:
    // Remove the current vtable.
    this.space = this.bb.capacity() - vtableloc;

    // Point table to existing vtable.
    this.bb.writeInt32(this.space, existing_vtable - vtableloc);
  } else {
    // No match:
    // Add the location of the current vtable to the list of vtables.
    this.vtables.push(this.offset());

    // Point table to current vtable.
    this.bb.writeInt32(
      this.bb.capacity() - vtableloc,
      this.offset() - vtableloc
    );
  }

  this.isNested = false;
  return vtableloc;
};
/// @endcond

/**
 * Finalize a buffer, poiting to the given `root_table`.
 *
 * @param {flatbuffers.Offset} root_table
 * @param {string=} opt_file_identifier
 * @param {boolean=} opt_size_prefix
 */
flatbuffers.Builder.prototype.finish = function (
  root_table,
  opt_file_identifier,
  opt_size_prefix
) {
  var size_prefix = opt_size_prefix ? flatbuffers.SIZE_PREFIX_LENGTH : 0;
  if (opt_file_identifier) {
    var file_identifier = opt_file_identifier;
    this.prep(
      this.minalign,
      flatbuffers.SIZEOF_INT + flatbuffers.FILE_IDENTIFIER_LENGTH + size_prefix
    );
    if (file_identifier.length != flatbuffers.FILE_IDENTIFIER_LENGTH) {
      throw new Error(
        "FlatBuffers: file identifier must be length " +
          flatbuffers.FILE_IDENTIFIER_LENGTH
      );
    }
    for (var i = flatbuffers.FILE_IDENTIFIER_LENGTH - 1; i >= 0; i--) {
      this.writeInt8(file_identifier.charCodeAt(i));
    }
  }
  this.prep(this.minalign, flatbuffers.SIZEOF_INT + size_prefix);
  this.addOffset(root_table);
  if (size_prefix) {
    this.addInt32(this.bb.capacity() - this.space);
  }
  this.bb.setPosition(this.space);
};

/**
 * Finalize a size prefixed buffer, pointing to the given `root_table`.
 *
 * @param {flatbuffers.Offset} root_table
 * @param {string=} opt_file_identifier
 */
flatbuffers.Builder.prototype.finishSizePrefixed = function (
  root_table,
  opt_file_identifier
) {
  this.finish(root_table, opt_file_identifier, true);
};

/// @cond FLATBUFFERS_INTERNAL
/**
 * This checks a required field has been set in a given table that has
 * just been constructed.
 *
 * @param {flatbuffers.Offset} table
 * @param {number} field
 */
flatbuffers.Builder.prototype.requiredField = function (table, field) {
  var table_start = this.bb.capacity() - table;
  var vtable_start = table_start - this.bb.readInt32(table_start);
  var ok = this.bb.readInt16(vtable_start + field) != 0;

  // If this fails, the caller will show what field needs to be set.
  if (!ok) {
    throw new Error("FlatBuffers: field " + field + " must be set");
  }
};

/**
 * Start a new array/vector of objects.  Users usually will not call
 * this directly. The FlatBuffers compiler will create a start/end
 * method for vector types in generated code.
 *
 * @param {number} elem_size The size of each element in the array
 * @param {number} num_elems The number of elements in the array
 * @param {number} alignment The alignment of the array
 */
flatbuffers.Builder.prototype.startVector = function (
  elem_size,
  num_elems,
  alignment
) {
  this.notNested();
  this.vector_num_elems = num_elems;
  this.prep(flatbuffers.SIZEOF_INT, elem_size * num_elems);
  this.prep(alignment, elem_size * num_elems); // Just in case alignment > int.
};

/**
 * Finish off the creation of an array and all its elements. The array must be
 * created with `startVector`.
 *
 * @returns {flatbuffers.Offset} The offset at which the newly created array
 * starts.
 */
flatbuffers.Builder.prototype.endVector = function () {
  this.writeInt32(this.vector_num_elems);
  return this.offset();
};
/// @endcond

/**
 * Encode the string `s` in the buffer using UTF-8. If the string passed has
 * already been seen, we return the offset of the already written string
 *
 * @param {string|Uint8Array} s The string to encode
 * @return {flatbuffers.Offset} The offset in the buffer where the encoded string starts
 */
flatbuffers.Builder.prototype.createSharedString = function (s) {
  if (!s) {
    return 0;
  }

  if (!this.string_maps) {
    this.string_maps = new Map();
  }

  if (this.string_maps.has(s)) {
    return this.string_maps.get(s);
  }
  let offset = this.createString(s);
  this.string_maps.set(s, offset);
  return offset;
};

/**
 * Encode the string `s` in the buffer using UTF-8. If a Uint8Array is passed
 * instead of a string, it is assumed to contain valid UTF-8 encoded data.
 *
 * @param {string|Uint8Array} s The string to encode
 * @return {flatbuffers.Offset} The offset in the buffer where the encoded string starts
 */
flatbuffers.Builder.prototype.createString = function (s) {
  if (!s) {
    return 0;
  }
  if (s instanceof Uint8Array) {
    var utf8 = s;
  } else {
    var utf8 = [];
    var i = 0;

    while (i < s.length) {
      var codePoint;

      // Decode UTF-16
      var a = s.charCodeAt(i++);
      if (a < 0xd800 || a >= 0xdc00) {
        codePoint = a;
      } else {
        var b = s.charCodeAt(i++);
        codePoint = (a << 10) + b + (0x10000 - (0xd800 << 10) - 0xdc00);
      }

      // Encode UTF-8
      if (codePoint < 0x80) {
        utf8.push(codePoint);
      } else {
        if (codePoint < 0x800) {
          utf8.push(((codePoint >> 6) & 0x1f) | 0xc0);
        } else {
          if (codePoint < 0x10000) {
            utf8.push(((codePoint >> 12) & 0x0f) | 0xe0);
          } else {
            utf8.push(
              ((codePoint >> 18) & 0x07) | 0xf0,
              ((codePoint >> 12) & 0x3f) | 0x80
            );
          }
          utf8.push(((codePoint >> 6) & 0x3f) | 0x80);
        }
        utf8.push((codePoint & 0x3f) | 0x80);
      }
    }
  }

  this.addInt8(0);
  this.startVector(1, utf8.length, 1);
  this.bb.setPosition((this.space -= utf8.length));
  for (
    var i = 0, offset = this.space, bytes = this.bb.bytes();
    i < utf8.length;
    i++
  ) {
    bytes[offset++] = utf8[i];
  }
  return this.endVector();
};

/**
 * A helper function to avoid generated code depending on this file directly.
 *
 * @param {number} low
 * @param {number} high
 * @returns {!flatbuffers.Long}
 */
flatbuffers.Builder.prototype.createLong = function (low, high) {
  return flatbuffers.Long.create(low, high);
};

/**
 * A helper function to pack an object
 *
 * @returns offset of obj
 */
flatbuffers.Builder.prototype.createObjectOffset = function (obj) {
  if (obj === null) {
    return 0;
  }

  if (typeof obj === "string") {
    return this.createString(obj);
  } else {
    return obj.pack(this);
  }
};

/**
 * A helper function to pack a list of object
 *
 * @returns list of offsets of each non null object
 */
flatbuffers.Builder.prototype.createObjectOffsetList = function (list) {
  let ret = [];

  for (let i = 0; i < list.length; ++i) {
    let val = list[i];

    if (val !== null) {
      ret.push(this.createObjectOffset(val));
    } else {
      throw new Error(
        "FlatBuffers: Argument for createObjectOffsetList cannot contain null."
      );
    }
  }

  return ret;
};

flatbuffers.Builder.prototype.createStructOffsetList = function (
  list,
  startFunc
) {
  startFunc(this, list.length);
  this.createObjectOffsetList(list);
  return this.endVector();
};

////////////////////////////////////////////////////////////////////////////////
/// @cond FLATBUFFERS_INTERNAL
/**
 * Create a new ByteBuffer with a given array of bytes (`Uint8Array`).
 *
 * @constructor
 * @param {Uint8Array} bytes
 */
flatbuffers.ByteBuffer = function (bytes) {
  /**
   * @type {Uint8Array}
   * @private
   */
  this.bytes_ = bytes;

  /**
   * @type {number}
   * @private
   */
  this.position_ = 0;
};

/**
 * Create and allocate a new ByteBuffer with a given size.
 *
 * @param {number} byte_size
 * @returns {!flatbuffers.ByteBuffer}
 */
flatbuffers.ByteBuffer.allocate = function (byte_size) {
  return new flatbuffers.ByteBuffer(new Uint8Array(byte_size));
};

flatbuffers.ByteBuffer.prototype.clear = function () {
  this.position_ = 0;
};

/**
 * Get the underlying `Uint8Array`.
 *
 * @returns {Uint8Array}
 */
flatbuffers.ByteBuffer.prototype.bytes = function () {
  return this.bytes_;
};

/**
 * Get the buffer's position.
 *
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.position = function () {
  return this.position_;
};

/**
 * Set the buffer's position.
 *
 * @param {number} position
 */
flatbuffers.ByteBuffer.prototype.setPosition = function (position) {
  this.position_ = position;
};

/**
 * Get the buffer's capacity.
 *
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.capacity = function () {
  return this.bytes_.length;
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readInt8 = function (offset) {
  return (this.readUint8(offset) << 24) >> 24;
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readUint8 = function (offset) {
  return this.bytes_[offset];
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readInt16 = function (offset) {
  return (this.readUint16(offset) << 16) >> 16;
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readUint16 = function (offset) {
  return this.bytes_[offset] | (this.bytes_[offset + 1] << 8);
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readInt32 = function (offset) {
  return (
    this.bytes_[offset] |
    (this.bytes_[offset + 1] << 8) |
    (this.bytes_[offset + 2] << 16) |
    (this.bytes_[offset + 3] << 24)
  );
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readUint32 = function (offset) {
  return this.readInt32(offset) >>> 0;
};

/**
 * @param {number} offset
 * @returns {!flatbuffers.Long}
 */
flatbuffers.ByteBuffer.prototype.readInt64 = function (offset) {
  return new flatbuffers.Long(
    this.readInt32(offset),
    this.readInt32(offset + 4)
  );
};

/**
 * @param {number} offset
 * @returns {!flatbuffers.Long}
 */
flatbuffers.ByteBuffer.prototype.readUint64 = function (offset) {
  return new flatbuffers.Long(
    this.readUint32(offset),
    this.readUint32(offset + 4)
  );
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readFloat32 = function (offset) {
  flatbuffers.int32[0] = this.readInt32(offset);
  return flatbuffers.float32[0];
};

/**
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.readFloat64 = function (offset) {
  flatbuffers.int32[flatbuffers.isLittleEndian ? 0 : 1] = this.readInt32(
    offset
  );
  flatbuffers.int32[flatbuffers.isLittleEndian ? 1 : 0] = this.readInt32(
    offset + 4
  );
  return flatbuffers.float64[0];
};

/**
 * @param {number} offset
 * @param {number|boolean} value
 */
flatbuffers.ByteBuffer.prototype.writeInt8 = function (offset, value) {
  this.bytes_[offset] = /** @type {number} */ (value);
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeUint8 = function (offset, value) {
  this.bytes_[offset] = value;
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeInt16 = function (offset, value) {
  this.bytes_[offset] = value;
  this.bytes_[offset + 1] = value >> 8;
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeUint16 = function (offset, value) {
  this.bytes_[offset] = value;
  this.bytes_[offset + 1] = value >> 8;
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeInt32 = function (offset, value) {
  this.bytes_[offset] = value;
  this.bytes_[offset + 1] = value >> 8;
  this.bytes_[offset + 2] = value >> 16;
  this.bytes_[offset + 3] = value >> 24;
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeUint32 = function (offset, value) {
  this.bytes_[offset] = value;
  this.bytes_[offset + 1] = value >> 8;
  this.bytes_[offset + 2] = value >> 16;
  this.bytes_[offset + 3] = value >> 24;
};

/**
 * @param {number} offset
 * @param {flatbuffers.Long} value
 */
flatbuffers.ByteBuffer.prototype.writeInt64 = function (offset, value) {
  this.writeInt32(offset, value.low);
  this.writeInt32(offset + 4, value.high);
};

/**
 * @param {number} offset
 * @param {flatbuffers.Long} value
 */
flatbuffers.ByteBuffer.prototype.writeUint64 = function (offset, value) {
  this.writeUint32(offset, value.low);
  this.writeUint32(offset + 4, value.high);
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeFloat32 = function (offset, value) {
  flatbuffers.float32[0] = value;
  this.writeInt32(offset, flatbuffers.int32[0]);
};

/**
 * @param {number} offset
 * @param {number} value
 */
flatbuffers.ByteBuffer.prototype.writeFloat64 = function (offset, value) {
  flatbuffers.float64[0] = value;
  this.writeInt32(
    offset,
    flatbuffers.int32[flatbuffers.isLittleEndian ? 0 : 1]
  );
  this.writeInt32(
    offset + 4,
    flatbuffers.int32[flatbuffers.isLittleEndian ? 1 : 0]
  );
};

/**
 * Return the file identifier.   Behavior is undefined for FlatBuffers whose
 * schema does not include a file_identifier (likely points at padding or the
 * start of a the root vtable).
 * @returns {string}
 */
flatbuffers.ByteBuffer.prototype.getBufferIdentifier = function () {
  if (
    this.bytes_.length <
    this.position_ + flatbuffers.SIZEOF_INT + flatbuffers.FILE_IDENTIFIER_LENGTH
  ) {
    throw new Error(
      "FlatBuffers: ByteBuffer is too short to contain an identifier."
    );
  }
  var result = "";
  for (var i = 0; i < flatbuffers.FILE_IDENTIFIER_LENGTH; i++) {
    result += String.fromCharCode(
      this.readInt8(this.position_ + flatbuffers.SIZEOF_INT + i)
    );
  }
  return result;
};

/**
 * Look up a field in the vtable, return an offset into the object, or 0 if the
 * field is not present.
 *
 * @param {number} bb_pos
 * @param {number} vtable_offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.__offset = function (bb_pos, vtable_offset) {
  var vtable = bb_pos - this.readInt32(bb_pos);
  return vtable_offset < this.readInt16(vtable)
    ? this.readInt16(vtable + vtable_offset)
    : 0;
};

/**
 * Initialize any Table-derived type to point to the union at the given offset.
 *
 * @param {flatbuffers.Table} t
 * @param {number} offset
 * @returns {flatbuffers.Table}
 */
flatbuffers.ByteBuffer.prototype.__union = function (t, offset) {
  t.bb_pos = offset + this.readInt32(offset);
  t.bb = this;
  return t;
};

/**
 * Create a JavaScript string from UTF-8 data stored inside the FlatBuffer.
 * This allocates a new string and converts to wide chars upon each access.
 *
 * To avoid the conversion to UTF-16, pass flatbuffers.Encoding.UTF8_BYTES as
 * the "optionalEncoding" argument. This is useful for avoiding conversion to
 * and from UTF-16 when the data will just be packaged back up in another
 * FlatBuffer later on.
 *
 * @param {number} offset
 * @param {flatbuffers.Encoding=} opt_encoding Defaults to UTF16_STRING
 * @returns {string|!Uint8Array}
 */
flatbuffers.ByteBuffer.prototype.__string = function (offset, opt_encoding) {
  offset += this.readInt32(offset);

  var length = this.readInt32(offset);
  var result = "";
  var i = 0;

  offset += flatbuffers.SIZEOF_INT;

  if (opt_encoding === flatbuffers.Encoding.UTF8_BYTES) {
    return this.bytes_.subarray(offset, offset + length);
  }

  while (i < length) {
    var codePoint;

    // Decode UTF-8
    var a = this.readUint8(offset + i++);
    if (a < 0xc0) {
      codePoint = a;
    } else {
      var b = this.readUint8(offset + i++);
      if (a < 0xe0) {
        codePoint = ((a & 0x1f) << 6) | (b & 0x3f);
      } else {
        var c = this.readUint8(offset + i++);
        if (a < 0xf0) {
          codePoint = ((a & 0x0f) << 12) | ((b & 0x3f) << 6) | (c & 0x3f);
        } else {
          var d = this.readUint8(offset + i++);
          codePoint =
            ((a & 0x07) << 18) |
            ((b & 0x3f) << 12) |
            ((c & 0x3f) << 6) |
            (d & 0x3f);
        }
      }
    }

    // Encode UTF-16
    if (codePoint < 0x10000) {
      result += String.fromCharCode(codePoint);
    } else {
      codePoint -= 0x10000;
      result += String.fromCharCode(
        (codePoint >> 10) + 0xd800,
        (codePoint & ((1 << 10) - 1)) + 0xdc00
      );
    }
  }

  return result;
};

/**
 * Handle unions that can contain string as its member, if a Table-derived type then initialize it,
 * if a string then return a new one
 *
 * WARNING: strings are immutable in JS so we can't change the string that the user gave us, this
 * makes the behaviour of __union_with_string different compared to __union
 *
 * @param {flatbuffers.Table|string} o
 * @param {number} offset
 * @returns {flatbuffers.Table|string}
 */
flatbuffers.ByteBuffer.prototype.__union_with_string = function (o, offset) {
  if (typeof o === "string") {
    return this.__string(offset);
  }
  return this.__union(o, offset);
};

/**
 * Retrieve the relative offset stored at "offset"
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.__indirect = function (offset) {
  return offset + this.readInt32(offset);
};

/**
 * Get the start of data of a vector whose offset is stored at "offset" in this object.
 *
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.__vector = function (offset) {
  return offset + this.readInt32(offset) + flatbuffers.SIZEOF_INT; // data starts after the length
};

/**
 * Get the length of a vector whose offset is stored at "offset" in this object.
 *
 * @param {number} offset
 * @returns {number}
 */
flatbuffers.ByteBuffer.prototype.__vector_len = function (offset) {
  return this.readInt32(offset + this.readInt32(offset));
};

/**
 * @param {string} ident
 * @returns {boolean}
 */
flatbuffers.ByteBuffer.prototype.__has_identifier = function (ident) {
  if (ident.length != flatbuffers.FILE_IDENTIFIER_LENGTH) {
    throw new Error(
      "FlatBuffers: file identifier must be length " +
        flatbuffers.FILE_IDENTIFIER_LENGTH
    );
  }
  for (var i = 0; i < flatbuffers.FILE_IDENTIFIER_LENGTH; i++) {
    if (
      ident.charCodeAt(i) !=
      this.readInt8(this.position_ + flatbuffers.SIZEOF_INT + i)
    ) {
      return false;
    }
  }
  return true;
};

/**
 * A helper function to avoid generated code depending on this file directly.
 *
 * @param {number} low
 * @param {number} high
 * @returns {!flatbuffers.Long}
 */
flatbuffers.ByteBuffer.prototype.createLong = function (low, high) {
  return flatbuffers.Long.create(low, high);
};

/**
 * A helper function for generating list for obj api
 * @param listAccessor function that accepts an index and return data at that index
 * @param {number} listLength
 * @returns {any[]}
 */
flatbuffers.ByteBuffer.prototype.createScalarList = function (
  listAccessor,
  listLength
) {
  let ret = [];
  for (let i = 0; i < listLength; ++i) {
    if (listAccessor(i) !== null) {
      ret.push(listAccessor(i));
    }
  }

  return ret;
};

/**
 * This function is here only to get around typescript type system
 */
flatbuffers.ByteBuffer.prototype.createStringList = function (
  listAccessor,
  listLength
) {
  return this.createScalarList(listAccessor, listLength);
};

/**
 * A helper function for generating list for obj api
 * @param listAccessor function that accepts an index and return data at that index
 * @param listLength {number} listLength
 * @param res any[] result list
 */
flatbuffers.ByteBuffer.prototype.createObjList = function (
  listAccessor,
  listLength
) {
  let ret = [];
  for (let i = 0; i < listLength; ++i) {
    let val = listAccessor(i);
    if (val !== null) {
      ret.push(val.unpack());
    }
  }

  return ret;
};
/// @endcond
/// @}

function required(a) {
  console.log(this.name);
  throw new Error(`Missing parameter: ${a}`);
}

var schema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  definitions: {
    referenceFrame: {
      type: "string",
      enum: [
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
        "TOD",
      ],
    },
    ephemerisType: {
      type: "string",
      enum: ["SGP", "SGP4", "SDP4", "SGP8", "SDP8"],
    },
    timeSystem: {
      type: "string",
      enum: [
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
        "UTC",
      ],
    },
    meanElementTheory: {
      type: "string",
      enum: ["SGP4", "DSST", "USM"],
    },
    manCovRefFrame: {
      type: "string",
      enum: ["RSW", "RTN", "TNW"],
    },
    OMM: {
      type: "object",
      properties: {
        CCSDS_OMM_VERS: {
          type: "number",
        },
        CREATION_DATE: {
          type: "string",
        },
        ORIGINATOR: {
          type: "string",
        },
        OBJECT_NAME: {
          type: "string",
        },
        OBJECT_ID: {
          type: "string",
        },
        CENTER_NAME: {
          type: "string",
        },
        REF_FRAME: {
          $ref: "#/definitions/referenceFrame",
        },
        REF_FRAME_EPOCH: {
          type: "string",
        },
        TIME_SYSTEM: {
          $ref: "#/definitions/timeSystem",
        },
        MEAN_ELEMENT_THEORY: {
          $ref: "#/definitions/meanElementTheory",
        },
        COMMENT: {
          type: "string",
        },
        EPOCH: {
          type: "string",
        },
        SEMI_MAJOR_AXIS: {
          type: "number",
        },
        MEAN_MOTION: {
          type: "number",
        },
        ECCENTRICITY: {
          type: "number",
        },
        INCLINATION: {
          type: "number",
        },
        RA_OF_ASC_NODE: {
          type: "number",
        },
        ARG_OF_PERICENTER: {
          type: "number",
        },
        MEAN_ANOMALY: {
          type: "number",
        },
        GM: {
          type: "number",
        },
        MASS: {
          type: "number",
        },
        SOLAR_RAD_AREA: {
          type: "number",
        },
        SOLAR_RAD_COEFF: {
          type: "number",
        },
        DRAG_AREA: {
          type: "number",
        },
        DRAG_COEFF: {
          type: "number",
        },
        EPHEMERIS_TYPE: {
          $ref: "#/definitions/ephemerisType",
        },
        CLASSIFICATION_TYPE: {
          type: "string",
        },
        NORAD_CAT_ID: {
          type: "number",
        },
        ELEMENT_SET_NO: {
          type: "number",
        },
        REV_AT_EPOCH: {
          type: "number",
        },
        BSTAR: {
          type: "number",
        },
        MEAN_MOTION_DOT: {
          type: "number",
        },
        MEAN_MOTION_DDOT: {
          type: "number",
        },
        COV_REF_FRAME: {
          $ref: "#/definitions/manCovRefFrame",
        },
        CX_X: {
          type: "number",
        },
        CY_X: {
          type: "number",
        },
        CY_Y: {
          type: "number",
        },
        CZ_X: {
          type: "number",
        },
        CZ_Y: {
          type: "number",
        },
        CZ_Z: {
          type: "number",
        },
        CX_DOT_X: {
          type: "number",
        },
        CX_DOT_Y: {
          type: "number",
        },
        CX_DOT_Z: {
          type: "number",
        },
        CX_DOT_X_DOT: {
          type: "number",
        },
        CY_DOT_X: {
          type: "number",
        },
        CY_DOT_Y: {
          type: "number",
        },
        CY_DOT_Z: {
          type: "number",
        },
        CY_DOT_X_DOT: {
          type: "number",
        },
        CY_DOT_Y_DOT: {
          type: "number",
        },
        CZ_DOT_X: {
          type: "number",
        },
        CZ_DOT_Y: {
          type: "number",
        },
        CZ_DOT_Z: {
          type: "number",
        },
        CZ_DOT_X_DOT: {
          type: "number",
        },
        CZ_DOT_Y_DOT: {
          type: "number",
        },
        CZ_DOT_Z_DOT: {
          type: "number",
        },
        USER_DEFINED_BIP_0044_TYPE: {
          type: "number",
        },
        USER_DEFINED_OBJECT_DESIGNATOR: {
          type: "string",
        },
        USER_DEFINED_EARTH_MODEL: {
          type: "string",
        },
        USER_DEFINED_EPOCH_TIMESTAMP: {
          type: "number",
        },
        USER_DEFINED_MICROSECONDS: {
          type: "number",
        },
      },
      additionalProperties: false,
    },
    MPE: {
      type: "object",
      properties: {
        MEAN_MOTION: {
          type: "number",
        },
        ECCENTRICITY: {
          type: "number",
        },
        INCLINATION: {
          type: "number",
        },
        RA_OF_ASC_NODE: {
          type: "number",
        },
        MEAN_ANOMALY: {
          type: "number",
        },
        NORAD_CAT_ID: {
          type: "number",
        },
        BSTAR: {
          type: "number",
        },
        USER_DEFINED_EPOCH_TIMESTAMP: {
          type: "number",
        },
      },
      additionalProperties: false,
    },
    OMMCOLLECTION: {
      type: "object",
      properties: {
        RECORDS: {
          type: "array",
          items: { $ref: "#/definitions/OMM" },
        },
      },
      additionalProperties: false,
    },
    MPECOLLECTION: {
      type: "object",
      properties: {
        RECORDS: {
          type: "array",
          items: { $ref: "#/definitions/MPE" },
        },
      },
      additionalProperties: false,
    },
  },
  $ref: "#/definitions/OMM",
};

// automatically generated by the FlatBuffers compiler, do not modify
/**
 * @enum {number}
 */
var referenceFrame = {
  /**
   * Earth Mean Equator and Equinox of J2000
   */
  EME2000: 0,

  /**
   *  Geocentric Celestial Reference Frame
   */
  GCRF: 1,

  /**
   * Greenwich Rotating Coordinates
   */
  GRC: 2,

  /**
   * International Celestial Reference Frame
   */
  ICRF: 3,

  /**
   * International Terrestrial Reference Frame 2000
   */
  ITRF2000: 4,

  /**
   * International Terrestrial Reference Frame 1993
   */
  ITRF93: 5,

  /**
   * International Terrestrial Reference Frame 1997
   */
  ITRF97: 6,

  /**
   * Mars Centered Inertial
   */
  MCI: 7,

  /**
   * True of Date, Rotating
   */
  TDR: 8,

  /**
   * True Equator Mean Equinox
   */
  TEME: 9,

  /**
   * True of Date
   */
  TOD: 10,
};

/**
 * @enum {number}
 */
var ephemerisType = {
  /**
   * Simplified General Perturbation Model
   */
  SGP: 0,

  /**
   * Simplified General Perturbation Model  4
   */
  SGP4: 1,

  /**
   * Simplified Deep Space Perturbation Model 4
   */
  SDP4: 2,

  /**
   * Simplified General Perturbation Model 8
   */
  SGP8: 3,

  /**
   * Simplified Deep Space Perturbation Model 8
   */
  SDP8: 4,
};

/**
 * @enum {number}
 */
var timeSystem = {
  /**
   * Greenwich Mean Sidereal Time
   */
  GMST: 0,

  /**
   * Global Positioning System
   */
  GPS: 1,

  /**
   * Mission Elapsed Time
   */
  MET: 2,

  /**
   * Mission Relative Time
   */
  MRT: 3,

  /**
   * Spacecraft Clock (receiver) (requires rules for interpretation in ICD)
   */
  SCLK: 4,

  /**
   * International Atomic Time
   */
  TAI: 5,

  /**
   * Barycentric Coordinate Time
   */
  TCB: 6,

  /**
   * Barycentric Dynamical Time
   */
  TDB: 7,

  /**
   * Geocentric Coordinate Time
   */
  TCG: 8,

  /**
   * Terrestrial Time
   */
  TT: 9,

  /**
   * Universal Time
   */
  UT1: 10,

  /**
   * Coordinated Universal Time
   */
  UTC: 11,
};

/**
 * @enum {number}
 */
var meanElementTheory = {
  /**
   * Simplified General Perturbation Model  4
   */
  SGP4: 0,

  /**
   * Draper Semi-analytical Satellite Theory
   */
  DSST: 1,

  /**
   * Universal Semianalytical Method
   */
  USM: 2,
};

/**
 * @enum {number}
 */
var manCovRefFrame = {
  RSW: 0,
  RTN: 1,
  TNW: 2,
};

/**
 * @constructor
 */
function OMM() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
}

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {OMM}
 */
OMM.prototype.__init = function (i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {OMM=} obj
 * @returns {OMM}
 */
OMM.getRootAsOMM = function (bb, obj) {
  return (obj || new OMM()).__init(
    bb.readInt32(bb.position()) + bb.position(),
    bb
  );
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {OMM=} obj
 * @returns {OMM}
 */
OMM.getSizePrefixedRootAsOMM = function (bb, obj) {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new OMM()).__init(
    bb.readInt32(bb.position()) + bb.position(),
    bb
  );
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {boolean}
 */
OMM.bufferHasIdentifier = function (bb) {
  return bb.__has_identifier("$OMM");
};

/**
 * @returns {number}
 */
OMM.prototype.CCSDS_OMM_VERS = function () {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CCSDS_OMM_VERS = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 4);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
OMM.prototype.CREATION_DATE = function (optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset
    ? this.bb.__string(this.bb_pos + offset, optionalEncoding)
    : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
OMM.prototype.ORIGINATOR = function (optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset
    ? this.bb.__string(this.bb_pos + offset, optionalEncoding)
    : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
OMM.prototype.OBJECT_NAME = function (optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset
    ? this.bb.__string(this.bb_pos + offset, optionalEncoding)
    : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
OMM.prototype.OBJECT_ID = function (optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset
    ? this.bb.__string(this.bb_pos + offset, optionalEncoding)
    : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
OMM.prototype.CENTER_NAME = function (optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 14);
  return offset
    ? this.bb.__string(this.bb_pos + offset, optionalEncoding)
    : null;
};

/**
 * @returns {referenceFrame}
 */
OMM.prototype.REF_FRAME = function () {
  var offset = this.bb.__offset(this.bb_pos, 16);
  return offset
    ? /** @type {referenceFrame} */ (this.bb.readInt8(this.bb_pos + offset))
    : referenceFrame.TEME;
};

/**
 * @param {referenceFrame} value
 * @returns {boolean}
 */
OMM.prototype.mutate_REF_FRAME = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 16);

  if (offset === 0) {
    return false;
  }

  this.bb.writeInt8(this.bb_pos + offset, value);
  return true;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
OMM.prototype.REF_FRAME_EPOCH = function (optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 18);
  return offset
    ? this.bb.__string(this.bb_pos + offset, optionalEncoding)
    : null;
};

/**
 * @returns {timeSystem}
 */
OMM.prototype.TIME_SYSTEM = function () {
  var offset = this.bb.__offset(this.bb_pos, 20);
  return offset
    ? /** @type {timeSystem} */ (this.bb.readInt8(this.bb_pos + offset))
    : timeSystem.UTC;
};

/**
 * @param {timeSystem} value
 * @returns {boolean}
 */
OMM.prototype.mutate_TIME_SYSTEM = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 20);

  if (offset === 0) {
    return false;
  }

  this.bb.writeInt8(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {meanElementTheory}
 */
OMM.prototype.MEAN_ELEMENT_THEORY = function () {
  var offset = this.bb.__offset(this.bb_pos, 22);
  return offset
    ? /** @type {meanElementTheory} */ (this.bb.readInt8(this.bb_pos + offset))
    : meanElementTheory.SGP4;
};

/**
 * @param {meanElementTheory} value
 * @returns {boolean}
 */
OMM.prototype.mutate_MEAN_ELEMENT_THEORY = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 22);

  if (offset === 0) {
    return false;
  }

  this.bb.writeInt8(this.bb_pos + offset, value);
  return true;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
OMM.prototype.COMMENT = function (optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 24);
  return offset
    ? this.bb.__string(this.bb_pos + offset, optionalEncoding)
    : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
OMM.prototype.EPOCH = function (optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 26);
  return offset
    ? this.bb.__string(this.bb_pos + offset, optionalEncoding)
    : null;
};

/**
 * @returns {number}
 */
OMM.prototype.SEMI_MAJOR_AXIS = function () {
  var offset = this.bb.__offset(this.bb_pos, 28);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_SEMI_MAJOR_AXIS = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 28);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.MEAN_MOTION = function () {
  var offset = this.bb.__offset(this.bb_pos, 30);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_MEAN_MOTION = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 30);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.ECCENTRICITY = function () {
  var offset = this.bb.__offset(this.bb_pos, 32);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_ECCENTRICITY = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 32);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.INCLINATION = function () {
  var offset = this.bb.__offset(this.bb_pos, 34);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_INCLINATION = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 34);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.RA_OF_ASC_NODE = function () {
  var offset = this.bb.__offset(this.bb_pos, 36);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_RA_OF_ASC_NODE = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 36);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.ARG_OF_PERICENTER = function () {
  var offset = this.bb.__offset(this.bb_pos, 38);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_ARG_OF_PERICENTER = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 38);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.MEAN_ANOMALY = function () {
  var offset = this.bb.__offset(this.bb_pos, 40);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_MEAN_ANOMALY = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 40);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.GM = function () {
  var offset = this.bb.__offset(this.bb_pos, 42);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_GM = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 42);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.MASS = function () {
  var offset = this.bb.__offset(this.bb_pos, 44);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_MASS = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 44);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.SOLAR_RAD_AREA = function () {
  var offset = this.bb.__offset(this.bb_pos, 46);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_SOLAR_RAD_AREA = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 46);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.SOLAR_RAD_COEFF = function () {
  var offset = this.bb.__offset(this.bb_pos, 48);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_SOLAR_RAD_COEFF = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 48);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.DRAG_AREA = function () {
  var offset = this.bb.__offset(this.bb_pos, 50);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_DRAG_AREA = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 50);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.DRAG_COEFF = function () {
  var offset = this.bb.__offset(this.bb_pos, 52);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_DRAG_COEFF = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 52);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {ephemerisType}
 */
OMM.prototype.EPHEMERIS_TYPE = function () {
  var offset = this.bb.__offset(this.bb_pos, 54);
  return offset
    ? /** @type {ephemerisType} */ (this.bb.readInt8(this.bb_pos + offset))
    : ephemerisType.SGP4;
};

/**
 * @param {ephemerisType} value
 * @returns {boolean}
 */
OMM.prototype.mutate_EPHEMERIS_TYPE = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 54);

  if (offset === 0) {
    return false;
  }

  this.bb.writeInt8(this.bb_pos + offset, value);
  return true;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
OMM.prototype.CLASSIFICATION_TYPE = function (optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 56);
  return offset
    ? this.bb.__string(this.bb_pos + offset, optionalEncoding)
    : null;
};

/**
 * @returns {number}
 */
OMM.prototype.NORAD_CAT_ID = function () {
  var offset = this.bb.__offset(this.bb_pos, 58);
  return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_NORAD_CAT_ID = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 58);

  if (offset === 0) {
    return false;
  }

  this.bb.writeUint32(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.ELEMENT_SET_NO = function () {
  var offset = this.bb.__offset(this.bb_pos, 60);
  return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_ELEMENT_SET_NO = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 60);

  if (offset === 0) {
    return false;
  }

  this.bb.writeUint32(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.REV_AT_EPOCH = function () {
  var offset = this.bb.__offset(this.bb_pos, 62);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_REV_AT_EPOCH = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 62);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.BSTAR = function () {
  var offset = this.bb.__offset(this.bb_pos, 64);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_BSTAR = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 64);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.MEAN_MOTION_DOT = function () {
  var offset = this.bb.__offset(this.bb_pos, 66);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_MEAN_MOTION_DOT = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 66);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.MEAN_MOTION_DDOT = function () {
  var offset = this.bb.__offset(this.bb_pos, 68);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_MEAN_MOTION_DDOT = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 68);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {manCovRefFrame}
 */
OMM.prototype.COV_REF_FRAME = function () {
  var offset = this.bb.__offset(this.bb_pos, 70);
  return offset
    ? /** @type {manCovRefFrame} */ (this.bb.readInt8(this.bb_pos + offset))
    : manCovRefFrame.RSW;
};

/**
 * @param {manCovRefFrame} value
 * @returns {boolean}
 */
OMM.prototype.mutate_COV_REF_FRAME = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 70);

  if (offset === 0) {
    return false;
  }

  this.bb.writeInt8(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CX_X = function () {
  var offset = this.bb.__offset(this.bb_pos, 72);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CX_X = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 72);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CY_X = function () {
  var offset = this.bb.__offset(this.bb_pos, 74);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CY_X = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 74);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CY_Y = function () {
  var offset = this.bb.__offset(this.bb_pos, 76);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CY_Y = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 76);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CZ_X = function () {
  var offset = this.bb.__offset(this.bb_pos, 78);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CZ_X = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 78);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CZ_Y = function () {
  var offset = this.bb.__offset(this.bb_pos, 80);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CZ_Y = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 80);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CZ_Z = function () {
  var offset = this.bb.__offset(this.bb_pos, 82);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CZ_Z = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 82);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CX_DOT_X = function () {
  var offset = this.bb.__offset(this.bb_pos, 84);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CX_DOT_X = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 84);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CX_DOT_Y = function () {
  var offset = this.bb.__offset(this.bb_pos, 86);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CX_DOT_Y = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 86);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CX_DOT_Z = function () {
  var offset = this.bb.__offset(this.bb_pos, 88);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CX_DOT_Z = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 88);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CX_DOT_X_DOT = function () {
  var offset = this.bb.__offset(this.bb_pos, 90);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CX_DOT_X_DOT = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 90);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CY_DOT_X = function () {
  var offset = this.bb.__offset(this.bb_pos, 92);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CY_DOT_X = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 92);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CY_DOT_Y = function () {
  var offset = this.bb.__offset(this.bb_pos, 94);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CY_DOT_Y = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 94);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CY_DOT_Z = function () {
  var offset = this.bb.__offset(this.bb_pos, 96);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CY_DOT_Z = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 96);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CY_DOT_X_DOT = function () {
  var offset = this.bb.__offset(this.bb_pos, 98);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CY_DOT_X_DOT = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 98);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CY_DOT_Y_DOT = function () {
  var offset = this.bb.__offset(this.bb_pos, 100);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CY_DOT_Y_DOT = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 100);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CZ_DOT_X = function () {
  var offset = this.bb.__offset(this.bb_pos, 102);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CZ_DOT_X = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 102);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CZ_DOT_Y = function () {
  var offset = this.bb.__offset(this.bb_pos, 104);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CZ_DOT_Y = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 104);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CZ_DOT_Z = function () {
  var offset = this.bb.__offset(this.bb_pos, 106);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CZ_DOT_Z = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 106);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CZ_DOT_X_DOT = function () {
  var offset = this.bb.__offset(this.bb_pos, 108);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CZ_DOT_X_DOT = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 108);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CZ_DOT_Y_DOT = function () {
  var offset = this.bb.__offset(this.bb_pos, 110);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CZ_DOT_Y_DOT = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 110);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.CZ_DOT_Z_DOT = function () {
  var offset = this.bb.__offset(this.bb_pos, 112);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_CZ_DOT_Z_DOT = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 112);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.USER_DEFINED_BIP_0044_TYPE = function () {
  var offset = this.bb.__offset(this.bb_pos, 114);
  return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_USER_DEFINED_BIP_0044_TYPE = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 114);

  if (offset === 0) {
    return false;
  }

  this.bb.writeUint32(this.bb_pos + offset, value);
  return true;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
OMM.prototype.USER_DEFINED_OBJECT_DESIGNATOR = function (optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 116);
  return offset
    ? this.bb.__string(this.bb_pos + offset, optionalEncoding)
    : null;
};

/**
 * @param {flatbuffers.Encoding=} optionalEncoding
 * @returns {string|Uint8Array|null}
 */
OMM.prototype.USER_DEFINED_EARTH_MODEL = function (optionalEncoding) {
  var offset = this.bb.__offset(this.bb_pos, 118);
  return offset
    ? this.bb.__string(this.bb_pos + offset, optionalEncoding)
    : null;
};

/**
 * @returns {number}
 */
OMM.prototype.USER_DEFINED_EPOCH_TIMESTAMP = function () {
  var offset = this.bb.__offset(this.bb_pos, 120);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_USER_DEFINED_EPOCH_TIMESTAMP = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 120);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
OMM.prototype.USER_DEFINED_MICROSECONDS = function () {
  var offset = this.bb.__offset(this.bb_pos, 122);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
OMM.prototype.mutate_USER_DEFINED_MICROSECONDS = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 122);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @param {flatbuffers.Builder} builder
 */
OMM.startOMM = function (builder) {
  builder.startObject(60);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CCSDS_OMM_VERS
 */
OMM.addCCSDS_OMM_VERS = function (builder, CCSDS_OMM_VERS) {
  builder.addFieldFloat64(0, CCSDS_OMM_VERS, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} CREATION_DATEOffset
 */
OMM.addCREATION_DATE = function (builder, CREATION_DATEOffset) {
  builder.addFieldOffset(1, CREATION_DATEOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} ORIGINATOROffset
 */
OMM.addORIGINATOR = function (builder, ORIGINATOROffset) {
  builder.addFieldOffset(2, ORIGINATOROffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} OBJECT_NAMEOffset
 */
OMM.addOBJECT_NAME = function (builder, OBJECT_NAMEOffset) {
  builder.addFieldOffset(3, OBJECT_NAMEOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} OBJECT_IDOffset
 */
OMM.addOBJECT_ID = function (builder, OBJECT_IDOffset) {
  builder.addFieldOffset(4, OBJECT_IDOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} CENTER_NAMEOffset
 */
OMM.addCENTER_NAME = function (builder, CENTER_NAMEOffset) {
  builder.addFieldOffset(5, CENTER_NAMEOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {referenceFrame} REF_FRAME
 */
OMM.addREF_FRAME = function (builder, REF_FRAME) {
  builder.addFieldInt8(6, REF_FRAME, referenceFrame.TEME);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} REF_FRAME_EPOCHOffset
 */
OMM.addREF_FRAME_EPOCH = function (builder, REF_FRAME_EPOCHOffset) {
  builder.addFieldOffset(7, REF_FRAME_EPOCHOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {timeSystem} TIME_SYSTEM
 */
OMM.addTIME_SYSTEM = function (builder, TIME_SYSTEM) {
  builder.addFieldInt8(8, TIME_SYSTEM, timeSystem.UTC);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {meanElementTheory} MEAN_ELEMENT_THEORY
 */
OMM.addMEAN_ELEMENT_THEORY = function (builder, MEAN_ELEMENT_THEORY) {
  builder.addFieldInt8(9, MEAN_ELEMENT_THEORY, meanElementTheory.SGP4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} COMMENTOffset
 */
OMM.addCOMMENT = function (builder, COMMENTOffset) {
  builder.addFieldOffset(10, COMMENTOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} EPOCHOffset
 */
OMM.addEPOCH = function (builder, EPOCHOffset) {
  builder.addFieldOffset(11, EPOCHOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} SEMI_MAJOR_AXIS
 */
OMM.addSEMI_MAJOR_AXIS = function (builder, SEMI_MAJOR_AXIS) {
  builder.addFieldFloat64(12, SEMI_MAJOR_AXIS, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} MEAN_MOTION
 */
OMM.addMEAN_MOTION = function (builder, MEAN_MOTION) {
  builder.addFieldFloat64(13, MEAN_MOTION, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} ECCENTRICITY
 */
OMM.addECCENTRICITY = function (builder, ECCENTRICITY) {
  builder.addFieldFloat64(14, ECCENTRICITY, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} INCLINATION
 */
OMM.addINCLINATION = function (builder, INCLINATION) {
  builder.addFieldFloat64(15, INCLINATION, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} RA_OF_ASC_NODE
 */
OMM.addRA_OF_ASC_NODE = function (builder, RA_OF_ASC_NODE) {
  builder.addFieldFloat64(16, RA_OF_ASC_NODE, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} ARG_OF_PERICENTER
 */
OMM.addARG_OF_PERICENTER = function (builder, ARG_OF_PERICENTER) {
  builder.addFieldFloat64(17, ARG_OF_PERICENTER, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} MEAN_ANOMALY
 */
OMM.addMEAN_ANOMALY = function (builder, MEAN_ANOMALY) {
  builder.addFieldFloat64(18, MEAN_ANOMALY, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} GM
 */
OMM.addGM = function (builder, GM) {
  builder.addFieldFloat64(19, GM, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} MASS
 */
OMM.addMASS = function (builder, MASS) {
  builder.addFieldFloat64(20, MASS, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} SOLAR_RAD_AREA
 */
OMM.addSOLAR_RAD_AREA = function (builder, SOLAR_RAD_AREA) {
  builder.addFieldFloat64(21, SOLAR_RAD_AREA, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} SOLAR_RAD_COEFF
 */
OMM.addSOLAR_RAD_COEFF = function (builder, SOLAR_RAD_COEFF) {
  builder.addFieldFloat64(22, SOLAR_RAD_COEFF, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} DRAG_AREA
 */
OMM.addDRAG_AREA = function (builder, DRAG_AREA) {
  builder.addFieldFloat64(23, DRAG_AREA, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} DRAG_COEFF
 */
OMM.addDRAG_COEFF = function (builder, DRAG_COEFF) {
  builder.addFieldFloat64(24, DRAG_COEFF, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {ephemerisType} EPHEMERIS_TYPE
 */
OMM.addEPHEMERIS_TYPE = function (builder, EPHEMERIS_TYPE) {
  builder.addFieldInt8(25, EPHEMERIS_TYPE, ephemerisType.SGP4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} CLASSIFICATION_TYPEOffset
 */
OMM.addCLASSIFICATION_TYPE = function (builder, CLASSIFICATION_TYPEOffset) {
  builder.addFieldOffset(26, CLASSIFICATION_TYPEOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} NORAD_CAT_ID
 */
OMM.addNORAD_CAT_ID = function (builder, NORAD_CAT_ID) {
  builder.addFieldInt32(27, NORAD_CAT_ID, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} ELEMENT_SET_NO
 */
OMM.addELEMENT_SET_NO = function (builder, ELEMENT_SET_NO) {
  builder.addFieldInt32(28, ELEMENT_SET_NO, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} REV_AT_EPOCH
 */
OMM.addREV_AT_EPOCH = function (builder, REV_AT_EPOCH) {
  builder.addFieldFloat64(29, REV_AT_EPOCH, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} BSTAR
 */
OMM.addBSTAR = function (builder, BSTAR) {
  builder.addFieldFloat64(30, BSTAR, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} MEAN_MOTION_DOT
 */
OMM.addMEAN_MOTION_DOT = function (builder, MEAN_MOTION_DOT) {
  builder.addFieldFloat64(31, MEAN_MOTION_DOT, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} MEAN_MOTION_DDOT
 */
OMM.addMEAN_MOTION_DDOT = function (builder, MEAN_MOTION_DDOT) {
  builder.addFieldFloat64(32, MEAN_MOTION_DDOT, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {manCovRefFrame} COV_REF_FRAME
 */
OMM.addCOV_REF_FRAME = function (builder, COV_REF_FRAME) {
  builder.addFieldInt8(33, COV_REF_FRAME, manCovRefFrame.RSW);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CX_X
 */
OMM.addCX_X = function (builder, CX_X) {
  builder.addFieldFloat64(34, CX_X, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CY_X
 */
OMM.addCY_X = function (builder, CY_X) {
  builder.addFieldFloat64(35, CY_X, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CY_Y
 */
OMM.addCY_Y = function (builder, CY_Y) {
  builder.addFieldFloat64(36, CY_Y, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CZ_X
 */
OMM.addCZ_X = function (builder, CZ_X) {
  builder.addFieldFloat64(37, CZ_X, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CZ_Y
 */
OMM.addCZ_Y = function (builder, CZ_Y) {
  builder.addFieldFloat64(38, CZ_Y, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CZ_Z
 */
OMM.addCZ_Z = function (builder, CZ_Z) {
  builder.addFieldFloat64(39, CZ_Z, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CX_DOT_X
 */
OMM.addCX_DOT_X = function (builder, CX_DOT_X) {
  builder.addFieldFloat64(40, CX_DOT_X, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CX_DOT_Y
 */
OMM.addCX_DOT_Y = function (builder, CX_DOT_Y) {
  builder.addFieldFloat64(41, CX_DOT_Y, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CX_DOT_Z
 */
OMM.addCX_DOT_Z = function (builder, CX_DOT_Z) {
  builder.addFieldFloat64(42, CX_DOT_Z, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CX_DOT_X_DOT
 */
OMM.addCX_DOT_X_DOT = function (builder, CX_DOT_X_DOT) {
  builder.addFieldFloat64(43, CX_DOT_X_DOT, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CY_DOT_X
 */
OMM.addCY_DOT_X = function (builder, CY_DOT_X) {
  builder.addFieldFloat64(44, CY_DOT_X, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CY_DOT_Y
 */
OMM.addCY_DOT_Y = function (builder, CY_DOT_Y) {
  builder.addFieldFloat64(45, CY_DOT_Y, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CY_DOT_Z
 */
OMM.addCY_DOT_Z = function (builder, CY_DOT_Z) {
  builder.addFieldFloat64(46, CY_DOT_Z, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CY_DOT_X_DOT
 */
OMM.addCY_DOT_X_DOT = function (builder, CY_DOT_X_DOT) {
  builder.addFieldFloat64(47, CY_DOT_X_DOT, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CY_DOT_Y_DOT
 */
OMM.addCY_DOT_Y_DOT = function (builder, CY_DOT_Y_DOT) {
  builder.addFieldFloat64(48, CY_DOT_Y_DOT, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CZ_DOT_X
 */
OMM.addCZ_DOT_X = function (builder, CZ_DOT_X) {
  builder.addFieldFloat64(49, CZ_DOT_X, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CZ_DOT_Y
 */
OMM.addCZ_DOT_Y = function (builder, CZ_DOT_Y) {
  builder.addFieldFloat64(50, CZ_DOT_Y, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CZ_DOT_Z
 */
OMM.addCZ_DOT_Z = function (builder, CZ_DOT_Z) {
  builder.addFieldFloat64(51, CZ_DOT_Z, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CZ_DOT_X_DOT
 */
OMM.addCZ_DOT_X_DOT = function (builder, CZ_DOT_X_DOT) {
  builder.addFieldFloat64(52, CZ_DOT_X_DOT, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CZ_DOT_Y_DOT
 */
OMM.addCZ_DOT_Y_DOT = function (builder, CZ_DOT_Y_DOT) {
  builder.addFieldFloat64(53, CZ_DOT_Y_DOT, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CZ_DOT_Z_DOT
 */
OMM.addCZ_DOT_Z_DOT = function (builder, CZ_DOT_Z_DOT) {
  builder.addFieldFloat64(54, CZ_DOT_Z_DOT, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} USER_DEFINED_BIP_0044_TYPE
 */
OMM.addUSER_DEFINED_BIP_0044_TYPE = function (
  builder,
  USER_DEFINED_BIP_0044_TYPE
) {
  builder.addFieldInt32(55, USER_DEFINED_BIP_0044_TYPE, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} USER_DEFINED_OBJECT_DESIGNATOROffset
 */
OMM.addUSER_DEFINED_OBJECT_DESIGNATOR = function (
  builder,
  USER_DEFINED_OBJECT_DESIGNATOROffset
) {
  builder.addFieldOffset(56, USER_DEFINED_OBJECT_DESIGNATOROffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} USER_DEFINED_EARTH_MODELOffset
 */
OMM.addUSER_DEFINED_EARTH_MODEL = function (
  builder,
  USER_DEFINED_EARTH_MODELOffset
) {
  builder.addFieldOffset(57, USER_DEFINED_EARTH_MODELOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} USER_DEFINED_EPOCH_TIMESTAMP
 */
OMM.addUSER_DEFINED_EPOCH_TIMESTAMP = function (
  builder,
  USER_DEFINED_EPOCH_TIMESTAMP
) {
  builder.addFieldFloat64(58, USER_DEFINED_EPOCH_TIMESTAMP, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} USER_DEFINED_MICROSECONDS
 */
OMM.addUSER_DEFINED_MICROSECONDS = function (
  builder,
  USER_DEFINED_MICROSECONDS
) {
  builder.addFieldFloat64(59, USER_DEFINED_MICROSECONDS, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
OMM.endOMM = function (builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} offset
 */
OMM.finishOMMBuffer = function (builder, offset) {
  builder.finish(offset, "$OMM");
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} offset
 */
OMM.finishSizePrefixedOMMBuffer = function (builder, offset) {
  builder.finish(offset, "$OMM", true);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} CCSDS_OMM_VERS
 * @param {flatbuffers.Offset} CREATION_DATEOffset
 * @param {flatbuffers.Offset} ORIGINATOROffset
 * @param {flatbuffers.Offset} OBJECT_NAMEOffset
 * @param {flatbuffers.Offset} OBJECT_IDOffset
 * @param {flatbuffers.Offset} CENTER_NAMEOffset
 * @param {referenceFrame} REF_FRAME
 * @param {flatbuffers.Offset} REF_FRAME_EPOCHOffset
 * @param {timeSystem} TIME_SYSTEM
 * @param {meanElementTheory} MEAN_ELEMENT_THEORY
 * @param {flatbuffers.Offset} COMMENTOffset
 * @param {flatbuffers.Offset} EPOCHOffset
 * @param {number} SEMI_MAJOR_AXIS
 * @param {number} MEAN_MOTION
 * @param {number} ECCENTRICITY
 * @param {number} INCLINATION
 * @param {number} RA_OF_ASC_NODE
 * @param {number} ARG_OF_PERICENTER
 * @param {number} MEAN_ANOMALY
 * @param {number} GM
 * @param {number} MASS
 * @param {number} SOLAR_RAD_AREA
 * @param {number} SOLAR_RAD_COEFF
 * @param {number} DRAG_AREA
 * @param {number} DRAG_COEFF
 * @param {ephemerisType} EPHEMERIS_TYPE
 * @param {flatbuffers.Offset} CLASSIFICATION_TYPEOffset
 * @param {number} NORAD_CAT_ID
 * @param {number} ELEMENT_SET_NO
 * @param {number} REV_AT_EPOCH
 * @param {number} BSTAR
 * @param {number} MEAN_MOTION_DOT
 * @param {number} MEAN_MOTION_DDOT
 * @param {manCovRefFrame} COV_REF_FRAME
 * @param {number} CX_X
 * @param {number} CY_X
 * @param {number} CY_Y
 * @param {number} CZ_X
 * @param {number} CZ_Y
 * @param {number} CZ_Z
 * @param {number} CX_DOT_X
 * @param {number} CX_DOT_Y
 * @param {number} CX_DOT_Z
 * @param {number} CX_DOT_X_DOT
 * @param {number} CY_DOT_X
 * @param {number} CY_DOT_Y
 * @param {number} CY_DOT_Z
 * @param {number} CY_DOT_X_DOT
 * @param {number} CY_DOT_Y_DOT
 * @param {number} CZ_DOT_X
 * @param {number} CZ_DOT_Y
 * @param {number} CZ_DOT_Z
 * @param {number} CZ_DOT_X_DOT
 * @param {number} CZ_DOT_Y_DOT
 * @param {number} CZ_DOT_Z_DOT
 * @param {number} USER_DEFINED_BIP_0044_TYPE
 * @param {flatbuffers.Offset} USER_DEFINED_OBJECT_DESIGNATOROffset
 * @param {flatbuffers.Offset} USER_DEFINED_EARTH_MODELOffset
 * @param {number} USER_DEFINED_EPOCH_TIMESTAMP
 * @param {number} USER_DEFINED_MICROSECONDS
 * @returns {flatbuffers.Offset}
 */
OMM.createOMM = function (
  builder,
  CCSDS_OMM_VERS,
  CREATION_DATEOffset,
  ORIGINATOROffset,
  OBJECT_NAMEOffset,
  OBJECT_IDOffset,
  CENTER_NAMEOffset,
  REF_FRAME,
  REF_FRAME_EPOCHOffset,
  TIME_SYSTEM,
  MEAN_ELEMENT_THEORY,
  COMMENTOffset,
  EPOCHOffset,
  SEMI_MAJOR_AXIS,
  MEAN_MOTION,
  ECCENTRICITY,
  INCLINATION,
  RA_OF_ASC_NODE,
  ARG_OF_PERICENTER,
  MEAN_ANOMALY,
  GM,
  MASS,
  SOLAR_RAD_AREA,
  SOLAR_RAD_COEFF,
  DRAG_AREA,
  DRAG_COEFF,
  EPHEMERIS_TYPE,
  CLASSIFICATION_TYPEOffset,
  NORAD_CAT_ID,
  ELEMENT_SET_NO,
  REV_AT_EPOCH,
  BSTAR,
  MEAN_MOTION_DOT,
  MEAN_MOTION_DDOT,
  COV_REF_FRAME,
  CX_X,
  CY_X,
  CY_Y,
  CZ_X,
  CZ_Y,
  CZ_Z,
  CX_DOT_X,
  CX_DOT_Y,
  CX_DOT_Z,
  CX_DOT_X_DOT,
  CY_DOT_X,
  CY_DOT_Y,
  CY_DOT_Z,
  CY_DOT_X_DOT,
  CY_DOT_Y_DOT,
  CZ_DOT_X,
  CZ_DOT_Y,
  CZ_DOT_Z,
  CZ_DOT_X_DOT,
  CZ_DOT_Y_DOT,
  CZ_DOT_Z_DOT,
  USER_DEFINED_BIP_0044_TYPE,
  USER_DEFINED_OBJECT_DESIGNATOROffset,
  USER_DEFINED_EARTH_MODELOffset,
  USER_DEFINED_EPOCH_TIMESTAMP,
  USER_DEFINED_MICROSECONDS
) {
  OMM.startOMM(builder);
  OMM.addCCSDS_OMM_VERS(builder, CCSDS_OMM_VERS);
  OMM.addCREATION_DATE(builder, CREATION_DATEOffset);
  OMM.addORIGINATOR(builder, ORIGINATOROffset);
  OMM.addOBJECT_NAME(builder, OBJECT_NAMEOffset);
  OMM.addOBJECT_ID(builder, OBJECT_IDOffset);
  OMM.addCENTER_NAME(builder, CENTER_NAMEOffset);
  OMM.addREF_FRAME(builder, REF_FRAME);
  OMM.addREF_FRAME_EPOCH(builder, REF_FRAME_EPOCHOffset);
  OMM.addTIME_SYSTEM(builder, TIME_SYSTEM);
  OMM.addMEAN_ELEMENT_THEORY(builder, MEAN_ELEMENT_THEORY);
  OMM.addCOMMENT(builder, COMMENTOffset);
  OMM.addEPOCH(builder, EPOCHOffset);
  OMM.addSEMI_MAJOR_AXIS(builder, SEMI_MAJOR_AXIS);
  OMM.addMEAN_MOTION(builder, MEAN_MOTION);
  OMM.addECCENTRICITY(builder, ECCENTRICITY);
  OMM.addINCLINATION(builder, INCLINATION);
  OMM.addRA_OF_ASC_NODE(builder, RA_OF_ASC_NODE);
  OMM.addARG_OF_PERICENTER(builder, ARG_OF_PERICENTER);
  OMM.addMEAN_ANOMALY(builder, MEAN_ANOMALY);
  OMM.addGM(builder, GM);
  OMM.addMASS(builder, MASS);
  OMM.addSOLAR_RAD_AREA(builder, SOLAR_RAD_AREA);
  OMM.addSOLAR_RAD_COEFF(builder, SOLAR_RAD_COEFF);
  OMM.addDRAG_AREA(builder, DRAG_AREA);
  OMM.addDRAG_COEFF(builder, DRAG_COEFF);
  OMM.addEPHEMERIS_TYPE(builder, EPHEMERIS_TYPE);
  OMM.addCLASSIFICATION_TYPE(builder, CLASSIFICATION_TYPEOffset);
  OMM.addNORAD_CAT_ID(builder, NORAD_CAT_ID);
  OMM.addELEMENT_SET_NO(builder, ELEMENT_SET_NO);
  OMM.addREV_AT_EPOCH(builder, REV_AT_EPOCH);
  OMM.addBSTAR(builder, BSTAR);
  OMM.addMEAN_MOTION_DOT(builder, MEAN_MOTION_DOT);
  OMM.addMEAN_MOTION_DDOT(builder, MEAN_MOTION_DDOT);
  OMM.addCOV_REF_FRAME(builder, COV_REF_FRAME);
  OMM.addCX_X(builder, CX_X);
  OMM.addCY_X(builder, CY_X);
  OMM.addCY_Y(builder, CY_Y);
  OMM.addCZ_X(builder, CZ_X);
  OMM.addCZ_Y(builder, CZ_Y);
  OMM.addCZ_Z(builder, CZ_Z);
  OMM.addCX_DOT_X(builder, CX_DOT_X);
  OMM.addCX_DOT_Y(builder, CX_DOT_Y);
  OMM.addCX_DOT_Z(builder, CX_DOT_Z);
  OMM.addCX_DOT_X_DOT(builder, CX_DOT_X_DOT);
  OMM.addCY_DOT_X(builder, CY_DOT_X);
  OMM.addCY_DOT_Y(builder, CY_DOT_Y);
  OMM.addCY_DOT_Z(builder, CY_DOT_Z);
  OMM.addCY_DOT_X_DOT(builder, CY_DOT_X_DOT);
  OMM.addCY_DOT_Y_DOT(builder, CY_DOT_Y_DOT);
  OMM.addCZ_DOT_X(builder, CZ_DOT_X);
  OMM.addCZ_DOT_Y(builder, CZ_DOT_Y);
  OMM.addCZ_DOT_Z(builder, CZ_DOT_Z);
  OMM.addCZ_DOT_X_DOT(builder, CZ_DOT_X_DOT);
  OMM.addCZ_DOT_Y_DOT(builder, CZ_DOT_Y_DOT);
  OMM.addCZ_DOT_Z_DOT(builder, CZ_DOT_Z_DOT);
  OMM.addUSER_DEFINED_BIP_0044_TYPE(builder, USER_DEFINED_BIP_0044_TYPE);
  OMM.addUSER_DEFINED_OBJECT_DESIGNATOR(
    builder,
    USER_DEFINED_OBJECT_DESIGNATOROffset
  );
  OMM.addUSER_DEFINED_EARTH_MODEL(builder, USER_DEFINED_EARTH_MODELOffset);
  OMM.addUSER_DEFINED_EPOCH_TIMESTAMP(builder, USER_DEFINED_EPOCH_TIMESTAMP);
  OMM.addUSER_DEFINED_MICROSECONDS(builder, USER_DEFINED_MICROSECONDS);
  return OMM.endOMM(builder);
};

/**
 * @constructor
 */
function MPE() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
}

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {MPE}
 */
MPE.prototype.__init = function (i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {MPE=} obj
 * @returns {MPE}
 */
MPE.getRootAsMPE = function (bb, obj) {
  return (obj || new MPE()).__init(
    bb.readInt32(bb.position()) + bb.position(),
    bb
  );
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {MPE=} obj
 * @returns {MPE}
 */
MPE.getSizePrefixedRootAsMPE = function (bb, obj) {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new MPE()).__init(
    bb.readInt32(bb.position()) + bb.position(),
    bb
  );
};

/**
 * @returns {number}
 */
MPE.prototype.MEAN_MOTION = function () {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
MPE.prototype.mutate_MEAN_MOTION = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 4);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
MPE.prototype.ECCENTRICITY = function () {
  var offset = this.bb.__offset(this.bb_pos, 6);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
MPE.prototype.mutate_ECCENTRICITY = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 6);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
MPE.prototype.INCLINATION = function () {
  var offset = this.bb.__offset(this.bb_pos, 8);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
MPE.prototype.mutate_INCLINATION = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 8);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
MPE.prototype.RA_OF_ASC_NODE = function () {
  var offset = this.bb.__offset(this.bb_pos, 10);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
MPE.prototype.mutate_RA_OF_ASC_NODE = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 10);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
MPE.prototype.MEAN_ANOMALY = function () {
  var offset = this.bb.__offset(this.bb_pos, 12);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
MPE.prototype.mutate_MEAN_ANOMALY = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 12);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
MPE.prototype.NORAD_CAT_ID = function () {
  var offset = this.bb.__offset(this.bb_pos, 14);
  return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
MPE.prototype.mutate_NORAD_CAT_ID = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 14);

  if (offset === 0) {
    return false;
  }

  this.bb.writeUint32(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
MPE.prototype.BSTAR = function () {
  var offset = this.bb.__offset(this.bb_pos, 16);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
MPE.prototype.mutate_BSTAR = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 16);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @returns {number}
 */
MPE.prototype.USER_DEFINED_EPOCH_TIMESTAMP = function () {
  var offset = this.bb.__offset(this.bb_pos, 18);
  return offset ? this.bb.readFloat64(this.bb_pos + offset) : 0.0;
};

/**
 * @param {number} value
 * @returns {boolean}
 */
MPE.prototype.mutate_USER_DEFINED_EPOCH_TIMESTAMP = function (value) {
  var offset = this.bb.__offset(this.bb_pos, 18);

  if (offset === 0) {
    return false;
  }

  this.bb.writeFloat64(this.bb_pos + offset, value);
  return true;
};

/**
 * @param {flatbuffers.Builder} builder
 */
MPE.startMPE = function (builder) {
  builder.startObject(8);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} MEAN_MOTION
 */
MPE.addMEAN_MOTION = function (builder, MEAN_MOTION) {
  builder.addFieldFloat64(0, MEAN_MOTION, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} ECCENTRICITY
 */
MPE.addECCENTRICITY = function (builder, ECCENTRICITY) {
  builder.addFieldFloat64(1, ECCENTRICITY, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} INCLINATION
 */
MPE.addINCLINATION = function (builder, INCLINATION) {
  builder.addFieldFloat64(2, INCLINATION, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} RA_OF_ASC_NODE
 */
MPE.addRA_OF_ASC_NODE = function (builder, RA_OF_ASC_NODE) {
  builder.addFieldFloat64(3, RA_OF_ASC_NODE, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} MEAN_ANOMALY
 */
MPE.addMEAN_ANOMALY = function (builder, MEAN_ANOMALY) {
  builder.addFieldFloat64(4, MEAN_ANOMALY, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} NORAD_CAT_ID
 */
MPE.addNORAD_CAT_ID = function (builder, NORAD_CAT_ID) {
  builder.addFieldInt32(5, NORAD_CAT_ID, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} BSTAR
 */
MPE.addBSTAR = function (builder, BSTAR) {
  builder.addFieldFloat64(6, BSTAR, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} USER_DEFINED_EPOCH_TIMESTAMP
 */
MPE.addUSER_DEFINED_EPOCH_TIMESTAMP = function (
  builder,
  USER_DEFINED_EPOCH_TIMESTAMP
) {
  builder.addFieldFloat64(7, USER_DEFINED_EPOCH_TIMESTAMP, 0.0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
MPE.endMPE = function (builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} MEAN_MOTION
 * @param {number} ECCENTRICITY
 * @param {number} INCLINATION
 * @param {number} RA_OF_ASC_NODE
 * @param {number} MEAN_ANOMALY
 * @param {number} NORAD_CAT_ID
 * @param {number} BSTAR
 * @param {number} USER_DEFINED_EPOCH_TIMESTAMP
 * @returns {flatbuffers.Offset}
 */
MPE.createMPE = function (
  builder,
  MEAN_MOTION,
  ECCENTRICITY,
  INCLINATION,
  RA_OF_ASC_NODE,
  MEAN_ANOMALY,
  NORAD_CAT_ID,
  BSTAR,
  USER_DEFINED_EPOCH_TIMESTAMP
) {
  MPE.startMPE(builder);
  MPE.addMEAN_MOTION(builder, MEAN_MOTION);
  MPE.addECCENTRICITY(builder, ECCENTRICITY);
  MPE.addINCLINATION(builder, INCLINATION);
  MPE.addRA_OF_ASC_NODE(builder, RA_OF_ASC_NODE);
  MPE.addMEAN_ANOMALY(builder, MEAN_ANOMALY);
  MPE.addNORAD_CAT_ID(builder, NORAD_CAT_ID);
  MPE.addBSTAR(builder, BSTAR);
  MPE.addUSER_DEFINED_EPOCH_TIMESTAMP(builder, USER_DEFINED_EPOCH_TIMESTAMP);
  return MPE.endMPE(builder);
};

/**
 * @constructor
 */
function OMMCOLLECTION() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
}

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {OMMCOLLECTION}
 */
OMMCOLLECTION.prototype.__init = function (i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {OMMCOLLECTION=} obj
 * @returns {OMMCOLLECTION}
 */
OMMCOLLECTION.getRootAsOMMCOLLECTION = function (bb, obj) {
  return (obj || new OMMCOLLECTION()).__init(
    bb.readInt32(bb.position()) + bb.position(),
    bb
  );
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {OMMCOLLECTION=} obj
 * @returns {OMMCOLLECTION}
 */
OMMCOLLECTION.getSizePrefixedRootAsOMMCOLLECTION = function (bb, obj) {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new OMMCOLLECTION()).__init(
    bb.readInt32(bb.position()) + bb.position(),
    bb
  );
};

/**
 * @param {number} index
 * @param {OMM=} obj
 * @returns {OMM}
 */
OMMCOLLECTION.prototype.RECORDS = function (index, obj) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset
    ? (obj || new OMM()).__init(
        this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4),
        this.bb
      )
    : null;
};

/**
 * @returns {number}
 */
OMMCOLLECTION.prototype.RECORDSLength = function () {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
OMMCOLLECTION.startOMMCOLLECTION = function (builder) {
  builder.startObject(1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} RECORDSOffset
 */
OMMCOLLECTION.addRECORDS = function (builder, RECORDSOffset) {
  builder.addFieldOffset(0, RECORDSOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
OMMCOLLECTION.createRECORDSVector = function (builder, data) {
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
OMMCOLLECTION.startRECORDSVector = function (builder, numElems) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
OMMCOLLECTION.endOMMCOLLECTION = function (builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} RECORDSOffset
 * @returns {flatbuffers.Offset}
 */
OMMCOLLECTION.createOMMCOLLECTION = function (builder, RECORDSOffset) {
  OMMCOLLECTION.startOMMCOLLECTION(builder);
  OMMCOLLECTION.addRECORDS(builder, RECORDSOffset);
  return OMMCOLLECTION.endOMMCOLLECTION(builder);
};

/**
 * @constructor
 */
function MPECOLLECTION() {
  /**
   * @type {flatbuffers.ByteBuffer}
   */
  this.bb = null;

  /**
   * @type {number}
   */
  this.bb_pos = 0;
}

/**
 * @param {number} i
 * @param {flatbuffers.ByteBuffer} bb
 * @returns {MPECOLLECTION}
 */
MPECOLLECTION.prototype.__init = function (i, bb) {
  this.bb_pos = i;
  this.bb = bb;
  return this;
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {MPECOLLECTION=} obj
 * @returns {MPECOLLECTION}
 */
MPECOLLECTION.getRootAsMPECOLLECTION = function (bb, obj) {
  return (obj || new MPECOLLECTION()).__init(
    bb.readInt32(bb.position()) + bb.position(),
    bb
  );
};

/**
 * @param {flatbuffers.ByteBuffer} bb
 * @param {MPECOLLECTION=} obj
 * @returns {MPECOLLECTION}
 */
MPECOLLECTION.getSizePrefixedRootAsMPECOLLECTION = function (bb, obj) {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new MPECOLLECTION()).__init(
    bb.readInt32(bb.position()) + bb.position(),
    bb
  );
};

/**
 * @param {number} index
 * @param {MPE=} obj
 * @returns {MPE}
 */
MPECOLLECTION.prototype.RECORDS = function (index, obj) {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset
    ? (obj || new MPE()).__init(
        this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4),
        this.bb
      )
    : null;
};

/**
 * @returns {number}
 */
MPECOLLECTION.prototype.RECORDSLength = function () {
  var offset = this.bb.__offset(this.bb_pos, 4);
  return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
};

/**
 * @param {flatbuffers.Builder} builder
 */
MPECOLLECTION.startMPECOLLECTION = function (builder) {
  builder.startObject(1);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} RECORDSOffset
 */
MPECOLLECTION.addRECORDS = function (builder, RECORDSOffset) {
  builder.addFieldOffset(0, RECORDSOffset, 0);
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {Array.<flatbuffers.Offset>} data
 * @returns {flatbuffers.Offset}
 */
MPECOLLECTION.createRECORDSVector = function (builder, data) {
  builder.startVector(4, data.length, 4);
  for (var i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]);
  }
  return builder.endVector();
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {number} numElems
 */
MPECOLLECTION.startRECORDSVector = function (builder, numElems) {
  builder.startVector(4, numElems, 4);
};

/**
 * @param {flatbuffers.Builder} builder
 * @returns {flatbuffers.Offset}
 */
MPECOLLECTION.endMPECOLLECTION = function (builder) {
  var offset = builder.endObject();
  return offset;
};

/**
 * @param {flatbuffers.Builder} builder
 * @param {flatbuffers.Offset} RECORDSOffset
 * @returns {flatbuffers.Offset}
 */
MPECOLLECTION.createMPECOLLECTION = function (builder, RECORDSOffset) {
  MPECOLLECTION.startMPECOLLECTION(builder);
  MPECOLLECTION.addRECORDS(builder, RECORDSOffset);
  return MPECOLLECTION.endMPECOLLECTION(builder);
};

/*
 *      bignumber.js v9.0.0
 *      A JavaScript library for arbitrary-precision arithmetic.
 *      https://github.com/MikeMcl/bignumber.js
 *      Copyright (c) 2019 Michael Mclaughlin <M8ch88l@gmail.com>
 *      MIT Licensed.
 *
 *      BigNumber.prototype methods     |  BigNumber methods
 *                                      |
 *      absoluteValue            abs    |  clone
 *      comparedTo                      |  config               set
 *      decimalPlaces            dp     |      DECIMAL_PLACES
 *      dividedBy                div    |      ROUNDING_MODE
 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
 *      exponentiatedBy          pow    |      RANGE
 *      integerValue                    |      CRYPTO
 *      isEqualTo                eq     |      MODULO_MODE
 *      isFinite                        |      POW_PRECISION
 *      isGreaterThan            gt     |      FORMAT
 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
 *      isInteger                       |  isBigNumber
 *      isLessThan               lt     |  maximum              max
 *      isLessThanOrEqualTo      lte    |  minimum              min
 *      isNaN                           |  random
 *      isNegative                      |  sum
 *      isPositive                      |
 *      isZero                          |
 *      minus                           |
 *      modulo                   mod    |
 *      multipliedBy             times  |
 *      negated                         |
 *      plus                            |
 *      precision                sd     |
 *      shiftedBy                       |
 *      squareRoot               sqrt   |
 *      toExponential                   |
 *      toFixed                         |
 *      toFormat                        |
 *      toFraction                      |
 *      toJSON                          |
 *      toNumber                        |
 *      toPrecision                     |
 *      toString                        |
 *      valueOf                         |
 *
 */


var
  isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,

  mathceil = Math.ceil,
  mathfloor = Math.floor,

  bignumberError = '[BigNumber Error] ',
  tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

  BASE = 1e14,
  LOG_BASE = 14,
  MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
  // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
  POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
  SQRT_BASE = 1e7,

  // EDITABLE
  // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
  // the arguments to toExponential, toFixed, toFormat, and toPrecision.
  MAX = 1E9;                                   // 0 to MAX_INT32


/*
 * Create and return a BigNumber constructor.
 */
function clone(configObject) {
  var div, convertBase, parseNumeric,
    P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
    ONE = new BigNumber(1),


    //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


    // The default values below must be integers within the inclusive ranges stated.
    // The values can also be changed at run-time using BigNumber.set.

    // The maximum number of decimal places for operations involving division.
    DECIMAL_PLACES = 20,                     // 0 to MAX

    // The rounding mode used when rounding to the above decimal places, and when using
    // toExponential, toFixed, toFormat and toPrecision, and round (default value).
    // UP         0 Away from zero.
    // DOWN       1 Towards zero.
    // CEIL       2 Towards +Infinity.
    // FLOOR      3 Towards -Infinity.
    // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
    // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
    // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
    // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
    // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
    ROUNDING_MODE = 4,                       // 0 to 8

    // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

    // The exponent value at and beneath which toString returns exponential notation.
    // Number type: -7
    TO_EXP_NEG = -7,                         // 0 to -MAX

    // The exponent value at and above which toString returns exponential notation.
    // Number type: 21
    TO_EXP_POS = 21,                         // 0 to MAX

    // RANGE : [MIN_EXP, MAX_EXP]

    // The minimum exponent value, beneath which underflow to zero occurs.
    // Number type: -324  (5e-324)
    MIN_EXP = -1e7,                          // -1 to -MAX

    // The maximum exponent value, above which overflow to Infinity occurs.
    // Number type:  308  (1.7976931348623157e+308)
    // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
    MAX_EXP = 1e7,                           // 1 to MAX

    // Whether to use cryptographically-secure random number generation, if available.
    CRYPTO = false,                          // true or false

    // The modulo mode used when calculating the modulus: a mod n.
    // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
    // The remainder (r) is calculated as: r = a - n * q.
    //
    // UP        0 The remainder is positive if the dividend is negative, else is negative.
    // DOWN      1 The remainder has the same sign as the dividend.
    //             This modulo mode is commonly known as 'truncated division' and is
    //             equivalent to (a % n) in JavaScript.
    // FLOOR     3 The remainder has the same sign as the divisor (Python %).
    // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
    // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
    //             The remainder is always positive.
    //
    // The truncated division, floored division, Euclidian division and IEEE 754 remainder
    // modes are commonly used for the modulus operation.
    // Although the other rounding modes can also be used, they may not give useful results.
    MODULO_MODE = 1,                         // 0 to 9

    // The maximum number of significant digits of the result of the exponentiatedBy operation.
    // If POW_PRECISION is 0, there will be unlimited significant digits.
    POW_PRECISION = 0,                    // 0 to MAX

    // The format specification used by the BigNumber.prototype.toFormat method.
    FORMAT = {
      prefix: '',
      groupSize: 3,
      secondaryGroupSize: 0,
      groupSeparator: ',',
      decimalSeparator: '.',
      fractionGroupSize: 0,
      fractionGroupSeparator: '\xA0',      // non-breaking space
      suffix: ''
    },

    // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
    // '-', '.', whitespace, or repeated character.
    // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
    ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';


  //------------------------------------------------------------------------------------------


  // CONSTRUCTOR


  /*
   * The BigNumber constructor and exported function.
   * Create and return a new instance of a BigNumber object.
   *
   * v {number|string|BigNumber} A numeric value.
   * [b] {number} The base of v. Integer, 2 to ALPHABET.length inclusive.
   */
  function BigNumber(v, b) {
    var alphabet, c, caseChanged, e, i, isNum, len, str,
      x = this;

    // Enable constructor call without `new`.
    if (!(x instanceof BigNumber)) return new BigNumber(v, b);

    if (b == null) {

      if (v && v._isBigNumber === true) {
        x.s = v.s;

        if (!v.c || v.e > MAX_EXP) {
          x.c = x.e = null;
        } else if (v.e < MIN_EXP) {
          x.c = [x.e = 0];
        } else {
          x.e = v.e;
          x.c = v.c.slice();
        }

        return;
      }

      if ((isNum = typeof v == 'number') && v * 0 == 0) {

        // Use `1 / n` to handle minus zero also.
        x.s = 1 / v < 0 ? (v = -v, -1) : 1;

        // Fast path for integers, where n < 2147483648 (2**31).
        if (v === ~~v) {
          for (e = 0, i = v; i >= 10; i /= 10, e++);

          if (e > MAX_EXP) {
            x.c = x.e = null;
          } else {
            x.e = e;
            x.c = [v];
          }

          return;
        }

        str = String(v);
      } else {

        if (!isNumeric.test(str = String(v))) return parseNumeric(x, str, isNum);

        x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
      }

      // Decimal point?
      if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

      // Exponential form?
      if ((i = str.search(/e/i)) > 0) {

        // Determine exponent.
        if (e < 0) e = i;
        e += +str.slice(i + 1);
        str = str.substring(0, i);
      } else if (e < 0) {

        // Integer.
        e = str.length;
      }

    } else {

      // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
      intCheck(b, 2, ALPHABET.length, 'Base');

      // Allow exponential notation to be used with base 10 argument, while
      // also rounding to DECIMAL_PLACES as with other bases.
      if (b == 10) {
        x = new BigNumber(v);
        return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
      }

      str = String(v);

      if (isNum = typeof v == 'number') {

        // Avoid potential interpretation of Infinity and NaN as base 44+ values.
        if (v * 0 != 0) return parseNumeric(x, str, isNum, b);

        x.s = 1 / v < 0 ? (str = str.slice(1), -1) : 1;

        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
        if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
          throw Error
           (tooManyDigits + v);
        }
      } else {
        x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
      }

      alphabet = ALPHABET.slice(0, b);
      e = i = 0;

      // Check that str is a valid base b number.
      // Don't use RegExp, so alphabet can contain special characters.
      for (len = str.length; i < len; i++) {
        if (alphabet.indexOf(c = str.charAt(i)) < 0) {
          if (c == '.') {

            // If '.' is not the first character and it has not be found before.
            if (i > e) {
              e = len;
              continue;
            }
          } else if (!caseChanged) {

            // Allow e.g. hexadecimal 'FF' as well as 'ff'.
            if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
                str == str.toLowerCase() && (str = str.toUpperCase())) {
              caseChanged = true;
              i = -1;
              e = 0;
              continue;
            }
          }

          return parseNumeric(x, String(v), isNum, b);
        }
      }

      // Prevent later check for length on converted number.
      isNum = false;
      str = convertBase(str, b, 10, x.s);

      // Decimal point?
      if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
      else e = str.length;
    }

    // Determine leading zeros.
    for (i = 0; str.charCodeAt(i) === 48; i++);

    // Determine trailing zeros.
    for (len = str.length; str.charCodeAt(--len) === 48;);

    if (str = str.slice(i, ++len)) {
      len -= i;

      // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
      if (isNum && BigNumber.DEBUG &&
        len > 15 && (v > MAX_SAFE_INTEGER || v !== mathfloor(v))) {
          throw Error
           (tooManyDigits + (x.s * v));
      }

       // Overflow?
      if ((e = e - i - 1) > MAX_EXP) {

        // Infinity.
        x.c = x.e = null;

      // Underflow?
      } else if (e < MIN_EXP) {

        // Zero.
        x.c = [x.e = 0];
      } else {
        x.e = e;
        x.c = [];

        // Transform base

        // e is the base 10 exponent.
        // i is where to slice str to get the first element of the coefficient array.
        i = (e + 1) % LOG_BASE;
        if (e < 0) i += LOG_BASE;  // i < 1

        if (i < len) {
          if (i) x.c.push(+str.slice(0, i));

          for (len -= LOG_BASE; i < len;) {
            x.c.push(+str.slice(i, i += LOG_BASE));
          }

          i = LOG_BASE - (str = str.slice(i)).length;
        } else {
          i -= len;
        }

        for (; i--; str += '0');
        x.c.push(+str);
      }
    } else {

      // Zero.
      x.c = [x.e = 0];
    }
  }


  // CONSTRUCTOR PROPERTIES


  BigNumber.clone = clone;

  BigNumber.ROUND_UP = 0;
  BigNumber.ROUND_DOWN = 1;
  BigNumber.ROUND_CEIL = 2;
  BigNumber.ROUND_FLOOR = 3;
  BigNumber.ROUND_HALF_UP = 4;
  BigNumber.ROUND_HALF_DOWN = 5;
  BigNumber.ROUND_HALF_EVEN = 6;
  BigNumber.ROUND_HALF_CEIL = 7;
  BigNumber.ROUND_HALF_FLOOR = 8;
  BigNumber.EUCLID = 9;


  /*
   * Configure infrequently-changing library-wide settings.
   *
   * Accept an object with the following optional properties (if the value of a property is
   * a number, it must be an integer within the inclusive range stated):
   *
   *   DECIMAL_PLACES   {number}           0 to MAX
   *   ROUNDING_MODE    {number}           0 to 8
   *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
   *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
   *   CRYPTO           {boolean}          true or false
   *   MODULO_MODE      {number}           0 to 9
   *   POW_PRECISION       {number}           0 to MAX
   *   ALPHABET         {string}           A string of two or more unique characters which does
   *                                     not contain '.'.
   *   FORMAT           {object}           An object with some of the following properties:
   *     prefix                 {string}
   *     groupSize              {number}
   *     secondaryGroupSize     {number}
   *     groupSeparator         {string}
   *     decimalSeparator       {string}
   *     fractionGroupSize      {number}
   *     fractionGroupSeparator {string}
   *     suffix                 {string}
   *
   * (The values assigned to the above FORMAT object properties are not checked for validity.)
   *
   * E.g.
   * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
   *
   * Ignore properties/parameters set to null or undefined, except for ALPHABET.
   *
   * Return an object with the properties current values.
   */
  BigNumber.config = BigNumber.set = function (obj) {
    var p, v;

    if (obj != null) {

      if (typeof obj == 'object') {

        // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
        // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          DECIMAL_PLACES = v;
        }

        // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
        // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
          v = obj[p];
          intCheck(v, 0, 8, p);
          ROUNDING_MODE = v;
        }

        // EXPONENTIAL_AT {number|number[]}
        // Integer, -MAX to MAX inclusive or
        // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
        // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, 0, p);
            intCheck(v[1], 0, MAX, p);
            TO_EXP_NEG = v[0];
            TO_EXP_POS = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
          }
        }

        // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
        // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
        // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
        if (obj.hasOwnProperty(p = 'RANGE')) {
          v = obj[p];
          if (v && v.pop) {
            intCheck(v[0], -MAX, -1, p);
            intCheck(v[1], 1, MAX, p);
            MIN_EXP = v[0];
            MAX_EXP = v[1];
          } else {
            intCheck(v, -MAX, MAX, p);
            if (v) {
              MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
            } else {
              throw Error
               (bignumberError + p + ' cannot be zero: ' + v);
            }
          }
        }

        // CRYPTO {boolean} true or false.
        // '[BigNumber Error] CRYPTO not true or false: {v}'
        // '[BigNumber Error] crypto unavailable'
        if (obj.hasOwnProperty(p = 'CRYPTO')) {
          v = obj[p];
          if (v === !!v) {
            if (v) {
              if (typeof crypto != 'undefined' && crypto &&
               (crypto.getRandomValues || crypto.randomBytes)) {
                CRYPTO = v;
              } else {
                CRYPTO = !v;
                throw Error
                 (bignumberError + 'crypto unavailable');
              }
            } else {
              CRYPTO = v;
            }
          } else {
            throw Error
             (bignumberError + p + ' not true or false: ' + v);
          }
        }

        // MODULO_MODE {number} Integer, 0 to 9 inclusive.
        // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
          v = obj[p];
          intCheck(v, 0, 9, p);
          MODULO_MODE = v;
        }

        // POW_PRECISION {number} Integer, 0 to MAX inclusive.
        // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
        if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
          v = obj[p];
          intCheck(v, 0, MAX, p);
          POW_PRECISION = v;
        }

        // FORMAT {object}
        // '[BigNumber Error] FORMAT not an object: {v}'
        if (obj.hasOwnProperty(p = 'FORMAT')) {
          v = obj[p];
          if (typeof v == 'object') FORMAT = v;
          else throw Error
           (bignumberError + p + ' not an object: ' + v);
        }

        // ALPHABET {string}
        // '[BigNumber Error] ALPHABET invalid: {v}'
        if (obj.hasOwnProperty(p = 'ALPHABET')) {
          v = obj[p];

          // Disallow if only one character,
          // or if it contains '+', '-', '.', whitespace, or a repeated character.
          if (typeof v == 'string' && !/^.$|[+-.\s]|(.).*\1/.test(v)) {
            ALPHABET = v;
          } else {
            throw Error
             (bignumberError + p + ' invalid: ' + v);
          }
        }

      } else {

        // '[BigNumber Error] Object expected: {v}'
        throw Error
         (bignumberError + 'Object expected: ' + obj);
      }
    }

    return {
      DECIMAL_PLACES: DECIMAL_PLACES,
      ROUNDING_MODE: ROUNDING_MODE,
      EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
      RANGE: [MIN_EXP, MAX_EXP],
      CRYPTO: CRYPTO,
      MODULO_MODE: MODULO_MODE,
      POW_PRECISION: POW_PRECISION,
      FORMAT: FORMAT,
      ALPHABET: ALPHABET
    };
  };


  /*
   * Return true if v is a BigNumber instance, otherwise return false.
   *
   * If BigNumber.DEBUG is true, throw if a BigNumber instance is not well-formed.
   *
   * v {any}
   *
   * '[BigNumber Error] Invalid BigNumber: {v}'
   */
  BigNumber.isBigNumber = function (v) {
    if (!v || v._isBigNumber !== true) return false;
    if (!BigNumber.DEBUG) return true;

    var i, n,
      c = v.c,
      e = v.e,
      s = v.s;

    out: if ({}.toString.call(c) == '[object Array]') {

      if ((s === 1 || s === -1) && e >= -MAX && e <= MAX && e === mathfloor(e)) {

        // If the first element is zero, the BigNumber value must be zero.
        if (c[0] === 0) {
          if (e === 0 && c.length === 1) return true;
          break out;
        }

        // Calculate number of digits that c[0] should have, based on the exponent.
        i = (e + 1) % LOG_BASE;
        if (i < 1) i += LOG_BASE;

        // Calculate number of digits of c[0].
        //if (Math.ceil(Math.log(c[0] + 1) / Math.LN10) == i) {
        if (String(c[0]).length == i) {

          for (i = 0; i < c.length; i++) {
            n = c[i];
            if (n < 0 || n >= BASE || n !== mathfloor(n)) break out;
          }

          // Last element cannot be zero, unless it is the only element.
          if (n !== 0) return true;
        }
      }

    // Infinity/NaN
    } else if (c === null && e === null && (s === null || s === 1 || s === -1)) {
      return true;
    }

    throw Error
      (bignumberError + 'Invalid BigNumber: ' + v);
  };


  /*
   * Return a new BigNumber whose value is the maximum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.maximum = BigNumber.max = function () {
    return maxOrMin(arguments, P.lt);
  };


  /*
   * Return a new BigNumber whose value is the minimum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.minimum = BigNumber.min = function () {
    return maxOrMin(arguments, P.gt);
  };


  /*
   * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
   * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
   * zeros are produced).
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
   * '[BigNumber Error] crypto unavailable'
   */
  BigNumber.random = (function () {
    var pow2_53 = 0x20000000000000;

    // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
    // Check if Math.random() produces more than 32 bits of randomness.
    // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
    // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
    var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
     ? function () { return mathfloor(Math.random() * pow2_53); }
     : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
       (Math.random() * 0x800000 | 0); };

    return function (dp) {
      var a, b, e, k, v,
        i = 0,
        c = [],
        rand = new BigNumber(ONE);

      if (dp == null) dp = DECIMAL_PLACES;
      else intCheck(dp, 0, MAX);

      k = mathceil(dp / LOG_BASE);

      if (CRYPTO) {

        // Browsers supporting crypto.getRandomValues.
        if (crypto.getRandomValues) {

          a = crypto.getRandomValues(new Uint32Array(k *= 2));

          for (; i < k;) {

            // 53 bits:
            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
            //                                     11111 11111111 11111111
            // 0x20000 is 2^21.
            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

            // Rejection sampling:
            // 0 <= v < 9007199254740992
            // Probability that v >= 9e15, is
            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
            if (v >= 9e15) {
              b = crypto.getRandomValues(new Uint32Array(2));
              a[i] = b[0];
              a[i + 1] = b[1];
            } else {

              // 0 <= v <= 8999999999999999
              // 0 <= (v % 1e14) <= 99999999999999
              c.push(v % 1e14);
              i += 2;
            }
          }
          i = k / 2;

        // Node.js supporting crypto.randomBytes.
        } else if (crypto.randomBytes) {

          // buffer
          a = crypto.randomBytes(k *= 7);

          for (; i < k;) {

            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
            // 0x100000000 is 2^32, 0x1000000 is 2^24
            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
            // 0 <= v < 9007199254740992
            v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
               (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
               (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

            if (v >= 9e15) {
              crypto.randomBytes(7).copy(a, i);
            } else {

              // 0 <= (v % 1e14) <= 99999999999999
              c.push(v % 1e14);
              i += 7;
            }
          }
          i = k / 7;
        } else {
          CRYPTO = false;
          throw Error
           (bignumberError + 'crypto unavailable');
        }
      }

      // Use Math.random.
      if (!CRYPTO) {

        for (; i < k;) {
          v = random53bitInt();
          if (v < 9e15) c[i++] = v % 1e14;
        }
      }

      k = c[--i];
      dp %= LOG_BASE;

      // Convert trailing digits to zeros according to dp.
      if (k && dp) {
        v = POWS_TEN[LOG_BASE - dp];
        c[i] = mathfloor(k / v) * v;
      }

      // Remove trailing elements which are zero.
      for (; c[i] === 0; c.pop(), i--);

      // Zero?
      if (i < 0) {
        c = [e = 0];
      } else {

        // Remove leading elements which are zero and adjust exponent accordingly.
        for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

        // Count the digits of the first element of c to determine leading zeros, and...
        for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

        // adjust the exponent accordingly.
        if (i < LOG_BASE) e -= LOG_BASE - i;
      }

      rand.e = e;
      rand.c = c;
      return rand;
    };
  })();


   /*
   * Return a BigNumber whose value is the sum of the arguments.
   *
   * arguments {number|string|BigNumber}
   */
  BigNumber.sum = function () {
    var i = 1,
      args = arguments,
      sum = new BigNumber(args[0]);
    for (; i < args.length;) sum = sum.plus(args[i++]);
    return sum;
  };


  // PRIVATE FUNCTIONS


  // Called by BigNumber and BigNumber.prototype.toString.
  convertBase = (function () {
    var decimal = '0123456789';

    /*
     * Convert string of baseIn to an array of numbers of baseOut.
     * Eg. toBaseOut('255', 10, 16) returns [15, 15].
     * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
     */
    function toBaseOut(str, baseIn, baseOut, alphabet) {
      var j,
        arr = [0],
        arrL,
        i = 0,
        len = str.length;

      for (; i < len;) {
        for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

        arr[0] += alphabet.indexOf(str.charAt(i++));

        for (j = 0; j < arr.length; j++) {

          if (arr[j] > baseOut - 1) {
            if (arr[j + 1] == null) arr[j + 1] = 0;
            arr[j + 1] += arr[j] / baseOut | 0;
            arr[j] %= baseOut;
          }
        }
      }

      return arr.reverse();
    }

    // Convert a numeric string of baseIn to a numeric string of baseOut.
    // If the caller is toString, we are converting from base 10 to baseOut.
    // If the caller is BigNumber, we are converting from baseIn to base 10.
    return function (str, baseIn, baseOut, sign, callerIsToString) {
      var alphabet, d, e, k, r, x, xc, y,
        i = str.indexOf('.'),
        dp = DECIMAL_PLACES,
        rm = ROUNDING_MODE;

      // Non-integer.
      if (i >= 0) {
        k = POW_PRECISION;

        // Unlimited precision.
        POW_PRECISION = 0;
        str = str.replace('.', '');
        y = new BigNumber(baseIn);
        x = y.pow(str.length - i);
        POW_PRECISION = k;

        // Convert str as if an integer, then restore the fraction part by dividing the
        // result by its base raised to a power.

        y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
         10, baseOut, decimal);
        y.e = y.c.length;
      }

      // Convert the number as integer.

      xc = toBaseOut(str, baseIn, baseOut, callerIsToString
       ? (alphabet = ALPHABET, decimal)
       : (alphabet = decimal, ALPHABET));

      // xc now represents str as an integer and converted to baseOut. e is the exponent.
      e = k = xc.length;

      // Remove trailing zeros.
      for (; xc[--k] == 0; xc.pop());

      // Zero?
      if (!xc[0]) return alphabet.charAt(0);

      // Does str represent an integer? If so, no need for the division.
      if (i < 0) {
        --e;
      } else {
        x.c = xc;
        x.e = e;

        // The sign is needed for correct rounding.
        x.s = sign;
        x = div(x, y, dp, rm, baseOut);
        xc = x.c;
        r = x.r;
        e = x.e;
      }

      // xc now represents str converted to baseOut.

      // THe index of the rounding digit.
      d = e + dp + 1;

      // The rounding digit: the digit to the right of the digit that may be rounded up.
      i = xc[d];

      // Look at the rounding digits and mode to determine whether to round up.

      k = baseOut / 2;
      r = r || d < 0 || xc[d + 1] != null;

      r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
            : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
             rm == (x.s < 0 ? 8 : 7));

      // If the index of the rounding digit is not greater than zero, or xc represents
      // zero, then the result of the base conversion is zero or, if rounding up, a value
      // such as 0.00001.
      if (d < 1 || !xc[0]) {

        // 1^-dp or 0
        str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
      } else {

        // Truncate xc to the required number of decimal places.
        xc.length = d;

        // Round up?
        if (r) {

          // Rounding up may mean the previous digit has to be rounded up and so on.
          for (--baseOut; ++xc[--d] > baseOut;) {
            xc[d] = 0;

            if (!d) {
              ++e;
              xc = [1].concat(xc);
            }
          }
        }

        // Determine trailing zeros.
        for (k = xc.length; !xc[--k];);

        // E.g. [4, 11, 15] becomes 4bf.
        for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

        // Add leading zeros, decimal point and trailing zeros as required.
        str = toFixedPoint(str, e, alphabet.charAt(0));
      }

      // The caller will add the sign.
      return str;
    };
  })();


  // Perform division in the specified base. Called by div and convertBase.
  div = (function () {

    // Assume non-zero x and k.
    function multiply(x, k, base) {
      var m, temp, xlo, xhi,
        carry = 0,
        i = x.length,
        klo = k % SQRT_BASE,
        khi = k / SQRT_BASE | 0;

      for (x = x.slice(); i--;) {
        xlo = x[i] % SQRT_BASE;
        xhi = x[i] / SQRT_BASE | 0;
        m = khi * xlo + xhi * klo;
        temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
        carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
        x[i] = temp % base;
      }

      if (carry) x = [carry].concat(x);

      return x;
    }

    function compare(a, b, aL, bL) {
      var i, cmp;

      if (aL != bL) {
        cmp = aL > bL ? 1 : -1;
      } else {

        for (i = cmp = 0; i < aL; i++) {

          if (a[i] != b[i]) {
            cmp = a[i] > b[i] ? 1 : -1;
            break;
          }
        }
      }

      return cmp;
    }

    function subtract(a, b, aL, base) {
      var i = 0;

      // Subtract b from a.
      for (; aL--;) {
        a[aL] -= i;
        i = a[aL] < b[aL] ? 1 : 0;
        a[aL] = i * base + a[aL] - b[aL];
      }

      // Remove leading zeros.
      for (; !a[0] && a.length > 1; a.splice(0, 1));
    }

    // x: dividend, y: divisor.
    return function (x, y, dp, rm, base) {
      var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
        yL, yz,
        s = x.s == y.s ? 1 : -1,
        xc = x.c,
        yc = y.c;

      // Either NaN, Infinity or 0?
      if (!xc || !xc[0] || !yc || !yc[0]) {

        return new BigNumber(

         // Return NaN if either NaN, or both Infinity or 0.
         !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

          // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
          xc && xc[0] == 0 || !yc ? s * 0 : s / 0
       );
      }

      q = new BigNumber(s);
      qc = q.c = [];
      e = x.e - y.e;
      s = dp + e + 1;

      if (!base) {
        base = BASE;
        e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
        s = s / LOG_BASE | 0;
      }

      // Result exponent may be one less then the current value of e.
      // The coefficients of the BigNumbers from convertBase may have trailing zeros.
      for (i = 0; yc[i] == (xc[i] || 0); i++);

      if (yc[i] > (xc[i] || 0)) e--;

      if (s < 0) {
        qc.push(1);
        more = true;
      } else {
        xL = xc.length;
        yL = yc.length;
        i = 0;
        s += 2;

        // Normalise xc and yc so highest order digit of yc is >= base / 2.

        n = mathfloor(base / (yc[0] + 1));

        // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
        // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
        if (n > 1) {
          yc = multiply(yc, n, base);
          xc = multiply(xc, n, base);
          yL = yc.length;
          xL = xc.length;
        }

        xi = yL;
        rem = xc.slice(0, yL);
        remL = rem.length;

        // Add zeros to make remainder as long as divisor.
        for (; remL < yL; rem[remL++] = 0);
        yz = yc.slice();
        yz = [0].concat(yz);
        yc0 = yc[0];
        if (yc[1] >= base / 2) yc0++;
        // Not necessary, but to prevent trial digit n > base, when using base 3.
        // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

        do {
          n = 0;

          // Compare divisor and remainder.
          cmp = compare(yc, rem, yL, remL);

          // If divisor < remainder.
          if (cmp < 0) {

            // Calculate trial digit, n.

            rem0 = rem[0];
            if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

            // n is how many times the divisor goes into the current remainder.
            n = mathfloor(rem0 / yc0);

            //  Algorithm:
            //  product = divisor multiplied by trial digit (n).
            //  Compare product and remainder.
            //  If product is greater than remainder:
            //    Subtract divisor from product, decrement trial digit.
            //  Subtract product from remainder.
            //  If product was less than remainder at the last compare:
            //    Compare new remainder and divisor.
            //    If remainder is greater than divisor:
            //      Subtract divisor from remainder, increment trial digit.

            if (n > 1) {

              // n may be > base only when base is 3.
              if (n >= base) n = base - 1;

              // product = divisor * trial digit.
              prod = multiply(yc, n, base);
              prodL = prod.length;
              remL = rem.length;

              // Compare product and remainder.
              // If product > remainder then trial digit n too high.
              // n is 1 too high about 5% of the time, and is not known to have
              // ever been more than 1 too high.
              while (compare(prod, rem, prodL, remL) == 1) {
                n--;

                // Subtract divisor from product.
                subtract(prod, yL < prodL ? yz : yc, prodL, base);
                prodL = prod.length;
                cmp = 1;
              }
            } else {

              // n is 0 or 1, cmp is -1.
              // If n is 0, there is no need to compare yc and rem again below,
              // so change cmp to 1 to avoid it.
              // If n is 1, leave cmp as -1, so yc and rem are compared again.
              if (n == 0) {

                // divisor < remainder, so n must be at least 1.
                cmp = n = 1;
              }

              // product = divisor
              prod = yc.slice();
              prodL = prod.length;
            }

            if (prodL < remL) prod = [0].concat(prod);

            // Subtract product from remainder.
            subtract(rem, prod, remL, base);
            remL = rem.length;

             // If product was < remainder.
            if (cmp == -1) {

              // Compare divisor and new remainder.
              // If divisor < new remainder, subtract divisor from remainder.
              // Trial digit n too low.
              // n is 1 too low about 5% of the time, and very rarely 2 too low.
              while (compare(yc, rem, yL, remL) < 1) {
                n++;

                // Subtract divisor from remainder.
                subtract(rem, yL < remL ? yz : yc, remL, base);
                remL = rem.length;
              }
            }
          } else if (cmp === 0) {
            n++;
            rem = [0];
          } // else cmp === 1 and n will be 0

          // Add the next digit, n, to the result array.
          qc[i++] = n;

          // Update the remainder.
          if (rem[0]) {
            rem[remL++] = xc[xi] || 0;
          } else {
            rem = [xc[xi]];
            remL = 1;
          }
        } while ((xi++ < xL || rem[0] != null) && s--);

        more = rem[0] != null;

        // Leading zero?
        if (!qc[0]) qc.splice(0, 1);
      }

      if (base == BASE) {

        // To calculate q.e, first get the number of digits of qc[0].
        for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

        round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

      // Caller is convertBase.
      } else {
        q.e = e;
        q.r = +more;
      }

      return q;
    };
  })();


  /*
   * Return a string representing the value of BigNumber n in fixed-point or exponential
   * notation rounded to the specified decimal places or significant digits.
   *
   * n: a BigNumber.
   * i: the index of the last digit required (i.e. the digit that may be rounded up).
   * rm: the rounding mode.
   * id: 1 (toExponential) or 2 (toPrecision).
   */
  function format(n, i, rm, id) {
    var c0, e, ne, len, str;

    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);

    if (!n.c) return n.toString();

    c0 = n.c[0];
    ne = n.e;

    if (i == null) {
      str = coeffToString(n.c);
      str = id == 1 || id == 2 && (ne <= TO_EXP_NEG || ne >= TO_EXP_POS)
       ? toExponential(str, ne)
       : toFixedPoint(str, ne, '0');
    } else {
      n = round(new BigNumber(n), i, rm);

      // n.e may have changed if the value was rounded up.
      e = n.e;

      str = coeffToString(n.c);
      len = str.length;

      // toPrecision returns exponential notation if the number of significant digits
      // specified is less than the number of digits necessary to represent the integer
      // part of the value in fixed-point notation.

      // Exponential notation.
      if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

        // Append zeros?
        for (; len < i; str += '0', len++);
        str = toExponential(str, e);

      // Fixed-point notation.
      } else {
        i -= ne;
        str = toFixedPoint(str, e, '0');

        // Append zeros?
        if (e + 1 > len) {
          if (--i > 0) for (str += '.'; i--; str += '0');
        } else {
          i += e - len;
          if (i > 0) {
            if (e + 1 == len) str += '.';
            for (; i--; str += '0');
          }
        }
      }
    }

    return n.s < 0 && c0 ? '-' + str : str;
  }


  // Handle BigNumber.max and BigNumber.min.
  function maxOrMin(args, method) {
    var n,
      i = 1,
      m = new BigNumber(args[0]);

    for (; i < args.length; i++) {
      n = new BigNumber(args[i]);

      // If any number is NaN, return NaN.
      if (!n.s) {
        m = n;
        break;
      } else if (method.call(m, n)) {
        m = n;
      }
    }

    return m;
  }


  /*
   * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
   * Called by minus, plus and times.
   */
  function normalise(n, c, e) {
    var i = 1,
      j = c.length;

     // Remove trailing zeros.
    for (; !c[--j]; c.pop());

    // Calculate the base 10 exponent. First get the number of digits of c[0].
    for (j = c[0]; j >= 10; j /= 10, i++);

    // Overflow?
    if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

      // Infinity.
      n.c = n.e = null;

    // Underflow?
    } else if (e < MIN_EXP) {

      // Zero.
      n.c = [n.e = 0];
    } else {
      n.e = e;
      n.c = c;
    }

    return n;
  }


  // Handle values that fail the validity test in BigNumber.
  parseNumeric = (function () {
    var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
      dotAfter = /^([^.]+)\.$/,
      dotBefore = /^\.([^.]+)$/,
      isInfinityOrNaN = /^-?(Infinity|NaN)$/,
      whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

    return function (x, str, isNum, b) {
      var base,
        s = isNum ? str : str.replace(whitespaceOrPlus, '');

      // No exception on ±Infinity or NaN.
      if (isInfinityOrNaN.test(s)) {
        x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
      } else {
        if (!isNum) {

          // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
          s = s.replace(basePrefix, function (m, p1, p2) {
            base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
            return !b || b == base ? p1 : m;
          });

          if (b) {
            base = b;

            // E.g. '1.' to '1', '.1' to '0.1'
            s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
          }

          if (str != s) return new BigNumber(s, base);
        }

        // '[BigNumber Error] Not a number: {n}'
        // '[BigNumber Error] Not a base {b} number: {n}'
        if (BigNumber.DEBUG) {
          throw Error
            (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
        }

        // NaN
        x.s = null;
      }

      x.c = x.e = null;
    }
  })();


  /*
   * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
   * If r is truthy, it is known that there are more digits after the rounding digit.
   */
  function round(x, sd, rm, r) {
    var d, i, j, k, n, ni, rd,
      xc = x.c,
      pows10 = POWS_TEN;

    // if x is not Infinity or NaN...
    if (xc) {

      // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
      // n is a base 1e14 number, the value of the element of array x.c containing rd.
      // ni is the index of n within x.c.
      // d is the number of digits of n.
      // i is the index of rd within n including leading zeros.
      // j is the actual index of rd within n (if < 0, rd is a leading zero).
      out: {

        // Get the number of digits of the first element of xc.
        for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
        i = sd - d;

        // If the rounding digit is in the first element of xc...
        if (i < 0) {
          i += LOG_BASE;
          j = sd;
          n = xc[ni = 0];

          // Get the rounding digit at index j of n.
          rd = n / pows10[d - j - 1] % 10 | 0;
        } else {
          ni = mathceil((i + 1) / LOG_BASE);

          if (ni >= xc.length) {

            if (r) {

              // Needed by sqrt.
              for (; xc.length <= ni; xc.push(0));
              n = rd = 0;
              d = 1;
              i %= LOG_BASE;
              j = i - LOG_BASE + 1;
            } else {
              break out;
            }
          } else {
            n = k = xc[ni];

            // Get the number of digits of n.
            for (d = 1; k >= 10; k /= 10, d++);

            // Get the index of rd within n.
            i %= LOG_BASE;

            // Get the index of rd within n, adjusted for leading zeros.
            // The number of leading zeros of n is given by LOG_BASE - d.
            j = i - LOG_BASE + d;

            // Get the rounding digit at index j of n.
            rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
          }
        }

        r = r || sd < 0 ||

        // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
         xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

        r = rm < 4
         ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
         : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

          // Check whether the digit to the left of the rounding digit is odd.
          ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
           rm == (x.s < 0 ? 8 : 7));

        if (sd < 1 || !xc[0]) {
          xc.length = 0;

          if (r) {

            // Convert sd to decimal places.
            sd -= x.e + 1;

            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
            xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
            x.e = -sd || 0;
          } else {

            // Zero.
            xc[0] = x.e = 0;
          }

          return x;
        }

        // Remove excess digits.
        if (i == 0) {
          xc.length = ni;
          k = 1;
          ni--;
        } else {
          xc.length = ni + 1;
          k = pows10[LOG_BASE - i];

          // E.g. 56700 becomes 56000 if 7 is the rounding digit.
          // j > 0 means i > number of leading zeros of n.
          xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
        }

        // Round up?
        if (r) {

          for (; ;) {

            // If the digit to be rounded up is in the first element of xc...
            if (ni == 0) {

              // i will be the length of xc[0] before k is added.
              for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
              j = xc[0] += k;
              for (k = 1; j >= 10; j /= 10, k++);

              // if i != k the length has increased.
              if (i != k) {
                x.e++;
                if (xc[0] == BASE) xc[0] = 1;
              }

              break;
            } else {
              xc[ni] += k;
              if (xc[ni] != BASE) break;
              xc[ni--] = 0;
              k = 1;
            }
          }
        }

        // Remove trailing zeros.
        for (i = xc.length; xc[--i] === 0; xc.pop());
      }

      // Overflow? Infinity.
      if (x.e > MAX_EXP) {
        x.c = x.e = null;

      // Underflow? Zero.
      } else if (x.e < MIN_EXP) {
        x.c = [x.e = 0];
      }
    }

    return x;
  }


  function valueOf(n) {
    var str,
      e = n.e;

    if (e === null) return n.toString();

    str = coeffToString(n.c);

    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
      ? toExponential(str, e)
      : toFixedPoint(str, e, '0');

    return n.s < 0 ? '-' + str : str;
  }


  // PROTOTYPE/INSTANCE METHODS


  /*
   * Return a new BigNumber whose value is the absolute value of this BigNumber.
   */
  P.absoluteValue = P.abs = function () {
    var x = new BigNumber(this);
    if (x.s < 0) x.s = 1;
    return x;
  };


  /*
   * Return
   *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
   *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
   *   0 if they have the same value,
   *   or null if the value of either is NaN.
   */
  P.comparedTo = function (y, b) {
    return compare(this, new BigNumber(y, b));
  };


  /*
   * If dp is undefined or null or true or false, return the number of decimal places of the
   * value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
   *
   * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
   * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
   * ROUNDING_MODE if rm is omitted.
   *
   * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.decimalPlaces = P.dp = function (dp, rm) {
    var c, n, v,
      x = this;

    if (dp != null) {
      intCheck(dp, 0, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      return round(new BigNumber(x), dp + x.e + 1, rm);
    }

    if (!(c = x.c)) return null;
    n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

    // Subtract the number of trailing zeros of the last number.
    if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
    if (n < 0) n = 0;

    return n;
  };


  /*
   *  n / 0 = I
   *  n / N = N
   *  n / I = 0
   *  0 / n = 0
   *  0 / 0 = N
   *  0 / N = N
   *  0 / I = 0
   *  N / n = N
   *  N / 0 = N
   *  N / N = N
   *  N / I = N
   *  I / n = I
   *  I / 0 = I
   *  I / N = N
   *  I / I = N
   *
   * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
   * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
   */
  P.dividedBy = P.div = function (y, b) {
    return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
  };


  /*
   * Return a new BigNumber whose value is the integer part of dividing the value of this
   * BigNumber by the value of BigNumber(y, b).
   */
  P.dividedToIntegerBy = P.idiv = function (y, b) {
    return div(this, new BigNumber(y, b), 0, 1);
  };


  /*
   * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
   *
   * If m is present, return the result modulo m.
   * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
   * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
   *
   * The modular power operation works efficiently when x, n, and m are integers, otherwise it
   * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
   *
   * n {number|string|BigNumber} The exponent. An integer.
   * [m] {number|string|BigNumber} The modulus.
   *
   * '[BigNumber Error] Exponent not an integer: {n}'
   */
  P.exponentiatedBy = P.pow = function (n, m) {
    var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
      x = this;

    n = new BigNumber(n);

    // Allow NaN and ±Infinity, but not other non-integers.
    if (n.c && !n.isInteger()) {
      throw Error
        (bignumberError + 'Exponent not an integer: ' + valueOf(n));
    }

    if (m != null) m = new BigNumber(m);

    // Exponent of MAX_SAFE_INTEGER is 15.
    nIsBig = n.e > 14;

    // If x is NaN, ±Infinity, ±0 or ±1, or n is ±Infinity, NaN or ±0.
    if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

      // The sign of the result of pow when x is negative depends on the evenness of n.
      // If +n overflows to ±Infinity, the evenness of n would be not be known.
      y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
      return m ? y.mod(m) : y;
    }

    nIsNeg = n.s < 0;

    if (m) {

      // x % m returns NaN if abs(m) is zero, or m is NaN.
      if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

      isModExp = !nIsNeg && x.isInteger() && m.isInteger();

      if (isModExp) x = x.mod(m);

    // Overflow to ±Infinity: >=2**1e10 or >=1.0000024**1e15.
    // Underflow to ±0: <=0.79**1e10 or <=0.9999975**1e15.
    } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
      // [1, 240000000]
      ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
      // [80000000000000]  [99999750000000]
      : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

      // If x is negative and n is odd, k = -0, else k = 0.
      k = x.s < 0 && isOdd(n) ? -0 : 0;

      // If x >= 1, k = ±Infinity.
      if (x.e > -1) k = 1 / k;

      // If n is negative return ±0, else return ±Infinity.
      return new BigNumber(nIsNeg ? 1 / k : k);

    } else if (POW_PRECISION) {

      // Truncating each coefficient array to a length of k after each multiplication
      // equates to truncating significant digits to POW_PRECISION + [28, 41],
      // i.e. there will be a minimum of 28 guard digits retained.
      k = mathceil(POW_PRECISION / LOG_BASE + 2);
    }

    if (nIsBig) {
      half = new BigNumber(0.5);
      if (nIsNeg) n.s = 1;
      nIsOdd = isOdd(n);
    } else {
      i = Math.abs(+valueOf(n));
      nIsOdd = i % 2;
    }

    y = new BigNumber(ONE);

    // Performs 54 loop iterations for n of 9007199254740991.
    for (; ;) {

      if (nIsOdd) {
        y = y.times(x);
        if (!y.c) break;

        if (k) {
          if (y.c.length > k) y.c.length = k;
        } else if (isModExp) {
          y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
        }
      }

      if (i) {
        i = mathfloor(i / 2);
        if (i === 0) break;
        nIsOdd = i % 2;
      } else {
        n = n.times(half);
        round(n, n.e + 1, 1);

        if (n.e > 14) {
          nIsOdd = isOdd(n);
        } else {
          i = +valueOf(n);
          if (i === 0) break;
          nIsOdd = i % 2;
        }
      }

      x = x.times(x);

      if (k) {
        if (x.c && x.c.length > k) x.c.length = k;
      } else if (isModExp) {
        x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
      }
    }

    if (isModExp) return y;
    if (nIsNeg) y = ONE.div(y);

    return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
   * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
   *
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
   */
  P.integerValue = function (rm) {
    var n = new BigNumber(this);
    if (rm == null) rm = ROUNDING_MODE;
    else intCheck(rm, 0, 8);
    return round(n, n.e + 1, rm);
  };


  /*
   * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isEqualTo = P.eq = function (y, b) {
    return compare(this, new BigNumber(y, b)) === 0;
  };


  /*
   * Return true if the value of this BigNumber is a finite number, otherwise return false.
   */
  P.isFinite = function () {
    return !!this.c;
  };


  /*
   * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isGreaterThan = P.gt = function (y, b) {
    return compare(this, new BigNumber(y, b)) > 0;
  };


  /*
   * Return true if the value of this BigNumber is greater than or equal to the value of
   * BigNumber(y, b), otherwise return false.
   */
  P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
    return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

  };


  /*
   * Return true if the value of this BigNumber is an integer, otherwise return false.
   */
  P.isInteger = function () {
    return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
  };


  /*
   * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
   * otherwise return false.
   */
  P.isLessThan = P.lt = function (y, b) {
    return compare(this, new BigNumber(y, b)) < 0;
  };


  /*
   * Return true if the value of this BigNumber is less than or equal to the value of
   * BigNumber(y, b), otherwise return false.
   */
  P.isLessThanOrEqualTo = P.lte = function (y, b) {
    return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
  };


  /*
   * Return true if the value of this BigNumber is NaN, otherwise return false.
   */
  P.isNaN = function () {
    return !this.s;
  };


  /*
   * Return true if the value of this BigNumber is negative, otherwise return false.
   */
  P.isNegative = function () {
    return this.s < 0;
  };


  /*
   * Return true if the value of this BigNumber is positive, otherwise return false.
   */
  P.isPositive = function () {
    return this.s > 0;
  };


  /*
   * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
   */
  P.isZero = function () {
    return !!this.c && this.c[0] == 0;
  };


  /*
   *  n - 0 = n
   *  n - N = N
   *  n - I = -I
   *  0 - n = -n
   *  0 - 0 = 0
   *  0 - N = N
   *  0 - I = -I
   *  N - n = N
   *  N - 0 = N
   *  N - N = N
   *  N - I = N
   *  I - n = I
   *  I - 0 = I
   *  I - N = N
   *  I - I = N
   *
   * Return a new BigNumber whose value is the value of this BigNumber minus the value of
   * BigNumber(y, b).
   */
  P.minus = function (y, b) {
    var i, j, t, xLTy,
      x = this,
      a = x.s;

    y = new BigNumber(y, b);
    b = y.s;

    // Either NaN?
    if (!a || !b) return new BigNumber(NaN);

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }

    var xe = x.e / LOG_BASE,
      ye = y.e / LOG_BASE,
      xc = x.c,
      yc = y.c;

    if (!xe || !ye) {

      // Either Infinity?
      if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

      // Either zero?
      if (!xc[0] || !yc[0]) {

        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
        return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

         // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
         ROUNDING_MODE == 3 ? -0 : 0);
      }
    }

    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();

    // Determine which is the bigger number.
    if (a = xe - ye) {

      if (xLTy = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }

      t.reverse();

      // Prepend zeros to equalise exponents.
      for (b = a; b--; t.push(0));
      t.reverse();
    } else {

      // Exponents equal. Check digit by digit.
      j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

      for (a = b = 0; b < j; b++) {

        if (xc[b] != yc[b]) {
          xLTy = xc[b] < yc[b];
          break;
        }
      }
    }

    // x < y? Point xc to the array of the bigger number.
    if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

    b = (j = yc.length) - (i = xc.length);

    // Append zeros to xc if shorter.
    // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
    if (b > 0) for (; b--; xc[i++] = 0);
    b = BASE - 1;

    // Subtract yc from xc.
    for (; j > a;) {

      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i]; xc[i] = b);
        --xc[i];
        xc[j] += BASE;
      }

      xc[j] -= yc[j];
    }

    // Remove leading zeros and adjust exponent accordingly.
    for (; xc[0] == 0; xc.splice(0, 1), --ye);

    // Zero?
    if (!xc[0]) {

      // Following IEEE 754 (2008) 6.3,
      // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
      y.s = ROUNDING_MODE == 3 ? -1 : 1;
      y.c = [y.e = 0];
      return y;
    }

    // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
    // for finite x and y.
    return normalise(y, xc, ye);
  };


  /*
   *   n % 0 =  N
   *   n % N =  N
   *   n % I =  n
   *   0 % n =  0
   *  -0 % n = -0
   *   0 % 0 =  N
   *   0 % N =  N
   *   0 % I =  0
   *   N % n =  N
   *   N % 0 =  N
   *   N % N =  N
   *   N % I =  N
   *   I % n =  N
   *   I % 0 =  N
   *   I % N =  N
   *   I % I =  N
   *
   * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
   * BigNumber(y, b). The result depends on the value of MODULO_MODE.
   */
  P.modulo = P.mod = function (y, b) {
    var q, s,
      x = this;

    y = new BigNumber(y, b);

    // Return NaN if x is Infinity or NaN, or y is NaN or zero.
    if (!x.c || !y.s || y.c && !y.c[0]) {
      return new BigNumber(NaN);

    // Return x if y is Infinity or x is zero.
    } else if (!y.c || x.c && !x.c[0]) {
      return new BigNumber(x);
    }

    if (MODULO_MODE == 9) {

      // Euclidian division: q = sign(y) * floor(x / abs(y))
      // r = x - qy    where  0 <= r < abs(y)
      s = y.s;
      y.s = 1;
      q = div(x, y, 0, 3);
      y.s = s;
      q.s *= s;
    } else {
      q = div(x, y, 0, MODULO_MODE);
    }

    y = x.minus(q.times(y));

    // To match JavaScript %, ensure sign of zero is sign of dividend.
    if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

    return y;
  };


  /*
   *  n * 0 = 0
   *  n * N = N
   *  n * I = I
   *  0 * n = 0
   *  0 * 0 = 0
   *  0 * N = N
   *  0 * I = N
   *  N * n = N
   *  N * 0 = N
   *  N * N = N
   *  N * I = N
   *  I * n = I
   *  I * 0 = N
   *  I * N = N
   *  I * I = I
   *
   * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
   * of BigNumber(y, b).
   */
  P.multipliedBy = P.times = function (y, b) {
    var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
      base, sqrtBase,
      x = this,
      xc = x.c,
      yc = (y = new BigNumber(y, b)).c;

    // Either NaN, ±Infinity or ±0?
    if (!xc || !yc || !xc[0] || !yc[0]) {

      // Return NaN if either is NaN, or one is 0 and the other is Infinity.
      if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
        y.c = y.e = y.s = null;
      } else {
        y.s *= x.s;

        // Return ±Infinity if either is ±Infinity.
        if (!xc || !yc) {
          y.c = y.e = null;

        // Return ±0 if either is ±0.
        } else {
          y.c = [0];
          y.e = 0;
        }
      }

      return y;
    }

    e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
    y.s *= x.s;
    xcL = xc.length;
    ycL = yc.length;

    // Ensure xc points to longer array and xcL to its length.
    if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

    // Initialise the result array with zeros.
    for (i = xcL + ycL, zc = []; i--; zc.push(0));

    base = BASE;
    sqrtBase = SQRT_BASE;

    for (i = ycL; --i >= 0;) {
      c = 0;
      ylo = yc[i] % sqrtBase;
      yhi = yc[i] / sqrtBase | 0;

      for (k = xcL, j = i + k; j > i;) {
        xlo = xc[--k] % sqrtBase;
        xhi = xc[k] / sqrtBase | 0;
        m = yhi * xlo + xhi * ylo;
        xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
        c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
        zc[j--] = xlo % base;
      }

      zc[j] = c;
    }

    if (c) {
      ++e;
    } else {
      zc.splice(0, 1);
    }

    return normalise(y, zc, e);
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber negated,
   * i.e. multiplied by -1.
   */
  P.negated = function () {
    var x = new BigNumber(this);
    x.s = -x.s || null;
    return x;
  };


  /*
   *  n + 0 = n
   *  n + N = N
   *  n + I = I
   *  0 + n = n
   *  0 + 0 = 0
   *  0 + N = N
   *  0 + I = I
   *  N + n = N
   *  N + 0 = N
   *  N + N = N
   *  N + I = N
   *  I + n = I
   *  I + 0 = I
   *  I + N = N
   *  I + I = I
   *
   * Return a new BigNumber whose value is the value of this BigNumber plus the value of
   * BigNumber(y, b).
   */
  P.plus = function (y, b) {
    var t,
      x = this,
      a = x.s;

    y = new BigNumber(y, b);
    b = y.s;

    // Either NaN?
    if (!a || !b) return new BigNumber(NaN);

    // Signs differ?
     if (a != b) {
      y.s = -b;
      return x.minus(y);
    }

    var xe = x.e / LOG_BASE,
      ye = y.e / LOG_BASE,
      xc = x.c,
      yc = y.c;

    if (!xe || !ye) {

      // Return ±Infinity if either ±Infinity.
      if (!xc || !yc) return new BigNumber(a / 0);

      // Either zero?
      // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
      if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
    }

    xe = bitFloor(xe);
    ye = bitFloor(ye);
    xc = xc.slice();

    // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
    if (a = xe - ye) {
      if (a > 0) {
        ye = xe;
        t = yc;
      } else {
        a = -a;
        t = xc;
      }

      t.reverse();
      for (; a--; t.push(0));
      t.reverse();
    }

    a = xc.length;
    b = yc.length;

    // Point xc to the longer array, and b to the shorter length.
    if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

    // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
    for (a = 0; b;) {
      a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
      xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
    }

    if (a) {
      xc = [a].concat(xc);
      ++ye;
    }

    // No need to check for zero, as +x + +y != 0 && -x + -y != 0
    // ye = MAX_EXP + 1 possible
    return normalise(y, xc, ye);
  };


  /*
   * If sd is undefined or null or true or false, return the number of significant digits of
   * the value of this BigNumber, or null if the value of this BigNumber is ±Infinity or NaN.
   * If sd is true include integer-part trailing zeros in the count.
   *
   * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
   * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
   * ROUNDING_MODE if rm is omitted.
   *
   * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
   *                     boolean: whether to count integer-part trailing zeros: true or false.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
   */
  P.precision = P.sd = function (sd, rm) {
    var c, n, v,
      x = this;

    if (sd != null && sd !== !!sd) {
      intCheck(sd, 1, MAX);
      if (rm == null) rm = ROUNDING_MODE;
      else intCheck(rm, 0, 8);

      return round(new BigNumber(x), sd, rm);
    }

    if (!(c = x.c)) return null;
    v = c.length - 1;
    n = v * LOG_BASE + 1;

    if (v = c[v]) {

      // Subtract the number of trailing zeros of the last element.
      for (; v % 10 == 0; v /= 10, n--);

      // Add the number of digits of the first element.
      for (v = c[0]; v >= 10; v /= 10, n++);
    }

    if (sd && x.e + 1 > n) n = x.e + 1;

    return n;
  };


  /*
   * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
   * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
   *
   * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
   */
  P.shiftedBy = function (k) {
    intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
    return this.times('1e' + k);
  };


  /*
   *  sqrt(-n) =  N
   *  sqrt(N) =  N
   *  sqrt(-I) =  N
   *  sqrt(I) =  I
   *  sqrt(0) =  0
   *  sqrt(-0) = -0
   *
   * Return a new BigNumber whose value is the square root of the value of this BigNumber,
   * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
   */
  P.squareRoot = P.sqrt = function () {
    var m, n, r, rep, t,
      x = this,
      c = x.c,
      s = x.s,
      e = x.e,
      dp = DECIMAL_PLACES + 4,
      half = new BigNumber('0.5');

    // Negative/NaN/Infinity/zero?
    if (s !== 1 || !c || !c[0]) {
      return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
    }

    // Initial estimate.
    s = Math.sqrt(+valueOf(x));

    // Math.sqrt underflow/overflow?
    // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
    if (s == 0 || s == 1 / 0) {
      n = coeffToString(c);
      if ((n.length + e) % 2 == 0) n += '0';
      s = Math.sqrt(+n);
      e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

      if (s == 1 / 0) {
        n = '1e' + e;
      } else {
        n = s.toExponential();
        n = n.slice(0, n.indexOf('e') + 1) + e;
      }

      r = new BigNumber(n);
    } else {
      r = new BigNumber(s + '');
    }

    // Check for zero.
    // r could be zero if MIN_EXP is changed after the this value was created.
    // This would cause a division by zero (x/t) and hence Infinity below, which would cause
    // coeffToString to throw.
    if (r.c[0]) {
      e = r.e;
      s = e + dp;
      if (s < 3) s = 0;

      // Newton-Raphson iteration.
      for (; ;) {
        t = r;
        r = half.times(t.plus(div(x, t, dp, 1)));

        if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

          // The exponent of r may here be one less than the final result exponent,
          // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
          // are indexed correctly.
          if (r.e < e) --s;
          n = n.slice(s - 3, s + 1);

          // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
          // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
          // iteration.
          if (n == '9999' || !rep && n == '4999') {

            // On the first iteration only, check to see if rounding up gives the
            // exact result as the nines may infinitely repeat.
            if (!rep) {
              round(t, t.e + DECIMAL_PLACES + 2, 0);

              if (t.times(t).eq(x)) {
                r = t;
                break;
              }
            }

            dp += 4;
            s += 4;
            rep = 1;
          } else {

            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
            // result. If not, then there are further digits and m will be truthy.
            if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

              // Truncate to the first rounding digit.
              round(r, r.e + DECIMAL_PLACES + 2, 1);
              m = !r.times(r).eq(x);
            }

            break;
          }
        }
      }
    }

    return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
  };


  /*
   * Return a string representing the value of this BigNumber in exponential notation and
   * rounded using ROUNDING_MODE to dp fixed decimal places.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.toExponential = function (dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp++;
    }
    return format(this, dp, rm, 1);
  };


  /*
   * Return a string representing the value of this BigNumber in fixed-point notation rounding
   * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
   *
   * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
   * but e.g. (-0.00001).toFixed(0) is '-0'.
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   */
  P.toFixed = function (dp, rm) {
    if (dp != null) {
      intCheck(dp, 0, MAX);
      dp = dp + this.e + 1;
    }
    return format(this, dp, rm);
  };


  /*
   * Return a string representing the value of this BigNumber in fixed-point notation rounded
   * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
   * of the format or FORMAT object (see BigNumber.set).
   *
   * The formatting object may contain some or all of the properties shown below.
   *
   * FORMAT = {
   *   prefix: '',
   *   groupSize: 3,
   *   secondaryGroupSize: 0,
   *   groupSeparator: ',',
   *   decimalSeparator: '.',
   *   fractionGroupSize: 0,
   *   fractionGroupSeparator: '\xA0',      // non-breaking space
   *   suffix: ''
   * };
   *
   * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   * [format] {object} Formatting options. See FORMAT pbject above.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
   * '[BigNumber Error] Argument not an object: {format}'
   */
  P.toFormat = function (dp, rm, format) {
    var str,
      x = this;

    if (format == null) {
      if (dp != null && rm && typeof rm == 'object') {
        format = rm;
        rm = null;
      } else if (dp && typeof dp == 'object') {
        format = dp;
        dp = rm = null;
      } else {
        format = FORMAT;
      }
    } else if (typeof format != 'object') {
      throw Error
        (bignumberError + 'Argument not an object: ' + format);
    }

    str = x.toFixed(dp, rm);

    if (x.c) {
      var i,
        arr = str.split('.'),
        g1 = +format.groupSize,
        g2 = +format.secondaryGroupSize,
        groupSeparator = format.groupSeparator || '',
        intPart = arr[0],
        fractionPart = arr[1],
        isNeg = x.s < 0,
        intDigits = isNeg ? intPart.slice(1) : intPart,
        len = intDigits.length;

      if (g2) i = g1, g1 = g2, g2 = i, len -= i;

      if (g1 > 0 && len > 0) {
        i = len % g1 || g1;
        intPart = intDigits.substr(0, i);
        for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
        if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
        if (isNeg) intPart = '-' + intPart;
      }

      str = fractionPart
       ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
        ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
         '$&' + (format.fractionGroupSeparator || ''))
        : fractionPart)
       : intPart;
    }

    return (format.prefix || '') + str + (format.suffix || '');
  };


  /*
   * Return an array of two BigNumbers representing the value of this BigNumber as a simple
   * fraction with an integer numerator and an integer denominator.
   * The denominator will be a positive non-zero value less than or equal to the specified
   * maximum denominator. If a maximum denominator is not specified, the denominator will be
   * the lowest value necessary to represent the number exactly.
   *
   * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
   *
   * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
   */
  P.toFraction = function (md) {
    var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
      x = this,
      xc = x.c;

    if (md != null) {
      n = new BigNumber(md);

      // Throw if md is less than one or is not an integer, unless it is Infinity.
      if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
        throw Error
          (bignumberError + 'Argument ' +
            (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
      }
    }

    if (!xc) return new BigNumber(x);

    d = new BigNumber(ONE);
    n1 = d0 = new BigNumber(ONE);
    d1 = n0 = new BigNumber(ONE);
    s = coeffToString(xc);

    // Determine initial denominator.
    // d is a power of 10 and the minimum max denominator that specifies the value exactly.
    e = d.e = s.length - x.e - 1;
    d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
    md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

    exp = MAX_EXP;
    MAX_EXP = 1 / 0;
    n = new BigNumber(s);

    // n0 = d1 = 0
    n0.c[0] = 0;

    for (; ;)  {
      q = div(n, d, 0, 1);
      d2 = d0.plus(q.times(d1));
      if (d2.comparedTo(md) == 1) break;
      d0 = d1;
      d1 = d2;
      n1 = n0.plus(q.times(d2 = n1));
      n0 = d2;
      d = n.minus(q.times(d2 = d));
      n = d2;
    }

    d2 = div(md.minus(d0), d1, 0, 1);
    n0 = n0.plus(d2.times(n1));
    d0 = d0.plus(d2.times(d1));
    n0.s = n1.s = x.s;
    e = e * 2;

    // Determine which fraction is closer to x, n0/d0 or n1/d1
    r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
        div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

    MAX_EXP = exp;

    return r;
  };


  /*
   * Return the value of this BigNumber converted to a number primitive.
   */
  P.toNumber = function () {
    return +valueOf(this);
  };


  /*
   * Return a string representing the value of this BigNumber rounded to sd significant digits
   * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
   * necessary to represent the integer part of the value in fixed-point notation, then use
   * exponential notation.
   *
   * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
   * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
   *
   * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
   */
  P.toPrecision = function (sd, rm) {
    if (sd != null) intCheck(sd, 1, MAX);
    return format(this, sd, rm, 2);
  };


  /*
   * Return a string representing the value of this BigNumber in base b, or base 10 if b is
   * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
   * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
   * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
   * TO_EXP_NEG, return exponential notation.
   *
   * [b] {number} Integer, 2 to ALPHABET.length inclusive.
   *
   * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
   */
  P.toString = function (b) {
    var str,
      n = this,
      s = n.s,
      e = n.e;

    // Infinity or NaN?
    if (e === null) {
      if (s) {
        str = 'Infinity';
        if (s < 0) str = '-' + str;
      } else {
        str = 'NaN';
      }
    } else {
      if (b == null) {
        str = e <= TO_EXP_NEG || e >= TO_EXP_POS
         ? toExponential(coeffToString(n.c), e)
         : toFixedPoint(coeffToString(n.c), e, '0');
      } else if (b === 10) {
        n = round(new BigNumber(n), DECIMAL_PLACES + e + 1, ROUNDING_MODE);
        str = toFixedPoint(coeffToString(n.c), n.e, '0');
      } else {
        intCheck(b, 2, ALPHABET.length, 'Base');
        str = convertBase(toFixedPoint(coeffToString(n.c), e, '0'), 10, b, s, true);
      }

      if (s < 0 && n.c[0]) str = '-' + str;
    }

    return str;
  };


  /*
   * Return as toString, but do not accept a base argument, and include the minus sign for
   * negative zero.
   */
  P.valueOf = P.toJSON = function () {
    return valueOf(this);
  };


  P._isBigNumber = true;

  P[Symbol.toStringTag] = 'BigNumber';

  // Node.js v10.12.0+
  P[Symbol.for('nodejs.util.inspect.custom')] = P.valueOf;

  if (configObject != null) BigNumber.set(configObject);

  return BigNumber;
}


// PRIVATE HELPER FUNCTIONS

// These functions don't need access to variables,
// e.g. DECIMAL_PLACES, in the scope of the `clone` function above.


function bitFloor(n) {
  var i = n | 0;
  return n > 0 || n === i ? i : i - 1;
}


// Return a coefficient array as a string of base 10 digits.
function coeffToString(a) {
  var s, z,
    i = 1,
    j = a.length,
    r = a[0] + '';

  for (; i < j;) {
    s = a[i++] + '';
    z = LOG_BASE - s.length;
    for (; z--; s = '0' + s);
    r += s;
  }

  // Determine trailing zeros.
  for (j = r.length; r.charCodeAt(--j) === 48;);

  return r.slice(0, j + 1 || 1);
}


// Compare the value of BigNumbers x and y.
function compare(x, y) {
  var a, b,
    xc = x.c,
    yc = y.c,
    i = x.s,
    j = y.s,
    k = x.e,
    l = y.e;

  // Either NaN?
  if (!i || !j) return null;

  a = xc && !xc[0];
  b = yc && !yc[0];

  // Either zero?
  if (a || b) return a ? b ? 0 : -j : i;

  // Signs differ?
  if (i != j) return i;

  a = i < 0;
  b = k == l;

  // Either Infinity?
  if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

  // Compare exponents.
  if (!b) return k > l ^ a ? 1 : -1;

  j = (k = xc.length) < (l = yc.length) ? k : l;

  // Compare digit by digit.
  for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

  // Compare lengths.
  return k == l ? 0 : k > l ^ a ? 1 : -1;
}


/*
 * Check that n is a primitive number, an integer, and in range, otherwise throw.
 */
function intCheck(n, min, max, name) {
  if (n < min || n > max || n !== mathfloor(n)) {
    throw Error
     (bignumberError + (name || 'Argument') + (typeof n == 'number'
       ? n < min || n > max ? ' out of range: ' : ' not an integer: '
       : ' not a primitive number: ') + String(n));
  }
}


// Assumes finite n.
function isOdd(n) {
  var k = n.c.length - 1;
  return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
}


function toExponential(str, e) {
  return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
   (e < 0 ? 'e' : 'e+') + e;
}


function toFixedPoint(str, e, z) {
  var len, zs;

  // Negative exponent?
  if (e < 0) {

    // Prepend zeros.
    for (zs = z + '.'; ++e; zs += z);
    str = zs + str;

  // Positive exponent
  } else {
    len = str.length;

    // Append zeros.
    if (++e > len) {
      for (zs = z, e -= len; --e; zs += z);
      str += zs;
    } else if (e < len) {
      str = str.slice(0, e) + '.' + str.slice(e);
    }
  }

  return str;
}


// EXPORT


var BigNumber = clone();

const decimalAssumed = (value) => {
  let n = BigNumber("." + value);
  return n.isFinite() && !n.isNaN() ? n : 0;
};
const dpAParse = (value) => {
  let result =
    (value.slice(0, 1) === "-" ? -1 : 1) *
    decimalAssumed(`${value.slice(1, 6)}e${value.slice(6)}`);
  return result;
};
const whatCentury = (digits) => {
  digits = parseInt(digits);
  return digits || digits === 0
    ? (digits < 50 ? "20" : "19") + digits.toString().padStart(2, 0)
    : null;
};

const tle_map = {
  1: {
    NORAD_CAT_ID: [3, 7],
    CLASSIFICATION_TYPE: [8],
    OBJECT_ID: [10, 18],
    EPOCH: [19, 32],
    MEAN_MOTION_DOT: [34, 43],
    MEAN_MOTION_DDOT: [45, 52],
    BSTAR: [54, 61],
    EPHEMERIS_TYPE: [63],
    ELEMENT_SET_NO: [65, 68],
    CHECKSUM: [69],
  },
  2: {
    NORAD_CAT_ID: [3, 7],
    INCLINATION: [9, 16],
    RA_OF_ASC_NODE: [18, 25],
    ECCENTRICITY: [27, 33],
    ARG_OF_PERICENTER: [35, 42],
    MEAN_ANOMALY: [44, 51],
    MEAN_MOTION: [53, 63],
    REV_AT_EPOCH: [64, 68],
    CHECKSUM: [69],
  },
};

const tle_transform = {
  BSTAR: dpAParse,
  CLASSIFICATION_TYPE: (value) => value,
  OBJECT_ID: (value) => {
    let year = whatCentury(parseInt(value.slice(0, 2)));
    return `${year ? year : "0000"}-${value.slice(2)}`.trim();
  },
  ECCENTRICITY: decimalAssumed,
  MEAN_MOTION_DDOT: dpAParse,
  EPOCH: (value) => {
    value = value.trim();
    let tA = [
      whatCentury(value.slice(0, 2)),
      0,
      parseFloat(value.substr(2)),
      0,
      24,
      0,
      60,
      0,
      60,
      0,
      1000,
    ];
    tA.forEach((v, i) => {
      if (i % 2 && i !== 1) {
        tA[i] = Math.floor(tA[i - 1]);
      } else if (i > 2) {
        tA[i] = tA[i] * (tA[i - 2] - tA[i - 1]);
      }
    });
    tA = tA.filter((v, i) => {
      return i % 2 || i == 0 || i == tA.length - 1;
    });
    return (
      new Date(Date.UTC.apply(0, tA))
        .toISOString()
        .replace(/z/gi, "")
        .split(".")[0] +
      "." +
      parseFloat(tA[tA.length - 1].toFixed(3) * 1000)
        .toString()
        .padStart(6, "0")
    );
  },
};

//https://celestrak.com/NORAD/documentation/spacetrk.pdf
globalThis.bignumber = BigNumber;

class lineReader {
  constructor(reader) {
    this.reader = reader;
    this.processLine = (line) => line;

    this.readLines = async () => {
      async function* rr() {
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
            let remainder = value.substr(startIndex);
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
  constructor(reader) {
    super(reader);
    this.lines = [];
    this._line = [];
    this.processLine = (line) => {
      this._line.push(line);
      let l0 = this._line[0].length;
      let l1 = this._line.length;
      if ((l0 === 24 && l1 === 3) || (l0 >= 68 && l1 === 2)) {
        this.processTLE(this._line);
        this._line = [];
      }
    };
    this.processTLE = (tle) => {
      this.lines.push(tle);
    };
    this.format = {
      RAW: (tle) => tle,
      OMM: (tle) => {
        if (!tle) return;
        let OBJECT_NAME;
        let _OMM = {};
        if (tle.length === 3) {
          OBJECT_NAME = tle[0].trim();
          tle = tle.slice(-2);
        }
        tle.forEach((_line, i) => {
          let tt = tle_map[i + 1];
          for (let prop in tt) {
            let tp = tt[prop];
            let _tp = [];
            _tp = tp.length === 2 ? [tp[0] - 1, tp[1]] : [tp[0] - 1, tp[0]];
            let value = _line.substring(_tp[0], _tp[1]);

            _OMM[prop] = (tle_transform[prop] || BigNumber)(value);

            if (_OMM[prop] instanceof BigNumber)
              _OMM[prop] = _OMM[prop].toNumber();
          }
        });
        if (OBJECT_NAME) _OMM.OBJECT_NAME = OBJECT_NAME;
        return _OMM;
      },
    };
  }
}

const {Readable: ReadableStream} = require$$0__default['default'];

const toReadableStream = input => (
	new ReadableStream({
		read() {
			this.push(input);
			this.push(null);
		}
	})
);

var toReadableStream_1 = toReadableStream;
// TODO: Remove this for the next major release
var _default = toReadableStream;
toReadableStream_1.default = _default;

const { Transform } = require$$0__default['default'];

const [cr] = Buffer.from('\r');
const [nl] = Buffer.from('\n');
const defaults = {
  escape: '"',
  headers: null,
  mapHeaders: ({ header }) => header,
  mapValues: ({ value }) => value,
  newline: '\n',
  quote: '"',
  raw: false,
  separator: ',',
  skipComments: false,
  skipLines: null,
  maxRowBytes: Number.MAX_SAFE_INTEGER,
  strict: false
};

class CsvParser extends Transform {
  constructor (opts = {}) {
    super({ objectMode: true, highWaterMark: 16 });

    if (Array.isArray(opts)) opts = { headers: opts };

    const options = Object.assign({}, defaults, opts);

    options.customNewline = options.newline !== defaults.newline;

    for (const key of ['newline', 'quote', 'separator']) {
      if (typeof options[key] !== 'undefined') {
        ([options[key]] = Buffer.from(options[key]));
      }
    }

    // if escape is not defined on the passed options, use the end value of quote
    options.escape = (opts || {}).escape ? Buffer.from(options.escape)[0] : options.quote;

    this.state = {
      empty: options.raw ? Buffer.alloc(0) : '',
      escaped: false,
      first: true,
      lineNumber: 0,
      previousEnd: 0,
      rowLength: 0,
      quoted: false
    };

    this._prev = null;

    if (options.headers === false) {
      // enforce, as the column length check will fail if headers:false
      options.strict = false;
    }

    if (options.headers || options.headers === false) {
      this.state.first = false;
    }

    this.options = options;
    this.headers = options.headers;
  }

  parseCell (buffer, start, end) {
    const { escape, quote } = this.options;
    // remove quotes from quoted cells
    if (buffer[start] === quote && buffer[end - 1] === quote) {
      start++;
      end--;
    }

    let y = start;

    for (let i = start; i < end; i++) {
      // check for escape characters and skip them
      if (buffer[i] === escape && i + 1 < end && buffer[i + 1] === quote) {
        i++;
      }

      if (y !== i) {
        buffer[y] = buffer[i];
      }
      y++;
    }

    return this.parseValue(buffer, start, y)
  }

  parseLine (buffer, start, end) {
    const { customNewline, escape, mapHeaders, mapValues, quote, separator, skipComments, skipLines } = this.options;

    end--; // trim newline
    if (!customNewline && buffer.length && buffer[end - 1] === cr) {
      end--;
    }

    const comma = separator;
    const cells = [];
    let isQuoted = false;
    let offset = start;

    if (skipComments) {
      const char = typeof skipComments === 'string' ? skipComments : '#';
      if (buffer[start] === Buffer.from(char)[0]) {
        return
      }
    }

    const mapValue = (value) => {
      if (this.state.first) {
        return value
      }

      const index = cells.length;
      const header = this.headers[index];

      return mapValues({ header, index, value })
    };

    for (let i = start; i < end; i++) {
      const isStartingQuote = !isQuoted && buffer[i] === quote;
      const isEndingQuote = isQuoted && buffer[i] === quote && i + 1 <= end && buffer[i + 1] === comma;
      const isEscape = isQuoted && buffer[i] === escape && i + 1 < end && buffer[i + 1] === quote;

      if (isStartingQuote || isEndingQuote) {
        isQuoted = !isQuoted;
        continue
      } else if (isEscape) {
        i++;
        continue
      }

      if (buffer[i] === comma && !isQuoted) {
        let value = this.parseCell(buffer, offset, i);
        value = mapValue(value);
        cells.push(value);
        offset = i + 1;
      }
    }

    if (offset < end) {
      let value = this.parseCell(buffer, offset, end);
      value = mapValue(value);
      cells.push(value);
    }

    if (buffer[end - 1] === comma) {
      cells.push(mapValue(this.state.empty));
    }

    const skip = skipLines && skipLines > this.state.lineNumber;
    this.state.lineNumber++;

    if (this.state.first && !skip) {
      this.state.first = false;
      this.headers = cells.map((header, index) => mapHeaders({ header, index }));

      this.emit('headers', this.headers);
      return
    }

    if (!skip && this.options.strict && cells.length !== this.headers.length) {
      const e = new RangeError('Row length does not match headers');
      this.emit('error', e);
    } else {
      if (!skip) this.writeRow(cells);
    }
  }

  parseValue (buffer, start, end) {
    if (this.options.raw) {
      return buffer.slice(start, end)
    }

    return buffer.toString('utf-8', start, end)
  }

  writeRow (cells) {
    if (this.headers === false || cells.length > this.headers.length) {
      this.headers = cells.map((value, index) => index);
    }

    const row = cells.reduce((o, cell, index) => {
      const header = this.headers[index];
      if (header !== null) {
        o[header] = cell;
      }
      return o
    }, {});

    this.push(row);
  }

  _flush (cb) {
    if (this.state.escaped || !this._prev) return cb()
    this.parseLine(this._prev, this.state.previousEnd, this._prev.length + 1); // plus since online -1s
    cb();
  }

  _transform (data, enc, cb) {
    if (typeof data === 'string') {
      data = Buffer.from(data);
    }

    const { escape, quote } = this.options;
    let start = 0;
    let buffer = data;

    if (this._prev) {
      start = this._prev.length;
      buffer = Buffer.concat([this._prev, data]);
      this._prev = null;
    }

    const bufferLength = buffer.length;

    for (let i = start; i < bufferLength; i++) {
      const chr = buffer[i];
      const nextChr = i + 1 < bufferLength ? buffer[i + 1] : null;

      this.state.rowLength++;
      if (this.state.rowLength > this.options.maxRowBytes) {
        return cb(new Error('Row exceeds the maximum size'))
      }

      if (!this.state.escaped && chr === escape && nextChr === quote && i !== start) {
        this.state.escaped = true;
        continue
      } else if (chr === quote) {
        if (this.state.escaped) {
          this.state.escaped = false;
          // non-escaped quote (quoting the cell)
        } else {
          this.state.quoted = !this.state.quoted;
        }
        continue
      }

      if (!this.state.quoted) {
        if (this.state.first && !this.options.customNewline) {
          if (chr === nl) {
            this.options.newline = nl;
          } else if (chr === cr) {
            if (nextChr !== nl) {
              this.options.newline = cr;
            }
          }
        }

        if (chr === this.options.newline) {
          this.parseLine(buffer, this.state.previousEnd, i + 1);
          this.state.previousEnd = i + 1;
          this.state.rowLength = 0;
        }
      }
    }

    if (this.state.previousEnd === bufferLength) {
      this.state.previousEnd = 0;
      return cb()
    }

    if (bufferLength - this.state.previousEnd < data.length) {
      this._prev = data;
      this.state.previousEnd -= (bufferLength - data.length);
      return cb()
    }

    this._prev = buffer;
    cb();
  }
}

var csvParser = (opts) => new CsvParser(opts);

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
var wrappy_1 = wrappy;
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    var ret = fn.apply(this, args);
    var cb = args[args.length-1];
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }
    return ret
  }
}

var once_1 = wrappy_1(once);
var strict = wrappy_1(onceStrict);

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  });

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  });
});

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  f.called = false;
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f
}
once_1.strict = strict;

var noop = function() {};

var isRequest = function(stream) {
	return stream.setHeader && typeof stream.abort === 'function';
};

var isChildProcess = function(stream) {
	return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
};

var eos = function(stream, opts, callback) {
	if (typeof opts === 'function') return eos(stream, null, opts);
	if (!opts) opts = {};

	callback = once_1(callback || noop);

	var ws = stream._writableState;
	var rs = stream._readableState;
	var readable = opts.readable || (opts.readable !== false && stream.readable);
	var writable = opts.writable || (opts.writable !== false && stream.writable);
	var cancelled = false;

	var onlegacyfinish = function() {
		if (!stream.writable) onfinish();
	};

	var onfinish = function() {
		writable = false;
		if (!readable) callback.call(stream);
	};

	var onend = function() {
		readable = false;
		if (!writable) callback.call(stream);
	};

	var onexit = function(exitCode) {
		callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
	};

	var onerror = function(err) {
		callback.call(stream, err);
	};

	var onclose = function() {
		process.nextTick(onclosenexttick);
	};

	var onclosenexttick = function() {
		if (cancelled) return;
		if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
		if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
	};

	var onrequest = function() {
		stream.req.on('finish', onfinish);
	};

	if (isRequest(stream)) {
		stream.on('complete', onfinish);
		stream.on('abort', onclose);
		if (stream.req) onrequest();
		else stream.on('request', onrequest);
	} else if (writable && !ws) { // legacy streams
		stream.on('end', onlegacyfinish);
		stream.on('close', onlegacyfinish);
	}

	if (isChildProcess(stream)) stream.on('exit', onexit);

	stream.on('end', onend);
	stream.on('finish', onfinish);
	if (opts.error !== false) stream.on('error', onerror);
	stream.on('close', onclose);

	return function() {
		cancelled = true;
		stream.removeListener('complete', onfinish);
		stream.removeListener('abort', onclose);
		stream.removeListener('request', onrequest);
		if (stream.req) stream.req.removeListener('finish', onfinish);
		stream.removeListener('end', onlegacyfinish);
		stream.removeListener('close', onlegacyfinish);
		stream.removeListener('finish', onfinish);
		stream.removeListener('exit', onexit);
		stream.removeListener('end', onend);
		stream.removeListener('error', onerror);
		stream.removeListener('close', onclose);
	};
};

var endOfStream = eos;

// we only need fs to get the ReadStream and WriteStream prototypes

var noop$1 = function () {};
var ancient = /^v?\.0/.test(process.version);

var isFn = function (fn) {
  return typeof fn === 'function'
};

var isFS = function (stream) {
  if (!ancient) return false // newer node version do not need to care about fs is a special way
  if (!fs__default['default']) return false // browser
  return (stream instanceof (fs__default['default'].ReadStream || noop$1) || stream instanceof (fs__default['default'].WriteStream || noop$1)) && isFn(stream.close)
};

var isRequest$1 = function (stream) {
  return stream.setHeader && isFn(stream.abort)
};

var destroyer = function (stream, reading, writing, callback) {
  callback = once_1(callback);

  var closed = false;
  stream.on('close', function () {
    closed = true;
  });

  endOfStream(stream, {readable: reading, writable: writing}, function (err) {
    if (err) return callback(err)
    closed = true;
    callback();
  });

  var destroyed = false;
  return function (err) {
    if (closed) return
    if (destroyed) return
    destroyed = true;

    if (isFS(stream)) return stream.close(noop$1) // use close for fs streams to avoid fd leaks
    if (isRequest$1(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

    if (isFn(stream.destroy)) return stream.destroy()

    callback(err || new Error('stream was destroyed'));
  }
};

var call = function (fn) {
  fn();
};

var pipe = function (from, to) {
  return from.pipe(to)
};

var pump = function () {
  var streams = Array.prototype.slice.call(arguments);
  var callback = isFn(streams[streams.length - 1] || noop$1) && streams.pop() || noop$1;

  if (Array.isArray(streams[0])) streams = streams[0];
  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return
      destroys.forEach(call);
      callback(error);
    })
  });

  return streams.reduce(pipe)
};

var pump_1 = pump;

const {PassThrough: PassThroughStream} = require$$0__default['default'];

var bufferStream = options => {
	options = {...options};

	const {array} = options;
	let {encoding} = options;
	const isBuffer = encoding === 'buffer';
	let objectMode = false;

	if (array) {
		objectMode = !(encoding || isBuffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (isBuffer) {
		encoding = null;
	}

	const stream = new PassThroughStream({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	let length = 0;
	const chunks = [];

	stream.on('data', chunk => {
		chunks.push(chunk);

		if (objectMode) {
			length = chunks.length;
		} else {
			length += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return chunks;
		}

		return isBuffer ? Buffer.concat(chunks, length) : chunks.join('');
	};

	stream.getBufferedLength = () => length;

	return stream;
};

const {constants: BufferConstants} = require$$0__default$3['default'];



class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

async function getStream(inputStream, options) {
	if (!inputStream) {
		return Promise.reject(new Error('Expected a stream'));
	}

	options = {
		maxBuffer: Infinity,
		...options
	};

	const {maxBuffer} = options;

	let stream;
	await new Promise((resolve, reject) => {
		const rejectPromise = error => {
			// Don't retrieve an oversized buffer.
			if (error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH) {
				error.bufferedData = stream.getBufferedValue();
			}

			reject(error);
		};

		stream = pump_1(inputStream, bufferStream(options), error => {
			if (error) {
				rejectPromise(error);
				return;
			}

			resolve();
		});

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				rejectPromise(new MaxBufferError());
			}
		});
	});

	return stream.getBufferedValue();
}

var getStream_1 = getStream;
// TODO: Remove this for the next major release
var _default$1 = getStream;
var buffer = (stream, options) => getStream(stream, {...options, encoding: 'buffer'});
var array = (stream, options) => getStream(stream, {...options, array: true});
var MaxBufferError_1 = MaxBufferError;
getStream_1.default = _default$1;
getStream_1.buffer = buffer;
getStream_1.array = array;
getStream_1.MaxBufferError = MaxBufferError_1;

var neatCsv = async (data, options) => {
	if (typeof data === 'string' || Buffer.isBuffer(data)) {
		data = toReadableStream_1(data);
	}

	// TODO: Use `stream.pipeline` here when targeting Node.js 10
	return getStream_1.array(data.pipe(csvParser(options)));
};

const useAsNumber = ["#/definitions/ephemerisType"]; //Hack until we can formalize fields between each format

const numCheck = (schema, pkey, pval) => {
  let sD = schema.definitions.OMM.properties[pkey];
  return sD?.type === "number" || useAsNumber.indexOf(sD?.$ref) > -1 ? parseFloat(pval) ?? null : pval ?? null;
};

let tagTemplate = (tagName) => new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");

const readOMMXML = (input, schema) => {
  let results = [];
  let xmlOMMArray = input.toString().match(tagTemplate("omm"));
  let schemaTags = Object.keys(schema.definitions.OMM.properties);
  for (let x = 0; x < xmlOMMArray.length; x++) {
    let iOMM = {};
    for (let s = 0; s < schemaTags.length; s++) {
      let tagMatch = [...xmlOMMArray[x].matchAll(tagTemplate(schemaTags[s]))];
      if (tagMatch.length) {
        for (let t = 0; t < tagMatch.length; t++) {
          iOMM[schemaTags[s]] = numCheck(schema, schemaTags[s], tagMatch[t][1]);
        }
      }
    }
    results.push(iOMM);
  }
  return { results };
};

const readOMMJSON = (input, schema) => {
  let results = (JSON.parse(input)).map((r) => {
    for (let p in r) {
      r[p] = numCheck(schema, p, r[p]);
    }
    return r;
  });

  return { results };
};

const readOMMCSV = async (input, schema) => {
  let results = (await neatCsv(input)).map((row) => {
    for (let prop in row) {
      row[prop] = numCheck(schema, prop, row[prop]);
    }
    return row;
  });

  return { results };
};

/*
    let rStream = */

const readTLE = (input, schema) => {
  return new Promise((resolve, reject) => {
    let isRStream = input.hasOwnProperty("_readableState");
    input = isRStream
      ? input
      : {
        data: input,
        init: false,
        async read() {
          if (!this.init) {
            this.init = true;
            return "";
          } else {
            return { value: this.data, done: true };
          }
        },
      };
    let tles = new tle(input);
    let started = false;
    const init = async () => {
      if (started) return;
      started = true;
      let stop = await tles.readLines();
      let results = tles.lines.map(tles.format.OMM);
      let raw = tles.lines;
      resolve({ results, raw });
    };
    if (!isRStream) {
      init();
    } else {
      input.on("readable", init);
    }
  });
};

const transformType = (builder, _value, type) => {
    switch (type) {
        case "number":
            _value = +_value;
            break;
        case "string":
            _value = builder.createString(new Uint8Array(require$$0$3.Buffer.from(_value.toString())));
    }
    return _value;
};
const wrapFlatBuffer = (input = required`input`, schema = required`schema`, fbClass = required`class`, fbCollection, SCOLLECTION, scollBUF) => {
    let schemaKeys = Object.keys(schema.definitions[fbClass.name].properties);
    let results = [];
    if (Array.isArray(input) && input.length) {
        results = input.map((fb) => wrapFlatBuffer(fb, schema, fbClass, fbCollection, false).results[0]);
    } else {
        if (SCOLLECTION && SCOLLECTION.RECORDSLength() > 0) {
            for (let i = 0; i < SCOLLECTION.RECORDSLength(); i++) {
                let result = {};
                Object.defineProperty(result, "flatbuffer", {
                    get() {
                        return SCOLLECTION.RECORDS(i);
                    },
                    configurable: false,
                    enumerable: false
                });
                for (let key in schemaKeys) {
                    let sK = schemaKeys[key];
                    result[sK] = null;
                    if (typeof SCOLLECTION.RECORDS(i)[sK] === "function") {
                        Object.defineProperty(result, sK, {
                            get() {
                                return SCOLLECTION.RECORDS(i)[sK]();
                            },
                        });
                    }
                }
                results.push(result);
            }
        } else {
            try {

                let SFBDATA = fbClass[`getSizePrefixedRootAs${fbClass.name}`](new flatbuffers.ByteBuffer(input));
                let result = {};
                Object.defineProperty(result, "flatbuffer", {
                    get() {
                        return SFBDATA;
                    },
                    configurable: false,
                    enumerable: false
                });
                for (let key in schemaKeys) {
                    let sK = schemaKeys[key];
                    if (typeof SFBDATA[sK] === "function") {
                        Object.defineProperty(result, sK, {
                            enumerable: true,
                            get() {
                                return SFBDATA[sK]();
                            },
                        });
                    }
                }
                results.push(result);
            } catch (e) {
                console.log(e);
            }
        }
    }

    return { results };
};

const readFB = (fileData, schema, fbClass, fbCollection) => {
  let error = false;

  if (!(fileData instanceof Uint8Array)) {
    fileData = new Uint8Array(fileData);
  }

  let wrapInput = false;
  let scollBUF = new flatbuffers.ByteBuffer(fileData);
  let SCOLLECTION = fbCollection[`getRootAs${fbCollection.name}`](scollBUF);

  if (SCOLLECTION.RECORDSLength() === 0) {
    wrapInput = [];
    SCOLLECTION = false;
    /*reset for first read*/
    let tempBuff, startPos, size;

    const resetTemp = () => {
      tempBuff = require$$0$3.Buffer.from("");
      startPos = -1;
      size = -1;
    };

    resetTemp();

    let totalHeaderSize = flatbuffers.SIZE_PREFIX_LENGTH + flatbuffers.FILE_IDENTIFIER_LENGTH;

    fileData = require$$0$3.Buffer.from(fileData);

    if (!fileData.length) {
      error = "Zero length Buffer.";
    }

    for (let d = 0; d < fileData.length; d++) {
      if ((d === 1000 || d === fileData.length - 1) && !wrapInput.length) {
        error = "No $OMM within 1000 chars, you sure this is an OMM?";
        break;
      }
      tempBuff = require$$0$3.Buffer.concat([tempBuff, fileData.slice(d, d + 1)]);

      let idIndex = tempBuff.indexOf("$OMM");

      if (tempBuff.length >= totalHeaderSize && idIndex > -1 && startPos === -1) {
        let id = tempBuff.slice(idIndex, idIndex + flatbuffers.FILE_IDENTIFIER_LENGTH);
        startPos = idIndex - totalHeaderSize;
        size = tempBuff.slice(startPos, idIndex).readInt32LE(0);
      } else if (startPos > -1 && tempBuff.length - startPos === size + 1) {
        /*start over*/
        wrapInput.push(tempBuff.slice(startPos));
        resetTemp();
      }
    }
  }

  if (error) {
    return { results: [], error };
  } else {
    return wrapFlatBuffer(wrapInput, schema, fbClass, fbCollection, SCOLLECTION);
  }
};

const writeFB = (jsonFBDATA = required`jsonFBDATA`, schema = required`schema`, fbClass = required`fbClass`, useCollection = false) => {
  let returnArray;

  if (useCollection) {
    let builder = new flatbuffers.Builder(0);

    let records = jsonFBDATA.map((intermediate) => {
      let transformIntermediate = Object.assign({}, intermediate);
      let props = schema.definitions[fbClass.name].properties;
      for (let prop in transformIntermediate) {
        if (props.hasOwnProperty(prop)) {
          let { type } = props[prop];
          transformIntermediate[prop] = transformType(builder, transformIntermediate[prop], type);
        }
      }
      OMM.startOMM(builder);
      for (let prop in transformIntermediate) {
        if (OMM[`add${prop}`]) {
          OMM[`add${prop}`](builder, transformIntermediate[prop]);
        }
      }
      let BuiltOMM = OMM.endOMM(builder);
      builder.finish(BuiltOMM);
      return BuiltOMM;
    });

    let OMMRECORDS = OMMCOLLECTION.createRECORDSVector(builder, records);

    OMMCOLLECTION.startOMMCOLLECTION(builder);

    OMMCOLLECTION.addRECORDS(builder, OMMRECORDS);

    let COLLECTION = OMMCOLLECTION.endOMMCOLLECTION(builder);

    builder.finish(COLLECTION);

    let buf = builder.dataBuffer();
    let uint8 = builder.asUint8Array();
    let decoder = new TextDecoder("utf8");

    return uint8;
  } else if (Array.isArray(jsonFBDATA)) {
    returnArray = jsonFBDATA.map((fbdata) => writeFB(fbdata, schema, fbClass));
  } else {
    let schemaKeys = Object.keys(schema.definitions[fbClass.name].properties);
    let builder = new flatbuffers.Builder(0);
    let _jsonFBDATA = {};
    for (let k = 0; k < schemaKeys.length; k++) {
      let sK = schemaKeys[k];
      let { type } = schema.definitions[fbClass.name].properties[sK];
      if (jsonFBDATA[sK] ?? false) {
        _jsonFBDATA[sK] = transformType(builder, jsonFBDATA[sK], type);
      }
    }
    fbClass[`start${fbClass.name}`](builder);

    for (let key in _jsonFBDATA) {
      if (schemaKeys.indexOf(key) === -1) continue;
      let addKey = `add${key}`;
      fbClass[addKey](builder, _jsonFBDATA[key]);
    }

    let BuiltFBDATA = fbClass[`end${fbClass.name}`](builder);
    fbClass[`finishSizePrefixed${fbClass.name}Buffer`](builder, BuiltFBDATA);

    let uint8 = builder.asUint8Array();
    return uint8;
  }
  return require$$0$3.Buffer.concat(
    returnArray,
    returnArray.map((n) => n.length).reduce((a, b) => a + b)
  );
};

const readOMM = (data = required`data`, format = "flatbuffer") => {
  let formatters = {
    xml: readOMMXML,
    csv: readOMMCSV,
    json: readOMMJSON,
    tle: readTLE,
    flatbuffer: readFB,
    fb: readFB,
  };
  let formatter = formatters[format] || readFB;

  return formatter(data, schema, OMM, OMMCOLLECTION);
};

const writeOMM = (data = required`data`, format = "json", useCollection = false) => {
  let formatters = {
    xml: readOMMXML,
    csv: readOMMCSV,
    json: false,
    tle: readTLE,
    flatbuffer: readFB,
    fb: readFB,
  };
  if (formatters[format]) {
    data = formatters[format](data);
  }

  return writeFB(data, schema, OMM, useCollection);
};

var btoa = createCommonjsModule(function (module) {
(function () {

  function btoa(str) {
    var buffer;

    if (str instanceof Buffer) {
      buffer = str;
    } else {
      buffer = Buffer.from(str.toString(), 'binary');
    }

    return buffer.toString('base64');
  }

  module.exports = btoa;
}());
});

var Module = (function() {
  var _scriptDir = 'file://src/SGP4Propagator/wasmmodule.mjs';
  
  return (
function(Module) {
  Module = Module || {};

var Module=typeof Module!=="undefined"?Module:{};var readyPromiseResolve,readyPromiseReject;Module["ready"]=new Promise(function(resolve,reject){readyPromiseResolve=resolve;readyPromiseReject=reject;});var __dirname;var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key];}}var arguments_=[];var thisProgram="./this.program";var quit_=function(status,toThrow){throw toThrow};var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof process.versions==="object"&&typeof process.versions.node==="string";ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}return scriptDirectory+path}var read_,readAsync,readBinary;var nodeFS;var nodePath;if(ENVIRONMENT_IS_NODE){if(ENVIRONMENT_IS_WORKER){scriptDirectory=require("path").dirname(scriptDirectory)+"/";}else {scriptDirectory=__dirname+"/";}read_=function shell_read(filename,binary){var ret=tryParseAsDataURI(filename);if(ret){return binary?ret:ret.toString()}if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);return nodeFS["readFileSync"](filename,binary?null:"utf8")};readBinary=function readBinary(filename){var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret);}assert(ret.buffer);return ret};if(process["argv"].length>1){thisProgram=process["argv"][1].replace(/\\/g,"/");}arguments_=process["argv"].slice(2);process["on"]("uncaughtException",function(ex){if(!(ex instanceof ExitStatus)){throw ex}});process["on"]("unhandledRejection",abort);quit_=function(status){process["exit"](status);};Module["inspect"]=function(){return "[Emscripten Module object]"};}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){read_=function shell_read(f){var data=tryParseAsDataURI(f);if(data){return intArrayToString(data)}return read(f)};}readBinary=function readBinary(f){var data;data=tryParseAsDataURI(f);if(data){return data}if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){arguments_=scriptArgs;}else if(typeof arguments!="undefined"){arguments_=arguments;}if(typeof quit==="function"){quit_=function(status){quit(status);};}if(typeof print!=="undefined"){if(typeof console==="undefined")console={};console.log=print;console.warn=console.error=typeof printErr!=="undefined"?printErr:print;}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href;}else if(typeof document!=="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src;}if(_scriptDir){scriptDirectory=_scriptDir;}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1);}else {scriptDirectory="";}{read_=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText}catch(err){var data=tryParseAsDataURI(url);if(data){return intArrayToString(data)}throw err}};if(ENVIRONMENT_IS_WORKER){readBinary=function(url){try{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}catch(err){var data=tryParseAsDataURI(url);if(data){return data}throw err}};}readAsync=function(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}var data=tryParseAsDataURI(url);if(data){onload(data.buffer);return}onerror();};xhr.onerror=onerror;xhr.send(null);};}}else;var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.warn.bind(console);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key];}}moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];var noExitRuntime=Module["noExitRuntime"]||true;if(typeof WebAssembly!=="object"){abort("no native wasm support detected");}var wasmMemory;var ABORT=false;function assert(condition,text){if(!condition){abort("Assertion failed: "+text);}}function getCFunc(ident){var func=Module["_"+ident];assert(func,"Cannot call unknown function "+ident+", make sure it is exported");return func}function ccall(ident,returnType,argTypes,args,opts){var toC={"string":function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=stackAlloc(len);stringToUTF8(str,ret,len);}return ret},"array":function(arr){var ret=stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}};function convertReturnValue(ret){if(returnType==="string")return UTF8ToString(ret);if(returnType==="boolean")return Boolean(ret);return ret}var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=stackSave();cArgs[i]=converter(args[i]);}else {cArgs[i]=args[i];}}}var ret=func.apply(null,cArgs);ret=convertReturnValue(ret);if(stack!==0)stackRestore(stack);return ret}function cwrap(ident,returnType,argTypes,opts){argTypes=argTypes||[];var numericArgs=argTypes.every(function(type){return type==="number"});var numericRet=returnType!=="string";if(numericRet&&numericArgs&&!opts){return getCFunc(ident)}return function(){return ccall(ident,returnType,argTypes,arguments)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(heap,idx,maxBytesToRead){var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heap[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heap.subarray&&UTF8Decoder){return UTF8Decoder.decode(heap.subarray(idx,endPtr))}else {var str="";while(idx<endPtr){var u0=heap[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heap[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heap[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2;}else {u0=(u0&7)<<18|u1<<12|u2<<6|heap[idx++]&63;}if(u0<65536){str+=String.fromCharCode(u0);}else {var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023);}}}return str}function UTF8ToString(ptr,maxBytesToRead){return ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):""}function stringToUTF8Array(str,heap,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343){var u1=str.charCodeAt(++i);u=65536+((u&1023)<<10)|u1&1023;}if(u<=127){if(outIdx>=endIdx)break;heap[outIdx++]=u;}else if(u<=2047){if(outIdx+1>=endIdx)break;heap[outIdx++]=192|u>>6;heap[outIdx++]=128|u&63;}else if(u<=65535){if(outIdx+2>=endIdx)break;heap[outIdx++]=224|u>>12;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;}else {if(outIdx+3>=endIdx)break;heap[outIdx++]=240|u>>18;heap[outIdx++]=128|u>>12&63;heap[outIdx++]=128|u>>6&63;heap[outIdx++]=128|u&63;}}heap[outIdx]=0;return outIdx-startIdx}function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127)++len;else if(u<=2047)len+=2;else if(u<=65535)len+=3;else len+=4;}return len}function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer);}function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i);}if(!dontAddNull)HEAP8[buffer>>0]=0;}function alignUp(x,multiple){if(x%multiple>0){x+=multiple-x%multiple;}return x}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferAndViews(buf){buffer=buf;Module["HEAP8"]=HEAP8=new Int8Array(buf);Module["HEAP16"]=HEAP16=new Int16Array(buf);Module["HEAP32"]=HEAP32=new Int32Array(buf);Module["HEAPU8"]=HEAPU8=new Uint8Array(buf);Module["HEAPU16"]=HEAPU16=new Uint16Array(buf);Module["HEAPU32"]=HEAPU32=new Uint32Array(buf);Module["HEAPF32"]=HEAPF32=new Float32Array(buf);Module["HEAPF64"]=HEAPF64=new Float64Array(buf);}var INITIAL_MEMORY=Module["INITIAL_MEMORY"]||100663296;var wasmTable;var __ATPRERUN__=[];var __ATINIT__=[];var __ATPOSTRUN__=[];function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift());}}callRuntimeCallbacks(__ATPRERUN__);}function initRuntime(){callRuntimeCallbacks(__ATINIT__);}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift());}}callRuntimeCallbacks(__ATPOSTRUN__);}function addOnPreRun(cb){__ATPRERUN__.unshift(cb);}function addOnInit(cb){__ATINIT__.unshift(cb);}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb);}var runDependencies=0;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies);}if(runDependencies==0){if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback();}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};function abort(what){if(Module["onAbort"]){Module["onAbort"](what);}what+="";err(what);ABORT=true;what="abort("+what+"). Build with -s ASSERTIONS=1 for more info.";var e=new WebAssembly.RuntimeError(what);readyPromiseReject(e);throw e}var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return filename.startsWith(dataURIPrefix)}function isFileURI(filename){return filename.startsWith("file://")}var wasmBinaryFile="data:application/octet-stream;base64,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QQZHDQALQcyJASEBAkACQAJAIAYOAgIAAQsgBCgCCEHMOkcNAEHkiQEhAQwBC0EYEBsiAUUNACABIAQpAwg3AgAgASAEKQMYNwIQIAEgBCkDEDcCCAsgBEEgaiQAQdC3ASABNgIAQdS3ARAfC0HQtwEoAgALmAsCBX8PfiMAQeAAayIFJAAgAkIghiABQiCIhCEPIARCL4YgA0IRiIQhDCAEQv///////z+DIg1CD4YgA0IxiIQhECACIASFQoCAgICAgICAgH+DIQogAkL///////8/gyILQiCIIREgDUIRiCESIARCMIinQf//AXEhBwJAAn8gAkIwiKdB//8BcSIJQQFrQf3/AU0EQEEAIAdBAWtB/v8BSQ0BGgsgAVAgAkL///////////8AgyIOQoCAgICAgMD//wBUIA5CgICAgICAwP//AFEbRQRAIAJCgICAgICAIIQhCgwCCyADUCAEQv///////////wCDIgJCgICAgICAwP//AFQgAkKAgICAgIDA//8AURtFBEAgBEKAgICAgIAghCEKIAMhAQwCCyABIA5CgICAgICAwP//AIWEUARAIAIgA4RQBEBCgICAgICA4P//ACEKQgAhAQwDCyAKQoCAgICAgMD//wCEIQpCACEBDAILIAMgAkKAgICAgIDA//8AhYRQBEAgASAOhCECQgAhASACUARAQoCAgICAgOD//wAhCgwDCyAKQoCAgICAgMD//wCEIQoMAgsgASAOhFAEQEIAIQEMAgsgAiADhFAEQEIAIQEMAgsgDkL///////8/WARAIAVB0ABqIAEgCyABIAsgC1AiBht5IAZBBnStfKciBkEPaxAtIAUpA1giC0IghiAFKQNQIgFCIIiEIQ8gC0IgiCERQRAgBmshBgsgBiACQv///////z9WDQAaIAVBQGsgAyANIAMgDSANUCIIG3kgCEEGdK18pyIIQQ9rEC0gBSkDSCICQg+GIAUpA0AiA0IxiIQhECACQi+GIANCEYiEIQwgAkIRiCESIAYgCGtBEGoLIQYgDEL/////D4MiAiABQv////8PgyIBfiITIANCD4ZCgID+/w+DIgMgD0L/////D4MiDn58IgRCIIYiDSABIAN+fCIMIA1UrSACIA5+IhUgAyALQv////8PgyILfnwiFCAQQv////8PgyINIAF+fCIQIAQgE1St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AQEEfyMAQRBrIgEkACABQQA2AgwgASAANgIEIAEgADYCACABIABBAWo2AgggASEDIwBBEGsiBCQAAn8gBEEIaiIAIAMoAgQ2AgAgACgCAC0AAEULBEACfwJAIAMoAggiAi0AACIAQQFHBH8gAEECcQ0BIAJBAjoAAEEBBUEACwwBCwALIQILIARBEGokACABQRBqJAAgAgsNACAAKAIAEI0CGiAACw0AIAAoAgAQmwIaIAALCQAgACABEI4CC6MEAgR+An8CQAJAIAG9IgRCAYYiA1ANACAEQv///////////wCDQoCAgICAgID4/wBWDQAgAL0iBUI0iKdB/w9xIgZB/w9HDQELIAAgAaIiACAAow8LAn4CQCADIAVCAYYiAlQEQCAEQjSIp0H/D3EhByAGRQRAIAVCDIYiAkIAUwRAQQAhBgwDC0F/IQYDQCACQgGGIgJCAFMNAyAGQQFrIQYMAAsACyAFQv////////8Hg0KAgICAgICACIQMAgsgAEQAAAAAAAAAAKIgACACIANRGw8LIAVBASAGa62GCyECAn4CQCAHRQRAIARCDIYiA0IAUwRAQQAhBwwCC0F/IQcDQCADQgGGIgNCAFMNAiAHQQFrIQcMAAsACyAEQv////////8Hg0KAgICAgICACIQMAQsgBEEBIAdrrYYLIQQgBiAHSgRAA0ACQCACIAR9IgNCAFMNACADIgJCAFINACAARAAAAAAAAAAAog8LIAJCAYYhAiAGQQFrIgYgB0oNAAsgByEGCwJAIAIgBH0iA0IAUw0AIAMiAkIAUg0AIABEAAAAAAAAAACiDwsCQCACQv////////8HVgRAIAIhAwwBCwNAIAZBAWshBiACQoCAgICAgIAEVCEHIAJCAYYiAyECIAcNAAsLIAVCgICAgICAgICAf4MhAiAGQQFOBH4gA0KAgICAgICACH0gBq1CNIaEBSADQQEgBmutiAsgAoS/CwkAIAAgARCcAgsFABABAAsYACAALQAAQSBxRQRAIAEgAiAAELIBGgsLGwAgAEEBIAAbIQACQCAAEBsiAA0AEAEACyAAC1IBAX8jAEEQayICJAAgAC0AC0EHdgRAIAAoAgAQDwsgACABKAIINgIIIAAgASkCADcCACABQQA6AAsgAkEAOgAPIAEgAi0ADzoAACACQRBqJAALaAEBfyMAQRBrIgUkACAFIAI2AgwgBSAENgIIIAUgBUEMahA+IQIgACABIAMgBSgCCBBzIQEgAigCACIABEBBmJkBKAIAGiAABEBBmJkBQbS2ASAAIABBf0YbNgIACwsgBUEQaiQAIAEL4AEBA38CQAJ/IAAtAAtBB3YEQCAAKAIEDAELIAAtAAsLRQ0AIAIgAWtBBUgNACABIAIQgwEgAkEEayEEAn8gAC0AC0EHdgRAIAAoAgQMAQsgAC0ACwsCfyAALQALQQd2BEAgACgCAAwBCyAACyICaiEGAkADQAJAIAIsAAAiAEEBayEFIAEgBE8NACAFQf8BcUH9AE0EQCABKAIAIABHDQMLIAJBAWogAiAGIAJrQQFKGyECIAFBBGohAQwBCwsgBUH/AXFB/QBLDQEgBCgCAEEBayAASQ0BCyADQQQ2AgALC4QBAQJ/IwBBEGsiASQAAkAgAL1CIIinQf////8HcSICQfvDpP8DTQRAIAJBgICA8gNJDQEgAEQAAAAAAAAAAEEAEK4CIQAMAQsgAkGAgMD/B08EQCAAIAChIQAMAQsgACABELMBIQIgASsDACABKwMIIAJBAXEQrgIhAAsgAUEQaiQAIAALUAEBfgJAIANBwABxBEAgASADQUBqrYYhAkIAIQEMAQsgA0UNACACIAOtIgSGIAFBwAAgA2utiIQhAiABIASGIQELIAAgATcDACAAIAI3AwgLDAAgACABEI4CQQFzCwwAIAAgARCcAkEBcwvyAgICfwF+AkAgAkUNACAAIAJqIgNBAWsgAToAACAAIAE6AAAgAkEDSQ0AIANBAmsgAToAACAAIAE6AAEgA0EDayABOgAAIAAgAToAAiACQQdJDQAgA0EEayABOgAAIAAgAToAAyACQQlJDQAgAEEAIABrQQNxIgRqIgMgAUH/AXFBgYKECGwiATYCACADIAIgBGtBfHEiBGoiAkEEayABNgIAIARBCUkNACADIAE2AgggAyABNgIEIAJBCGsgATYCACACQQxrIAE2AgAgBEEZSQ0AIAMgATYCGCADIAE2AhQgAyABNgIQIAMgATYCDCACQRBrIAE2AgAgAkEUayABNgIAIAJBGGsgATYCACACQRxrIAE2AgAgBCADQQRxQRhyIgRrIgJBIEkNACABrUKBgICAEH4hBSADIARqIQEDQCABIAU3AxggASAFNwMQIAEgBTcDCCABIAU3AwAgAUEgaiEBIAJBIGsiAkEfSw0ACwsgAAtvAQF/IwBBgAJrIgUkAAJAIARBgMAEcQ0AIAIgA0wNACAFIAFB/wFxIAIgA2siAkGAAiACQYACSSIBGxAwGiABRQRAA0AgACAFQYACECcgAkGAAmsiAkH/AUsNAAsLIAAgBSACECcLIAVBgAJqJAALCgAgAEHwxQEQRgvLCQIEfwR+IwBB8ABrIgUkACAEQv///////////wCDIQoCQAJAIAFCAX0iC0J/USACQv///////////wCDIgkgASALVq18QgF9IgtC////////v///AFYgC0L///////+///8AURtFBEAgA0IBfSILQn9SIAogAyALVq18QgF9IgtC////////v///AFQgC0L///////+///8AURsNAQsgAVAgCUKAgICAgIDA//8AVCAJQoCAgICAgMD//wBRG0UEQCACQoCAgICAgCCEIQQgASEDDAILIANQIApCgICAgICAwP//AFQgCkKAgICAgIDA//8AURtFBEAgBEKAgICAgIAghCEEDAILIAEgCUKAgICAgIDA//8AhYRQBEBCgICAgICA4P//ACACIAEgA4UgAiAEhUKAgICAgICAgIB/hYRQIgYbIQRCACABIAYbIQMMAgsgAyAKQoCAgICAgMD//wCFhFANASABIAmEUARAIAMgCoRCAFINAiABIAODIQMgAiAEgyEEDAILIAMgCoRQRQ0AIAEhAyACIQQMAQsgAyABIAEgA1QgCSAKVCAJIApRGyIHGyEKIAQgAiAHGyILQv///////z+DIQkgAiAEIAcbIgJCMIinQf//AXEhCCALQjCIp0H//wFxIgZFBEAgBUHgAGogCiAJIAogCSAJUCIGG3kgBkEGdK18pyIGQQ9rEC0gBSkDaCEJIAUpA2AhCkEQIAZrIQYLIAEgAyAHGyEDIAJC////////P4MhBCAIRQRAIAVB0ABqIAMgBCADIAQgBFAiBxt5IAdBBnStfKciB0EPaxAtQRAgB2shCCAFKQNYIQQgBSkDUCEDCyAEQgOGIANCPYiEQoCAgICAgIAEhCEEIAlCA4YgCkI9iIQhCSACIAuFIQwCfiADQgOGIgEgBiAIayIHRQ0AGiAHQf8ASwRAQgAhBEIBDAELIAVBQGsgASAEQYABIAdrEC0gBUEwaiABIAQgBxBcIAUpAzghBCAFKQMwIAUpA0AgBSkDSIRCAFKthAshAiAJQoCAgICAgIAEhCEJIApCA4YhAwJAIAxCf1cEQCADIAJ9IgEgCSAEfSACIANWrX0iBIRQBEBCACEDQgAhBAwDCyAEQv////////8DVg0BIAVBIGogASAEIAEgBCAEUCIHG3kgB0EGdK18p0EMayIHEC0gBiAHayEGIAUpAyghBCAFKQMgIQEMAQsgAiADfCIBIAJUrSAEIAl8fCIEQoCAgICAgIAIg1ANACABQgGDIARCP4YgAUIBiISEIQEgBkEBaiEGIARCAYghBAsgC0KAgICAgICAgIB/gyECIAZB//8BTgRAIAJCgICAgICAwP//AIQhBEIAIQMMAQsgBkEBTgR+IAatBSAFQRBqIAEgBCAGQf8AahAtIAUgASAEQQEgBmsQXCAFKQMAIAUpAxAgBSkDGIRCAFKthCEBIAUpAwghBEIACyEKIAGnQQdxIgZBBEutIARCPYYgAUIDiIQiAXwiAyABVK0gBEIDiEL///////8/gyAKQjCGhCAChHwhBAJAIAZBBEYEQCAEIANCAYMiASADfCIDIAFUrXwhBAwBCyAGRQ0BCwsgACADNwMAIAAgBDcDCCAFQfAAaiQACwoAIABB4MUBEEYLgwQBA38gAkGABE8EQCAAIAEgAhAJGiAADwsgACACaiEDAkAgACABc0EDcUUEQAJAIABBA3FFBEAgACECDAELIAJBAUgEQCAAIQIMAQsgACECA0AgAiABLQAAOgAAIAFBAWohASACQQFqIgJBA3FFDQEgAiADSQ0ACwsCQCADQXxxIgRBwABJDQAgAiAEQUBqIgVLDQADQCACIAEoAgA2AgAgAiABKAIENgIEIAIgASgCCDYCCCACIAEoAgw2AgwgAiABKAIQNgIQIAIgASgCFDYCFCACIAEoAhg2AhggAiABKAIcNgIcIAIgASgCIDYCICACIAEoAiQ2AiQgAiABKAIoNgIoIAIgASgCLDYCLCACIAEoAjA2AjAgAiABKAI0NgI0IAIgASgCODYCOCACIAEoAjw2AjwgAUFAayEBIAJBQGsiAiAFTQ0ACwsgAiAETw0BA0AgAiABKAIANgIAIAFBBGohASACQQRqIgIgBEkNAAsMAQsgA0EESQRAIAAhAgwBCyAAIANBBGsiBEsEQCAAIQIMAQsgACECA0AgAiABLQAAOgAAIAIgAS0AAToAASACIAEtAAI6AAIgAiABLQADOgADIAFBBGohASACQQRqIgIgBE0NAAsLIAIgA0kEQANAIAIgAS0AADoAACABQQFqIQEgAkEBaiICIANHDQALCyAACywAIAJFBEAgACgCBCABKAIERg8LIAAgAUYEQEEBDwsgACgCBCABKAIEEHFFC2QAIAIoAgRBsAFxIgJBIEYEQCABDwsCQCACQRBHDQACQAJAIAAtAAAiAkEraw4DAAEAAQsgAEEBag8LIAEgAGtBAkgNACACQTBHDQAgAC0AAUEgckH4AEcNACAAQQJqIQALIAALOQEBfyMAQRBrIgEkACABAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAs2AgggASgCCCEAIAFBEGokACAAC34CAn8BfiMAQRBrIgMkACAAAn4gAUUEQEIADAELIAMgASABQR91IgJqIAJzIgKtQgAgAmciAkHRAGoQLSADKQMIQoCAgICAgMAAhUGegAEgAmutQjCGfCABQYCAgIB4ca1CIIaEIQQgAykDAAs3AwAgACAENwMIIANBEGokAAsEAEEAC2kBA34gACACQiCIIgMgAUIgiCIEfiACQv////8PgyICIAFC/////w+DIgF+IgVCIIggAiAEfnwiAkIgiHwgASADfiACQv////8Pg3wiAUIgiHw3AwggACAFQv////8PgyABQiCGhDcDAAsHACAAEBAaCz8CAn8BfiAAIAE3A3AgACAAKAIIIgIgACgCBCIDa6wiBDcDeCAAIAMgAadqIAIgASAEUxsgAiABQgBSGzYCaAs9AQF/QZiZASgCACECIAEoAgAiAQRAQZiZAUG0tgEgASABQX9GGzYCAAsgAEF/IAIgAkG0tgFGGzYCACAAC9YPAwV8CH8CfkQAAAAAAADwPyECAkACQAJAIAG9Ig9CIIinIgxB/////wdxIgcgD6ciCnJFDQAgAL0iEKchDUEAIBBCIIinIg5BgIDA/wNGIA0bDQACQAJAIA5B/////wdxIghBgIDA/wdLDQAgCEGAgMD/B0YgDUEAR3ENACAHQYCAwP8HSw0AIAdBgIDA/wdHDQEgCkUNAQsgACABoA8LAkACQAJ/AkAgEEJ/VQ0AQQIgB0H///+ZBEsNARogB0GAgMD/A0kNACAHQRR2IQsg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BAJAIABCAFIgAUL///////////8AgyIFQoCAgICAgMD//wBWIAVCgICAgICAwP//AFEbDQAgAkIAUiADQv///////////wCDIgZCgICAgICAwP//AFYgBkKAgICAgIDA//8AURsNACAAIAKEIAUgBoSEUARAQQAPCyABIAODQgBZBEBBfyEEIAAgAlQgASADUyABIANRGw0BIAAgAoUgASADhYRCAFIPC0F/IQQgACACViABIANVIAEgA1EbDQAgACAChSABIAOFhEIAUiEECyAEC4MBAgN/AX4CQCAAQoCAgIAQVARAIAAhBQwBCwNAIAFBAWsiASAAQgqAIgVCdn4gAHynQTByOgAAIABC/////58BViECIAUhACACDQALCyAFpyICBEADQCABQQFrIgEgAkEKbiIDQXZsIAJqQTByOgAAIAJBCUshBCADIQIgBA0ACwsgAQsoAQF/IwBBEGsiAyQAIAMgAjYCDCAAIAEgAhCyAiEAIANBEGokACAAC1ABAX4CQCADQcAAcQRAIAIgA0FAaq2IIQFCACECDAELIANFDQAgAkHAACADa62GIAEgA60iBIiEIQEgAiAEiCECCyAAIAE3AwAgACACNwMICw4AIAAgASABEKMCEN8BC80BAQZ/IwBBEGsiBCQAIAEoAgAhB0EAIAAoAgAiCCAAKAIEQQpGIgUbIAIoAgAgACgCAGsiA0EBdCIGQQQgBhtBfyADQf////8HSRsiBhBkIgMEQCAFRQRAIAAoAgAaIABBADYCAAsgBEEINgIEIAAgBEEIaiADIARBBGoQHSIAEPMBIQUgACgCACEDIABBADYCACADBEAgAyAAKAIEEQEACyABIAUoAgAgByAIa2o2AgAgAiAFKAIAIAZBfHFqNgIAIARBEGokAA8LECYAC2MCAX8BfiMAQRBrIgIkACAAAn4gAUUEQEIADAELIAIgAa1CACABZyIBQdEAahAtIAIpAwhCgICAgICAwACFQZ6AASABa61CMIZ8IQMgAikDAAs3AwAgACADNwMIIAJBEGokAAuEAwEDfyMAQRBrIgskACALIAA2AgwCQAJAAkAgAygCACIKIAJHDQBBKyEMIAAgCSgCYEcEQEEtIQwgCSgCZCAARw0BCyADIAJBAWo2AgAgAiAMOgAADAELAkACfyAGLQALQQd2BEAgBigCBAwBCyAG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////AIMiA0KAgICAgIDAgDx9IANCgICAgICAwP/DAH1UBEAgAUIEhiAAQjyIhCEDIABC//////////8PgyIAQoGAgICAgICACFoEQCADQoGAgICAgICAwAB8IQIMAgsgA0KAgICAgICAgEB9IQIgAEKAgICAgICAgAiFQgBSDQEgAiADQgGDfCECDAELIABQIANCgICAgICAwP//AFQgA0KAgICAgIDA//8AURtFBEAgAUIEhiAAQjyIhEL/////////A4NCgICAgICAgPz/AIQhAgwBC0KAgICAgICA+P8AIQIgA0L///////+//8MAVg0AQgAhAiADQjCIpyIFQZH3AEkNACAEQRBqIAAgAUL///////8/g0KAgICAgIDAAIQiAiAFQYH3AGsQLSAEIAAgAkGB+AAgBWsQXCAEKQMIQgSGIAQpAwAiAEI8iIQhAiAEKQMQIAQpAxiEQgBSrSAAQv//////////D4OEIgBCgYCAgICAgIAIWgRAIAJCAXwhAgwBCyAAQoCAgICAgICACIVCAFINACACQgGDIAJ8IQILIARBIGokACACIAFCgICAgICAgICAf4OEvwutBAEBfyMAQRBrIgwkACAMIAA6AA8CQAJAIAAgBUYEQCABLQAARQ0BQQAhACABQQA6AAAgBCAEKAIAIgFBAWo2AgAgAUEuOgAAAn8gBy0AC0EHdgRAIAcoAgQMAQsgBy0ACwtFDQIgCSgCACIBIAhrQZ8BSg0CIAooAgAhAiAJIAFBBGo2AgAgASACNgIADAILAkAgACAGRw0AAn8gBy0AC0EHdgRAIAcoAgQMAQsgBy0ACwtFDQAgAS0AAEUNAUEAIQAgCSgCACIBIAhrQZ8BSg0CIAooAgAhACAJIAFBBGo2AgAgASAANgIAQQAhACAKQQA2AgAMAgtBfyEAIAsgC0EgaiAMQQ9qEKUBIAtrIgVBH0oNASAFQcDaAGotAAAhBgJAAkACQAJAIAVBFmsOBAEBAAACCyADIAQoAgAiAUcEQCABQQFrLQAAQd8AcSACLQAAQf8AcUcNBQsgBCABQQFqNgIAIAEgBjoAAEEAIQAMBAsgAkHQADoAAAwBCyACLAAAIgAgBkHfAHFHDQAgAiAAQYABcjoAACABLQAARQ0AIAFBADoAAAJ/IActAAtBB3YEQCAHKAIEDAELIActAAsLRQ0A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IQUgAgRAIAEgASgCBEEBazYCBAsgBQ0ACwwDCwtBwJ0BQRw2AgAgAUIAED0LQgAhFAsgACAVNwMAIAAgFDcDCCAMQTBqJAALQwACQCAARQ0AAkACQAJAAkAgAUECag4GAAECAgQDBAsgACACPAAADwsgACACPQEADwsgACACPgIADwsgACACNwMACwt/AgF/AX4gAL0iA0I0iKdB/w9xIgJB/w9HBHwgAkUEQCABIABEAAAAAAAAAABhBH9BAAUgAEQAAAAAAADwQ6IgARC6ASEAIAEoAgBBQGoLNgIAIAAPCyABIAJB/gdrNgIAIANC/////////4eAf4NCgICAgICAgPA/hL8FIAALC7UBAQF/IAFBAEchAgJAAkACQCAAQQNxRQ0AIAFFDQADQCAALQAARQ0CIAFBAWsiAUEARyECIABBAWoiAEEDcUUNASABDQALCyACRQ0BIAAtAABFDQAgAUEESQ0AA0AgACgCACICQX9zIAJBgYKECGtxQYCBgoR4cQ0BIABBBGohACABQQRrIgFBA0sNAAsLIAFFDQADQCAALQAARQRAIAAPCyAAQQFqIQAgAUEBayIBDQALC0EAC8oGAgR/A34jAEGAAWsiBSQAAkACQAJAIAMgBEIAQgAQWUUNAAJ/IARC////////P4MhCQJ/IARCMIinQf//AXEiBkH//wFHBEBBBCAGDQEaQQJBAyADIAmEUBsMAgsgAyAJhFALC0UNACACQjCIpyIIQf//AXEiBkH//wFHDQELIAVBEGogASACIAMgBBAXIAUgBSkDECIBIAUpAxgiAiABIAIQwQEgBSkDCCECIAUpAwAhBAwBCyABIAJC////////P4MgBq1CMIaEIgogAyAEQv///////z+DIARCMIinQf//AXEiB61CMIaEIgkQWUEATARAIAEgCiADIAkQWQRAIAEhBAwCCyAFQfAAaiABIAJCAEIAEBcgBSkDeCECIAUpA3AhBAwBCyAGBH4gAQUgBUHgAGogASAKQgBCgICAgICAwLvAABAXIAUpA2giCkIwiKdB+ABrIQYgBSkDYAshBCAHRQRAIAVB0ABqIAMgCUIAQoCAgICAgMC7wAAQFyAFKQNYIglCMIinQfgAayEHIAUpA1AhAwsgCUL///////8/g0KAgICAgIDAAIQhCSAKQv///////z+DQoCAgICAgMAAhCEKIAYgB0oEQANAAn4gCiAJfSADIARWrX0iC0IAWQRAIAsgBCADfSIEhFAEQCAFQSBqIAEgAkIAQgAQFyAFKQMoIQIgBSkDICEEDAULIAtCAYYgBEI/iIQMAQsgCkIBhiAEQj+IhAshCiAEQgGGIQQgBkEBayIGIAdKDQALIAchBgsCQCAKIAl9IAMgBFatfSIJQgBTBEAgCiEJDAELIAkgBCADfSIEhEIAUg0AIAVBMGogASACQgBCABAXIAUpAzghAiAFKQMwIQQMAQsgCUL///////8/WARAA0AgBEI/iCEBIAZBAWshBiAEQgGGIQQgASAJQgGGhCIJQoCAgICAgMAAVA0ACwsgCEGAgAJxIQcgBkEATARAIAVBQGsgBCAJQv///////z+DIAZB+ABqIAdyrUIwhoRCAEKAgICAgIDAwz8QFyAFKQNIIQIgBSkDQCEEDAELIAlC////////P4MgBiAHcq1CMIaEIQILIAAgBDcDACAAIAI3AwggBUGAAWokAAu7AgACQCABQRRLDQACQAJAAkACQAJAAkACQAJAAkACQCABQQlrDgoAAQIDBAUGBwgJCgsgAiACKAIAIgFBBGo2AgAgACABKAIANgIADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABMgEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMwEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMAAANwMADwsgAiACKAIAIgFBBGo2AgAgACABMQAANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKwMAOQMADwsgACACQQURAgALCzsBA38gACgCACEBA0AgASwAACIDQTBrQQpJBEAgACABQQFqIgE2AgAgAkEKbCADakEwayECDAELCyACCxEAIABFBEBBAA8LIAAgARBVC3wBAn8gACAALQBKIgFBAWsgAXI6AEogACgCFCAAKAIcSwRAIABBAEEAIAAoAiQRAwAaCyAAQQA2AhwgAEIANwMQIAAoAgAiAUEEcQRAIAAgAUEgcjYCAEF/DwsgACAAKAIsIAAoAjBqIgI2AgggACACNgIEIAFBG3RBH3UL+BACBX8LfiMAQcABayIFJAAgBEL///////8/gyESIAJC////////P4MhDCACIASFQoCAgICAgICAgH+DIREgBEIwiKdB//8BcSEHAkACQAJAIAJCMIinQf//AXEiCUEBa0H9/wFNBEAgB0EBa0H+/wFJDQELIAFQIAJC////////////AIMiCkKAgICAgIDA//8AVCAKQoCAgICAgMD//wBRG0UEQCACQoCAgICAgCCEIREMAgsgA1AgBEL///////////8AgyICQoCAgICAgMD//wBUIAJCgICAgICAwP//AFEbRQRAIARCgICAgICAIIQhESADIQEMAgsgASAKQoCAgICAgMD//wCFhFAEQCADIAJCgICAgICAwP//AIWEUARAQgAhAUKAgICAgIDg//8AIREMAwsgEUKAgICAgIDA//8AhCERQgAhAQwCCyADIAJCgICAgICAwP//AIWEUARAQgAhAQwCCyABIAqEUA0CIAIgA4RQBEAgEUKAgICAgIDA//8AhCERQgAhAQwCCyAKQv///////z9YBEAgBUGwAWogASAMIAEgDCAMUCIGG3kgBkEGdK18pyIGQQ9rEC1BECAGayEGIAUpA7gBIQwgBSkDsAEhAQsgAkL///////8/Vg0AIAVBoAFqIAMgEiADIBIgElAiCBt5IAhBBnStfKciCEEPaxAtIAYgCGpBEGshBiAFKQOoASESIAUpA6ABIQMLIAVBkAFqIBJCgICAgICAwACEIhRCD4YgA0IxiIQiAkKEyfnOv+a8gvUAIAJ9IgQQOyAFQYABakIAIAUpA5gBfSAEEDsgBUHwAGogBSkDiAFCAYYgBSkDgAFCP4iEIgQgAhA7IAVB4ABqIARCACAFKQN4fRA7IAVB0ABqIAUpA2hCAYYgBSkDYEI/iIQiBCACEDsgBUFAayAEQgAgBSkDWH0QOyAFQTBqIAUpA0hCAYYgBSkDQEI/iIQiBCACEDsgBUEgaiAEQgAgBSkDOH0QOyAFQRBqIAUpAyhCAYYgBSkDIEI/iIQiBCACEDsgBSAEQgAgBSkDGH0QOyAGIAkgB2tqIQYCfkIAIAUpAwhCAYYgBSkDAEI/iIRCAX0iCkL/////D4MiBCACQiCIIgt+Ig4gCkIgiCIKIAJC/////w+DIg9+fCICQiCIIAIgDlStQiCGhCAKIAt+fCACQiCGIgsgBCAPfnwiAiALVK0gAiACIAQgA0IRiEL/////D4MiDn4iDyAKIANCD4ZCgID+/w+DIg1+fCILQiCGIhAgBCANfnwgEFStIAogDn4gCyAPVK1CIIYgC0IgiIR8fHwiAlatfHwgAkIAUq18fSILQv////8PgyIOIAR+Ig8gCiAOfiINIAQgC0IgiCIQfnwiC0IghnwiDiAPVK0gCiAQfiALIA1UrUIghiALQiCIhHx8IA5CACACfSICQiCIIgsgBH4iDyACQv////8PgyINIAp+fCICQiCGIhAgBCANfnwgEFStIAogC34gAiAPVK1CIIYgAkIgiIR8fHwiAiAOVK18IAJCAn0iDyACVK18QgF9IgtC/////w+DIgIgDEIChiABQj6IhEL/////D4MiBH4iDiABQh6IQv////8PgyIKIAtCIIgiC358Ig0gDlStIA0gDSAPQiCIIg4gDEIeiEL//+//D4NCgIAQhCIMfnwiDVatfCALIAx+fCACIAx+IhMgBCALfnwiECATVK1CIIYgEEIgiIR8IA0gDSAQQiCGfCINVq18IA0gDSAKIA5+IhMgD0L/////D4MiDyAEfnwiECATVK0gECAQIAIgAUIChkL8////D4MiE358IhBWrXx8Ig1WrXwgDSALIBN+IgsgDCAPfnwiDCAEIA5+fCIEIAIgCn58IgJCIIggAiAEVK0gCyAMVq0gBCAMVK18fEIghoR8IgQgDVStfCAEIAQgECAOIBN+IgwgCiAPfnwiCkIgiCAKIAxUrUIghoR8IgogEFStIAogAkIghnwgClStfHwiBFatfCICQv////////8AWARAIAFCMYYgBEIgiCIBIANC/////w+DIgp+Ig0gBEL/////D4MiDCADQiCIIgt+fCIOQiCGIhAgCiAMfnwiDyAQVK19IA9CAFKtfSACQv////8PgyAKfiAMIBJC/////w+DfnwgASALfnwgDSAOVq1CIIYgDkIgiIR8IAQgFEIgiH4gAyACQiCIfnwgAiALfnwgASASfnxCIIZ8fSESIAZBAWshBkIAIA99DAELIARCIYghDCABQjCGIAJCP4YgBEIBiIQiBEL/////D4MiASADQiCIIgp+Ig8gDCACQh+GhCINQv////8PgyIQIANC/////w+DIgx+fCILQiCGIhMg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IAAtAD5BIEYEQCAAQTA6AD4LIAAtAERBIEYEQCAAQTA6AEQLIAMgAjYCZCADIAJBsAZqNgKQASADIAJBrAZqNgKMASADIAJB4AVqNgKEASADIAJB0AVqNgJ8IAMgAkHYBWo2AnggAyACQbgFajYCdCADIAJBBGo2AnAgAyADQZQBajYCiAEgAyADQZgBajYCgAEgAyACQaEGajYCbCADIAJBoAZqNgJoIAMgA0GcAWo2AmAgAEGACCADQeAAahBbGiACQbQGaiEAIAJBmAZqIQQgAkGQBmohBiACQYgGaiEFIAJBgAZqIQcgAkH4BWohCCACQfAFaiEJAkAgAS0ANEEgRgRAIAMgADYCICADIAQ2AhwgAyAGNgIYIAMgBTYCFCADIAc2AhAgAyAINgIMIAMgCTYCCCADIAI2AgQgAyADQZwBajYCACABQb4IIAMQWxoMAQsgAyAANgJQIAMgBDYCTCADIAY2AkggAyAFNgJEIANBQGsgBzYCACADIAg2AjwgAyAJNgI4IAMgAjYCNCADIANBnAFqNgIwIAFB7QggA0EwahBbGgsgAiACKwOYBkT4wWMa3KVsQKMiDjkDmAYgAisD4AUhCkQAAAAAAAAkQCADKAKUAbcQPyELIAIrA9AFIQ0gAygCmAEhACACIAogC6IiDzkD4AUgAiACKwPYBURiJI7CniQUQaMiEDkD2AUgAiANRAAAAAAAACRAIAC3ED+iRCrjl0F/U7xBoyINOQPQBSACIAIrA/AFRDmdUqJG35E/oiIROQPwBSACIAIrA/gFRDmdUqJG35E/oiISOQP4BSACIAIrA4gGRDmdUqJG35E/oiITOQOIBiACIAIrA5AGRDmdUqJG35E/oiIUOQOQBiACKwO4BSEKIAIoAgQhACADQfAJKAIANgLQASADQegJKQMANwPIASADQeAJKQMANwPAASADQdgJKQMANwO4ASADQdAJKQMANwOwASADQcgJKQMANwOoASADQcAJKQMANwOgASAAQdAPQewOIABBOUgbaiIHQQNxIQACfyAKnCILmUQAAAAAAADgQWMEQCALqgwBC0GAgICAeAshBSAARQRAIANBHTYCqAELQQAhAUEBIQQDQCAFIAEiBiADQaABaiAEIgBBAnRqKAIAaiIBSgRAIABBAWohBCAAQQxJDQELCyACIABBkwJst0QAAAAA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AAAAAADQv6IgCqKioCIWEBIhASARIAsgDiASRAAAAAAAAPg/oiISoiIRoqAiDhASIQogDhARIQ4gECAPIBGioiAJoCIVEBIhESAWEBEhCSAAKwOQByEWIAIgACsDiAcgDUQAAAAAAADwPyAXIBKiIBSioaIgECATRAAAAAAAAOA/oiAIoqKgIg8gCSARIA6aoiINoiAKIAGioCISoqI5AwAgAiAAKwOIByAPIAkgCiARoiIRoiAOIAGioCIXoqI5AwggAiAPIAkgFRARIhWiIhuiIAArA4gHojkDECADIAwgGCALIBogE6IiEyAIoqIgFqOhIgsgG6IgGSATIBREAAAAAAAA+D+iIBAgCKKgoiAWo6AiCCAVIAGioqCiOQMQIAMgDCALIBeiIAggESABoiAOIAmioaKgojkDCCADIAwgCyASoiAIIA0gAaIgCiAJoqGioKI5AwBBBiEFIA9EAAAAAAAA8D9jRQ0BCyAAIAU2AgwLIARB4ABqJAALCQAgABCXARAPCwkAIAAQFjYCAAsaAAJAIAAgAUYEQCAAQQA6AHAMAQsgARAPCwsoAAJ/AkAgAC0AcA0AIAFBHEsNACAAQQE6AHAgAAwBCyABQQJ0ECgLC0sBA38jAEEQayIAJAAgAEH/////AzYCDCAAQf////8HNgIIIABBCGoiASAAQQxqIgIgASgCACACKAIASRsoAgAhASAAQRBqJAAgAQubAQEDfyMAQRBrIgQkACACQXBJBEACQCACQQpNBEAgACACOgALIAAhAwwBCyAAIAJBC08EfyACQRBqQXBxIgMgA0EBayIDIANBC0YbBUEKC0EBaiIFECgiAzYCACAAIAVBgICAgHhyNgIIIAAgAjYCBAsgAyABIAIQSCEAIARBADoADyAAIAJqIAQtAA86AAAgBEEQaiQADwsQTQALcgECfyMAQRBrIgEkACABQbDEATYCACABQbTEASgCACICNgIEIAEgAiAAQQJ0ajYCCCABKAIEIQADQCABKAIIIABHBEAgAEEANgIAIAEgASgCBEEEaiIANgIEDAELCyABKAIAIAEoAgQ2AgQgAUEQaiQACwQAQX8L8QcBCn8jAEEQayIUJAAgAiAANgIAIANBgARxIRcDQCAVQQRGBEACfyANLQALQQd2BEAgDSgCBAwBCyANLQALC0EBSwRAIBQgDRA4NgIIIAICfyMAQRBrIgQkACAEIBQoAgg2AgggBCAEKAIIQQRqNgIIIAQoAgghBSAEQRBqJAAgBQsgDRBRIAIoAgAQfDYCAAsgA0GwAXEiA0EQRwRAIAEgA0EgRgR/IAIoAgAFIAALNgIACyAUQRBqJAAFAkACQAJAAkACQAJAIAggFWosAAAOBQABAwIEBQsgASACKAIANgIADAQLIAEgAigCADYCACAGQSAgBigCACgCLBEEACEPIAIgAigCACIQQQRqNgIAIBAgDzYCAAwDCwJ/IA0tAAtBB3YEQCANKAIEDAELIA0tAAsLRQ0CAn8gDS0AC0EHdgRAIA0oAgAMAQsgDQsoAgAhDyACIAIoAgAiEEEEajYCACAQIA82AgAMAgsCfyAMLQALQQd2BEAgDCgCBAwBCyAMLQALC0UNASAXRQ0BIAIgDBA4IAwQUSACKAIAEHw2AgAMAQsgAigCACEYIARBBGogBCAHGyIEIREDQAJAIAUgEU0NACAGQYAQIBEoAgAgBigCACgCDBEDAEUNACARQQRqIREMAQsLIA4iEkEBTgRAA0ACQCAEIBFPDQAgEkEBSA0AIBFBBGsiESgCACEPIAIgAigCACIQQQRqNgIAIBAgDzYCACASQQFrIRIMAQsLIBJBAUgEf0EABSAGQTAgBigCACgCLBEEAAshEyACKAIAIQ8DQCAPQQRqIRAgEkEBTgRAIA8gEzYCACASQQFrIRIgECEPDAELCyACIBA2AgAgDyAJNgIACwJAIAQgEUYEQCAGQTAgBigCACgCLBEEACEPIAIgAigCACIQQQRqIhE2AgAgECAPNgIADAELQX8hEwJ/IAstAAtBB3YEQCALKAIEDAELIAstAAsLBEACfyALLQALQQd2BEAgCygCAAwBCyALCywAACETC0EAIRZBACEPA0AgBCARRwRAAkAgFiIQIBNHBEAgEEEBaiEWIAIoAgAhEgwBCyACIAIoAgAiE0EEaiISNgIAIBMgCjYCAEEBIRYCfyALLQALQQd2BEAgCygCBAwBCyALLQALCyAPQQFqIg9NBEAgECETDAELQX8hEwJ/IAstAAtBB3YEQCALKAIADAELIAsLIA9qLQAAQf8ARg0AAn8gCy0AC0EHdgRAIAsoAgAMAQsgCwsgD2osAAAhEwsgEUEEayIRKAIAIRAgAiASQQRqNgIAIBIgEDYCAAwBCwsgAigCACERCyAYIBEQgwELIBVBAWohFQwBCwsLxQMBAX8jAEEQayIKJAAgCQJ/IAAEQCACEPABIQACQCABBEAgCiAAIAAoAgAoAiwRAgAgAyAKKAIANgAAIAogACAAKAIAKAIgEQIADAELIAogACAAKAIAKAIoEQIAIAMgCigCADYAACAKIAAgACgCACgCHBECAAsgCCAKEEAgChAYGiAEIAAgACgCACgCDBEAADYCACAFIAAgACgCACgCEBEAADYCACAKIAAgACgCACgCFBECACAGIAoQKSAKEA0aIAogACAAKAIAKAIYEQIAIAcgChBAIAoQGBogACAAKAIAKAIkEQAADAELIAIQ7wEhAAJAIAEEQCAKIAAgACgCACgCLBECACADIAooAgA2AAAgCiAAIAAoAgAoAiARAgAMAQsgCiAAIAAoAgAoAigRAgAgAyAKKAIANgAAIAogACAAKAIAKAIcEQIACyAIIAoQQCAKEBgaIAQgACAAKAIAKAIMEQAANgIAIAUgACAAKAIAKAIQEQAANgIAIAogACAAKAIAKAIUEQIAIAYgChApIAoQDRogCiAAIAAoAgAoAhgRAgAgByAKEEAgChAYGiAAIAAoAgAoAiQRAAALNgIAIApBEGokAAv+BwEKfyMAQRBrIhMkACACIAA2AgAgA0GABHEhFgNAIBRBBEYEQAJ/IA0tAAtBB3YEQCANKAIEDAELIA0tAAsLQQFLBEAgEyANEDg2AgggAgJ/IwBBEGsiBCQAIAQgEygCCDYCCCAEIAQoAghBAWo2AgggBCgCCCEFIARBEGokACAFCyANEFMgAigCABB8NgIACyADQbABcSIDQRBHBEAgASADQSBGBH8gAigCAAUgAAs2AgALIBNBEGokAA8LAkACQAJAAkACQAJAIAggFGosAAAOBQABAwIEBQsgASACKAIANgIADAQLIAEgAigCADYCACAGQSAgBigCACgCHBEEACEPIAIgAigCACIQQQFqNgIAIBAgDzoAAAwDCwJ/IA0tAAtBB3YEQCANKAIEDAELIA0tAAsLRQ0CAn8gDS0AC0EHdgRAIA0oAgAMAQsgDQstAAAhDyACIAIoAgAiEEEBajYCACAQIA86AAAMAgsCfyAMLQALQQd2BEAgDCgCBAwBCyAMLQALC0UNASAWRQ0BIAIgDBA4IAwQUyACKAIAEHw2AgAMAQsgBEEBaiAEIAcbIgQgBSAEIAVLGyESIAIoAgAhFyAEIQ8DQAJAAkAgBSAPSwRAIA8sAAAiEEEATgR/IAYoAgggEEH/AXFBAXRqLwEAQYAQcQVBAAsNASAPIRILIA4iD0EBTgRAA0ACQCAEIBJPDQAgD0EBSA0AIBJBAWsiEi0AACEQIAIgAigCACIRQQFqNgIAIBEgEDoAACAPQQFrIQ8MAQsLIA9BAUgEf0EABSAGQTAgBigCACgCHBEEAAshEQNAIAIgAigCACIQQQFqNgIAIA9BAU4EQCAQIBE6AAAgD0EBayEPDAELCyAQIAk6AAALIAQgEkYEQCAGQTAgBigCACgCHBEEACEPIAIgAigCACIQQQFqNgIAIBAgDzoAAAwCC0F/IRECfyALLQALQQd2BEAgCygCBAwBCyALLQALCwRAAn8gCy0AC0EHdgRAIAsoAgAMAQsgCwssAAAhEQtBACEVQQAhDwNAIAQgEkYNAgJAIBUiECARRwRAIBBBAWohFQwBC0EBIRUgAiACKAIAIhFBAWo2AgAgESAKOgAAAn8gCy0AC0EHdgRAIAsoAgQMAQsgCy0ACwsgD0EBaiIPTQRAIBAhEQwBC0F/IRECfyALLQALQQd2BEAgCygCAAwBCyALCyAPai0AAEH/AEYNAAJ/IAstAAtBB3YEQCALKAIADAELIAsLIA9qLAAAIRELIBJBAWsiEi0AACEQIAIgAigCACIYQQFqNgIAIBggEDoAAAwACwALIA9BAWohDwwBCwsgFyACKAIAEFgLIBRBAWohFAwACwALxQMBAX8jAEEQayIKJAAgCQJ/IAAEQCACEPUBIQACQCABBEAgCiAAIAAoAgAoAiwRAgAgAyAKKAIANgAAIAogACAAKAIAKAIgEQIADAELIAogACAAKAIAKAIoEQIAIAMgCigCADYAACAKIAAgACgCACgCHBECAAsgCCAKECkgChANGiAEIAAgACgCACgCDBEAADoAACAFIAAgACgCACgCEBEAADoAACAKIAAgACgCACgCFBECACAGIAoQKSAKEA0aIAogACAAKAIAKAIYEQIAIAcgChApIAoQDRogACAAKAIAKAIkEQAADAELIAIQ9AEhAAJAIAEEQCAKIAAgACgCACgCLBECACADIAooAgA2AAAgCiAAIAAoAgAoAiARAgAMAQsgCiAAIAAoAgAoAigRAgAgAyAKKAIANgAAIAogACAAKAIAKAIcEQIACyAIIAoQKSAKEA0aIAQgACAAKAIAKAIMEQAAOgAAIAUgACAAKAIAKAIQEQAAOgAAIAogACAAKAIAKAIUEQIAIAYgChApIAoQDRogCiAAIAAoAgAoAhgRAgAgByAKECkgChANGiAAIAAoAgAoAiQRAAALNgIAIApBEGokAAv8AQEDfyMAQRBrIgUkAEHv////AyEGIAJB7////wMgAWtNBEACfyAALQALQQd2BEAgACgCAAwBCyAACyEHAn8gAUHm////AU0EQCAFIAFBAXQ2AgggBSABIAJqNgIMIAVBCGogBUEMaiAFKAIMIAUoAghJGygCACICQQJPBH8gAkEEakF8cSICIAJBAWsiAiACQQJGGwVBAQtBAWohBgsgBgsQbiECIAQEQCACIAcgBBBJCyADIARrIgMEQCACIARBAnQiBGogBCAHaiADEEkLIAFBAUcEQCAHEA8LIAAgAjYCACAAIAZBgICAgHhyNgIIIAVBEGokAA8LEE0ACwoAIABBkLcBEEYLCgAgAEGYtwEQRgsfAQF/IAEoAgAQjQIhAiAAIAEoAgA2AgQgACACNgIAC98XAQ9/IwBBsARrIgskACALIAo2AqQEIAsgATYCqAQgC0EKNgJgIAsgC0GIAWogC0GQAWogC0HgAGoQHSISKAIAIgE2AoQBIAsgAUGQA2o2AoABIAtB4ABqEBAhEyALQdAAahAQIRAgC0FAaxAQIQwgC0EwahAQIQ0gC0EgahAQIREjAEEQayIKJAAgCwJ/IAIEQCAKIAMQ8AEiAiIDIAMoAgAoAiwRAgAgCyAKKAIANgB4IAogAiACKAIAKAIgEQIAIA0gChBAIAoQGBogCiACIAIoAgAoAhwRAgAgDCAKEEAgChAYGiALIAIgAigCACgCDBEAADYCdCALIAIgAigCACgCEBEAADYCcCAKIAIgAigCACgCFBECACATIAoQKSAKEA0aIAogAiACKAIAKAIYEQIAIBAgChBAIAoQGBogAiACKAIAKAIkEQAADAELIAogAxDvASICIgMgAygCACgCLBECACALIAooAgA2AHggCiACIAIoAgAoAiARAgAgDSAKEEAgChAYGiAKIAIgAigCACgCHBECACAMIAoQQCAKEBgaIAsgAiAC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RgvKAQEGfyMAQRBrIgQkACABKAIAIQdBACAAKAIAIgggACgCBEEKRiIFGyACKAIAIAAoAgBrIgNBAXQiBkEBIAYbQX8gA0H/////B0kbIgYQZCIDBEAgBUUEQCAAKAIAGiAAQQA2AgALIARBCDYCBCAAIARBCGogAyAEQQRqEB0iABDzASEFIAAoAgAhAyAAQQA2AgAgAwRAIAMgACgCBBEBAAsgASAFKAIAIAcgCGtqNgIAIAIgBiAFKAIAajYCACAEQRBqJAAPCxAmAAslAQF/IAEoAgAQmwJBGHRBGHUhAiAAIAEoAgA2AgQgACACOgAAC8EVAQ9/IwBBsARrIgskACALIAo2AqQEIAsgATYCqAQgC0EKNgJoIAsgC0GIAWogC0GQAWogC0HoAGoQHSISKAIAIgE2AoQBIAsgAUGQA2o2AoABIAtB6ABqEBAhEyALQdgAahAQIRAgC0HIAGoQECEMIAtBOGoQECENIAtBKGoQECERIwBBEGsiCiQAIAsCfyACBEAgCiADEPUBIgIiAyADKAIAKAIsEQIAIAsgCigCADYAeCAKIAIgAigCACgCIBECACANIAoQKSAKEA0aIAogAiACKAIAKAIcEQIAIAwgChApIAoQDRogCyACIAIoAgAoAgwRAAA6AHcgCyACIAIoAgAoAhARAAA6AHYgCiACIAIoAgAoAhQRAgAgEyAKECkgChANGiAKIAIgAigCACgCGBECACAQIAoQKSAKEA0aIAIgAigCACgCJBEAAAwBCyAKIAMQ9AEiAiIDIAMoAgAoAiwRAgAgCyAKKAIANgB4IAogAiACKAIAKAIgEQIAIA0gChApIAoQDRogCiACIAIoAgAoAhwRAgAgDCAKECkgChANGiALIAIgAigCACgCDBEAADoAdyALIAIgAigCACgCEBEAADoAdiAKIAIgAigCACgCFBECACATIAoQKSAKEA0aIAogAiACKAIAKAIYEQIAIBAgChApIAoQDRogAiACKAIAKAIkEQAACzYCJCAKQRBqJAAgCSAIKAIANgIAIARBgARxIhRBCXYhFSALKAIkIQ8gCy0AeyEWIAstAHYhFyALLQB3IRhBACEKA0ACQAJAAkACQAJAIApBBEYNACAAIAtBqARqEC9FDQBBACEEAkACQAJAAkACQAJAAkAgC0H4AGogCmosAAAOBQEABAMF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AyAFIAWgoKIgBSAFRAAAAAAAABhAoqIgBEQAAAAAAAAoQKIgAqIgAUQAAAAAAAAIQKKgoKBEmpmZmZmZyT+iOQOgAQsgC0QAAAAAAAAAACBXQSBqIFcQ4QEgC0HuADoAESBXQUBrJAALDgAgACACQf8BcSABEDALNQAjAEEQayIBJAAgAEEBOgALIABBAUEtEPsBIQAgAUEAOgAPIAAgAS0ADzoAASABQRBqJAALbQEBfyMAQRBrIgYkACAGQQA6AA8gBiAFOgAOIAYgBDoADSAGQSU6AAwgBQRAIAYtAA0hBCAGIAYtAA46AA0gBiAEOgAOCyACIAEgAigCACABayAGQQxqIAMgACgCABACIAFqNgIAIAZBEGokAAtBACABIAIgAyAEQQQQQSEBIAMtAABBBHFFBEAgACABQdAPaiABQewOaiABIAFB5ABIGyABQcUASBtB7A5rNgIACwtAACACIAMgAEEIaiAAKAIIKAIEEQAAIgAgAEGgAmogBSAEQQAQggEgAGsiAEGfAkwEQCABIABBDG1BDG82AgALC0AAIAIgAyAAQQhqIAAoAggoAgARAAAiACAAQagBaiAFIARBABCCASAAayIAQacBTARAIAEgAEEMbUEHbzYCAAsLQQAgASACIAMgBEEEEEIhASADLQAAQQRxRQRAIAAgAUHQD2ogAUHsDmogASABQeQASBsgAUHFAEgbQewOazYCAAsLQAAgAiADIABBCGogACgCCCgCBBEAACIAIABBoAJqIAUgBEEAEIQBIABrIgBBnwJMBEAgASAAQQxtQQxvNgIACwtAACACIAMgAEEIaiAAKAIIKAIAEQAAIgAgAEGoAWogBSAEQQAQhAEgAGsiAEGnAUwEQCABIABBDG1BB282AgALCwQAQQIL1QIBAn8CQCAAIAFGDQAgASAAIAJqIgRrQQAgAkEBdGtNBEAgACABIAIQNRoPCyAAIAFzQQNxIQMCQAJAIAAgAUkEQCADDQIgAEEDcUUNAQNAIAJFDQQgACABLQAAOgAAIAFBAWohASACQQFrIQIgAEEBaiIAQQNxDQALDAELAkAgAw0AIARBA3EEQANAIAJFDQUgACACQQFrIgJqIgMgASACai0AADoAACADQQNxDQALCyACQQNNDQADQCAAIAJBBGsiAmogASACaigCADYCACACQQNLDQALCyAC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AEHQAWogAEEQaiAAQQxqIAcQYA0AIABB2AJqECEaDAELCyAAKAIMIQICQAJ/IAAtANsBQQd2BEAgACgC1AEMAQsgAC0A2wELRQ0AIAIgAEEQamtBnwFKDQAgAiAAKAIINgIAIAJBBGohAgsgBSADIAAoArwBIAQgBhCVAjYCACAAQdABaiAAQRBqIAIgBBArIABB2AJqIABB0AJqECMEQCAEIAQoAgBBAnI2AgALIAAoAtgCIQIgARANGiAAQdABahANGiAAQeACaiQAIAILSwECfyAAKAIAIgEEQAJ/IAEoAgwiAiABKAIQRgRAIAEgASgCACgCJBEAAAwBCyACKAIAC0F/RwRAIAAoAgBFDwsgAEEANgIAC0EBCzEBAX8gACgCDCIBIAAoAhBGBEAgACAAKAIAKAIoEQAADwsgACABQQRqNgIMIAEoAgALEAAgABCMAiABEIwCc0EBcwu0AwIDfwF+IwBBIGsiAyQAAkAgAUL///////////8AgyIFQoCAgICAgMDAP30gBUKAgICAgIDAv8AAfVQEQCABQhmIpyEEIABQIAFC////D4MiBUKAgIAIVCAFQoCAgAhRG0UEQCAEQYGAgIAEaiECDAILIARBgICAgARqIQIgACAFQoCAgAiFhEIAUg0BIAIgBEEBcWohAgwBCyAAUCAFQoCAgICAgMD//wBUIAVCgICAgICAwP//AFEbRQRAIAFCGYinQf///wFxQYCAgP4HciECDAELQYCAgPwHIQIgBUL///////+/v8AAVg0AQQAhAiAFQjCIpyIEQZH+AEkNACADQRBqIAAgAUL///////8/g0KAgICAgIDAAIQiBSAEQYH+AGsQLSADIAAgBUGB/wAgBGsQXCADKQMIIgBCGYinIQIgAykDACADKQMQIAMpAxiEQgBSrYQiBVAgAEL///8PgyIAQoCAgAhUIABCgICACFEbRQRAIAJBAWohAgwBCyAFIABCgICACIWEQgBSDQAgAkEBcSACaiECCyADQSBqJAAgAiABQiCIp0GAgICAeHFyvgtpAQF/IwBBEGsiAyQAIAMgATYCDCADIAI2AgggAyADQQxqED4hASAAQeHaACADKAIIELICIQIgASgCACIABEBBmJkBKAIAGiAABEBBmJkBQbS2ASAAIABBf0YbNgIACwsgA0EQaiQAIAILpQICBX8EfiMAQSBrIgQkAAJAAkACQCABIAJHBEBBwJ0BKAIAIQhBwJ0BQQA2AgAjAEEQayIFJAAQFhojAEEQayIGJAAjAEEQayIHJAAgByABIARBHGpBAhC0ASAGIAcpAwA3AwAgBiAHKQMINwMIIAdBEGokACAFIAYpAwA3AwAgBSAGKQMINwMIIAZBEGokACAEIAUpAwA3AwAgBCAFKQMINwMIIAVBEGokACAEKQMIIQkgBCkDACEKQcCdASgCACIBRQ0BIAQoAhwgAkcNAiAKIQsgCSEMIAFBxABHDQMMAgsgA0EENgIADAILQcCdASAINgIAIAQoAhwgAkYNAQsgA0EENgIAIAshCiAMIQkLIAAgCjcDACAAIAk3AwggBEEgaiQAC7YBAgJ8A38jAEEQayIFJAACQAJAAkAgACABRwRAQcCdASgCACEHQcCdAUEANgIAEBYaIwBBEGsiBiQAIAYgACAFQQxqQQEQtAEgBikDACAGKQMIEKEBIQMgBkEQaiQAQcCdASgCACIARQ0BIAUoAgwgAUcNAiADIQQgAEHEAEcNAwwCCyACQQQ2AgAMAgtBwJ0BIAc2AgAgBSgCDCABRg0BCyACQQQ2AgAgBCEDCyAFQRBqJAAgAwu2AQICfQN/IwBBEGsiBSQAAkACQAJAIAAgAUcEQEHAnQEoAgAhB0HAnQFBADYCABAWGiMAQRBrIgYkACAGIAAgBUEMakEAELQBIAYpAwAgBikDCBCPAiEDIAZBEGokAEHAnQEoAgAiAEUNASAFKAIMIAFHDQIgAyEEIABBxABHDQMMAgsgAkEENgIADAILQcCdASAHNgIAIAUoAgwgAUYNAQsgAkEENgIAIAQhAwsgBUEQaiQAIAMLwQECA38BfiMAQRBrIgQkAAJ+IAAgAUcEQAJAAkAgAC0AACIFQS1HDQAgAEEBaiIAIAFHDQAMAQtBwJ0BKAIAIQZBwJ0BQQA2AgAQFhogACAEQQxqIAMQpgEhBwJAQcCdASgCACIABEAgBCgCDCABRw0CIABBxABHDQEgAkEENgIAQn8MBAtBwJ0BIAY2AgAgBCgCDCABRg0ADAELQgAgB30gByAFQS1GGwwCCwsgAkEENgIAQgALIQcgBEEQaiQAIAcL4gECA38BfiMAQRBrIgQkAAJ/AkAgACABRwRAAkACQCAALQAAIgVBLUcNACAAQQFqIgAgAUcNAAwBC0HAnQEoAgAhBkHAnQFBADYCABAWGiAAIARBDGogAxCmASEHAkBBwJ0BKAIAIgAEQCAEKAIMIAFHDQIgAEHEAEYNASAHQv////8PVg0BDAQLQcCdASAGNgIAAkAgBCgCDCABRg0ADAILIAdCgICAgBBUDQMLIAJBBDYCAEF/DAMLCyACQQQ2AgBBAAwBC0EAIAenIgBrIAAgBUEtRhsLIQAgBEEQaiQAIAALiQQBAn8jAEHwAWsiACQAIAAgAjYC4AEgACABNgLoASADEEUhBiAAQdABaiADIABB3wFqEG0gAEHAAWoQECIBIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQDiAAAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsiAzYCvAEgACAAQRBqNgIMIABBADYCCCAALADfASEHA0ACQCAAQegBaiAAQeABahAvRQ0AIAAoArwBIAMCfyABLQALQQd2BEAgASgCBAwBCyABLQALCyICakYEQCABIAJBAXQQDiABIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQDiAAAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsiAyACajYCvAELIABB6AFqEB4gBiADIABBvAFqIABBCGogByAAQdABaiAAQRBqIABBDGpBwNoAEGINACAAQegBahAiGgwBCwsgACgCDCECAkACfyAALQDbAUEHdgRAIAAoAtQBDAELIAAtANsBC0UNACACIABBEGprQZ8BSg0AIAIgACgCCDYCACACQQRqIQILIAUgAyAAKAK8ASAEIAYQlQI2AgAgAEHQAWogAEEQaiACIAQQKyAAQegBaiAAQeABahAlBEAgBCAEKAIAQQJyNgIACyAAKALoASECIAEQDRogAEHQAWoQDRogAEHwAWokACACC+UBAgN/AX4jAEEQayIEJAACfwJAIAAgAUcEQAJAAkAgAC0AACIFQS1HDQAgAEEBaiIAIAFHDQAMAQtBwJ0BKAIAIQZBwJ0BQQA2AgAQFhogACAEQQxqIAMQpgEhBwJAQcCdASgCACIABEAgBCgCDCABRw0CIABBxABGDQEgB0L//wNWDQEMBAtBwJ0BIAY2AgACQCAEKAIMIAFGDQAMAgsgB0KAgARUDQMLIAJBBDYCAEH//wMMAwsLIAJBBDYCAEEADAELQQAgB6ciAGsgACAFQS1GGwshACAEQRBqJAAgAEH//wNxC6wBAgJ/AX4jAEEQayIEJAACQCAAIAFHBEBBwJ0BKAIAIQVBwJ0BQQA2AgAQFhogACAEQQxqIAMQoAIhBgJAQcCdASgCACIABEAgBCgCDCABRw0BIABBxABHDQMgAkEENgIAQv///////////wBCgICAgICAgICAfyAGQgBVGyEGDAMLQcCdASAFNgIAIAQoAgwgAUYNAgsLIAJBBDYCAEIAIQYLIARBEGokACAGC+EBAgJ/AX4jAEEQayIEJAACfwJAIAAgAUcEQAJAQcCdASgCACEFQcCdAUEANgIAEBYaIAAgBEEMaiADEKACIQYCQEHAnQEoAgAiAARAIAQoAgwgAUcNAiAAQcQARw0BIAJBBDYCAEH/////ByAGQgBVDQUaDAQLQcCdASAFNgIAIAQoAgwgAUYNAAwBCyAGQv////93VwRAIAJBBDYCAAwDCyAGQoCAgIAIWQRAIAJBBDYCAEH/////BwwECyAGpwwDCwsgAkEENgIAQQAMAQtBgICAgHgLIQAgBEEQaiQAIAALSwECfyAAKAIAIgEEQAJ/IAEoAgwiAiABKAIQRgRAIAEgASgCACgCJBEAAAwBCyACLQAAC0F/RwRAIAAoAgBFDwsgAEEANgIAC0EBCzEBAX8gACgCDCIBIAAoAhBGBEAgACAAKAIAKAIoEQAADwsgACABQQFqNgIMIAEtAAALEAAgABCaAiABEJoCc0EBcwsxAQF/IwBBEGsiAiQAIAJBADYCDCAAIAIoAgw2AgAgACABKAIANgIEIAJBEGokACAAC8UBAQR/IwBBEGsiBSQAAkAgAiABa0ECdSIEQfD///8DSQRAAkAgBEEBTQRAIAAgBDoACyAAIQMMAQsgACAEQQJPBH8gBEEEakF8cSIDIANBAWsiAyADQQJGGwVBAQtBAWoiBhBuIgM2AgAgACAGQYCAgIB4cjYCCCAAIAQ2AgQLA0AgASACRwRAIAMgASgCADYCACADQQRqIQMgAUEEaiEBDAELCyAFQQA2AgwgAyAFKAIMNgIAIAVBEGokAAwBCxBNAAsgAAu+AQEEfyMAQRBrIgUkAAJAIAIgAWsiBEFwSQRAAkAgBEEKTQRAIAAgBDoACyAAIQMMAQsgACAEQQtPBH8gBEEQakFwcSIDIANBAWsiAyADQQtGGwVBCgtBAWoiBhAoIgM2AgAgACAGQYCAgIB4cjYCCCAAIAQ2AgQLA0AgASACRwRAIAMgAS0AADoAACADQQFqIQMgAUEBaiEBDAELCyAFQQA6AA8gAyAFLQAPOgAAIAVBEGokAAwBCxBNAAsgAAsWACAAIAEgAkKAgICAgICAgIB/EKECC40EAgd/BH4jAEEQayIIJAACQCAALQAAIgZFBEAgACEEDAELIAAhBAJAA0AgBkEYdEEYdSIFQSBGIAVBCWtBBUlyRQ0BIAQtAAEhBiAEQQFqIgUhBCAGDQALIAUhBAwBCwJAIAZB/wFxIgVBK2sOAwABAAELQX9BACAFQS1GGyEHIARBAWohBAsCfwJAIAJBb3ENACAELQAAQTBHDQBBASEJIAQtAAFB3wFxQdgARgRAIARBAmohBEEQDAILIARBAWohBCACQQggAhsMAQsgAkEKIAIbCyIKrCEMQQAhAgNAAkACQCAELAAAIgVBMGsiBkH/AXFBCU0NACAFQeEAa0H/AXFBGU0EQCAFQdcAayEGDAELIAVBwQBrQf8BcUEZSw0BIAVBN2shBgsgBiAKTg0AIAggDCALEDtBASEFAkAgCCkDCEIAUg0AIAsgDH4iDSAGrCIOQn+FVg0AIA0gDnwhC0EBIQkgAiEFCyAEQQFqIQQgBSECDAELCyABBEAgASAEIAAgCRs2AgALAkACQAJAIAIEQEHAnQFBxAA2AgAgB0EAIANCAYMiDFAbIQcgAyELDAELIAMgC1YNASADQgGDIQwLAkAgDKcNACAHDQBBwJ0BQcQANgIAIANCAX0hAwwCCyADIAtaDQBBwJ0BQcQANgIADAELIAsgB6wiA4UgA30hAwsgCEEQaiQAIAMLvggBBX8gASgCACEEAkACQAJAAkACQAJAAkACfwJAAkACQAJAIANFDQAgAygCACIGRQ0AIABFBEAgAiEDDAMLIANBADYCACACIQMMAQsCQEGYmQEoAgAoAgBFBEAgAEUNASACRQ0MIAIhBgNAIAQsAAAiAwRAIAAgA0H/vwNxNgIAIABBBGohACAEQQFqIQQgBkEBayIGDQEMDgsLIABBADYCACABQQA2AgAgAiAGaw8LIAIhAyAARQ0DDAULIAQQbw8LQQEhBQwDC0EADAELQQELIQUDQCAFRQRAIAQtAABBA3YiBUEQayAGQRp1IAVqckEHSw0DIARBAWohBQJ/IAUgBkGAgIAQcUUNABogBS0AAEHAAXFBgAFHBEAgBEEBayEEDAcLIARBAmohBSAFIAZBgIAgcUUNABogBS0AAEHAAXFBgAFHBEAgBEEBayEEDAcLIARBA2oLIQQgA0EBayEDQQEhBQwBCwNAAkAgBC0AACIGQQFrQf4ASw0AIARBA3ENACAEKAIAIgZBgYKECGsgBnJBgIGChHhxDQADQCADQQRrIQMgBCgCBCEGIARBBGoiBSEEIAYgBkGBgoQIa3JBgIGChHhxRQ0ACyAFIQQLIAZB/wFxIgVBAWtB/gBNBEAgA0EBayEDIARBAWohBAwBCwsgBUHCAWsiBUEySw0DIARBAWohBCAFQQJ0QfDYAGooAgAhBkEAIQUMAAsACwNAIAVFBEAgA0UNBwNAAkACQAJAIAQtAAAiBUEBayIHQf4ASwRAIAUhBgwBCyAEQQNxDQEgA0EFSQ0BAkADQCAEKAIAIgZBgYKECGsgBnJBgIGChHhxDQEgACAGQf8BcTYCACAAIAQtAAE2AgQgACAELQACNgIIIAAgBC0AAzYCDCAAQRBqIQAgBEEEaiEEIANBBGsiA0EESw0ACyAELQAAIQYLIAZB/wFxIgVBAWshBwsgB0H+AEsNAQsgACAFNgIAIABBBGohACAEQQFqIQQgA0EBayIDDQEMCQsLIAVBwgFrIgVBMksNAyAEQQFqIQQgBUECdEHw2ABqKAIAIQZBASEFDAELIAQtAAAiBUEDdiIHQRBrIAcgBkEadWpyQQdLDQEgBEEBaiEHAkACQAJ/IAcgBUGAAWsgBkEGdHIiBUF/Sg0AGiAHLQAAQYABayIIQT9LDQEgBEECaiEHIAcgCCAFQQZ0ciIFQX9KDQAaIActAABBgAFrIgdBP0sNASAHIAVBBnRyIQUgBEEDagshBCAAIAU2AgAgA0EBayEDIABBBGohAAwBC0HAnQFBGTYCACAEQQFrIQQMBQtBACEFDAALAAsgBEEBayEEIAYNASAELQAAIQYLIAZB/wFxDQAgAARAIABBADYCACABQQA2AgALIAIgA2sPC0HAnQFBGTYCACAARQ0BCyABIAQ2AgALQX8PCyABIAQ2AgAgAgsjAQJ/IAAhAQNAIAEiAkEEaiEBIAIoAgANAAsgAiAAa0ECdQseACAAQQBHIABBzIkBR3EgAEHkiQFHcQRAIAAQDwsLoQMCBn8BfiMAQSBrIgIkAAJAIAAtADQEQCAAKAIwIQMgAUUNASAAQQA6ADQgAEF/NgIwDAELIAJBATYCGCAAQSxqIgQgAkEYaiIDIAMoAgAgBCgCAEgbKAIAIgRBACAEQQBKGyEGA0AgBSAGRwRAQX8hAyAAKAIgEIYBIgdBf0YNAiACQRhqIAVqIAc6AAAgBUEBaiEFDAELCwJAAkAgAC0ANQRAIAIgAi0AGDoAFwwBCyACQRhqIQMDQAJAIAAoAigiBSkCACEIAkAgACgCJCIGIAUgAkEYaiACQRhqIARqIgUgAkEQaiACQRdqIAMgAkEMaiAGKAIAKAIQEQgAQQFrDgMABAEDCyAAKAIoIAg3AgAgBEEIRg0DIAAoAiAQhgEiBkF/Rg0DIAUgBjoAACAEQQFqIQQMAQsLIAIgAi0AGDoAFwsCQCABRQRAA0AgBEEBSA0CQX8hAyAEQQFrIgQgAkEYamotAAAgACgCIBB0QX9HDQAMBAsACyAAIAItABciAzYCMAwCCyACLQAXIQMMAQtBfyEDCyACQSBqJAAgAwuhAwIGfwF+IwBBIGsiAiQAAkAgAC0ANARAIAAoAjAhAyABRQ0BIABBADoANCAAQX82AjAMAQsgAkEBNgIYIABBLGoiBCACQRhqIgMgAygCACAEKAIASBsoAgAiBEEAIARBAEobIQYDQCAFIAZHBEBBfyEDIAAoAiAQhgEiB0F/Rg0CIAJBGGogBWogBzoAACAFQQFqIQUMAQsLAkACQCAALQA1BEAgAiACLAAYNgIUDAELIAJBGGohAwNAAkAgACgCKCIFKQIAIQgCQCAAKAIkIgYgBSACQRhqIAJBGGogBGoiBSACQRBqIAJBFGogAyACQQxqIAYoAgAoAhARCABBAWsOAwAEAQMLIAAoAiggCDcCACAEQQhGDQMgACgCIBCGASIGQX9GDQMgBSAGOgAAIARBAWohBAwBCwsgAiACLAAYNgIUCwJAIAFFBEADQCAEQQFIDQJBfyEDIARBAWsiBCACQRhqaiwAACAAKAIgEHRBf0cNAAwECwALIAAgAigCFCIDNgIwDAILIAIoAhQhAwwBC0F/IQMLIAJBIGokACADCwwAIAAQqQEaIAAQDwuIAQEFfyMAQRBrIgEkACABQRBqIQMCQANAIAAoAiQiAiAAKAIoIAFBCGogAyABQQRqIAIoAgAoAhQRBwAhBEF/IQIgAUEIakEBIAEoAgQgAUEIamsiBSAAKAIgEE4gBUcNAQJAIARBAWsOAgECAAsLQX9BACAAKAIgELcBGyECCyABQRBqJAAgAgsMACAAEKsBGiAAEA8LKgAgAEHUigE2AgAgAEEEahCUASAAQgA3AhggAEIANwIQIABCADcCCCAACyoAIABBlIoBNgIAIABBBGoQlAEgAEIANwIYIABCADcCECAAQgA3AgggAAuZAQEDfyMAQRBrIgQkACAAEKoCIQMgACABNgIgIABB6Dg2AgAgBCADKAIEIgE2AgggASABKAIEQQFqNgIEIARBCGoQrAEhAQJ/IAQoAggiAyADKAIEQQFrIgU2AgQgBUF/RgsEQCADIAMoAgAoAggRAQALIAAgAjYCKCAAIAE2AiQgACABIAEoAgAoAhwRAAA6ACwgBEEQaiQAC5kBAQN/IwBBEGsiBCQAIAAQqwIhAyAAIAE2AiAgAEGAODYCACAEIAMoAgQiATYCCCABIAEoAgRBAWo2AgQgBEEIahCtASEBAn8gBCgCCCIDIAMoAgRBAWsiBTYCBCAFQX9GCwRAIAMgAygCACgCCBEBAAsgACACNgIoIAAgATYCJCAAIAEgASgCACgCHBEAADoALCAEQRBqJAALrAMDA3wCfwF+IAC9IghCgICAgID/////AINCgYCAgPCE5fI/VCIHRQRARBgtRFT7Iek/IAAgAJogCEJ/VSIGG6FEB1wUMyamgTwgASABmiAGG6GgIQAgCEI/iKchBkQAAAAAAAAAACEBCyAAIAAgACAAoiIDoiIERGNVVVVVVdU/oiABIAMgASAEIAMgA6IiASABIAEgASABRHNTYNvLdfO+okSmkjegiH4UP6CiRAFl8vLYREM/oKJEKANWySJtbT+gokQ31gaE9GSWP6CiRHr+EBEREcE/oCADIAEgASABIAEgAUTUer90cCr7PqJE6afwMg+4Ej+gokRoEI0a9yYwP6CiRBWD4P7I21c/oKJEk4Ru6eMmgj+gokT+QbMbuqGrP6CioKKgoqCgIgOgIQEgB0UEQEEBIAJBAXRrtyIEIAAgAyABIAGiIAEgBKCjoaAiACAAoKEiAJogACAGGw8LIAIEfEQAAAAAAADwvyABoyIEIAG9QoCAgIBwg78iBSAEvUKAgICAcIO/IgGiRAAAAAAAAPA/oCADIAUgAKGhIAGioKIgAaAFIAELC78CAQF/IwBB0ABrIgQkAAJAIANBgIABTgRAIARBIGogASACQgBCgICAgICAgP//ABAXIAQpAyghAiAEKQMgIQEgA0H//wFIBEAgA0H//wBrIQMMAgsgBEEQaiABIAJCAEKAgICAgICA//8AEBcgA0H9/wIgA0H9/wJIG0H+/wFrIQMgBCkDGCECIAQpAxAhAQwBCyADQYGAf0oNACAEQUBrIAEgAkIAQoCAgICAgMAAEBcgBCkDSCECIAQpA0AhASADQYOAfkoEQCADQf7/AGohAwwBCyAEQTBqIAEgAkIAQoCAgICAgMAAEBcgA0GGgH0gA0GGgH1KG0H8/wFqIQMgBCkDOCECIAQpAzAhAQsgBCABIAJCACADQf//AGqtQjCGEBcgACAEKQMINwMIIAAgBCkDADcDACAEQdAAaiQACzUAIAAgATcDACAAIAJC////////P4MgBEIwiKdBgIACcSACQjCIp0H//wFxcq1CMIaENwMIC/8DAgR/AX4CQAJAAkACfyAAKAIEIgIgACgCaEkEQCAAIAJBAWo2AgQgAi0AAAwBCyAAEBMLIgNBK2sOAwEAAQALIANBMGshBAwBCyADQS1GIQUCQAJ/IAAoAgQiAiAAKAJoSQRAIAAgAkEBajYCBCACLQAADAELIAAQEwsiAkEwayIEQQpJDQAgAUUNACAAKAJoRQ0AIAAgACgCBEEBazYCBAsgAiEDCwJAIARBCkkEQEEAIQIDQCACIANqQTBrIQECQAJ/IAAoAgQiAiAAKAJoSQRAIAAgAkEBajYCBCACLQAADAELIAAQEwsiA0EwayIEQQlLDQAgAUHLmbPmAEoNACABQQpsIQIMAQsLIAGsIQYCQCAEQQpPDQADQCADrSAGQgp+fEIwfSEGAn8gACgCBCIBIAAoAmhJBEAgACABQQFqNgIEIAEtAAAMAQsgABATCyIDQTBrIgRBCUsNASAGQq6PhdfHwuujAVMNAAsLIARBCkkEQANAAn8gACgCBCIBIAAoAmhJBEAgACABQQFqNgIEIAEtAAAMAQsgABATC0Ewa0EKSQ0ACwsgACgCaARAIAAgACgCBEEBazYCBAtCACAGfSAGIAUbIQYMAQtCgICAgICAgICAfyEGIAAoAmhFDQAgACAAKAIEQQFrNgIEQoCAgICAgICAgH8PCyAGC9AdAg9/BX4jAEGQAWsiBCQAIARBAEGQARAwIgNBfzYCTCADIAA2AiwgA0EGNgIgIAMgADYCVCACIQ5BACECIwBBsAJrIgckACADKAJMGgJAIAEtAAAiBEUNAAJAAkACQAJAA0ACQAJAIARB/wFxIgQiAEEgRiAAQQlrQQVJcgRAA0AgASIEQQFqIQEgBC0AASIAQSBGIABBCWtBBUlyDQALIANCABA9A0ACfyADKAIEIgAgAygCaEkEQCADIABBAWo2AgQgAC0AAAwBCyADEBMLIgBBIEYgAEEJa0EFSXINAAsgAygCBCEBIAMoAmgEQCADIAFBAWsiATYCBAsgASADKAIIa6wgAykDeCAUfHwhFAwBCwJ/AkACQCAEQSVGBEAgAS0AASIAQSpGDQEgAEElRw0CCyADQgAQPSABIARBJUZqIQQCfyADKAIEIgAgAygCaEkEQCADIABBAWo2AgQgAC0AAAwBCyADEBMLIgAgBC0AAEcEQCADKAJoBEAgAyADKAIEQQFrNgIECyAAQX9KDQtBACEMIA9FDQkMCwsgFEIBfCEUDAMLQQAhCCABQQJqDAELAkAgAEEwa0EKTw0AIAEtAAJBJEcNACMAQRBrIgQgDjYCDCAEIABBMGsiAEECdCAOakEEayAOIABBAUsbIgBBBGo2AgggACgCACEIIAFBA2oMAQsgDigCACEIIA5BBGohDiABQQFqCyEEQQAhBgNAIAQtAAAiAUEwa0EKSQRAIARBAWohBCAGQQpsIAFqQTBrIQYMAQsLQQAhDCABQe0ARwR/IAQFQQAhCSAIQQBHIQwgBC0AASEBQQAhAiAEQQFqCyIAQQFqIQRBAyEFAkACQAJAAkACQAJAIAFB/wFxQcEAaw46BAoECgQEBAoKCgoDCgoKCgoKBAoKCgoECgoECgoKCgoECgQEBAQEAAQFCgEKBAQECgoEAgQKCgQKAgoLIABBAmogBCAALQABQegARiIAGyEEQX5BfyAAGyEFDAQLIABBAmogBCAALQABQewARiIAGyEEQQNBASAAGyEFDAMLQQEhBQwCC0ECIQUMAQtBACEFIAAhBAtBASAFIAQtAAAiAEEvcUEDRiIBGyENAkAgAEEgciAAIAEbIgtB2wBGDQACQCALQe4ARwRAIAtB4wBHDQEgBkEBIAZBAUobIQYMAgsgCCANIBQQuQEMAgsgA0IAED0DQAJ/IAMoAgQiACADKAJoSQRAIAMgAEEBajYCBCAALQAADAELIAMQEwsiAEEgRiAAQQlrQQVJcg0ACyADKAIEIQEgAygCaARAIAMgAUEBayIBNgIECyABIAMoAghrrCADKQN4IBR8fCEUCyADIAasIhIQPQJAIAMoAgQiACADKAJoIgFJBEAgAyAAQQFqNgIEDAELIAMQE0EASA0FIAMoAmghAQsgAQRAIAMgAygCBEEBazYCBAtBECEBAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAtB2ABrDiEGCwsCCwsLCwsBCwIEAQEBCwULCwsLCwMGCwsCCwQLCwYACyALQcEAayIAQQZLDQpBASAAdEHxAHFFDQoLIAcgAyANQQAQuAEgAykDeEIAIAMoAgQgAygCCGusfVENECAIRQ0JIAcpAwghEiAHKQMAIRMgDQ4DBQYHCQsgC0HvAXFB4wBGBEAgB0EgakF/QYECEDAaIAdBADoAICALQfMARw0IIAdBADoAQSAHQQA6AC4gB0EANgEqDAgLIAdBIGogBC0AASIAQd4ARiIBQYECEDAaIAdBADoAICAEQQJqIARBAWogARshCgJ/AkACQCAEQQJBASABG2otAAAiAUEtRwRAIAFB3QBGDQEgAEHeAEchBSAKDAMLIAcgAEHeAEciBToATgwBCyAHIABB3gBHIgU6AH4LIApBAWoLIQQDQAJAIAQtAAAiAUEtRwRAIAFFDRAgAUHdAEcNAQwKC0EtIQEgBC0AASIARQ0AIABB3QBGDQAgBEEBaiEKAkAgACAEQQFrLQAAIgRNBEAgACEBDAELA0AgBEEBaiIEIAdBIGpqIAU6AAAgBCAKLQAAIgFJDQALCyAKIQQLIAEgB2ogBToAISAEQQFqIQQMAAsAC0EIIQEMAgtBCiEBDAELQQAhAQtCACESQQAhBUEAIQZBACEKIwBBEGsiESQAA0ACfyADKAIEIgAgAygCaEkEQCADIABBAWo2AgQgAC0AAAwBCyADEBMLIgAiEEEgRiAQQQlrQQVJcg0ACwJAAkAgAEEraw4DAAEAAQtBf0EAIABBLUYbIQogAygCBCIAIAMoAmhJBEAgAyAAQQFqNgIEIAAtAAAhAAwBCyADEBMhAAsCfgJAAkACQAJAAkAgAUFvcQ0AIABBMEcNAAJ/IAMoAgQiACADKAJoSQRAIAMgAEEBajYCBCAALQAADAELIAMQEwsiAEFfcUHYAEYEQEEQIQECfyADKAIEIgAgAygCaEkEQCADIABBAWo2AgQgAC0AAAwBCyADEBMLIgBBoRxqLQAAQRBJDQMgAygCaARAIAMgAygCBEEBazYCBAsgA0IAED1CAAwGCyABDQFBCCEBDAILIAFBCiABGyIBIABBoRxqLQAASw0AIAMoAmgEQCADIAMoAgRBAWs2AgQLIANCABA9QcCdAUEcNgIAQgAMBAsgAUEKRw0AIABBMGsiBUEJTQRAQQAhAQNAIAEgBWohAQJAAn8gAygCBCIAIAMoAmhJBEAgAyAAQQFqNgIEIAAtAAAMAQsgAxATCyIAQTBrIgVBCUsNACABQZiz5swBSw0AIAFBCmwhAQwBCwsgAa0hEgsCQCAFQQlLDQAgEkIKfiETIAWtIRUDQCATIBV8IRICfyADKAIEIgAgAygCaEkEQCADIABBAWo2AgQgAC0AAAwBCyADEBMLIgBBMGsiBUEJSw0BIBJCmrPmzJmz5swZWg0BIBJCCn4iEyAFrSIVQn+FWA0AC0EKIQEMAgtBCiEBIAVBCU0NAQwCCyABIAFBAWtxBEAgAEGhHGotAAAiBiABSQRAA0AgBSAGaiEFAkAgAQJ/IAMoAgQiACADKAJoSQRAIAMgAEEBajYCBCAALQAADAELIAMQEwsiAEGhHGotAAAiBk0NACAFQcbj8ThLDQAgASAFbCEFDAELCyAFrSESCyABIAZNDQEgAa0hEwNAIBIgE34iFSAGrUL/AYMiFkJ/hVYNAiAVIBZ8IRIgAQJ/IAMoAgQiACADKAJoSQRAIAMgAEEBajYCBCAALQAADAELIAMQEwsiAEGhHGotAAAiBk0NAiARIBMgEhA7IBEpAwhQDQALDAELIAFBF2xBBXZBB3FBoR5qLAAAIRAgAEGhHGotAAAiBSABSQRAA0AgBSAGciEGAkAgAQJ/IAMoAgQiACADKAJoSQRAIAMgAEEBajYCBCAALQAADAELIAMQEwsiAEGhHGotAAAiBU0NACAGQf///z9LDQAgBiAQdCEGDAELCyAGrSESCyABIAVNDQBCfyAQrSITiCIVIBJUDQADQCAFrUL/AYMgEiAThoQhEiABAn8gAygCBCIAIAMoAmhJBEAgAyAAQQFqNgIEIAAtAAAMAQsgAxATCyIAQaEcai0AACIFTQ0BIBIgFVgNAAsLIAEgAEGhHGotAABNDQADQCABAn8gAygCBCIAIAMoAmhJBEAgAyAAQQFqNgIEIAAtAAAMAQsgAxATC0GhHGotAABLDQALQQAhCkHAnQFBxAA2AgBCfyESCyADKAJoBEAgAyADKAIEQQFrNgIECyASIAqsIhOFIBN9CyESIBFBEGokACADKQN4QgAgAygCBCADKAIIa6x9UQ0LAkAgC0HwAEcNACAIRQ0AIAggEj4CAAwFCyAIIA0gEhC5AQwECyAIIBMgEhCPAjgCAAwDCyAIIBMgEhChATkDAAwCCyAIIBM3AwAgCCASNwMIDAELIAZBAWpBHyALQeMARiIKGyEFAkACQCANQQFHIg1FBEAgCCEAIAwEQCAFQQJ0EBsiAEUNCAsgB0IANwOoAkEAIQEDQAJ/IAMoAgQiAiADKAJoSQRAIAMgAkEBajYCBCACLQAADAELIAMQEwsiAiAHai0AIUUNAiAHIAI6ABsgB0EcaiAHQRtqQQEgB0GoAmoQciICQX5GDQBBACEJIAJBf0YEQCAAIQIMCgsgAARAIAAgAUECdGogBygCHDYCACABQQFqIQELIAwgASAFRnFFDQAgBSIBQQF0QQFyIgYhBSAAIgIgBkECdBBkIgANAAsMCAsgDARAQQAhASAFEBsiBkUNBwNAIAYhCQNAAn8gAygCBCIAIAMoAmhJBEAgAyAAQQFqNgIEIAAtAAAMAQsgAxATCyIAIAdqLQAhRQRAQQAhAAwFCyABIAlqIAA6AAAgAUEBaiIBIAVHDQALQQAhAiAFIgFBAXRBAXIiACEFIAkgABBkIgYNAAsMCAtBACEBIAgEQANAAn8gAygCBCIAIAMoAmhJBEAgAyAAQQFqNgIEIAAtAAAMAQsgAxATCyIAIAdqLQAhBEAgASAIaiAAOgAAIAFBAWohAQwBBUEAIQAgCCEJDAQLAAsACwNAAn8gAygCBCIAIAMoAmhJBEAgAyAAQQFqNgIEIAAtAAAMAQsgAxATCyAHai0AIQ0AC0EAIQlBACEADAELQQAhCSAAIQIgB0GoAmoEfyAHKAKoAgVBAAsNBgsgAygCBCEGIAMoAmgEQCADIAZBAWsiBjYCBAsgAykDeCAGIAMoAghrrHwiE1ANAiALQeMARkEAIBIgE1IbDQICQCAMRQ0AIA1FBEAgCCAANgIADAELIAggCTYCAAsCQCAKDQAgAARAIAAgAUECdGpBADYCAAsgCUUEQEEAIQkMAQsgASAJakEAOgAACyAAIQILIAMoAgQgAygCCGusIAMpA3ggFHx8IRQgDyAIQQBHaiEPCyAEQQFqIQEgBC0AASIEDQEMBgsLIAAhAgwDC0EAIQlBACECCyAPDQELQX8hDwsgDEUNACAJEA8gAhAPCyAHQbACaiQAIA8hACADQZABaiQAIAALMwEBfyAAKAIUIgMgASACIAAoAhAgA2siASABIAJLGyIBEDUaIAAgACgCFCABajYCFCACC1IBAX8jAEEQayIDJAAgACgCPCABpyABQiCIpyACQf8BcSADQQhqEAgiAAR/QcCdASAANgIAQX8FQQALIQAgAykDCCEBIANBEGokAEJ/IAEgABsL5AEBBH8jAEEgayIDJAAgAyABNgIQIAMgAiAAKAIwIgRBAEdrNgIUIAAoAiwhBSADIAQ2AhwgAyAFNgIYQX8hBAJAAkAgACgCPCADQRBqQQIgA0EMahAFIgUEf0HAnQEgBTYCAEF/BUEAC0UEQCADKAIMIgRBAEoNAQsgACAAKAIAIARBMHFBEHNyNgIADAELIAQgAygCFCIGTQ0AIAAgACgCLCIFNgIEIAAgBSAEIAZrajYCCCAAKAIwBEAgACAFQQFqNgIEIAEgAmpBAWsgBS0AADoAAAsgAiEECyADQSBqJAAgBAsJACAAKAI8EAYL1gIBB38jAEEgayIDJAAgAyAAKAIcIgQ2AhAgACgCFCEFIAMgAjYCHCADIAE2AhggAyAFIARrIgE2AhQgASACaiEEQQIhBSADQRBqIQECfwNAAkACQAJAIAAoAjwgASAFIANBDGoQByIGBH9BwJ0BIAY2AgBBfwVBAAtFBEAgBCADKAIMIgZGDQEgBkF/Sg0CDAMLIARBf0cNAgsgACAAKAIsIgE2AhwgACABNgIUIAAgASAAKAIwajYCECACDAMLIAEgBiABKAIEIghLIgdBA3RqIgkgBiAIQQAgBxtrIgggCSgCAGo2AgAgAUEMQQQgBxtqIgkgCSgCACAIazYCACABQQhqIAEgBxshASAEIAZrIQQgBSAHayEFDAELCyAAQQA2AhwgAEIANwMQIAAgACgCAEEgcjYCAEEAIAVBAkYNABogAiABKAIEawshACADQSBqJAAgAAspACABIAEoAgBBD2pBcHEiAUEQajYCACAAIAEpAwAgASkDCBChATkDAAuhFwMSfwF8A34jAEGwBGsiCSQAIAlBADYCLAJAIAG9IhlCf1cEQEEBIRJB4BohEyABmiIBvSEZDAELIARBgBBxBEBBASESQeMaIRMMAQtB5hpB4RogBEEBcSISGyETIBJFIRcLAkAgGUKAgICAgICA+P8Ag0KAgICAgICA+P8AUQRAIABBICACIBJBA2oiDCAEQf//e3EQMSAAIBMgEhAnIABBsx5B+xogBUEgcSIDG0HzGkH3GiADGyABIAFiG0EDECcMAQsgCUEQaiEQAkACfwJAIAEgCUEsahC6ASIBIAGgIgFEAAAAAAAAAABiBEAgCSAJKAIsIgZBAWs2AiwgBUEgciIUQeEARw0BDAMLIAVBIHIiFEHhAEYNAiAJKAIsIQtBBiADIANBAEgbDAELIAkgBkEdayILNgIsIAFEAAAAAAAAsEGiIQFBBiADIANBAEgbCyEKIAlBMGogCUHQAmogC0EASBsiDiEHA0AgBwJ/IAFEAAAAAAAA8EFjIAFEAAAAAAAAAABmcQRAIAGrDAELQQALIgM2AgAgB0EEaiEHIAEgA7ihRAAAAABlzc1BoiIBRAAAAAAAAAAAYg0ACwJAIAtBAUgEQCALIQMgByEGIA4hCAwBCyAOIQggCyEDA0AgA0EdIANBHUgbIQ0CQCAHQQRrIgYgCEkNACANrSEbQgAhGQNAIAYgBjUCACAbhiAZfCIZQoCU69wDgCIaQoDslKN8fiAZfD4CACAIIAZBBGsiBk0EQCAaQv////8PgyEZDAELCyAapyIDRQ0AIAhBBGsiCCADNgIACwNAIAggByIGSQRAIAZBBGsiBygCAEUNAQsLIAkgCSgCLCANayIDNgIsIAYhByADQQBKDQALCyAKQRlqQQltIQcgA0F/TARAIAdBAWohDCAUQeYARiEVA0BBCUEAIANrIANBd0gbIRYCQCAGIAhLBEBBgJTr3AMgFnYhD0F/IBZ0QX9zIRFBACEDIAghBwNAIAcgAyAHKAIAIg0gFnZqNgIAIA0gEXEgD2whAyAHQQRqIgcgBkkNAAsgCCAIQQRqIAgoAgAbIQggA0UNASAGIAM2AgAgBkEEaiEGDAELIAggCEEEaiAIKAIAGyEICyAJIAkoAiwgFmoiAzYCLCAOIAggFRsiByAMQQJ0aiAGIAYgB2tBAnUgDEobIQYgA0EASA0ACwtBACEHAkAgBiAITQ0AIA4gCGtBAnVBCWwhByAIKAIAIg1BCkkNAEHkACEDA0AgB0EBaiEHIAMgDUsNASADQQpsIQMMAAsACyAKQQAgByAUQeYARhtrIBRB5wBGIApBAEdxayIDIAYgDmtBAnVBCWxBCWtIBEAgA0GAyABqIhFBCW0iDUECdCAJQTBqQQRyIAlB1AJqIAtBAEgbakGAIGshDEEKIQMCQCANQXdsIBFqIgtBB0oNAEHkACEDA0AgC0EBaiILQQhGDQEgA0EKbCEDDAALAAsCQCAMKAIAIhEgESADbiINIANsayIPQQEgDEEEaiILIAZGG0UNAEQAAAAAAADgP0QAAAAAAADwP0QAAAAAAAD4PyAGIAtGG0QAAAAAAAD4PyAPIANBAXYiC0YbIAsgD0sbIRhEAQAAAAAAQENEAAAAAAAAQEMgDUEBcRshAQJAIBcNACATLQAAQS1HDQAgGJohGCABmiEBCyAMIBEgD2siCzYCACABIBigIAFhDQAgDCADIAtqIgM2AgAgA0GAlOvcA08EQANAIAxBADYCACAIIAxBBGsiDEsEQCAIQQRrIghBADYCAAsgDCAMKAIAQQFqIgM2AgAgA0H/k+vcA0sNAAsLIA4gCGtBAnVBCWwhByAIKAIAIgtBCkkNAEHkACEDA0AgB0EBaiEHIAMgC0sNASADQQpsIQMMAAsACyAMQQRqIgMgBiADIAZJGyEGCwNAIAYiCyAITSINRQRAIAtBBGsiBigCAEUNAQsLAkAgFEHnAEcEQCAEQQhxIQ8MAQsgB0F/c0F/IApBASAKGyIGIAdKIAdBe0pxIgMbIAZqIQpBf0F+IAMbIAVqIQUgBEEIcSIPDQBBdyEMAkAgDQ0AIAtBBGsoAgAiA0UNAEEAIQwgA0EKcA0AQeQAIQYDQCADIAZwRQRAIAZBCmwhBiAMQQFqIQwMAQsLIAxBf3MhDAsgCyAOa0ECdUEJbCEDIAVBX3FBxgBGBEBBACEPIAogAyAMakEJayIDQQAgA0EAShsiAyADIApKGyEKDAELQQAhDyAKIAMgB2ogDGpBCWsiA0EAIANBAEobIgMgAyAKShshCgsgCiAPckEARyERIABBICACIAVBX3EiDUHGAEYEfyAHQQAgB0EAShsFIBAgByAHQR91IgNqIANzrSAQEFoiBmtBAUwEQANAIAZBAWsiBkEwOgAAIBAgBmtBAkgNAAsLIAZBAmsiFSAFOgAAIAZBAWtBLUErIAdBAEgbOgAAIBAgFWsLIAogEmogEWpqQQFqIgwgBBAxIAAgEyASECcgAEEwIAIgDCAEQYCABHMQMQJAAkACQCANQcYARgRAIAlBEGpBCHIhAyAJQRBqQQlyIQcgDiAIIAggDksbIgUhCANAIAg1AgAgBxBaIQYCQCAFIAhHBEAgBiAJQRBqTQ0BA0AgBkEBayIGQTA6AAAgBiAJQRBqSw0ACwwBCyAGIAdHDQAgCUEwOgAYIAMhBgsgACAGIAcgBmsQJyAIQQRqIgggDk0NAAtBACEGIBFFDQIgAEH/GkEBECcgCCALTw0BIApBAUgNAQNAIAg1AgAgBxBaIgYgCUEQaksEQANAIAZBAWsiBkEwOgAAIAYgCUEQaksNAAsLIAAgBiAKQQkgCkEJSBsQJyAKQQlrIQYgCEEEaiIIIAtPDQMgCkEJSiEDIAYhCiADDQALDAILAkAgCkEASA0AIAsgCEEEaiAIIAtJGyEFIAlBEGpBCXIhCyAJQRBqQQhyIQMgCCEHA0AgCyAHNQIAIAsQWiIGRgRAIAlBMDoAGCADIQYLAkAgByAIRwRAIAYgCUEQak0NAQNAIAZBAWsiBkEwOgAAIAYgCUEQaksNAAsMAQsgACAGQQEQJyAGQQFqIQZBACAKQQBMIA8bDQAgAEH/GkEBECcLIAAgBiALIAZrIgYgCiAGIApIGxAnIAogBmshCiAHQQRqIgcgBU8NASAKQX9KDQALCyAAQTAgCkESakESQQAQMSAAIBUgECAVaxAnDAILIAohBgsgAEEwIAZBCWpBCUEAEDELDAELIBNBCWogEyAFQSBxIgsbIQoCQCADQQtLDQBBDCADayIGRQ0ARAAAAAAAACBAIRgDQCAYRAAAAAAAADBAoiEYIAZBAWsiBg0ACyAKLQAAQS1GBEAgGCABmiAYoaCaIQEMAQsgASAYoCAYoSEBCyASQQJyIQ4gECAJKAIsIgcgB0EfdSIGaiAGc60gEBBaIgZGBEAgCUEwOgAPIAlBD2ohBgsgBkECayINIAVBD2o6AAAgBkEBa0EtQSsgB0EASBs6AAAgBEEIcSEHIAlBEGohCANAIAgiBQJ/IAGZRAAAAAAAAOBBYwRAIAGqDAELQYCAgIB4CyIGQdAaai0AACALcjoAACABIAa3oUQAAAAAAAAwQKIhAQJAIAVBAWoiCCAJQRBqa0EBRw0AAkAgAUQAAAAAAAAAAGINACADQQBKDQAgB0UNAQsgBUEuOgABIAVBAmohCAsgAUQAAAAAAAAAAGINAAsgAEEgIAIgDgJ/AkAgA0UNACAIIAlrQRJrIANODQAgAyAQaiANa0ECagwBCyAQIAlBEGogDWprIAhqCyIDaiIMIAQQMSAAIAogDhAnIABBMCACIAwgBEGAgARzEDEgACAJQRBqIAggCUEQamsiBRAnIABBMCADIAUgECANayIDamtBAEEAEDEgACANIAMQJwsgAEEgIAIgDCAEQYDAAHMQMSAJQbAEaiQAIAIgDCACIAxKGwuLAwIFfwF8QX8gA0EGbCIFQQN0IAVB/v///wFxIAVHGxAoIQcCQAJAIANBAk4EQCACIAGhIANBAWu3oyECDAELRAAAAAAAAAAAIQIgA0EBRw0BCyAAQfAAaiEIA0AgBkEGbEEDdCAHaiIJQRhqIQUCQCAALQAwRQ0AIAggAiAGt6IgAaAiCiAAKwNAoUQAAAAAAECPQKNEAAAAAAAATkCjEHogACgCfEEBTgRAIABBADYCYCAFQgA3AxAgBUIANwMIIAVCADcDAAwBCyAKRAAAAABwmZRBo0QAAADAxZ5CQaBB8JoBKwMAoCIKRAAAAIAstELBoEQAAAAAoNXhQKMgChB5QYCcAUGAnAErAwBEAAAAAABAj0CiOQMAQfCbAUHwmwErAwBEAAAAAABAj0CiOQMAQfibAUH4mwErAwBEAAAAAABAj0CiOQMAIAVBgJwBKQMANwMQIAVB8JsBKQMANwMAIAVB+JsBKQMANwMICyAFQQMgBCAJEIkBGiAGQQFqIgYgA0cNAAsLIAcLlwMCBH8BfEF/IANBA2wiBUEDdCAFQf////8BcSAFRxsQKCEHAkACQCADQQJOBEAgAiABoSADQQFrt6MhAgwBC0QAAAAAAAAAACECIANBAUcNAQsgAEHwAGohCANAAkAgAC0AMEUNAEHkmwEoAgAhBSAIIAIgBreiIAGgIgkgACsDQKFEAAAAAABAj0CjRAAAAAAAAE5AoxB6IAAoAnxBAU4EQCAAQQA2AmAgBUUNASAFQgA3AwAgBUIANwMQIAVCADcDCAwBCyAJRAAAAABwmZRBo0QAAADAxZ5CQaBB8JoBKwMAoCIJRAAAAIAstELBoEQAAAAAoNXhQKMgCRB5QfCbAUHwmwErAwBEAAAAAABAj0CiOQMAQfibAUH4mwErAwBEAAAAAABAj0CiOQMAQYCcAUGAnAErAwBEAAAAAABAj0CiOQMAIAVFDQAgBUGAnAEpAwA3AxAgBUH4mwEpAwA3AwggBUHwmwEpAwA3AwALQeSbASgCAEEDIAQgByAGQRhsahCJARogBkEBaiIGIANHDQALCyAHCxsAIAAgASACQeSbASgCACADEIoBQeSbASgCAAsbACAAIAFBAUHkmwEoAgAgAxCKAUHkmwEoAgAL1wMCA38DfAJ/IAArAzggA0HaACADG7ejIgggAqAiCSABIAihIgGhIAijm0QAAAAAAADwP6AiAplEAAAAAAAA4EFjBEAgAqoMAQtBgICAgHgLIQYgACgCZCIERQRAIAAgBkEYbBAbIgQ2AmQLIAZBAU4EQCAAQfAAaiEHQQAhAyABIQIDQAJAIAAtADBFDQAgBCADQRhsaiEFIAcgAiAAKwNAoUQAAAAAAECPQKNEAAAAAAAATkCjEHogACgCfEEBTgRAIABBADYCYCAERQ0BIAVCADcDACAFQgA3AxAgBUIANwMIDAELIAJEAAAAAHCZlEGjRAAAAMDFnkJBoEHwmgErAwCgIgpEAAAAgCy0QsGgRAAAAACg1eFAoyAKEHlB8JsBQfCbASsDAEQAAAAAAECPQKI5AwBB+JsBQfibASsDAEQAAAAAAECPQKI5AwBBgJwBQYCcASsDAEQAAAAAAECPQKI5AwAgBEUNACAFQYCcASkDADcDECAFQfibASkDADcDCCAFQfCbASkDADcDAAsgBiADQQFqIgNHBEAgCCACoCECIAAoAmQhBAwBCwsgACgCZCEECyAAIAg5A1ggACAJOQNQIAAgATkDSCAAIAZBA2w2AmAgBAulAQEDfwJAQeCbAQJ/QeCbASgCACIDRQRAQdiaASgCAEEYbBAbDAELQcicAS0AAEUNASADQdiaASgCAEEYbBBkCyIDNgIAQcicAUEAOgAAC0HUmgEoAgAiBUHQmgFHBH8DfyAFKAIIIAAgASADIARBGGxqIAIQigEgBSgCBCIFQdCaAUYEf0HgmwEoAgAFIARBAWohBEHgmwEoAgAhAwwBCwsFIAMLC7UBAQN/QdSaASgCACIAQdCaAUcEQANAIAAoAggiAigCZCIBBEAgARAPCyACEA8gACgCBCIAQdCaAUcNAAsLAkBB2JoBKAIARQ0AQdSaASgCACIAKAIAIgJB0JoBKAIAIgEoAgQ2AgQgASgCBCACNgIAQdiaAUEANgIAIABB0JoBRg0AA0AgACgCBCEBIAAQDyABIgBB0JoBRw0ACwtByJwBQQE6AABB4JsBKAIAIgEEQCABEA8LC+sDAQh/IwBBEGsiAiQAQdSaASgCACEFIAIgAjYCBCACIAI2AgACQCAFQdCaAUYNACACIQMDQAJ/IAUoAgQiBiAAIAUoAghHDQAaQdCaASEEAkAgBiIBQdCaAUYEQEEBIQgMAQsDQCABKAIIIgQgAEYhCCAAIARHBEAgASEEDAILQdCaASEEIAEoAgQiAUHQmgFHDQALCyAEIAVHBEBB2JoBQdiaASgCAAJ/QQEgBSAEKAIAIgNGDQAaQQEhAUECIAMgBkYNABoDQCADIAYoAgQiBkcEQCABQQFqIQEMAQsLIAFBAmoLIgFrNgIAIAUoAgAiBiADKAIENgIEIAMoAgQgBjYCACACKAIAIgYgBTYCBCAFIAY2AgAgAiADNgIAIAMgAjYCBCABIAdqIQcLIAQgCA0AGiAEKAIECyIFQdCaAUcNAAsgB0UNACACKAIEIgEoAgAiBCADKAIENgIEIAMoAgQgBDYCACACQQA2AgggASACRg0AA0AgASgCBCEDIAEQDyADIgEgAkcNAAsLIAAoAmQiAQRAIAEQDwsgABAPAkBB1JoBKAIAIgFB0JoBRg0AQQEhAANAIAEoAgggADYCbCABKAIEIgFB0JoBRg0BIABBAWohAAwACwALQcicAUEBOgAAIAJBEGokAAvRCQEDfyMAQUBqIhEkACAVRQRAQcgIECgiFUEAQcgIEDAhF0EMECgiFkHQmgE2AgQgFiAXNgIIIBZB0JoBKAIAIhg2AgAgGCAWNgIEQdCaASAWNgIAQdiaAUHYmgEoAgAiFkEBajYCACAXIBY2AmxByJwBQQE6AAALIBVBAToAMCARQQA2AjQgFSALNgJwIBVBADYCfCAVIAotAAA6AJAHAkACQCAAIBVBkQdqIgpzQQNxDQAgAEEDcQRAA0AgCiAALQAAIgs6AAAgC0UNAyAKQQFqIQogAEEBaiIAQQNxDQALCyAAKAIAIgtBf3MgC0GBgoQIa3FBgIGChHhxDQADQCAKIAs2AgAgACgCBCELIApBBGohCiAAQQRqIQAgC0GBgoQIayALQX9zcUGAgYKEeHFFDQALCyAKIAAtAAAiCzoAACALRQ0AA0AgCiAALQABIgs6AAEgCkEBaiEKIABBAWohACALDQALCyAVIAw2AqAHIBUgCTYCnAcgFSAOOQPQBiAVIBA5A8AGIBUgDzkDyAYgFQJ/IA2ZRAAAAAAAAOBBYwRAIA2qDAELQYCAgIB4CzYCpAcgFSACOQOIByAVIAc5A4AHIBUgBjkD+AYgFSADOQPwBiAVIAU5A+gGIBUgBDkD4AYgESARQThqNgIUIBEgEUEkajYCECARIBFBKGo2AgwgESARQSxqNgIIIBEgEUEwajYCBCARIBFBNGo2AgAgAUGcCSAREFsaIBEoAiwhASARKAIwIQAgESgCNCEJIBUgESgCKLdEAAAAAAAgrECiIBErAzggESgCJLdEAAAAAAAATkCioKBEAAAAAAAY9UCjIg05A7gGIBUgAEGTAmy3RAAAAAAAACJAo5wgCbciAkQAAAAAAPB2QKIgAEEJardEAAAAAAAAKECjnCACoEQAAAAAAAAcQKJEAAAAAAAA0D+inKGgIAG3oEQAAACAtUI6QaAiAjkDsAYgDZlEAAAAAAAA8D9kBEAgFSANIA2cIgOhIg05A7gGIBUgAyACoCICOQOwBgsgFSAVKwOIB0T4wWMa3KVsQKMiAzkDiAcgFSAVKwPIBkRiJI7CniQUQaMiBDkDyAYgFSAVKwPABkQq45dBf1O8QaMiBTkDwAYgFSAVKwPgBkQ5nVKiRt+RP6IiBjkD4AYgFSAVKwPoBkQ5nVKiRt+RP6IiBzkD6AYgFSAVKwP4BkQ5nVKiRt+RP6IiCDkD+AYgFSAVKwOAB0Q5nVKiRt+RP6IiDjkDgAcgFSgCcCACIA2gRAAAAMCAkELBoCAVKwPQBiAEIAUgFSsD8AYgCCAGIA4gAyAHIBVB8ABqEPoBIBVBADYCZCAVIBQ5A1ggFSATOQNQIBUgEjkDSCAVQoCAgICAgICNwAA3AyggFUKAgICAgICAi8AANwMgIBVCgICAgICAgInAADcDGCAVQoCAgICAgICGwAA3AxAgFUKAgICAgICAgsAANwMIIBVCgICAgICAgPw/NwMAIBUgFSsDsAYgFSsDuAagRAAAAMDFnkLBoEQAAAAAcJmUQaI5A0AgFUQYLURU+yEZQCAVKwOIB6NEAAAAAAAATkCiRAAAAAAAQI9AoiICOQM4IBVBsAhqIAJEAAAAAABAj0CjOQMAIBFBQGskACAVC+YCAQJ/IAZFBEBByAgQKCIGQQBByAgQMCEHQQwQKCICQdCaATYCBCACIAc2AgggAkHQmgEoAgAiCDYCACAIIAI2AgRB0JoBIAI2AgBB2JoBQdiaASgCACICQQFqNgIAIAcgAjYCbEHInAFBAToAAAsgBkEBOgAwIAAgASAGQfAAahDdASAGQQA2AmQgBiAFOQNYIAYgBDkDUCAGIAM5A0ggBkKAgICAgICAjcAANwMoIAZCgICAgICAgIvAADcDICAGQoCAgICAgICJwAA3AxggBkKAgICAgICAhsAANwMQIAZCgICAgICAgILAADcDCCAGQoCAgICAgID8PzcDACAGIAYrA7AGIAYrA7gGoEQAAADAxZ5CwaBEAAAAAHCZlEGiOQNAIAZEGC1EVPshGUAgBisDiAejRAAAAAAAAE5AokQAAAAAAECPQKIiAzkDOCAGQbAIaiADRAAAAAAAQI9AozkDACAGC59ZAQR/IwBBsKUEayIBJABBzJwBQenaABCLAQJAIAAEQCAAIQQMAQtByAgQKCIEQQBByAgQMCECQfiaAUIANwMAQfCaAUIANwMAQbibAUIANwMAQcCbAUIANwMAIAFB4CRqQYAKQcYAEDUaIAFB4KQEakHQCkHGABA1GiACQQE6ADAgAUHgJGogAUHgpARqIAJB8ABqEN0BIAJBADYCZCACQgA3A0ggAkIANwNQIAJCADcDWCACIAIrA7AGIAIrA7gGoEQAAADAxZ5CwaBEAAAAAHCZlEGiOQNAIAJEGC1EVPshGUAgAisDiAejRAAAAAAAAE5AokQAAAAAAECPQKI5AzgLIAFB4CRqQQBBgIAEEDAaIAFB+wA6AOAkIAFB0CRqIAQrAwA5AwAgAUKAgICAgAE3A8gkIAFB2gs2AsQkIAFB2As2AsAkIAFB4CRqQQFyQYACQZYLIAFBwCRqEAwhAiABQbAkaiAEKwMIOQMAIAFCiICAgIABNwOoJCABQdoLNgKkJCABQeELNgKgJCACQQFqIgIgAUHgJGpqQYACQZYLIAFBoCRqEAwhAyABQZAkaiAEKwMQOQMAIAFCkICAgIABNwOIJCABQdoLNgKEJCABQeMLNgKAJCACIANqIgIgAUHgJGpqQYACQZYLIAFBgCRqEAwhAyABQfAjaiAEKwMYOQMAIAFCmICAgIABNwPoIyABQdoLNgLkIyABQeULNgLgIyACIANqIgIgAUHgJGpqQYACQZYLIAFB4CNqEAwhAyABQdAjaiAEKwMgOQMAIAFCoICAgIABNwPIIyABQdoLNgLEIyABQegLNgLAIyACIANqIgIgAUHgJGpqQYACQZYLIAFBwCNqEAwhAyABQbAjaiAEKwMoOQMAIAFCqICAgIABNwOoIyABQdoLNgKkIyABQesLNgKgIyACIANqIgIgAUHgJGpqQYACQZYLIAFBoCNqEAwhAyABQZAjaiAELQAwNgIAIAFCsICAgBA3A4gjIAFBtww2AoQjIAFBrww2AoAjIAIgA2oiAiABQeAkampBgAJB7gsgAUGAI2oQDCEDIAFB8CJqIAQrAzg5AwAgAUK4gICAgAE3A+giIAFB2gs2AuQiIAFBvAw2AuAiIAIgA2oiAiABQeAkampBgAJBlgsgAUHgImoQDCEDIAFB0CJqIAQrA0A5AwAgAULAgICAgAE3A8giIAFB2gs2AsQiIAFBwww2AsAiIAIgA2oiAiABQeAkampBgAJBlgsgAUHAImoQDCEDIAFBsCJqIAQrA0g5AwAgAULIgICAgAE3A6giIAFB2gs2AqQiIAFB0gw2AqAiIAIgA2oiAiABQeAkampBgAJBlgsgAUGgImoQDCEDIAFBkCJqIAQrA1A5AwAgAULQgICAgAE3A4giIAFB2gs2AoQiIAFB4gw2AoAiIAIgA2oiAiABQeAkampBgAJBlgsgAUGAImoQDCEDIAFB8CFqIAQrA1g5AwAgAULYgICAgAE3A+ghIAFB2gs2AuQhIAFB8Qw2AuAhIAIgA2oiAiABQeAkampBgAJBlgsgAUHgIWoQDCEDIAFB0CFqIAQoAmA2AgAgAULggICAwAA3A8ghIAFBkQ02AsQhIAFBgA02AsAhIAIgA2oiAiABQeAkampBgAJB7gsgAUHAIWoQDCEDIAFBsCFqIAQoAmQ2AgAgAULkgICAwAA3A6ghIAFB5A02AqQhIAFB1g02AqAhIAIgA2oiAiABQeAkampBgAJBlQ0gAUGgIWoQDCEDIAFBkCFqIAQoAmg2AgAgAULogICAwAA3A4ghIAFBkQ02AoQhIAFB7A02AoAhIAIgA2oiAiABQeAkampBgAJB7gsgAUGAIWoQDCEDIAFB8CBqIAQoAmw2AgAgAULsgICAwAA3A+ggIAFBkQ02AuQgIAFBgA42AuAgIAIgA2oiAiABQeAkampBgAJB7gsgAUHgIGoQDCEDIAFB0CBqIAQoAnA2AgAgAULwgICAwAA3A8ggIAFB1Q42AsQgIAFBzg42AsAgIAIgA2oiAiABQeAkampBgAJBjA4gAUHAIGoQDCEDIAFBsCBqIAQoAnQ2AgAgAUL0gICAwAA3A6ggIAFBkQ02AqQgIAFBnw82AqAgIAIgA2oiAiABQeAkampBgAJB3g4gAUGgIGoQDCEDIAFBkCBqIAQoAng2AgAgAUL4gICAwAA3A4ggIAFBkQ02AoQgIAFBpw82AoAgIAIgA2oiAiABQeAkampBgAJB3g4gAUGAIGoQDCEDIAFB8B9qIAQoAnw2AgAgAUL8gICAwAA3A+gfIAFBkQ02AuQfIAFBtQ82AuAfIAIgA2oiAiABQeAkampBgAJB3g4gAUHgH2oQDCEDIAFB0B9qIAQsAIABNgIAIAFCgIGAgBA3A8gfIAFBihA2AsQfIAFB/A82AsAfIAIgA2oiAiABQeAkampBgAJBuw8gAUHAH2oQDCEDIAFBsB9qIAQsAIEBNgIAIAFCgYGAgBA3A6gfIAFBihA2AqQfIAFBjxA2AqAfIAIgA2oiAiABQeAkampBgAJBuw8gAUGgH2oQDCEDIAFBkB9qIAQsAIIBNgIAIAFCgoGAgBA3A4gfIAFBihA2AoQfIAFBlBA2AoAfIAIgA2oiAiABQeAkampBgAJBuw8gAUGAH2oQDCEDIAFB8B5qIAQoAoQBNgIAIAFChIGAgMAANwPoHiABQZENNgLkHiABQZsQNgLgHiACIANqIgIgAUHgJGpqQYACQd4OIAFB4B5qEAwhAyABQdAeaiAEKwOIATkDACABQoiBgICAATcDyB4gAUHaCzYCxB4gAUGhEDYCwB4gAiADaiICIAFB4CRqakGAAkGWCyABQcAeahAMIQMgAUGwHmogBCsDkAE5AwAgAUKQgYCAgAE3A6geIAFB2gs2AqQeIAFBpxA2AqAeIAIgA2oiAiABQeAkampBgAJBlgsgAUGgHmoQDCEDIAFBkB5qIAQrA5gBOQMAIAFCmIGAgIABNwOIHiABQdoLNgKEHiABQa0QNgKAHiACIANqIgIgAUHgJGpqQYACQZYLIAFBgB5qEAwhAyABQfAdaiAEKwOgATkDACABQqCBgICAATcD6B0gAUHaCzYC5B0gAUGxEDYC4B0gAiADaiICIAFB4CRqakGAAkGWCyABQeAdahAMIQMgAUHQHWogBCsDqAE5AwAgAUKogYCAgAE3A8gdIAFB2gs2AsQdIAFBtRA2AsAdIAIgA2oiAiABQeAkampBgAJBlgsgAUHAHWoQDCEDIAFBsB1qIAQrA7ABOQMAIAFCsIGAgIABNwOoHSABQdoLNgKkHSABQbkQNgKgHSACIANqIgIgAUHgJGpqQYACQZYLIAFBoB1qEAwhAyABQZAdaiAEKwO4ATkDACABQriBgICAATcDiB0gAUHaCzYChB0gAUG8EDYCgB0gAiADaiICIAFB4CRqakGAAkGWCyABQYAdahAMIQMgAUHwHGogBCsDwAE5AwAgAULAgYCAgAE3A+gcIAFB2gs2AuQcIAFBvxA2AuAcIAIgA2oiAiABQeAkampBgAJBlgsgAUHgHGoQDCEDIAFB0BxqIAQrA8gBOQMAIAFCyIGAgIABNwPIHCABQdoLNgLEHCABQcIQNgLAHCACIANqIgIgAUHgJGpqQYACQZYLIAFBwBxqEAwhAyABQbAcaiAEKwPQATkDACABQtCBgICAATcDqBwgAUHaCzYCpBwgAUHIEDYCoBwgAiADaiICIAFB4CRqakGAAkGWCyABQaAcahAMIQMgAUGQHGogBCsD2AE5AwAgAULYgYCAgAE3A4gcIAFB2gs2AoQcIAFBzBA2AoAcIAIgA2oiAiABQeAkampBgAJBlgsgAUGAHGoQDCEDIAFB8BtqIAQrA+ABOQMAIAFC4IGAgIABNwPoGyABQdoLNgLkGyABQdQQNgLgGyACIANqIgIgAUHgJGpqQYACQZYLIAFB4BtqEAwhAyABQdAbaiAEKwPoATkDACABQuiBgICAATcDyBsgAUHaCzYCxBsgAUHbEDYCwBsgAiADaiICIAFB4CRqakGAAkGWCyABQcAbahAMIQMgAUGwG2ogBCsD8AE5AwAgAULwgYCAgAE3A6gbIAFB2gs2AqQbIAFB4hA2AqAbIAIgA2oiAiABQeAkampBgAJBlgsgAUGgG2oQDCEDIAFBkBtqIAQrA/gBOQMAIAFC+IGAgIABNwOIGyABQdoLNgKEGyABQeQQNgKAGyACIANqIgIgAUHgJGpqQYACQZYLIAFBgBtqEAwhAyABQfAaaiAEKwOAAjkDACABQoCCgICAATcD6BogAUHaCzYC5BogAUHqEDYC4BogAiADaiICIAFB4CRqakGAAkGWCyABQeAaahAMIQMgAUHQGmogBCsDiAI5AwAgAUKIgoCAgAE3A8gaIAFB2gs2AsQaIAFB8BA2AsAaIAIgA2oiAiABQeAkampBgAJBlgsgAUHAGmoQDCEDIAFBsBpqIAQrA5ACOQMAIAFCkIKAgIABNwOoGiABQdoLNgKkGiABQfYQNgKgGiACIANqIgIgAUHgJGpqQYACQZYLIAFBoBpqEAwhAyABQZAaaiAEKwOYAjkDACABQpiCgICAATcDiBogAUHaCzYChBogAUH8EDYCgBogAiADaiICIAFB4CRqakGAAkGWCyABQYAaahAMIQMgAUHwGWogBCsDoAI5AwAgAUKggoCAgAE3A+gZIAFB2gs2AuQZIAFBgxE2AuAZIAIgA2oiAiABQeAkampBgAJBlgsgAUHgGWoQDCEDIAFB0BlqIAQrA6gCOQMAIAFCqIKAgIABNwPIGSABQdoLNgLEGSABQYoRNgLAGSACIANqIgIgAUHgJGpqQYACQZYLIAFBwBlqEAwhAyABQbAZaiAEKwOwAjkDACABQrCCgICAATcDqBkgAUHaCzYCpBkgAUGPETYCoBkgAiADaiICIAFB4CRqakGAAkGWCyABQaAZahAMIQMgAUGQGWogBCsDuAI5AwAgAUK4goCAgAE3A4gZIAFB2gs2AoQZIAFBlxE2AoAZIAIgA2oiAiABQeAkampBgAJBlgsgAUGAGWoQDCEDIAFB8BhqIAQrA8ACOQMAIAFCwIKAgIABNwPoGCABQdoLNgLkGCABQZ0RNgLgGCACIANqIgIgAUHgJGpqQYACQZYLIAFB4BhqEAwhAyABQdAYaiAEKwPIAjkDACABQsiCgICAATcDyBggAUHaCzYCxBggAUGjETYCwBggAiADaiICIAFB4CRqakGAAkGWCyABQcAYahAMIQMgAUGwGGogBCgC0AI2AgAgAULQgoCAwAA3A6gYIAFBkQ02AqQYIAFBqhE2AqAYIAIgA2oiAiABQeAkampBgAJB3g4gAUGgGGoQDCEDIAFBkBhqIAQrA9gCOQMAIAFC2IKAgIABNwOIGCABQdoLNgKEGCABQa8RNgKAGCACIANqIgIgAUHgJGpqQYACQZYLIAFBgBhqEAwhAyABQfAXaiAEKwPgAjkDACABQuCCgICAATcD6BcgAUHaCzYC5BcgAUG1ETYC4BcgAiADaiICIAFB4CRqakGAAkGWCyABQeAXahAMIQMgAUHQF2ogBCsD6AI5AwAgAULogoCAgAE3A8gXIAFB2gs2AsQXIAFBuxE2AsAXIAIgA2oiAiABQeAkampBgAJBlgsgAUHAF2oQDCEDIAFBsBdqIAQrA/ACOQMAIAFC8IKAgIABNwOoFyABQdoLNgKkFyABQcERNgKgFyACIANqIgIgAUHgJGpqQYACQZYLIAFBoBdqEAwhAyABQZAXaiAEKwP4AjkDACABQviCgICAATcDiBcgAUHaCzYChBcgAUHHETYCgBcgAiADaiICIAFB4CRqakGAAkGWCyABQYAXahAMIQMgAUHwFmogBCsDgAM5AwAgAUKAg4CAgAE3A+gWIAFB2gs2AuQWIAFBzRE2AuAWIAIgA2oiAiABQeAkampBgAJBlgsgAUHgFmoQDCEDIAFB0BZqIAQrA4gDOQMAIAFCiIOAgIABNwPIFiABQdoLNgLEFiABQdMRNgLAFiACIANqIgIgAUHgJGpqQYACQZYLIAFBwBZqEAwhAyABQbAWaiAEKwOQAzkDACABQpCDgICAATcDqBYgAUHaCzYCpBYgAUHZETYCoBYgAiADaiICIAFB4CRqakGAAkGWCyABQaAWahAMIQMgAUGQFmogBCsDmAM5AwAgAUKYg4CAgAE3A4gWIAFB2gs2AoQWIAFB3xE2AoAWIAIgA2oiAiABQeAkampBgAJBlgsgAUGAFmoQDCEDIAFB8BVqIAQrA6ADOQMAIAFCoIOAgIABNwPoFSABQdoLNgLkFSABQeURNgLgFSACIANqIgIgAUHgJGpqQYACQZYLIAFB4BVqEAwhAyABQdAVaiAEKwOoAzkDACABQqiDgICAATcDyBUgAUHaCzYCxBUgAUHrETYCwBUgAiADaiICIAFB4CRqakGAAkGWCyABQcAVahAMIQMgAUGwFWogBCsDsAM5AwAgAUKwg4CAgAE3A6gVIAFB2gs2AqQVIAFB8BE2AqAVIAIgA2oiAiABQeAkampBgAJBlgsgAUGgFWoQDCEDIAFBkBVqIAQrA7gDOQMAIAFCuIOAgIABNwOIFSABQdoLNgKEFSABQfURNgKAFSACIANqIgIgAUHgJGpqQYACQZYLIAFBgBVqEAwhAyABQfAUaiAEKwPAAzkDACABQsCDgICAATcD6BQgAUHaCzYC5BQgAUH6ETYC4BQgAiADaiICIAFB4CRqakGAAkGWCyABQeAUahAMIQMgAUHQFGogBCsDyAM5AwAgAULIg4CAgAE3A8gUIAFB2gs2AsQUIAFB/xE2AsAUIAIgA2oiAiABQeAkampBgAJBlgsgAUHAFGoQDCEDIAFBsBRqIAQrA9ADOQMAIAFC0IOAgIABNwOoFCABQdoLNgKkFCABQYQSNgKgFCACIANqIgIgAUHgJGpqQYACQZYLIAFBoBRqEAwhAyABQZAUaiAEKwPYAzkDACABQtiDgICAATcDiBQgAUHaCzYChBQgAUGJEjYCgBQgAiADaiICIAFB4CRqakGAAkGWCyABQYAUahAMIQMgAUHwE2ogBCsD4AM5AwAgAULgg4CAgAE3A+gTIAFB2gs2AuQTIAFBjxI2AuATIAIgA2oiAiABQeAkampBgAJBlgsgAUHgE2oQDCEDIAFB0BNqIAQrA+gDOQMAIAFC6IOAgIABNwPIEyABQdoLNgLEEyABQZUSNgLAEyACIANqIgIgAUHgJGpqQYACQZYLIAFBwBNqEAwhAyABQbATaiAEKwPwAzkDACABQvCDgICAATcDqBMgAUHaCzYCpBMgAUGYEjYCoBMgAiADaiICIAFB4CRqakGAAkGWCyABQaATahAMIQMgAUGQE2ogBCsD+AM5AwAgAUL4g4CAgAE3A4gTIAFB2gs2AoQTIAFBnBI2AoATIAIgA2oiAiABQeAkampBgAJBlgsgAUGAE2oQDCEDIAFB8BJqIAQrA4AEOQMAIAFCgISAgIABNwPoEiABQdoLNgLkEiABQaASNgLgEiACIANqIgIgAUHgJGpqQYACQZYLIAFB4BJqEAwhAyABQdASaiAEKwOIBDkDACABQoiEgICAATcDyBIgAUHaCzYCxBIgAUGlEjYCwBIgAiADaiICIAFB4CRqakGAAkGWCyABQcASahAMIQMgAUGwEmogBCsDkAQ5AwAgAUKQhICAgAE3A6gSIAFB2gs2AqQSIAFBqRI2AqASIAIgA2oiAiABQeAkampBgAJBlgsgAUGgEmoQDCEDIAFBkBJqIAQrA5gEOQMAIAFCmISAgIABNwOIEiABQdoLNgKEEiABQa8SNgKAEiACIANqIgIgAUHgJGpqQYACQZYLIAFBgBJqEAwhAyABQfARaiAEKwOgBDkDACABQqCEgICAATcD6BEgAUHaCzYC5BEgAUGzEjYC4BEgAiADaiICIAFB4CRqakGAAkGWCyABQeARahAMIQMgAUHQEWogBCsDqAQ5AwAgAUKohICAgAE3A8gRIAFB2gs2AsQRIAFBtxI2AsARIAIgA2oiAiABQeAkampBgAJBlgsgAUHAEWoQDCEDIAFBsBFqIAQrA7AEOQMAIAFCsISAgIABNwOoESABQdoLNgKkESABQbsSNgKgESACIANqIgIgAUHgJGpqQYACQZYLIAFBoBFqEAwhAyABQZARaiAEKwO4BDkDACABQriEgICAATcDiBEgAUHaCzYChBEgAUHAEjYCgBEgAiADaiICIAFB4CRqakGAAkGWCyABQYARahAMIQMgAUHwEGogBCsDwAQ5AwAgAULAhICAgAE3A+gQIAFB2gs2AuQQIAFBxRI2AuAQIAIgA2oiAiABQeAkampBgAJBlgsgAUHgEGoQDCEDIAFB0BBqIAQrA8gEOQMAIAFCyISAgIABNwPIECABQdoLNgLEECABQcoSNgLAECACIANqIgIgAUHgJGpqQYACQZYLIAFBwBBqEAwhAyABQbAQaiAEKwPQBDkDACABQtCEgICAATcDqBAgAUHaCzYCpBAgAUHOEjYCoBAgAiADaiICIAFB4CRqakGAAkGWCyABQaAQahAMIQMgAUGQEGogBCsD2AQ5AwAgAULYhICAgAE3A4gQIAFB2gs2AoQQIAFB0hI2AoAQIAIgA2oiAiABQeAkampBgAJBlgsgAUGAEGoQDCEDIAFB8A9qIAQrA+AEOQMAIAFC4ISAgIABNwPoDyABQdoLNgLkDyABQdYSNgLgDyACIANqIgIgAUHgJGpqQYACQZYLIAFB4A9qEAwhAyABQdAPaiAEKwPoBDkDACABQuiEgICAATcDyA8gAUHaCzYCxA8gAUHaEjYCwA8gAiADaiICIAFB4CRqakGAAkGWCyABQcAPahAMIQMgAUGwD2ogBCsD8AQ5AwAgAULwhICAgAE3A6gPIAFB2gs2AqQPIAFB3hI2AqAPIAIgA2oiAiABQeAkampBgAJBlgsgAUGgD2oQDCEDIAFBkA9qIAQrA/gEOQMAIAFC+ISAgIABNwOIDyABQdoLNgKEDyABQeISNgKADyACIANqIgIgAUHgJGpqQYACQZYLIAFBgA9qEAwhAyABQfAOaiAEKwOABTkDACABQoCFgICAATcD6A4gAUHaCzYC5A4gAUHmEjYC4A4gAiADaiICIAFB4CRqakGAAkGWCyABQeAOahAMIQMgAUHQDmogBCsDiAU5AwAgAUKIhYCAgAE3A8gOIAFB2gs2AsQOIAFB6xI2AsAOIAIgA2oiAiABQeAkampBgAJBlgsgAUHADmoQDCEDIAFBsA5qIAQrA5AFOQMAIAFCkIWAgIABNwOoDiABQdoLNgKkDiABQfESNgKgDiACIANqIgIgAUHgJGpqQYACQZYLIAFBoA5qEAwhAyABQZAOaiAEKwOYBTkDACABQpiFgICAATcDiA4gAUHaCzYChA4gAUH2EjYCgA4gAiADaiICIAFB4CRqakGAAkGWCyABQYAOahAMIQMgAUHwDWogBCsDoAU5AwAgAUKghYCAgAE3A+gNIAFB2gs2AuQNIAFB+xI2AuANIAIgA2oiAiABQeAkampBgAJBlgsgAUHgDWoQDCEDIAFB0A1qIAQrA6gFOQMAIAFCqIWAgIABNwPIDSABQdoLNgLEDSABQYATNgLADSACIANqIgIgAUHgJGpqQYACQZYLIAFBwA1qEAwhAyABQbANaiAEKwOwBTkDACABQrCFgICAATcDqA0gAUHaCzYCpA0gAUGEEzYCoA0gAiADaiICIAFB4CRqakGAAkGWCyABQaANahAMIQMgAUGQDWogBCsDuAU5AwAgAUK4hYCAgAE3A4gNIAFB2gs2AoQNIAFBiBM2AoANIAIgA2oiAiABQeAkampBgAJBlgsgAUGADWoQDCEDIAFB8AxqIAQrA8AFOQMAIAFCwIWAgIABNwPoDCABQdoLNgLkDCABQYwTNgLgDCACIANqIgIgAUHgJGpqQYACQZYLIAFB4AxqEAwhAyABQdAMaiAEKwPIBTkDACABQsiFgICAATcDyAwgAUHaCzYCxAwgAUGQEzYCwAwgAiADaiICIAFB4CRqakGAAkGWCyABQcAMahAMIQMgAUGwDGogBCsD0AU5AwAgAULQhYCAgAE3A6gMIAFB2gs2AqQMIAFBlBM2AqAMIAIgA2oiAiABQeAkampBgAJBlgsgAUGgDGoQDCEDIAFBkAxqIAQrA9gFOQMAIAFC2IWAgIABNwOIDCABQdoLNgKEDCABQZgTNgKADCACIANqIgIgAUHgJGpqQYACQZYLIAFBgAxqEAwhAyABQfALaiAEKwPgBTkDACABQuCFgICAATcD6AsgAUHaCzYC5AsgAUGcEzYC4AsgAiADaiICIAFB4CRqakGAAkGWCyABQeALahAMIQMgAUHQC2ogBCsD6AU5AwAgAULohYCAgAE3A8gLIAFB2gs2AsQLIAFBohM2AsALIAIgA2oiAiABQeAkampBgAJBlgsgAUHAC2oQDCEDIAFBsAtqIAQrA/AFOQMAIAFC8IWAgIABNwOoCyABQdoLNgKkCyABQacTNgKgCyACIANqIgIgAUHgJGpqQYACQZYLIAFBoAtqEAwhAyABQZALaiAEKwP4BTkDACABQviFgICAATcDiAsgAUHaCzYChAsgAUGsEzYCgAsgAiADaiICIAFB4CRqakGAAkGWCyABQYALahAMIQMgAUHwCmogBCsDgAY5AwAgAUKAhoCAgAE3A+gKIAFB2gs2AuQKIAFBshM2AuAKIAIgA2oiAiABQeAkampBgAJBlgsgAUHgCmoQDCEDIAFB0ApqIAQrA4gGOQMAIAFCiIaAgIABNwPICiABQdoLNgLECiABQbYTNgLACiACIANqIgIgAUHgJGpqQYACQZYLIAFBwApqEAwhAyABQbAKaiAEKwOQBjkDACABQpCGgICAATcDqAogAUHaCzYCpAogAUG6EzYCoAogAiADaiICIAFB4CRqakGAAkGWCyABQaAKahAMIQMgAUGQCmogBCsDmAY5AwAgAUKYhoCAgAE3A4gKIAFB2gs2AoQKIAFBvBM2AoAKIAIgA2oiAiABQeAkampBgAJBlgsgAUGACmoQDCEDIAFB8AlqIAQrA6AGOQMAIAFCoIaAgIABNwPoCSABQdoLNgLkCSABQcETNgLgCSACIANqIgIgAUHgJGpqQYACQZYLIAFB4AlqEAwhAyABQdAJaiAEKwOoBjkDACABQqiGgICAATcDyAkgAUHaCzYCxAkgAUHGEzYCwAkgAiADaiICIAFB4CRqakGAAkGWCyABQcAJahAMIQMgAUGwCWogBCsDsAY5AwAgAUKwhoCAgAE3A6gJIAFB2gs2AqQJIAFB0BM2AqAJIAIgA2oiAiABQeAkampBgAJBlgsgAUGgCWoQDCEDIAFBkAlqIAQrA7gGOQMAIAFCuIaAgIABNwOICSABQdoLNgKECSABQdsTNgKACSACIANqIgIgAUHgJGpqQYACQZYLIAFBgAlqEAwhAyABQfAIaiAEKwPABjkDACABQsCGgICAATcD6AggAUHaCzYC5AggAUHnEzYC4AggAiADaiICIAFB4CRqakGAAkGWCyABQeAIahAMIQMgAUHQCGogBCsDyAY5AwAgAULIhoCAgAE3A8gIIAFB2gs2AsQIIAFB7RM2AsAIIAIgA2oiAiABQeAkampBgAJBlgsgAUHACGoQDCEDIAFBsAhqIAQrA9AGOQMAIAFC0IaAgIABNwOoCCABQdoLNgKkCCABQfITNgKgCCACIANqIgIgAUHgJGpqQYACQZYLIAFBoAhqEAwhAyABQZAIaiAEKwPYBjkDACABQtiGgICAATcDiAggAUHaCzYChAggAUH4EzYCgAggAiADaiICIAFB4CRqakGAAkGWCyABQYAIahAMIQMgASAEKwPgBjkD8AcgAULghoCAgAE3A+gHIAFB2gs2AuQHIAFB/RM2AuAHIAIgA2oiAiABQeAkampBgAJBlgsgAUHgB2oQDCEDIAEgBCsD6AY5A9AHIAFC6IaAgIABNwPIByABQdoLNgLEByABQYMUNgLAByACIANqIgIgAUHgJGpqQYACQZYLIAFBwAdqEAwhAyABIAQrA/AGOQOwByABQvCGgICAATcDqAcgAUHaCzYCpAcgAUGJFDYCoAcgAiADaiICIAFB4CRqakGAAkGWCyABQaAHahAMIQMgASAEKwP4BjkDkAcgAUL4hoCAgAE3A4gHIAFB2gs2AoQHIAFBjhQ2AoAHIAIgA2oiAiABQeAkampBgAJBlgsgAUGAB2oQDCEDIAEgBCsDgAc5A/AGIAFCgIeAgIABNwPoBiABQdoLNgLkBiABQZQUNgLgBiACIANqIgIgAUHgJGpqQYACQZYLIAFB4AZqEAwhAyABIAQrA4gHOQPQBiABQoiHgICAATcDyAYgAUHaCzYCxAYgAUGXFDYCwAYgAiADaiICIAFB4CRqakGAAkGWCyABQcAGahAMIQMgASAELACQBzYCsAYgAUKQh4CAEDcDqAYgAUGKEDYCpAYgAUGgFDYCoAYgAiADaiICIAFB4CRqakGAAkG7DyABQaAGahAMIQMgASAEQZEHajYCkAYgAUKRh4CAsAE3A4gGIAFB+xQ2AoQGIAFB8hQ2AoAGIAIgA2oiAiABQeAkampBgAJBrxQgAUGABmoQDCEDIAEgBCgCnAc2AvAFIAFCnIeAgMAANwPoBSABQZENNgLkBSABQYMVNgLgBSACIANqIgIgAUHgJGpqQYACQd4OIAFB4AVqEAwhAyABIAQoAqAHNgLQBSABQqCHgIDAADcDyAUgAUGRFTYCxAUgAUGLFTYCwAUgAiADaiICIAFB4CRqakGAAkGMDiABQcAFahAMIQMgASAEKAKkBzYCsAUgAUKkh4CAwAA3A6gFIAFBkRU2AqQFIAFBlhU2AqAFIAIgA2oiAiABQeAkampBgAJBjA4gAUGgBWoQDCEDIAEgBCsDqAc5A5AFIAFCqIeAgIABNwOIBSABQdoLNgKEBSABQZ0VNgKABSACIANqIgIgAUHgJGpqQYACQZYLIAFBgAVqEAwhAyABIAQrA7AHOQPwBCABQrCHgICAATcD6AQgAUHaCzYC5AQgAUGoFTYC4AQgAiADaiICIAFB4CRqakGAAkGWCyABQeAEahAMIQMgASAEKwO4BzkD0AQgAUK4h4CAgAE3A8gEIAFB2gs2AsQEIAFBqxU2AsAEIAIgA2oiAiABQeAkampBgAJBlgsgAUHABGoQDCEDIAEgBCsDwAc5A7AEIAFCwIeAgIABNwOoBCABQdoLNgKkBCABQa4VNgKgBCACIANqIgIgAUHgJGpqQYACQZYLIAFBoARqEAwhAyABIAQrA8gHOQOQBCABQsiHgICAATcDiAQgAUHaCzYChAQgAUGxFTYCgAQgAiADaiICIAFB4CRqakGAAkGWCyABQYAEahAMIQMgASAEKwPQBzkD8AMgAULQh4CAgAE3A+gDIAFB2gs2AuQDIAFBtBU2AuADIAIgA2oiAiABQeAkampBgAJBlgsgAUHgA2oQDCEDIAEgBCsD2Ac5A9ADIAFC2IeAgIABNwPIAyABQdoLNgLEAyABQbcVNgLAAyACIANqIgIgAUHgJGpqQYACQZYLIAFBwANqEAwhAyABIAQrA+AHOQOwAyABQuCHgICAATcDqAMgAUHaCzYCpAMgAUG6FTYCoAMgAiADaiICIAFB4CRqakGAAkGWCyABQaADahAMIQMgASAEKwPoBzkDkAMgAULoh4CAgAE3A4gDIAFB2gs2AoQDIAFBvRU2AoADIAIgA2oiAiABQeAkampBgAJBlgsgAUGAA2oQDCEDIAEgBCsD8Ac5A/ACIAFC8IeAgIABNwPoAiABQdoLNgLkAiABQcMVNgLgAiACIANqIgIgAUHgJGpqQYACQZYLIAFB4AJqEAwhAyABIAQrA/gHOQPQAiABQviHgICAATcDyAIgAUHaCzYCxAIgAUHGFTYCwAIgAiADaiICIAFB4CRqakGAAkGWCyABQcACahAMIQMgASAEQYAIaisDADkDsAIgAUKAiICAgAE3A6gCIAFB2gs2AqQCIAFB1BU2AqACIAIgA2oiAiABQeAkampBgAJBlgsgAUGgAmoQDCEDIAEgBEGICGorAwA5A5ACIAFCiIiAgIABNwOIAiABQdoLNgKEAiABQdgVNgKAAiACIANqIgIgAUHgJGpqQYACQZYLIAFBgAJqEAwhAyABIARBkAhqKwMAOQPwASABQpCIgICAATcD6AEgAUHaCzYC5AEgAUHbFTYC4AEgAiADaiICIAFB4CRqakGAAkGWCyABQeABahAMIQMgASAEQZgIaisDADkD0AEgAUKYiICAgAE3A8gBIAFB2gs2AsQBIAFB3hU2AsABIAIgA2oiAiABQeAkampBgAJBlgsgAUHAAWoQDCEDIAEgBEGgCGorAwA5A7ABIAFCoIiAgIABNwOoASABQdoLNgKkASABQeEVNgKgASACIANqIgIgAUHgJGpqQYACQZYLIAFBoAFqEAwhAyABIARBqAhqKAIANgKQASABQqiIgIDAADcDiAEgAUGRFTYChAEgAUHnFTYCgAEgAiADaiICIAFB4CRqakGAAkGMDiABQYABahAMIQMgASAEQbAIaisDADkDcCABQrCIgICAATcDaCABQdoLNgJkIAFB7hU2AmAgAiADaiICIAFB4CRqakGAAkGWCyABQeAAahAMIQMgASAEQbgIai0AADYCUCABQriIgIAQNwNI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KAIEQQFxRQRAIAZBfzYCACAGIAAgASACIAMgBCAGIAAoAgAoAhARBQAiATYCGAJAAkACQCAGKAIADgIAAQILIAVBADoAAAwDCyAFQQE6AAAMAgsgBUEBOgAAIARBBDYCAAwBCyAGIAMoAhwiADYCACAAIAAoAgRBAWo2AgQgBhAyIQcCfyAGKAIAIgAgACgCBEEBayIBNgIEIAFBf0YLBEAgACAAKAIAKAIIEQEACyAGIAMoAhwiADYCACAAIAAoAgRBAWo2AgQgBhBhIQACfyAGKAIAIgEgASgCBEEBayIDNgIEIANBf0YLBEAgASABKAIAKAIIEQEACyAGIAAgACgCACgCGBECACAGQQxyIAAgACgCACgCHBECACAFIAZBGGogAiAGIAZBGGoiAyAHIARBARCCASAGRjoAACAGKAIYIQEDQCADQQxrEBgiAyAGRw0ACwsgBkEgaiQAIAELsAQBAX8jAEGQAmsiACQAIAAgAjYCgAIgACABNgKIAiAAQdABahAQIQYgACADKAIcIgE2AhAgASABKAIEQQFqNgIEIABBEGoQNCIBQcDaAEHa2gAgAEHgAWogASgCACgCIBEGABoCfyAAKAIQIgEgASgCBEEBayICNgIEIAJBf0YLBEAgASABKAIAKAIIEQEACyAAQcABahAQIgIgAi0AC0EHdgR/IAIoAghB/////wdxQQFrBUEKCxAOIAACfyACLQALQQd2BEAgAigCAAwBCyACCyIBNgK8ASAAIABBEGo2AgwgAEEANgIIA0ACQCAAQYgCaiAAQYACahAvRQ0AIAAoArwBIAECfyACLQALQQd2BEAgAigCBAwBCyACLQALCyIDakYEQCACIANBAXQQDiACIAItAAtBB3YEfyACKAIIQf////8HcUEBawVBCgsQDiAAAn8gAi0AC0EHdgRAIAIoAgAMAQsgAgsiASADajYCvAELIABBiAJqEB5BECABIABBvAFqIABBCGpBACAGIABBEGogAEEMaiAAQeABahBiDQAgAEGIAmoQIhoMAQsLIAIgACgCvAEgAWsQDgJ/IAItAAtBB3YEQCACKAIADAELIAILIQEQFiEDIAAgBTYCACABIAMgABCQAkEBRwRAIARBBDYCAAsgAEGIAmogAEGAAmoQJQRAIAQgBCgCAEECcjYCAAsgACgCiAIhASACEA0aIAYQDRogAEGQAmokACABC8sEAQJ/IwBBoAJrIgAkACAAIAI2ApACIAAgATYCmAIgAEHgAWogAyAAQfABaiAAQe8BaiAAQe4BahCjASAAQdABahAQIgEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxAOIAACfyABLQALQQd2BEAgASgCAAwBCyABCyIDNgLMASAAIABBIGo2AhwgAEEANgIYIABBAToAFyAAQcUAOgAWIAAsAO4BIQYgACwA7wEhBwNAAkAgAEGYAmogAEGQAmoQL0UNACAAKALMASADAn8gAS0AC0EHdgRAIAEoAgQMAQsgAS0ACwsiAmpGBEAgASACQQF0EA4gASABLQALQQd2BH8gASgCCEH/////B3FBAWsFQQoLEA4gAAJ/IAEtAAtBB3YEQCABKAIADAELIAELIgMgAmo2AswBCyAAQZgCahAeIABBF2ogAEEWaiADIABBzAFqIAcgBiAAQeABaiAAQSBqIABBHGogAEEYaiAAQfABahCiAQ0AIABBmAJqECIaDAELCyAAKAIcIQICQAJ/IAAtAOsBQQd2BEAgACgC5AEMAQsgAC0A6wELRQ0AIAAtABdFDQAgAiAAQSBqa0GfAUoNACACIAAoAhg2AgAgAkEEaiECCyAAIAMgACgCzAEgBBCRAiAFIAApAwA3AwAgBSAAKQMINwMIIABB4AFqIABBIGogAiAEECsgAEGYAmogAEGQAmoQJQRAIAQgBCgCAEECcjYCAAsgACgCmAIhAiABEA0aIABB4AFqEA0aIABBoAJqJAAgAgu6BAECfyMAQZACayIAJAAgACACNgKAAiAAIAE2AogCIABB0AFqIAMgAEHgAWogAEHfAWogAEHeAWoQowEgAEHAAWoQECIBIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQDiAAAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsiAzYCvAEgACAAQRBqNgIMIABBADYCCCAAQQE6AAcgAEHFADoABiAALADeASEGIAAsAN8BIQcDQAJAIABBiAJqIABBgAJqEC9FDQAgACgCvAEgAwJ/IAEtAAtBB3YEQCABKAIEDAELIAEtAAsLIgJqRgRAIAEgAkEBdBAOIAEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxAOIAACfyABLQALQQd2BEAgASgCAAwBCyABCyIDIAJqNgK8AQsgAEGIAmoQHiAAQQdqIABBBmogAyAAQbwBaiAHIAYgAEHQAWogAEEQaiAAQQxqIABBCGogAEHgAWoQogENACAAQYgCahAiGgwBCwsgACgCDCECAkACfyAALQDbAUEHdgRAIAAoAtQBDAELIAAtANsBC0UNACAALQAHRQ0AIAIgAEEQamtBnwFKDQAgAiAAKAIINgIAIAJBBGohAgsgBSADIAAoArwBIAQQkgI5AwAgAEHQAWogAEEQaiACIAQQKyAAQYgCaiAAQYACahAlBEAgBCAEKAIAQQJyNgIACyAAKAKIAiECIAEQDRogAEHQAWoQDRogAEGQAmokACACC7oEAQJ/IwBBkAJrIgAkACAAIAI2AoACIAAgATYCiAIgAEHQAWogAyAAQeABaiAAQd8BaiAAQd4BahCjASAAQcABahAQIgEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxAOIAACfyABLQALQQd2BEAgASgCAAwBCyABCyIDNgK8ASAAIABBEGo2AgwgAEEANgIIIABBAToAByAAQcUAOgAGIAAsAN4BIQYgACwA3wEhBwNAAkAgAEGIAmogAEGAAmoQL0UNACAAKAK8ASADAn8gAS0AC0EHdgRAIAEoAgQMAQsgAS0ACwsiAmpGBEAgASACQQF0EA4gASABLQALQQd2BH8gASgCCEH/////B3FBAWsFQQoLEA4gAAJ/IAEtAAtBB3YEQCABKAIADAELIAELIgMgAmo2ArwBCyAAQYgCahAeIABBB2ogAEEGaiADIABBvAFqIAcgBiAAQdABaiAAQRBqIABBDGogAEEIaiAAQeABahCiAQ0AIABBiAJqECIaDAELCyAAKAIMIQICQAJ/IAAtANsBQQd2BEAgACgC1AEMAQsgAC0A2wELRQ0AIAAtAAdFDQAgAiAAQRBqa0GfAUoNACACIAAoAgg2AgAgAkEEaiECCyAFIAMgACgCvAEgBBCTAjgCACAAQdABaiAAQRBqIAIgBBArIABBiAJqIABBgAJqECUEQCAEIAQoAgBBAnI2AgALIAAoAogCIQIgARANGiAAQdABahANGiAAQZACaiQAIAILiQQBAn8jAEHwAWsiACQAIAAgAjYC4AEgACABNgLoASADEEUhBiAAQdABaiADIABB3wFqEG0gAEHAAWoQECIBIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQDiAAAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsiAzYCvAEgACAAQRBqNgIMIABBADYCCCAALADfASEHA0ACQCAAQegBaiAAQeABahAvRQ0AIAAoArwBIAMCfyABLQALQQd2BEAgASgCBAwBCyABLQALCyICakYEQCABIAJBAXQQDiABIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQDiAAAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsiAyACajYCvAELIABB6AFqEB4gBiADIABBvAFqIABBCGogByAAQdABaiAAQRBqIABBDGpBwNoAEGINACAAQegBahAiGgwBCwsgACgCDCECAkACfyAALQDbAUEHdgRAIAAoAtQBDAELIAAtANsBC0UNACACIABBEGprQZ8BSg0AIAIgACgCCDYCACACQQRqIQILIAUgAyAAKAK8ASAEIAYQlAI3AwAgAEHQAWogAEEQaiACIAQQKyAAQegBaiAAQeABahAlBEAgBCAEKAIAQQJyNgIACyAAKALoASECIAEQDRogAEHQAWoQDRogAEHwAWokACACC4kEAQJ/IwBB8AFrIgAkACAAIAI2AuABIAAgATYC6AEgAxBFIQYgAEHQAWogAyAAQd8BahBtIABBwAFqEBAiASABLQALQQd2BH8gASgCCEH/////B3FBAWsFQQoLEA4gAAJ/IAEtAAtBB3YEQCABKAIADAELIAELIgM2ArwBIAAgAEEQajYCDCAAQQA2AgggACwA3wEhBwNAAkAgAEHoAWogAEHgAWoQL0UNACAAKAK8ASADAn8gAS0AC0EHdgRAIAEoAgQMAQsgAS0ACwsiAmpGBEAgASACQQF0EA4gASABLQALQQd2BH8gASgCCEH/////B3FBAWsFQQoLEA4gAAJ/IAEtAAtBB3YEQCABKAIADAELIAELIgMgAmo2ArwBCyAAQegBahAeIAYgAyAAQbwBaiAAQQhqIAcgAEHQAWogAEEQaiAAQQxqQcDaABBiDQAgAEHoAWoQIhoMAQsLIAAoAgwhAgJAAn8gAC0A2wFBB3YEQCAAKALUAQwBCyAALQDbAQtFDQAgAiAAQRBqa0GfAUoNACACIAAoAgg2AgAgAkEEaiECCyAFIAMgACgC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cyI6IHsidHlwZSI6ICIlcyIsICJvZmZzZXQiOiAlbHUsICJzaXplIjogJWx1LCAidmFsdWUiOiAiJWMifSwAb3BlcmF0aW9ubW9kZQBjaGFyAGluaXQAbWV0aG9kAGlzaW1wAGF5Y29mAGNvbjQxAGNjMQBjYzQAY2M1AGQyAGQzAGQ0AGRlbG1vAGV0YQBhcmdwZG90AG9tZ2NvZgBzaW5tYW8AdAB0MmNvZgB0M2NvZgB0NGNvZgB0NWNvZgB4MW10aDIAeDd0aG0xAG1kb3QAbm9kZWRvdAB4bGNvZgB4bWNvZgBub2RlY2YAaXJlegBkMjIwMQBkMjIxMQBkMzIxMABkMzIyMgBkNDQxMABkNDQyMgBkNTIyMABkNTIzMgBkNTQyMQBkNTQzMwBkZWR0AGRlbDEAZGVsMgBkZWwzAGRpZHQAZG1kdABkbm9kdABkb21kdABlMwBlZTIAcGVvAHBnaG8AcGhvAHBpbmNvAHBsbwBzZTIAc2UzAHNnaDIAc2doMwBzZ2g0AHNoMgBzaDMAc2kyAHNpMwBzbDIAc2wzAHNsNABnc3RvAHhmYWN0AHhnaDIAeGdoMwB4Z2g0AHhoMgB4aDMAeGkyAHhpMwB4bDIAeGwzAHhsNAB4bGFtbwB6bW9sAHptb3MAYXRpbWUAeGxpAHhuaQBhAGFsdHAAYWx0YQBlcG9jaGRheXMAamRzYXRlcG9jaABqZHNhdGVwb2NoRgBuZGRvdABuZG90AGJzdGFyAHJjc2UAaW5jbG8Abm9kZW8AZWNjbwBhcmdwbwBtbwBub19rb3phaQBjbGFzc2lmaWNhdGlvbgAiJXMiOiB7InR5cGUiOiAiJXMiLCAib2Zmc2V0IjogJWx1LCAic2l6ZSI6ICVsdSwgInZhbHVlIjogIiUxMHMifSwAaW50bGRlc2cAY2hhcl8xMQBlcGh0eXBlAGVsbnVtAGxvbmcAcmV2bnVtAG5vX3Vua296YWkAYW0AZW0AaW0AT20Ab20AbW0Abm0AdHVtaW4AbXUAcmFkaXVzZWFydGhrbQB4a2UAajIAajMAajQAajNvajIAZGlhX21tAHBlcmlvZF9zZWMAIiVzIjogeyJ0eXBlIjogIiVzIiwgIm9mZnNldCI6ICVsdSwgInNpemUiOiAlbHUsICJ2YWx1ZSI6ICIldSJ9LABhY3RpdmUAdW5zaWduZWQgY2hhcgBub3Rfb3JiaXRhbAByY3NfbTIALSsgICAwWDB4AChudWxsKQBBgBcLQREACgAREREAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAEQAPChEREQMKBwABAAkLCwAACQYLAAALAAYRAAAAERERAEHRFwshCwAAAAAAAAAAEQAKChEREQAKAAACAAkLAAAACQALAAALAEGLGAsBDABBlxgLFQwAAAAADAAAAAAJDAAAAAAADAAADABBxRgLAQ4AQdEYCxUNAAAABA0AAAAACQ4AAAAAAA4AAA4AQf8YCwEQAEGLGQseDwAAAAAPAAAAAAkQAAAAAAAQAAAQAAASAAAAEhISAEHCGQsOEgAAABISEgAAAAAAAAkAQfMZCwELAEH/GQsVCgAAAAAKAAAAAAkLAAAAAAALAAALAEGtGgsBDABBuRoLRwwAAAAADAAAAAAJDAAAAAAADAAADAAAMDEyMzQ1Njc4OUFCQ0RFRi0wWCswWCAwWC0weCsweCAweABpbmYASU5GAE5BTgAuAEGsGwsBHQBB0xsLBf//////AEGgHAuWAv////////////////////////////////////////////////////////////////8AAQIDBAUGBwgJ/////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj////////CgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAECBAcDBgUAaW5maW5pdHkAbmFuAEHAHgto0XSeAFedvSqAcFIP//8+JwoAAABkAAAA6AMAABAnAACghgEAQEIPAICWmAAA4fUFGAAAADUAAABxAAAAa////877//+Sv///GC1EVPsh6T8YLURU+yHpv9IhM3982QJA0iEzf3zZAsAAQbcfC/AVgBgtRFT7IQlAGC1EVPshCcAAAAAAAAAAAAMAAAAEAAAABAAAAAYAAACD+aIARE5uAPwpFQDRVycA3TT1AGLbwAA8mZUAQZBD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";if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile);}function getBinary(file){try{if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}else {throw "both async and sync fetching of the wasm failed"}}catch(err){abort(err);}}function getBinaryPromise(){if(!wasmBinary&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)){if(typeof fetch==="function"&&!isFileURI(wasmBinaryFile)){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){if(!response["ok"]){throw "failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()}).catch(function(){return getBinary(wasmBinaryFile)})}else {if(readAsync){return new Promise(function(resolve,reject){readAsync(wasmBinaryFile,function(response){resolve(new Uint8Array(response));},reject);})}}}return Promise.resolve().then(function(){return getBinary(wasmBinaryFile)})}function createWasm(){var info={"a":asmLibraryArg};function receiveInstance(instance,module){var exports=instance.exports;Module["asm"]=exports;wasmMemory=Module["asm"]["m"];updateGlobalBufferAndViews(wasmMemory.buffer);wasmTable=Module["asm"]["J"];addOnInit(Module["asm"]["n"]);removeRunDependency();}addRunDependency();function receiveInstantiationResult(result){receiveInstance(result["instance"]);}function instantiateArrayBuffer(receiver){return getBinaryPromise().then(function(binary){var result=WebAssembly.instantiate(binary,info);return result}).then(receiver,function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason);})}function instantiateAsync(){if(!wasmBinary&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&!isFileURI(wasmBinaryFile)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then(function(response){var result=WebAssembly.instantiateStreaming(response,info);return result.then(receiveInstantiationResult,function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");return instantiateArrayBuffer(receiveInstantiationResult)})})}else {return instantiateArrayBuffer(receiveInstantiationResult)}}if(Module["instantiateWasm"]){try{var exports=Module["instantiateWasm"](info,receiveInstance);return exports}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}instantiateAsync().catch(readyPromiseReject);return {}}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback(Module);continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){wasmTable.get(func)();}else {wasmTable.get(func)(callback.arg);}}else {func(callback.arg===undefined?null:callback.arg);}}}var ExceptionInfoAttrs={DESTRUCTOR_OFFSET:0,REFCOUNT_OFFSET:4,TYPE_OFFSET:8,CAUGHT_OFFSET:12,RETHROWN_OFFSET:13,SIZE:16};function ___cxa_allocate_exception(size){return _malloc(size+ExceptionInfoAttrs.SIZE)+ExceptionInfoAttrs.SIZE}function ExceptionInfo(excPtr){this.excPtr=excPtr;this.ptr=excPtr-ExceptionInfoAttrs.SIZE;this.set_type=function(type){HEAP32[this.ptr+ExceptionInfoAttrs.TYPE_OFFSET>>2]=type;};this.get_type=function(){return HEAP32[this.ptr+ExceptionInfoAttrs.TYPE_OFFSET>>2]};this.set_destructor=function(destructor){HEAP32[this.ptr+ExceptionInfoAttrs.DESTRUCTOR_OFFSET>>2]=destructor;};this.get_destructor=function(){return HEAP32[this.ptr+ExceptionInfoAttrs.DESTRUCTOR_OFFSET>>2]};this.set_refcount=function(refcount){HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=refcount;};this.set_caught=function(caught){caught=caught?1:0;HEAP8[this.ptr+ExceptionInfoAttrs.CAUGHT_OFFSET>>0]=caught;};this.get_caught=function(){return HEAP8[this.ptr+ExceptionInfoAttrs.CAUGHT_OFFSET>>0]!=0};this.set_rethrown=function(rethrown){rethrown=rethrown?1:0;HEAP8[this.ptr+ExceptionInfoAttrs.RETHROWN_OFFSET>>0]=rethrown;};this.get_rethrown=function(){return HEAP8[this.ptr+ExceptionInfoAttrs.RETHROWN_OFFSET>>0]!=0};this.init=function(type,destructor){this.set_type(type);this.set_destructor(destructor);this.set_refcount(0);this.set_caught(false);this.set_rethrown(false);};this.add_ref=function(){var value=HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2];HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=value+1;};this.release_ref=function(){var prev=HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2];HEAP32[this.ptr+ExceptionInfoAttrs.REFCOUNT_OFFSET>>2]=prev-1;return prev===1};}function ___cxa_throw(ptr,type,destructor){var info=new ExceptionInfo(ptr);info.init(type,destructor);throw ptr}function _abort(){abort();}function _emscripten_memcpy_big(dest,src,num){HEAPU8.copyWithin(dest,src,src+num);}function emscripten_realloc_buffer(size){try{wasmMemory.grow(size-buffer.byteLength+65535>>>16);updateGlobalBufferAndViews(wasmMemory.buffer);return 1}catch(e){}}function _emscripten_resize_heap(requestedSize){var oldSize=HEAPU8.length;requestedSize=requestedSize>>>0;var maxHeapSize=2147483648;if(requestedSize>maxHeapSize){return false}for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=emscripten_realloc_buffer(newSize);if(replacement){return true}}return false}var ENV={};function getExecutableName(){return thisProgram||"./this.program"}function getEnvStrings(){if(!getEnvStrings.strings){var lang=(typeof navigator==="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8";var env={"USER":"web_user","LOGNAME":"web_user","PATH":"/","PWD":"/","HOME":"/home/web_user","LANG":lang,"_":getExecutableName()};for(var x in ENV){env[x]=ENV[x];}var strings=[];for(var x in env){strings.push(x+"="+env[x]);}getEnvStrings.strings=strings;}return getEnvStrings.strings}var SYSCALLS={mappings:{},buffers:[null,[],[]],printChar:function(stream,curr){var buffer=SYSCALLS.buffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0;}else {buffer.push(curr);}},varargs:undefined,get:function(){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret},getStr:function(ptr){var ret=UTF8ToString(ptr);return ret},get64:function(low,high){return low}};function _environ_get(__environ,environ_buf){var bufSize=0;getEnvStrings().forEach(function(string,i){var ptr=environ_buf+bufSize;HEAP32[__environ+i*4>>2]=ptr;writeAsciiToMemory(string,ptr);bufSize+=string.length+1;});return 0}function _environ_sizes_get(penviron_count,penviron_buf_size){var strings=getEnvStrings();HEAP32[penviron_count>>2]=strings.length;var bufSize=0;strings.forEach(function(string){bufSize+=string.length+1;});HEAP32[penviron_buf_size>>2]=bufSize;return 0}function _fd_close(fd){return 0}function _fd_read(fd,iov,iovcnt,pnum){var stream=SYSCALLS.getStreamFromFD(fd);var num=SYSCALLS.doReadv(stream,iov,iovcnt);HEAP32[pnum>>2]=num;return 0}function _fd_seek(fd,offset_low,offset_high,whence,newOffset){}function _fd_write(fd,iov,iovcnt,pnum){var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){SYSCALLS.printChar(fd,HEAPU8[ptr+j]);}num+=len;}HEAP32[pnum>>2]=num;return 0}function __isLeapYear(year){return year%4===0&&(year%100!==0||year%400===0)}function __arraySum(array,index){var sum=0;for(var i=0;i<=index;sum+=array[i++]){}return sum}var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];function __addDays(date,days){var newDate=new Date(date.getTime());while(days>0){var leap=__isLeapYear(newDate.getFullYear());var currentMonth=newDate.getMonth();var daysInCurrentMonth=(leap?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR)[currentMonth];if(days>daysInCurrentMonth-newDate.getDate()){days-=daysInCurrentMonth-newDate.getDate()+1;newDate.setDate(1);if(currentMonth<11){newDate.setMonth(currentMonth+1);}else {newDate.setMonth(0);newDate.setFullYear(newDate.getFullYear()+1);}}else {newDate.setDate(newDate.getDate()+days);return newDate}}return newDate}function _strftime(s,maxsize,format,tm){var tm_zone=HEAP32[tm+40>>2];var date={tm_sec:HEAP32[tm>>2],tm_min:HEAP32[tm+4>>2],tm_hour:HEAP32[tm+8>>2],tm_mday:HEAP32[tm+12>>2],tm_mon:HEAP32[tm+16>>2],tm_year:HEAP32[tm+20>>2],tm_wday:HEAP32[tm+24>>2],tm_yday:HEAP32[tm+28>>2],tm_isdst:HEAP32[tm+32>>2],tm_gmtoff:HEAP32[tm+36>>2],tm_zone:tm_zone?UTF8ToString(tm_zone):""};var pattern=UTF8ToString(format);var EXPANSION_RULES_1={"%c":"%a %b %d %H:%M:%S %Y","%D":"%m/%d/%y","%F":"%Y-%m-%d","%h":"%b","%r":"%I:%M:%S %p","%R":"%H:%M","%T":"%H:%M:%S","%x":"%m/%d/%y","%X":"%H:%M:%S","%Ec":"%c","%EC":"%C","%Ex":"%m/%d/%y","%EX":"%H:%M:%S","%Ey":"%y","%EY":"%Y","%Od":"%d","%Oe":"%e","%OH":"%H","%OI":"%I","%Om":"%m","%OM":"%M","%OS":"%S","%Ou":"%u","%OU":"%U","%OV":"%V","%Ow":"%w","%OW":"%W","%Oy":"%y"};for(var rule in EXPANSION_RULES_1){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_1[rule]);}var WEEKDAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];function leadingSomething(value,digits,character){var str=typeof value==="number"?value.toString():value||"";while(str.length<digits){str=character[0]+str;}return str}function leadingNulls(value,digits){return leadingSomething(value,digits,"0")}function compareByDay(date1,date2){function sgn(value){return value<0?-1:value>0?1:0}var compare;if((compare=sgn(date1.getFullYear()-date2.getFullYear()))===0){if((compare=sgn(date1.getMonth()-date2.getMonth()))===0){compare=sgn(date1.getDate()-date2.getDate());}}return compare}function getFirstWeekStartDate(janFourth){switch(janFourth.getDay()){case 0:return new Date(janFourth.getFullYear()-1,11,29);case 1:return janFourth;case 2:return new Date(janFourth.getFullYear(),0,3);case 3:return new Date(janFourth.getFullYear(),0,2);case 4:return new Date(janFourth.getFullYear(),0,1);case 5:return new Date(janFourth.getFullYear()-1,11,31);case 6:return new Date(janFourth.getFullYear()-1,11,30)}}function getWeekBasedYear(date){var thisDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);var janFourthThisYear=new Date(thisDate.getFullYear(),0,4);var janFourthNextYear=new Date(thisDate.getFullYear()+1,0,4);var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);if(compareByDay(firstWeekStartThisYear,thisDate)<=0){if(compareByDay(firstWeekStartNextYear,thisDate)<=0){return thisDate.getFullYear()+1}else {return thisDate.getFullYear()}}else {return thisDate.getFullYear()-1}}var EXPANSION_RULES_2={"%a":function(date){return WEEKDAYS[date.tm_wday].substring(0,3)},"%A":function(date){return WEEKDAYS[date.tm_wday]},"%b":function(date){return MONTHS[date.tm_mon].substring(0,3)},"%B":function(date){return MONTHS[date.tm_mon]},"%C":function(date){var year=date.tm_year+1900;return leadingNulls(year/100|0,2)},"%d":function(date){return leadingNulls(date.tm_mday,2)},"%e":function(date){return leadingSomething(date.tm_mday,2," ")},"%g":function(date){return getWeekBasedYear(date).toString().substring(2)},"%G":function(date){return getWeekBasedYear(date)},"%H":function(date){return leadingNulls(date.tm_hour,2)},"%I":function(date){var twelveHour=date.tm_hour;if(twelveHour==0)twelveHour=12;else if(twelveHour>12)twelveHour-=12;return leadingNulls(twelveHour,2)},"%j":function(date){return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900)?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,date.tm_mon-1),3)},"%m":function(date){return leadingNulls(date.tm_mon+1,2)},"%M":function(date){return leadingNulls(date.tm_min,2)},"%n":function(){return "\n"},"%p":function(date){if(date.tm_hour>=0&&date.tm_hour<12){return "AM"}else {return "PM"}},"%S":function(date){return leadingNulls(date.tm_sec,2)},"%t":function(){return "\t"},"%u":function(date){return date.tm_wday||7},"%U":function(date){var janFirst=new Date(date.tm_year+1900,0,1);var firstSunday=janFirst.getDay()===0?janFirst:__addDays(janFirst,7-janFirst.getDay());var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);if(compareByDay(firstSunday,endDate)<0){var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,endDate.getMonth()-1)-31;var firstSundayUntilEndJanuary=31-firstSunday.getDate();var days=firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();return leadingNulls(Math.ceil(days/7),2)}return compareByDay(firstSunday,janFirst)===0?"01":"00"},"%V":function(date){var janFourthThisYear=new Date(date.tm_year+1900,0,4);var janFourthNextYear=new Date(date.tm_year+1901,0,4);var firstWeekStartThisYear=getFirstWeekStartDate(janFourthThisYear);var firstWeekStartNextYear=getFirstWeekStartDate(janFourthNextYear);var endDate=__addDays(new Date(date.tm_year+1900,0,1),date.tm_yday);if(compareByDay(endDate,firstWeekStartThisYear)<0){return "53"}if(compareByDay(firstWeekStartNextYear,endDate)<=0){return "01"}var daysDifference;if(firstWeekStartThisYear.getFullYear()<date.tm_year+1900){daysDifference=date.tm_yday+32-firstWeekStartThisYear.getDate();}else {daysDifference=date.tm_yday+1-firstWeekStartThisYear.getDate();}return leadingNulls(Math.ceil(daysDifference/7),2)},"%w":function(date){return date.tm_wday},"%W":function(date){var janFirst=new Date(date.tm_year,0,1);var firstMonday=janFirst.getDay()===1?janFirst:__addDays(janFirst,janFirst.getDay()===0?1:7-janFirst.getDay()+1);var endDate=new Date(date.tm_year+1900,date.tm_mon,date.tm_mday);if(compareByDay(firstMonday,endDate)<0){var februaryFirstUntilEndMonth=__arraySum(__isLeapYear(endDate.getFullYear())?__MONTH_DAYS_LEAP:__MONTH_DAYS_REGULAR,endDate.getMonth()-1)-31;var firstMondayUntilEndJanuary=31-firstMonday.getDate();var days=firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();return leadingNulls(Math.ceil(days/7),2)}return compareByDay(firstMonday,janFirst)===0?"01":"00"},"%y":function(date){return (date.tm_year+1900).toString().substring(2)},"%Y":function(date){return date.tm_year+1900},"%z":function(date){var off=date.tm_gmtoff;var ahead=off>=0;off=Math.abs(off)/60;off=off/60*100+off%60;return (ahead?"+":"-")+String("0000"+off).slice(-4)},"%Z":function(date){return date.tm_zone},"%%":function(){return "%"}};for(var rule in EXPANSION_RULES_2){if(pattern.includes(rule)){pattern=pattern.replace(new RegExp(rule,"g"),EXPANSION_RULES_2[rule](date));}}var bytes=intArrayFromString(pattern,false);if(bytes.length>maxsize){return 0}writeArrayToMemory(bytes,s);return bytes.length-1}function _strftime_l(s,maxsize,format,tm){return _strftime(s,maxsize,format,tm)}function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255;}ret.push(String.fromCharCode(chr));}return ret.join("")}var decodeBase64=typeof atob==="function"?atob:function(input){var keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");do{enc1=keyStr.indexOf(input.charAt(i++));enc2=keyStr.indexOf(input.charAt(i++));enc3=keyStr.indexOf(input.charAt(i++));enc4=keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!==64){output=output+String.fromCharCode(chr2);}if(enc4!==64){output=output+String.fromCharCode(chr3);}}while(i<input.length);return output};function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE==="boolean"&&ENVIRONMENT_IS_NODE){var buf;try{buf=Buffer.from(s,"base64");}catch(_){buf=new Buffer(s,"base64");}return new Uint8Array(buf["buffer"],buf["byteOffset"],buf["byteLength"])}try{var decoded=decodeBase64(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i);}return bytes}catch(_){throw new Error("Converting base64 string to bytes failed.")}}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var asmLibraryArg={"l":___cxa_allocate_exception,"k":___cxa_throw,"b":_abort,"j":_emscripten_memcpy_big,"a":_emscripten_resize_heap,"d":_environ_get,"e":_environ_sizes_get,"g":_fd_close,"f":_fd_read,"i":_fd_seek,"h":_fd_write,"c":_strftime_l};var asm=createWasm();var ___wasm_call_ctors=Module["___wasm_call_ctors"]=function(){return (___wasm_call_ctors=Module["___wasm_call_ctors"]=Module["asm"]["n"]).apply(null,arguments)};var _getCoveragePositions=Module["_getCoveragePositions"]=function(){return (_getCoveragePositions=Module["_getCoveragePositions"]=Module["asm"]["o"]).apply(null,arguments)};var _sizeOfsatelliteCatalog=Module["_sizeOfsatelliteCatalog"]=function(){return (_sizeOfsatelliteCatalog=Module["_sizeOfsatelliteCatalog"]=Module["asm"]["p"]).apply(null,arguments)};var _freePtr=Module["_freePtr"]=function(){return (_freePtr=Module["_freePtr"]=Module["asm"]["q"]).apply(null,arguments)};var _free=Module["_free"]=function(){return (_free=Module["_free"]=Module["asm"]["r"]).apply(null,arguments)};var _deletePtr=Module["_deletePtr"]=function(){return (_deletePtr=Module["_deletePtr"]=Module["asm"]["s"]).apply(null,arguments)};var _describeObject=Module["_describeObject"]=function(){return (_describeObject=Module["_describeObject"]=Module["asm"]["t"]).apply(null,arguments)};var _registerEntity=Module["_registerEntity"]=function(){return (_registerEntity=Module["_registerEntity"]=Module["asm"]["u"]).apply(null,arguments)};var _registerEntityOMM=Module["_registerEntityOMM"]=function(){return (_registerEntityOMM=Module["_registerEntityOMM"]=Module["asm"]["v"]).apply(null,arguments)};var _removeEntity=Module["_removeEntity"]=function(){return (_removeEntity=Module["_removeEntity"]=Module["asm"]["w"]).apply(null,arguments)};var _removeAll=Module["_removeAll"]=function(){return (_removeAll=Module["_removeAll"]=Module["asm"]["x"]).apply(null,arguments)};var _propagate=Module["_propagate"]=function(){return (_propagate=Module["_propagate"]=Module["asm"]["y"]).apply(null,arguments)};var _malloc=Module["_malloc"]=function(){return (_malloc=Module["_malloc"]=Module["asm"]["z"]).apply(null,arguments)};var _generateEphemeris=Module["_generateEphemeris"]=function(){return (_generateEphemeris=Module["_generateEphemeris"]=Module["asm"]["A"]).apply(null,arguments)};var _getValue=Module["_getValue"]=function(){return (_getValue=Module["_getValue"]=Module["asm"]["B"]).apply(null,arguments)};var _getValueInReferenceFrame=Module["_getValueInReferenceFrame"]=function(){return (_getValueInReferenceFrame=Module["_getValueInReferenceFrame"]=Module["asm"]["C"]).apply(null,arguments)};var _getSatAzElRange=Module["_getSatAzElRange"]=function(){return (_getSatAzElRange=Module["_getSatAzElRange"]=Module["asm"]["D"]).apply(null,arguments)};var _getSatAzElRangeForInterval=Module["_getSatAzElRangeForInterval"]=function(){return (_getSatAzElRangeForInterval=Module["_getSatAzElRangeForInterval"]=Module["asm"]["E"]).apply(null,arguments)};var _getSatAzElRangePositionForInterval=Module["_getSatAzElRangePositionForInterval"]=function(){return (_getSatAzElRangePositionForInterval=Module["_getSatAzElRangePositionForInterval"]=Module["asm"]["F"]).apply(null,arguments)};var stackSave=Module["stackSave"]=function(){return (stackSave=Module["stackSave"]=Module["asm"]["G"]).apply(null,arguments)};var stackRestore=Module["stackRestore"]=function(){return (stackRestore=Module["stackRestore"]=Module["asm"]["H"]).apply(null,arguments)};var stackAlloc=Module["stackAlloc"]=function(){return (stackAlloc=Module["stackAlloc"]=Module["asm"]["I"]).apply(null,arguments)};Module["ccall"]=ccall;Module["cwrap"]=cwrap;var calledRun;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status;}dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller;};function run(args){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();readyPromiseResolve(Module);if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun();}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("");},1);doRun();},1);}else {doRun();}}Module["run"]=run;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()();}}run();


  return Module.ready
}
);
})();

globalThis.Buffer = globalThis.Buffer || {};

var sgp4module = (Module.hasOwnProperty('then') ? Module : Promise.resolve(Module())).then(wasmModule => {
  let wrapping = {
    wasmModuleRun: {
      rval: "number",
      params: ["string", "string", "number", "number", "number", "number", "number", "number"],
    },
    registerEntity: {
      rval: "number",
      params: ["string", "string", "bool", "number", "number", "number", "number"],
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
    describeObject: {
      rval: "string",
      params: ["number"],
    },
    sizeOfsatelliteCatalog: {
      rval: "number",
    },
    propagate: {
      rval: "number",
      params: ["number", "bool", "bool"],
    },
    generateEphemeris: {
      rval: "number",
      params: ["number", "number", "number", "number", "bool"],
    },
    getValue: {
      rval: "number",
      params: ["number", "number", "bool", "bool", "bool"],
    },
    getValueInReferenceFrame: {
      rval: "number",
      params: ["number", "number", "bool", "bool", "bool"],
    },
    free: {
      rval: null,
      params: ["number"],
    },
    freePtr: {
      rval: null,
      params: ["number"],
    },
    deletePtr: {
      rval: null,
      params: ["number"],
    },
    removeEntity: {
      rval: null,
      params: ["number"],
    },
    removeAll: {
      rval: null,
      params: [],
    },
    getCoveragePositions: {
      rval: null,
      params: ["number", "number", "number", "number", "number"],
    },
    getSatAzElRange: {
      rval: "number",
      params: ["number", "number", "number"],
    },
    getSatAzElRangeForInterval: {
      rval: "number",
      params: ["number", "number", "number", "number", "number"],
    },
    /*"getPassAndVisibilityForInterval": {
                            rval: "number",
                            params: [
                                    "number",
                                    "number",
                                    "number",
                                    "number",
                                    "number"
                            ]
                    },*/
    getSatAzElRangePositionForInterval: {
      rval: "number",
      params: ["number", "number", "number", "number", "number"],
    },
  };
  let methods = { wasm: wasmModule };
  Object.keys(wrapping).forEach((key) => {
    methods[key] = wrapping[key].params ? wasmModule["cwrap"](key, wrapping[key].rval, wrapping[key].params) : wasmModule["cwrap"](key, wrapping[key].rval);
  });
  return methods
});

process.on("uncaughtException", (err) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    "✘ Fatality! Uncaught Exception within unit tests, error thrown:"
  );
  console.log(err);
  console.log("not ok 1");
  console.log("\x1b[31m%s\x1b[0m", "Force-Exiting process ...");
  process.exit(1);
});

let runTest = async () => {
  let OMMS = {
    xml: (
      await readOMM(
        fs.readFileSync("./test/data/spacedatastandards/omm.xml"),
        "xml"
      )
    ).results,
    csv: (
      await readOMM(
        fs.readFileSync("./test/data/spacedatastandards/omm.csv", {
          encoding: "utf8",
        }),
        "csv"
      )
    ).results,
    json: (
      await readOMM(
        fs.readFileSync("./test/data/spacedatastandards/omm.json", {
          encoding: "utf8",
        }),
        "json"
      )
    ).results,
    fb: (await readOMM(fs.readFileSync("./test/data/spacedatastandards/omm.fbs")))
      .results,
    tle: (
      await readOMM(
        fs.readFileSync("./test/data/spacedatastandards/3le.txt", {
          encoding: "utf8",
        }),
        "tle"
      )
    ).results,
  };

  let LEGACY = await readTLE(
    fs.readFileSync("./test/data/spacedatastandards/3le.txt", {
      encoding: "utf8",
    }));
  LEGACY.tle = LEGACY.results;

  let mm = await sgp4module;

  let {
    sizeOfsatelliteCatalog,
    registerEntity,
    registerEntityOMM,
    removeEntity,
    removeAll,
    propagate,
    generateEphemeris,
    getValue,
    getValueInReferenceFrame,
    getSatAzElRange,
    getSatAzElRangeForInterval,
    getSatAzElRangePositionForInterval,
    describeObject,
  } = mm;

  let { freePtr, free, deletePtr, malloc, HEAP8, HEAPU8, stackAlloc } = mm.wasm;

  const registerOMM = (jsonOMM) =>
    registerEntityOMM(
      null, //jsonOMM.OBJECT_ID,
      jsonOMM.EPOCH,
      jsonOMM.MEAN_MOTION,
      jsonOMM.ECCENTRICITY,
      jsonOMM.INCLINATION,
      jsonOMM.RA_OF_ASC_NODE,
      jsonOMM.ARG_OF_PERICENTER,
      jsonOMM.MEAN_ANOMALY,
      null, //jsonOMM.GM,
      null, //jsonOMM.EPHEMERIS_TYPE,
      null, //jsonOMM.CLASSIFICATION_TYPE,
      jsonOMM.NORAD_CAT_ID,
      null, //jsonOMM.ELEMENT_SET_NO,
      null, //jsonOMM.REV_AT_EPOCH,
      jsonOMM.BSTAR,
      null, //jsonOMM.MEAN_MOTION_DOT,
      null, //jsonOMM.MEAN_MOTION_DDOT,
      true,
      0,
      0,
      0,
      null
    );

  tape("Deserialization Test", function (t) {
    t.plan(1);

    let equal = true;
    for (let i = 0; i < LEGACY.tle.length; i++) {
      let jsonOMM = LEGACY.tle[i];

      for (let sFormat in OMMS) {
        for (let prop in schema.definitions.OMM.properties) {
          if (jsonOMM[prop] && jsonOMM[prop] !== OMMS[sFormat][i][prop]) {
            console.error(
              "ERROR: ",
              prop,
              " ",
              "tle JSON: ",
              jsonOMM[prop],
              " ",
              sFormat,
              ": ",
              OMMS[sFormat][i][prop],
              JSON.stringify(OMMS[sFormat])
            );
            equal = false;
          }
        }
      }
    }
    t.equal(equal, true);
  });

  tape("Propagation Test", function (t) {
    t.plan(1);

    let passes = true;
    for (let i = 0; i < LEGACY.tle.length; i++) {
      let tle = LEGACY.raw[i].slice(-2);
      let jsonOMM = LEGACY.tle[i];

      let pointer = registerEntity(tle[0], tle[1], true, 0, 0, 0, null);

      let sPointers = {};

      for (let sFormat in OMMS) {
        sPointers[sFormat] = registerOMM(OMMS[sFormat][i]);
      }
      if (sPointers["tle"] === pointer) {
        console.log(sPointers["tle"]);
        console.log(pointer);
      }
      let epoch = new Date(jsonOMM.EPOCH).getTime();

      let temeToECEF = true;
      let storeResult = true;
      let flatArray = new Float64Array(
        HEAP8.buffer,
        getValueInReferenceFrame(
          pointer,
          epoch,
          temeToECEF, //convert in Cesium
          storeResult
        ), // Choice of reference frames for velocity
        3
      );
      flatArray = new Float64Array(flatArray);

      for (let sFormat in sPointers) {
        let fArray = new Float64Array(
          HEAP8.buffer,
          getValueInReferenceFrame(
            sPointers[sFormat],
            epoch,
            temeToECEF, //convert in Cesium
            storeResult
          ), // Choice of reference frames for velocity
          3
        );
        sPointers[sFormat] = new Float64Array(fArray);
      }
      for (let sArray in sPointers) {
        let flatArrayOMM = sPointers[sArray];

        for (let ii = 0; ii < flatArray.length; ii++) {
          if (flatArray[ii] !== flatArrayOMM[ii]) passes = false;
        }
      }
    }
    t.equal(passes, true);
  });
  tape("Collection File I/O Test", function (t) {
    t.plan(1);

    fs.writeFileSync(
      "./test/data/spacedatastandards/omm.collection.fbs",
      writeOMM(
        LEGACY.tle.map((_omm) => {
          _omm.USER_DEFINED_OBJECT_DESIGNATOR =
            new Date().toISOString() +
            new Array(Math.floor(Math.random() * 100)).join("+");
          _omm.EPHEMERIS_TYPE = 1;
          delete _omm.CHECKSUM;
          return _omm;
        }),
        null,
        true
      )
    );

    let redOMM = readOMM(
      fs.readFileSync("./test/data/spacedatastandards/omm.collection.fbs")
    ).results;

    let _keys = Object.keys(LEGACY.tle[0]);
    const mfunc = (omm) => {
      let _omm = {};
      for (let k = 0; k < _keys.length; k++) {
        _omm[_keys[k]] = omm[_keys[k]];
      }
      return _omm;
    };

    t.equal(
      JSON.stringify(LEGACY.tle.map(mfunc)[0]),
      JSON.stringify(redOMM.map(mfunc)[0])
    );
  });
  /*
  tape("Size Prefixed File I/O Test", function (t) {
    t.plan(1);

    writeFileSync(
      "./test/data/spacedatastandards/omm.sizePrefixed.fbs",
      Buffer.concat([
        Buffer.from("NOISEANDRANDOMSTUFF"),
        writeOMM(
          LEGACY.tle.map((_omm) => {
            _omm.USER_DEFINED_OBJECT_DESIGNATOR =
              new Date().toISOString() +
              new Array(Math.floor(Math.random() * 100)).join("+");
            _omm.EPHEMERIS_TYPE = 1;
            delete _omm.CHECKSUM;
            return _omm;
          })
        ),
      ])
    );

    let redOMM = readOMM(
      readFileSync("./test/data/spacedatastandards/omm.sizePrefixed.fbs"),
      schema
    ).results;

    let _keys = Object.keys(LEGACY.tle[0]);
    const mfunc = (omm) => {
      let _omm = {};
      for (let k = 0; k < _keys.length; k++) {
        _omm[_keys[k]] = omm[_keys[k]];
      }
      return _omm;
    };

    t.equal(
      JSON.stringify(LEGACY.tle.map(mfunc)[0]),
      JSON.stringify(redOMM.map(mfunc)[0])
    );
  });*/
};

runTest();
