'use strict';

var require$$0 = require('stream');
var fs = require('fs');
var require$$0$1 = require('util');
var path = require('path');
var require$$0$2 = require('events');
var require$$1 = require('string_decoder');
var require$$0$3 = require('buffer');
require('os');

function _interopDefaultLegacy(e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
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

function commonjsRequire() {
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

  function through(write, end, opts) {
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
      while (buffer.length && !stream.paused) {
        var data = buffer.shift();
        if (null === data)
          return stream.emit('end')
        else
          stream.emit('data', data);
      }
    }

    stream.queue = stream.push = function (data) {
      //    console.error(ended)
      if (_ended) return stream
      if (data === null) _ended = true;
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
      if (!stream.writable && stream.autoDestroy)
        process.nextTick(function () {
          stream.destroy();
        });
    });

    function _end() {
      stream.writable = false;
      end.call(stream);
      if (!stream.readable && stream.autoDestroy)
        stream.destroy();
    }

    stream.end = function (data) {
      if (ended) return
      ended = true;
      if (arguments.length) stream.write(data);
      _end(); // will emit or queue
      return stream
    };

    stream.destroy = function () {
      if (destroyed) return
      destroyed = true;
      ended = true;
      buffer.length = 0;
      stream.writable = stream.readable = false;
      stream.emit('close');
      return stream
    };

    stream.pause = function () {
      if (stream.paused) return
      stream.paused = true;
      return stream
    };

    stream.resume = function () {
      if (stream.paused) {
        stream.paused = false;
        stream.emit('resume');
      }
      drain();
      //may have become paused again,
      //as drain emits 'data'.
      if (!stream.paused)
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
  var hasProtoEnumBug = isEnumerable.call(function () { }, 'prototype');
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
    var Empty = function Empty() { };
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
var generatorFunction = undefined$1;
var asyncFunction = undefined$1;
var asyncGenFunction = undefined$1;

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
  '%AsyncFunctionPrototype%': undefined$1,
  '%AsyncGenerator%': undefined$1,
  '%AsyncGeneratorFunction%': asyncGenFunction,
  '%AsyncGeneratorPrototype%': undefined$1,
  '%AsyncIteratorPrototype%': undefined$1,
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
  '%Generator%': undefined$1,
  '%GeneratorFunction%': generatorFunction,
  '%GeneratorPrototype%': undefined$1,
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
      return false;
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
      return false;
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
  } catch (e) { }
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
  } catch (e) { }
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
  } catch (e) { }
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
    } catch (e) { }
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
  } catch (e) { }
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
  } catch (e) { }
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
  } catch (e) { }
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
  } catch (e) { }
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
  } catch (e) { }
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

var foreach = function forEach(obj, fn, ctx) {
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
      } catch (e) { }
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
  } catch (e) { }
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
        var TempCtor = function () { };
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
  if (!(this instanceof Test)) {
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
    self.count++;

    if (res.ok || res.todo) self.pass++;
    else {
      self.fail++;
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
    var ex = objectInspect(res.expected, { depth: res.objectPrintDepth });
    var ac = objectInspect(res.actual, { depth: res.objectPrintDepth });

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
  for (; i >= 0 && this.vtable[i] == 0; i--) { }
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
      : function () {
        return ((Math.random() * 0x40000000 | 0) * 0x800000) +
          (Math.random() * 0x800000 | 0);
      };

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
        for (e = -1; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

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
        : i > k || i == k && (rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
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

    for (; ;) {
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
    OBJECT_ID: [10, 17],
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
            value = remainder + (value ? utf8Decoder.decode(value) : "");
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

var sax = createCommonjsModule(function (module, exports) {
  (function (sax) { // wrapper for non-node envs
    sax.parser = function (strict, opt) { return new SAXParser(strict, opt) };
    sax.SAXParser = SAXParser;
    sax.SAXStream = SAXStream;
    sax.createStream = createStream;

    // When we pass the MAX_BUFFER_LENGTH position, start checking for buffer overruns.
    // When we check, schedule the next check for MAX_BUFFER_LENGTH - (max(buffer lengths)),
    // since that's the earliest that a buffer overrun could occur.  This way, checks are
    // as rare as required, but as often as necessary to ensure never crossing this bound.
    // Furthermore, buffers are only tested at most once per write(), so passing a very
    // large string into write() might have undesirable effects, but this is manageable by
    // the caller, so it is assumed to be safe.  Thus, a call to write() may, in the extreme
    // edge case, result in creating at most one complete copy of the string passed in.
    // Set to Infinity to have unlimited buffers.
    sax.MAX_BUFFER_LENGTH = 64 * 1024;

    var buffers = [
      'comment', 'sgmlDecl', 'textNode', 'tagName', 'doctype',
      'procInstName', 'procInstBody', 'entity', 'attribName',
      'attribValue', 'cdata', 'script'
    ];

    sax.EVENTS = [
      'text',
      'processinginstruction',
      'sgmldeclaration',
      'doctype',
      'comment',
      'opentagstart',
      'attribute',
      'opentag',
      'closetag',
      'opencdata',
      'cdata',
      'closecdata',
      'error',
      'end',
      'ready',
      'script',
      'opennamespace',
      'closenamespace'
    ];

    function SAXParser(strict, opt) {
      if (!(this instanceof SAXParser)) {
        return new SAXParser(strict, opt)
      }

      var parser = this;
      clearBuffers(parser);
      parser.q = parser.c = '';
      parser.bufferCheckPosition = sax.MAX_BUFFER_LENGTH;
      parser.opt = opt || {};
      parser.opt.lowercase = parser.opt.lowercase || parser.opt.lowercasetags;
      parser.looseCase = parser.opt.lowercase ? 'toLowerCase' : 'toUpperCase';
      parser.tags = [];
      parser.closed = parser.closedRoot = parser.sawRoot = false;
      parser.tag = parser.error = null;
      parser.strict = !!strict;
      parser.noscript = !!(strict || parser.opt.noscript);
      parser.state = S.BEGIN;
      parser.strictEntities = parser.opt.strictEntities;
      parser.ENTITIES = parser.strictEntities ? Object.create(sax.XML_ENTITIES) : Object.create(sax.ENTITIES);
      parser.attribList = [];

      // namespaces form a prototype chain.
      // it always points at the current tag,
      // which protos to its parent tag.
      if (parser.opt.xmlns) {
        parser.ns = Object.create(rootNS);
      }

      // mostly just for error reporting
      parser.trackPosition = parser.opt.position !== false;
      if (parser.trackPosition) {
        parser.position = parser.line = parser.column = 0;
      }
      emit(parser, 'onready');
    }

    if (!Object.create) {
      Object.create = function (o) {
        function F() { }
        F.prototype = o;
        var newf = new F();
        return newf
      };
    }

    if (!Object.keys) {
      Object.keys = function (o) {
        var a = [];
        for (var i in o) if (o.hasOwnProperty(i)) a.push(i);
        return a
      };
    }

    function checkBufferLength(parser) {
      var maxAllowed = Math.max(sax.MAX_BUFFER_LENGTH, 10);
      var maxActual = 0;
      for (var i = 0, l = buffers.length; i < l; i++) {
        var len = parser[buffers[i]].length;
        if (len > maxAllowed) {
          // Text/cdata nodes can get big, and since they're buffered,
          // we can get here under normal conditions.
          // Avoid issues by emitting the text node now,
          // so at least it won't get any bigger.
          switch (buffers[i]) {
            case 'textNode':
              closeText(parser);
              break

            case 'cdata':
              emitNode(parser, 'oncdata', parser.cdata);
              parser.cdata = '';
              break

            case 'script':
              emitNode(parser, 'onscript', parser.script);
              parser.script = '';
              break

            default:
              error(parser, 'Max buffer length exceeded: ' + buffers[i]);
          }
        }
        maxActual = Math.max(maxActual, len);
      }
      // schedule the next check for the earliest possible buffer overrun.
      var m = sax.MAX_BUFFER_LENGTH - maxActual;
      parser.bufferCheckPosition = m + parser.position;
    }

    function clearBuffers(parser) {
      for (var i = 0, l = buffers.length; i < l; i++) {
        parser[buffers[i]] = '';
      }
    }

    function flushBuffers(parser) {
      closeText(parser);
      if (parser.cdata !== '') {
        emitNode(parser, 'oncdata', parser.cdata);
        parser.cdata = '';
      }
      if (parser.script !== '') {
        emitNode(parser, 'onscript', parser.script);
        parser.script = '';
      }
    }

    SAXParser.prototype = {
      end: function () { end(this); },
      write: write,
      resume: function () { this.error = null; return this },
      close: function () { return this.write(null) },
      flush: function () { flushBuffers(this); }
    };

    var Stream;
    try {
      Stream = require$$0__default['default'].Stream;
    } catch (ex) {
      Stream = function () { };
    }

    var streamWraps = sax.EVENTS.filter(function (ev) {
      return ev !== 'error' && ev !== 'end'
    });

    function createStream(strict, opt) {
      return new SAXStream(strict, opt)
    }

    function SAXStream(strict, opt) {
      if (!(this instanceof SAXStream)) {
        return new SAXStream(strict, opt)
      }

      Stream.apply(this);

      this._parser = new SAXParser(strict, opt);
      this.writable = true;
      this.readable = true;

      var me = this;

      this._parser.onend = function () {
        me.emit('end');
      };

      this._parser.onerror = function (er) {
        me.emit('error', er);

        // if didn't throw, then means error was handled.
        // go ahead and clear error, so we can write again.
        me._parser.error = null;
      };

      this._decoder = null;

      streamWraps.forEach(function (ev) {
        Object.defineProperty(me, 'on' + ev, {
          get: function () {
            return me._parser['on' + ev]
          },
          set: function (h) {
            if (!h) {
              me.removeAllListeners(ev);
              me._parser['on' + ev] = h;
              return h
            }
            me.on(ev, h);
          },
          enumerable: true,
          configurable: false
        });
      });
    }

    SAXStream.prototype = Object.create(Stream.prototype, {
      constructor: {
        value: SAXStream
      }
    });

    SAXStream.prototype.write = function (data) {
      if (typeof Buffer === 'function' &&
        typeof Buffer.isBuffer === 'function' &&
        Buffer.isBuffer(data)) {
        if (!this._decoder) {
          var SD = require$$1__default['default'].StringDecoder;
          this._decoder = new SD('utf8');
        }
        data = this._decoder.write(data);
      }

      this._parser.write(data.toString());
      this.emit('data', data);
      return true
    };

    SAXStream.prototype.end = function (chunk) {
      if (chunk && chunk.length) {
        this.write(chunk);
      }
      this._parser.end();
      return true
    };

    SAXStream.prototype.on = function (ev, handler) {
      var me = this;
      if (!me._parser['on' + ev] && streamWraps.indexOf(ev) !== -1) {
        me._parser['on' + ev] = function () {
          var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          args.splice(0, 0, ev);
          me.emit.apply(me, args);
        };
      }

      return Stream.prototype.on.call(me, ev, handler)
    };

    // this really needs to be replaced with character classes.
    // XML allows all manner of ridiculous numbers and digits.
    var CDATA = '[CDATA[';
    var DOCTYPE = 'DOCTYPE';
    var XML_NAMESPACE = 'http://www.w3.org/XML/1998/namespace';
    var XMLNS_NAMESPACE = 'http://www.w3.org/2000/xmlns/';
    var rootNS = { xml: XML_NAMESPACE, xmlns: XMLNS_NAMESPACE };

    // http://www.w3.org/TR/REC-xml/#NT-NameStartChar
    // This implementation works on strings, a single character at a time
    // as such, it cannot ever support astral-plane characters (10000-EFFFF)
    // without a significant breaking change to either this  parser, or the
    // JavaScript language.  Implementation of an emoji-capable xml parser
    // is left as an exercise for the reader.
    var nameStart = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;

    var nameBody = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;

    var entityStart = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var entityBody = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;

    function isWhitespace(c) {
      return c === ' ' || c === '\n' || c === '\r' || c === '\t'
    }

    function isQuote(c) {
      return c === '"' || c === '\''
    }

    function isAttribEnd(c) {
      return c === '>' || isWhitespace(c)
    }

    function isMatch(regex, c) {
      return regex.test(c)
    }

    function notMatch(regex, c) {
      return !isMatch(regex, c)
    }

    var S = 0;
    sax.STATE = {
      BEGIN: S++, // leading byte order mark or whitespace
      BEGIN_WHITESPACE: S++, // leading whitespace
      TEXT: S++, // general stuff
      TEXT_ENTITY: S++, // &amp and such.
      OPEN_WAKA: S++, // <
      SGML_DECL: S++, // <!BLARG
      SGML_DECL_QUOTED: S++, // <!BLARG foo "bar
      DOCTYPE: S++, // <!DOCTYPE
      DOCTYPE_QUOTED: S++, // <!DOCTYPE "//blah
      DOCTYPE_DTD: S++, // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: S++, // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: S++, // <!-
      COMMENT: S++, // <!--
      COMMENT_ENDING: S++, // <!-- blah -
      COMMENT_ENDED: S++, // <!-- blah --
      CDATA: S++, // <![CDATA[ something
      CDATA_ENDING: S++, // ]
      CDATA_ENDING_2: S++, // ]]
      PROC_INST: S++, // <?hi
      PROC_INST_BODY: S++, // <?hi there
      PROC_INST_ENDING: S++, // <?hi "there" ?
      OPEN_TAG: S++, // <strong
      OPEN_TAG_SLASH: S++, // <strong /
      ATTRIB: S++, // <a
      ATTRIB_NAME: S++, // <a foo
      ATTRIB_NAME_SAW_WHITE: S++, // <a foo _
      ATTRIB_VALUE: S++, // <a foo=
      ATTRIB_VALUE_QUOTED: S++, // <a foo="bar
      ATTRIB_VALUE_CLOSED: S++, // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: S++, // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: S++, // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: S++, // <foo bar=&quot
      CLOSE_TAG: S++, // </a
      CLOSE_TAG_SAW_WHITE: S++, // </a   >
      SCRIPT: S++, // <script> ...
      SCRIPT_ENDING: S++ // <script> ... <
    };

    sax.XML_ENTITIES = {
      'amp': '&',
      'gt': '>',
      'lt': '<',
      'quot': '"',
      'apos': "'"
    };

    sax.ENTITIES = {
      'amp': '&',
      'gt': '>',
      'lt': '<',
      'quot': '"',
      'apos': "'",
      'AElig': 198,
      'Aacute': 193,
      'Acirc': 194,
      'Agrave': 192,
      'Aring': 197,
      'Atilde': 195,
      'Auml': 196,
      'Ccedil': 199,
      'ETH': 208,
      'Eacute': 201,
      'Ecirc': 202,
      'Egrave': 200,
      'Euml': 203,
      'Iacute': 205,
      'Icirc': 206,
      'Igrave': 204,
      'Iuml': 207,
      'Ntilde': 209,
      'Oacute': 211,
      'Ocirc': 212,
      'Ograve': 210,
      'Oslash': 216,
      'Otilde': 213,
      'Ouml': 214,
      'THORN': 222,
      'Uacute': 218,
      'Ucirc': 219,
      'Ugrave': 217,
      'Uuml': 220,
      'Yacute': 221,
      'aacute': 225,
      'acirc': 226,
      'aelig': 230,
      'agrave': 224,
      'aring': 229,
      'atilde': 227,
      'auml': 228,
      'ccedil': 231,
      'eacute': 233,
      'ecirc': 234,
      'egrave': 232,
      'eth': 240,
      'euml': 235,
      'iacute': 237,
      'icirc': 238,
      'igrave': 236,
      'iuml': 239,
      'ntilde': 241,
      'oacute': 243,
      'ocirc': 244,
      'ograve': 242,
      'oslash': 248,
      'otilde': 245,
      'ouml': 246,
      'szlig': 223,
      'thorn': 254,
      'uacute': 250,
      'ucirc': 251,
      'ugrave': 249,
      'uuml': 252,
      'yacute': 253,
      'yuml': 255,
      'copy': 169,
      'reg': 174,
      'nbsp': 160,
      'iexcl': 161,
      'cent': 162,
      'pound': 163,
      'curren': 164,
      'yen': 165,
      'brvbar': 166,
      'sect': 167,
      'uml': 168,
      'ordf': 170,
      'laquo': 171,
      'not': 172,
      'shy': 173,
      'macr': 175,
      'deg': 176,
      'plusmn': 177,
      'sup1': 185,
      'sup2': 178,
      'sup3': 179,
      'acute': 180,
      'micro': 181,
      'para': 182,
      'middot': 183,
      'cedil': 184,
      'ordm': 186,
      'raquo': 187,
      'frac14': 188,
      'frac12': 189,
      'frac34': 190,
      'iquest': 191,
      'times': 215,
      'divide': 247,
      'OElig': 338,
      'oelig': 339,
      'Scaron': 352,
      'scaron': 353,
      'Yuml': 376,
      'fnof': 402,
      'circ': 710,
      'tilde': 732,
      'Alpha': 913,
      'Beta': 914,
      'Gamma': 915,
      'Delta': 916,
      'Epsilon': 917,
      'Zeta': 918,
      'Eta': 919,
      'Theta': 920,
      'Iota': 921,
      'Kappa': 922,
      'Lambda': 923,
      'Mu': 924,
      'Nu': 925,
      'Xi': 926,
      'Omicron': 927,
      'Pi': 928,
      'Rho': 929,
      'Sigma': 931,
      'Tau': 932,
      'Upsilon': 933,
      'Phi': 934,
      'Chi': 935,
      'Psi': 936,
      'Omega': 937,
      'alpha': 945,
      'beta': 946,
      'gamma': 947,
      'delta': 948,
      'epsilon': 949,
      'zeta': 950,
      'eta': 951,
      'theta': 952,
      'iota': 953,
      'kappa': 954,
      'lambda': 955,
      'mu': 956,
      'nu': 957,
      'xi': 958,
      'omicron': 959,
      'pi': 960,
      'rho': 961,
      'sigmaf': 962,
      'sigma': 963,
      'tau': 964,
      'upsilon': 965,
      'phi': 966,
      'chi': 967,
      'psi': 968,
      'omega': 969,
      'thetasym': 977,
      'upsih': 978,
      'piv': 982,
      'ensp': 8194,
      'emsp': 8195,
      'thinsp': 8201,
      'zwnj': 8204,
      'zwj': 8205,
      'lrm': 8206,
      'rlm': 8207,
      'ndash': 8211,
      'mdash': 8212,
      'lsquo': 8216,
      'rsquo': 8217,
      'sbquo': 8218,
      'ldquo': 8220,
      'rdquo': 8221,
      'bdquo': 8222,
      'dagger': 8224,
      'Dagger': 8225,
      'bull': 8226,
      'hellip': 8230,
      'permil': 8240,
      'prime': 8242,
      'Prime': 8243,
      'lsaquo': 8249,
      'rsaquo': 8250,
      'oline': 8254,
      'frasl': 8260,
      'euro': 8364,
      'image': 8465,
      'weierp': 8472,
      'real': 8476,
      'trade': 8482,
      'alefsym': 8501,
      'larr': 8592,
      'uarr': 8593,
      'rarr': 8594,
      'darr': 8595,
      'harr': 8596,
      'crarr': 8629,
      'lArr': 8656,
      'uArr': 8657,
      'rArr': 8658,
      'dArr': 8659,
      'hArr': 8660,
      'forall': 8704,
      'part': 8706,
      'exist': 8707,
      'empty': 8709,
      'nabla': 8711,
      'isin': 8712,
      'notin': 8713,
      'ni': 8715,
      'prod': 8719,
      'sum': 8721,
      'minus': 8722,
      'lowast': 8727,
      'radic': 8730,
      'prop': 8733,
      'infin': 8734,
      'ang': 8736,
      'and': 8743,
      'or': 8744,
      'cap': 8745,
      'cup': 8746,
      'int': 8747,
      'there4': 8756,
      'sim': 8764,
      'cong': 8773,
      'asymp': 8776,
      'ne': 8800,
      'equiv': 8801,
      'le': 8804,
      'ge': 8805,
      'sub': 8834,
      'sup': 8835,
      'nsub': 8836,
      'sube': 8838,
      'supe': 8839,
      'oplus': 8853,
      'otimes': 8855,
      'perp': 8869,
      'sdot': 8901,
      'lceil': 8968,
      'rceil': 8969,
      'lfloor': 8970,
      'rfloor': 8971,
      'lang': 9001,
      'rang': 9002,
      'loz': 9674,
      'spades': 9824,
      'clubs': 9827,
      'hearts': 9829,
      'diams': 9830
    };

    Object.keys(sax.ENTITIES).forEach(function (key) {
      var e = sax.ENTITIES[key];
      var s = typeof e === 'number' ? String.fromCharCode(e) : e;
      sax.ENTITIES[key] = s;
    });

    for (var s in sax.STATE) {
      sax.STATE[sax.STATE[s]] = s;
    }

    // shorthand
    S = sax.STATE;

    function emit(parser, event, data) {
      parser[event] && parser[event](data);
    }

    function emitNode(parser, nodeType, data) {
      if (parser.textNode) closeText(parser);
      emit(parser, nodeType, data);
    }

    function closeText(parser) {
      parser.textNode = textopts(parser.opt, parser.textNode);
      if (parser.textNode) emit(parser, 'ontext', parser.textNode);
      parser.textNode = '';
    }

    function textopts(opt, text) {
      if (opt.trim) text = text.trim();
      if (opt.normalize) text = text.replace(/\s+/g, ' ');
      return text
    }

    function error(parser, er) {
      closeText(parser);
      if (parser.trackPosition) {
        er += '\nLine: ' + parser.line +
          '\nColumn: ' + parser.column +
          '\nChar: ' + parser.c;
      }
      er = new Error(er);
      parser.error = er;
      emit(parser, 'onerror', er);
      return parser
    }

    function end(parser) {
      if (parser.sawRoot && !parser.closedRoot) strictFail(parser, 'Unclosed root tag');
      if ((parser.state !== S.BEGIN) &&
        (parser.state !== S.BEGIN_WHITESPACE) &&
        (parser.state !== S.TEXT)) {
        error(parser, 'Unexpected end');
      }
      closeText(parser);
      parser.c = '';
      parser.closed = true;
      emit(parser, 'onend');
      SAXParser.call(parser, parser.strict, parser.opt);
      return parser
    }

    function strictFail(parser, message) {
      if (typeof parser !== 'object' || !(parser instanceof SAXParser)) {
        throw new Error('bad call to strictFail')
      }
      if (parser.strict) {
        error(parser, message);
      }
    }

    function newTag(parser) {
      if (!parser.strict) parser.tagName = parser.tagName[parser.looseCase]();
      var parent = parser.tags[parser.tags.length - 1] || parser;
      var tag = parser.tag = { name: parser.tagName, attributes: {} };

      // will be overridden if tag contails an xmlns="foo" or xmlns:foo="bar"
      if (parser.opt.xmlns) {
        tag.ns = parent.ns;
      }
      parser.attribList.length = 0;
      emitNode(parser, 'onopentagstart', tag);
    }

    function qname(name, attribute) {
      var i = name.indexOf(':');
      var qualName = i < 0 ? ['', name] : name.split(':');
      var prefix = qualName[0];
      var local = qualName[1];

      // <x "xmlns"="http://foo">
      if (attribute && name === 'xmlns') {
        prefix = 'xmlns';
        local = '';
      }

      return { prefix: prefix, local: local }
    }

    function attrib(parser) {
      if (!parser.strict) {
        parser.attribName = parser.attribName[parser.looseCase]();
      }

      if (parser.attribList.indexOf(parser.attribName) !== -1 ||
        parser.tag.attributes.hasOwnProperty(parser.attribName)) {
        parser.attribName = parser.attribValue = '';
        return
      }

      if (parser.opt.xmlns) {
        var qn = qname(parser.attribName, true);
        var prefix = qn.prefix;
        var local = qn.local;

        if (prefix === 'xmlns') {
          // namespace binding attribute. push the binding into scope
          if (local === 'xml' && parser.attribValue !== XML_NAMESPACE) {
            strictFail(parser,
              'xml: prefix must be bound to ' + XML_NAMESPACE + '\n' +
              'Actual: ' + parser.attribValue);
          } else if (local === 'xmlns' && parser.attribValue !== XMLNS_NAMESPACE) {
            strictFail(parser,
              'xmlns: prefix must be bound to ' + XMLNS_NAMESPACE + '\n' +
              'Actual: ' + parser.attribValue);
          } else {
            var tag = parser.tag;
            var parent = parser.tags[parser.tags.length - 1] || parser;
            if (tag.ns === parent.ns) {
              tag.ns = Object.create(parent.ns);
            }
            tag.ns[local] = parser.attribValue;
          }
        }

        // defer onattribute events until all attributes have been seen
        // so any new bindings can take effect. preserve attribute order
        // so deferred events can be emitted in document order
        parser.attribList.push([parser.attribName, parser.attribValue]);
      } else {
        // in non-xmlns mode, we can emit the event right away
        parser.tag.attributes[parser.attribName] = parser.attribValue;
        emitNode(parser, 'onattribute', {
          name: parser.attribName,
          value: parser.attribValue
        });
      }

      parser.attribName = parser.attribValue = '';
    }

    function openTag(parser, selfClosing) {
      if (parser.opt.xmlns) {
        // emit namespace binding events
        var tag = parser.tag;

        // add namespace info to tag
        var qn = qname(parser.tagName);
        tag.prefix = qn.prefix;
        tag.local = qn.local;
        tag.uri = tag.ns[qn.prefix] || '';

        if (tag.prefix && !tag.uri) {
          strictFail(parser, 'Unbound namespace prefix: ' +
            JSON.stringify(parser.tagName));
          tag.uri = qn.prefix;
        }

        var parent = parser.tags[parser.tags.length - 1] || parser;
        if (tag.ns && parent.ns !== tag.ns) {
          Object.keys(tag.ns).forEach(function (p) {
            emitNode(parser, 'onopennamespace', {
              prefix: p,
              uri: tag.ns[p]
            });
          });
        }

        // handle deferred onattribute events
        // Note: do not apply default ns to attributes:
        //   http://www.w3.org/TR/REC-xml-names/#defaulting
        for (var i = 0, l = parser.attribList.length; i < l; i++) {
          var nv = parser.attribList[i];
          var name = nv[0];
          var value = nv[1];
          var qualName = qname(name, true);
          var prefix = qualName.prefix;
          var local = qualName.local;
          var uri = prefix === '' ? '' : (tag.ns[prefix] || '');
          var a = {
            name: name,
            value: value,
            prefix: prefix,
            local: local,
            uri: uri
          };

          // if there's any attributes with an undefined namespace,
          // then fail on them now.
          if (prefix && prefix !== 'xmlns' && !uri) {
            strictFail(parser, 'Unbound namespace prefix: ' +
              JSON.stringify(prefix));
            a.uri = prefix;
          }
          parser.tag.attributes[name] = a;
          emitNode(parser, 'onattribute', a);
        }
        parser.attribList.length = 0;
      }

      parser.tag.isSelfClosing = !!selfClosing;

      // process the tag
      parser.sawRoot = true;
      parser.tags.push(parser.tag);
      emitNode(parser, 'onopentag', parser.tag);
      if (!selfClosing) {
        // special case for <script> in non-strict mode.
        if (!parser.noscript && parser.tagName.toLowerCase() === 'script') {
          parser.state = S.SCRIPT;
        } else {
          parser.state = S.TEXT;
        }
        parser.tag = null;
        parser.tagName = '';
      }
      parser.attribName = parser.attribValue = '';
      parser.attribList.length = 0;
    }

    function closeTag(parser) {
      if (!parser.tagName) {
        strictFail(parser, 'Weird empty close tag.');
        parser.textNode += '</>';
        parser.state = S.TEXT;
        return
      }

      if (parser.script) {
        if (parser.tagName !== 'script') {
          parser.script += '</' + parser.tagName + '>';
          parser.tagName = '';
          parser.state = S.SCRIPT;
          return
        }
        emitNode(parser, 'onscript', parser.script);
        parser.script = '';
      }

      // first make sure that the closing tag actually exists.
      // <a><b></c></b></a> will close everything, otherwise.
      var t = parser.tags.length;
      var tagName = parser.tagName;
      if (!parser.strict) {
        tagName = tagName[parser.looseCase]();
      }
      var closeTo = tagName;
      while (t--) {
        var close = parser.tags[t];
        if (close.name !== closeTo) {
          // fail the first time in strict mode
          strictFail(parser, 'Unexpected close tag');
        } else {
          break
        }
      }

      // didn't find it.  we already failed for strict, so just abort.
      if (t < 0) {
        strictFail(parser, 'Unmatched closing tag: ' + parser.tagName);
        parser.textNode += '</' + parser.tagName + '>';
        parser.state = S.TEXT;
        return
      }
      parser.tagName = tagName;
      var s = parser.tags.length;
      while (s-- > t) {
        var tag = parser.tag = parser.tags.pop();
        parser.tagName = parser.tag.name;
        emitNode(parser, 'onclosetag', parser.tagName);

        var x = {};
        for (var i in tag.ns) {
          x[i] = tag.ns[i];
        }

        var parent = parser.tags[parser.tags.length - 1] || parser;
        if (parser.opt.xmlns && tag.ns !== parent.ns) {
          // remove namespace bindings introduced by tag
          Object.keys(tag.ns).forEach(function (p) {
            var n = tag.ns[p];
            emitNode(parser, 'onclosenamespace', { prefix: p, uri: n });
          });
        }
      }
      if (t === 0) parser.closedRoot = true;
      parser.tagName = parser.attribValue = parser.attribName = '';
      parser.attribList.length = 0;
      parser.state = S.TEXT;
    }

    function parseEntity(parser) {
      var entity = parser.entity;
      var entityLC = entity.toLowerCase();
      var num;
      var numStr = '';

      if (parser.ENTITIES[entity]) {
        return parser.ENTITIES[entity]
      }
      if (parser.ENTITIES[entityLC]) {
        return parser.ENTITIES[entityLC]
      }
      entity = entityLC;
      if (entity.charAt(0) === '#') {
        if (entity.charAt(1) === 'x') {
          entity = entity.slice(2);
          num = parseInt(entity, 16);
          numStr = num.toString(16);
        } else {
          entity = entity.slice(1);
          num = parseInt(entity, 10);
          numStr = num.toString(10);
        }
      }
      entity = entity.replace(/^0+/, '');
      if (isNaN(num) || numStr.toLowerCase() !== entity) {
        strictFail(parser, 'Invalid character entity');
        return '&' + parser.entity + ';'
      }

      return String.fromCodePoint(num)
    }

    function beginWhiteSpace(parser, c) {
      if (c === '<') {
        parser.state = S.OPEN_WAKA;
        parser.startTagPosition = parser.position;
      } else if (!isWhitespace(c)) {
        // have to process this as a text node.
        // weird, but happens.
        strictFail(parser, 'Non-whitespace before first tag.');
        parser.textNode = c;
        parser.state = S.TEXT;
      }
    }

    function charAt(chunk, i) {
      var result = '';
      if (i < chunk.length) {
        result = chunk.charAt(i);
      }
      return result
    }

    function write(chunk) {
      var parser = this;
      if (this.error) {
        throw this.error
      }
      if (parser.closed) {
        return error(parser,
          'Cannot write after close. Assign an onready handler.')
      }
      if (chunk === null) {
        return end(parser)
      }
      if (typeof chunk === 'object') {
        chunk = chunk.toString();
      }
      var i = 0;
      var c = '';
      while (true) {
        c = charAt(chunk, i++);
        parser.c = c;

        if (!c) {
          break
        }

        if (parser.trackPosition) {
          parser.position++;
          if (c === '\n') {
            parser.line++;
            parser.column = 0;
          } else {
            parser.column++;
          }
        }

        switch (parser.state) {
          case S.BEGIN:
            parser.state = S.BEGIN_WHITESPACE;
            if (c === '\uFEFF') {
              continue
            }
            beginWhiteSpace(parser, c);
            continue

          case S.BEGIN_WHITESPACE:
            beginWhiteSpace(parser, c);
            continue

          case S.TEXT:
            if (parser.sawRoot && !parser.closedRoot) {
              var starti = i - 1;
              while (c && c !== '<' && c !== '&') {
                c = charAt(chunk, i++);
                if (c && parser.trackPosition) {
                  parser.position++;
                  if (c === '\n') {
                    parser.line++;
                    parser.column = 0;
                  } else {
                    parser.column++;
                  }
                }
              }
              parser.textNode += chunk.substring(starti, i - 1);
            }
            if (c === '<' && !(parser.sawRoot && parser.closedRoot && !parser.strict)) {
              parser.state = S.OPEN_WAKA;
              parser.startTagPosition = parser.position;
            } else {
              if (!isWhitespace(c) && (!parser.sawRoot || parser.closedRoot)) {
                strictFail(parser, 'Text data outside of root node.');
              }
              if (c === '&') {
                parser.state = S.TEXT_ENTITY;
              } else {
                parser.textNode += c;
              }
            }
            continue

          case S.SCRIPT:
            // only non-strict
            if (c === '<') {
              parser.state = S.SCRIPT_ENDING;
            } else {
              parser.script += c;
            }
            continue

          case S.SCRIPT_ENDING:
            if (c === '/') {
              parser.state = S.CLOSE_TAG;
            } else {
              parser.script += '<' + c;
              parser.state = S.SCRIPT;
            }
            continue

          case S.OPEN_WAKA:
            // either a /, ?, !, or text is coming next.
            if (c === '!') {
              parser.state = S.SGML_DECL;
              parser.sgmlDecl = '';
            } else if (isWhitespace(c)); else if (isMatch(nameStart, c)) {
              parser.state = S.OPEN_TAG;
              parser.tagName = c;
            } else if (c === '/') {
              parser.state = S.CLOSE_TAG;
              parser.tagName = '';
            } else if (c === '?') {
              parser.state = S.PROC_INST;
              parser.procInstName = parser.procInstBody = '';
            } else {
              strictFail(parser, 'Unencoded <');
              // if there was some whitespace, then add that in.
              if (parser.startTagPosition + 1 < parser.position) {
                var pad = parser.position - parser.startTagPosition;
                c = new Array(pad).join(' ') + c;
              }
              parser.textNode += '<' + c;
              parser.state = S.TEXT;
            }
            continue

          case S.SGML_DECL:
            if ((parser.sgmlDecl + c).toUpperCase() === CDATA) {
              emitNode(parser, 'onopencdata');
              parser.state = S.CDATA;
              parser.sgmlDecl = '';
              parser.cdata = '';
            } else if (parser.sgmlDecl + c === '--') {
              parser.state = S.COMMENT;
              parser.comment = '';
              parser.sgmlDecl = '';
            } else if ((parser.sgmlDecl + c).toUpperCase() === DOCTYPE) {
              parser.state = S.DOCTYPE;
              if (parser.doctype || parser.sawRoot) {
                strictFail(parser,
                  'Inappropriately located doctype declaration');
              }
              parser.doctype = '';
              parser.sgmlDecl = '';
            } else if (c === '>') {
              emitNode(parser, 'onsgmldeclaration', parser.sgmlDecl);
              parser.sgmlDecl = '';
              parser.state = S.TEXT;
            } else if (isQuote(c)) {
              parser.state = S.SGML_DECL_QUOTED;
              parser.sgmlDecl += c;
            } else {
              parser.sgmlDecl += c;
            }
            continue

          case S.SGML_DECL_QUOTED:
            if (c === parser.q) {
              parser.state = S.SGML_DECL;
              parser.q = '';
            }
            parser.sgmlDecl += c;
            continue

          case S.DOCTYPE:
            if (c === '>') {
              parser.state = S.TEXT;
              emitNode(parser, 'ondoctype', parser.doctype);
              parser.doctype = true; // just remember that we saw it.
            } else {
              parser.doctype += c;
              if (c === '[') {
                parser.state = S.DOCTYPE_DTD;
              } else if (isQuote(c)) {
                parser.state = S.DOCTYPE_QUOTED;
                parser.q = c;
              }
            }
            continue

          case S.DOCTYPE_QUOTED:
            parser.doctype += c;
            if (c === parser.q) {
              parser.q = '';
              parser.state = S.DOCTYPE;
            }
            continue

          case S.DOCTYPE_DTD:
            parser.doctype += c;
            if (c === ']') {
              parser.state = S.DOCTYPE;
            } else if (isQuote(c)) {
              parser.state = S.DOCTYPE_DTD_QUOTED;
              parser.q = c;
            }
            continue

          case S.DOCTYPE_DTD_QUOTED:
            parser.doctype += c;
            if (c === parser.q) {
              parser.state = S.DOCTYPE_DTD;
              parser.q = '';
            }
            continue

          case S.COMMENT:
            if (c === '-') {
              parser.state = S.COMMENT_ENDING;
            } else {
              parser.comment += c;
            }
            continue

          case S.COMMENT_ENDING:
            if (c === '-') {
              parser.state = S.COMMENT_ENDED;
              parser.comment = textopts(parser.opt, parser.comment);
              if (parser.comment) {
                emitNode(parser, 'oncomment', parser.comment);
              }
              parser.comment = '';
            } else {
              parser.comment += '-' + c;
              parser.state = S.COMMENT;
            }
            continue

          case S.COMMENT_ENDED:
            if (c !== '>') {
              strictFail(parser, 'Malformed comment');
              // allow <!-- blah -- bloo --> in non-strict mode,
              // which is a comment of " blah -- bloo "
              parser.comment += '--' + c;
              parser.state = S.COMMENT;
            } else {
              parser.state = S.TEXT;
            }
            continue

          case S.CDATA:
            if (c === ']') {
              parser.state = S.CDATA_ENDING;
            } else {
              parser.cdata += c;
            }
            continue

          case S.CDATA_ENDING:
            if (c === ']') {
              parser.state = S.CDATA_ENDING_2;
            } else {
              parser.cdata += ']' + c;
              parser.state = S.CDATA;
            }
            continue

          case S.CDATA_ENDING_2:
            if (c === '>') {
              if (parser.cdata) {
                emitNode(parser, 'oncdata', parser.cdata);
              }
              emitNode(parser, 'onclosecdata');
              parser.cdata = '';
              parser.state = S.TEXT;
            } else if (c === ']') {
              parser.cdata += ']';
            } else {
              parser.cdata += ']]' + c;
              parser.state = S.CDATA;
            }
            continue

          case S.PROC_INST:
            if (c === '?') {
              parser.state = S.PROC_INST_ENDING;
            } else if (isWhitespace(c)) {
              parser.state = S.PROC_INST_BODY;
            } else {
              parser.procInstName += c;
            }
            continue

          case S.PROC_INST_BODY:
            if (!parser.procInstBody && isWhitespace(c)) {
              continue
            } else if (c === '?') {
              parser.state = S.PROC_INST_ENDING;
            } else {
              parser.procInstBody += c;
            }
            continue

          case S.PROC_INST_ENDING:
            if (c === '>') {
              emitNode(parser, 'onprocessinginstruction', {
                name: parser.procInstName,
                body: parser.procInstBody
              });
              parser.procInstName = parser.procInstBody = '';
              parser.state = S.TEXT;
            } else {
              parser.procInstBody += '?' + c;
              parser.state = S.PROC_INST_BODY;
            }
            continue

          case S.OPEN_TAG:
            if (isMatch(nameBody, c)) {
              parser.tagName += c;
            } else {
              newTag(parser);
              if (c === '>') {
                openTag(parser);
              } else if (c === '/') {
                parser.state = S.OPEN_TAG_SLASH;
              } else {
                if (!isWhitespace(c)) {
                  strictFail(parser, 'Invalid character in tag name');
                }
                parser.state = S.ATTRIB;
              }
            }
            continue

          case S.OPEN_TAG_SLASH:
            if (c === '>') {
              openTag(parser, true);
              closeTag(parser);
            } else {
              strictFail(parser, 'Forward-slash in opening tag not followed by >');
              parser.state = S.ATTRIB;
            }
            continue

          case S.ATTRIB:
            // haven't read the attribute name yet.
            if (isWhitespace(c)) {
              continue
            } else if (c === '>') {
              openTag(parser);
            } else if (c === '/') {
              parser.state = S.OPEN_TAG_SLASH;
            } else if (isMatch(nameStart, c)) {
              parser.attribName = c;
              parser.attribValue = '';
              parser.state = S.ATTRIB_NAME;
            } else {
              strictFail(parser, 'Invalid attribute name');
            }
            continue

          case S.ATTRIB_NAME:
            if (c === '=') {
              parser.state = S.ATTRIB_VALUE;
            } else if (c === '>') {
              strictFail(parser, 'Attribute without value');
              parser.attribValue = parser.attribName;
              attrib(parser);
              openTag(parser);
            } else if (isWhitespace(c)) {
              parser.state = S.ATTRIB_NAME_SAW_WHITE;
            } else if (isMatch(nameBody, c)) {
              parser.attribName += c;
            } else {
              strictFail(parser, 'Invalid attribute name');
            }
            continue

          case S.ATTRIB_NAME_SAW_WHITE:
            if (c === '=') {
              parser.state = S.ATTRIB_VALUE;
            } else if (isWhitespace(c)) {
              continue
            } else {
              strictFail(parser, 'Attribute without value');
              parser.tag.attributes[parser.attribName] = '';
              parser.attribValue = '';
              emitNode(parser, 'onattribute', {
                name: parser.attribName,
                value: ''
              });
              parser.attribName = '';
              if (c === '>') {
                openTag(parser);
              } else if (isMatch(nameStart, c)) {
                parser.attribName = c;
                parser.state = S.ATTRIB_NAME;
              } else {
                strictFail(parser, 'Invalid attribute name');
                parser.state = S.ATTRIB;
              }
            }
            continue

          case S.ATTRIB_VALUE:
            if (isWhitespace(c)) {
              continue
            } else if (isQuote(c)) {
              parser.q = c;
              parser.state = S.ATTRIB_VALUE_QUOTED;
            } else {
              strictFail(parser, 'Unquoted attribute value');
              parser.state = S.ATTRIB_VALUE_UNQUOTED;
              parser.attribValue = c;
            }
            continue

          case S.ATTRIB_VALUE_QUOTED:
            if (c !== parser.q) {
              if (c === '&') {
                parser.state = S.ATTRIB_VALUE_ENTITY_Q;
              } else {
                parser.attribValue += c;
              }
              continue
            }
            attrib(parser);
            parser.q = '';
            parser.state = S.ATTRIB_VALUE_CLOSED;
            continue

          case S.ATTRIB_VALUE_CLOSED:
            if (isWhitespace(c)) {
              parser.state = S.ATTRIB;
            } else if (c === '>') {
              openTag(parser);
            } else if (c === '/') {
              parser.state = S.OPEN_TAG_SLASH;
            } else if (isMatch(nameStart, c)) {
              strictFail(parser, 'No whitespace between attributes');
              parser.attribName = c;
              parser.attribValue = '';
              parser.state = S.ATTRIB_NAME;
            } else {
              strictFail(parser, 'Invalid attribute name');
            }
            continue

          case S.ATTRIB_VALUE_UNQUOTED:
            if (!isAttribEnd(c)) {
              if (c === '&') {
                parser.state = S.ATTRIB_VALUE_ENTITY_U;
              } else {
                parser.attribValue += c;
              }
              continue
            }
            attrib(parser);
            if (c === '>') {
              openTag(parser);
            } else {
              parser.state = S.ATTRIB;
            }
            continue

          case S.CLOSE_TAG:
            if (!parser.tagName) {
              if (isWhitespace(c)) {
                continue
              } else if (notMatch(nameStart, c)) {
                if (parser.script) {
                  parser.script += '</' + c;
                  parser.state = S.SCRIPT;
                } else {
                  strictFail(parser, 'Invalid tagname in closing tag.');
                }
              } else {
                parser.tagName = c;
              }
            } else if (c === '>') {
              closeTag(parser);
            } else if (isMatch(nameBody, c)) {
              parser.tagName += c;
            } else if (parser.script) {
              parser.script += '</' + parser.tagName;
              parser.tagName = '';
              parser.state = S.SCRIPT;
            } else {
              if (!isWhitespace(c)) {
                strictFail(parser, 'Invalid tagname in closing tag');
              }
              parser.state = S.CLOSE_TAG_SAW_WHITE;
            }
            continue

          case S.CLOSE_TAG_SAW_WHITE:
            if (isWhitespace(c)) {
              continue
            }
            if (c === '>') {
              closeTag(parser);
            } else {
              strictFail(parser, 'Invalid characters in closing tag');
            }
            continue

          case S.TEXT_ENTITY:
          case S.ATTRIB_VALUE_ENTITY_Q:
          case S.ATTRIB_VALUE_ENTITY_U:
            var returnState;
            var buffer;
            switch (parser.state) {
              case S.TEXT_ENTITY:
                returnState = S.TEXT;
                buffer = 'textNode';
                break

              case S.ATTRIB_VALUE_ENTITY_Q:
                returnState = S.ATTRIB_VALUE_QUOTED;
                buffer = 'attribValue';
                break

              case S.ATTRIB_VALUE_ENTITY_U:
                returnState = S.ATTRIB_VALUE_UNQUOTED;
                buffer = 'attribValue';
                break
            }

            if (c === ';') {
              parser[buffer] += parseEntity(parser);
              parser.entity = '';
              parser.state = returnState;
            } else if (isMatch(parser.entity.length ? entityBody : entityStart, c)) {
              parser.entity += c;
            } else {
              strictFail(parser, 'Invalid character in entity name');
              parser[buffer] += '&' + parser.entity + c;
              parser.entity = '';
              parser.state = returnState;
            }

            continue

          default:
            throw new Error(parser, 'Unknown state: ' + parser.state)
        }
      } // while

      if (parser.position >= parser.bufferCheckPosition) {
        checkBufferLength(parser);
      }
      return parser
    }

    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    /* istanbul ignore next */
    if (!String.fromCodePoint) {
      (function () {
        var stringFromCharCode = String.fromCharCode;
        var floor = Math.floor;
        var fromCodePoint = function () {
          var MAX_SIZE = 0x4000;
          var codeUnits = [];
          var highSurrogate;
          var lowSurrogate;
          var index = -1;
          var length = arguments.length;
          if (!length) {
            return ''
          }
          var result = '';
          while (++index < length) {
            var codePoint = Number(arguments[index]);
            if (
              !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
              codePoint < 0 || // not a valid Unicode code point
              codePoint > 0x10FFFF || // not a valid Unicode code point
              floor(codePoint) !== codePoint // not an integer
            ) {
              throw RangeError('Invalid code point: ' + codePoint)
            }
            if (codePoint <= 0xFFFF) { // BMP code point
              codeUnits.push(codePoint);
            } else { // Astral code point; split in surrogate halves
              // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              codePoint -= 0x10000;
              highSurrogate = (codePoint >> 10) + 0xD800;
              lowSurrogate = (codePoint % 0x400) + 0xDC00;
              codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 === length || codeUnits.length > MAX_SIZE) {
              result += stringFromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result
        };
        /* istanbul ignore next */
        if (Object.defineProperty) {
          Object.defineProperty(String, 'fromCodePoint', {
            value: fromCodePoint,
            configurable: true,
            writable: true
          });
        } else {
          String.fromCodePoint = fromCodePoint;
        }
      }());
    }
  })(exports);
});

var arrayHelper = {

  isArray: function (value) {
    if (Array.isArray) {
      return Array.isArray(value);
    }
    // fallback for older browsers like  IE 8
    return Object.prototype.toString.call(value) === '[object Array]';
  }

};

var isArray$1 = arrayHelper.isArray;

var optionsHelper = {

  copyOptions: function (options) {
    var key, copy = {};
    for (key in options) {
      if (options.hasOwnProperty(key)) {
        copy[key] = options[key];
      }
    }
    return copy;
  },

  ensureFlagExists: function (item, options) {
    if (!(item in options) || typeof options[item] !== 'boolean') {
      options[item] = false;
    }
  },

  ensureSpacesExists: function (options) {
    if (!('spaces' in options) || (typeof options.spaces !== 'number' && typeof options.spaces !== 'string')) {
      options.spaces = 0;
    }
  },

  ensureAlwaysArrayExists: function (options) {
    if (!('alwaysArray' in options) || (typeof options.alwaysArray !== 'boolean' && !isArray$1(options.alwaysArray))) {
      options.alwaysArray = false;
    }
  },

  ensureKeyExists: function (key, options) {
    if (!(key + 'Key' in options) || typeof options[key + 'Key'] !== 'string') {
      options[key + 'Key'] = options.compact ? '_' + key : key;
    }
  },

  checkFnExists: function (key, options) {
    return key + 'Fn' in options;
  }

};

var isArray$2 = arrayHelper.isArray;

var options;
var currentElement;

function validateOptions(userOptions) {
  options = optionsHelper.copyOptions(userOptions);
  optionsHelper.ensureFlagExists('ignoreDeclaration', options);
  optionsHelper.ensureFlagExists('ignoreInstruction', options);
  optionsHelper.ensureFlagExists('ignoreAttributes', options);
  optionsHelper.ensureFlagExists('ignoreText', options);
  optionsHelper.ensureFlagExists('ignoreComment', options);
  optionsHelper.ensureFlagExists('ignoreCdata', options);
  optionsHelper.ensureFlagExists('ignoreDoctype', options);
  optionsHelper.ensureFlagExists('compact', options);
  optionsHelper.ensureFlagExists('alwaysChildren', options);
  optionsHelper.ensureFlagExists('addParent', options);
  optionsHelper.ensureFlagExists('trim', options);
  optionsHelper.ensureFlagExists('nativeType', options);
  optionsHelper.ensureFlagExists('nativeTypeAttributes', options);
  optionsHelper.ensureFlagExists('sanitize', options);
  optionsHelper.ensureFlagExists('instructionHasAttributes', options);
  optionsHelper.ensureFlagExists('captureSpacesBetweenElements', options);
  optionsHelper.ensureAlwaysArrayExists(options);
  optionsHelper.ensureKeyExists('declaration', options);
  optionsHelper.ensureKeyExists('instruction', options);
  optionsHelper.ensureKeyExists('attributes', options);
  optionsHelper.ensureKeyExists('text', options);
  optionsHelper.ensureKeyExists('comment', options);
  optionsHelper.ensureKeyExists('cdata', options);
  optionsHelper.ensureKeyExists('doctype', options);
  optionsHelper.ensureKeyExists('type', options);
  optionsHelper.ensureKeyExists('name', options);
  optionsHelper.ensureKeyExists('elements', options);
  optionsHelper.ensureKeyExists('parent', options);
  optionsHelper.checkFnExists('doctype', options);
  optionsHelper.checkFnExists('instruction', options);
  optionsHelper.checkFnExists('cdata', options);
  optionsHelper.checkFnExists('comment', options);
  optionsHelper.checkFnExists('text', options);
  optionsHelper.checkFnExists('instructionName', options);
  optionsHelper.checkFnExists('elementName', options);
  optionsHelper.checkFnExists('attributeName', options);
  optionsHelper.checkFnExists('attributeValue', options);
  optionsHelper.checkFnExists('attributes', options);
  return options;
}

function nativeType(value) {
  var nValue = Number(value);
  if (!isNaN(nValue)) {
    return nValue;
  }
  var bValue = value.toLowerCase();
  if (bValue === 'true') {
    return true;
  } else if (bValue === 'false') {
    return false;
  }
  return value;
}

function addField(type, value) {
  var key;
  if (options.compact) {
    if (
      !currentElement[options[type + 'Key']] &&
      (isArray$2(options.alwaysArray) ? options.alwaysArray.indexOf(options[type + 'Key']) !== -1 : options.alwaysArray)
    ) {
      currentElement[options[type + 'Key']] = [];
    }
    if (currentElement[options[type + 'Key']] && !isArray$2(currentElement[options[type + 'Key']])) {
      currentElement[options[type + 'Key']] = [currentElement[options[type + 'Key']]];
    }
    if (type + 'Fn' in options && typeof value === 'string') {
      value = options[type + 'Fn'](value, currentElement);
    }
    if (type === 'instruction' && ('instructionFn' in options || 'instructionNameFn' in options)) {
      for (key in value) {
        if (value.hasOwnProperty(key)) {
          if ('instructionFn' in options) {
            value[key] = options.instructionFn(value[key], key, currentElement);
          } else {
            var temp = value[key];
            delete value[key];
            value[options.instructionNameFn(key, temp, currentElement)] = temp;
          }
        }
      }
    }
    if (isArray$2(currentElement[options[type + 'Key']])) {
      currentElement[options[type + 'Key']].push(value);
    } else {
      currentElement[options[type + 'Key']] = value;
    }
  } else {
    if (!currentElement[options.elementsKey]) {
      currentElement[options.elementsKey] = [];
    }
    var element = {};
    element[options.typeKey] = type;
    if (type === 'instruction') {
      for (key in value) {
        if (value.hasOwnProperty(key)) {
          break;
        }
      }
      element[options.nameKey] = 'instructionNameFn' in options ? options.instructionNameFn(key, value, currentElement) : key;
      if (options.instructionHasAttributes) {
        element[options.attributesKey] = value[key][options.attributesKey];
        if ('instructionFn' in options) {
          element[options.attributesKey] = options.instructionFn(element[options.attributesKey], key, currentElement);
        }
      } else {
        if ('instructionFn' in options) {
          value[key] = options.instructionFn(value[key], key, currentElement);
        }
        element[options.instructionKey] = value[key];
      }
    } else {
      if (type + 'Fn' in options) {
        value = options[type + 'Fn'](value, currentElement);
      }
      element[options[type + 'Key']] = value;
    }
    if (options.addParent) {
      element[options.parentKey] = currentElement;
    }
    currentElement[options.elementsKey].push(element);
  }
}

function manipulateAttributes(attributes) {
  if ('attributesFn' in options && attributes) {
    attributes = options.attributesFn(attributes, currentElement);
  }
  if ((options.trim || 'attributeValueFn' in options || 'attributeNameFn' in options || options.nativeTypeAttributes) && attributes) {
    var key;
    for (key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        if (options.trim) attributes[key] = attributes[key].trim();
        if (options.nativeTypeAttributes) {
          attributes[key] = nativeType(attributes[key]);
        }
        if ('attributeValueFn' in options) attributes[key] = options.attributeValueFn(attributes[key], key, currentElement);
        if ('attributeNameFn' in options) {
          var temp = attributes[key];
          delete attributes[key];
          attributes[options.attributeNameFn(key, attributes[key], currentElement)] = temp;
        }
      }
    }
  }
  return attributes;
}

function onInstruction(instruction) {
  var attributes = {};
  if (instruction.body && (instruction.name.toLowerCase() === 'xml' || options.instructionHasAttributes)) {
    var attrsRegExp = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|(\w+))\s*/g;
    var match;
    while ((match = attrsRegExp.exec(instruction.body)) !== null) {
      attributes[match[1]] = match[2] || match[3] || match[4];
    }
    attributes = manipulateAttributes(attributes);
  }
  if (instruction.name.toLowerCase() === 'xml') {
    if (options.ignoreDeclaration) {
      return;
    }
    currentElement[options.declarationKey] = {};
    if (Object.keys(attributes).length) {
      currentElement[options.declarationKey][options.attributesKey] = attributes;
    }
    if (options.addParent) {
      currentElement[options.declarationKey][options.parentKey] = currentElement;
    }
  } else {
    if (options.ignoreInstruction) {
      return;
    }
    if (options.trim) {
      instruction.body = instruction.body.trim();
    }
    var value = {};
    if (options.instructionHasAttributes && Object.keys(attributes).length) {
      value[instruction.name] = {};
      value[instruction.name][options.attributesKey] = attributes;
    } else {
      value[instruction.name] = instruction.body;
    }
    addField('instruction', value);
  }
}

function onStartElement(name, attributes) {
  var element;
  if (typeof name === 'object') {
    attributes = name.attributes;
    name = name.name;
  }
  attributes = manipulateAttributes(attributes);
  if ('elementNameFn' in options) {
    name = options.elementNameFn(name, currentElement);
  }
  if (options.compact) {
    element = {};
    if (!options.ignoreAttributes && attributes && Object.keys(attributes).length) {
      element[options.attributesKey] = {};
      var key;
      for (key in attributes) {
        if (attributes.hasOwnProperty(key)) {
          element[options.attributesKey][key] = attributes[key];
        }
      }
    }
    if (
      !(name in currentElement) &&
      (isArray$2(options.alwaysArray) ? options.alwaysArray.indexOf(name) !== -1 : options.alwaysArray)
    ) {
      currentElement[name] = [];
    }
    if (currentElement[name] && !isArray$2(currentElement[name])) {
      currentElement[name] = [currentElement[name]];
    }
    if (isArray$2(currentElement[name])) {
      currentElement[name].push(element);
    } else {
      currentElement[name] = element;
    }
  } else {
    if (!currentElement[options.elementsKey]) {
      currentElement[options.elementsKey] = [];
    }
    element = {};
    element[options.typeKey] = 'element';
    element[options.nameKey] = name;
    if (!options.ignoreAttributes && attributes && Object.keys(attributes).length) {
      element[options.attributesKey] = attributes;
    }
    if (options.alwaysChildren) {
      element[options.elementsKey] = [];
    }
    currentElement[options.elementsKey].push(element);
  }
  element[options.parentKey] = currentElement; // will be deleted in onEndElement() if !options.addParent
  currentElement = element;
}

function onText(text) {
  if (options.ignoreText) {
    return;
  }
  if (!text.trim() && !options.captureSpacesBetweenElements) {
    return;
  }
  if (options.trim) {
    text = text.trim();
  }
  if (options.nativeType) {
    text = nativeType(text);
  }
  if (options.sanitize) {
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  addField('text', text);
}

function onComment(comment) {
  if (options.ignoreComment) {
    return;
  }
  if (options.trim) {
    comment = comment.trim();
  }
  addField('comment', comment);
}

function onEndElement(name) {
  var parentElement = currentElement[options.parentKey];
  if (!options.addParent) {
    delete currentElement[options.parentKey];
  }
  currentElement = parentElement;
}

function onCdata(cdata) {
  if (options.ignoreCdata) {
    return;
  }
  if (options.trim) {
    cdata = cdata.trim();
  }
  addField('cdata', cdata);
}

function onDoctype(doctype) {
  if (options.ignoreDoctype) {
    return;
  }
  doctype = doctype.replace(/^ /, '');
  if (options.trim) {
    doctype = doctype.trim();
  }
  addField('doctype', doctype);
}

function onError(error) {
  error.note = error; //console.error(error);
}

var xml2js = function (xml, userOptions) {

  var parser = sax.parser(true, {});
  var result = {};
  currentElement = result;

  options = validateOptions(userOptions);

  {
    parser.opt = { strictEntities: true };
    parser.onopentag = onStartElement;
    parser.ontext = onText;
    parser.oncomment = onComment;
    parser.onclosetag = onEndElement;
    parser.onerror = onError;
    parser.oncdata = onCdata;
    parser.ondoctype = onDoctype;
    parser.onprocessinginstruction = onInstruction;
  }

  {
    parser.write(xml).close();
  }

  if (result[options.elementsKey]) {
    var temp = result[options.elementsKey];
    delete result[options.elementsKey];
    result[options.elementsKey] = temp;
    delete result.text;
  }

  return result;

};

function validateOptions$1(userOptions) {
  var options = optionsHelper.copyOptions(userOptions);
  optionsHelper.ensureSpacesExists(options);
  return options;
}

var xml2json = function (xml, userOptions) {
  var options, js, json, parentKey;
  options = validateOptions$1(userOptions);
  js = xml2js(xml, options);
  parentKey = 'compact' in options && options.compact ? '_parent' : 'parent';
  // parentKey = ptions.compact ? '_parent' : 'parent'; // consider this
  if ('addParent' in options && options.addParent) {
    json = JSON.stringify(js, function (k, v) { return k === parentKey ? '_' : v; }, options.spaces);
  } else {
    json = JSON.stringify(js, null, options.spaces);
  }
  return json.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
};

var isArray$3 = arrayHelper.isArray;

var currentElement$1, currentElementName;

function validateOptions$2(userOptions) {
  var options = optionsHelper.copyOptions(userOptions);
  optionsHelper.ensureFlagExists('ignoreDeclaration', options);
  optionsHelper.ensureFlagExists('ignoreInstruction', options);
  optionsHelper.ensureFlagExists('ignoreAttributes', options);
  optionsHelper.ensureFlagExists('ignoreText', options);
  optionsHelper.ensureFlagExists('ignoreComment', options);
  optionsHelper.ensureFlagExists('ignoreCdata', options);
  optionsHelper.ensureFlagExists('ignoreDoctype', options);
  optionsHelper.ensureFlagExists('compact', options);
  optionsHelper.ensureFlagExists('indentText', options);
  optionsHelper.ensureFlagExists('indentCdata', options);
  optionsHelper.ensureFlagExists('indentAttributes', options);
  optionsHelper.ensureFlagExists('indentInstruction', options);
  optionsHelper.ensureFlagExists('fullTagEmptyElement', options);
  optionsHelper.ensureFlagExists('noQuotesForNativeAttributes', options);
  optionsHelper.ensureSpacesExists(options);
  if (typeof options.spaces === 'number') {
    options.spaces = Array(options.spaces + 1).join(' ');
  }
  optionsHelper.ensureKeyExists('declaration', options);
  optionsHelper.ensureKeyExists('instruction', options);
  optionsHelper.ensureKeyExists('attributes', options);
  optionsHelper.ensureKeyExists('text', options);
  optionsHelper.ensureKeyExists('comment', options);
  optionsHelper.ensureKeyExists('cdata', options);
  optionsHelper.ensureKeyExists('doctype', options);
  optionsHelper.ensureKeyExists('type', options);
  optionsHelper.ensureKeyExists('name', options);
  optionsHelper.ensureKeyExists('elements', options);
  optionsHelper.checkFnExists('doctype', options);
  optionsHelper.checkFnExists('instruction', options);
  optionsHelper.checkFnExists('cdata', options);
  optionsHelper.checkFnExists('comment', options);
  optionsHelper.checkFnExists('text', options);
  optionsHelper.checkFnExists('instructionName', options);
  optionsHelper.checkFnExists('elementName', options);
  optionsHelper.checkFnExists('attributeName', options);
  optionsHelper.checkFnExists('attributeValue', options);
  optionsHelper.checkFnExists('attributes', options);
  optionsHelper.checkFnExists('fullTagEmptyElement', options);
  return options;
}

function writeIndentation(options, depth, firstLine) {
  return (!firstLine && options.spaces ? '\n' : '') + Array(depth + 1).join(options.spaces);
}

function writeAttributes(attributes, options, depth) {
  if (options.ignoreAttributes) {
    return '';
  }
  if ('attributesFn' in options) {
    attributes = options.attributesFn(attributes, currentElementName, currentElement$1);
  }
  var key, attr, attrName, quote, result = [];
  for (key in attributes) {
    if (attributes.hasOwnProperty(key) && attributes[key] !== null && attributes[key] !== undefined) {
      quote = options.noQuotesForNativeAttributes && typeof attributes[key] !== 'string' ? '' : '"';
      attr = '' + attributes[key]; // ensure number and boolean are converted to String
      attr = attr.replace(/"/g, '&quot;');
      attrName = 'attributeNameFn' in options ? options.attributeNameFn(key, attr, currentElementName, currentElement$1) : key;
      result.push((options.spaces && options.indentAttributes ? writeIndentation(options, depth + 1, false) : ' '));
      result.push(attrName + '=' + quote + ('attributeValueFn' in options ? options.attributeValueFn(attr, key, currentElementName, currentElement$1) : attr) + quote);
    }
  }
  if (attributes && Object.keys(attributes).length && options.spaces && options.indentAttributes) {
    result.push(writeIndentation(options, depth, false));
  }
  return result.join('');
}

function writeDeclaration(declaration, options, depth) {
  currentElement$1 = declaration;
  currentElementName = 'xml';
  return options.ignoreDeclaration ? '' : '<?' + 'xml' + writeAttributes(declaration[options.attributesKey], options, depth) + '?>';
}

function writeInstruction(instruction, options, depth) {
  if (options.ignoreInstruction) {
    return '';
  }
  var key;
  for (key in instruction) {
    if (instruction.hasOwnProperty(key)) {
      break;
    }
  }
  var instructionName = 'instructionNameFn' in options ? options.instructionNameFn(key, instruction[key], currentElementName, currentElement$1) : key;
  if (typeof instruction[key] === 'object') {
    currentElement$1 = instruction;
    currentElementName = instructionName;
    return '<?' + instructionName + writeAttributes(instruction[key][options.attributesKey], options, depth) + '?>';
  } else {
    var instructionValue = instruction[key] ? instruction[key] : '';
    if ('instructionFn' in options) instructionValue = options.instructionFn(instructionValue, key, currentElementName, currentElement$1);
    return '<?' + instructionName + (instructionValue ? ' ' + instructionValue : '') + '?>';
  }
}

function writeComment(comment, options) {
  return options.ignoreComment ? '' : '<!--' + ('commentFn' in options ? options.commentFn(comment, currentElementName, currentElement$1) : comment) + '-->';
}

function writeCdata(cdata, options) {
  return options.ignoreCdata ? '' : '<![CDATA[' + ('cdataFn' in options ? options.cdataFn(cdata, currentElementName, currentElement$1) : cdata.replace(']]>', ']]]]><![CDATA[>')) + ']]>';
}

function writeDoctype(doctype, options) {
  return options.ignoreDoctype ? '' : '<!DOCTYPE ' + ('doctypeFn' in options ? options.doctypeFn(doctype, currentElementName, currentElement$1) : doctype) + '>';
}

function writeText(text, options) {
  if (options.ignoreText) return '';
  text = '' + text; // ensure Number and Boolean are converted to String
  text = text.replace(/&amp;/g, '&'); // desanitize to avoid double sanitization
  text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return 'textFn' in options ? options.textFn(text, currentElementName, currentElement$1) : text;
}

function hasContent(element, options) {
  var i;
  if (element.elements && element.elements.length) {
    for (i = 0; i < element.elements.length; ++i) {
      switch (element.elements[i][options.typeKey]) {
        case 'text':
          if (options.indentText) {
            return true;
          }
          break; // skip to next key
        case 'cdata':
          if (options.indentCdata) {
            return true;
          }
          break; // skip to next key
        case 'instruction':
          if (options.indentInstruction) {
            return true;
          }
          break; // skip to next key
        case 'doctype':
        case 'comment':
        case 'element':
          return true;
        default:
          return true;
      }
    }
  }
  return false;
}

function writeElement(element, options, depth) {
  currentElement$1 = element;
  currentElementName = element.name;
  var xml = [], elementName = 'elementNameFn' in options ? options.elementNameFn(element.name, element) : element.name;
  xml.push('<' + elementName);
  if (element[options.attributesKey]) {
    xml.push(writeAttributes(element[options.attributesKey], options, depth));
  }
  var withClosingTag = element[options.elementsKey] && element[options.elementsKey].length || element[options.attributesKey] && element[options.attributesKey]['xml:space'] === 'preserve';
  if (!withClosingTag) {
    if ('fullTagEmptyElementFn' in options) {
      withClosingTag = options.fullTagEmptyElementFn(element.name, element);
    } else {
      withClosingTag = options.fullTagEmptyElement;
    }
  }
  if (withClosingTag) {
    xml.push('>');
    if (element[options.elementsKey] && element[options.elementsKey].length) {
      xml.push(writeElements(element[options.elementsKey], options, depth + 1));
      currentElement$1 = element;
      currentElementName = element.name;
    }
    xml.push(options.spaces && hasContent(element, options) ? '\n' + Array(depth + 1).join(options.spaces) : '');
    xml.push('</' + elementName + '>');
  } else {
    xml.push('/>');
  }
  return xml.join('');
}

function writeElements(elements, options, depth, firstLine) {
  return elements.reduce(function (xml, element) {
    var indent = writeIndentation(options, depth, firstLine && !xml);
    switch (element.type) {
      case 'element': return xml + indent + writeElement(element, options, depth);
      case 'comment': return xml + indent + writeComment(element[options.commentKey], options);
      case 'doctype': return xml + indent + writeDoctype(element[options.doctypeKey], options);
      case 'cdata': return xml + (options.indentCdata ? indent : '') + writeCdata(element[options.cdataKey], options);
      case 'text': return xml + (options.indentText ? indent : '') + writeText(element[options.textKey], options);
      case 'instruction':
        var instruction = {};
        instruction[element[options.nameKey]] = element[options.attributesKey] ? element : element[options.instructionKey];
        return xml + (options.indentInstruction ? indent : '') + writeInstruction(instruction, options, depth);
    }
  }, '');
}

function hasContentCompact(element, options, anyContent) {
  var key;
  for (key in element) {
    if (element.hasOwnProperty(key)) {
      switch (key) {
        case options.parentKey:
        case options.attributesKey:
          break; // skip to next key
        case options.textKey:
          if (options.indentText || anyContent) {
            return true;
          }
          break; // skip to next key
        case options.cdataKey:
          if (options.indentCdata || anyContent) {
            return true;
          }
          break; // skip to next key
        case options.instructionKey:
          if (options.indentInstruction || anyContent) {
            return true;
          }
          break; // skip to next key
        case options.doctypeKey:
        case options.commentKey:
          return true;
        default:
          return true;
      }
    }
  }
  return false;
}

function writeElementCompact(element, name, options, depth, indent) {
  currentElement$1 = element;
  currentElementName = name;
  var elementName = 'elementNameFn' in options ? options.elementNameFn(name, element) : name;
  if (typeof element === 'undefined' || element === null || element === '') {
    return 'fullTagEmptyElementFn' in options && options.fullTagEmptyElementFn(name, element) || options.fullTagEmptyElement ? '<' + elementName + '></' + elementName + '>' : '<' + elementName + '/>';
  }
  var xml = [];
  if (name) {
    xml.push('<' + elementName);
    if (typeof element !== 'object') {
      xml.push('>' + writeText(element, options) + '</' + elementName + '>');
      return xml.join('');
    }
    if (element[options.attributesKey]) {
      xml.push(writeAttributes(element[options.attributesKey], options, depth));
    }
    var withClosingTag = hasContentCompact(element, options, true) || element[options.attributesKey] && element[options.attributesKey]['xml:space'] === 'preserve';
    if (!withClosingTag) {
      if ('fullTagEmptyElementFn' in options) {
        withClosingTag = options.fullTagEmptyElementFn(name, element);
      } else {
        withClosingTag = options.fullTagEmptyElement;
      }
    }
    if (withClosingTag) {
      xml.push('>');
    } else {
      xml.push('/>');
      return xml.join('');
    }
  }
  xml.push(writeElementsCompact(element, options, depth + 1, false));
  currentElement$1 = element;
  currentElementName = name;
  if (name) {
    xml.push((indent ? writeIndentation(options, depth, false) : '') + '</' + elementName + '>');
  }
  return xml.join('');
}

function writeElementsCompact(element, options, depth, firstLine) {
  var i, key, nodes, xml = [];
  for (key in element) {
    if (element.hasOwnProperty(key)) {
      nodes = isArray$3(element[key]) ? element[key] : [element[key]];
      for (i = 0; i < nodes.length; ++i) {
        switch (key) {
          case options.declarationKey: xml.push(writeDeclaration(nodes[i], options, depth)); break;
          case options.instructionKey: xml.push((options.indentInstruction ? writeIndentation(options, depth, firstLine) : '') + writeInstruction(nodes[i], options, depth)); break;
          case options.attributesKey: case options.parentKey: break; // skip
          case options.textKey: xml.push((options.indentText ? writeIndentation(options, depth, firstLine) : '') + writeText(nodes[i], options)); break;
          case options.cdataKey: xml.push((options.indentCdata ? writeIndentation(options, depth, firstLine) : '') + writeCdata(nodes[i], options)); break;
          case options.doctypeKey: xml.push(writeIndentation(options, depth, firstLine) + writeDoctype(nodes[i], options)); break;
          case options.commentKey: xml.push(writeIndentation(options, depth, firstLine) + writeComment(nodes[i], options)); break;
          default: xml.push(writeIndentation(options, depth, firstLine) + writeElementCompact(nodes[i], key, options, depth, hasContentCompact(nodes[i], options)));
        }
        firstLine = firstLine && !xml.length;
      }
    }
  }
  return xml.join('');
}

var js2xml = function (js, options) {
  options = validateOptions$2(options);
  var xml = [];
  currentElement$1 = js;
  currentElementName = '_root_';
  if (options.compact) {
    xml.push(writeElementsCompact(js, options, 0, true));
  } else {
    if (js[options.declarationKey]) {
      xml.push(writeDeclaration(js[options.declarationKey], options, 0));
    }
    if (js[options.elementsKey] && js[options.elementsKey].length) {
      xml.push(writeElements(js[options.elementsKey], options, 0, !xml.length));
    }
  }
  return xml.join('');
};

var json2xml = function (json, options) {
  if (json instanceof Buffer) {
    json = json.toString();
  }
  var js = null;
  if (typeof (json) === 'string') {
    try {
      js = JSON.parse(json);
    } catch (e) {
      throw new Error('The JSON structure is invalid');
    }
  } else {
    js = json;
  }
  return js2xml(js, options);
};

/*jslint node:true */






var lib = {
  xml2js: xml2js,
  xml2json: xml2json,
  js2xml: js2xml,
  json2xml: json2xml
};

const { Readable: ReadableStream } = require$$0__default['default'];

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
  constructor(opts = {}) {
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

  parseCell(buffer, start, end) {
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

  parseLine(buffer, start, end) {
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

  parseValue(buffer, start, end) {
    if (this.options.raw) {
      return buffer.slice(start, end)
    }

    return buffer.toString('utf-8', start, end)
  }

  writeRow(cells) {
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

  _flush(cb) {
    if (this.state.escaped || !this._prev) return cb()
    this.parseLine(this._prev, this.state.previousEnd, this._prev.length + 1); // plus since online -1s
    cb();
  }

  _transform(data, enc, cb) {
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
function wrappy(fn, cb) {
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
    var cb = args[args.length - 1];
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

function once(fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  f.called = false;
  return f
}

function onceStrict(fn) {
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

var noop = function () { };

var isRequest = function (stream) {
  return stream.setHeader && typeof stream.abort === 'function';
};

var isChildProcess = function (stream) {
  return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
};

var eos = function (stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};

  callback = once_1(callback || noop);

  var ws = stream._writableState;
  var rs = stream._readableState;
  var readable = opts.readable || (opts.readable !== false && stream.readable);
  var writable = opts.writable || (opts.writable !== false && stream.writable);
  var cancelled = false;

  var onlegacyfinish = function () {
    if (!stream.writable) onfinish();
  };

  var onfinish = function () {
    writable = false;
    if (!readable) callback.call(stream);
  };

  var onend = function () {
    readable = false;
    if (!writable) callback.call(stream);
  };

  var onexit = function (exitCode) {
    callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
  };

  var onerror = function (err) {
    callback.call(stream, err);
  };

  var onclose = function () {
    process.nextTick(onclosenexttick);
  };

  var onclosenexttick = function () {
    if (cancelled) return;
    if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
    if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
  };

  var onrequest = function () {
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

  return function () {
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

var noop$1 = function () { };
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

  endOfStream(stream, { readable: reading, writable: writing }, function (err) {
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

const { PassThrough: PassThroughStream } = require$$0__default['default'];

var bufferStream = options => {
  options = { ...options };

  const { array } = options;
  let { encoding } = options;
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

  const stream = new PassThroughStream({ objectMode });

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

const { constants: BufferConstants } = require$$0__default$3['default'];



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

  const { maxBuffer } = options;

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
var buffer = (stream, options) => getStream(stream, { ...options, encoding: 'buffer' });
var array = (stream, options) => getStream(stream, { ...options, array: true });
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
  return sD?.type === "number" || useAsNumber.indexOf(sD?.$ref) > -1
    ? parseFloat(pval) ?? null
    : pval ?? null;
};

const readOMMXML = async (input, schema) => {
  return lib
    .xml2js(input)
    .elements.filter((e) => e.name === "ndm")[0]
    .elements.filter((e) => e.name === "omm")
    .map((omm) => {
      let intermediate = {};
      let eCheck = (e) => {
        if (e.elements) findElements(e.elements);
      };
      let findElements = (el) => {
        if (Array.isArray(el)) {
          el.forEach((e) => {
            if (
              e.type === "element" &&
              Object.keys(schema.definitions.OMM.properties).indexOf(e.name) >
              -1
            ) {
              intermediate[e.name] = e.elements
                ? numCheck(schema, e.name, e.elements[0].text)
                : undefined;
            }
            eCheck(e);
          });
        } else {
          eCheck(el);
        }
      };
      eCheck(omm);
      return intermediate;
    });
};

const readOMMJSON = (input, schema) => {
  return JSON.parse(input, function (key, value) {
    return numCheck(schema, key, value);
  });
};

const readOMMCSV = async (input, schema) => {
  let results = (await neatCsv(input)).map((row) => {
    for (let prop in row) {
      row[prop] = numCheck(schema, prop, row[prop]);
    }
    return row;
  });

  return results;
};

const readTLE = (input, schema) => {
  return new Promise((resolve, reject) => {
    input = input instanceof require$$0.Readable ? input : require$$0.Readable.from(input);
    let tles = new tle(input);
    let started = false;
    input.on("readable", async () => {
      if (started) return;
      started = true;
      let stop = await tles.readLines();
      let results = tles.lines.map(tles.format.OMM);
      let raw = tles.lines;
      resolve({ results, raw });
    });
  });
};

const readFB = (
  input = required`input`,
  schema = required`schema`,
  fbClass = required`class`,
  fbCollection
) => {
  let schemaKeys = Object.keys(schema.definitions[fbClass.name].properties);
  let results = [];
  if (Array.isArray(input)) {
    results = input.map((fb) => readFB(fb, schema, fbClass, fbCollection)[0]);
  } else {
    let buf = new flatbuffers.ByteBuffer(input);

    if (fbCollection) {
      let SCOLLECTION = fbCollection[`getRootAs${fbCollection.name}`](buf);
      for (let i = 0; i < SCOLLECTION.RECORDSLength(); i++) {
        let result = SCOLLECTION.RECORDS(i);
        for (let key in schemaKeys) {
          let sK = schemaKeys[key];
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
        let SFBDATA = fbClass[`getSizePrefixedRootAs${fbClass.name}`](buf);
        let result = {};
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
  return results;
};

const transformType = (builder, _value, type) => {
  switch (type) {
    case "number":
      _value = +_value;
      break;
    case "string":
      _value = builder.createString(
        new Uint8Array(
          Buffer.from(typeof _value === "string" ? _value : _value.toString())
        )
      );
  }
  return _value;
};

const writeFB = (
  jsonFBDATA = required`jsonFBDATA`,
  schema = required`schema`,
  fbClass = required`fbClass`
) => {
  let returnArray;

  if (Array.isArray(jsonFBDATA)) {
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

    var BuiltFBDATA = fbClass[`end${fbClass.name}`](builder);
    fbClass[`finishSizePrefixed${fbClass.name}Buffer`](builder, BuiltFBDATA);

    let uint8 = builder.asUint8Array();
    return uint8;
  }
  return Buffer.concat(
    returnArray,
    returnArray.map((n) => n.length).reduce((a, b) => a + b)
  );
};

const readHeader = (fd, position = null) => {
  let headLen = flatbuffers.SIZE_PREFIX_LENGTH;
  let sizeBuf = Buffer.alloc(headLen);

  /*read header*/
  fs.readSync(fd, sizeBuf, {
    offset: 0,
    length: headLen,
    position,
  });

  let idBuf = Buffer.alloc(flatbuffers.FILE_IDENTIFIER_LENGTH);
  fs.readSync(fd, idBuf, {
    offset: 0,
    length: idBuf.length,
    position: position + 8,
  });

  return {
    byteLength: sizeBuf.readInt32LE(0, sizeBuf),
    file_identifier: idBuf.toString(),
  };
};

const readFB = (filename, schema, fbClass, fbCollection) => {
  let fd = fs.openSync(filename, "r");
  let spLen = flatbuffers.SIZE_PREFIX_LENGTH + readHeader(fd).byteLength;
  let fbdataBuf = Buffer.alloc(spLen);

  let returnArray = [];
  /*reset for first read*/

  let pos = fs.readSync(fd, fbdataBuf, {
    offset: 0,
    length: spLen,
    position: 0,
  });
  returnArray.push(fbdataBuf);
  while (pos < fs.statSync(filename).size) {
    let _spLen =
      flatbuffers.SIZE_PREFIX_LENGTH + readHeader(fd, pos).byteLength;

    let _fbdataBuf = Buffer.alloc(_spLen);

    fs.readSync(fd, _fbdataBuf, {
      offset: 0,
      length: _spLen,
      position: pos,
    });
    returnArray.push(_fbdataBuf);
    pos += _spLen;
  }

  return readFB(returnArray, schema, fbClass, fbCollection);
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

var Module = (function () {
  var _scriptDir = 'file://src/SGP4Propagator/wasmmodule.mjs';

  return (
    function (Module) {
      Module = Module || {};



      // The Module object: Our interface to the outside world. We import
      // and export values on it. There are various ways Module can be used:
      // 1. Not defined. We create it here
      // 2. A function parameter, function(Module) { ..generated code.. }
      // 3. pre-run appended it, var Module = {}; ..generated code..
      // 4. External script tag defines var Module.
      // We need to check if Module already exists (e.g. case 3 above).
      // Substitution will be replaced with actual code on later stage of the build,
      // this way Closure Compiler will not mangle it (e.g. case 4. above).
      // Note that if you want to run closure, and also to use Module
      // after the generated code, you will need to define   var Module = {};
      // before the code. Then that object will be used in the code, and you
      // can continue to use Module afterwards as well.
      var Module = typeof Module !== 'undefined' ? Module : {};


      // Set up the promise that indicates the Module is initialized
      var readyPromiseResolve, readyPromiseReject;
      Module['ready'] = new Promise(function (resolve, reject) {
        readyPromiseResolve = resolve;
        readyPromiseReject = reject;
      });

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_sizeOfsatelliteCatalog')) {
        Object.defineProperty(Module['ready'], '_sizeOfsatelliteCatalog', { configurable: true, get: function () { abort('You are getting _sizeOfsatelliteCatalog on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_sizeOfsatelliteCatalog', { configurable: true, set: function () { abort('You are setting _sizeOfsatelliteCatalog on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_generateEphemeris')) {
        Object.defineProperty(Module['ready'], '_generateEphemeris', { configurable: true, get: function () { abort('You are getting _generateEphemeris on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_generateEphemeris', { configurable: true, set: function () { abort('You are setting _generateEphemeris on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_registerEntity')) {
        Object.defineProperty(Module['ready'], '_registerEntity', { configurable: true, get: function () { abort('You are getting _registerEntity on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_registerEntity', { configurable: true, set: function () { abort('You are setting _registerEntity on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_registerEntityOMM')) {
        Object.defineProperty(Module['ready'], '_registerEntityOMM', { configurable: true, get: function () { abort('You are getting _registerEntityOMM on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_registerEntityOMM', { configurable: true, set: function () { abort('You are setting _registerEntityOMM on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_propagate')) {
        Object.defineProperty(Module['ready'], '_propagate', { configurable: true, get: function () { abort('You are getting _propagate on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_propagate', { configurable: true, set: function () { abort('You are setting _propagate on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_describeObject')) {
        Object.defineProperty(Module['ready'], '_describeObject', { configurable: true, get: function () { abort('You are getting _describeObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_describeObject', { configurable: true, set: function () { abort('You are setting _describeObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_getValue')) {
        Object.defineProperty(Module['ready'], '_getValue', { configurable: true, get: function () { abort('You are getting _getValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_getValue', { configurable: true, set: function () { abort('You are setting _getValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_getValueInReferenceFrame')) {
        Object.defineProperty(Module['ready'], '_getValueInReferenceFrame', { configurable: true, get: function () { abort('You are getting _getValueInReferenceFrame on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_getValueInReferenceFrame', { configurable: true, set: function () { abort('You are setting _getValueInReferenceFrame on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_free')) {
        Object.defineProperty(Module['ready'], '_free', { configurable: true, get: function () { abort('You are getting _free on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_free', { configurable: true, set: function () { abort('You are setting _free on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_freePtr')) {
        Object.defineProperty(Module['ready'], '_freePtr', { configurable: true, get: function () { abort('You are getting _freePtr on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_freePtr', { configurable: true, set: function () { abort('You are setting _freePtr on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_deletePtr')) {
        Object.defineProperty(Module['ready'], '_deletePtr', { configurable: true, get: function () { abort('You are getting _deletePtr on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_deletePtr', { configurable: true, set: function () { abort('You are setting _deletePtr on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_removeAll')) {
        Object.defineProperty(Module['ready'], '_removeAll', { configurable: true, get: function () { abort('You are getting _removeAll on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_removeAll', { configurable: true, set: function () { abort('You are setting _removeAll on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_removeEntity')) {
        Object.defineProperty(Module['ready'], '_removeEntity', { configurable: true, get: function () { abort('You are getting _removeEntity on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_removeEntity', { configurable: true, set: function () { abort('You are setting _removeEntity on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_getSatAzElRange')) {
        Object.defineProperty(Module['ready'], '_getSatAzElRange', { configurable: true, get: function () { abort('You are getting _getSatAzElRange on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_getSatAzElRange', { configurable: true, set: function () { abort('You are setting _getSatAzElRange on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_getSatAzElRangeForInterval')) {
        Object.defineProperty(Module['ready'], '_getSatAzElRangeForInterval', { configurable: true, get: function () { abort('You are getting _getSatAzElRangeForInterval on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_getSatAzElRangeForInterval', { configurable: true, set: function () { abort('You are setting _getSatAzElRangeForInterval on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_getSatAzElRangePositionForInterval')) {
        Object.defineProperty(Module['ready'], '_getSatAzElRangePositionForInterval', { configurable: true, get: function () { abort('You are getting _getSatAzElRangePositionForInterval on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_getSatAzElRangePositionForInterval', { configurable: true, set: function () { abort('You are setting _getSatAzElRangePositionForInterval on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_malloc')) {
        Object.defineProperty(Module['ready'], '_malloc', { configurable: true, get: function () { abort('You are getting _malloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_malloc', { configurable: true, set: function () { abort('You are setting _malloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_stackSave')) {
        Object.defineProperty(Module['ready'], '_stackSave', { configurable: true, get: function () { abort('You are getting _stackSave on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_stackSave', { configurable: true, set: function () { abort('You are setting _stackSave on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_stackRestore')) {
        Object.defineProperty(Module['ready'], '_stackRestore', { configurable: true, get: function () { abort('You are getting _stackRestore on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_stackRestore', { configurable: true, set: function () { abort('You are setting _stackRestore on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_stackAlloc')) {
        Object.defineProperty(Module['ready'], '_stackAlloc', { configurable: true, get: function () { abort('You are getting _stackAlloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_stackAlloc', { configurable: true, set: function () { abort('You are setting _stackAlloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '___data_end')) {
        Object.defineProperty(Module['ready'], '___data_end', { configurable: true, get: function () { abort('You are getting ___data_end on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '___data_end', { configurable: true, set: function () { abort('You are setting ___data_end on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '___wasm_call_ctors')) {
        Object.defineProperty(Module['ready'], '___wasm_call_ctors', { configurable: true, get: function () { abort('You are getting ___wasm_call_ctors on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '___wasm_call_ctors', { configurable: true, set: function () { abort('You are setting ___wasm_call_ctors on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_fflush')) {
        Object.defineProperty(Module['ready'], '_fflush', { configurable: true, get: function () { abort('You are getting _fflush on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_fflush', { configurable: true, set: function () { abort('You are setting _fflush on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '___errno_location')) {
        Object.defineProperty(Module['ready'], '___errno_location', { configurable: true, get: function () { abort('You are getting ___errno_location on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '___errno_location', { configurable: true, set: function () { abort('You are setting ___errno_location on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_setThrew')) {
        Object.defineProperty(Module['ready'], '_setThrew', { configurable: true, get: function () { abort('You are getting _setThrew on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '_setThrew', { configurable: true, set: function () { abort('You are setting _setThrew on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '__get_tzname')) {
        Object.defineProperty(Module['ready'], '__get_tzname', { configurable: true, get: function () { abort('You are getting __get_tzname on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '__get_tzname', { configurable: true, set: function () { abort('You are setting __get_tzname on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '__get_daylight')) {
        Object.defineProperty(Module['ready'], '__get_daylight', { configurable: true, get: function () { abort('You are getting __get_daylight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '__get_daylight', { configurable: true, set: function () { abort('You are setting __get_daylight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], '__get_timezone')) {
        Object.defineProperty(Module['ready'], '__get_timezone', { configurable: true, get: function () { abort('You are getting __get_timezone on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], '__get_timezone', { configurable: true, set: function () { abort('You are setting __get_timezone on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      if (!Object.getOwnPropertyDescriptor(Module['ready'], 'onRuntimeInitialized')) {
        Object.defineProperty(Module['ready'], 'onRuntimeInitialized', { configurable: true, get: function () { abort('You are getting onRuntimeInitialized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
        Object.defineProperty(Module['ready'], 'onRuntimeInitialized', { configurable: true, set: function () { abort('You are setting onRuntimeInitialized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'); } });
      }


      // --pre-jses are emitted after the Module integration code, so that they can
      // refer to Module (if they choose; they can also define Module)
      // {{PRE_JSES}}

      // Sometimes an existing Module object exists with properties
      // meant to overwrite the default module functionality. Here
      // we collect those properties and reapply _after_ we configure
      // the current environment's defaults to avoid having to be so
      // defensive during initialization.
      var moduleOverrides = {};
      var key;
      for (key in Module) {
        if (Module.hasOwnProperty(key)) {
          moduleOverrides[key] = Module[key];
        }
      }

      var arguments_ = [];
      var thisProgram = './this.program';
      var quit_ = function (status, toThrow) {
        throw toThrow;
      };

      // Determine the runtime environment we are in. You can customize this by
      // setting the ENVIRONMENT setting at compile time (see settings.js).

      var ENVIRONMENT_IS_WEB = false;
      var ENVIRONMENT_IS_WORKER = false;
      var ENVIRONMENT_IS_NODE = false;
      var ENVIRONMENT_IS_SHELL = false;
      ENVIRONMENT_IS_WEB = typeof window === 'object';
      ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
      // N.b. Electron.js environment is simultaneously a NODE-environment, but
      // also a web environment.
      ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
      ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

      if (Module['ENVIRONMENT']) {
        throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)');
      }



      // `/` should be present at the end if `scriptDirectory` is not empty
      var scriptDirectory = '';
      function locateFile(path) {
        if (Module['locateFile']) {
          return Module['locateFile'](path, scriptDirectory);
        }
        return scriptDirectory + path;
      }

      // Hooks that are implemented differently in different runtime environments.
      var read_,
        readBinary;

      var nodeFS;
      var nodePath;

      if (ENVIRONMENT_IS_NODE) {
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = require('path').dirname(scriptDirectory) + '/';
        } else {
          scriptDirectory = + '/';
        }




        read_ = function shell_read(filename, binary) {
          var ret = tryParseAsDataURI(filename);
          if (ret) {
            return binary ? ret : ret.toString();
          }
          if (!nodeFS) nodeFS = require('fs');
          if (!nodePath) nodePath = require('path');
          filename = nodePath['normalize'](filename);
          return nodeFS['readFileSync'](filename, binary ? null : 'utf8');
        };

        readBinary = function readBinary(filename) {
          var ret = read_(filename, true);
          if (!ret.buffer) {
            ret = new Uint8Array(ret);
          }
          assert(ret.buffer);
          return ret;
        };




        if (process['argv'].length > 1) {
          thisProgram = process['argv'][1].replace(/\\/g, '/');
        }

        arguments_ = process['argv'].slice(2);

        // MODULARIZE will export the module in the proper place outside, we don't need to export here

        process['on']('uncaughtException', function (ex) {
          // suppress ExitStatus exceptions from showing an error
          if (!(ex instanceof ExitStatus)) {
            throw ex;
          }
        });

        process['on']('unhandledRejection', abort);

        quit_ = function (status) {
          process['exit'](status);
        };

        Module['inspect'] = function () { return '[Emscripten Module object]'; };



      } else
        if (ENVIRONMENT_IS_SHELL) {


          if (typeof read != 'undefined') {
            read_ = function shell_read(f) {
              var data = tryParseAsDataURI(f);
              if (data) {
                return intArrayToString(data);
              }
              return read(f);
            };
          }

          readBinary = function readBinary(f) {
            var data;
            data = tryParseAsDataURI(f);
            if (data) {
              return data;
            }
            if (typeof readbuffer === 'function') {
              return new Uint8Array(readbuffer(f));
            }
            data = read(f, 'binary');
            assert(typeof data === 'object');
            return data;
          };

          if (typeof scriptArgs != 'undefined') {
            arguments_ = scriptArgs;
          } else if (typeof arguments != 'undefined') {
            arguments_ = arguments;
          }

          if (typeof quit === 'function') {
            quit_ = function (status) {
              quit(status);
            };
          }

          if (typeof print !== 'undefined') {
            // Prefer to use print/printErr where they exist, as they usually work better.
            if (typeof console === 'undefined') console = /** @type{!Console} */({});
            console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
            console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr !== 'undefined' ? printErr : print);
          }


        } else

          // Note that this includes Node.js workers when relevant (pthreads is enabled).
          // Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
          // ENVIRONMENT_IS_NODE.
          if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
            if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
              scriptDirectory = self.location.href;
            } else if (document.currentScript) { // web
              scriptDirectory = document.currentScript.src;
            }
            // When MODULARIZE, this JS may be executed later, after document.currentScript
            // is gone, so we saved it, and we use it here instead of any other info.
            if (_scriptDir) {
              scriptDirectory = _scriptDir;
            }
            // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
            // otherwise, slice off the final part of the url to find the script directory.
            // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
            // and scriptDirectory will correctly be replaced with an empty string.
            if (scriptDirectory.indexOf('blob:') !== 0) {
              scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/') + 1);
            } else {
              scriptDirectory = '';
            }


            // Differentiate the Web Worker from the Node Worker case, as reading must
            // be done differently.
            {




              read_ = function shell_read(url) {
                try {
                  var xhr = new XMLHttpRequest();
                  xhr.open('GET', url, false);
                  xhr.send(null);
                  return xhr.responseText;
                } catch (err) {
                  var data = tryParseAsDataURI(url);
                  if (data) {
                    return intArrayToString(data);
                  }
                  throw err;
                }
              };

              if (ENVIRONMENT_IS_WORKER) {
                readBinary = function readBinary(url) {
                  try {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, false);
                    xhr.responseType = 'arraybuffer';
                    xhr.send(null);
                    return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
                  } catch (err) {
                    var data = tryParseAsDataURI(url);
                    if (data) {
                      return data;
                    }
                    throw err;
                  }
                };
              }




            }
          } else {
            throw new Error('environment detection error');
          }


      // Set up the out() and err() hooks, which are how we can print to stdout or
      // stderr, respectively.
      var out = Module['print'] || console.log.bind(console);
      var err = Module['printErr'] || console.warn.bind(console);

      // Merge back in the overrides
      for (key in moduleOverrides) {
        if (moduleOverrides.hasOwnProperty(key)) {
          Module[key] = moduleOverrides[key];
        }
      }
      // Free the object hierarchy contained in the overrides, this lets the GC
      // reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
      moduleOverrides = null;

      // Emit code to handle expected values on the Module object. This applies Module.x
      // to the proper local x. This has two benefits: first, we only emit it if it is
      // expected to arrive, and second, by using a local everywhere else that can be
      // minified.
      if (Module['arguments']) arguments_ = Module['arguments']; if (!Object.getOwnPropertyDescriptor(Module, 'arguments')) Object.defineProperty(Module, 'arguments', { configurable: true, get: function () { abort('Module.arguments has been replaced with plain arguments_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'); } });
      if (Module['thisProgram']) thisProgram = Module['thisProgram']; if (!Object.getOwnPropertyDescriptor(Module, 'thisProgram')) Object.defineProperty(Module, 'thisProgram', { configurable: true, get: function () { abort('Module.thisProgram has been replaced with plain thisProgram (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'); } });
      if (Module['quit']) quit_ = Module['quit']; if (!Object.getOwnPropertyDescriptor(Module, 'quit')) Object.defineProperty(Module, 'quit', { configurable: true, get: function () { abort('Module.quit has been replaced with plain quit_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'); } });

      // perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
      // Assertions on removed incoming Module JS APIs.
      assert(typeof Module['memoryInitializerPrefixURL'] === 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
      assert(typeof Module['pthreadMainPrefixURL'] === 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
      assert(typeof Module['cdInitializerPrefixURL'] === 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
      assert(typeof Module['filePackagePrefixURL'] === 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
      assert(typeof Module['read'] === 'undefined', 'Module.read option was removed (modify read_ in JS)');
      assert(typeof Module['readAsync'] === 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
      assert(typeof Module['readBinary'] === 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
      assert(typeof Module['setWindowTitle'] === 'undefined', 'Module.setWindowTitle option was removed (modify setWindowTitle in JS)');
      assert(typeof Module['TOTAL_MEMORY'] === 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
      if (!Object.getOwnPropertyDescriptor(Module, 'read')) Object.defineProperty(Module, 'read', { configurable: true, get: function () { abort('Module.read has been replaced with plain read_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'); } });
      if (!Object.getOwnPropertyDescriptor(Module, 'readAsync')) Object.defineProperty(Module, 'readAsync', { configurable: true, get: function () { abort('Module.readAsync has been replaced with plain readAsync (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'); } });
      if (!Object.getOwnPropertyDescriptor(Module, 'readBinary')) Object.defineProperty(Module, 'readBinary', { configurable: true, get: function () { abort('Module.readBinary has been replaced with plain readBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'); } });
      if (!Object.getOwnPropertyDescriptor(Module, 'setWindowTitle')) Object.defineProperty(Module, 'setWindowTitle', { configurable: true, get: function () { abort('Module.setWindowTitle has been replaced with plain setWindowTitle (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'); } });






      // {{PREAMBLE_ADDITIONS}}

      var STACK_ALIGN = 16;

      function alignMemory(size, factor) {
        if (!factor) factor = STACK_ALIGN; // stack alignment (16-byte) by default
        return Math.ceil(size / factor) * factor;
      }

      function warnOnce(text) {
        if (!warnOnce.shown) warnOnce.shown = {};
        if (!warnOnce.shown[text]) {
          warnOnce.shown[text] = 1;
          err(text);
        }
      }





      // === Preamble library stuff ===

      // Documentation for the public APIs defined in this file must be updated in:
      //    site/source/docs/api_reference/preamble.js.rst
      // A prebuilt local version of the documentation is available at:
      //    site/build/text/docs/api_reference/preamble.js.txt
      // You can also build docs locally as HTML or other formats in site/
      // An online HTML version (which may be of a different version of Emscripten)
      //    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html


      var wasmBinary; if (Module['wasmBinary']) wasmBinary = Module['wasmBinary']; if (!Object.getOwnPropertyDescriptor(Module, 'wasmBinary')) Object.defineProperty(Module, 'wasmBinary', { configurable: true, get: function () { abort('Module.wasmBinary has been replaced with plain wasmBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'); } });
      var noExitRuntime; if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime']; if (!Object.getOwnPropertyDescriptor(Module, 'noExitRuntime')) Object.defineProperty(Module, 'noExitRuntime', { configurable: true, get: function () { abort('Module.noExitRuntime has been replaced with plain noExitRuntime (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'); } });


      if (typeof WebAssembly !== 'object') {
        abort('no native wasm support detected');
      }






      // Wasm globals

      var wasmMemory;

      // In fastcomp asm.js, we don't need a wasm Table at all.
      // In the wasm backend, we polyfill the WebAssembly object,
      // so this creates a (non-native-wasm) table for us.

      var wasmTable = new WebAssembly.Table({
        'initial': 34,
        'maximum': 34,
        'element': 'anyfunc'
      });




      //========================================
      // Runtime essentials
      //========================================

      // whether we are quitting the application. no code should run after this.
      // set in exit() and abort()
      var ABORT = false;

      /** @type {function(*, string=)} */
      function assert(condition, text) {
        if (!condition) {
          abort('Assertion failed: ' + text);
        }
      }

      // Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
      function getCFunc(ident) {
        var func = Module['_' + ident]; // closure exported function
        assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
        return func;
      }

      // C calling interface.
      /** @param {string|null=} returnType
          @param {Array=} argTypes
          @param {Arguments|Array=} args
          @param {Object=} opts */
      function ccall(ident, returnType, argTypes, args, opts) {
        // For fast lookup of conversion functions
        var toC = {
          'string': function (str) {
            var ret = 0;
            if (str !== null && str !== undefined && str !== 0) { // null string
              // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
              var len = (str.length << 2) + 1;
              ret = stackAlloc(len);
              stringToUTF8(str, ret, len);
            }
            return ret;
          },
          'array': function (arr) {
            var ret = stackAlloc(arr.length);
            writeArrayToMemory(arr, ret);
            return ret;
          }
        };

        function convertReturnValue(ret) {
          if (returnType === 'string') return UTF8ToString(ret);
          if (returnType === 'boolean') return Boolean(ret);
          return ret;
        }

        var func = getCFunc(ident);
        var cArgs = [];
        var stack = 0;
        assert(returnType !== 'array', 'Return type should not be "array".');
        if (args) {
          for (var i = 0; i < args.length; i++) {
            var converter = toC[argTypes[i]];
            if (converter) {
              if (stack === 0) stack = stackSave();
              cArgs[i] = converter(args[i]);
            } else {
              cArgs[i] = args[i];
            }
          }
        }
        var ret = func.apply(null, cArgs);

        ret = convertReturnValue(ret);
        if (stack !== 0) stackRestore(stack);
        return ret;
      }

      /** @param {string=} returnType
          @param {Array=} argTypes
          @param {Object=} opts */
      function cwrap(ident, returnType, argTypes, opts) {
        return function () {
          return ccall(ident, returnType, argTypes, arguments);
        }
      }




      // runtime_strings.js: Strings related runtime functions that are part of both MINIMAL_RUNTIME and regular runtime.

      // Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
      // a copy of that string as a Javascript String object.

      var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

      /**
       * @param {number} idx
       * @param {number=} maxBytesToRead
       * @return {string}
       */
      function UTF8ArrayToString(heap, idx, maxBytesToRead) {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
        // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
        // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
        while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;

        if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
          return UTF8Decoder.decode(heap.subarray(idx, endPtr));
        } else {
          var str = '';
          // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
          while (idx < endPtr) {
            // For UTF8 byte structure, see:
            // http://en.wikipedia.org/wiki/UTF-8#Description
            // https://www.ietf.org/rfc/rfc2279.txt
            // https://tools.ietf.org/html/rfc3629
            var u0 = heap[idx++];
            if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
            var u1 = heap[idx++] & 63;
            if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
            var u2 = heap[idx++] & 63;
            if ((u0 & 0xF0) == 0xE0) {
              u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
            } else {
              if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte 0x' + u0.toString(16) + ' encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!');
              u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
            }

            if (u0 < 0x10000) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 0x10000;
              str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
            }
          }
        }
        return str;
      }

      // Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
      // copy of that string as a Javascript String object.
      // maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
      //                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
      //                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
      //                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
      //                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
      //                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
      //                 throw JS JIT optimizations off, so it is worth to consider consistently using one
      //                 style or the other.
      /**
       * @param {number} ptr
       * @param {number=} maxBytesToRead
       * @return {string}
       */
      function UTF8ToString(ptr, maxBytesToRead) {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
      }

      // Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
      // encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
      // Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
      // Parameters:
      //   str: the Javascript string to copy.
      //   heap: the array to copy to. Each index in this array is assumed to be one 8-byte element.
      //   outIdx: The starting offset in the array to begin the copying.
      //   maxBytesToWrite: The maximum number of bytes this function can write to the array.
      //                    This count should include the null terminator,
      //                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
      //                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
      // Returns the number of bytes written, EXCLUDING the null terminator.

      function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
          return 0;

        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
        for (var i = 0; i < str.length; ++i) {
          // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
          // See http://unicode.org/faq/utf_bom.html#utf16-3
          // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
          var u = str.charCodeAt(i); // possibly a lead surrogate
          if (u >= 0xD800 && u <= 0xDFFF) {
            var u1 = str.charCodeAt(++i);
            u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
          }
          if (u <= 0x7F) {
            if (outIdx >= endIdx) break;
            heap[outIdx++] = u;
          } else if (u <= 0x7FF) {
            if (outIdx + 1 >= endIdx) break;
            heap[outIdx++] = 0xC0 | (u >> 6);
            heap[outIdx++] = 0x80 | (u & 63);
          } else if (u <= 0xFFFF) {
            if (outIdx + 2 >= endIdx) break;
            heap[outIdx++] = 0xE0 | (u >> 12);
            heap[outIdx++] = 0x80 | ((u >> 6) & 63);
            heap[outIdx++] = 0x80 | (u & 63);
          } else {
            if (outIdx + 3 >= endIdx) break;
            if (u >= 0x200000) warnOnce('Invalid Unicode code point 0x' + u.toString(16) + ' encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).');
            heap[outIdx++] = 0xF0 | (u >> 18);
            heap[outIdx++] = 0x80 | ((u >> 12) & 63);
            heap[outIdx++] = 0x80 | ((u >> 6) & 63);
            heap[outIdx++] = 0x80 | (u & 63);
          }
        }
        // Null-terminate the pointer to the buffer.
        heap[outIdx] = 0;
        return outIdx - startIdx;
      }

      // Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
      // null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
      // Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
      // Returns the number of bytes written, EXCLUDING the null terminator.

      function stringToUTF8(str, outPtr, maxBytesToWrite) {
        assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      }

      // Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
      function lengthBytesUTF8(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
          // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
          // See http://unicode.org/faq/utf_bom.html#utf16-3
          var u = str.charCodeAt(i); // possibly a lead surrogate
          if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
          if (u <= 0x7F) ++len;
          else if (u <= 0x7FF) len += 2;
          else if (u <= 0xFFFF) len += 3;
          else len += 4;
        }
        return len;
      }

      // Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
      // a copy of that string as a Javascript String object.

      var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;

      function writeArrayToMemory(array, buffer) {
        assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)');
        HEAP8.set(array, buffer);
      }
      var WASM_PAGE_SIZE = 65536;

      function alignUp(x, multiple) {
        if (x % multiple > 0) {
          x += multiple - (x % multiple);
        }
        return x;
      }

      var /** @type {ArrayBuffer} */
        buffer,
        /** @type {Int8Array} */
        HEAP8,
        /** @type {Uint8Array} */
        HEAPU8,
        /** @type {Int16Array} */
        HEAP16,
        /** @type {Uint16Array} */
        HEAPU16,
        /** @type {Int32Array} */
        HEAP32,
        /** @type {Uint32Array} */
        HEAPU32,
        /** @type {Float32Array} */
        HEAPF32,
        /** @type {Float64Array} */
        HEAPF64;

      function updateGlobalBufferAndViews(buf) {
        buffer = buf;
        Module['HEAP8'] = HEAP8 = new Int8Array(buf);
        Module['HEAP16'] = HEAP16 = new Int16Array(buf);
        Module['HEAP32'] = HEAP32 = new Int32Array(buf);
        Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf);
        Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf);
        Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf);
        Module['HEAPF32'] = HEAPF32 = new Float32Array(buf);
        Module['HEAPF64'] = HEAPF64 = new Float64Array(buf);
      }

      var STACK_BASE = 5255008,
        STACK_MAX = 12128,
        DYNAMIC_BASE = 5255008,
        DYNAMICTOP_PTR = 12112;

      assert(STACK_BASE % 16 === 0, 'stack must start aligned');
      assert(DYNAMIC_BASE % 16 === 0, 'heap must start aligned');


      var TOTAL_STACK = 5242880;
      if (Module['TOTAL_STACK']) assert(TOTAL_STACK === Module['TOTAL_STACK'], 'the stack size can no longer be determined at runtime');

      var INITIAL_INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 25165824; if (!Object.getOwnPropertyDescriptor(Module, 'INITIAL_MEMORY')) Object.defineProperty(Module, 'INITIAL_MEMORY', { configurable: true, get: function () { abort('Module.INITIAL_MEMORY has been replaced with plain INITIAL_INITIAL_MEMORY (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)'); } });

      assert(INITIAL_INITIAL_MEMORY >= TOTAL_STACK, 'INITIAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_INITIAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

      // check for full engine support (use string 'subarray' to avoid closure compiler confusion)
      assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined,
        'JS engine does not provide full typed array support');








      // In non-standalone/normal mode, we create the memory here.



      // Create the main memory. (Note: this isn't used in STANDALONE_WASM mode since the wasm
      // memory is created in the wasm, not in JS.)

      if (Module['wasmMemory']) {
        wasmMemory = Module['wasmMemory'];
      } else {
        wasmMemory = new WebAssembly.Memory({
          'initial': INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
          ,
          'maximum': 2147483648 / WASM_PAGE_SIZE
        });
      }


      if (wasmMemory) {
        buffer = wasmMemory.buffer;
      }

      // If the user provides an incorrect length, just use that length instead rather than providing the user to
      // specifically provide the memory length with Module['INITIAL_MEMORY'].
      INITIAL_INITIAL_MEMORY = buffer.byteLength;
      assert(INITIAL_INITIAL_MEMORY % WASM_PAGE_SIZE === 0);
      assert(65536 % WASM_PAGE_SIZE === 0);
      updateGlobalBufferAndViews(buffer);

      HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;






      // Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
      function writeStackCookie() {
        assert((STACK_MAX & 3) == 0);
        // The stack grows downwards
        HEAPU32[(STACK_MAX >> 2) + 1] = 0x2135467;
        HEAPU32[(STACK_MAX >> 2) + 2] = 0x89BACDFE;
        // Also test the global address 0 for integrity.
        // We don't do this with ASan because ASan does its own checks for this.
        HEAP32[0] = 0x63736d65; /* 'emsc' */
      }

      function checkStackCookie() {
        var cookie1 = HEAPU32[(STACK_MAX >> 2) + 1];
        var cookie2 = HEAPU32[(STACK_MAX >> 2) + 2];
        if (cookie1 != 0x2135467 || cookie2 != 0x89BACDFE) {
          abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x' + cookie2.toString(16) + ' ' + cookie1.toString(16));
        }
        // Also test the global address 0 for integrity.
        // We don't do this with ASan because ASan does its own checks for this.
        if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
      }





      // Endianness check (note: assumes compiler arch was little-endian)
      (function () {
        var h16 = new Int16Array(1);
        var h8 = new Int8Array(h16.buffer);
        h16[0] = 0x6373;
        if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian!';
      })();



      var __ATPRERUN__ = []; // functions called before the runtime is initialized
      var __ATINIT__ = []; // functions called during startup
      var __ATMAIN__ = []; // functions called when main() is to be run
      var __ATPOSTRUN__ = []; // functions called after the main() is called

      var runtimeInitialized = false;
      var runtimeExited = false;


      function preRun() {

        if (Module['preRun']) {
          if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
          while (Module['preRun'].length) {
            addOnPreRun(Module['preRun'].shift());
          }
        }

        callRuntimeCallbacks(__ATPRERUN__);
      }

      function initRuntime() {
        checkStackCookie();
        assert(!runtimeInitialized);
        runtimeInitialized = true;
        if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
        TTY.init();
        callRuntimeCallbacks(__ATINIT__);
      }

      function preMain() {
        checkStackCookie();
        FS.ignorePermissions = false;
        callRuntimeCallbacks(__ATMAIN__);
      }

      function postRun() {
        checkStackCookie();

        if (Module['postRun']) {
          if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
          while (Module['postRun'].length) {
            addOnPostRun(Module['postRun'].shift());
          }
        }

        callRuntimeCallbacks(__ATPOSTRUN__);
      }

      function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb);
      }

      function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb);
      }




      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

      assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
      assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
      assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
      assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');

      var Math_abs = Math.abs;
      var Math_ceil = Math.ceil;
      var Math_floor = Math.floor;
      var Math_min = Math.min;



      // A counter of dependencies for calling run(). If we need to
      // do asynchronous work before running, increment this and
      // decrement it. Incrementing must happen in a place like
      // Module.preRun (used by emcc to add file preloading).
      // Note that you can add dependencies in preRun, even though
      // it happens right before run - run will be postponed until
      // the dependencies are met.
      var runDependencies = 0;
      var runDependencyWatcher = null;
      var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
      var runDependencyTracking = {};

      function getUniqueRunDependency(id) {
        var orig = id;
        while (1) {
          if (!runDependencyTracking[id]) return id;
          id = orig + Math.random();
        }
      }

      function addRunDependency(id) {
        runDependencies++;

        if (Module['monitorRunDependencies']) {
          Module['monitorRunDependencies'](runDependencies);
        }

        if (id) {
          assert(!runDependencyTracking[id]);
          runDependencyTracking[id] = 1;
          if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
            // Check for missing dependencies every few seconds
            runDependencyWatcher = setInterval(function () {
              if (ABORT) {
                clearInterval(runDependencyWatcher);
                runDependencyWatcher = null;
                return;
              }
              var shown = false;
              for (var dep in runDependencyTracking) {
                if (!shown) {
                  shown = true;
                  err('still waiting on run dependencies:');
                }
                err('dependency: ' + dep);
              }
              if (shown) {
                err('(end of list)');
              }
            }, 10000);
          }
        } else {
          err('warning: run dependency added without ID');
        }
      }

      function removeRunDependency(id) {
        runDependencies--;

        if (Module['monitorRunDependencies']) {
          Module['monitorRunDependencies'](runDependencies);
        }

        if (id) {
          assert(runDependencyTracking[id]);
          delete runDependencyTracking[id];
        } else {
          err('warning: run dependency removed without ID');
        }
        if (runDependencies == 0) {
          if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
          }
          if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback(); // can add another dependenciesFulfilled
          }
        }
      }

      Module["preloadedImages"] = {}; // maps url to image data
      Module["preloadedAudios"] = {}; // maps url to audio data

      /** @param {string|number=} what */
      function abort(what) {
        if (Module['onAbort']) {
          Module['onAbort'](what);
        }

        what += '';
        err(what);

        ABORT = true;

        var output = 'abort(' + what + ') at ' + stackTrace();
        what = output;

        // Use a wasm runtime error, because a JS error might be seen as a foreign
        // exception, which means we'd run destructors on it. We need the error to
        // simply make the program stop.
        var e = new WebAssembly.RuntimeError(what);

        readyPromiseReject(e);
        // Throw the error whether or not MODULARIZE is set because abort is used
        // in code paths apart from instantiation where an exception is expected
        // to be thrown when abort is called.
        throw e;
      }











      function hasPrefix(str, prefix) {
        return String.prototype.startsWith ?
          str.startsWith(prefix) :
          str.indexOf(prefix) === 0;
      }

      // Prefix of data URIs emitted by SINGLE_FILE and related options.
      var dataURIPrefix = 'data:application/octet-stream;base64,';

      // Indicates whether filename is a base64 data URI.
      function isDataURI(filename) {
        return hasPrefix(filename, dataURIPrefix);
      }

      var fileURIPrefix = "file://";

      // Indicates whether filename is delivered via file protocol (as opposed to http/https)
      function isFileURI(filename) {
        return hasPrefix(filename, fileURIPrefix);
      }



      function createExportWrapper(name, fixedasm) {
        return function () {
          var displayName = name;
          var asm = fixedasm;
          if (!fixedasm) {
            asm = Module['asm'];
          }
          assert(runtimeInitialized, 'native function `' + displayName + '` called before runtime initialization');
          assert(!runtimeExited, 'native function `' + displayName + '` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
          if (!asm[name]) {
            assert(asm[name], 'exported native function `' + displayName + '` not found');
          }
          return asm[name].apply(null, arguments);
        };
      }

      var wasmBinaryFile = 'data:application/octet-stream;base64,AGFzbQEAAAABzwU8YAF/AX9gAX8AYAJ/fwF/YAN/f38Bf2ACf38AYAN/f38AYAABf2AAAGABfAF8YAR/f39/AGAGf39/f39/AGAFf35+fn4AYAV/f39/fwBgBH9/f38Bf2AFf39/f38Bf2ADf35/AX5gAnx8AXxgBH9+fn8AYAZ/fH9/f38Bf2AFf3x8f38Bf2ABfAF+YAJ/fABgBHx8fHwAYAR/fH9/AX9gAn5/AX9gBH5+fn4Bf2ACfH8BfGADfHx/AXxgB39/f39/f38AYAl/f39/f39/f38AYAp/f39/f39/f39/AGAIf39/f398f38AYA5/f398fHx8fHx8fHx8fwBgA39/fgBgGX9/fHx8fHx8fH9/f398fHx8f39/f39/f38AYAJ/fgBgA39+fgBgAn99AGAEf3x/fwBgB398f39/f38AYCV/fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx/f39/f39/f39/AGAEfHx8fwBgFnx8fHx8fH9/f39/f39/f39/f39/f38AYFh8fHx8fHx8f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/AGAofHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f39/f39/fwBgSXx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH9/f39/f39/f39/f39/f39/f39/f39/f39/f39/f38AYAd/f39/f39/AX9gB39/f3x8fH8Bf2AWf398fHx8fHx8f39/f3x8fHx/fHx8fwF/YAR/fn9/AX9gA35/fwF/YAJ+fgF/YAJ8fwF/YAN8f38Bf2ACf38BfmAEf39/fgF+YAR/f35/AX5gAn5+AX1gAX8BfGACfn4BfALCAg0DZW52GF9fY3hhX2FsbG9jYXRlX2V4Y2VwdGlvbgAAA2VudgtfX2N4YV90aHJvdwAFA2VudgxfX2N4YV9hdGV4aXQAAxZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX2Nsb3NlAAAWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQdmZF9yZWFkAA0Wd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF93cml0ZQANA2VudgVhYm9ydAAHA2VudhZlbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwAAADZW52FWVtc2NyaXB0ZW5fbWVtY3B5X2JpZwADA2VudgtzZXRUZW1wUmV0MAABFndhc2lfc25hcHNob3RfcHJldmlldzEHZmRfc2VlawAOA2VudgZtZW1vcnkCAYADgIACA2VudgV0YWJsZQFwACID9ALyAgYHGRkREQsLCwsaMwMDAAMCAAEABgEABBAlBAYGCxUECzk7AwUEOhABAgIDAQIAAgIABQUEAQEIIB0qCAgrLC0mAwgQKB4FJx8EACICFQgpFhYHBwcHBwcBAAcBAwAFAAAAAAAAAAEAAAAEAAAABAUBAAAAAAAEBQAAAAAAAAADAAIAAAYAAQEICAcSLwEFAAAFAAAFAQAAAgMAAAUAAQAEAAAABQIAAwACAAIBMAEBAAACAAEBAgICAAABDAAAAgIAAgICBAECBQIEAgMAAgAABwc1AhMXFw0ICBMTBgYGDQEAAAAAAAAAAAAAAAAAGzQOCAgICBQIFAADAAMDBAADDwAAIwA3AAsRJAkKHDYDAAIhAwADAgUDGg4uBQAJMhgYDAISBBQDAgQCBgYGBgYAAgAHAAAEAAAABAQEAwQAAAAABAQEBgYDAQoGAAEAAAAAAQABAAEBAQEDAwACCgkMBQkFCQwKAAEEAA8bEDgOMQAGEAJ/AUHg3sACC38AQcjeAAsHggQeEV9fd2FzbV9jYWxsX2N0b3JzAAwGZmZsdXNoAFUWc2l6ZU9mc2F0ZWxsaXRlQ2F0YWxvZwCPAQdmcmVlUHRyAJEBBGZyZWUA8wIJZGVsZXRlUHRyAJIBDnJlZ2lzdGVyRW50aXR5AJcBEXJlZ2lzdGVyRW50aXR5T01NALgBDHJlbW92ZUVudGl0eQC5AQlyZW1vdmVBbGwA3AEJcHJvcGFnYXRlAN4BBm1hbGxvYwDyAhFnZW5lcmF0ZUVwaGVtZXJpcwDgAQhnZXRWYWx1ZQDhARhnZXRWYWx1ZUluUmVmZXJlbmNlRnJhbWUA4gEPZ2V0U2F0QXpFbFJhbmdlAOMBGmdldFNhdEF6RWxSYW5nZUZvckludGVydmFsAOYBImdldFNhdEF6RWxSYW5nZVBvc2l0aW9uRm9ySW50ZXJ2YWwA5wEOZGVzY3JpYmVPYmplY3QA6AEQX19lcnJub19sb2NhdGlvbgC2AgtfZ2V0X3R6bmFtZQC3Ag1fZ2V0X2RheWxpZ2h0ALgCDV9nZXRfdGltZXpvbmUAuQIIc2V0VGhyZXcAIglzdGFja1NhdmUAHwxzdGFja1Jlc3RvcmUAIApzdGFja0FsbG9jACEKX19kYXRhX2VuZAMBDGR5bkNhbGxfamlqaQD6AhBfX2dyb3dXYXNtTWVtb3J5APwCCUUBAEEBCyE5Y2bzAvICrwKwAqMChAKFAowCsgKLAtcC2ALZAt0C3gLfAuAC5ALhAuIC5QLpAusC7QLjAvEC8ALvAvUC9gIKsOoH8gIGAEHQ3gALBAAQXgvgAQIBfwJ+QQEhBAJAIABCAFIgAUL///////////8AgyIFQoCAgICAgMD//wBWIAVCgICAgICAwP//AFEbDQAgAkIAUiADQv///////////wCDIgZCgICAgICAwP//AFYgBkKAgICAgIDA//8AURsNAAJAIAIgAIQgBiAFhIRQRQ0AQQAPCwJAIAMgAYNCAFMNAEF/IQQgACACVCABIANTIAEgA1EbDQEgACAChSABIAOFhEIAUg8LQX8hBCAAIAJWIAEgA1UgASADURsNACAAIAKFIAEgA4WEQgBSIQQLIAQL2AECAX8CfkF/IQQCQCAAQgBSIAFC////////////AIMiBUKAgICAgIDA//8AViAFQoCAgICAgMD//wBRGw0AIAJCAFIgA0L///////////8AgyIGQoCAgICAgMD//wBWIAZCgICAgICAwP//AFEbDQACQCACIACEIAYgBYSEUEUNAEEADwsCQCADIAGDQgBTDQAgACACVCABIANTIAEgA1EbDQEgACAChSABIAOFhEIAUg8LIAAgAlYgASADVSABIANRGw0AIAAgAoUgASADhYRCAFIhBAsgBAtTAQF+AkACQCADQcAAcUUNACABIANBQGqthiECQgAhAQwBCyADRQ0AIAFBwAAgA2utiCACIAOtIgSGhCECIAEgBIYhAQsgACABNwMAIAAgAjcDCAtTAQF+AkACQCADQcAAcUUNACACIANBQGqtiCEBQgAhAgwBCyADRQ0AIAJBwAAgA2uthiABIAOtIgSIhCEBIAIgBIghAgsgACABNwMAIAAgAjcDCAvlCwIFfw9+IwBB4ABrIgUkACABQiCIIAJCIIaEIQogA0IRiCAEQi+GhCELIANCMYggBEL///////8/gyIMQg+GhCENIAQgAoVCgICAgICAgICAf4MhDiACQv///////z+DIg9CIIghECAMQhGIIREgBEIwiKdB//8BcSEGAkACQAJAIAJCMIinQf//AXEiB0F/akH9/wFLDQBBACEIIAZBf2pB/v8BSQ0BCwJAIAFQIAJC////////////AIMiEkKAgICAgIDA//8AVCASQoCAgICAgMD//wBRGw0AIAJCgICAgICAIIQhDgwCCwJAIANQIARC////////////AIMiAkKAgICAgIDA//8AVCACQoCAgICAgMD//wBRGw0AIARCgICAgICAIIQhDiADIQEMAgsCQCABIBJCgICAgICAwP//AIWEQgBSDQACQCADIAKEUEUNAEKAgICAgIDg//8AIQ5CACEBDAMLIA5CgICAgICAwP//AIQhDkIAIQEMAgsCQCADIAJCgICAgICAwP//AIWEQgBSDQAgASAShCECQgAhAQJAIAJQRQ0AQoCAgICAgOD//wAhDgwDCyAOQoCAgICAgMD//wCEIQ4MAgsCQCABIBKEQgBSDQBCACEBDAILAkAgAyAChEIAUg0AQgAhAQwCC0EAIQgCQCASQv///////z9WDQAgBUHQAGogASAPIAEgDyAPUCIIG3kgCEEGdK18pyIIQXFqEA9BECAIayEIIAUpA1AiAUIgiCAFQdgAaikDACIPQiCGhCEKIA9CIIghEAsgAkL///////8/Vg0AIAVBwABqIAMgDCADIAwgDFAiCRt5IAlBBnStfKciCUFxahAPIAggCWtBEGohCCAFKQNAIgNCMYggBUHIAGopAwAiAkIPhoQhDSADQhGIIAJCL4aEIQsgAkIRiCERCyALQv////8PgyICIAFC/////w+DIgR+IhMgA0IPhkKAgP7/D4MiASAKQv////8PgyIDfnwiCkIghiIMIAEgBH58IgsgDFStIAIgA34iFCABIA9C/////w+DIgx+fCISIA1C/////w+DIg8gBH58Ig0gCkIgiCAKIBNUrUIghoR8IhMgAiAMfiIVIAEgEEKAgASEIgp+fCIQIA8gA358IhYgEUL/////B4NCgICAgAiEIgEgBH58IhFCIIZ8Ihd8IQQgByAGaiAIakGBgH9qIQYCQAJAIA8gDH4iGCACIAp+fCICIBhUrSACIAEgA358IgMgAlStfCADIBIgFFStIA0gElStfHwiAiADVK18IAEgCn58IAEgDH4iAyAPIAp+fCIBIANUrUIghiABQiCIhHwgAiABQiCGfCIBIAJUrXwgASARQiCIIBAgFVStIBYgEFStfCARIBZUrXxCIIaEfCIDIAFUrXwgAyATIA1UrSAXIBNUrXx8IgIgA1StfCIBQoCAgICAgMAAg1ANACAGQQFqIQYMAQsgC0I/iCEDIAFCAYYgAkI/iIQhASAEQj+IIAJCAYaEIQIgC0IBhiELIAMgBEIBhoQhBAsCQCAGQf//AUgNACAOQoCAgICAgMD//wCEIQ5CACEBDAELAkACQCAGQQBKDQACQEEBIAZrIgdBgAFJDQBCACEBDAMLIAVBMGogCyAEIAZB/wBqIgYQDyAFQSBqIAIgASAGEA8gBUEQaiALIAQgBxAQIAUgAiABIAcQECAFKQMgIAUpAxCEIAUpAzAgBUEwakEIaikDAIRCAFKthCELIAVBIGpBCGopAwAgBUEQakEIaikDAIQhBCAFQQhqKQMAIQEgBSkDACECDAELIAatQjCGIAFC////////P4OEIQELIAEgDoQhDgJAIAtQIARCf1UgBEKAgICAgICAgIB/URsNACAOIAJCAXwiASACVK18IQ4MAQsCQCALIARCgICAgICAgICAf4WEQgBRDQAgAiEBDAELIA4gAiACQgGDfCIBIAJUrXwhDgsgACABNwMAIAAgDjcDCCAFQeAAaiQAC3UBAX4gACAEIAF+IAIgA358IANCIIgiBCABQiCIIgJ+fCADQv////8PgyIDIAFC/////w+DIgF+IgVCIIggAyACfnwiA0IgiHwgA0L/////D4MgBCABfnwiA0IgiHw3AwggACADQiCGIAVC/////w+DhDcDAAuTEgIFfwx+IwBBwAFrIgUkACAEQv///////z+DIQogAkL///////8/gyELIAQgAoVCgICAgICAgICAf4MhDCAEQjCIp0H//wFxIQYCQAJAAkACQCACQjCIp0H//wFxIgdBf2pB/f8BSw0AQQAhCCAGQX9qQf7/AUkNAQsCQCABUCACQv///////////wCDIg1CgICAgICAwP//AFQgDUKAgICAgIDA//8AURsNACACQoCAgICAgCCEIQwMAgsCQCADUCAEQv///////////wCDIgJCgICAgICAwP//AFQgAkKAgICAgIDA//8AURsNACAEQoCAgICAgCCEIQwgAyEBDAILAkAgASANQoCAgICAgMD//wCFhEIAUg0AAkAgAyACQoCAgICAgMD//wCFhFBFDQBCACEBQoCAgICAgOD//wAhDAwDCyAMQoCAgICAgMD//wCEIQxCACEBDAILAkAgAyACQoCAgICAgMD//wCFhEIAUg0AQgAhAQwCCyABIA2EQgBRDQICQCADIAKEQgBSDQAgDEKAgICAgIDA//8AhCEMQgAhAQwCC0EAIQgCQCANQv///////z9WDQAgBUGwAWogASALIAEgCyALUCIIG3kgCEEGdK18pyIIQXFqEA9BECAIayEIIAVBuAFqKQMAIQsgBSkDsAEhAQsgAkL///////8/Vg0AIAVBoAFqIAMgCiADIAogClAiCRt5IAlBBnStfKciCUFxahAPIAkgCGpBcGohCCAFQagBaikDACEKIAUpA6ABIQMLIAVBkAFqIANCMYggCkKAgICAgIDAAIQiDkIPhoQiAkIAQoTJ+c6/5ryC9QAgAn0iBEIAEBIgBUGAAWpCACAFQZABakEIaikDAH1CACAEQgAQEiAFQfAAaiAFKQOAAUI/iCAFQYABakEIaikDAEIBhoQiBEIAIAJCABASIAVB4ABqIARCAEIAIAVB8ABqQQhqKQMAfUIAEBIgBUHQAGogBSkDYEI/iCAFQeAAakEIaikDAEIBhoQiBEIAIAJCABASIAVBwABqIARCAEIAIAVB0ABqQQhqKQMAfUIAEBIgBUEwaiAFKQNAQj+IIAVBwABqQQhqKQMAQgGGhCIEQgAgAkIAEBIgBUEgaiAEQgBCACAFQTBqQQhqKQMAfUIAEBIgBUEQaiAFKQMgQj+IIAVBIGpBCGopAwBCAYaEIgRCACACQgAQEiAFIARCAEIAIAVBEGpBCGopAwB9QgAQEiAIIAcgBmtqIQYCQAJAQgAgBSkDAEI/iCAFQQhqKQMAQgGGhEJ/fCINQv////8PgyIEIAJCIIgiD34iECANQiCIIg0gAkL/////D4MiEX58IgJCIIggAiAQVK1CIIaEIA0gD358IAJCIIYiDyAEIBF+fCICIA9UrXwgAiAEIANCEYhC/////w+DIhB+IhEgDSADQg+GQoCA/v8PgyISfnwiD0IghiITIAQgEn58IBNUrSAPQiCIIA8gEVStQiCGhCANIBB+fHx8Ig8gAlStfCAPQgBSrXx9IgJC/////w+DIhAgBH4iESAQIA1+IhIgBCACQiCIIhN+fCICQiCGfCIQIBFUrSACQiCIIAIgElStQiCGhCANIBN+fHwgEEIAIA99IgJCIIgiDyAEfiIRIAJC/////w+DIhIgDX58IgJCIIYiEyASIAR+fCATVK0gAkIgiCACIBFUrUIghoQgDyANfnx8fCICIBBUrXwgAkJ+fCIRIAJUrXxCf3wiD0L/////D4MiAiABQj6IIAtCAoaEQv////8PgyIEfiIQIAFCHohC/////w+DIg0gD0IgiCIPfnwiEiAQVK0gEiARQiCIIhAgC0IeiEL//+//D4NCgIAQhCILfnwiEyASVK18IAsgD358IAIgC34iFCAEIA9+fCISIBRUrUIghiASQiCIhHwgEyASQiCGfCISIBNUrXwgEiAQIA1+IhQgEUL/////D4MiESAEfnwiEyAUVK0gEyACIAFCAoZC/P///w+DIhR+fCIVIBNUrXx8IhMgElStfCATIBQgD34iEiARIAt+fCIPIBAgBH58IgQgAiANfnwiAkIgiCAPIBJUrSAEIA9UrXwgAiAEVK18QiCGhHwiDyATVK18IA8gFSAQIBR+IgQgESANfnwiDUIgiCANIARUrUIghoR8IgQgFVStIAQgAkIghnwgBFStfHwiBCAPVK18IgJC/////////wBWDQAgAUIxhiAEQv////8PgyIBIANC/////w+DIg1+Ig9CAFKtfUIAIA99IhEgBEIgiCIPIA1+IhIgASADQiCIIhB+fCILQiCGIhNUrX0gBCAOQiCIfiADIAJCIIh+fCACIBB+fCAPIAp+fEIghiACQv////8PgyANfiABIApC/////w+DfnwgDyAQfnwgC0IgiCALIBJUrUIghoR8fH0hDSARIBN9IQEgBkF/aiEGDAELIARCIYghECABQjCGIARCAYggAkI/hoQiBEL/////D4MiASADQv////8PgyINfiIPQgBSrX1CACAPfSILIAEgA0IgiCIPfiIRIBAgAkIfhoQiEkL/////D4MiEyANfnwiEEIghiIUVK19IAQgDkIgiH4gAyACQiGIfnwgAkIBiCICIA9+fCASIAp+fEIghiATIA9+IAJC/////w+DIA1+fCABIApC/////w+DfnwgEEIgiCAQIBFUrUIghoR8fH0hDSALIBR9IQEgAiECCwJAIAZBgIABSA0AIAxCgICAgICAwP//AIQhDEIAIQEMAQsgBkH//wBqIQcCQCAGQYGAf0oNAAJAIAcNACACQv///////z+DIAQgAUIBhiADViANQgGGIAFCP4iEIgEgDlYgASAOURutfCIBIARUrXwiA0KAgICAgIDAAINQDQAgAyAMhCEMDAILQgAhAQwBCyAHrUIwhiACQv///////z+DhCAEIAFCAYYgA1ogDUIBhiABQj+IhCIBIA5aIAEgDlEbrXwiASAEVK18IAyEIQwLIAAgATcDACAAIAw3AwggBUHAAWokAA8LIABCADcDACAAQoCAgICAgOD//wAgDCADIAKEUBs3AwggBUHAAWokAAvkBgIFfwR+IwBBgAFrIgUkAAJAAkACQCADIARCAEIAEA1FDQAgAyAEEBYhBiACQjCIpyIHQf//AXEiCEH//wFGDQAgBg0BCyAFQRBqIAEgAiADIAQQESAFIAUpAxAiBCAFQRBqQQhqKQMAIgMgBCADEBMgBUEIaikDACECIAUpAwAhBAwBCwJAIAEgCK1CMIYgAkL///////8/g4QiCiADIARCMIinQf//AXEiCa1CMIYgBEL///////8/g4QiCxANQQBKDQACQCABIAogAyALEA1FDQAgASEEDAILIAVB8ABqIAEgAkIAQgAQESAFQfgAaikDACECIAUpA3AhBAwBCwJAAkAgCEUNACABIQQMAQsgBUHgAGogASAKQgBCgICAgICAwLvAABARIAVB6ABqKQMAIgpCMIinQYh/aiEIIAUpA2AhBAsCQCAJDQAgBUHQAGogAyALQgBCgICAgICAwLvAABARIAVB2ABqKQMAIgtCMIinQYh/aiEJIAUpA1AhAwsgCkL///////8/g0KAgICAgIDAAIQiCiALQv///////z+DQoCAgICAgMAAhCIMfSAEIANUrX0iDUJ/VSEGIAQgA30hCwJAIAggCUwNAANAAkACQCAGQQFxRQ0AAkAgDSALhEIAUg0AIAVBIGogASACQgBCABARIAVBKGopAwAhAiAFKQMgIQQMBQsgC0I/iCEKIA1CAYYhDQwBCyAEQj+IIQ0gCkIBhiEKIAQhCwsgDSAKhCIKIAx9IAtCAYYiBCADVK19Ig1Cf1UhBiAEIAN9IQsgCEF/aiIIIAlKDQALIAkhCAsCQCAGRQ0AIA0hCiALIQQgDSALhEIAUg0AIAVBMGogASACQgBCABARIAVBOGopAwAhAiAFKQMwIQQMAQsCQCAKQv///////z9WDQADQCAEQj+IIQMgCEF/aiEIIARCAYYhBCADIApCAYaEIgpCgICAgICAwABUDQALCyAHQYCAAnEhBgJAIAhBAEoNACAFQcAAaiAEIApC////////P4MgCEH4AGogBnKtQjCGhEIAQoCAgICAgMDDPxARIAVByABqKQMAIQIgBSkDQCEEDAELIApC////////P4MgCCAGcq1CMIaEIQILIAAgBDcDACAAIAI3AwggBUGAAWokAAuuAQACQAJAIAFBgAhIDQAgAEQAAAAAAADgf6IhAAJAIAFB/w9ODQAgAUGBeGohAQwCCyAARAAAAAAAAOB/oiEAIAFB/RcgAUH9F0gbQYJwaiEBDAELIAFBgXhKDQAgAEQAAAAAAAAQAKIhAAJAIAFBg3BMDQAgAUH+B2ohAQwBCyAARAAAAAAAABAAoiEAIAFBhmggAUGGaEobQfwPaiEBCyAAIAFB/wdqrUI0hr+iC0sCAn8BfiABQv///////z+DIQQCQAJAIAFCMIinQf//AXEiAkH//wFGDQBBBCEDIAINAUECQQMgBCAAhFAbDwsgBCAAhFAhAwsgAwuSBAEDfwJAIAJBgARJDQAgACABIAIQCBogAA8LIAAgAmohAwJAAkAgASAAc0EDcQ0AAkACQCACQQFODQAgACECDAELAkAgAEEDcQ0AIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADTw0BIAJBA3ENAAsLAkAgA0F8cSIEQcAASQ0AIAIgBEFAaiIFSw0AA0AgAiABKAIANgIAIAIgASgCBDYCBCACIAEoAgg2AgggAiABKAIMNgIMIAIgASgCEDYCECACIAEoAhQ2AhQgAiABKAIYNgIYIAIgASgCHDYCHCACIAEoAiA2AiAgAiABKAIkNgIkIAIgASgCKDYCKCACIAEoAiw2AiwgAiABKAIwNgIwIAIgASgCNDYCNCACIAEoAjg2AjggAiABKAI8NgI8IAFBwABqIQEgAkHAAGoiAiAFTQ0ACwsgAiAETw0BA0AgAiABKAIANgIAIAFBBGohASACQQRqIgIgBEkNAAwCAAsACwJAIANBBE8NACAAIQIMAQsCQCADQXxqIgQgAE8NACAAIQIMAQsgACECA0AgAiABLQAAOgAAIAIgAS0AAToAASACIAEtAAI6AAIgAiABLQADOgADIAFBBGohASACQQRqIgIgBE0NAAsLAkAgAiADTw0AA0AgAiABLQAAOgAAIAFBAWohASACQQFqIgIgA0cNAAsLIAAL8wICA38BfgJAIAJFDQAgAiAAaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIFayICQSBJDQAgAa0iBkIghiAGhCEGIAMgBWohAQNAIAEgBjcDGCABIAY3AxAgASAGNwMIIAEgBjcDACABQSBqIQEgAkFgaiICQR9LDQALCyAAC1wBAX8gACAALQBKIgFBf2ogAXI6AEoCQCAAKAIAIgFBCHFFDQAgACABQSByNgIAQX8PCyAAQgA3AgQgACAAKAIsIgE2AhwgACABNgIUIAAgASAAKAIwajYCEEEAC8MBAQR/AkACQCACKAIQIgMNAEEAIQQgAhAZDQEgAigCECEDCwJAIAMgAigCFCIFayABTw0AIAIgACABIAIoAiQRAwAPC0EAIQYCQCACLABLQQBIDQAgASEEA0AgBCIDRQ0BIAAgA0F/aiIEai0AAEEKRw0ACyACIAAgAyACKAIkEQMAIgQgA0kNASAAIANqIQAgASADayEBIAIoAhQhBSADIQYLIAUgACABEBcaIAIgAigCFCABajYCFCAGIAFqIQQLIAQLLAEBfyMAQRBrIgIkACACIAE2AgxBACgCjD8gACABEIcCIQEgAkEQaiQAIAELBABBAQsCAAucAQEDfyAAIQECQAJAIABBA3FFDQACQCAALQAADQAgACAAaw8LIAAhAQNAIAFBAWoiAUEDcUUNASABLQAARQ0CDAAACwALA0AgASICQQRqIQEgAigCACIDQX9zIANB//37d2pxQYCBgoR4cUUNAAsCQCADQf8BcQ0AIAIgAGsPCwNAIAItAAEhAyACQQFqIgEhAiADDQALCyABIABrCwQAIwALBgAgACQACxIBAn8jACAAa0FwcSIBJAAgAQsdAAJAQQAoAoBDDQBBACABNgKEQ0EAIAA2AoBDCwu2BAIDfwR+AkACQCABvSIFQgGGIgZQDQAgBUL///////////8Ag0KAgICAgICA+P8AVg0AIAC9IgdCNIinQf8PcSICQf8PRw0BCyAAIAGiIgEgAaMPCwJAIAdCAYYiCCAGWA0AIAVCNIinQf8PcSEDAkACQCACDQBBACECAkAgB0IMhiIGQgBTDQADQCACQX9qIQIgBkIBhiIGQn9VDQALCyAHQQEgAmuthiEGDAELIAdC/////////weDQoCAgICAgIAIhCEGCwJAAkAgAw0AQQAhAwJAIAVCDIYiCEIAUw0AA0AgA0F/aiEDIAhCAYYiCEJ/VQ0ACwsgBUEBIANrrYYhBQwBCyAFQv////////8Hg0KAgICAgICACIQhBQsgBiAFfSIIQn9VIQQCQCACIANMDQADQAJAIARBAXFFDQAgCCEGIAhCAFINACAARAAAAAAAAAAAog8LIAZCAYYiBiAFfSIIQn9VIQQgAkF/aiICIANKDQALIAMhAgsCQCAERQ0AIAghBiAIQgBSDQAgAEQAAAAAAAAAAKIPCwJAAkAgBkL/////////B1gNACAGIQgMAQsDQCACQX9qIQIgBkKAgICAgICABFQhAyAGQgGGIgghBiADDQALCyAHQoCAgICAgICAgH+DIQYCQAJAIAJBAUgNACAIQoCAgICAgIB4fCACrUI0hoQhCAwBCyAIQQEgAmutiCEICyAIIAaEvw8LIABEAAAAAAAAAACiIAAgCCAGURsL4AECA38CfiMAQRBrIgIkAAJAAkAgAbwiA0H/////B3EiBEGAgIB8akH////3B0sNACAErUIZhkKAgICAgICAwD98IQVCACEGDAELAkAgBEGAgID8B0kNACADrUIZhkKAgICAgIDA//8AhCEFQgAhBgwBCwJAIAQNAEIAIQZCACEFDAELIAIgBK1CACAEZyIEQdEAahAPIAJBCGopAwBCgICAgICAwACFQYn/ACAEa61CMIaEIQUgAikDACEGCyAAIAY3AwAgACAFIANBgICAgHhxrUIghoQ3AwggAkEQaiQAC4wBAgJ/An4jAEEQayICJAACQAJAIAENAEIAIQRCACEFDAELIAIgASABQR91IgNqIANzIgOtQgAgA2ciA0HRAGoQDyACQQhqKQMAQoCAgICAgMAAhUGegAEgA2utQjCGfCABQYCAgIB4ca1CIIaEIQUgAikDACEECyAAIAQ3AwAgACAFNwMIIAJBEGokAAsEAEEACwQAQQAL7woCBH8EfiMAQfAAayIFJAAgBEL///////////8AgyEJAkACQAJAIAFCf3wiCkJ/USACQv///////////wCDIgsgCiABVK18Qn98IgpC////////v///AFYgCkL///////+///8AURsNACADQn98IgpCf1IgCSAKIANUrXxCf3wiCkL///////+///8AVCAKQv///////7///wBRGw0BCwJAIAFQIAtCgICAgICAwP//AFQgC0KAgICAgIDA//8AURsNACACQoCAgICAgCCEIQQgASEDDAILAkAgA1AgCUKAgICAgIDA//8AVCAJQoCAgICAgMD//wBRGw0AIARCgICAgICAIIQhBAwCCwJAIAEgC0KAgICAgIDA//8AhYRCAFINAEKAgICAgIDg//8AIAIgAyABhSAEIAKFQoCAgICAgICAgH+FhFAiBhshBEIAIAEgBhshAwwCCyADIAlCgICAgICAwP//AIWEUA0BAkAgASALhEIAUg0AIAMgCYRCAFINAiADIAGDIQMgBCACgyEEDAILIAMgCYRQRQ0AIAEhAyACIQQMAQsgAyABIAMgAVYgCSALViAJIAtRGyIHGyEJIAQgAiAHGyILQv///////z+DIQogAiAEIAcbIgJCMIinQf//AXEhCAJAIAtCMIinQf//AXEiBg0AIAVB4ABqIAkgCiAJIAogClAiBht5IAZBBnStfKciBkFxahAPQRAgBmshBiAFQegAaikDACEKIAUpA2AhCQsgASADIAcbIQMgAkL///////8/gyEEAkAgCA0AIAVB0ABqIAMgBCADIAQgBFAiBxt5IAdBBnStfKciB0FxahAPQRAgB2shCCAFQdgAaikDACEEIAUpA1AhAwsgBEIDhiADQj2IhEKAgICAgICABIQhBCAKQgOGIAlCPYiEIQEgA0IDhiEDIAsgAoUhCgJAIAYgCGsiB0UNAAJAIAdB/wBNDQBCACEEQgEhAwwBCyAFQcAAaiADIARBgAEgB2sQDyAFQTBqIAMgBCAHEBAgBSkDMCAFKQNAIAVBwABqQQhqKQMAhEIAUq2EIQMgBUEwakEIaikDACEECyABQoCAgICAgIAEhCEMIAlCA4YhAgJAAkAgCkJ/VQ0AAkAgAiADfSIBIAwgBH0gAiADVK19IgSEUEUNAEIAIQNCACEEDAMLIARC/////////wNWDQEgBUEgaiABIAQgASAEIARQIgcbeSAHQQZ0rXynQXRqIgcQDyAGIAdrIQYgBUEoaikDACEEIAUpAyAhAQwBCyAEIAx8IAMgAnwiASADVK18IgRCgICAgICAgAiDUA0AIAFCAYggBEI/hoQgAUIBg4QhASAGQQFqIQYgBEIBiCEECyALQoCAgICAgICAgH+DIQICQCAGQf//AUgNACACQoCAgICAgMD//wCEIQRCACEDDAELQQAhBwJAAkAgBkEATA0AIAYhBwwBCyAFQRBqIAEgBCAGQf8AahAPIAUgASAEQQEgBmsQECAFKQMAIAUpAxAgBUEQakEIaikDAIRCAFKthCEBIAVBCGopAwAhBAsgAUIDiCAEQj2GhCEDIARCA4hC////////P4MgAoQgB61CMIaEIQQgAadBB3EhBgJAAkACQAJAAkAQJg4DAAECAwsgBCADIAZBBEutfCIBIANUrXwhBAJAIAZBBEYNACABIQMMAwsgBCABQgGDIgIgAXwiAyACVK18IQQMAwsgBCADIAJCAFIgBkEAR3GtfCIBIANUrXwhBCABIQMMAQsgBCADIAJQIAZBAEdxrXwiASADVK18IQQgASEDCyAGRQ0BCxAnGgsgACADNwMAIAAgBDcDCCAFQfAAaiQAC40CAgJ/A34jAEEQayICJAACQAJAIAG9IgRC////////////AIMiBUKAgICAgICAeHxC/////////+//AFYNACAFQjyGIQYgBUIEiEKAgICAgICAgDx8IQUMAQsCQCAFQoCAgICAgID4/wBUDQAgBEI8hiEGIARCBIhCgICAgICAwP//AIQhBQwBCwJAIAVQRQ0AQgAhBkIAIQUMAQsgAiAFQgAgBKdnQSBqIAVCIIinZyAFQoCAgIAQVBsiA0ExahAPIAJBCGopAwBCgICAgICAwACFQYz4ACADa61CMIaEIQUgAikDACEGCyAAIAY3AwAgACAFIARCgICAgICAgICAf4OENwMIIAJBEGokAAt0AgF/An4jAEEQayICJAACQAJAIAENAEIAIQNCACEEDAELIAIgAa1CAEHwACABZ0EfcyIBaxAPIAJBCGopAwBCgICAgICAwACFIAFB//8Aaq1CMIZ8IQQgAikDACEDCyAAIAM3AwAgACAENwMIIAJBEGokAAtAAQF/IwBBEGsiBSQAIAUgASACIAMgBEKAgICAgICAgIB/hRAoIAAgBSkDADcDACAAIAUpAwg3AwggBUEQaiQAC8IDAgN/AX4jAEEgayICJAACQAJAIAFC////////////AIMiBUKAgICAgIDAv0B8IAVCgICAgICAwMC/f3xaDQAgAUIZiKchAwJAIABQIAFC////D4MiBUKAgIAIVCAFQoCAgAhRGw0AIANBgYCAgARqIQMMAgsgA0GAgICABGohAyAAIAVCgICACIWEQgBSDQEgA0EBcSADaiEDDAELAkAgAFAgBUKAgICAgIDA//8AVCAFQoCAgICAgMD//wBRGw0AIAFCGYinQf///wFxQYCAgP4HciEDDAELQYCAgPwHIQMgBUL///////+/v8AAVg0AQQAhAyAFQjCIpyIEQZH+AEkNACACQRBqIAAgAUL///////8/g0KAgICAgIDAAIQiBSAEQf+Bf2oQDyACIAAgBUGB/wAgBGsQECACQQhqKQMAIgVCGYinIQMCQCACKQMAIAIpAxAgAkEQakEIaikDAIRCAFKthCIAUCAFQv///w+DIgVCgICACFQgBUKAgIAIURsNACADQQFqIQMMAQsgACAFQoCAgAiFhEIAUg0AIANBAXEgA2ohAwsgAkEgaiQAIAMgAUIgiKdBgICAgHhxcr4L6AMCAn8CfiMAQSBrIgIkAAJAAkAgAUL///////////8AgyIEQoCAgICAgMD/Q3wgBEKAgICAgIDAgLx/fFoNACAAQjyIIAFCBIaEIQQCQCAAQv//////////D4MiAEKBgICAgICAgAhUDQAgBEKBgICAgICAgMAAfCEFDAILIARCgICAgICAgIDAAHwhBSAAQoCAgICAgICACIVCAFINASAFQgGDIAV8IQUMAQsCQCAAUCAEQoCAgICAgMD//wBUIARCgICAgICAwP//AFEbDQAgAEI8iCABQgSGhEL/////////A4NCgICAgICAgPz/AIQhBQwBC0KAgICAgICA+P8AIQUgBEL///////+//8MAVg0AQgAhBSAEQjCIpyIDQZH3AEkNACACQRBqIAAgAUL///////8/g0KAgICAgIDAAIQiBCADQf+If2oQDyACIAAgBEGB+AAgA2sQECACKQMAIgRCPIggAkEIaikDAEIEhoQhBQJAIARC//////////8PgyACKQMQIAJBEGpBCGopAwCEQgBSrYQiBEKBgICAgICAgAhUDQAgBUIBfCEFDAELIARCgICAgICAgIAIhUIAUg0AIAVCAYMgBXwhBQsgAkEgaiQAIAUgAUKAgICAgICAgIB/g4S/C/kCAQF/AkAgACABRg0AAkAgASAAayACa0EAIAJBAXRrSw0AIAAgASACEBcPCyABIABzQQNxIQMCQAJAAkAgACABTw0AAkAgA0UNACAAIQMMAwsCQCAAQQNxDQAgACEDDAILIAAhAwNAIAJFDQQgAyABLQAAOgAAIAFBAWohASACQX9qIQIgA0EBaiIDQQNxRQ0CDAAACwALAkAgAw0AAkAgACACakEDcUUNAANAIAJFDQUgACACQX9qIgJqIgMgASACai0AADoAACADQQNxDQALCyACQQNNDQADQCAAIAJBfGoiAmogASACaigCADYCACACQQNLDQALCyACRQ0CA0AgACACQX9qIgJqIAEgAmotAAA6AAAgAg0ADAMACwALIAJBA00NAANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIAJBfGoiAkEDSw0ACwsgAkUNAANAIAMgAS0AADoAACADQQFqIQMgAUEBaiEBIAJBf2oiAg0ACwsgAAvZAQEBfyMAQSBrIgMgADYCHCADIAE2AhggAyACNgIUIANBADYCEAJAA0AgAygCEEECTEEBcUUNASADKAIUIAMoAhBBA3RqQQC3OQMAIANBADYCDAJAA0AgAygCDEECTEEBcUUNASADKAIUIAMoAhBBA3RqIAMoAhQgAygCEEEDdGorAwAgAygCHCADKAIQQRhsaiADKAIMQQN0aisDACADKAIYIAMoAgxBA3RqKwMAoqA5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DigCrAYgDDkDgAEgDigCrAYgDDkDiAEgDigCrAYgDDkDkAEgDigCrAYgDDkDmAEgDigCrAYgDDkDoAEgDigCrAYgDDkDqAEgDigCrAYgDDkDsAEgDigCrAYgDDkDuAEgDigCrAYgDDkDwAEgDigCrAYgDDkDyAEgDigCrAYgDDkD0AEgDigCrAYgDDkD2AEgDigCrAZBADYC4AEgDigCrAYgDDkD6AEgDigCrAYgDDkD8AEgDigCrAYgDDkD+AEgDigCrAYgDDkDgAIgDigCrAYgDDkDiAIgDigCrAYgDDkDkAIgDigCrAYgDDkDmAIgDigCrAYgDDkDoAIgDigCrAYgDDkDqAIgDigCrAYgDDkDsAIgDigCrAYgDDkDuAIgDigCrAYgDDkDwAIgDigCrAYgDDkDyAIgDigCrAYgDDkD0AIgDigCrAYgDDkD2AIgDigCrAYgDDkD4AIgDigCrAYgDDkD6AIgDigCrAYgDDkD8AIgDigCrAYgDDkD+AIgDigCrAYgDDkDgAMgDigCrAYgDDkDiAMgDigCrAYgDDkDkAMgDigCrAYgDDkDmAMgDigCrAYgDDkDoAMgDigCrAYgDDkDqAMgDigCrAYgDDkDsAMgDigCrAYgDDkDuAMgDigCrAYgDDkDwAMgDigCrAYgDDkDyAMgDigCrAYgDDkD0AMgDigCrAYgDDkD2AMgDigCrAYgDDkD4AMgDigCrAYgDDkD6AMgDigCrAYgDDkD8AMgDigCrAYgDDkD+AMgDigCrAYgDDkDgAQgDigCrAYgDDkDiAQgDigCrAYgDDkDkAQgDigCrAYgDDkDmAQgDigCrAYgDDkDoAQgDigCrAYgDDkDqAQgDigCrAYgDDkDsAQgDigCrAYgDDkDuAQgDigCrAYgDDkDwAQgDigCrAYgDDkDyAQgDigCrAYgDDkD0AQgDigCrAYgDDkD2AQgDigCrAYgDDkD4AQgDigCrAYgDDkD6AQgDigCrAYgDDkD8AQgDigCrAYgDDkD+AQgDigCrAYgDDkDgAUgDigCrAYgDDkDiAUgDigCrAYgDDkDkAUgDigCrAYgDDkDmAUgDigCjAcgDigCrAZB+AZqIA4oAqwGQYAHaiAOKAKsBkGIB2ogDigCrAZBkAdqIA4oAqwGQZgHaiAOKAKsBkGgB2ogDigCrAZBqAdqIA4oAqwGQbAH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4ANqIA4oAqwGQegDaiAOKAKsBkHwA2ogDigCrAZB+ANqIA4oAqwGQYAEaiAOKAKsBkGIBGogDkHgA2ogDkHYA2ogDkHQA2ogDkHIA2ogDkHAA2ogDkG4A2ogDkGwA2ogDkGgA2ogDkGYA2ogDkGQA2ogDkGIA2ogDkGAA2ogDkH4AmogDkHwAmogDkHoAmogDkHgAmogDkHYAmogDkHQAmogDkHIAmogDkHAAmogDkG4AmogDkGwAmogDkGoAmogDkGgAmogDkGYAmogDkGQAmogDigCrAZBoARqIA4oAqwGQagEaiAOKAKsBkGwBGogDigCrAZBuARqIA4oAqwGQcAEaiAOKAKsBkHIBGogDigCrAZB0ARqIA4oAqwGQdgEaiAOKAKsBkHgBGogDigCrAZB6ARqIA5BkARqIgIgDkHIAWogDkHAAWogDkG4AWogDkGwAWogDkGoAWogDkGgAWogDkGYAWogDkGQAWogDkGIAWogDkGAAWogDkH4AGogDkHwAGogDigCrAZB+ARqIA4oAqwGQYAFahBIIA4oAqwGKwP4AiAOKAKsBisDgAMgDigCrAYrA4gDIA4oAqwGKwOQAyAOKAKsBisDmAMgDigCrAYrA6ADIA4oAqwGKwOoAyAOKAKsBisDsAMgDigCrAYrA7gDIA4oAqwGKwPAAyAOKAKsBisDyAMgDigCrAYrA9ADIA4oAqwGKwPYAyAOKAKsBisD4AMgDigCrAYrA+gDIA4oAqwGKwPwAyAOKAKsBisD+AMgDigCrAYrA4AEIA4oAqwGKwOIBCAOKAKsBisDgAEgDigCrAYrA6AEIA4oAqwGKwOoBCAOKAKsBisDsAQgDigCrAYrA7gEIA4oAqwGKwPABCAOKAKsBisDyAQgDigCrAYrA9AEIA4oAqwGKwPYBCAOKAKsBisD4AQgDigCrAYrA+gEIA4oAqwGKwP4BCAOKAKsBisDgAUgDisDoAQgDigCrAYtABFBGHRBGHUgDigCrAZBgAZqIA4oAqwGQfAFaiAOKAKsBkH4BWogDigCrAZBiAZqIA4oAqwGQZAGaiAOKAKsBi0AEEEYdEEYdRBJIA4gDDkDsAQgDiAMOQOoBCAOIAw5A5gEIA4oAqwGKwOQByAOKwO4BSAOKwPQBCAOKAKsBisDiAYgDisD4AMgDisD2AMgDisD0AMgDisDyAMg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AyAKKAK0AyAKKwO4BCAKKALQBEHABWogCigC0ARByAVqEFMCQCAKLQDnBEEYdEEYdUH2AEdBAXFFDQAgCi0A5wRBGHRBGHVB4wBHQQFxRQ0AAkAgCi0A5gRBGHRBGHVB5QBGQQFxRQ0AQa8KQQAQGxogCkH0AGogCkGwBGo2AgAgCkHwAGogCkHUA2o2AgAgCiAKQdwDajYCbCAKIApB5ANqNgJoIAogCkHsA2o2AmQgCiAKQfQDajYCYEHaCiAKQeAAahBUQcA/EFUaIAooAvQDIAooAuwDIAooAuQDIAooAtwDIAooAtQDIAorA7AEIApBkARqIApBgARqEFNB7QpBABAbGiAKQZQBaiAKQagEajYCACAKQZABaiAKQdADajYCACAKIApB2ANqNgKMASAKIApB4ANqNgKIASAKIApB6ANqNgKEASAKIApB8ANqNgKAAUHaCiAKQYABahBUQcA/EFUaIAooAvADIAooAugDIAooAuADIAooAtgDIAooAtADIAorA6gEIApBiARqIApB+ANqEFMgCigC3AQgCisDkAQgCigC0AQrA8AFoUQAAAAAAICWQKIgCisDgAQgCigC0AQrA8gFoUQAAAAAAICWQKKgOQMAIAooAtgEIAorA4gEIAooAtAEKwPABaFEAAAAAACAlkCiIAorA/gDIAooAtAEKwPIBaFEAAAAAACAlkCioDkDAEGXC0EAEBsaIAogCigC1AQ2AqABQbQLIApBoAFqEFQLAkAgCi0A5gRBGHRBGHVB5ABGQQFxRQ0AQbgLQQAQGxogCiAKQaAEajYCNCAKIApB9ANqNgIwQdMLIApBMGoQVEHaC0EAEBsaIAogCkGYBGo2AkQgCiAKQfADajYCQEHTCyAKQcAAahBUIAooAvQDIAorA6AEIApBwANqIgkgCkG8A2oiCCAKQbgDaiIHIApBtANqIgYgCkG4BGoiBRBSIAooAvQDIAooAsADIAooArwDIAooArgDIAooArQDIAorA7gEIApBkARqIApBgARqEFMgCigC8AMgCisDmAQgCSAIIAcgBiAFEFIgCigC8AMgCigCwAMgCigCvAMgCigCuAMgCigCtAMgCisDuAQgCkGIBGogCkH4A2oQUyAKKALcBCAKKwOQBCAKKALQBCsDwAWhRAAAAAAAgJZAoiAKKwOABCAKKALQBCsDyAWh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CxUBAX8jAEEQayIBIAA2AgwgASgCDAs/AQF/IwBBEGsiASQAIAEgADYCDCABKAIMIgAQiQEaIAFBADYCCCAAQQhqIAFBCGogARCKARogAUEQaiQAIAALJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDCIAEHAaIAFBEGokACAACyYBAX8jAEEQayIBJAAgASAANgIMIAEoAgwiABBxIAFBEGokACAAC7cBAQF/IwBBIGsiASQAIAEgADYCHAJAIAEoAhwiABByQQFxDQAgASAAEHM2AhggASAAKAIENgIUIAEgABB0NgIQIAEoAhQgASgCECgCABB1IAAQdkEANgIAAkADQCABKAIUIAEoAhBHQQFxRQ0BIAEgASgCFBB3NgIMIAEgASgCFCgCBDYCFCABKAIYIAEoAgxBCGoQeBB5IAEoAhggASgCDEEBEHoMAAALAAsgABB7CyABQSBqJAALLwEBfyMAQRBrIgEkACABIAA2AgwgASgCDBB8KAIAIQAgAUEQaiQAIABBAEZBAXELKQEBfyMAQRBrIgEkACABIAA2AgwgASgCDEEIahB9IQAgAUEQaiQAIAALKAEBfyMAQRBrIgEkACABIAA2AgwgASgCDBB+EH8hACABQRBqJAAgAAs9AQF/IwBBEGsiAiAANgIMIAIgATYCCCACKAIMKAIAIAIoAggoAgQ2AgQgAigCCCgCBCACKAIMKAIANgIACyoBAX8jAEEQayIBJAAgASAANgIMIAEoAgxBCGoQgAEhACABQRBqJAAgAAsmAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEH4hACABQRBqJAAgAAsVAQF/IwBBEGsiASAANgIMIAEoAgwLLwEBfyMAQSBrIgIkACACIAA2AhwgAiABNgIYIAIoAhwgAigCGBCBASACQSBqJAALOwEBfyMAQRBrIgMkACADIAA2AgwgAyABNgIIIAMgAjYCBCADKAIMIAMoAgggAygCBBCCASADQRBqJAALDAAjAEEQayAANgIMCyoBAX8jAEEQayIBJAAgASAANgIMIAEoAgxBCGoQhwEhACABQRBqJAAgAAsnAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEIYBIQAgAUEQaiQAIAALJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDBCDASEAIAFBEGokACAACxUBAX8jAEEQayIBIAA2AgwgASgCDAsnAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEIUBIQAgAUEQaiQAIAALFwEBfyMAQRBrIgIgADYCBCACIAE2AgALOgEBfyMAQRBrIgMkACADIAA2AgwgAyABNgIIIAMgAjYCBCADKAIIIAMoAgRBDGxBBBA9IANBEGokAAsnAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEIQBIQAgAUEQaiQAIAALFQEBfyMAQRBrIgEgADYCDCABKAIMCxUBAX8jAEEQayIBIAA2AgwgASgCDAsVAQF/IwBBEGsiASAANgIMIAEoAgwLJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDBCIASEAIAFBEGokACAACxUBAX8jAEEQayIBIAA2AgwgASgCDAs6AQF/IwBBEGsiASQAIAEgADYCDCABKAIMIQAgACAAEH4QfzYCACAAIAAQfhB/NgIEIAFBEGokACAAC0sBAX8jAEEQayIDJAAgAyAANgIMIAMgATYCCCADIAI2AgQgAygCDCICIAMoAggQiwEQjAEaIAMoAgQQMyACEI0BGiADQRBqJAAgAgsVAQF/IwBBEGsiASAANgIMIAEoAgwLOQEBfyMAQRBrIgIkACACIAA2AgwgAiABNgIIIAIoAgwiASACKAIIEIsBKAIANgIAIAJBEGokACABCygBAX8jAEEQayIBJAAgASAANgIEIAEoAgQiABCOARogAUEQaiQAIAALFQEBfyMAQRBrIgEgADYCDCABKAIMCwkAQdDHABCQAQspAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEHwoAgAhACABQRBqJAAgAAs9AQF/IwBBEGsiASQAIAEgADYCDAJAIAEoAgxBAEdBAXFFDQAgASgCDEEEEQEACyABQQA2AgwgAUEQaiQAC0kBAX8jAEEQayIBJAAgASAANgIMAkAgASgCDEEAR0EBcUUNAAJAIAEoAgwiAEEARkEBcQ0AIAAQQQsLIAFBADYCDCABQRBqJAALHwEBfyMAQRBrIgEgADkDCCABKwMIRBHn+qFG35E/ogsfAQF/IwBBEGsiASAAOQMIIAErAwhEEef6oUbfkT+jCwIAC5IHAQF/IwBB0ABrIgYkACAGIAA2AkggBiABOQNAIAYgAjoAPyAGIAM2AjggBiAEOgA3IAYgBToANiAGIAYoAkg2AjACQAJAIAYoAjAtADBBAXENACAGQX82AkwMAQsgBiAGKwNAIAYoAjArA0ChRAAAAAAAQI9Ao0QAAAAAAABOQKM5AygCQAJAIAYtADdBAXENACAGKAIwQfAAaiAGKwMoEFgMAQsgBigCMEHwAGogBisDKEHgxwBBgMgAEEsLAkAgBigCMCgCfEEASkEBcUUNACAGKAIwQQA2AmAgBigCMCgCfCEFIAYoAjAoAnAhBCAGIAYrA0A5AwggBiAENgIEIAYgBTYCAEH9DCAGEBsaAkAgBigCOEEAR0EBcUUNACAGKAI4IgVCADcDACAFQRBqQgA3AwAgBUEIakIANwMACyAGIAYoAjAoAnw2AkwMAQsCQCAGLQA/QQFxRQ0AAkACQCAGLQA2QQFxRQ0AEF0MAQsgBiAGKwNARAAAAABwmZRBo0QAAADAxZ5CQaBBALciAaA5AyAgBiAGKwMgRAAAAIAstEJBoUQAAAAAoNXhQKM5AxggBisDGCAGKwMgIAEgARBbCyAGQQA2AhQCQANAIAYoAhRBA0hBAXFFDQFBoMgAIAYoAhRBA3RqIgUgBSsDAEQAAAAAAECPQKI5AwAgBiAGKAIUQQFqNgIUDAAACwALAkAgBigCOEEAR0EBcUUNACAGKAI4IgVBEGpBACkDsEg3AwAgBUEIakEAKQOoSDcDACAFQQApA6BINwMACwJAIAYtADdBAXENACAGQQA2AkwMAgsLIAZBADYCEAJAA0AgBigCEEEDSEEBcUUNAUHgxwAgBigCEEEDdGoiBSAFKwMARAAAAAAAQI9AojkDACAGIAYoAhBBAWo2AhAMAAALAAsCQCAGLQA3QQFxRQ0AIAYoAjBBACsD4Ec5AwAgBigCMEEAKwPoRzkDCCAGKAIwQQArA/BHOQMQIAYoAjBBACsDgEhEAAAAAABAj0CiOQMYIAYoAjBBACsDiEhEAAAAAABAj0CiOQMgIAYoAjBBACsDkEhEAAAAAABAj0CiOQMoCwJAIAYtAD9BAXENACAGKAI4QQBHQQFxRQ0AIAYoAjgiBUEQakEAKQPwRzcDACAFQQhqQQApA+hHNwMAIAVBACkD4Ec3AwALIAZBADYCTAsgBigCTCEFIAZB0ABqJAAgBQvRBAEBfyMAQcAAayIHJAAgByAANgI8IAcgATYCOCAHIAI6ADcgByADOQMoIAcgBDkDICAHIAU5AxggByAGNgIUAkAgBy0AN0EBcQ0AIAdBAToANwsCQAJAIAcoAhRBAEdBAXFFDQAgByAHKAIUNgIQDAELIAdByAgQPEEAQcgIEBg2AhAgByAHKAIQNgIMIAdBDGoQmAFB0McAEJABIQYgBygCECAGQQFrNgJsQQBBAUEBcToA2EkLIAcoAhAgBy0AN0EBcToAMCAHQe0AOgALIAdB+gA6AAogB0HpADoACSAHQQI2AgQgBygCPCAHKAI4IActAAtBGHRBGHUgBy0ACkEYdEEYdSAHLQAJQRh0QRh1IAcoAgQgB0EoaiAHQSBqIAdBGGogBygCEEHwAGoQUCAHKAIQIAcoAhArA7AGIAcoAhArA7gGoEQAAADAxZ5CQaFEAAAAAHCZlEGiOQNAIAcoAhBEGC1EVPshGUAgBygCECsDiAejRAAAAAAAAE5AokQAAAAAAECPQKI5AzggBygCECAHKAIQKwM4RAAAAAAAQI9AozkDsAggBygCECAHKwMoOQNIIAcoAhAgBysDIDkDUCAHKAIQIAcrAxg5A1ggBygCEEEANgJkIAcoAhBEAAAAAAAA+D85AwAgBygCEEQAAAAAAAAEQDkDCCAHKAIQRAAAAAAAAAxAOQMQIAcoAhBEAAAAAAAAEkA5AxggBygCEEQAAAAAAAAWQDkDICAHKAIQRAAAAAAAABpAOQMoIAcoAhAhBiAHQcAAaiQAIAYLjgEBAn8jAEEgayIBJAAgAUHQxwA2AhwgASAANgIYIAEgASgCHCICEHM2AhQgAUEIaiIAIAIgASgCFBCZASABKAIUIAAQmgFBCGoQeCABKAIYEJsBEJwBIAIgABCdARCeASAAEJ0BEJ4BEJ8BIAIQdiICIAIoAgBBAWo2AgAgABCgASAAEKEBGiABQSBqJAALWAEBfyMAQSBrIgMkACADIAA2AhwgAyABNgIYIAMgAjYCFCADIAMoAhQQogE2AhAgAygCEEEANgIAIAAgAygCECADQQhqIAMoAhQQowEQpAEaIANBIGokAAsqAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEKUBKAIAIQAgAUEQaiQAIAALFQEBfyMAQRBrIgEgADYCDCABKAIMCz4BAX8jAEEgayIDJAAgAyAANgIcIAMgATYCGCADIAI2AhQgAygCHCADKAIYIAMoAhQQpgEQpwEgA0EgaiQACyoBAX8jAEEQayIBJAAgASAANgIMIAEoAgwQpQEoAgAhACABQRBqJAAgAAsmAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEH4hACABQRBqJAAgAAtlAQF/IwBBEGsiAyQAIAMgADYCDCADIAE2AgggAyACNgIEIAMoAgwiAhB0IQEgAygCBCABNgIEIAMoAgggAigCADYCACADKAIIKAIAIAMoAgg2AgQgAiADKAIENgIAIANBEGokAAs3AQF/IwBBEGsiASQAIAEgADYCDCABIAEoAgwiABCoASgCADYCCCAAEKgBQQA2AgAgAUEQaiQACycBAX8jAEEQayIBJAAgASAANgIMIAEoAgwiABCpASABQRBqJAAgAAszAQF/IwBBEGsiASQAIAEgADYCDCABQQE2AgggASgCDCABKAIIELABIQAgAUEQaiQAIAALOQEBfyMAQRBrIgIgADYCDCACIAE2AgggAkEBNgIEIAIoAgwiASACKAIINgIAIAEgAigCBDYCBCABC0MBAX8jAEEQayIDJAAgAyAANgIMIAMgATYCCCADIAI2AgQgAygCDCICIANBCGogAygCBBCxARCyARogA0EQaiQAIAILJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDBCuASEAIAFBEGokACAACxUBAX8jAEEQayIBIAA2AgwgASgCDAs+AQF/IwBBIGsiAyQAIAMgADYCFCADIAE2AhAgAyACNgIMIAMoAhQgAygCECADKAIMEKYBEK8BIANBIGokAAsnAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEKwBIQAgAUEQaiQAIAALYwECfyMAQRBrIgEkACABIAA2AgwgAUEANgIIIAEgASgCDCIAEKgBKAIANgIEIAEoAgghAiAAEKgBIAI2AgACQCABKAIEQQBHQQFxRQ0AIAAQqgEgASgCBBCrAQsgAUEQaiQACyoBAX8jAEEQayIBJAAgASAANgIMIAEoAgxBBGoQrQEhACABQRBqJAAgAAs4AQF/IwBBEGsiAiQAIAIgADYCDCACIAE2AgggAigCDCIBKAIAIAIoAgggASgCBBB6IAJBEGokAAsVAQF/IwBBEGsiASAANgIMIAEoAgwLFQEBfyMAQRBrIgEgADYCDCABKAIMCxUBAX8jAEEQayIBIAA2AgwgASgCDAs8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JAAgAAsxAQF/IwBBEGsiASQAIAEgADYCBCABQQhqIAEoAgQQdBDLASgCACEAIAFBEGokACAACysBAX8jAEEQayICIAA2AgwgAiABNgIIIAIoAgwoAgAgAigCCCgCAEZBAXELKAEBfyMAQRBrIgIgADYCDCACIAE2AgggAigCDCIBIAIoAgg2AgAgAQsqAQF/IwBBEGsiASQAIAEgADYCDCABKAIMQQhqENoBIQAgAUEQaiQAIAALHAEBfyMAQRBrIgIgADYCDCACIAE2AgggAigCDAtOAQF/IwBBEGsiAiQAIAIgADYCDCACIAE2AgggAigCDCIBEIkBGiACQQA2AgQgAUEIaiACQQRqIAIgAigCCBDWARDXARogAkEQaiQAIAELKwEBfyMAQRBrIgIgADYCDCACIAE2AgggAigCDCgCACACKAIIKAIARkEBcQsvAQF/IwBBEGsiAiQAIAIgADYCDCACIAE2AgggAigCDCACKAIIENUBIAJBEGokAAsiAQF/IwBBEGsiASAANgIMIAEoAgwiACAAKAIAKAIANgIAC1MBAX8jAEEwayICJAAgAiAANgIoIAIgATYCICACQRhqIAJBKGooAgA2AgAgAkEQaiACQSBqKAIANgIAIAIoAhggAigCEBDUASEBIAJBMGokACABC1gBAX8jAEEQayIDIAA2AgwgAyABNgIIIAMgAjYCBCADKAIMKAIAIAMoAgg2AgQgAygCCCADKAIMKAIANgIAIAMoAgwgAygCBDYCACADKAIEIAMoAgw2AgQLZAEBfyMAQSBrIgIkACACIAA2AhggAiABNgIQIAJBADYCBAJAA0AgAkEYaiACQRBqEMMBQQFxRQ0BIAIgAigCBEEBajYCBCACQRhqEMYBDAAACwALIAIoAgQhASACQSBqJAAgAQuSAQEBfyMAQRBrIgIkACACIAA2AgQgAiABNgIAAkACQCACKAIAQQBOQQFxRQ0AAkADQCACKAIAQQBKQQFxRQ0BIAIoAgQQxgEgAiACKAIAQX9qNgIADAAACwALDAELAkADQCACKAIAQQBIQQFxRQ0BIAIoAgQQ0QEgAiACKAIAQQFqNgIADAAACwALCyACQRBqJAALHAEBfyMAQRBrIgIgADYCDCACIAE2AgggAigCDAtMAQF/IwBBEGsiAyQAIAMgADYCDCADIAE2AgggAyAC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ADYC6AMgAEGBETYC5AMgAEHwETYC4AMgACABIABB4CRqaiAAQd4PIABB4ANqEOsBIAAoAtwkajYC3CQgAEHwADYC2CQgACgC3CQhASAAKALYJCECIABBkARqIAAoAoylBCgCcDYCACAAQQQ2AowEIAAgAkEAajYCiAQgAEHFEjYChAQgAEG+EjYCgAQgACABIABB4CRqaiAAQfwRIABBgARqEOsBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABBsARqIAAoAoylBCgCdDYCACAAQQQ2AqwEIAAgAkEEajYCqAQgAEGBETYCpAQgAEGPEzYCoAQgACABIABB4CRqaiAAQc4SIABBoARqEOsBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB0ARqIAAoAoylBCgCeDYCACAAQQQ2AswEIAAgAkEIajYCyAQgAEGBETYCxAQgAEGXEzYCwAQgACABIABB4CRqaiAAQc4SIABBwARqEOsBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB8ARqIAAoAoylBCgCfDYCACAAQQQ2AuwEIAAgAkEMajYC6AQgAEGBETYC5AQgAEGlEzYC4AQgACABIABB4CRqaiAAQc4SIABB4ARqEOsBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABBkAVqIAAoAoylBC0AgAFBGHRBGHU2AgAgAEEBNgKMBSAAIAJBEGo2AogFIABB+hM2AoQFIABB7BM2AoAFIAAgASAAQeAkamogAEGrEyAAQYAFahDrASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQbAFaiAAKAKMpQQtAIEBQRh0QRh1NgIAIABBATYCrAUgACACQRFqNgKoBSAAQfoTNgKkBSAAQf8TNgKgBSAAIAEgAEHgJGpqIABBqxMgAEGgBWoQ6wEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHQBWogACgCjKUELQCCAUEYdEEYdTYCACAAQQE2AswFIAAgAkESajYCyAUgAEH6EzYCxAUgAEGEFDYCwAUgACABIABB4CRqaiAAQasTIABBwAVqEOsBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB8AVqIAAoAoylBCgChAE2AgAgAEEENgLsBSAAIAJBFGo2AugF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IAEgBUGRM2otAAAiAksNAAsLIAEgBUGRM2otAABNDQADQAJAAkAgACgCBCIFIAAoAmhPDQAgACAFQQFqNgIEIAUtAAAhBQwBCyAAEJACIQULIAEgBUGRM2otAABLDQALQQBBxAA2ArRSIAZBACADQgGDUBshBiADIQkLAkAgACgCaEUNACAAIAAoAgRBf2o2AgQLAkAgCSADVA0AAkAgA6dBAXENACAGDQBBAEHEADYCtFIgA0J/fCEDDAMLIAkgA1gNAEEAQcQANgK0UgwCCyAJIAasIgOFIAN9IQMMAQtCACEDIABCABCPAgsgBEEQaiQAIAMLEAAgAEEgRiAAQXdqQQVJcgs1ACAAIAE3AwAgACAEQjCIp0GAgAJxIAJCMIinQf//AXFyrUIwhiACQv///////z+DhDcDCAviAgEBfyMAQdAAayIEJAACQAJAIANBgIABSA0AIARBIGogASACQgBCgICAgICAgP//ABARIARBIGpBCGopAwAhAiAEKQMgIQECQCADQf//AU4NACADQYGAf2ohAwwCCyAEQRBqIAEgAkIAQoCAgICAgID//wAQESADQf3/AiADQf3/AkgbQYKAfmohAyAEQRBqQQhqKQMAIQIgBCkDECEBDAELIANBgYB/Sg0AIARBwABqIAEgAkIAQoCAgICAgMAAEBEgBEHAAGpBCGopAwAhAiAEKQNAIQECQCADQYOAfkwNACADQf7/AGohAwwBCyAEQTBqIAEgAkIAQoCAgICAgMAAEBEgA0GGgH0gA0GGgH1KG0H8/wFqIQMgBEEwakEIaikDACECIAQpAzAhAQsgBCABIAJCACADQf//AGqtQjCGEBEgACAEQQhqKQMANwMIIAAgBCkDADcDACAEQdAAaiQACxwAIAAgAkL///////////8AgzcDCCAAIAE3AwAL4AgCBn8CfiMAQTBrIgQkAEIAIQoCQAJAIAJBAksNACABQQRqIQUgAkECdCICQag1aigCACEGIAJBnDVqKAIAIQcDQAJAAkAgASgCBCICIAEoAmhPDQAgBSACQQFqNgIAIAItAAAhAgwBCyABEJACIQILIAIQkgINAAtBASEIAkACQCACQVVqDgMAAQABC0F/QQEgAkEtRhshCAJAIAEoAgQiAiABKAJoTw0AIAUgAkEBajYCACACLQAAIQIMAQsgARCQAiEC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AEIAIQ8gASgCaEUNAiABIAEoAgRBf2o2AgQMAgtCACEQIAFCABCPAkIAIRMMBAtCACEPIAEoAmhFDQAgASABKAIEQX9qNgIECwJAIAoNACAGQfAAaiAEt0QAAAAAAAAAAKIQKSAGQfgAaikDACETIAYpA3AhEAwDCwJAIA4gEyAIG0IChiAPfEJgfCITQQAgA2utVw0AQQBBxAA2ArRSIAZBoAFqIAQQJSAGQZABaiAGKQOgASAGQaABakEIaikDAEJ/Qv///////7///wAQESAGQYABaiAGKQOQASAGQZABakEIaikDAEJ/Qv///////7///wAQESAGQYABakEIaikDACETIAYpA4ABIRAMAwsCQCATIANBnn5qrFMNAAJAIApBf0wNAANAIAZBoANqIBAgEUIAQoCAgICAgMD/v38QKCAQIBFCAEKAgICAgICA/z8QDiEHIAZBkANqIBAgESAQIAYpA6ADIAdBAEgiARsgESAGQaADakEIaikDACABGxAoIBNCf3whEyAGQZADakEIaikDACERIAYpA5ADIRAgCkEBdCAHQX9KciIKQX9KDQALCwJAAkAgEyADrH1CIHwiDqciB0EAIAdBAEobIAIgDiACrVMbIgdB8QBIDQAgBkGAA2ogBBAlIAZBiANqKQMAIQ5CACEPIAYpA4ADIRJCACEUDAELIAZB4AJqRAAAAAAAAPA/QZABIAdrEBUQKSAGQdACaiAEECUgBkHwAmogBikD4AIgBkHgAmpBCGopAwAgBikD0AIiEiAGQdACakEIaikDACIOEJMCIAYpA/gCIRQgBikD8AIhDwsgBkHAAmogCiAKQQFxRSAQIBFCAEIAEA1BAEcgB0EgSHFxIgdqECogBkGwAmogEiAOIAYpA8ACIAZBwAJqQQhqKQMAEBEgBkGQAmogBikDsAIgBkGwAmpBCGopAwAgDyAUECggBkGgAmpCACAQIAcbQgAgESAHGyASIA4QESAGQYACaiAGKQOgAiAGQaACakEIaikDACAGKQOQAiAGQZACakEIaikDABAoIAZB8AFqIAYpA4ACIAZBgAJqQQhqKQMAIA8gFBArAkAgBikD8AEiECAGQfABakEIaikDACIRQgBCABANDQBBAEHEADYCtFILIAZB4AFqIBAgESATpxCUAiAGKQPoASETIAYpA+ABIRAMAwtBAEHE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IjogIiVkIn0sAHZpc2libGUAYm9vbABwZXJpb2QAdW5peF90aW1lc3RhbXAAZXBoZW1lcmlzX3N0YXJ0AGVwaGVtZXJpc19zdG9wAGVwaGVtZXJpc19zdGVwAGVwaGVtZXJpc19sZW5ndGgAaW50ACIlcyI6IHsidHlwZSI6ICIlcyIsICJvZmZzZXQiOiAlbHUsICJzaXplIjogJWx1LCAidmFsdWUiOiAiJXAifSwAZXBoZW1lcmlzX3B0cgBkb3VibGUqAGVwaGVtZXJpc19zdGFydF9pZHgAYXJyYXlfaW5kZXgAIiVzIjogeyJ0eXBlIjogIiVzIiwgIm9mZnNldCI6ICVsdSwgInNpemUiOiAlbHUsICJ2YWx1ZSI6ICIlbGkifSwAc2F0bnVtAGxvbmcgaW50ACIlcyI6IHsidHlwZSI6ICIlcyIsICJvZmZzZXQiOiAlbHUsICJzaXplIjogJWx1LCAidmFsdWUiOiAiJWkifSwAZXBvY2h5cgBlcG9jaHR5bnVtcmV2AGVycm9yACIlcyI6IHsidHlwZSI6ICIlcyIsICJvZmZzZXQiOiAlbHUsICJzaXplIjogJWx1LCAidmFsdWUiOiAiJWMifSwAb3BlcmF0aW9ubW9kZQBjaGFyAGluaXQAbWV0aG9kAGlzaW1wAGF5Y29mAGNvbjQxAGNjMQBjYzQAY2M1AGQyAGQzAGQ0AGRlbG1vAGV0YQBhcmdwZG90AG9tZ2NvZgBzaW5tYW8AdAB0MmNvZgB0M2NvZgB0NGNvZgB0NWNvZgB4MW10aDIAeDd0aG0xAG1kb3QAbm9kZWRvdAB4bGNvZgB4bWNvZgBub2RlY2YAaXJlegBkMjIwMQBkMjIxMQBkMzIxMABkMzIyMgBkNDQxMABkNDQyMgBkNTIyMABkNTIzMgBkNTQyMQBkNTQzMwBkZWR0AGRlbDEAZGVsMgBkZWwzAGRpZHQAZG1kdABkbm9kdABkb21kdABlMwBlZTIAcGVvAHBnaG8AcGhvAHBpbmNvAHBsbwBzZTIAc2UzAHNnaDIAc2doMwBzZ2g0AHNoMgBzaDMAc2kyAHNpMwBzbDIAc2wzAHNsNABnc3RvAHhmYWN0AHhnaDIAeGdoMwB4Z2g0AHhoMgB4aDMAeGkyAHhpMwB4bDIAeGwzAHhsNAB4bGFtbwB6bW9sAHpt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////////////////////////////////AAECAwQFBgcICf////////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wABAgQHAwYFAAAAGAAAADUAAABxAAAAa////877//+Sv///aW5maW5pdHkAAAAACgAAAGQAAADoAwAAECcAAKCGAQBAQg8AgJaYAADh9QXRdJ4AV529KoBwUg///z4nEQAKABEREQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAARAA8KERERAwoHAAEACQsLAAAJBgsAAAsABhEAAAAREREAAAAAAAAAAAAAAAAAAAAACwAAAAAAAAAAEQAKChEREQAKAAACAAkLAAAACQALAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAADAAAAAAJDAAAAAAADAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAANAAAABA0AAAAACQ4AAAAAAA4AAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAADwAAAAAPAAAAAAkQAAAAAAAQAAAQAAASAAAAEhISAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAASEhIAAAAAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAKAAAAAAoAAAAACQsAAAAAAAsAAAsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAAMAAAAAAkMAAAAAAAMAAAMAAAtKyAgIDBYMHgAKG51bGwpAAAAAAAAAAAAAAAAAAAAADAxMjM0NTY3ODlBQkNERUYtMFgrMFggMFgtMHgrMHggMHgASU5GAGluZgBOQU4AbmFuAC4AAAAAAAAAAAAAAAACAADAAwAAwAQAAMAFAADABgAAwAcAAMAIAADACQAAwAoAAMALAADADAAAwA0AAMAOAADADwAAwBAAAMARAADAEgAAwBMAAMAUAADAFQAAwBYAAMAXAADAGAAAwBkAAMAaAADAGwAAwBwAAMAdAADAHgAAwB8AAMAAAACzAQAAwwIAAMMDAADDBAAAwwUAAMMGAADDBwAAwwgAAMMJAADDCgAAwwsAAMMMAADDDQAA0w4AAMMPAADDAAAMuwEADMMCAAzDAwAMwwQADNNiYXNpY19zdHJpbmcAc3RkOjpleGNlcHRpb24AAAAAABweAAAOAAAADwAAABAAAABsHwAAJB4AAFN0OWV4Y2VwdGlvbgAAAAAAAAAASB4AAAEAAAARAAAAEgAAAMweAABUHgAAHB4AAFN0MTFsb2dpY19lcnJvcgAAAAAAeB4AAAEAAAATAAAAEgAAAMweAACEHgAASB4AAFN0MTJsZW5ndGhfZXJyb3IAU3Q5dHlwZV9pbmZvAAAAbB8AAJUeAADMHgAAQR8AAKQeAADMHgAA7B4AAKweAAAAAAAAEB8AABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAATjEwX19jeHhhYml2MTE3X19jbGFzc190eXBlX2luZm9FAAAAzB4AABwfAAC4HgAATjEwX19jeHhhYml2MTIwX19zaV9jbGFzc190eXBlX2luZm9FAE4xMF9fY3h4YWJpdjExNl9fc2hpbV90eXBlX2luZm9FAAAAAAAAALgeAAAUAAAAHAAAABYAAAAXAAAAGAAAAB0AAAAeAAAAHwAAAOAgAAAAAAAAAADwPwAAAAAAAPg/AAAAAAAAAAAG0M9D6/1MPgAAAAAAAAAAAAAAQAO44j8AQcA/C7QDCQAAAAAAAAAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAsAAADoJAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAsAAADwKAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAACEAAABIKwAAAAQAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAACv////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4CAAAABBgMMAC8gbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
      if (!isDataURI(wasmBinaryFile)) {
        wasmBinaryFile = locateFile(wasmBinaryFile);
      }

      function getBinary() {
        try {
          if (wasmBinary) {
            return new Uint8Array(wasmBinary);
          }

          var binary = tryParseAsDataURI(wasmBinaryFile);
          if (binary) {
            return binary;
          }
          if (readBinary) {
            return readBinary(wasmBinaryFile);
          } else {
            throw "both async and sync fetching of the wasm failed";
          }
        }
        catch (err) {
          abort(err);
        }
      }

      function getBinaryPromise() {
        // If we don't have the binary yet, and have the Fetch api, use that;
        // in some environments, like Electron's render process, Fetch api may be present, but have a different context than expected, let's only use it on the Web
        if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function'
          // Let's not use fetch to get objects over file:// as it's most likely Cordova which doesn't support fetch for file://
          && !isFileURI(wasmBinaryFile)
        ) {
          return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
            if (!response['ok']) {
              throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
            }
            return response['arrayBuffer']();
          }).catch(function () {
            return getBinary();
          });
        }
        // Otherwise, getBinary should be able to get it synchronously
        return Promise.resolve().then(getBinary);
      }



      // Create the wasm instance.
      // Receives the wasm imports, returns the exports.
      function createWasm() {
        // prepare imports
        var info = {
          'env': asmLibraryArg,
          'wasi_snapshot_preview1': asmLibraryArg
        };
        // Load the wasm module and create an instance of using native support in the JS engine.
        // handle a generated wasm instance, receiving its exports and
        // performing other necessary setup
        /** @param {WebAssembly.Module=} module*/
        function receiveInstance(instance, module) {
          var exports = instance.exports;
          Module['asm'] = exports;
          removeRunDependency('wasm-instantiate');
        }
        // we can't run yet (except in a pthread, where we have a custom sync instantiator)
        addRunDependency('wasm-instantiate');


        // Async compilation can be confusing when an error on the page overwrites Module
        // (for example, if the order of elements is wrong, and the one defining Module is
        // later), so we save Module and check it later.
        var trueModule = Module;
        function receiveInstantiatedSource(output) {
          // 'output' is a WebAssemblyInstantiatedSource object which has both the module and instance.
          // receiveInstance() will swap in the exports (to Module.asm) so they can be called
          assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
          trueModule = null;
          // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
          // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
          receiveInstance(output['instance']);
        }


        function instantiateArrayBuffer(receiver) {
          return getBinaryPromise().then(function (binary) {
            return WebAssembly.instantiate(binary, info);
          }).then(receiver, function (reason) {
            err('failed to asynchronously prepare wasm: ' + reason);


            abort(reason);
          });
        }

        // Prefer streaming instantiation if available.
        function instantiateAsync() {
          if (!wasmBinary &&
            typeof WebAssembly.instantiateStreaming === 'function' &&
            !isDataURI(wasmBinaryFile) &&
            // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
            !isFileURI(wasmBinaryFile) &&
            typeof fetch === 'function') {
            fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
              var result = WebAssembly.instantiateStreaming(response, info);
              return result.then(receiveInstantiatedSource, function (reason) {
                // We expect the most common failure cause to be a bad MIME type for the binary,
                // in which case falling back to ArrayBuffer instantiation should work.
                err('wasm streaming compile failed: ' + reason);
                err('falling back to ArrayBuffer instantiation');
                return instantiateArrayBuffer(receiveInstantiatedSource);
              });
            });
          } else {
            return instantiateArrayBuffer(receiveInstantiatedSource);
          }
        }
        // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
        // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
        // to any other async startup actions they are performing.
        if (Module['instantiateWasm']) {
          try {
            var exports = Module['instantiateWasm'](info, receiveInstance);
            return exports;
          } catch (e) {
            err('Module.instantiateWasm callback failed with error: ' + e);
            return false;
          }
        }

        instantiateAsync();
        return {}; // no exports yet; we'll fill them in later
      }

      // Globals used by JS i64 conversions
      var tempDouble;
      var tempI64;




// STATICTOP = STATIC_BASE + 11104;
/* global initializers */  __ATINIT__.push({ func: function () { ___wasm_call_ctors(); } });

      function callRuntimeCallbacks(callbacks) {
        while (callbacks.length > 0) {
          var callback = callbacks.shift();
          if (typeof callback == 'function') {
            callback(Module); // Pass the module as the first argument.
            continue;
          }
          var func = callback.func;
          if (typeof func === 'number') {
            if (callback.arg === undefined) {
              wasmTable.get(func)();
            } else {
              wasmTable.get(func)(callback.arg);
            }
          } else {
            func(callback.arg === undefined ? null : callback.arg);
          }
        }
      }

      function demangle(func) {
        warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
        return func;
      }

      function demangleAll(text) {
        var regex =
          /\b_Z[\w\d_]+/g;
        return text.replace(regex,
          function (x) {
            var y = demangle(x);
            return x === y ? x : (y + ' [' + x + ']');
          });
      }

      function jsStackTrace() {
        var error = new Error();
        if (!error.stack) {
          // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
          // so try that as a special-case.
          try {
            throw new Error();
          } catch (e) {
            error = e;
          }
          if (!error.stack) {
            return '(no stack trace available)';
          }
        }
        return error.stack.toString();
      }

      function stackTrace() {
        var js = jsStackTrace();
        if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
        return demangleAll(js);
      }


      var ExceptionInfoAttrs = { DESTRUCTOR_OFFSET: 0, REFCOUNT_OFFSET: 4, TYPE_OFFSET: 8, CAUGHT_OFFSET: 12, RETHROWN_OFFSET: 13, SIZE: 16 }; function ___cxa_allocate_exception(size) {
        // Thrown object is prepended by exception metadata block
        return _malloc(size + ExceptionInfoAttrs.SIZE) + ExceptionInfoAttrs.SIZE;
      }


      function _atexit(func, arg) {
      } function ___cxa_atexit(a0, a1
      ) {
        return _atexit();
      }


      function ExceptionInfo(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - ExceptionInfoAttrs.SIZE;

        this.set_type = function (type) {
          HEAP32[(((this.ptr) + (ExceptionInfoAttrs.TYPE_OFFSET)) >> 2)] = type;
        };

        this.get_type = function () {
          return HEAP32[(((this.ptr) + (ExceptionInfoAttrs.TYPE_OFFSET)) >> 2)];
        };

        this.set_destructor = function (destructor) {
          HEAP32[(((this.ptr) + (ExceptionInfoAttrs.DESTRUCTOR_OFFSET)) >> 2)] = destructor;
        };

        this.get_destructor = function () {
          return HEAP32[(((this.ptr) + (ExceptionInfoAttrs.DESTRUCTOR_OFFSET)) >> 2)];
        };

        this.set_refcount = function (refcount) {
          HEAP32[(((this.ptr) + (ExceptionInfoAttrs.REFCOUNT_OFFSET)) >> 2)] = refcount;
        };

        this.set_caught = function (caught) {
          caught = caught ? 1 : 0;
          HEAP8[(((this.ptr) + (ExceptionInfoAttrs.CAUGHT_OFFSET)) >> 0)] = caught;
        };

        this.get_caught = function () {
          return HEAP8[(((this.ptr) + (ExceptionInfoAttrs.CAUGHT_OFFSET)) >> 0)] != 0;
        };

        this.set_rethrown = function (rethrown) {
          rethrown = rethrown ? 1 : 0;
          HEAP8[(((this.ptr) + (ExceptionInfoAttrs.RETHROWN_OFFSET)) >> 0)] = rethrown;
        };

        this.get_rethrown = function () {
          return HEAP8[(((this.ptr) + (ExceptionInfoAttrs.RETHROWN_OFFSET)) >> 0)] != 0;
        };

        // Initialize native structure fields. Should be called once after allocated.
        this.init = function (type, destructor) {
          this.set_type(type);
          this.set_destructor(destructor);
          this.set_refcount(0);
          this.set_caught(false);
          this.set_rethrown(false);
        };

        this.add_ref = function () {
          var value = HEAP32[(((this.ptr) + (ExceptionInfoAttrs.REFCOUNT_OFFSET)) >> 2)];
          HEAP32[(((this.ptr) + (ExceptionInfoAttrs.REFCOUNT_OFFSET)) >> 2)] = value + 1;
        };

        // Returns true if last reference released.
        this.release_ref = function () {
          var prev = HEAP32[(((this.ptr) + (ExceptionInfoAttrs.REFCOUNT_OFFSET)) >> 2)];
          HEAP32[(((this.ptr) + (ExceptionInfoAttrs.REFCOUNT_OFFSET)) >> 2)] = prev - 1;
          assert(prev > 0);
          return prev === 1;
        };
      }
      function ___cxa_throw(ptr, type, destructor) {
        var info = new ExceptionInfo(ptr);
        // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
        info.init(type, destructor);
        throw ptr + " - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";
      }

      function _abort() {
        abort();
      }

      function _emscripten_get_sbrk_ptr() {
        return 12112;
      }

      function _emscripten_memcpy_big(dest, src, num) {
        HEAPU8.copyWithin(dest, src, src + num);
      }


      function _emscripten_get_heap_size() {
        return HEAPU8.length;
      }

      function emscripten_realloc_buffer(size) {
        try {
          // round size grow request up to wasm page size (fixed 64KB per spec)
          wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16); // .grow() takes a delta compared to the previous size
          updateGlobalBufferAndViews(wasmMemory.buffer);
          return 1 /*success*/;
        } catch (e) {
          console.error('emscripten_realloc_buffer: Attempted to grow heap from ' + buffer.byteLength + ' bytes to ' + size + ' bytes, but got error: ' + e);
        }
      } function _emscripten_resize_heap(requestedSize) {
        requestedSize = requestedSize >>> 0;
        var oldSize = _emscripten_get_heap_size();
        // With pthreads, races can happen (another thread might increase the size in between), so return a failure, and let the caller retry.
        assert(requestedSize > oldSize);


        // Memory resize rules:
        // 1. When resizing, always produce a resized heap that is at least 16MB (to avoid tiny heap sizes receiving lots of repeated resizes at startup)
        // 2. Always increase heap size to at least the requested size, rounded up to next page multiple.
        // 3a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap geometrically: increase the heap size according to 
        //                                         MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%),
        //                                         At most overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
        // 3b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap linearly: increase the heap size by at least MEMORY_GROWTH_LINEAR_STEP bytes.
        // 4. Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
        // 5. If we were unable to allocate as much memory, it may be due to over-eager decision to excessively reserve due to (3) above.
        //    Hence if an allocation fails, cut down on the amount of excess growth, in an attempt to succeed to perform a smaller allocation.

        // A limit was set for how much we can grow. We should not exceed that
        // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
        var maxHeapSize = 2147483648;
        if (requestedSize > maxHeapSize) {
          err('Cannot enlarge memory, asked to go up to ' + requestedSize + ' bytes, but the limit is ' + maxHeapSize + ' bytes!');
          return false;
        }

        var minHeapSize = 16777216;

        // Loop through potential heap size increases. If we attempt a too eager reservation that fails, cut down on the
        // attempted size and reserve a smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
        for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
          var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
          // but limit overreserving (default to capping at +96MB overgrowth at most)
          overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);


          var newSize = Math.min(maxHeapSize, alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), 65536));

          var replacement = emscripten_realloc_buffer(newSize);
          if (replacement) {

            return true;
          }
        }
        err('Failed to grow the heap from ' + oldSize + ' bytes to ' + newSize + ' bytes, not enough memory!');
        return false;
      }



      var PATH = {
        splitPath: function (filename) {
          var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          return splitPathRe.exec(filename).slice(1);
        }, normalizeArray: function (parts, allowAboveRoot) {
          // if the path tries to go above the root, `up` ends up > 0
          var up = 0;
          for (var i = parts.length - 1; i >= 0; i--) {
            var last = parts[i];
            if (last === '.') {
              parts.splice(i, 1);
            } else if (last === '..') {
              parts.splice(i, 1);
              up++;
            } else if (up) {
              parts.splice(i, 1);
              up--;
            }
          }
          // if the path is allowed to go above the root, restore leading ..s
          if (allowAboveRoot) {
            for (; up; up--) {
              parts.unshift('..');
            }
          }
          return parts;
        }, normalize: function (path) {
          var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
          // Normalize the path
          path = PATH.normalizeArray(path.split('/').filter(function (p) {
            return !!p;
          }), !isAbsolute).join('/');
          if (!path && !isAbsolute) {
            path = '.';
          }
          if (path && trailingSlash) {
            path += '/';
          }
          return (isAbsolute ? '/' : '') + path;
        }, dirname: function (path) {
          var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
          if (!root && !dir) {
            // No dirname whatsoever
            return '.';
          }
          if (dir) {
            // It has a dirname, strip trailing slash
            dir = dir.substr(0, dir.length - 1);
          }
          return root + dir;
        }, basename: function (path) {
          // EMSCRIPTEN return '/'' for '/', not an empty string
          if (path === '/') return '/';
          path = PATH.normalize(path);
          path = path.replace(/\/$/, "");
          var lastSlash = path.lastIndexOf('/');
          if (lastSlash === -1) return path;
          return path.substr(lastSlash + 1);
        }, extname: function (path) {
          return PATH.splitPath(path)[3];
        }, join: function () {
          var paths = Array.prototype.slice.call(arguments, 0);
          return PATH.normalize(paths.join('/'));
        }, join2: function (l, r) {
          return PATH.normalize(l + '/' + r);
        }
      };


      function setErrNo(value) {
        HEAP32[((___errno_location()) >> 2)] = value;
        return value;
      }

      var PATH_FS = {
        resolve: function () {
          var resolvedPath = '',
            resolvedAbsolute = false;
          for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            var path = (i >= 0) ? arguments[i] : FS.cwd();
            // Skip empty and invalid entries
            if (typeof path !== 'string') {
              throw new TypeError('Arguments to path.resolve must be strings');
            } else if (!path) {
              return ''; // an invalid portion invalidates the whole thing
            }
            resolvedPath = path + '/' + resolvedPath;
            resolvedAbsolute = path.charAt(0) === '/';
          }
          // At this point the path should be resolved to a full absolute path, but
          // handle relative paths to be safe (might happen when process.cwd() fails)
          resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function (p) {
            return !!p;
          }), !resolvedAbsolute).join('/');
          return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
        }, relative: function (from, to) {
          from = PATH_FS.resolve(from).substr(1);
          to = PATH_FS.resolve(to).substr(1);
          function trim(arr) {
            var start = 0;
            for (; start < arr.length; start++) {
              if (arr[start] !== '') break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== '') break;
            }
            if (start > end) return [];
            return arr.slice(start, end - start + 1);
          }
          var fromParts = trim(from.split('/'));
          var toParts = trim(to.split('/'));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
              samePartsLength = i;
              break;
            }
          }
          var outputParts = [];
          for (var i = samePartsLength; i < fromParts.length; i++) {
            outputParts.push('..');
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join('/');
        }
      };

      var TTY = {
        ttys: [], init: function () {
          // https://github.com/emscripten-core/emscripten/pull/1555
          // if (ENVIRONMENT_IS_NODE) {
          //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
          //   // device, it always assumes it's a TTY device. because of this, we're forcing
          //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
          //   // with text files until FS.init can be refactored.
          //   process['stdin']['setEncoding']('utf8');
          // }
        }, shutdown: function () {
          // https://github.com/emscripten-core/emscripten/pull/1555
          // if (ENVIRONMENT_IS_NODE) {
          //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
          //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
          //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
          //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
          //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
          //   process['stdin']['pause']();
          // }
        }, register: function (dev, ops) {
          TTY.ttys[dev] = { input: [], output: [], ops: ops };
          FS.registerDevice(dev, TTY.stream_ops);
        }, stream_ops: {
          open: function (stream) {
            var tty = TTY.ttys[stream.node.rdev];
            if (!tty) {
              throw new FS.ErrnoError(43);
            }
            stream.tty = tty;
            stream.seekable = false;
          }, close: function (stream) {
            // flush any pending line data
            stream.tty.ops.flush(stream.tty);
          }, flush: function (stream) {
            stream.tty.ops.flush(stream.tty);
          }, read: function (stream, buffer, offset, length, pos /* ignored */) {
            if (!stream.tty || !stream.tty.ops.get_char) {
              throw new FS.ErrnoError(60);
            }
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = stream.tty.ops.get_char(stream.tty);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset + i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          }, write: function (stream, buffer, offset, length, pos) {
            if (!stream.tty || !stream.tty.ops.put_char) {
              throw new FS.ErrnoError(60);
            }
            try {
              for (var i = 0; i < length; i++) {
                stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
              }
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        }, default_tty_ops: {
          get_char: function (tty) {
            if (!tty.input.length) {
              var result = null;
              if (ENVIRONMENT_IS_NODE) {
                // we will read data by chunks of BUFSIZE
                var BUFSIZE = 256;
                var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
                var bytesRead = 0;

                try {
                  bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
                } catch (e) {
                  // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
                  // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
                  if (e.toString().indexOf('EOF') != -1) bytesRead = 0;
                  else throw e;
                }

                if (bytesRead > 0) {
                  result = buf.slice(0, bytesRead).toString('utf-8');
                } else {
                  result = null;
                }
              } else
                if (typeof window != 'undefined' &&
                  typeof window.prompt == 'function') {
                  // Browser.
                  result = window.prompt('Input: ');  // returns null on cancel
                  if (result !== null) {
                    result += '\n';
                  }
                } else if (typeof readline == 'function') {
                  // Command line.
                  result = readline();
                  if (result !== null) {
                    result += '\n';
                  }
                }
              if (!result) {
                return null;
              }
              tty.input = intArrayFromString(result, true);
            }
            return tty.input.shift();
          }, put_char: function (tty, val) {
            if (val === null || val === 10) {
              out(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            } else {
              if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
            }
          }, flush: function (tty) {
            if (tty.output && tty.output.length > 0) {
              out(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            }
          }
        }, default_tty1_ops: {
          put_char: function (tty, val) {
            if (val === null || val === 10) {
              err(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            } else {
              if (val != 0) tty.output.push(val);
            }
          }, flush: function (tty) {
            if (tty.output && tty.output.length > 0) {
              err(UTF8ArrayToString(tty.output, 0));
              tty.output = [];
            }
          }
        }
      };

      var MEMFS = {
        ops_table: null, mount: function (mount) {
          return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
        }, createNode: function (parent, name, mode, dev) {
          if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
            // no supported
            throw new FS.ErrnoError(63);
          }
          if (!MEMFS.ops_table) {
            MEMFS.ops_table = {
              dir: {
                node: {
                  getattr: MEMFS.node_ops.getattr,
                  setattr: MEMFS.node_ops.setattr,
                  lookup: MEMFS.node_ops.lookup,
                  mknod: MEMFS.node_ops.mknod,
                  rename: MEMFS.node_ops.rename,
                  unlink: MEMFS.node_ops.unlink,
                  rmdir: MEMFS.node_ops.rmdir,
                  readdir: MEMFS.node_ops.readdir,
                  symlink: MEMFS.node_ops.symlink
                },
                stream: {
                  llseek: MEMFS.stream_ops.llseek
                }
              },
              file: {
                node: {
                  getattr: MEMFS.node_ops.getattr,
                  setattr: MEMFS.node_ops.setattr
                },
                stream: {
                  llseek: MEMFS.stream_ops.llseek,
                  read: MEMFS.stream_ops.read,
                  write: MEMFS.stream_ops.write,
                  allocate: MEMFS.stream_ops.allocate,
                  mmap: MEMFS.stream_ops.mmap,
                  msync: MEMFS.stream_ops.msync
                }
              },
              link: {
                node: {
                  getattr: MEMFS.node_ops.getattr,
                  setattr: MEMFS.node_ops.setattr,
                  readlink: MEMFS.node_ops.readlink
                },
                stream: {}
              },
              chrdev: {
                node: {
                  getattr: MEMFS.node_ops.getattr,
                  setattr: MEMFS.node_ops.setattr
                },
                stream: FS.chrdev_stream_ops
              }
            };
          }
          var node = FS.createNode(parent, name, mode, dev);
          if (FS.isDir(node.mode)) {
            node.node_ops = MEMFS.ops_table.dir.node;
            node.stream_ops = MEMFS.ops_table.dir.stream;
            node.contents = {};
          } else if (FS.isFile(node.mode)) {
            node.node_ops = MEMFS.ops_table.file.node;
            node.stream_ops = MEMFS.ops_table.file.stream;
            node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
            // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
            // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
            // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
            node.contents = null;
          } else if (FS.isLink(node.mode)) {
            node.node_ops = MEMFS.ops_table.link.node;
            node.stream_ops = MEMFS.ops_table.link.stream;
          } else if (FS.isChrdev(node.mode)) {
            node.node_ops = MEMFS.ops_table.chrdev.node;
            node.stream_ops = MEMFS.ops_table.chrdev.stream;
          }
          node.timestamp = Date.now();
          // add the new node to the parent
          if (parent) {
            parent.contents[name] = node;
          }
          return node;
        }, getFileDataAsRegularArray: function (node) {
          if (node.contents && node.contents.subarray) {
            var arr = [];
            for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
            return arr; // Returns a copy of the original data.
          }
          return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
        }, getFileDataAsTypedArray: function (node) {
          if (!node.contents) return new Uint8Array(0);
          if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
          return new Uint8Array(node.contents);
        }, expandFileStorage: function (node, newCapacity) {
          var prevCapacity = node.contents ? node.contents.length : 0;
          if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
          // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
          // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
          // avoid overshooting the allocation cap by a very large margin.
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
          if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
          var oldContents = node.contents;
          node.contents = new Uint8Array(newCapacity); // Allocate new storage.
          if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
          return;
        }, resizeFileStorage: function (node, newSize) {
          if (node.usedBytes == newSize) return;
          if (newSize == 0) {
            node.contents = null; // Fully decommit when requesting a resize to zero.
            node.usedBytes = 0;
            return;
          }
          if (!node.contents || node.contents.subarray) { // Resize a typed array if that is being used as the backing store.
            var oldContents = node.contents;
            node.contents = new Uint8Array(newSize); // Allocate new storage.
            if (oldContents) {
              node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
            }
            node.usedBytes = newSize;
            return;
          }
          // Backing with a JS array.
          if (!node.contents) node.contents = [];
          if (node.contents.length > newSize) node.contents.length = newSize;
          else while (node.contents.length < newSize) node.contents.push(0);
          node.usedBytes = newSize;
        }, node_ops: {
          getattr: function (node) {
            var attr = {};
            // device numbers reuse inode numbers.
            attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
            attr.ino = node.id;
            attr.mode = node.mode;
            attr.nlink = 1;
            attr.uid = 0;
            attr.gid = 0;
            attr.rdev = node.rdev;
            if (FS.isDir(node.mode)) {
              attr.size = 4096;
            } else if (FS.isFile(node.mode)) {
              attr.size = node.usedBytes;
            } else if (FS.isLink(node.mode)) {
              attr.size = node.link.length;
            } else {
              attr.size = 0;
            }
            attr.atime = new Date(node.timestamp);
            attr.mtime = new Date(node.timestamp);
            attr.ctime = new Date(node.timestamp);
            // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
            //       but this is not required by the standard.
            attr.blksize = 4096;
            attr.blocks = Math.ceil(attr.size / attr.blksize);
            return attr;
          }, setattr: function (node, attr) {
            if (attr.mode !== undefined) {
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              node.timestamp = attr.timestamp;
            }
            if (attr.size !== undefined) {
              MEMFS.resizeFileStorage(node, attr.size);
            }
          }, lookup: function (parent, name) {
            throw FS.genericErrors[44];
          }, mknod: function (parent, name, mode, dev) {
            return MEMFS.createNode(parent, name, mode, dev);
          }, rename: function (old_node, new_dir, new_name) {
            // if we're overwriting a directory at new_name, make sure it's empty.
            if (FS.isDir(old_node.mode)) {
              var new_node;
              try {
                new_node = FS.lookupNode(new_dir, new_name);
              } catch (e) {
              }
              if (new_node) {
                for (var i in new_node.contents) {
                  throw new FS.ErrnoError(55);
                }
              }
            }
            // do the internal rewiring
            delete old_node.parent.contents[old_node.name];
            old_node.name = new_name;
            new_dir.contents[new_name] = old_node;
            old_node.parent = new_dir;
          }, unlink: function (parent, name) {
            delete parent.contents[name];
          }, rmdir: function (parent, name) {
            var node = FS.lookupNode(parent, name);
            for (var i in node.contents) {
              throw new FS.ErrnoError(55);
            }
            delete parent.contents[name];
          }, readdir: function (node) {
            var entries = ['.', '..'];
            for (var key in node.contents) {
              if (!node.contents.hasOwnProperty(key)) {
                continue;
              }
              entries.push(key);
            }
            return entries;
          }, symlink: function (parent, newname, oldpath) {
            var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
            node.link = oldpath;
            return node;
          }, readlink: function (node) {
            if (!FS.isLink(node.mode)) {
              throw new FS.ErrnoError(28);
            }
            return node.link;
          }
        }, stream_ops: {
          read: function (stream, buffer, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= stream.node.usedBytes) return 0;
            var size = Math.min(stream.node.usedBytes - position, length);
            assert(size >= 0);
            if (size > 8 && contents.subarray) { // non-trivial, and typed array
              buffer.set(contents.subarray(position, position + size), offset);
            } else {
              for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
            }
            return size;
          }, write: function (stream, buffer, offset, length, position, canOwn) {
            // The data buffer should be a typed array view
            assert(!(buffer instanceof ArrayBuffer));
            // If the buffer is located in main memory (HEAP), and if
            // memory can grow, we can't hold on to references of the
            // memory buffer, as they may get invalidated. That means we
            // need to do copy its contents.
            if (buffer.buffer === HEAP8.buffer) {
              canOwn = false;
            }

            if (!length) return 0;
            var node = stream.node;
            node.timestamp = Date.now();

            if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
              if (canOwn) {
                assert(position === 0, 'canOwn must imply no weird position inside the file');
                node.contents = buffer.subarray(offset, offset + length);
                node.usedBytes = length;
                return length;
              } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
                node.contents = buffer.slice(offset, offset + length);
                node.usedBytes = length;
                return length;
              } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
                node.contents.set(buffer.subarray(offset, offset + length), position);
                return length;
              }
            }

            // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
            MEMFS.expandFileStorage(node, position + length);
            if (node.contents.subarray && buffer.subarray) {
              // Use typed array write which is available.
              node.contents.set(buffer.subarray(offset, offset + length), position);
            } else {
              for (var i = 0; i < length; i++) {
                node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
              }
            }
            node.usedBytes = Math.max(node.usedBytes, position + length);
            return length;
          }, llseek: function (stream, offset, whence) {
            var position = offset;
            if (whence === 1) {
              position += stream.position;
            } else if (whence === 2) {
              if (FS.isFile(stream.node.mode)) {
                position += stream.node.usedBytes;
              }
            }
            if (position < 0) {
              throw new FS.ErrnoError(28);
            }
            return position;
          }, allocate: function (stream, offset, length) {
            MEMFS.expandFileStorage(stream.node, offset + length);
            stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
          }, mmap: function (stream, address, length, position, prot, flags) {
            // We don't currently support location hints for the address of the mapping
            assert(address === 0);

            if (!FS.isFile(stream.node.mode)) {
              throw new FS.ErrnoError(43);
            }
            var ptr;
            var allocated;
            var contents = stream.node.contents;
            // Only make a new copy when MAP_PRIVATE is specified.
            if (!(flags & 2) && contents.buffer === buffer) {
              // We can't emulate MAP_SHARED when the file is not backed by the buffer
              // we're mapping to (e.g. the HEAP buffer).
              allocated = false;
              ptr = contents.byteOffset;
            } else {
              // Try to avoid unnecessary slices.
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              allocated = true;
              ptr = FS.mmapAlloc(length);
              if (!ptr) {
                throw new FS.ErrnoError(48);
              }
              HEAP8.set(contents, ptr);
            }
            return { ptr: ptr, allocated: allocated };
          }, msync: function (stream, buffer, offset, length, mmapFlags) {
            if (!FS.isFile(stream.node.mode)) {
              throw new FS.ErrnoError(43);
            }
            if (mmapFlags & 2) {
              // MAP_PRIVATE calls need not to be synced back to underlying fs
              return 0;
            }

            var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
            // should we check if bytesWritten and length are the same?
            return 0;
          }
        }
      };

      var ERRNO_MESSAGES = { 0: "Success", 1: "Arg list too long", 2: "Permission denied", 3: "Address already in use", 4: "Address not available", 5: "Address family not supported by protocol family", 6: "No more processes", 7: "Socket already connected", 8: "Bad file number", 9: "Trying to read unreadable message", 10: "Mount device busy", 11: "Operation canceled", 12: "No children", 13: "Connection aborted", 14: "Connection refused", 15: "Connection reset by peer", 16: "File locking deadlock error", 17: "Destination address required", 18: "Math arg out of domain of func", 19: "Quota exceeded", 20: "File exists", 21: "Bad address", 22: "File too large", 23: "Host is unreachable", 24: "Identifier removed", 25: "Illegal byte sequence", 26: "Connection already in progress", 27: "Interrupted system call", 28: "Invalid argument", 29: "I/O error", 30: "Socket is already connected", 31: "Is a directory", 32: "Too many symbolic links", 33: "Too many open files", 34: "Too many links", 35: "Message too long", 36: "Multihop attempted", 37: "File or path name too long", 38: "Network interface is not configured", 39: "Connection reset by network", 40: "Network is unreachable", 41: "Too many open files in system", 42: "No buffer space available", 43: "No such device", 44: "No such file or directory", 45: "Exec format error", 46: "No record locks available", 47: "The link has been severed", 48: "Not enough core", 49: "No message of desired type", 50: "Protocol not available", 51: "No space left on device", 52: "Function not implemented", 53: "Socket is not connected", 54: "Not a directory", 55: "Directory not empty", 56: "State not recoverable", 57: "Socket operation on non-socket", 59: "Not a typewriter", 60: "No such device or address", 61: "Value too large for defined data type", 62: "Previous owner died", 63: "Not super-user", 64: "Broken pipe", 65: "Protocol error", 66: "Unknown protocol", 67: "Protocol wrong type for socket", 68: "Math result not representable", 69: "Read only file system", 70: "Illegal seek", 71: "No such process", 72: "Stale file handle", 73: "Connection timed out", 74: "Text file busy", 75: "Cross-device link", 100: "Device not a stream", 101: "Bad font file fmt", 102: "Invalid slot", 103: "Invalid request code", 104: "No anode", 105: "Block device required", 106: "Channel number out of range", 107: "Level 3 halted", 108: "Level 3 reset", 109: "Link number out of range", 110: "Protocol driver not attached", 111: "No CSI structure available", 112: "Level 2 halted", 113: "Invalid exchange", 114: "Invalid request descriptor", 115: "Exchange full", 116: "No data (for no delay io)", 117: "Timer expired", 118: "Out of streams resources", 119: "Machine is not on the network", 120: "Package not installed", 121: "The object is remote", 122: "Advertise error", 123: "Srmount error", 124: "Communication error on send", 125: "Cross mount point (not really error)", 126: "Given log. name not unique", 127: "f.d. invalid for this operation", 128: "Remote address changed", 129: "Can   access a needed shared lib", 130: "Accessing a corrupted shared lib", 131: ".lib section in a.out corrupted", 132: "Attempting to link in too many libs", 133: "Attempting to exec a shared library", 135: "Streams pipe error", 136: "Too many users", 137: "Socket type not supported", 138: "Not supported", 139: "Protocol family not supported", 140: "Can't send after socket shutdown", 141: "Too many references", 142: "Host is down", 148: "No medium (in tape drive)", 156: "Level 2 not synchronized" };

      var ERRNO_CODES = { EPERM: 63, ENOENT: 44, ESRCH: 71, EINTR: 27, EIO: 29, ENXIO: 60, E2BIG: 1, ENOEXEC: 45, EBADF: 8, ECHILD: 12, EAGAIN: 6, EWOULDBLOCK: 6, ENOMEM: 48, EACCES: 2, EFAULT: 21, ENOTBLK: 105, EBUSY: 10, EEXIST: 20, EXDEV: 75, ENODEV: 43, ENOTDIR: 54, EISDIR: 31, EINVAL: 28, ENFILE: 41, EMFILE: 33, ENOTTY: 59, ETXTBSY: 74, EFBIG: 22, ENOSPC: 51, ESPIPE: 70, EROFS: 69, EMLINK: 34, EPIPE: 64, EDOM: 18, ERANGE: 68, ENOMSG: 49, EIDRM: 24, ECHRNG: 106, EL2NSYNC: 156, EL3HLT: 107, EL3RST: 108, ELNRNG: 109, EUNATCH: 110, ENOCSI: 111, EL2HLT: 112, EDEADLK: 16, ENOLCK: 46, EBADE: 113, EBADR: 114, EXFULL: 115, ENOANO: 104, EBADRQC: 103, EBADSLT: 102, EDEADLOCK: 16, EBFONT: 101, ENOSTR: 100, ENODATA: 116, ETIME: 117, ENOSR: 118, ENONET: 119, ENOPKG: 120, EREMOTE: 121, ENOLINK: 47, EADV: 122, ESRMNT: 123, ECOMM: 124, EPROTO: 65, EMULTIHOP: 36, EDOTDOT: 125, EBADMSG: 9, ENOTUNIQ: 126, EBADFD: 127, EREMCHG: 128, ELIBACC: 129, ELIBBAD: 130, ELIBSCN: 131, ELIBMAX: 132, ELIBEXEC: 133, ENOSYS: 52, ENOTEMPTY: 55, ENAMETOOLONG: 37, ELOOP: 32, EOPNOTSUPP: 138, EPFNOSUPPORT: 139, ECONNRESET: 15, ENOBUFS: 42, EAFNOSUPPORT: 5, EPROTOTYPE: 67, ENOTSOCK: 57, ENOPROTOOPT: 50, ESHUTDOWN: 140, ECONNREFUSED: 14, EADDRINUSE: 3, ECONNABORTED: 13, ENETUNREACH: 40, ENETDOWN: 38, ETIMEDOUT: 73, EHOSTDOWN: 142, EHOSTUNREACH: 23, EINPROGRESS: 26, EALREADY: 7, EDESTADDRREQ: 17, EMSGSIZE: 35, EPROTONOSUPPORT: 66, ESOCKTNOSUPPORT: 137, EADDRNOTAVAIL: 4, ENETRESET: 39, EISCONN: 30, ENOTCONN: 53, ETOOMANYREFS: 141, EUSERS: 136, EDQUOT: 19, ESTALE: 72, ENOTSUP: 138, ENOMEDIUM: 148, EILSEQ: 25, EOVERFLOW: 61, ECANCELED: 11, ENOTRECOVERABLE: 56, EOWNERDEAD: 62, ESTRPIPE: 135 }; var FS = {
        root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, trackingDelegate: {}, tracking: { openFlags: { READ: 1, WRITE: 2 } }, ErrnoError: null, genericErrors: {}, filesystems: null, syncFSRequests: 0, handleFSError: function (e) {
          if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
          return setErrNo(e.errno);
        }, lookupPath: function (path, opts) {
          path = PATH_FS.resolve(FS.cwd(), path);
          opts = opts || {};

          if (!path) return { path: '', node: null };

          var defaults = {
            follow_mount: true,
            recurse_count: 0
          };
          for (var key in defaults) {
            if (opts[key] === undefined) {
              opts[key] = defaults[key];
            }
          }

          if (opts.recurse_count > 8) {  // max recursive lookup of 8
            throw new FS.ErrnoError(32);
          }

          // split the path
          var parts = PATH.normalizeArray(path.split('/').filter(function (p) {
            return !!p;
          }), false);

          // start at the root
          var current = FS.root;
          var current_path = '/';

          for (var i = 0; i < parts.length; i++) {
            var islast = (i === parts.length - 1);
            if (islast && opts.parent) {
              // stop resolving
              break;
            }

            current = FS.lookupNode(current, parts[i]);
            current_path = PATH.join2(current_path, parts[i]);

            // jump to the mount's root node if this is a mountpoint
            if (FS.isMountpoint(current)) {
              if (!islast || (islast && opts.follow_mount)) {
                current = current.mounted.root;
              }
            }

            // by default, lookupPath will not follow a symlink if it is the final path component.
            // setting opts.follow = true will override this behavior.
            if (!islast || opts.follow) {
              var count = 0;
              while (FS.isLink(current.mode)) {
                var link = FS.readlink(current_path);
                current_path = PATH_FS.resolve(PATH.dirname(current_path), link);

                var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
                current = lookup.node;

                if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                  throw new FS.ErrnoError(32);
                }
              }
            }
          }

          return { path: current_path, node: current };
        }, getPath: function (node) {
          var path;
          while (true) {
            if (FS.isRoot(node)) {
              var mount = node.mount.mountpoint;
              if (!path) return mount;
              return mount[mount.length - 1] !== '/' ? mount + '/' + path : mount + path;
            }
            path = path ? node.name + '/' + path : node.name;
            node = node.parent;
          }
        }, hashName: function (parentid, name) {
          var hash = 0;


          for (var i = 0; i < name.length; i++) {
            hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
          }
          return ((parentid + hash) >>> 0) % FS.nameTable.length;
        }, hashAddNode: function (node) {
          var hash = FS.hashName(node.parent.id, node.name);
          node.name_next = FS.nameTable[hash];
          FS.nameTable[hash] = node;
        }, hashRemoveNode: function (node) {
          var hash = FS.hashName(node.parent.id, node.name);
          if (FS.nameTable[hash] === node) {
            FS.nameTable[hash] = node.name_next;
          } else {
            var current = FS.nameTable[hash];
            while (current) {
              if (current.name_next === node) {
                current.name_next = node.name_next;
                break;
              }
              current = current.name_next;
            }
          }
        }, lookupNode: function (parent, name) {
          var errCode = FS.mayLookup(parent);
          if (errCode) {
            throw new FS.ErrnoError(errCode, parent);
          }
          var hash = FS.hashName(parent.id, name);
          for (var node = FS.nameTable[hash]; node; node = node.name_next) {
            var nodeName = node.name;
            if (node.parent.id === parent.id && nodeName === name) {
              return node;
            }
          }
          // if we failed to find it in the cache, call into the VFS
          return FS.lookup(parent, name);
        }, createNode: function (parent, name, mode, rdev) {
          var node = new FS.FSNode(parent, name, mode, rdev);

          FS.hashAddNode(node);

          return node;
        }, destroyNode: function (node) {
          FS.hashRemoveNode(node);
        }, isRoot: function (node) {
          return node === node.parent;
        }, isMountpoint: function (node) {
          return !!node.mounted;
        }, isFile: function (mode) {
          return (mode & 61440) === 32768;
        }, isDir: function (mode) {
          return (mode & 61440) === 16384;
        }, isLink: function (mode) {
          return (mode & 61440) === 40960;
        }, isChrdev: function (mode) {
          return (mode & 61440) === 8192;
        }, isBlkdev: function (mode) {
          return (mode & 61440) === 24576;
        }, isFIFO: function (mode) {
          return (mode & 61440) === 4096;
        }, isSocket: function (mode) {
          return (mode & 49152) === 49152;
        }, flagModes: { "r": 0, "rs": 1052672, "r+": 2, "w": 577, "wx": 705, "xw": 705, "w+": 578, "wx+": 706, "xw+": 706, "a": 1089, "ax": 1217, "xa": 1217, "a+": 1090, "ax+": 1218, "xa+": 1218 }, modeStringToFlags: function (str) {
          var flags = FS.flagModes[str];
          if (typeof flags === 'undefined') {
            throw new Error('Unknown file open mode: ' + str);
          }
          return flags;
        }, flagsToPermissionString: function (flag) {
          var perms = ['r', 'w', 'rw'][flag & 3];
          if ((flag & 512)) {
            perms += 'w';
          }
          return perms;
        }, nodePermissions: function (node, perms) {
          if (FS.ignorePermissions) {
            return 0;
          }
          // return 0 if any user, group or owner bits are set.
          if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
            return 2;
          } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
            return 2;
          } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
            return 2;
          }
          return 0;
        }, mayLookup: function (dir) {
          var errCode = FS.nodePermissions(dir, 'x');
          if (errCode) return errCode;
          if (!dir.node_ops.lookup) return 2;
          return 0;
        }, mayCreate: function (dir, name) {
          try {
            var node = FS.lookupNode(dir, name);
            return 20;
          } catch (e) {
          }
          return FS.nodePermissions(dir, 'wx');
        }, mayDelete: function (dir, name, isdir) {
          var node;
          try {
            node = FS.lookupNode(dir, name);
          } catch (e) {
            return e.errno;
          }
          var errCode = FS.nodePermissions(dir, 'wx');
          if (errCode) {
            return errCode;
          }
          if (isdir) {
            if (!FS.isDir(node.mode)) {
              return 54;
            }
            if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
              return 10;
            }
          } else {
            if (FS.isDir(node.mode)) {
              return 31;
            }
          }
          return 0;
        }, mayOpen: function (node, flags) {
          if (!node) {
            return 44;
          }
          if (FS.isLink(node.mode)) {
            return 32;
          } else if (FS.isDir(node.mode)) {
            if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
              return 31;
            }
          }
          return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
        }, MAX_OPEN_FDS: 4096, nextfd: function (fd_start, fd_end) {
          fd_start = fd_start || 0;
          fd_end = fd_end || FS.MAX_OPEN_FDS;
          for (var fd = fd_start; fd <= fd_end; fd++) {
            if (!FS.streams[fd]) {
              return fd;
            }
          }
          throw new FS.ErrnoError(33);
        }, getStream: function (fd) {
          return FS.streams[fd];
        }, createStream: function (stream, fd_start, fd_end) {
          if (!FS.FSStream) {
            FS.FSStream = /** @constructor */ function () { };
            FS.FSStream.prototype = {
              object: {
                get: function () { return this.node; },
                set: function (val) { this.node = val; }
              },
              isRead: {
                get: function () { return (this.flags & 2097155) !== 1; }
              },
              isWrite: {
                get: function () { return (this.flags & 2097155) !== 0; }
              },
              isAppend: {
                get: function () { return (this.flags & 1024); }
              }
            };
          }
          // clone it, so we can return an instance of FSStream
          var newStream = new FS.FSStream();
          for (var p in stream) {
            newStream[p] = stream[p];
          }
          stream = newStream;
          var fd = FS.nextfd(fd_start, fd_end);
          stream.fd = fd;
          FS.streams[fd] = stream;
          return stream;
        }, closeStream: function (fd) {
          FS.streams[fd] = null;
        }, chrdev_stream_ops: {
          open: function (stream) {
            var device = FS.getDevice(stream.node.rdev);
            // override node's stream ops with the device's
            stream.stream_ops = device.stream_ops;
            // forward the open call
            if (stream.stream_ops.open) {
              stream.stream_ops.open(stream);
            }
          }, llseek: function () {
            throw new FS.ErrnoError(70);
          }
        }, major: function (dev) {
          return ((dev) >> 8);
        }, minor: function (dev) {
          return ((dev) & 0xff);
        }, makedev: function (ma, mi) {
          return ((ma) << 8 | (mi));
        }, registerDevice: function (dev, ops) {
          FS.devices[dev] = { stream_ops: ops };
        }, getDevice: function (dev) {
          return FS.devices[dev];
        }, getMounts: function (mount) {
          var mounts = [];
          var check = [mount];

          while (check.length) {
            var m = check.pop();

            mounts.push(m);

            check.push.apply(check, m.mounts);
          }

          return mounts;
        }, syncfs: function (populate, callback) {
          if (typeof (populate) === 'function') {
            callback = populate;
            populate = false;
          }

          FS.syncFSRequests++;

          if (FS.syncFSRequests > 1) {
            err('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
          }

          var mounts = FS.getMounts(FS.root.mount);
          var completed = 0;

          function doCallback(errCode) {
            assert(FS.syncFSRequests > 0);
            FS.syncFSRequests--;
            return callback(errCode);
          }

          function done(errCode) {
            if (errCode) {
              if (!done.errored) {
                done.errored = true;
                return doCallback(errCode);
              }
              return;
            }
            if (++completed >= mounts.length) {
              doCallback(null);
            }
          }
          // sync all mounts
          mounts.forEach(function (mount) {
            if (!mount.type.syncfs) {
              return done(null);
            }
            mount.type.syncfs(mount, populate, done);
          });
        }, mount: function (type, opts, mountpoint) {
          if (typeof type === 'string') {
            // The filesystem was not included, and instead we have an error
            // message stored in the variable.
            throw type;
          }
          var root = mountpoint === '/';
          var pseudo = !mountpoint;
          var node;

          if (root && FS.root) {
            throw new FS.ErrnoError(10);
          } else if (!root && !pseudo) {
            var lookup = FS.lookupPath(mountpoint, { follow_mount: false });

            mountpoint = lookup.path;  // use the absolute path
            node = lookup.node;

            if (FS.isMountpoint(node)) {
              throw new FS.ErrnoError(10);
            }

            if (!FS.isDir(node.mode)) {
              throw new FS.ErrnoError(54);
            }
          }

          var mount = {
            type: type,
            opts: opts,
            mountpoint: mountpoint,
            mounts: []
          };

          // create a root node for the fs
          var mountRoot = type.mount(mount);
          mountRoot.mount = mount;
          mount.root = mountRoot;

          if (root) {
            FS.root = mountRoot;
          } else if (node) {
            // set as a mountpoint
            node.mounted = mount;

            // add the new mount to the current mount's children
            if (node.mount) {
              node.mount.mounts.push(mount);
            }
          }

          return mountRoot;
        }, unmount: function (mountpoint) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });

          if (!FS.isMountpoint(lookup.node)) {
            throw new FS.ErrnoError(28);
          }

          // destroy the nodes for this mount, and all its child mounts
          var node = lookup.node;
          var mount = node.mounted;
          var mounts = FS.getMounts(mount);

          Object.keys(FS.nameTable).forEach(function (hash) {
            var current = FS.nameTable[hash];

            while (current) {
              var next = current.name_next;

              if (mounts.indexOf(current.mount) !== -1) {
                FS.destroyNode(current);
              }

              current = next;
            }
          });

          // no longer a mountpoint
          node.mounted = null;

          // remove this mount from the child mounts
          var idx = node.mount.mounts.indexOf(mount);
          assert(idx !== -1);
          node.mount.mounts.splice(idx, 1);
        }, lookup: function (parent, name) {
          return parent.node_ops.lookup(parent, name);
        }, mknod: function (path, mode, dev) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          if (!name || name === '.' || name === '..') {
            throw new FS.ErrnoError(28);
          }
          var errCode = FS.mayCreate(parent, name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.mknod) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.mknod(parent, name, mode, dev);
        }, create: function (path, mode) {
          mode = mode !== undefined ? mode : 438 /* 0666 */;
          mode &= 4095;
          mode |= 32768;
          return FS.mknod(path, mode, 0);
        }, mkdir: function (path, mode) {
          mode = mode !== undefined ? mode : 511 /* 0777 */;
          mode &= 511 | 512;
          mode |= 16384;
          return FS.mknod(path, mode, 0);
        }, mkdirTree: function (path, mode) {
          var dirs = path.split('/');
          var d = '';
          for (var i = 0; i < dirs.length; ++i) {
            if (!dirs[i]) continue;
            d += '/' + dirs[i];
            try {
              FS.mkdir(d, mode);
            } catch (e) {
              if (e.errno != 20) throw e;
            }
          }
        }, mkdev: function (path, mode, dev) {
          if (typeof (dev) === 'undefined') {
            dev = mode;
            mode = 438 /* 0666 */;
          }
          mode |= 8192;
          return FS.mknod(path, mode, dev);
        }, symlink: function (oldpath, newpath) {
          if (!PATH_FS.resolve(oldpath)) {
            throw new FS.ErrnoError(44);
          }
          var lookup = FS.lookupPath(newpath, { parent: true });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var newname = PATH.basename(newpath);
          var errCode = FS.mayCreate(parent, newname);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.symlink) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.symlink(parent, newname, oldpath);
        }, rename: function (old_path, new_path) {
          var old_dirname = PATH.dirname(old_path);
          var new_dirname = PATH.dirname(new_path);
          var old_name = PATH.basename(old_path);
          var new_name = PATH.basename(new_path);
          // parents must exist
          var lookup, old_dir, new_dir;

          // let the errors from non existant directories percolate up
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;

          if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
          // need to be part of the same mount
          if (old_dir.mount !== new_dir.mount) {
            throw new FS.ErrnoError(75);
          }
          // source must exist
          var old_node = FS.lookupNode(old_dir, old_name);
          // old path should not be an ancestor of the new path
          var relative = PATH_FS.relative(old_path, new_dirname);
          if (relative.charAt(0) !== '.') {
            throw new FS.ErrnoError(28);
          }
          // new path should not be an ancestor of the old path
          relative = PATH_FS.relative(new_path, old_dirname);
          if (relative.charAt(0) !== '.') {
            throw new FS.ErrnoError(55);
          }
          // see if the new path already exists
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {
            // not fatal
          }
          // early out if nothing needs to change
          if (old_node === new_node) {
            return;
          }
          // we'll need to delete the old entry
          var isdir = FS.isDir(old_node.mode);
          var errCode = FS.mayDelete(old_dir, old_name, isdir);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          // need delete permissions if we'll be overwriting.
          // need create permissions if new doesn't already exist.
          errCode = new_node ?
            FS.mayDelete(new_dir, new_name, isdir) :
            FS.mayCreate(new_dir, new_name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!old_dir.node_ops.rename) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
            throw new FS.ErrnoError(10);
          }
          // if we are going to change the parent, check write permissions
          if (new_dir !== old_dir) {
            errCode = FS.nodePermissions(old_dir, 'w');
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          try {
            if (FS.trackingDelegate['willMovePath']) {
              FS.trackingDelegate['willMovePath'](old_path, new_path);
            }
          } catch (e) {
            err("FS.trackingDelegate['willMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
          }
          // remove the node from the lookup hash
          FS.hashRemoveNode(old_node);
          // do the underlying fs rename
          try {
            old_dir.node_ops.rename(old_node, new_dir, new_name);
          } catch (e) {
            throw e;
          } finally {
            // add the node back to the hash (in case node_ops.rename
            // changed its name)
            FS.hashAddNode(old_node);
          }
          try {
            if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
          } catch (e) {
            err("FS.trackingDelegate['onMovePath']('" + old_path + "', '" + new_path + "') threw an exception: " + e.message);
          }
        }, rmdir: function (path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, true);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.rmdir) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          try {
            if (FS.trackingDelegate['willDeletePath']) {
              FS.trackingDelegate['willDeletePath'](path);
            }
          } catch (e) {
            err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
          }
          parent.node_ops.rmdir(parent, name);
          FS.destroyNode(node);
          try {
            if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
          } catch (e) {
            err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
          }
        }, readdir: function (path) {
          var lookup = FS.lookupPath(path, { follow: true });
          var node = lookup.node;
          if (!node.node_ops.readdir) {
            throw new FS.ErrnoError(54);
          }
          return node.node_ops.readdir(node);
        }, unlink: function (path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name = PATH.basename(path);
          var node = FS.lookupNode(parent, name);
          var errCode = FS.mayDelete(parent, name, false);
          if (errCode) {
            // According to POSIX, we should map EISDIR to EPERM, but
            // we instead do what Linux does (and we must, as we use
            // the musl linux libc).
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.unlink) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          try {
            if (FS.trackingDelegate['willDeletePath']) {
              FS.trackingDelegate['willDeletePath'](path);
            }
          } catch (e) {
            err("FS.trackingDelegate['willDeletePath']('" + path + "') threw an exception: " + e.message);
          }
          parent.node_ops.unlink(parent, name);
          FS.destroyNode(node);
          try {
            if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
          } catch (e) {
            err("FS.trackingDelegate['onDeletePath']('" + path + "') threw an exception: " + e.message);
          }
        }, readlink: function (path) {
          var lookup = FS.lookupPath(path);
          var link = lookup.node;
          if (!link) {
            throw new FS.ErrnoError(44);
          }
          if (!link.node_ops.readlink) {
            throw new FS.ErrnoError(28);
          }
          return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
        }, stat: function (path, dontFollow) {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          var node = lookup.node;
          if (!node) {
            throw new FS.ErrnoError(44);
          }
          if (!node.node_ops.getattr) {
            throw new FS.ErrnoError(63);
          }
          return node.node_ops.getattr(node);
        }, lstat: function (path) {
          return FS.stat(path, true);
        }, chmod: function (path, mode, dontFollow) {
          var node;
          if (typeof path === 'string') {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(63);
          }
          node.node_ops.setattr(node, {
            mode: (mode & 4095) | (node.mode & ~4095),
            timestamp: Date.now()
          });
        }, lchmod: function (path, mode) {
          FS.chmod(path, mode, true);
        }, fchmod: function (fd, mode) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          FS.chmod(stream.node, mode);
        }, chown: function (path, uid, gid, dontFollow) {
          var node;
          if (typeof path === 'string') {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(63);
          }
          node.node_ops.setattr(node, {
            timestamp: Date.now()
            // we ignore the uid / gid for now
          });
        }, lchown: function (path, uid, gid) {
          FS.chown(path, uid, gid, true);
        }, fchown: function (fd, uid, gid) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          FS.chown(stream.node, uid, gid);
        }, truncate: function (path, len) {
          if (len < 0) {
            throw new FS.ErrnoError(28);
          }
          var node;
          if (typeof path === 'string') {
            var lookup = FS.lookupPath(path, { follow: true });
            node = lookup.node;
          } else {
            node = path;
          }
          if (!node.node_ops.setattr) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isDir(node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!FS.isFile(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          var errCode = FS.nodePermissions(node, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          node.node_ops.setattr(node, {
            size: len,
            timestamp: Date.now()
          });
        }, ftruncate: function (fd, len) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(28);
          }
          FS.truncate(stream.node, len);
        }, utime: function (path, atime, mtime) {
          var lookup = FS.lookupPath(path, { follow: true });
          var node = lookup.node;
          node.node_ops.setattr(node, {
            timestamp: Math.max(atime, mtime)
          });
        }, open: function (path, flags, mode, fd_start, fd_end) {
          if (path === "") {
            throw new FS.ErrnoError(44);
          }
          flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
          mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
          if ((flags & 64)) {
            mode = (mode & 4095) | 32768;
          } else {
            mode = 0;
          }
          var node;
          if (typeof path === 'object') {
            node = path;
          } else {
            path = PATH.normalize(path);
            try {
              var lookup = FS.lookupPath(path, {
                follow: !(flags & 131072)
              });
              node = lookup.node;
            } catch (e) {
              // ignore
            }
          }
          // perhaps we need to create the node
          var created = false;
          if ((flags & 64)) {
            if (node) {
              // if O_CREAT and O_EXCL are set, error out if the node already exists
              if ((flags & 128)) {
                throw new FS.ErrnoError(20);
              }
            } else {
              // node doesn't exist, try to create it
              node = FS.mknod(path, mode, 0);
              created = true;
            }
          }
          if (!node) {
            throw new FS.ErrnoError(44);
          }
          // can't truncate a device
          if (FS.isChrdev(node.mode)) {
            flags &= ~512;
          }
          // if asked only for a directory, then this must be one
          if ((flags & 65536) && !FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
          // check permissions, if this is not a file we just created now (it is ok to
          // create and write to a file with read-only permissions; it is read-only
          // for later use)
          if (!created) {
            var errCode = FS.mayOpen(node, flags);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          // do truncation if necessary
          if ((flags & 512)) {
            FS.truncate(node, 0);
          }
          // we've already handled these, don't pass down to the underlying vfs
          flags &= ~(128 | 512 | 131072);

          // register the stream with the filesystem
          var stream = FS.createStream({
            node: node,
            path: FS.getPath(node),  // we want the absolute path to the node
            flags: flags,
            seekable: true,
            position: 0,
            stream_ops: node.stream_ops,
            // used by the file family libc calls (fopen, fwrite, ferror, etc.)
            ungotten: [],
            error: false
          }, fd_start, fd_end);
          // call the new stream's open function
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
          if (Module['logReadFiles'] && !(flags & 1)) {
            if (!FS.readFiles) FS.readFiles = {};
            if (!(path in FS.readFiles)) {
              FS.readFiles[path] = 1;
              err("FS.trackingDelegate error on read file: " + path);
            }
          }
          try {
            if (FS.trackingDelegate['onOpenFile']) {
              var trackingFlags = 0;
              if ((flags & 2097155) !== 1) {
                trackingFlags |= FS.tracking.openFlags.READ;
              }
              if ((flags & 2097155) !== 0) {
                trackingFlags |= FS.tracking.openFlags.WRITE;
              }
              FS.trackingDelegate['onOpenFile'](path, trackingFlags);
            }
          } catch (e) {
            err("FS.trackingDelegate['onOpenFile']('" + path + "', flags) threw an exception: " + e.message);
          }
          return stream;
        }, close: function (stream) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (stream.getdents) stream.getdents = null; // free readdir state
          try {
            if (stream.stream_ops.close) {
              stream.stream_ops.close(stream);
            }
          } catch (e) {
            throw e;
          } finally {
            FS.closeStream(stream.fd);
          }
          stream.fd = null;
        }, isClosed: function (stream) {
          return stream.fd === null;
        }, llseek: function (stream, offset, whence) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (!stream.seekable || !stream.stream_ops.llseek) {
            throw new FS.ErrnoError(70);
          }
          if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(28);
          }
          stream.position = stream.stream_ops.llseek(stream, offset, whence);
          stream.ungotten = [];
          return stream.position;
        }, read: function (stream, buffer, offset, length, position) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.read) {
            throw new FS.ErrnoError(28);
          }
          var seeking = typeof position !== 'undefined';
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
          if (!seeking) stream.position += bytesRead;
          return bytesRead;
        }, write: function (stream, buffer, offset, length, position, canOwn) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.write) {
            throw new FS.ErrnoError(28);
          }
          if (stream.seekable && stream.flags & 1024) {
            // seek to the end before writing in append mode
            FS.llseek(stream, 0, 2);
          }
          var seeking = typeof position !== 'undefined';
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
          if (!seeking) stream.position += bytesWritten;
          try {
            if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
          } catch (e) {
            err("FS.trackingDelegate['onWriteToFile']('" + stream.path + "') threw an exception: " + e.message);
          }
          return bytesWritten;
        }, allocate: function (stream, offset, length) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (offset < 0 || length <= 0) {
            throw new FS.ErrnoError(28);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (!stream.stream_ops.allocate) {
            throw new FS.ErrnoError(138);
          }
          stream.stream_ops.allocate(stream, offset, length);
        }, mmap: function (stream, address, length, position, prot, flags) {
          // User requests writing to file (prot & PROT_WRITE != 0).
          // Checking if we have permissions to write to the file unless
          // MAP_PRIVATE flag is set. According to POSIX spec it is possible
          // to write to file opened in read-only mode with MAP_PRIVATE flag,
          // as all modifications will be visible only in the memory of
          // the current process.
          if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(2);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(2);
          }
          if (!stream.stream_ops.mmap) {
            throw new FS.ErrnoError(43);
          }
          return stream.stream_ops.mmap(stream, address, length, position, prot, flags);
        }, msync: function (stream, buffer, offset, length, mmapFlags) {
          if (!stream || !stream.stream_ops.msync) {
            return 0;
          }
          return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
        }, munmap: function (stream) {
          return 0;
        }, ioctl: function (stream, cmd, arg) {
          if (!stream.stream_ops.ioctl) {
            throw new FS.ErrnoError(59);
          }
          return stream.stream_ops.ioctl(stream, cmd, arg);
        }, readFile: function (path, opts) {
          opts = opts || {};
          opts.flags = opts.flags || 'r';
          opts.encoding = opts.encoding || 'binary';
          if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
            throw new Error('Invalid encoding type "' + opts.encoding + '"');
          }
          var ret;
          var stream = FS.open(path, opts.flags);
          var stat = FS.stat(path);
          var length = stat.size;
          var buf = new Uint8Array(length);
          FS.read(stream, buf, 0, length, 0);
          if (opts.encoding === 'utf8') {
            ret = UTF8ArrayToString(buf, 0);
          } else if (opts.encoding === 'binary') {
            ret = buf;
          }
          FS.close(stream);
          return ret;
        }, writeFile: function (path, data, opts) {
          opts = opts || {};
          opts.flags = opts.flags || 'w';
          var stream = FS.open(path, opts.flags, opts.mode);
          if (typeof data === 'string') {
            var buf = new Uint8Array(lengthBytesUTF8(data) + 1);
            var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
            FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
          } else if (ArrayBuffer.isView(data)) {
            FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
          } else {
            throw new Error('Unsupported data type');
          }
          FS.close(stream);
        }, cwd: function () {
          return FS.currentPath;
        }, chdir: function (path) {
          var lookup = FS.lookupPath(path, { follow: true });
          if (lookup.node === null) {
            throw new FS.ErrnoError(44);
          }
          if (!FS.isDir(lookup.node.mode)) {
            throw new FS.ErrnoError(54);
          }
          var errCode = FS.nodePermissions(lookup.node, 'x');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.currentPath = lookup.path;
        }, createDefaultDirectories: function () {
          FS.mkdir('/tmp');
          FS.mkdir('/home');
          FS.mkdir('/home/web_user');
        }, createDefaultDevices: function () {
          // create /dev
          FS.mkdir('/dev');
          // setup /dev/null
          FS.registerDevice(FS.makedev(1, 3), {
            read: function () { return 0; },
            write: function (stream, buffer, offset, length, pos) { return length; }
          });
          FS.mkdev('/dev/null', FS.makedev(1, 3));
          // setup /dev/tty and /dev/tty1
          // stderr needs to print output using Module['printErr']
          // so we register a second tty just for it.
          TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
          TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
          FS.mkdev('/dev/tty', FS.makedev(5, 0));
          FS.mkdev('/dev/tty1', FS.makedev(6, 0));
          // setup /dev/[u]random
          var random_device;
          if (typeof crypto === 'object' && typeof crypto['getRandomValues'] === 'function') {
            // for modern web browsers
            var randomBuffer = new Uint8Array(1);
            random_device = function () { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
          } else
            if (ENVIRONMENT_IS_NODE) {
              // for nodejs with or without crypto support included
              try {
                var crypto_module = require('crypto');
                // nodejs has crypto support
                random_device = function () { return crypto_module['randomBytes'](1)[0]; };
              } catch (e) {
                // nodejs doesn't have crypto support
              }
            } else
              ;
          if (!random_device) {
            // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
            random_device = function () { abort("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };"); };
          }
          FS.createDevice('/dev', 'random', random_device);
          FS.createDevice('/dev', 'urandom', random_device);
          // we're not going to emulate the actual shm device,
          // just create the tmp dirs that reside in it commonly
          FS.mkdir('/dev/shm');
          FS.mkdir('/dev/shm/tmp');
        }, createSpecialDirectories: function () {
          // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the name of the stream for fd 6 (see test_unistd_ttyname)
          FS.mkdir('/proc');
          FS.mkdir('/proc/self');
          FS.mkdir('/proc/self/fd');
          FS.mount({
            mount: function () {
              var node = FS.createNode('/proc/self', 'fd', 16384 | 511 /* 0777 */, 73);
              node.node_ops = {
                lookup: function (parent, name) {
                  var fd = +name;
                  var stream = FS.getStream(fd);
                  if (!stream) throw new FS.ErrnoError(8);
                  var ret = {
                    parent: null,
                    mount: { mountpoint: 'fake' },
                    node_ops: { readlink: function () { return stream.path } }
                  };
                  ret.parent = ret; // make it look like a simple root node
                  return ret;
                }
              };
              return node;
            }
          }, {}, '/proc/self/fd');
        }, createStandardStreams: function () {
          // TODO deprecate the old functionality of a single
          // input / output callback and that utilizes FS.createDevice
          // and instead require a unique set of stream ops

          // by default, we symlink the standard streams to the
          // default tty devices. however, if the standard streams
          // have been overwritten we create a unique device for
          // them instead.
          if (Module['stdin']) {
            FS.createDevice('/dev', 'stdin', Module['stdin']);
          } else {
            FS.symlink('/dev/tty', '/dev/stdin');
          }
          if (Module['stdout']) {
            FS.createDevice('/dev', 'stdout', null, Module['stdout']);
          } else {
            FS.symlink('/dev/tty', '/dev/stdout');
          }
          if (Module['stderr']) {
            FS.createDevice('/dev', 'stderr', null, Module['stderr']);
          } else {
            FS.symlink('/dev/tty1', '/dev/stderr');
          }

          // open default streams for the stdin, stdout and stderr devices
          var stdin = FS.open('/dev/stdin', 'r');
          var stdout = FS.open('/dev/stdout', 'w');
          var stderr = FS.open('/dev/stderr', 'w');
          assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
          assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
          assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
        }, ensureErrnoError: function () {
          if (FS.ErrnoError) return;
          FS.ErrnoError = /** @this{Object} */ function ErrnoError(errno, node) {
            this.node = node;
            this.setErrno = /** @this{Object} */ function (errno) {
              this.errno = errno;
              for (var key in ERRNO_CODES) {
                if (ERRNO_CODES[key] === errno) {
                  this.code = key;
                  break;
                }
              }
            };
            this.setErrno(errno);
            this.message = ERRNO_MESSAGES[errno];

            // Try to get a maximally helpful stack trace. On Node.js, getting Error.stack
            // now ensures it shows what we want.
            if (this.stack) {
              // Define the stack property for Node.js 4, which otherwise errors on the next line.
              Object.defineProperty(this, "stack", { value: (new Error).stack, writable: true });
              this.stack = demangleAll(this.stack);
            }
          };
          FS.ErrnoError.prototype = new Error();
          FS.ErrnoError.prototype.constructor = FS.ErrnoError;
          // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
          [44].forEach(function (code) {
            FS.genericErrors[code] = new FS.ErrnoError(code);
            FS.genericErrors[code].stack = '<generic error, no stack>';
          });
        }, staticInit: function () {
          FS.ensureErrnoError();

          FS.nameTable = new Array(4096);

          FS.mount(MEMFS, {}, '/');

          FS.createDefaultDirectories();
          FS.createDefaultDevices();
          FS.createSpecialDirectories();

          FS.filesystems = {
            'MEMFS': MEMFS,
          };
        }, init: function (input, output, error) {
          assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
          FS.init.initialized = true;

          FS.ensureErrnoError();

          // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
          Module['stdin'] = input || Module['stdin'];
          Module['stdout'] = output || Module['stdout'];
          Module['stderr'] = error || Module['stderr'];

          FS.createStandardStreams();
        }, quit: function () {
          FS.init.initialized = false;
          // force-flush all streams, so we get musl std streams printed out
          var fflush = Module['_fflush'];
          if (fflush) fflush(0);
          // close all of our streams
          for (var i = 0; i < FS.streams.length; i++) {
            var stream = FS.streams[i];
            if (!stream) {
              continue;
            }
            FS.close(stream);
          }
        }, getMode: function (canRead, canWrite) {
          var mode = 0;
          if (canRead) mode |= 292 | 73;
          if (canWrite) mode |= 146;
          return mode;
        }, joinPath: function (parts, forceRelative) {
          var path = PATH.join.apply(null, parts);
          if (forceRelative && path[0] == '/') path = path.substr(1);
          return path;
        }, absolutePath: function (relative, base) {
          return PATH_FS.resolve(base, relative);
        }, standardizePath: function (path) {
          return PATH.normalize(path);
        }, findObject: function (path, dontResolveLastLink) {
          var ret = FS.analyzePath(path, dontResolveLastLink);
          if (ret.exists) {
            return ret.object;
          } else {
            setErrNo(ret.error);
            return null;
          }
        }, analyzePath: function (path, dontResolveLastLink) {
          // operate from within the context of the symlink's target
          try {
            var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            path = lookup.path;
          } catch (e) {
          }
          var ret = {
            isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
            parentExists: false, parentPath: null, parentObject: null
          };
          try {
            var lookup = FS.lookupPath(path, { parent: true });
            ret.parentExists = true;
            ret.parentPath = lookup.path;
            ret.parentObject = lookup.node;
            ret.name = PATH.basename(path);
            lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            ret.exists = true;
            ret.path = lookup.path;
            ret.object = lookup.node;
            ret.name = lookup.node.name;
            ret.isRoot = lookup.path === '/';
          } catch (e) {
            ret.error = e.errno;
          } return ret;
        }, createFolder: function (parent, name, canRead, canWrite) {
          var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
          var mode = FS.getMode(canRead, canWrite);
          return FS.mkdir(path, mode);
        }, createPath: function (parent, path, canRead, canWrite) {
          parent = typeof parent === 'string' ? parent : FS.getPath(parent);
          var parts = path.split('/').reverse();
          while (parts.length) {
            var part = parts.pop();
            if (!part) continue;
            var current = PATH.join2(parent, part);
            try {
              FS.mkdir(current);
            } catch (e) {
              // ignore EEXIST
            }
            parent = current;
          }
          return current;
        }, createFile: function (parent, name, properties, canRead, canWrite) {
          var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
          var mode = FS.getMode(canRead, canWrite);
          return FS.create(path, mode);
        }, createDataFile: function (parent, name, data, canRead, canWrite, canOwn) {
          var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
          var mode = FS.getMode(canRead, canWrite);
          var node = FS.create(path, mode);
          if (data) {
            if (typeof data === 'string') {
              var arr = new Array(data.length);
              for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
              data = arr;
            }
            // make sure we can write to the file
            FS.chmod(node, mode | 146);
            var stream = FS.open(node, 'w');
            FS.write(stream, data, 0, data.length, 0, canOwn);
            FS.close(stream);
            FS.chmod(node, mode);
          }
          return node;
        }, createDevice: function (parent, name, input, output) {
          var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
          var mode = FS.getMode(!!input, !!output);
          if (!FS.createDevice.major) FS.createDevice.major = 64;
          var dev = FS.makedev(FS.createDevice.major++, 0);
          // Create a fake device that a set of stream ops to emulate
          // the old behavior.
          FS.registerDevice(dev, {
            open: function (stream) {
              stream.seekable = false;
            },
            close: function (stream) {
              // flush any pending line data
              if (output && output.buffer && output.buffer.length) {
                output(10);
              }
            },
            read: function (stream, buffer, offset, length, pos /* ignored */) {
              var bytesRead = 0;
              for (var i = 0; i < length; i++) {
                var result;
                try {
                  result = input();
                } catch (e) {
                  throw new FS.ErrnoError(29);
                }
                if (result === undefined && bytesRead === 0) {
                  throw new FS.ErrnoError(6);
                }
                if (result === null || result === undefined) break;
                bytesRead++;
                buffer[offset + i] = result;
              }
              if (bytesRead) {
                stream.node.timestamp = Date.now();
              }
              return bytesRead;
            },
            write: function (stream, buffer, offset, length, pos) {
              for (var i = 0; i < length; i++) {
                try {
                  output(buffer[offset + i]);
                } catch (e) {
                  throw new FS.ErrnoError(29);
                }
              }
              if (length) {
                stream.node.timestamp = Date.now();
              }
              return i;
            }
          });
          return FS.mkdev(path, mode, dev);
        }, createLink: function (parent, name, target, canRead, canWrite) {
          var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
          return FS.symlink(target, path);
        }, forceLoadFile: function (obj) {
          if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
          var success = true;
          if (typeof XMLHttpRequest !== 'undefined') {
            throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
          } else if (read_) {
            // Command-line.
            try {
              // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
              //          read() will try to parse UTF8.
              obj.contents = intArrayFromString(read_(obj.url), true);
              obj.usedBytes = obj.contents.length;
            } catch (e) {
              success = false;
            }
          } else {
            throw new Error('Cannot load without read() or XMLHttpRequest.');
          }
          if (!success) setErrNo(29);
          return success;
        }, createLazyFile: function (parent, name, url, canRead, canWrite) {
          // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
          /** @constructor */
          function LazyUint8Array() {
            this.lengthKnown = false;
            this.chunks = []; // Loaded chunks. Index is the chunk number
          }
          LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
            if (idx > this.length - 1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = (idx / this.chunkSize) | 0;
            return this.getter(chunkNum)[chunkOffset];
          };
          LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
            this.getter = getter;
          };
          LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
            // Find length
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, false);
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
            var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";

            var chunkSize = 1024 * 1024; // Chunk size in bytes

            if (!hasByteServing) chunkSize = datalength;

            // Function to get a range from the remote URL.
            var doXHR = (function (from, to) {
              if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
              if (to > datalength - 1) throw new Error("only " + datalength + " bytes available! programmer error!");

              // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, false);
              if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);

              // Some hints to the browser that we want binary data.
              if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
              if (xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
              }

              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              if (xhr.response !== undefined) {
                return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
              } else {
                return intArrayFromString(xhr.responseText || '', true);
              }
            });
            var lazyArray = this;
            lazyArray.setDataGetter(function (chunkNum) {
              var start = chunkNum * chunkSize;
              var end = (chunkNum + 1) * chunkSize - 1; // including this byte
              end = Math.min(end, datalength - 1); // if datalength-1 is selected, this is the last block
              if (typeof (lazyArray.chunks[chunkNum]) === "undefined") {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
              }
              if (typeof (lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
              return lazyArray.chunks[chunkNum];
            });

            if (usesGzip || !datalength) {
              // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
              chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out("LazyFiles on gzip forces download of the whole file when length is accessed");
            }

            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          };
          if (typeof XMLHttpRequest !== 'undefined') {
            if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
            var lazyArray = new LazyUint8Array();
            Object.defineProperties(lazyArray, {
              length: {
                get: /** @this{Object} */ function () {
                  if (!this.lengthKnown) {
                    this.cacheLength();
                  }
                  return this._length;
                }
              },
              chunkSize: {
                get: /** @this{Object} */ function () {
                  if (!this.lengthKnown) {
                    this.cacheLength();
                  }
                  return this._chunkSize;
                }
              }
            });

            var properties = { isDevice: false, contents: lazyArray };
          } else {
            var properties = { isDevice: false, url: url };
          }

          var node = FS.createFile(parent, name, properties, canRead, canWrite);
          // This is a total hack, but I want to get this lazy file code out of the
          // core of MEMFS. If we want to keep this lazy file concept I feel it should
          // be its own thin LAZYFS proxying calls to MEMFS.
          if (properties.contents) {
            node.contents = properties.contents;
          } else if (properties.url) {
            node.contents = null;
            node.url = properties.url;
          }
          // Add a function that defers querying the file size until it is asked the first time.
          Object.defineProperties(node, {
            usedBytes: {
              get: /** @this {FSNode} */ function () { return this.contents.length; }
            }
          });
          // override each stream op with one that tries to force load the lazy file first
          var stream_ops = {};
          var keys = Object.keys(node.stream_ops);
          keys.forEach(function (key) {
            var fn = node.stream_ops[key];
            stream_ops[key] = function forceLoadLazyFile() {
              if (!FS.forceLoadFile(node)) {
                throw new FS.ErrnoError(29);
              }
              return fn.apply(null, arguments);
            };
          });
          // use a custom read function
          stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(29);
            }
            var contents = stream.node.contents;
            if (position >= contents.length)
              return 0;
            var size = Math.min(contents.length - position, length);
            assert(size >= 0);
            if (contents.slice) { // normal array
              for (var i = 0; i < size; i++) {
                buffer[offset + i] = contents[position + i];
              }
            } else {
              for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
                buffer[offset + i] = contents.get(position + i);
              }
            }
            return size;
          };
          node.stream_ops = stream_ops;
          return node;
        }, createPreloadedFile: function (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
          Browser.init(); // XXX perhaps this method should move onto Browser?
          // TODO we should allow people to just pass in a complete filename instead
          // of parent and name being that we just join them anyways
          var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
          var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
          function processData(byteArray) {
            function finish(byteArray) {
              if (preFinish) preFinish();
              if (!dontCreateFile) {
                FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
              }
              if (onload) onload();
              removeRunDependency(dep);
            }
            var handled = false;
            Module['preloadPlugins'].forEach(function (plugin) {
              if (handled) return;
              if (plugin['canHandle'](fullname)) {
                plugin['handle'](byteArray, fullname, finish, function () {
                  if (onerror) onerror();
                  removeRunDependency(dep);
                });
                handled = true;
              }
            });
            if (!handled) finish(byteArray);
          }
          addRunDependency(dep);
          if (typeof url == 'string') {
            Browser.asyncLoad(url, function (byteArray) {
              processData(byteArray);
            }, onerror);
          } else {
            processData(url);
          }
        }, indexedDB: function () {
          return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        }, DB_NAME: function () {
          return 'EM_FS_' + window.location.pathname;
        }, DB_VERSION: 20, DB_STORE_NAME: "FILE_DATA", saveFilesToDB: function (paths, onload, onerror) {
          onload = onload || function () { };
          onerror = onerror || function () { };
          var indexedDB = FS.indexedDB();
          try {
            var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
          } catch (e) {
            return onerror(e);
          }
          openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
            out('creating db');
            var db = openRequest.result;
            db.createObjectStore(FS.DB_STORE_NAME);
          };
          openRequest.onsuccess = function openRequest_onsuccess() {
            var db = openRequest.result;
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
            var files = transaction.objectStore(FS.DB_STORE_NAME);
            var ok = 0, fail = 0, total = paths.length;
            function finish() {
              if (fail == 0) onload(); else onerror();
            }
            paths.forEach(function (path) {
              var putRequest = files.put(FS.analyzePath(path).object.contents, path);
              putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish(); };
              putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish(); };
            });
            transaction.onerror = onerror;
          };
          openRequest.onerror = onerror;
        }, loadFilesFromDB: function (paths, onload, onerror) {
          onload = onload || function () { };
          onerror = onerror || function () { };
          var indexedDB = FS.indexedDB();
          try {
            var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
          } catch (e) {
            return onerror(e);
          }
          openRequest.onupgradeneeded = onerror; // no database to load from
          openRequest.onsuccess = function openRequest_onsuccess() {
            var db = openRequest.result;
            try {
              var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
            } catch (e) {
              onerror(e);
              return;
            }
            var files = transaction.objectStore(FS.DB_STORE_NAME);
            var ok = 0, fail = 0, total = paths.length;
            function finish() {
              if (fail == 0) onload(); else onerror();
            }
            paths.forEach(function (path) {
              var getRequest = files.get(path);
              getRequest.onsuccess = function getRequest_onsuccess() {
                if (FS.analyzePath(path).exists) {
                  FS.unlink(path);
                }
                FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
                ok++;
                if (ok + fail == total) finish();
              };
              getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish(); };
            });
            transaction.onerror = onerror;
          };
          openRequest.onerror = onerror;
        }, mmapAlloc: function (size) {
          var alignedSize = alignMemory(size, 16384);
          var ptr = _malloc(alignedSize);
          while (size < alignedSize) HEAP8[ptr + size++] = 0;
          return ptr;
        }
      }; var SYSCALLS = {
        mappings: {}, DEFAULT_POLLMASK: 5, umask: 511, calculateAt: function (dirfd, path) {
          if (path[0] !== '/') {
            // relative path
            var dir;
            if (dirfd === -100) {
              dir = FS.cwd();
            } else {
              var dirstream = FS.getStream(dirfd);
              if (!dirstream) throw new FS.ErrnoError(8);
              dir = dirstream.path;
            }
            path = PATH.join2(dir, path);
          }
          return path;
        }, doStat: function (func, path, buf) {
          try {
            var stat = func(path);
          } catch (e) {
            if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
              // an error occurred while trying to look up the path; we should just report ENOTDIR
              return -54;
            }
            throw e;
          }
          HEAP32[((buf) >> 2)] = stat.dev;
          HEAP32[(((buf) + (4)) >> 2)] = 0;
          HEAP32[(((buf) + (8)) >> 2)] = stat.ino;
          HEAP32[(((buf) + (12)) >> 2)] = stat.mode;
          HEAP32[(((buf) + (16)) >> 2)] = stat.nlink;
          HEAP32[(((buf) + (20)) >> 2)] = stat.uid;
          HEAP32[(((buf) + (24)) >> 2)] = stat.gid;
          HEAP32[(((buf) + (28)) >> 2)] = stat.rdev;
          HEAP32[(((buf) + (32)) >> 2)] = 0;
          (tempI64 = [stat.size >>> 0, (tempDouble = stat.size, (+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble) / 4294967296.0))), 4294967295.0)) | 0) >>> 0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296.0))))) >>> 0) : 0)], HEAP32[(((buf) + (40)) >> 2)] = tempI64[0], HEAP32[(((buf) + (44)) >> 2)] = tempI64[1]);
          HEAP32[(((buf) + (48)) >> 2)] = 4096;
          HEAP32[(((buf) + (52)) >> 2)] = stat.blocks;
          HEAP32[(((buf) + (56)) >> 2)] = (stat.atime.getTime() / 1000) | 0;
          HEAP32[(((buf) + (60)) >> 2)] = 0;
          HEAP32[(((buf) + (64)) >> 2)] = (stat.mtime.getTime() / 1000) | 0;
          HEAP32[(((buf) + (68)) >> 2)] = 0;
          HEAP32[(((buf) + (72)) >> 2)] = (stat.ctime.getTime() / 1000) | 0;
          HEAP32[(((buf) + (76)) >> 2)] = 0;
          (tempI64 = [stat.ino >>> 0, (tempDouble = stat.ino, (+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble) / 4294967296.0))), 4294967295.0)) | 0) >>> 0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296.0))))) >>> 0) : 0)], HEAP32[(((buf) + (80)) >> 2)] = tempI64[0], HEAP32[(((buf) + (84)) >> 2)] = tempI64[1]);
          return 0;
        }, doMsync: function (addr, stream, len, flags, offset) {
          var buffer = HEAPU8.slice(addr, addr + len);
          FS.msync(stream, buffer, offset, len, flags);
        }, doMkdir: function (path, mode) {
          // remove a trailing slash, if one - /a/b/ has basename of '', but
          // we want to create b in the context of this function
          path = PATH.normalize(path);
          if (path[path.length - 1] === '/') path = path.substr(0, path.length - 1);
          FS.mkdir(path, mode, 0);
          return 0;
        }, doMknod: function (path, mode, dev) {
          // we don't want this in the JS API as it uses mknod to create all nodes.
          switch (mode & 61440) {
            case 32768:
            case 8192:
            case 24576:
            case 4096:
            case 49152:
              break;
            default: return -28;
          }
          FS.mknod(path, mode, dev);
          return 0;
        }, doReadlink: function (path, buf, bufsize) {
          if (bufsize <= 0) return -28;
          var ret = FS.readlink(path);

          var len = Math.min(bufsize, lengthBytesUTF8(ret));
          var endChar = HEAP8[buf + len];
          stringToUTF8(ret, buf, bufsize + 1);
          // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
          // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
          HEAP8[buf + len] = endChar;

          return len;
        }, doAccess: function (path, amode) {
          if (amode & ~7) {
            // need a valid mode
            return -28;
          }
          var node;
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
          if (!node) {
            return -44;
          }
          var perms = '';
          if (amode & 4) perms += 'r';
          if (amode & 2) perms += 'w';
          if (amode & 1) perms += 'x';
          if (perms /* otherwise, they've just passed F_OK */ && FS.nodePermissions(node, perms)) {
            return -2;
          }
          return 0;
        }, doDup: function (path, flags, suggestFD) {
          var suggest = FS.getStream(suggestFD);
          if (suggest) FS.close(suggest);
          return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
        }, doReadv: function (stream, iov, iovcnt, offset) {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAP32[(((iov) + (i * 8)) >> 2)];
            var len = HEAP32[(((iov) + (i * 8 + 4)) >> 2)];
            var curr = FS.read(stream, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
            if (curr < len) break; // nothing more to read
          }
          return ret;
        }, doWritev: function (stream, iov, iovcnt, offset) {
          var ret = 0;
          for (var i = 0; i < iovcnt; i++) {
            var ptr = HEAP32[(((iov) + (i * 8)) >> 2)];
            var len = HEAP32[(((iov) + (i * 8 + 4)) >> 2)];
            var curr = FS.write(stream, HEAP8, ptr, len, offset);
            if (curr < 0) return -1;
            ret += curr;
          }
          return ret;
        }, varargs: undefined, get: function () {
          assert(SYSCALLS.varargs != undefined);
          SYSCALLS.varargs += 4;
          var ret = HEAP32[(((SYSCALLS.varargs) - (4)) >> 2)];
          return ret;
        }, getStr: function (ptr) {
          var ret = UTF8ToString(ptr);
          return ret;
        }, getStreamFromFD: function (fd) {
          var stream = FS.getStream(fd);
          if (!stream) throw new FS.ErrnoError(8);
          return stream;
        }, get64: function (low, high) {
          if (low >= 0) assert(high === 0);
          else assert(high === -1);
          return low;
        }
      }; function _fd_close(fd) {
        try {

          var stream = SYSCALLS.getStreamFromFD(fd);
          FS.close(stream);
          return 0;
        } catch (e) {
          if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
          return e.errno;
        }
      }

      function _fd_read(fd, iov, iovcnt, pnum) {
        try {

          var stream = SYSCALLS.getStreamFromFD(fd);
          var num = SYSCALLS.doReadv(stream, iov, iovcnt);
          HEAP32[((pnum) >> 2)] = num;
          return 0;
        } catch (e) {
          if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
          return e.errno;
        }
      }

      function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
        try {


          var stream = SYSCALLS.getStreamFromFD(fd);
          var HIGH_OFFSET = 0x100000000; // 2^32
          // use an unsigned operator on low and shift high by 32-bits
          var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);

          var DOUBLE_LIMIT = 0x20000000000000; // 2^53
          // we also check for equality since DOUBLE_LIMIT + 1 == DOUBLE_LIMIT
          if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
            return -61;
          }

          FS.llseek(stream, offset, whence);
          (tempI64 = [stream.position >>> 0, (tempDouble = stream.position, (+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble) / 4294967296.0))), 4294967295.0)) | 0) >>> 0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble))) >>> 0)) / 4294967296.0))))) >>> 0) : 0)], HEAP32[((newOffset) >> 2)] = tempI64[0], HEAP32[(((newOffset) + (4)) >> 2)] = tempI64[1]);
          if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
          return 0;
        } catch (e) {
          if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
          return e.errno;
        }
      }

      function _fd_write(fd, iov, iovcnt, pnum) {
        try {

          var stream = SYSCALLS.getStreamFromFD(fd);
          var num = SYSCALLS.doWritev(stream, iov, iovcnt);
          HEAP32[((pnum) >> 2)] = num;
          return 0;
        } catch (e) {
          if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
          return e.errno;
        }
      }

      function _setTempRet0($i) {
      }
      var FSNode = /** @constructor */ function (parent, name, mode, rdev) {
        if (!parent) {
          parent = this;  // root node sets parent to itself
        }
        this.parent = parent;
        this.mount = parent.mount;
        this.mounted = null;
        this.id = FS.nextInode++;
        this.name = name;
        this.mode = mode;
        this.node_ops = {};
        this.stream_ops = {};
        this.rdev = rdev;
      };
      var readMode = 292/*292*/ | 73/*73*/;
      var writeMode = 146/*146*/;
      Object.defineProperties(FSNode.prototype, {
        read: {
          get: /** @this{FSNode} */function () {
            return (this.mode & readMode) === readMode;
          },
          set: /** @this{FSNode} */function (val) {
            val ? this.mode |= readMode : this.mode &= ~readMode;
          }
        },
        write: {
          get: /** @this{FSNode} */function () {
            return (this.mode & writeMode) === writeMode;
          },
          set: /** @this{FSNode} */function (val) {
            val ? this.mode |= writeMode : this.mode &= ~writeMode;
          }
        },
        isFolder: {
          get: /** @this{FSNode} */function () {
            return FS.isDir(this.mode);
          }
        },
        isDevice: {
          get: /** @this{FSNode} */function () {
            return FS.isChrdev(this.mode);
          }
        }
      });
      FS.FSNode = FSNode;
      FS.staticInit();


      /** @type {function(string, boolean=, number=)} */
      function intArrayFromString(stringy, dontAddNull, length) {
        var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
        var u8array = new Array(len);
        var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
        if (dontAddNull) u8array.length = numBytesWritten;
        return u8array;
      }

      function intArrayToString(array) {
        var ret = [];
        for (var i = 0; i < array.length; i++) {
          var chr = array[i];
          if (chr > 0xFF) {
            {
              assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
            }
            chr &= 0xFF;
          }
          ret.push(String.fromCharCode(chr));
        }
        return ret.join('');
      }


      // Copied from https://github.com/strophe/strophejs/blob/e06d027/src/polyfills.js#L149

      // This code was written by Tyler Akins and has been placed in the
      // public domain.  It would be nice if you left this header intact.
      // Base64 code from Tyler Akins -- http://rumkin.com

      /**
       * Decodes a base64 string.
       * @param {string} input The string to decode.
       */
      var decodeBase64 = typeof atob === 'function' ? atob : function (input) {
        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        var output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 !== 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 !== 64) {
            output = output + String.fromCharCode(chr3);
          }
        } while (i < input.length);
        return output;
      };

      // Converts a string of base64 into a byte array.
      // Throws error on invalid input.
      function intArrayFromBase64(s) {
        if (typeof ENVIRONMENT_IS_NODE === 'boolean' && ENVIRONMENT_IS_NODE) {
          var buf;
          try {
            // TODO: Update Node.js externs, Closure does not recognize the following Buffer.from()
            /**@suppress{checkTypes}*/
            buf = Buffer.from(s, 'base64');
          } catch (_) {
            buf = new Buffer(s, 'base64');
          }
          return new Uint8Array(buf['buffer'], buf['byteOffset'], buf['byteLength']);
        }

        try {
          var decoded = decodeBase64(s);
          var bytes = new Uint8Array(decoded.length);
          for (var i = 0; i < decoded.length; ++i) {
            bytes[i] = decoded.charCodeAt(i);
          }
          return bytes;
        } catch (_) {
          throw new Error('Converting base64 string to bytes failed.');
        }
      }

      // If filename is a base64 data URI, parses and returns data (Buffer on node,
      // Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
      function tryParseAsDataURI(filename) {
        if (!isDataURI(filename)) {
          return;
        }

        return intArrayFromBase64(filename.slice(dataURIPrefix.length));
      }


      var asmLibraryArg = { "__cxa_allocate_exception": ___cxa_allocate_exception, "__cxa_atexit": ___cxa_atexit, "__cxa_throw": ___cxa_throw, "abort": _abort, "emscripten_get_sbrk_ptr": _emscripten_get_sbrk_ptr, "emscripten_memcpy_big": _emscripten_memcpy_big, "emscripten_resize_heap": _emscripten_resize_heap, "fd_close": _fd_close, "fd_read": _fd_read, "fd_seek": _fd_seek, "fd_write": _fd_write, "memory": wasmMemory, "setTempRet0": _setTempRet0, "table": wasmTable };
      var asm = createWasm();
      /** @type {function(...*):?} */
      var ___wasm_call_ctors = Module["___wasm_call_ctors"] = createExportWrapper("__wasm_call_ctors");

      /** @type {function(...*):?} */
      var _fflush = Module["_fflush"] = createExportWrapper("fflush");

      /** @type {function(...*):?} */
      var _sizeOfsatelliteCatalog = Module["_sizeOfsatelliteCatalog"] = createExportWrapper("sizeOfsatelliteCatalog");

      /** @type {function(...*):?} */
      var _freePtr = Module["_freePtr"] = createExportWrapper("freePtr");

      /** @type {function(...*):?} */
      var _free = Module["_free"] = createExportWrapper("free");

      /** @type {function(...*):?} */
      var _deletePtr = Module["_deletePtr"] = createExportWrapper("deletePtr");

      /** @type {function(...*):?} */
      var _registerEntity = Module["_registerEntity"] = createExportWrapper("registerEntity");

      /** @type {function(...*):?} */
      var _registerEntityOMM = Module["_registerEntityOMM"] = createExportWrapper("registerEntityOMM");

      /** @type {function(...*):?} */
      var _removeEntity = Module["_removeEntity"] = createExportWrapper("removeEntity");

      /** @type {function(...*):?} */
      var _removeAll = Module["_removeAll"] = createExportWrapper("removeAll");

      /** @type {function(...*):?} */
      var _propagate = Module["_propagate"] = createExportWrapper("propagate");

      /** @type {function(...*):?} */
      var _malloc = Module["_malloc"] = createExportWrapper("malloc");

      /** @type {function(...*):?} */
      var _generateEphemeris = Module["_generateEphemeris"] = createExportWrapper("generateEphemeris");

      /** @type {function(...*):?} */
      var _getValue = Module["_getValue"] = createExportWrapper("getValue");

      /** @type {function(...*):?} */
      var _getValueInReferenceFrame = Module["_getValueInReferenceFrame"] = createExportWrapper("getValueInReferenceFrame");

      /** @type {function(...*):?} */
      var _getSatAzElRange = Module["_getSatAzElRange"] = createExportWrapper("getSatAzElRange");

      /** @type {function(...*):?} */
      var _getSatAzElRangeForInterval = Module["_getSatAzElRangeForInterval"] = createExportWrapper("getSatAzElRangeForInterval");

      /** @type {function(...*):?} */
      var _getSatAzElRangePositionForInterval = Module["_getSatAzElRangePositionForInterval"] = createExportWrapper("getSatAzElRangePositionForInterval");

      /** @type {function(...*):?} */
      var _describeObject = Module["_describeObject"] = createExportWrapper("describeObject");

      /** @type {function(...*):?} */
      var ___errno_location = Module["___errno_location"] = createExportWrapper("__errno_location");

      /** @type {function(...*):?} */
      var __get_tzname = Module["__get_tzname"] = createExportWrapper("_get_tzname");

      /** @type {function(...*):?} */
      var __get_daylight = Module["__get_daylight"] = createExportWrapper("_get_daylight");

      /** @type {function(...*):?} */
      var __get_timezone = Module["__get_timezone"] = createExportWrapper("_get_timezone");

      /** @type {function(...*):?} */
      var _setThrew = Module["_setThrew"] = createExportWrapper("setThrew");

      /** @type {function(...*):?} */
      var stackSave = Module["stackSave"] = createExportWrapper("stackSave");

      /** @type {function(...*):?} */
      var stackRestore = Module["stackRestore"] = createExportWrapper("stackRestore");

      /** @type {function(...*):?} */
      var stackAlloc = Module["stackAlloc"] = createExportWrapper("stackAlloc");

      /** @type {function(...*):?} */
      var dynCall_jiji = Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji");

      /** @type {function(...*):?} */
      var __growWasmMemory = Module["__growWasmMemory"] = createExportWrapper("__growWasmMemory");





      // === Auto-generated postamble setup entry stuff ===

      if (!Object.getOwnPropertyDescriptor(Module, "intArrayFromString")) Module["intArrayFromString"] = function () { abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "intArrayToString")) Module["intArrayToString"] = function () { abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      Module["ccall"] = ccall;
      Module["cwrap"] = cwrap;
      if (!Object.getOwnPropertyDescriptor(Module, "setValue")) Module["setValue"] = function () { abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "getValue")) Module["getValue"] = function () { abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "allocate")) Module["allocate"] = function () { abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "getMemory")) Module["getMemory"] = function () { abort("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF8ArrayToString")) Module["UTF8ArrayToString"] = function () { abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF8ToString")) Module["UTF8ToString"] = function () { abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8Array")) Module["stringToUTF8Array"] = function () { abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8")) Module["stringToUTF8"] = function () { abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF8")) Module["lengthBytesUTF8"] = function () { abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function () { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnPreRun")) Module["addOnPreRun"] = function () { abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnInit")) Module["addOnInit"] = function () { abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnPreMain")) Module["addOnPreMain"] = function () { abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnExit")) Module["addOnExit"] = function () { abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "addOnPostRun")) Module["addOnPostRun"] = function () { abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "writeStringToMemory")) Module["writeStringToMemory"] = function () { abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "writeArrayToMemory")) Module["writeArrayToMemory"] = function () { abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "writeAsciiToMemory")) Module["writeAsciiToMemory"] = function () { abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "addRunDependency")) Module["addRunDependency"] = function () { abort("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
      if (!Object.getOwnPropertyDescriptor(Module, "removeRunDependency")) Module["removeRunDependency"] = function () { abort("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createFolder")) Module["FS_createFolder"] = function () { abort("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createPath")) Module["FS_createPath"] = function () { abort("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createDataFile")) Module["FS_createDataFile"] = function () { abort("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createPreloadedFile")) Module["FS_createPreloadedFile"] = function () { abort("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createLazyFile")) Module["FS_createLazyFile"] = function () { abort("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createLink")) Module["FS_createLink"] = function () { abort("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_createDevice")) Module["FS_createDevice"] = function () { abort("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
      if (!Object.getOwnPropertyDescriptor(Module, "FS_unlink")) Module["FS_unlink"] = function () { abort("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you"); };
      if (!Object.getOwnPropertyDescriptor(Module, "dynamicAlloc")) Module["dynamicAlloc"] = function () { abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "loadDynamicLibrary")) Module["loadDynamicLibrary"] = function () { abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "loadWebAssemblyModule")) Module["loadWebAssemblyModule"] = function () { abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "getLEB")) Module["getLEB"] = function () { abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "getFunctionTables")) Module["getFunctionTables"] = function () { abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "alignFunctionTables")) Module["alignFunctionTables"] = function () { abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "registerFunctions")) Module["registerFunctions"] = function () { abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "addFunction")) Module["addFunction"] = function () { abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "removeFunction")) Module["removeFunction"] = function () { abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function () { abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "prettyPrint")) Module["prettyPrint"] = function () { abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "makeBigInt")) Module["makeBigInt"] = function () { abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function () { abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "getCompilerSetting")) Module["getCompilerSetting"] = function () { abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "print")) Module["print"] = function () { abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "printErr")) Module["printErr"] = function () { abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "getTempRet0")) Module["getTempRet0"] = function () { abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "setTempRet0")) Module["setTempRet0"] = function () { abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "callMain")) Module["callMain"] = function () { abort("'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "abort")) Module["abort"] = function () { abort("'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToNewUTF8")) Module["stringToNewUTF8"] = function () { abort("'stringToNewUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "emscripten_realloc_buffer")) Module["emscripten_realloc_buffer"] = function () { abort("'emscripten_realloc_buffer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "ENV")) Module["ENV"] = function () { abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_CODES")) Module["ERRNO_CODES"] = function () { abort("'ERRNO_CODES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_MESSAGES")) Module["ERRNO_MESSAGES"] = function () { abort("'ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "setErrNo")) Module["setErrNo"] = function () { abort("'setErrNo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "DNS")) Module["DNS"] = function () { abort("'DNS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "GAI_ERRNO_MESSAGES")) Module["GAI_ERRNO_MESSAGES"] = function () { abort("'GAI_ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "Protocols")) Module["Protocols"] = function () { abort("'Protocols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "Sockets")) Module["Sockets"] = function () { abort("'Sockets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "traverseStack")) Module["traverseStack"] = function () { abort("'traverseStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "UNWIND_CACHE")) Module["UNWIND_CACHE"] = function () { abort("'UNWIND_CACHE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "withBuiltinMalloc")) Module["withBuiltinMalloc"] = function () { abort("'withBuiltinMalloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgsArray")) Module["readAsmConstArgsArray"] = function () { abort("'readAsmConstArgsArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgs")) Module["readAsmConstArgs"] = function () { abort("'readAsmConstArgs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "mainThreadEM_ASM")) Module["mainThreadEM_ASM"] = function () { abort("'mainThreadEM_ASM' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "jstoi_q")) Module["jstoi_q"] = function () { abort("'jstoi_q' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "jstoi_s")) Module["jstoi_s"] = function () { abort("'jstoi_s' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "getExecutableName")) Module["getExecutableName"] = function () { abort("'getExecutableName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "listenOnce")) Module["listenOnce"] = function () { abort("'listenOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "autoResumeAudioContext")) Module["autoResumeAudioContext"] = function () { abort("'autoResumeAudioContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "dynCallLegacy")) Module["dynCallLegacy"] = function () { abort("'dynCallLegacy' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "getDynCaller")) Module["getDynCaller"] = function () { abort("'getDynCaller' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function () { abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "callRuntimeCallbacks")) Module["callRuntimeCallbacks"] = function () { abort("'callRuntimeCallbacks' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "abortStackOverflow")) Module["abortStackOverflow"] = function () { abort("'abortStackOverflow' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "reallyNegative")) Module["reallyNegative"] = function () { abort("'reallyNegative' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "unSign")) Module["unSign"] = function () { abort("'unSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "reSign")) Module["reSign"] = function () { abort("'reSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "formatString")) Module["formatString"] = function () { abort("'formatString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "PATH")) Module["PATH"] = function () { abort("'PATH' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "PATH_FS")) Module["PATH_FS"] = function () { abort("'PATH_FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "SYSCALLS")) Module["SYSCALLS"] = function () { abort("'SYSCALLS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "syscallMmap2")) Module["syscallMmap2"] = function () { abort("'syscallMmap2' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "syscallMunmap")) Module["syscallMunmap"] = function () { abort("'syscallMunmap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "JSEvents")) Module["JSEvents"] = function () { abort("'JSEvents' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "specialHTMLTargets")) Module["specialHTMLTargets"] = function () { abort("'specialHTMLTargets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "maybeCStringToJsString")) Module["maybeCStringToJsString"] = function () { abort("'maybeCStringToJsString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "findEventTarget")) Module["findEventTarget"] = function () { abort("'findEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "findCanvasEventTarget")) Module["findCanvasEventTarget"] = function () { abort("'findCanvasEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "polyfillSetImmediate")) Module["polyfillSetImmediate"] = function () { abort("'polyfillSetImmediate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "demangle")) Module["demangle"] = function () { abort("'demangle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "demangleAll")) Module["demangleAll"] = function () { abort("'demangleAll' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "jsStackTrace")) Module["jsStackTrace"] = function () { abort("'jsStackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function () { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "getEnvStrings")) Module["getEnvStrings"] = function () { abort("'getEnvStrings' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "checkWasiClock")) Module["checkWasiClock"] = function () { abort("'checkWasiClock' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64")) Module["writeI53ToI64"] = function () { abort("'writeI53ToI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Clamped")) Module["writeI53ToI64Clamped"] = function () { abort("'writeI53ToI64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Signaling")) Module["writeI53ToI64Signaling"] = function () { abort("'writeI53ToI64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Clamped")) Module["writeI53ToU64Clamped"] = function () { abort("'writeI53ToU64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Signaling")) Module["writeI53ToU64Signaling"] = function () { abort("'writeI53ToU64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "readI53FromI64")) Module["readI53FromI64"] = function () { abort("'readI53FromI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "readI53FromU64")) Module["readI53FromU64"] = function () { abort("'readI53FromU64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "convertI32PairToI53")) Module["convertI32PairToI53"] = function () { abort("'convertI32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "convertU32PairToI53")) Module["convertU32PairToI53"] = function () { abort("'convertU32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "exceptionLast")) Module["exceptionLast"] = function () { abort("'exceptionLast' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "exceptionCaught")) Module["exceptionCaught"] = function () { abort("'exceptionCaught' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "exceptionThrowBuf")) Module["exceptionThrowBuf"] = function () { abort("'exceptionThrowBuf' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfoAttrs")) Module["ExceptionInfoAttrs"] = function () { abort("'ExceptionInfoAttrs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfo")) Module["ExceptionInfo"] = function () { abort("'ExceptionInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "CatchInfo")) Module["CatchInfo"] = function () { abort("'CatchInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "exception_addRef")) Module["exception_addRef"] = function () { abort("'exception_addRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "exception_decRef")) Module["exception_decRef"] = function () { abort("'exception_decRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "Browser")) Module["Browser"] = function () { abort("'Browser' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "funcWrappers")) Module["funcWrappers"] = function () { abort("'funcWrappers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function () { abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "setMainLoop")) Module["setMainLoop"] = function () { abort("'setMainLoop' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "FS")) Module["FS"] = function () { abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "MEMFS")) Module["MEMFS"] = function () { abort("'MEMFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "TTY")) Module["TTY"] = function () { abort("'TTY' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "PIPEFS")) Module["PIPEFS"] = function () { abort("'PIPEFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "SOCKFS")) Module["SOCKFS"] = function () { abort("'SOCKFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "tempFixedLengthArray")) Module["tempFixedLengthArray"] = function () { abort("'tempFixedLengthArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "miniTempWebGLFloatBuffers")) Module["miniTempWebGLFloatBuffers"] = function () { abort("'miniTempWebGLFloatBuffers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "heapObjectForWebGLType")) Module["heapObjectForWebGLType"] = function () { abort("'heapObjectForWebGLType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "heapAccessShiftForWebGLHeap")) Module["heapAccessShiftForWebGLHeap"] = function () { abort("'heapAccessShiftForWebGLHeap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "GL")) Module["GL"] = function () { abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGet")) Module["emscriptenWebGLGet"] = function () { abort("'emscriptenWebGLGet' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "computeUnpackAlignedImageSize")) Module["computeUnpackAlignedImageSize"] = function () { abort("'computeUnpackAlignedImageSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetTexPixelData")) Module["emscriptenWebGLGetTexPixelData"] = function () { abort("'emscriptenWebGLGetTexPixelData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetUniform")) Module["emscriptenWebGLGetUniform"] = function () { abort("'emscriptenWebGLGetUniform' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetVertexAttrib")) Module["emscriptenWebGLGetVertexAttrib"] = function () { abort("'emscriptenWebGLGetVertexAttrib' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "writeGLArray")) Module["writeGLArray"] = function () { abort("'writeGLArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "AL")) Module["AL"] = function () { abort("'AL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_unicode")) Module["SDL_unicode"] = function () { abort("'SDL_unicode' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_ttfContext")) Module["SDL_ttfContext"] = function () { abort("'SDL_ttfContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_audio")) Module["SDL_audio"] = function () { abort("'SDL_audio' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL")) Module["SDL"] = function () { abort("'SDL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "SDL_gfx")) Module["SDL_gfx"] = function () { abort("'SDL_gfx' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "GLUT")) Module["GLUT"] = function () { abort("'GLUT' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "EGL")) Module["EGL"] = function () { abort("'EGL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "GLFW_Window")) Module["GLFW_Window"] = function () { abort("'GLFW_Window' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "GLFW")) Module["GLFW"] = function () { abort("'GLFW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "GLEW")) Module["GLEW"] = function () { abort("'GLEW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "IDBStore")) Module["IDBStore"] = function () { abort("'IDBStore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "runAndAbortIfError")) Module["runAndAbortIfError"] = function () { abort("'runAndAbortIfError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "warnOnce")) Module["warnOnce"] = function () { abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "stackSave")) Module["stackSave"] = function () { abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "stackRestore")) Module["stackRestore"] = function () { abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "stackAlloc")) Module["stackAlloc"] = function () { abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "AsciiToString")) Module["AsciiToString"] = function () { abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToAscii")) Module["stringToAscii"] = function () { abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF16ToString")) Module["UTF16ToString"] = function () { abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF16")) Module["stringToUTF16"] = function () { abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF16")) Module["lengthBytesUTF16"] = function () { abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "UTF32ToString")) Module["UTF32ToString"] = function () { abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF32")) Module["stringToUTF32"] = function () { abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF32")) Module["lengthBytesUTF32"] = function () { abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8")) Module["allocateUTF8"] = function () { abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8OnStack")) Module["allocateUTF8OnStack"] = function () { abort("'allocateUTF8OnStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      Module["writeStackCookie"] = writeStackCookie;
      Module["checkStackCookie"] = checkStackCookie;
      if (!Object.getOwnPropertyDescriptor(Module, "intArrayFromBase64")) Module["intArrayFromBase64"] = function () { abort("'intArrayFromBase64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); };
      if (!Object.getOwnPropertyDescriptor(Module, "tryParseAsDataURI")) Module["tryParseAsDataURI"] = function () { abort("'tryParseAsDataURI' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); }; if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NORMAL")) Object.defineProperty(Module, "ALLOC_NORMAL", { configurable: true, get: function () { abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); } });
      if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_STACK")) Object.defineProperty(Module, "ALLOC_STACK", { configurable: true, get: function () { abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); } });
      if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_DYNAMIC")) Object.defineProperty(Module, "ALLOC_DYNAMIC", { configurable: true, get: function () { abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); } });
      if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NONE")) Object.defineProperty(Module, "ALLOC_NONE", { configurable: true, get: function () { abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)"); } });


      var calledRun;

      /**
       * @constructor
       * @this {ExitStatus}
       */
      function ExitStatus(status) {
        this.name = "ExitStatus";
        this.message = "Program terminated with exit(" + status + ")";
        this.status = status;
      }


      dependenciesFulfilled = function runCaller() {
        // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
        if (!calledRun) run();
        if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
      };





      /** @type {function(Array=)} */
      function run(args) {

        if (runDependencies > 0) {
          return;
        }

        writeStackCookie();

        preRun();

        if (runDependencies > 0) return; // a preRun added a dependency, run will be called later

        function doRun() {
          // run may have just been called through dependencies being fulfilled just in this very frame,
          // or while the async setStatus time below was happening
          if (calledRun) return;
          calledRun = true;
          Module['calledRun'] = true;

          if (ABORT) return;

          initRuntime();

          preMain();

          readyPromiseResolve(Module);
          if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

          assert(!Module['_main'], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');

          postRun();
        }

        if (Module['setStatus']) {
          Module['setStatus']('Running...');
          setTimeout(function () {
            setTimeout(function () {
              Module['setStatus']('');
            }, 1);
            doRun();
          }, 1);
        } else {
          doRun();
        }
        checkStackCookie();
      }
      Module['run'] = run;

      if (Module['preInit']) {
        if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
        while (Module['preInit'].length > 0) {
          Module['preInit'].pop()();
        }
      }


      noExitRuntime = true;

      run();






      // {{MODULE_ADDITIONS}}





      return Module.ready
    }
  );
})();

var sgp4module = Module().then(wasmModule => {

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
    methods[key] = (wrapping[key].params) ? wasmModule["cwrap"](key, wrapping[key].rval, wrapping[key].params) : wasmModule["cwrap"](key, wrapping[key].rval);
  });
  return { methods, wasmModule };
});

let runTest = async () => {
  let OMMS = {
    xml: await readOMMXML(
      fs.readFileSync("./test/data/spacedatastandards/omm.xml"),
      schema
    ),
    csv: await readOMMCSV(
      fs.readFileSync("./test/data/spacedatastandards/omm.csv", {
        encoding: "utf8",
      }),
      schema
    ),
    json: readOMMJSON(
      fs.readFileSync("./test/data/spacedatastandards/omm.json", {
        encoding: "utf8",
      }),
      schema
    ),
    fb: readFB(
      fs.readFileSync("./test/data/spacedatastandards/omm.fbs"),
      schema,
      OMM,
      OMMCOLLECTION
    ),
  };

  let LEGACY = await readTLE(
    fs.createReadStream("./test/data/spacedatastandards/3le.txt", {
      encoding: "utf8",
    }));
  LEGACY.tle = LEGACY.results;

  let { methods, wasmModule } = await sgp4module;

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
  } = methods;

  let {
    freePtr,
    free,
    deletePtr,
    malloc,
    HEAP8,
    HEAPU8,
    stackAlloc,
  } = wasmModule;

  const registerOMM = (jsonOMM) =>
    registerEntityOMM(
      null, //jsonOMM.OBJECT_ID,
      jsonOMM.EPOCH,
      jsonOMM.MEAN_MOTION,
      jsonOMM.ECCENTRICITY,
      jsonOMM.INCLINATION,
      jsonOMM.RA_OF_ASC_NODE,
      null, //jsonOMM.ARG_OF_PERICENTER,
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
  tape("Deserialization Test", function (t) {
    t.plan(1);

    let equal = true;
    for (let i = 0; i < LEGACY.tle.length; i++) {
      let tle = LEGACY.raw[i].slice(-2);
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
              OMMS[sFormat][i][prop]
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

      let epoch = new Date(jsonOMM.EPOCH).getTime();

      let flatArray = new Float64Array(
        HEAP8.buffer,
        getValueInReferenceFrame(
          pointer,
          epoch,
          true, //convert in Cesium
          true
        ), // Choice of reference frames for velocity
        3
      );

      for (let sFormat in sPointers) {
        sPointers[sFormat] = new Float64Array(
          HEAP8.buffer,
          getValueInReferenceFrame(
            sPointers[sFormat],
            epoch,
            true, //convert in Cesium
            true
          ), // Choice of reference frames for velocity
          3
        );
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

  tape("Size Prefixed File I/O Test", function (t) {
    t.plan(1);

    fs.writeFileSync(
      "./test/data/spacedatastandards/omm.sizePrefixed.fbs",
      writeFB(
        LEGACY.tle.map((_omm) => {
          _omm.USER_DEFINED_OBJECT_DESIGNATOR =
            new Date().toISOString() +
            new Array(Math.floor(Math.random() * 100)).join("+");
          return _omm;
        }),
        schema,
        OMM
      )
    );

    let readOMM = readFB(
      "./test/data/spacedatastandards/omm.sizePrefixed.fbs",
      schema,
      OMM
    );

    t.equal(
      LEGACY.tle.map((_omm) => _omm.NORAD_CAT_ID).join(""),
      readOMM.map((n) => n.NORAD_CAT_ID).join("")
    );
  });
};

runTest();
