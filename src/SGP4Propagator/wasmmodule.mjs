
var Module = (function() {
  var _scriptDir = import.meta.url;
  
  return (
function(Module) {
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
Module['ready'] = new Promise(function(resolve, reject) {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_sizeOfsatelliteCatalog')) {
        Object.defineProperty(Module['ready'], '_sizeOfsatelliteCatalog', { configurable: true, get: function() { abort('You are getting _sizeOfsatelliteCatalog on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_sizeOfsatelliteCatalog', { configurable: true, set: function() { abort('You are setting _sizeOfsatelliteCatalog on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_generateEphemeris')) {
        Object.defineProperty(Module['ready'], '_generateEphemeris', { configurable: true, get: function() { abort('You are getting _generateEphemeris on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_generateEphemeris', { configurable: true, set: function() { abort('You are setting _generateEphemeris on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_registerEntity')) {
        Object.defineProperty(Module['ready'], '_registerEntity', { configurable: true, get: function() { abort('You are getting _registerEntity on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_registerEntity', { configurable: true, set: function() { abort('You are setting _registerEntity on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_registerEntityOMM')) {
        Object.defineProperty(Module['ready'], '_registerEntityOMM', { configurable: true, get: function() { abort('You are getting _registerEntityOMM on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_registerEntityOMM', { configurable: true, set: function() { abort('You are setting _registerEntityOMM on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_propagate')) {
        Object.defineProperty(Module['ready'], '_propagate', { configurable: true, get: function() { abort('You are getting _propagate on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_propagate', { configurable: true, set: function() { abort('You are setting _propagate on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_describeObject')) {
        Object.defineProperty(Module['ready'], '_describeObject', { configurable: true, get: function() { abort('You are getting _describeObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_describeObject', { configurable: true, set: function() { abort('You are setting _describeObject on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_getValue')) {
        Object.defineProperty(Module['ready'], '_getValue', { configurable: true, get: function() { abort('You are getting _getValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_getValue', { configurable: true, set: function() { abort('You are setting _getValue on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_getValueInReferenceFrame')) {
        Object.defineProperty(Module['ready'], '_getValueInReferenceFrame', { configurable: true, get: function() { abort('You are getting _getValueInReferenceFrame on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_getValueInReferenceFrame', { configurable: true, set: function() { abort('You are setting _getValueInReferenceFrame on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_free')) {
        Object.defineProperty(Module['ready'], '_free', { configurable: true, get: function() { abort('You are getting _free on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_free', { configurable: true, set: function() { abort('You are setting _free on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_freePtr')) {
        Object.defineProperty(Module['ready'], '_freePtr', { configurable: true, get: function() { abort('You are getting _freePtr on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_freePtr', { configurable: true, set: function() { abort('You are setting _freePtr on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_deletePtr')) {
        Object.defineProperty(Module['ready'], '_deletePtr', { configurable: true, get: function() { abort('You are getting _deletePtr on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_deletePtr', { configurable: true, set: function() { abort('You are setting _deletePtr on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_removeAll')) {
        Object.defineProperty(Module['ready'], '_removeAll', { configurable: true, get: function() { abort('You are getting _removeAll on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_removeAll', { configurable: true, set: function() { abort('You are setting _removeAll on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_removeEntity')) {
        Object.defineProperty(Module['ready'], '_removeEntity', { configurable: true, get: function() { abort('You are getting _removeEntity on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_removeEntity', { configurable: true, set: function() { abort('You are setting _removeEntity on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_getSatAzElRange')) {
        Object.defineProperty(Module['ready'], '_getSatAzElRange', { configurable: true, get: function() { abort('You are getting _getSatAzElRange on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_getSatAzElRange', { configurable: true, set: function() { abort('You are setting _getSatAzElRange on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_getSatAzElRangeForInterval')) {
        Object.defineProperty(Module['ready'], '_getSatAzElRangeForInterval', { configurable: true, get: function() { abort('You are getting _getSatAzElRangeForInterval on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_getSatAzElRangeForInterval', { configurable: true, set: function() { abort('You are setting _getSatAzElRangeForInterval on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_getSatAzElRangePositionForInterval')) {
        Object.defineProperty(Module['ready'], '_getSatAzElRangePositionForInterval', { configurable: true, get: function() { abort('You are getting _getSatAzElRangePositionForInterval on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_getSatAzElRangePositionForInterval', { configurable: true, set: function() { abort('You are setting _getSatAzElRangePositionForInterval on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_malloc')) {
        Object.defineProperty(Module['ready'], '_malloc', { configurable: true, get: function() { abort('You are getting _malloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_malloc', { configurable: true, set: function() { abort('You are setting _malloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_stackSave')) {
        Object.defineProperty(Module['ready'], '_stackSave', { configurable: true, get: function() { abort('You are getting _stackSave on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_stackSave', { configurable: true, set: function() { abort('You are setting _stackSave on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_stackRestore')) {
        Object.defineProperty(Module['ready'], '_stackRestore', { configurable: true, get: function() { abort('You are getting _stackRestore on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_stackRestore', { configurable: true, set: function() { abort('You are setting _stackRestore on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_stackAlloc')) {
        Object.defineProperty(Module['ready'], '_stackAlloc', { configurable: true, get: function() { abort('You are getting _stackAlloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_stackAlloc', { configurable: true, set: function() { abort('You are setting _stackAlloc on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '___data_end')) {
        Object.defineProperty(Module['ready'], '___data_end', { configurable: true, get: function() { abort('You are getting ___data_end on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '___data_end', { configurable: true, set: function() { abort('You are setting ___data_end on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '___wasm_call_ctors')) {
        Object.defineProperty(Module['ready'], '___wasm_call_ctors', { configurable: true, get: function() { abort('You are getting ___wasm_call_ctors on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '___wasm_call_ctors', { configurable: true, set: function() { abort('You are setting ___wasm_call_ctors on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_fflush')) {
        Object.defineProperty(Module['ready'], '_fflush', { configurable: true, get: function() { abort('You are getting _fflush on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_fflush', { configurable: true, set: function() { abort('You are setting _fflush on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '___errno_location')) {
        Object.defineProperty(Module['ready'], '___errno_location', { configurable: true, get: function() { abort('You are getting ___errno_location on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '___errno_location', { configurable: true, set: function() { abort('You are setting ___errno_location on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '_setThrew')) {
        Object.defineProperty(Module['ready'], '_setThrew', { configurable: true, get: function() { abort('You are getting _setThrew on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '_setThrew', { configurable: true, set: function() { abort('You are setting _setThrew on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '__get_tzname')) {
        Object.defineProperty(Module['ready'], '__get_tzname', { configurable: true, get: function() { abort('You are getting __get_tzname on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '__get_tzname', { configurable: true, set: function() { abort('You are setting __get_tzname on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '__get_daylight')) {
        Object.defineProperty(Module['ready'], '__get_daylight', { configurable: true, get: function() { abort('You are getting __get_daylight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '__get_daylight', { configurable: true, set: function() { abort('You are setting __get_daylight on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], '__get_timezone')) {
        Object.defineProperty(Module['ready'], '__get_timezone', { configurable: true, get: function() { abort('You are getting __get_timezone on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], '__get_timezone', { configurable: true, set: function() { abort('You are setting __get_timezone on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
      }
    

      if (!Object.getOwnPropertyDescriptor(Module['ready'], 'onRuntimeInitialized')) {
        Object.defineProperty(Module['ready'], 'onRuntimeInitialized', { configurable: true, get: function() { abort('You are getting onRuntimeInitialized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
        Object.defineProperty(Module['ready'], 'onRuntimeInitialized', { configurable: true, set: function() { abort('You are setting onRuntimeInitialized on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js') } });
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
var quit_ = function(status, toThrow) {
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
    readAsync,
    readBinary,
    setWindowTitle;

var nodeFS;
var nodePath;

if (ENVIRONMENT_IS_NODE) {
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = require('path').dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory =  + '/';
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

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  process['on']('unhandledRejection', abort);

  quit_ = function(status) {
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
    quit_ = function(status) {
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
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/')+1);
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

  readAsync = function readAsync(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      var data = tryParseAsDataURI(url);
      if (data) {
        onload(data.buffer);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };




  }

  setWindowTitle = function(title) { document.title = title };
} else
{
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
if (Module['arguments']) arguments_ = Module['arguments'];if (!Object.getOwnPropertyDescriptor(Module, 'arguments')) Object.defineProperty(Module, 'arguments', { configurable: true, get: function() { abort('Module.arguments has been replaced with plain arguments_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
if (Module['thisProgram']) thisProgram = Module['thisProgram'];if (!Object.getOwnPropertyDescriptor(Module, 'thisProgram')) Object.defineProperty(Module, 'thisProgram', { configurable: true, get: function() { abort('Module.thisProgram has been replaced with plain thisProgram (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
if (Module['quit']) quit_ = Module['quit'];if (!Object.getOwnPropertyDescriptor(Module, 'quit')) Object.defineProperty(Module, 'quit', { configurable: true, get: function() { abort('Module.quit has been replaced with plain quit_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });

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
if (!Object.getOwnPropertyDescriptor(Module, 'read')) Object.defineProperty(Module, 'read', { configurable: true, get: function() { abort('Module.read has been replaced with plain read_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
if (!Object.getOwnPropertyDescriptor(Module, 'readAsync')) Object.defineProperty(Module, 'readAsync', { configurable: true, get: function() { abort('Module.readAsync has been replaced with plain readAsync (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
if (!Object.getOwnPropertyDescriptor(Module, 'readBinary')) Object.defineProperty(Module, 'readBinary', { configurable: true, get: function() { abort('Module.readBinary has been replaced with plain readBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
if (!Object.getOwnPropertyDescriptor(Module, 'setWindowTitle')) Object.defineProperty(Module, 'setWindowTitle', { configurable: true, get: function() { abort('Module.setWindowTitle has been replaced with plain setWindowTitle (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';






// {{PREAMBLE_ADDITIONS}}

var STACK_ALIGN = 16;

function dynamicAlloc(size) {
  assert(DYNAMICTOP_PTR);
  var ret = HEAP32[DYNAMICTOP_PTR>>2];
  var end = (ret + size + 15) & -16;
  assert(end <= HEAP8.length, 'failure to dynamicAlloc - memory growth etc. is not supported there, call malloc/sbrk directly');
  HEAP32[DYNAMICTOP_PTR>>2] = end;
  return ret;
}

function alignMemory(size, factor) {
  if (!factor) factor = STACK_ALIGN; // stack alignment (16-byte) by default
  return Math.ceil(size / factor) * factor;
}

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length-1] === '*') {
        return 4; // A pointer
      } else if (type[0] === 'i') {
        var bits = Number(type.substr(1));
        assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
}





// Wraps a JS function as a wasm function with a given signature.
function convertJsFunctionToWasm(func, sig) {

  // If the type reflection proposal is available, use the new
  // "WebAssembly.Function" constructor.
  // Otherwise, construct a minimal wasm module importing the JS function and
  // re-exporting it.
  if (typeof WebAssembly.Function === "function") {
    var typeNames = {
      'i': 'i32',
      'j': 'i64',
      'f': 'f32',
      'd': 'f64'
    };
    var type = {
      parameters: [],
      results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
    };
    for (var i = 1; i < sig.length; ++i) {
      type.parameters.push(typeNames[sig[i]]);
    }
    return new WebAssembly.Function(type, func);
  }

  // The module is static, with the exception of the type section, which is
  // generated based on the signature passed in.
  var typeSection = [
    0x01, // id: section,
    0x00, // length: 0 (placeholder)
    0x01, // count: 1
    0x60, // form: func
  ];
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes = {
    'i': 0x7f, // i32
    'j': 0x7e, // i64
    'f': 0x7d, // f32
    'd': 0x7c, // f64
  };

  // Parameters, length + signatures
  typeSection.push(sigParam.length);
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]]);
  }

  // Return values, length + signatures
  // With no multi-return in MVP, either 0 (void) or 1 (anything else)
  if (sigRet == 'v') {
    typeSection.push(0x00);
  } else {
    typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
  }

  // Write the overall length of the type section back into the section header
  // (excepting the 2 bytes for the section id and length)
  typeSection[1] = typeSection.length - 2;

  // Rest of the module is static
  var bytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
    0x01, 0x00, 0x00, 0x00, // version: 1
  ].concat(typeSection, [
    0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
    0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00,
  ]));

   // We can compile this wasm module synchronously because it is very small.
  // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
  var module = new WebAssembly.Module(bytes);
  var instance = new WebAssembly.Instance(module, {
    'e': {
      'f': func
    }
  });
  var wrappedFunc = instance.exports['f'];
  return wrappedFunc;
}

var freeTableIndexes = [];

// Weak map of functions in the table to their indexes, created on first use.
var functionsInTableMap;

// Add a wasm function to the table.
function addFunctionWasm(func, sig) {
  var table = wasmTable;

  // Check if the function is already in the table, to ensure each function
  // gets a unique index. First, create the map if this is the first use.
  if (!functionsInTableMap) {
    functionsInTableMap = new WeakMap();
    for (var i = 0; i < table.length; i++) {
      var item = table.get(i);
      // Ignore null values.
      if (item) {
        functionsInTableMap.set(item, i);
      }
    }
  }
  if (functionsInTableMap.has(func)) {
    return functionsInTableMap.get(func);
  }

  // It's not in the table, add it now.


  var ret;
  // Reuse a free index if there is one, otherwise grow.
  if (freeTableIndexes.length) {
    ret = freeTableIndexes.pop();
  } else {
    ret = table.length;
    // Grow the table
    try {
      table.grow(1);
    } catch (err) {
      if (!(err instanceof RangeError)) {
        throw err;
      }
      throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.';
    }
  }

  // Set the new value.
  try {
    // Attempting to call this with JS function will cause of table.set() to fail
    table.set(ret, func);
  } catch (err) {
    if (!(err instanceof TypeError)) {
      throw err;
    }
    assert(typeof sig !== 'undefined', 'Missing signature argument to addFunction');
    var wrapped = convertJsFunctionToWasm(func, sig);
    table.set(ret, wrapped);
  }

  functionsInTableMap.set(func, ret);

  return ret;
}

function removeFunctionWasm(index) {
  functionsInTableMap.delete(wasmTable.get(index));
  freeTableIndexes.push(index);
}

// 'sig' parameter is required for the llvm backend but only when func is not
// already a WebAssembly function.
function addFunction(func, sig) {
  assert(typeof func !== 'undefined');

  return addFunctionWasm(func, sig);
}

function removeFunction(index) {
  removeFunctionWasm(index);
}









function makeBigInt(low, high, unsigned) {
  return unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0));
}

var tempRet0 = 0;

var setTempRet0 = function(value) {
  tempRet0 = value;
};

var getTempRet0 = function() {
  return tempRet0;
};

function getCompilerSetting(name) {
  throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for getCompilerSetting or emscripten_get_compiler_setting to work';
}

// The address globals begin at. Very low in memory, for code size and optimization opportunities.
// Above 0 is static memory, starting with globals.
// Then the stack.
// Then 'dynamic' memory for sbrk.
var GLOBAL_BASE = 1024;





// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html


var wasmBinary;if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];if (!Object.getOwnPropertyDescriptor(Module, 'wasmBinary')) Object.defineProperty(Module, 'wasmBinary', { configurable: true, get: function() { abort('Module.wasmBinary has been replaced with plain wasmBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
var noExitRuntime;if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime'];if (!Object.getOwnPropertyDescriptor(Module, 'noExitRuntime')) Object.defineProperty(Module, 'noExitRuntime', { configurable: true, get: function() { abort('Module.noExitRuntime has been replaced with plain noExitRuntime (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });


if (typeof WebAssembly !== 'object') {
  abort('no native wasm support detected');
}




// In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.
// In traditional runtime, setValue() and getValue() are always available (although their use is highly discouraged due to perf penalties)

/** @param {number} ptr
    @param {number} value
    @param {string} type
    @param {number|boolean=} noSafe */
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}

/** @param {number} ptr
    @param {string} type
    @param {number|boolean=} noSafe */
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for getValue: ' + type);
    }
  return null;
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

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS = 0;

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
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
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
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_DYNAMIC = 2; // Cannot be freed except through sbrk
var ALLOC_NONE = 3; // Do not allocate

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((TypedArray|Array<number>|number), string, number, number=)} */
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc,
    stackAlloc,
    dynamicAlloc][allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var stop;
    ptr = ret;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(/** @type {!Uint8Array} */ (slab), ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!runtimeInitialized) return dynamicAlloc(size);
  return _malloc(size);
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
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
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





// runtime_strings_extra.js: Strings related runtime functions that are available only in regular runtime.

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAPU8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;

function UTF16ToString(ptr, maxBytesToRead) {
  assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  var maxIdx = idx + maxBytesToRead / 2;
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var i = 0;

    var str = '';
    while (1) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0 || i == maxBytesToRead / 2) return str;
      ++i;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)]=codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr, maxBytesToRead) {
  assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
  var i = 0;

  var str = '';
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(i >= maxBytesToRead / 4)) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0) break;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
  return str;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)]=codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)]=0;
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Allocate stack space for a JS string, and write it there.
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated
    @param {boolean=} dontAddNull */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
  HEAP8.set(array, buffer);
}

/** @param {boolean=} dontAddNull */
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[((buffer++)>>0)]=str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)]=0;
}



// Memory management

var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
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

var STATIC_BASE = 1024,
    STACK_BASE = 5255008,
    STACKTOP = STACK_BASE,
    STACK_MAX = 12128,
    DYNAMIC_BASE = 5255008,
    DYNAMICTOP_PTR = 12112;

assert(STACK_BASE % 16 === 0, 'stack must start aligned');
assert(DYNAMIC_BASE % 16 === 0, 'heap must start aligned');


var TOTAL_STACK = 5242880;
if (Module['TOTAL_STACK']) assert(TOTAL_STACK === Module['TOTAL_STACK'], 'the stack size can no longer be determined at runtime')

var INITIAL_INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 25165824;if (!Object.getOwnPropertyDescriptor(Module, 'INITIAL_MEMORY')) Object.defineProperty(Module, 'INITIAL_MEMORY', { configurable: true, get: function() { abort('Module.INITIAL_MEMORY has been replaced with plain INITIAL_INITIAL_MEMORY (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });

assert(INITIAL_INITIAL_MEMORY >= TOTAL_STACK, 'INITIAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_INITIAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined,
       'JS engine does not provide full typed array support');








// In non-standalone/normal mode, we create the memory here.



// Create the main memory. (Note: this isn't used in STANDALONE_WASM mode since the wasm
// memory is created in the wasm, not in JS.)

  if (Module['wasmMemory']) {
    wasmMemory = Module['wasmMemory'];
  } else
  {
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

HEAP32[DYNAMICTOP_PTR>>2] = DYNAMIC_BASE;






// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  assert((STACK_MAX & 3) == 0);
  // The stack grows downwards
  HEAPU32[(STACK_MAX >> 2)+1] = 0x2135467;
  HEAPU32[(STACK_MAX >> 2)+2] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  // We don't do this with ASan because ASan does its own checks for this.
  HEAP32[0] = 0x63736d65; /* 'emsc' */
}

function checkStackCookie() {
  var cookie1 = HEAPU32[(STACK_MAX >> 2)+1];
  var cookie2 = HEAPU32[(STACK_MAX >> 2)+2];
  if (cookie1 != 0x2135467 || cookie2 != 0x89BACDFE) {
    abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x' + cookie2.toString(16) + ' ' + cookie1.toString(16));
  }
  // Also test the global address 0 for integrity.
  // We don't do this with ASan because ASan does its own checks for this.
  if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
}





// Endianness check (note: assumes compiler arch was little-endian)
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian!';
})();

function abortFnPtrError(ptr, sig) {
	abort("Invalid function pointer " + ptr + " called with signature '" + sig + "'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this). Build with ASSERTIONS=2 for more info.");
}



var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
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

function exitRuntime() {
  checkStackCookie();
  runtimeExited = true;
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

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
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
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_round = Math.round;
var Math_min = Math.min;
var Math_max = Math.max;
var Math_clz32 = Math.clz32;
var Math_trunc = Math.trunc;



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
      runDependencyWatcher = setInterval(function() {
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
  EXITSTATUS = 1;

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


var memoryInitializer = null;











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
  return function() {
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

var wasmBinaryFile = 'data:application/octet-stream;base64,AGFzbQEAAAABswU7YAF/AX9gAX8AYAJ/fwF/YAN/f38Bf2ACf38AYAN/f38AYAABf2AAAGABfAF8YAR/f39/AGAGf39/f39/AGAFf35+fn4AYAV/f39/fwBgBH9/f38Bf2AFf39/f38Bf2ADf35/AX5gAnx8AXxgBH9+fn8AYAZ/fH9/f38Bf2AFf3x8f38Bf2ABfAF+YAJ/fABgBHx8fHwAYAR/fH9/AX9gAn5/AX9gBH5+fn4Bf2ACfH8BfGADfHx/AXxgB39/f39/f38AYAl/f39/f39/f38AYAp/f39/f39/f39/AGAIf39/f398f38AYA5/f398fHx8fHx8fHx8fwBgA39/fgBgAn9+AGADf35+AGACf30AYAR/fH9/AGAHf3x/f39/fwBgJX98fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH9/f39/f39/f38AYAR8fHx/AGAWfHx8fHx8f39/f39/f39/f39/f39/fwBgWHx8fHx8fHx/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f38AYCh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx/f39/f39/AGBJfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/fwBgB39/f39/f38Bf2AHf39/fHx8fwF/YBZ/f3x8fHx8fHx/f39/fHx8fH98fHx/AX9gBH9+f38Bf2ADfn9/AX9gAn5+AX9gAnx/AX9gA3x/fwF/YAJ/fwF+YAR/f39+AX5gBH9/fn8BfmACfn4BfWABfwF8YAJ+fgF8AsICDQNlbnYYX19jeGFfYWxsb2NhdGVfZXhjZXB0aW9uAAADZW52C19fY3hhX3Rocm93AAUDZW52DF9fY3hhX2F0ZXhpdAADFndhc2lfc25hcHNob3RfcHJldmlldzEIZmRfY2xvc2UAABZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxB2ZkX3JlYWQADRZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX3dyaXRlAA0DZW52BWFib3J0AAcDZW52FmVtc2NyaXB0ZW5fcmVzaXplX2hlYXAAAANlbnYVZW1zY3JpcHRlbl9tZW1jcHlfYmlnAAMDZW52C3NldFRlbXBSZXQwAAEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQdmZF9zZWVrAA4DZW52Bm1lbW9yeQIBgAOAgAIDZW52BXRhYmxlAXAAIgPxAu8CBgcZGRERCwsLCxoyAwMAAwIAAQAGAQAEECQEBgYLFQQLODoDBQQ5EAECAgMBAgACAgAFBQQBAQggHSkICCorLCUDCBAnHgUmHwQAFQgoFhYHBwcHBwcBAAcBAwAFAAAAAAAAAAEAAAAEAAAABAUBAAAAAAAEBQAAAAAAAAADAAIAAAYAAQEICAcSLgEFAAAFAAAFAQAAAgMAAAUAAQAEAAAABQIAAwACAAIBLwEBAAACAAEBAgICAAABDAAAAgIAAgICBAECBQIEAgMAAgAABwc0AhMXFw0ICBMTBgYGDQEAAAAAAAAAAAAAAAAAGzMOCAgICBQIFAADAAMDBAADDwAAIgA2AAsRIwkKHDUDAAIhAwADAgUDGg4tBQAJMRgYDAISBBQDAgIGBgYGBgACAAcAAAQAAAAEBAQDBAAAAAAEBAQGBgMBCgYAAQAAAAABAAEAAQEBAQMDAAIKCQwFCQUJDAoAAQQADxsQNw4wAAYQAn8BQeDewAILfwBByN4ACweCBB4RX193YXNtX2NhbGxfY3RvcnMADAZmZmx1c2gAVRZzaXplT2ZzYXRlbGxpdGVDYXRhbG9nAI0BB2ZyZWVQdHIAjwEEZnJlZQDwAglkZWxldGVQdHIAkAEOcmVnaXN0ZXJFbnRpdHkAlQERcmVnaXN0ZXJFbnRpdHlPTU0AtgEMcmVtb3ZlRW50aXR5ALcBCXJlbW92ZUFsbADaAQlwcm9wYWdhdGUA3AEGbWFsbG9jAO8CEWdlbmVyYXRlRXBoZW1lcmlzAN4BCGdldFZhbHVlAN8BGGdldFZhbHVlSW5SZWZlcmVuY2VGcmFtZQDgAQ9nZXRTYXRBekVsUmFuZ2UA4QEaZ2V0U2F0QXpFbFJhbmdlRm9ySW50ZXJ2YWwA5AEiZ2V0U2F0QXpFbFJhbmdlUG9zaXRpb25Gb3JJbnRlcnZhbADlAQ5kZXNjcmliZU9iamVjdADmARBfX2Vycm5vX2xvY2F0aW9uALMCC19nZXRfdHpuYW1lALQCDV9nZXRfZGF5bGlnaHQAtQINX2dldF90aW1lem9uZQC2AghzZXRUaHJldwAiCXN0YWNrU2F2ZQAfDHN0YWNrUmVzdG9yZQAgCnN0YWNrQWxsb2MAIQpfX2RhdGFfZW5kAwEMZHluQ2FsbF9qaWppAPcCEF9fZ3Jvd1dhc21NZW1vcnkA+QIJRQEAQQELITlhZPAC7wKtAq4CoQKCAoMCigKwAokC1ALVAtYC2gLbAtwC3QLhAt4C3wLiAuYC6ALqAuAC7gLtAuwC8gLzAgqT1wfvAgYAQdDeAAsEABBcC+ABAgF/An5BASEEAkAgAEIAUiABQv///////////wCDIgVCgICAgICAwP//AFYgBUKAgICAgIDA//8AURsNACACQgBSIANC////////////AIMiBkKAgICAgIDA//8AViAGQoCAgICAgMD//wBRGw0AAkAgAiAAhCAGIAWEhFBFDQBBAA8LAkAgAyABg0IAUw0AQX8hBCAAIAJUIAEgA1MgASADURsNASAAIAKFIAEgA4WEQgBSDwtBfyEEIAAgAlYgASADVSABIANRGw0AIAAgAoUgASADhYRCAFIhBAsgBAvYAQIBfwJ+QX8hBAJAIABCAFIgAUL///////////8AgyIFQoCAgICAgMD//wBWIAVCgICAgICAwP//AFEbDQAgAkIAUiADQv///////////wCDIgZCgICAgICAwP//AFYgBkKAgICAgIDA//8AURsNAAJAIAIgAIQgBiAFhIRQRQ0AQQAPCwJAIAMgAYNCAFMNACAAIAJUIAEgA1MgASADURsNASAAIAKFIAEgA4WEQgBSDwsgACACViABIANVIAEgA1EbDQAgACAChSABIAOFhEIAUiEECyAEC1MBAX4CQAJAIANBwABxRQ0AIAEgA0FAaq2GIQJCACEBDAELIANFDQAgAUHAACADa62IIAIgA60iBIaEIQIgASAEhiEBCyAAIAE3AwAgACACNwMIC1MBAX4CQAJAIANBwABxRQ0AIAIgA0FAaq2IIQFCACECDAELIANFDQAgAkHAACADa62GIAEgA60iBIiEIQEgAiAEiCECCyAAIAE3AwAgACACNwMIC+ULAgV/D34jAEHgAGsiBSQAIAFCIIggAkIghoQhCiADQhGIIARCL4aEIQsgA0IxiCAEQv///////z+DIgxCD4aEIQ0gBCAChUKAgICAgICAgIB/gyEOIAJC////////P4MiD0IgiCEQIAxCEYghESAEQjCIp0H//wFxIQYCQAJAAkAgAkIwiKdB//8BcSIHQX9qQf3/AUsNAEEAIQggBkF/akH+/wFJDQELAkAgAVAgAkL///////////8AgyISQoCAgICAgMD//wBUIBJCgICAgICAwP//AFEbDQAgAkKAgICAgIAghCEODAILAkAgA1AgBEL///////////8AgyICQoCAgICAgMD//wBUIAJCgICAgICAwP//AFEbDQAgBEKAgICAgIAghCEOIAMhAQwCCwJAIAEgEkKAgICAgIDA//8AhYRCAFINAAJAIAMgAoRQRQ0AQoCAgICAgOD//wAhDkIAIQEMAwsgDkKAgICAgIDA//8AhCEOQgAhAQwCCwJAIAMgAkKAgICAgIDA//8AhYRCAFINACABIBKEIQJCACEBAkAgAlBFDQBCgICAgICA4P//ACEODAMLIA5CgICAgICAwP//AIQhDgwCCwJAIAEgEoRCAFINAEIAIQEMAgsCQCADIAKEQgBSDQBCACEBDAILQQAhCAJAIBJC////////P1YNACAFQdAAaiABIA8gASAPIA9QIggbeSAIQQZ0rXynIghBcWoQD0EQIAhrIQggBSkDUCIBQiCIIAVB2ABqKQMAIg9CIIaEIQogD0IgiCEQCyACQv///////z9WDQAgBUHAAGogAyAMIAMgDCAMUCIJG3kgCUEGdK18pyIJQXFqEA8gCCAJa0EQaiEIIAUpA0AiA0IxiCAFQcgAaikDACICQg+GhCENIANCEYggAkIvhoQhCyACQhGIIRELIAtC/////w+DIgIgAUL/////D4MiBH4iEyADQg+GQoCA/v8PgyIBIApC/////w+DIgN+fCIKQiCGIgwgASAEfnwiCyAMVK0gAiADfiIUIAEgD0L/////D4MiDH58IhIgDUL/////D4MiDyAEfnwiDSAKQiCIIAogE1StQiCGhHwiEyACIAx+IhUgASAQQoCABIQiCn58IhAgDyADfnwiFiARQv////8Hg0KAgICACIQiASAEfnwiEUIghnwiF3whBCAHIAZqIAhqQYGAf2ohBgJAAkAgDyAMfiIYIAIgCn58IgIgGFStIAIgASADfnwiAyACVK18IAMgEiAUVK0gDSASVK18fCICIANUrXwgASAKfnwgASAMfiIDIA8gCn58IgEgA1StQiCGIAFCIIiEfCACIAFCIIZ8IgEgAlStfCABIBFCIIggECAVVK0gFiAQVK18IBEgFlStfEIghoR8IgMgAVStfCADIBMgDVStIBcgE1StfHwiAiADVK18IgFCgICAgICAwACDUA0AIAZBAWohBgwBCyALQj+IIQMgAUIBhiACQj+IhCEBIARCP4ggAkIBhoQhAiALQgGGIQsgAyAEQgGGhCEECwJAIAZB//8BSA0AIA5CgICAgICAwP//AIQhDkIAIQEMAQsCQAJAIAZBAEoNAAJAQQEgBmsiB0GAAUkNAEIAIQEMAwsgBUEwaiALIAQgBkH/AGoiBhAPIAVBIGogAiABIAYQDyAFQRBqIAsgBCAHEBAgBSACIAEgBxAQIAUpAyAgBSkDEIQgBSkDMCAFQTBqQQhqKQMAhEIAUq2EIQsgBUEgakEIaikDACAFQRBqQQhqKQMAhCEEIAVBCGopAwAhASAFKQMAIQIMAQsgBq1CMIYgAUL///////8/g4QhAQsgASAOhCEOAkAgC1AgBEJ/VSAEQoCAgICAgICAgH9RGw0AIA4gAkIBfCIBIAJUrXwhDgwBCwJAIAsgBEKAgICAgICAgIB/hYRCAFENACACIQEMAQsgDiACIAJCAYN8IgEgAlStfCEOCyAAIAE3AwAgACAONwMIIAVB4ABqJAALdQEBfiAAIAQgAX4gAiADfnwgA0IgiCIEIAFCIIgiAn58IANC/////w+DIgMgAUL/////D4MiAX4iBUIgiCADIAJ+fCIDQiCIfCADQv////8PgyAEIAF+fCIDQiCIfDcDCCAAIANCIIYgBUL/////D4OENwMAC5MSAgV/DH4jAEHAAWsiBSQAIARC////////P4MhCiACQv///////z+DIQsgBCAChUKAgICAgICAgIB/gyEMIARCMIinQf//AXEhBgJAAkACQAJAIAJCMIinQf//AXEiB0F/akH9/wFLDQBBACEIIAZBf2pB/v8BSQ0BCwJAIAFQIAJC////////////AIMiDUKAgICAgIDA//8AVCANQoCAgICAgMD//wBRGw0AIAJCgICAgICAIIQhDAwCCwJAIANQIARC////////////AIMiAkKAgICAgIDA//8AVCACQoCAgICAgMD//wBRGw0AIARCgICAgICAIIQhDCADIQEMAgsCQCABIA1CgICAgICAwP//AIWEQgBSDQACQCADIAJCgICAgICAwP//AIWEUEUNAEIAIQFCgICAgICA4P//ACEMDAMLIAxCgICAgICAwP//AIQhDEIAIQEMAgsCQCADIAJCgICAgICAwP//AIWEQgBSDQBCACEBDAILIAEgDYRCAFENAgJAIAMgAoRCAFINACAMQoCAgICAgMD//wCEIQxCACEBDAILQQAhCAJAIA1C////////P1YNACAFQbABaiABIAsgASALIAtQIggbeSAIQQZ0rXynIghBcWoQD0EQIAhrIQggBUG4AWopAwAhCyAFKQOwASEBCyACQv///////z9WDQAgBUGgAWogAyAKIAMgCiAKUCIJG3kgCUEGdK18pyIJQXFqEA8gCSAIakFwaiEIIAVBqAFqKQMAIQogBSkDoAEhAwsgBUGQAWogA0IxiCAKQoCAgICAgMAAhCIOQg+GhCICQgBChMn5zr/mvIL1ACACfSIEQgAQEiAFQYABakIAIAVBkAFqQQhqKQMAfUIAIARCABASIAVB8ABqIAUpA4ABQj+IIAVBgAFqQQhqKQMAQgGGhCIEQgAgAkIAEBIgBUHgAGogBEIAQgAgBUHwAGpBCGopAwB9QgAQEiAFQdAAaiAFKQNgQj+IIAVB4ABqQQhqKQMAQgGGhCIEQgAgAkIAEBIgBUHAAGogBEIAQgAgBUHQAGpBCGopAwB9QgAQEiAFQTBqIAUpA0BCP4ggBUHAAGpBCGopAwBCAYaEIgRCACACQgAQEiAFQSBqIARCAEIAIAVBMGpBCGopAwB9QgAQEiAFQRBqIAUpAyBCP4ggBUEgakEIaikDAEIBhoQiBEIAIAJCABASIAUgBEIAQgAgBUEQakEIaikDAH1CABASIAggByAGa2ohBgJAAkBCACAFKQMAQj+IIAVBCGopAwBCAYaEQn98Ig1C/////w+DIgQgAkIgiCIPfiIQIA1CIIgiDSACQv////8PgyIRfnwiAkIgiCACIBBUrUIghoQgDSAPfnwgAkIghiIPIAQgEX58IgIgD1StfCACIAQgA0IRiEL/////D4MiEH4iESANIANCD4ZCgID+/w+DIhJ+fCIPQiCGIhMgBCASfnwgE1StIA9CIIggDyARVK1CIIaEIA0gEH58fHwiDyACVK18IA9CAFKtfH0iAkL/////D4MiECAEfiIRIBAgDX4iEiAEIAJCIIgiE358IgJCIIZ8IhAgEVStIAJCIIggAiASVK1CIIaEIA0gE358fCAQQgAgD30iAkIgiCIPIAR+IhEgAkL/////D4MiEiANfnwiAkIghiITIBIgBH58IBNUrSACQiCIIAIgEVStQiCGhCAPIA1+fHx8IgIgEFStfCACQn58IhEgAlStfEJ/fCIPQv////8PgyICIAFCPoggC0IChoRC/////w+DIgR+IhAgAUIeiEL/////D4MiDSAPQiCIIg9+fCISIBBUrSASIBFCIIgiECALQh6IQv//7/8Pg0KAgBCEIgt+fCITIBJUrXwgCyAPfnwgAiALfiIUIAQgD358IhIgFFStQiCGIBJCIIiEfCATIBJCIIZ8IhIgE1StfCASIBAgDX4iFCARQv////8PgyIRIAR+fCITIBRUrSATIAIgAUIChkL8////D4MiFH58IhUgE1StfHwiEyASVK18IBMgFCAPfiISIBEgC358Ig8gECAEfnwiBCACIA1+fCICQiCIIA8gElStIAQgD1StfCACIARUrXxCIIaEfCIPIBNUrXwgDyAVIBAgFH4iBCARIA1+fCINQiCIIA0gBFStQiCGhHwiBCAVVK0gBCACQiCGfCAEVK18fCIEIA9UrXwiAkL/////////AFYNACABQjGGIARC/////w+DIgEgA0L/////D4MiDX4iD0IAUq19QgAgD30iESAEQiCIIg8gDX4iEiABIANCIIgiEH58IgtCIIYiE1StfSAEIA5CIIh+IAMgAkIgiH58IAIgEH58IA8gCn58QiCGIAJC/////w+DIA1+IAEgCkL/////D4N+fCAPIBB+fCALQiCIIAsgElStQiCGhHx8fSENIBEgE30hASAGQX9qIQYMAQsgBEIhiCEQIAFCMIYgBEIBiCACQj+GhCIEQv////8PgyIBIANC/////w+DIg1+Ig9CAFKtfUIAIA99IgsgASADQiCIIg9+IhEgECACQh+GhCISQv////8PgyITIA1+fCIQQiCGIhRUrX0gBCAOQiCIfiADIAJCIYh+fCACQgGIIgIgD358IBIgCn58QiCGIBMgD34gAkL/////D4MgDX58IAEgCkL/////D4N+fCAQQiCIIBAgEVStQiCGhHx8fSENIAsgFH0hASACIQILAkAgBkGAgAFIDQAgDEKAgICAgIDA//8AhCEMQgAhAQwBCyAGQf//AGohBwJAIAZBgYB/Sg0AAkAgBw0AIAJC////////P4MgBCABQgGGIANWIA1CAYYgAUI/iIQiASAOViABIA5RG618IgEgBFStfCIDQoCAgICAgMAAg1ANACADIAyEIQwMAgtCACEBDAELIAetQjCGIAJC////////P4OEIAQgAUIBhiADWiANQgGGIAFCP4iEIgEgDlogASAOURutfCIBIARUrXwgDIQhDAsgACABNwMAIAAgDDcDCCAFQcABaiQADwsgAEIANwMAIABCgICAgICA4P//ACAMIAMgAoRQGzcDCCAFQcABaiQAC+QGAgV/BH4jAEGAAWsiBSQAAkACQAJAIAMgBEIAQgAQDUUNACADIAQQFiEGIAJCMIinIgdB//8BcSIIQf//AUYNACAGDQELIAVBEGogASACIAMgBBARIAUgBSkDECIEIAVBEGpBCGopAwAiAyAEIAMQEyAFQQhqKQMAIQIgBSkDACEEDAELAkAgASAIrUIwhiACQv///////z+DhCIKIAMgBEIwiKdB//8BcSIJrUIwhiAEQv///////z+DhCILEA1BAEoNAAJAIAEgCiADIAsQDUUNACABIQQMAgsgBUHwAGogASACQgBCABARIAVB+ABqKQMAIQIgBSkDcCEEDAELAkACQCAIRQ0AIAEhBAwBCyAFQeAAaiABIApCAEKAgICAgIDAu8AAEBEgBUHoAGopAwAiCkIwiKdBiH9qIQggBSkDYCEECwJAIAkNACAFQdAAaiADIAtCAEKAgICAgIDAu8AAEBEgBUHYAGopAwAiC0IwiKdBiH9qIQkgBSkDUCEDCyAKQv///////z+DQoCAgICAgMAAhCIKIAtC////////P4NCgICAgICAwACEIgx9IAQgA1StfSINQn9VIQYgBCADfSELAkAgCCAJTA0AA0ACQAJAIAZBAXFFDQACQCANIAuEQgBSDQAgBUEgaiABIAJCAEIAEBEgBUEoaikDACECIAUpAyAhBAwFCyALQj+IIQogDUIBhiENDAELIARCP4ghDSAKQgGGIQogBCELCyANIAqEIgogDH0gC0IBhiIEIANUrX0iDUJ/VSEGIAQgA30hCyAIQX9qIgggCUoNAAsgCSEICwJAIAZFDQAgDSEKIAshBCANIAuEQgBSDQAgBUEwaiABIAJCAEIAEBEgBUE4aikDACECIAUpAzAhBAwBCwJAIApC////////P1YNAANAIARCP4ghAyAIQX9qIQggBEIBhiEEIAMgCkIBhoQiCkKAgICAgIDAAFQNAAsLIAdBgIACcSEGAkAgCEEASg0AIAVBwABqIAQgCkL///////8/gyAIQfgAaiAGcq1CMIaEQgBCgICAgICAwMM/EBEgBUHIAGopAwAhAiAFKQNAIQQMAQsgCkL///////8/gyAIIAZyrUIwhoQhAgsgACAENwMAIAAgAjcDCCAFQYABaiQAC64BAAJAAkAgAUGACEgNACAARAAAAAAAAOB/oiEAAkAgAUH/D04NACABQYF4aiEBDAILIABEAAAAAAAA4H+iIQAgAUH9FyABQf0XSBtBgnBqIQEMAQsgAUGBeEoNACAARAAAAAAAABAAoiEAAkAgAUGDcEwNACABQf4HaiEBDAELIABEAAAAAAAAEACiIQAgAUGGaCABQYZoShtB/A9qIQELIAAgAUH/B2qtQjSGv6ILSwICfwF+IAFC////////P4MhBAJAAkAgAUIwiKdB//8BcSICQf//AUYNAEEEIQMgAg0BQQJBAyAEIACEUBsPCyAEIACEUCEDCyADC5IEAQN/AkAgAkGABEkNACAAIAEgAhAIGiAADwsgACACaiEDAkACQCABIABzQQNxDQACQAJAIAJBAU4NACAAIQIMAQsCQCAAQQNxDQAgACECDAELIAAhAgNAIAIgAS0AADoAACABQQFqIQEgAkEBaiICIANPDQEgAkEDcQ0ACwsCQCADQXxxIgRBwABJDQAgAiAEQUBqIgVLDQADQCACIAEoAgA2AgAgAiABKAIENgIEIAIgASgCCDYCCCACIAEoAgw2AgwgAiABKAIQNgIQIAIgASgCFDYCFCACIAEoAhg2AhggAiABKAIcNgIcIAIgASgCIDYCICACIAEoAiQ2AiQgAiABKAIoNgIoIAIgASgCLDYCLCACIAEoAjA2AjAgAiABKAI0NgI0IAIgASgCODYCOCACIAEoAjw2AjwgAUHAAGohASACQcAAaiICIAVNDQALCyACIARPDQEDQCACIAEoAgA2AgAgAUEEaiEBIAJBBGoiAiAESQ0ADAIACwALAkAgA0EETw0AIAAhAgwBCwJAIANBfGoiBCAATw0AIAAhAgwBCyAAIQIDQCACIAEtAAA6AAAgAiABLQABOgABIAIgAS0AAjoAAiACIAEtAAM6AAMgAUEEaiEBIAJBBGoiAiAETQ0ACwsCQCACIANPDQADQCACIAEtAAA6AAAgAUEBaiEBIAJBAWoiAiADRw0ACwsgAAvzAgIDfwF+AkAgAkUNACACIABqIgNBf2ogAToAACAAIAE6AAAgAkEDSQ0AIANBfmogAToAACAAIAE6AAEgA0F9aiABOgAAIAAgAToAAiACQQdJDQAgA0F8aiABOgAAIAAgAToAAyACQQlJDQAgAEEAIABrQQNxIgRqIgMgAUH/AXFBgYKECGwiATYCACADIAIgBGtBfHEiBGoiAkF8aiABNgIAIARBCUkNACADIAE2AgggAyABNgIEIAJBeGogATYCACACQXRqIAE2AgAgBEEZSQ0AIAMgATYCGCADIAE2AhQgAyABNgIQIAMgATYCDCACQXBqIAE2AgAgAkFsaiABNgIAIAJBaGogATYCACACQWRqIAE2AgAgBCADQQRxQRhyIgVrIgJBIEkNACABrSIGQiCGIAaEIQYgAyAFaiEBA0AgASAGNwMYIAEgBjcDECABIAY3AwggASAGNwMAIAFBIGohASACQWBqIgJBH0sNAAsLIAALXAEBfyAAIAAtAEoiAUF/aiABcjoASgJAIAAoAgAiAUEIcUUNACAAIAFBIHI2AgBBfw8LIABCADcCBCAAIAAoAiwiATYCHCAAIAE2AhQgACABIAAoAjBqNgIQQQALwwEBBH8CQAJAIAIoAhAiAw0AQQAhBCACEBkNASACKAIQIQMLAkAgAyACKAIUIgVrIAFPDQAgAiAAIAEgAigCJBEDAA8LQQAhBgJAIAIsAEtBAEgNACABIQQDQCAEIgNFDQEgACADQX9qIgRqLQAAQQpHDQALIAIgACADIAIoAiQRAwAiBCADSQ0BIAAgA2ohACABIANrIQEgAigCFCEFIAMhBgsgBSAAIAEQFxogAiACKAIUIAFqNgIUIAYgAWohBAsgBAssAQF/IwBBEGsiAiQAIAIgATYCDEEAKAKMPyAAIAEQhQIhASACQRBqJAAgAQsEAEEBCwIAC5wBAQN/IAAhAQJAAkAgAEEDcUUNAAJAIAAtAAANACAAIABrDwsgACEBA0AgAUEBaiIBQQNxRQ0BIAEtAABFDQIMAAALAAsDQCABIgJBBGohASACKAIAIgNBf3MgA0H//ft3anFBgIGChHhxRQ0ACwJAIANB/wFxDQAgAiAAaw8LA0AgAi0AASEDIAJBAWoiASECIAMNAAsLIAEgAGsLBAAjAAsGACAAJAALEgECfyMAIABrQXBxIgEkACABCx0AAkBBACgCgEMNAEEAIAE2AoRDQQAgADYCgEMLC7YEAgN/BH4CQAJAIAG9IgVCAYYiBlANACAFQv///////////wCDQoCAgICAgID4/wBWDQAgAL0iB0I0iKdB/w9xIgJB/w9HDQELIAAgAaIiASABow8LAkAgB0IBhiIIIAZYDQAgBUI0iKdB/w9xIQMCQAJAIAINAEEAIQICQCAHQgyGIgZCAFMNAANAIAJBf2ohAiAGQgGGIgZCf1UNAAsLIAdBASACa62GIQYMAQsgB0L/////////B4NCgICAgICAgAiEIQYLAkACQCADDQBBACEDAkAgBUIMhiIIQgBTDQADQCADQX9qIQMgCEIBhiIIQn9VDQALCyAFQQEgA2uthiEFDAELIAVC/////////weDQoCAgICAgIAIhCEFCyAGIAV9IghCf1UhBAJAIAIgA0wNAANAAkAgBEEBcUUNACAIIQYgCEIAUg0AIABEAAAAAAAAAACiDwsgBkIBhiIGIAV9IghCf1UhBCACQX9qIgIgA0oNAAsgAyECCwJAIARFDQAgCCEGIAhCAFINACAARAAAAAAAAAAAog8LAkACQCAGQv////////8HWA0AIAYhCAwBCwNAIAJBf2ohAiAGQoCAgICAgIAEVCEDIAZCAYYiCCEGIAMNAAsLIAdCgICAgICAgICAf4MhBgJAAkAgAkEBSA0AIAhCgICAgICAgHh8IAKtQjSGhCEIDAELIAhBASACa62IIQgLIAggBoS/DwsgAEQAAAAAAAAAAKIgACAIIAZRGwvgAQIDfwJ+IwBBEGsiAiQAAkACQCABvCIDQf////8HcSIEQYCAgHxqQf////cHSw0AIAStQhmGQoCAgICAgIDAP3whBUIAIQYMAQsCQCAEQYCAgPwHSQ0AIAOtQhmGQoCAgICAgMD//wCEIQVCACEGDAELAkAgBA0AQgAhBkIAIQUMAQsgAiAErUIAIARnIgRB0QBqEA8gAkEIaikDAEKAgICAgIDAAIVBif8AIARrrUIwhoQhBSACKQMAIQYLIAAgBjcDACAAIAUgA0GAgICAeHGtQiCGhDcDCCACQRBqJAALjAECAn8CfiMAQRBrIgIkAAJAAkAgAQ0AQgAhBEIAIQUMAQsgAiABIAFBH3UiA2ogA3MiA61CACADZyIDQdEAahAPIAJBCGopAwBCgICAgICAwACFQZ6AASADa61CMIZ8IAFBgICAgHhxrUIghoQhBSACKQMAIQQLIAAgBDcDACAAIAU3AwggAkEQaiQACwQAQQALBABBAAvvCgIEfwR+IwBB8ABrIgUkACAEQv///////////wCDIQkCQAJAAkAgAUJ/fCIKQn9RIAJC////////////AIMiCyAKIAFUrXxCf3wiCkL///////+///8AViAKQv///////7///wBRGw0AIANCf3wiCkJ/UiAJIAogA1StfEJ/fCIKQv///////7///wBUIApC////////v///AFEbDQELAkAgAVAgC0KAgICAgIDA//8AVCALQoCAgICAgMD//wBRGw0AIAJCgICAgICAIIQhBCABIQMMAgsCQCADUCAJQoCAgICAgMD//wBUIAlCgICAgICAwP//AFEbDQAgBEKAgICAgIAghCEEDAILAkAgASALQoCAgICAgMD//wCFhEIAUg0AQoCAgICAgOD//wAgAiADIAGFIAQgAoVCgICAgICAgICAf4WEUCIGGyEEQgAgASAGGyEDDAILIAMgCUKAgICAgIDA//8AhYRQDQECQCABIAuEQgBSDQAgAyAJhEIAUg0CIAMgAYMhAyAEIAKDIQQMAgsgAyAJhFBFDQAgASEDIAIhBAwBCyADIAEgAyABViAJIAtWIAkgC1EbIgcbIQkgBCACIAcbIgtC////////P4MhCiACIAQgBxsiAkIwiKdB//8BcSEIAkAgC0IwiKdB//8BcSIGDQAgBUHgAGogCSAKIAkgCiAKUCIGG3kgBkEGdK18pyIGQXFqEA9BECAGayEGIAVB6ABqKQMAIQogBSkDYCEJCyABIAMgBxshAyACQv///////z+DIQQCQCAIDQAgBUHQAGogAyAEIAMgBCAEUCIHG3kgB0EGdK18pyIHQXFqEA9BECAHayEIIAVB2ABqKQMAIQQgBSkDUCEDCyAEQgOGIANCPYiEQoCAgICAgIAEhCEEIApCA4YgCUI9iIQhASADQgOGIQMgCyAChSEKAkAgBiAIayIHRQ0AAkAgB0H/AE0NAEIAIQRCASEDDAELIAVBwABqIAMgBEGAASAHaxAPIAVBMGogAyAEIAcQECAFKQMwIAUpA0AgBUHAAGpBCGopAwCEQgBSrYQhAyAFQTBqQQhqKQMAIQQLIAFCgICAgICAgASEIQwgCUIDhiECAkACQCAKQn9VDQACQCACIAN9IgEgDCAEfSACIANUrX0iBIRQRQ0AQgAhA0IAIQQMAwsgBEL/////////A1YNASAFQSBqIAEgBCABIAQgBFAiBxt5IAdBBnStfKdBdGoiBxAPIAYgB2shBiAFQShqKQMAIQQgBSkDICEBDAELIAQgDHwgAyACfCIBIANUrXwiBEKAgICAgICACINQDQAgAUIBiCAEQj+GhCABQgGDhCEBIAZBAWohBiAEQgGIIQQLIAtCgICAgICAgICAf4MhAgJAIAZB//8BSA0AIAJCgICAgICAwP//AIQhBEIAIQMMAQtBACEHAkACQCAGQQBMDQAgBiEHDAELIAVBEGogASAEIAZB/wBqEA8gBSABIARBASAGaxAQIAUpAwAgBSkDECAFQRBqQQhqKQMAhEIAUq2EIQEgBUEIaikDACEECyABQgOIIARCPYaEIQMgBEIDiEL///////8/gyAChCAHrUIwhoQhBCABp0EHcSEGAkACQAJAAkACQBAmDgMAAQIDCyAEIAMgBkEES618IgEgA1StfCEEAkAgBkEERg0AIAEhAwwDCyAEIAFCAYMiAiABfCIDIAJUrXwhBAwDCyAEIAMgAkIAUiAGQQBHca18IgEgA1StfCEEIAEhAwwBCyAEIAMgAlAgBkEAR3GtfCIBIANUrXwhBCABIQMLIAZFDQELECcaCyAAIAM3AwAgACAENwMIIAVB8ABqJAALjQICAn8DfiMAQRBrIgIkAAJAAkAgAb0iBEL///////////8AgyIFQoCAgICAgIB4fEL/////////7/8AVg0AIAVCPIYhBiAFQgSIQoCAgICAgICAPHwhBQwBCwJAIAVCgICAgICAgPj/AFQNACAEQjyGIQYgBEIEiEKAgICAgIDA//8AhCEFDAELAkAgBVBFDQBCACEGQgAhBQwBCyACIAVCACAEp2dBIGogBUIgiKdnIAVCgICAgBBUGyIDQTFqEA8gAkEIaikDAEKAgICAgIDAAIVBjPgAIANrrUIwhoQhBSACKQMAIQYLIAAgBjcDACAAIAUgBEKAgICAgICAgIB/g4Q3AwggAkEQaiQAC3QCAX8CfiMAQRBrIgIkAAJAAkAgAQ0AQgAhA0IAIQQMAQsgAiABrUIAQfAAIAFnQR9zIgFrEA8gAkEIaikDAEKAgICAgIDAAIUgAUH//wBqrUIwhnwhBCACKQMAIQMLIAAgAzcDACAAIAQ3AwggAkEQaiQAC0ABAX8jAEEQayIFJAAgBSABIAIgAyAEQoCAgICAgICAgH+FECggACAFKQMANwMAIAAgBSkDCDcDCCAFQRBqJAALwgMCA38BfiMAQSBrIgIkAAJAAkAgAUL///////////8AgyIFQoCAgICAgMC/QHwgBUKAgICAgIDAwL9/fFoNACABQhmIpyEDAkAgAFAgAUL///8PgyIFQoCAgAhUIAVCgICACFEbDQAgA0GBgICABGohAwwCCyADQYCAgIAEaiEDIAAgBUKAgIAIhYRCAFINASADQQFxIANqIQMMAQsCQCAAUCAFQoCAgICAgMD//wBUIAVCgICAgICAwP//AFEbDQAgAUIZiKdB////AXFBgICA/gdyIQMMAQtBgICA/AchAyAFQv///////7+/wABWDQBBACEDIAVCMIinIgRBkf4ASQ0AIAJBEGogACABQv///////z+DQoCAgICAgMAAhCIFIARB/4F/ahAPIAIgACAFQYH/ACAEaxAQIAJBCGopAwAiBUIZiKchAwJAIAIpAwAgAikDECACQRBqQQhqKQMAhEIAUq2EIgBQIAVC////D4MiBUKAgIAIVCAFQoCAgAhRGw0AIANBAWohAwwBCyAAIAVCgICACIWEQgBSDQAgA0EBcSADaiEDCyACQSBqJAAgAyABQiCIp0GAgICAeHFyvgvoAwICfwJ+IwBBIGsiAiQAAkACQCABQv///////////wCDIgRCgICAgICAwP9DfCAEQoCAgICAgMCAvH98Wg0AIABCPIggAUIEhoQhBAJAIABC//////////8PgyIAQoGAgICAgICACFQNACAEQoGAgICAgICAwAB8IQUMAgsgBEKAgICAgICAgMAAfCEFIABCgICAgICAgIAIhUIAUg0BIAVCAYMgBXwhBQwBCwJAIABQIARCgICAgICAwP//AFQgBEKAgICAgIDA//8AURsNACAAQjyIIAFCBIaEQv////////8Dg0KAgICAgICA/P8AhCEFDAELQoCAgICAgID4/wAhBSAEQv///////7//wwBWDQBCACEFIARCMIinIgNBkfcASQ0AIAJBEGogACABQv///////z+DQoCAgICAgMAAhCIEIANB/4h/ahAPIAIgACAEQYH4ACADaxAQIAIpAwAiBEI8iCACQQhqKQMAQgSGhCEFAkAgBEL//////////w+DIAIpAxAgAkEQakEIaikDAIRCAFKthCIEQoGAgICAgICACFQNACAFQgF8IQUMAQsgBEKAgICAgICAgAiFQgBSDQAgBUIBgyAFfCEFCyACQSBqJAAgBSABQoCAgICAgICAgH+DhL8L+QIBAX8CQCAAIAFGDQACQCABIABrIAJrQQAgAkEBdGtLDQAgACABIAIQFw8LIAEgAHNBA3EhAwJAAkACQCAAIAFPDQACQCADRQ0AIAAhAwwDCwJAIABBA3ENACAAIQMMAgsgACEDA0AgAkUNBCADIAEtAAA6AAAgAUEBaiEBIAJBf2ohAiADQQFqIgNBA3FFDQIMAAALAAsCQCADDQACQCAAIAJqQQNxRQ0AA0AgAkUNBSAAIAJBf2oiAmoiAyABIAJqLQAAOgAAIANBA3ENAAsLIAJBA00NAANAIAAgAkF8aiICaiABIAJqKAIANgIAIAJBA0sNAAsLIAJFDQIDQCAAIAJBf2oiAmogASACai0AADoAACACDQAMAwALAAsgAkEDTQ0AA0AgAyABKAIANgIAIAFBBGohASADQQRqIQMgAkF8aiICQQNLDQALCyACRQ0AA0AgAyABLQAAOgAAIANBAWohAyABQQFqIQEgAkF/aiICDQALCyAAC9kBAQF/IwBBIGsiAyAANgIcIAMgATYCGCADIAI2AhQgA0EANgIQAkADQCADKAIQQQJMQQFxRQ0BIAMoAhQgAygCEEEDdGpBALc5AwAgA0EANgIMAkADQCADKAIMQQJMQQFxRQ0BIAMoAhQgAygCEEEDdGogAygCFCADKAIQQQN0aisDACADKAIcIAMoAhBBGGxqIAMoAgxBA3RqKwMAIAMoAhggAygCDEEDdGorAwCioDkDACADIAMoAgxBAWo2AgwMAAALAAsgAyADKAIQQQFqNgIQDAAACwALC7cBAQF/IwBBIGsiAiAANgIcIAIgATYCGCACQQM2AhQgAkEDNgIQIAJBADYCDAJAA0AgAigCDCACKAIUSEEBcUUNASACQQA2AggCQANAIAIoAgggAigCEEhBAXFFDQEgAigCGCACKAIIQRhsaiACKAIMQQN0aiACKAIcIAIoAgxBGGxqIAIoAghBA3RqKwMAOQMAIAIgAigCCEEBajYCCAwAAAsACyACIAIoAgxBAWo2AgwMAAALAAsLPAIBfwF8IwBBEGsiASQAIAFEAAAAAAAAJEA5AwggASAANgIEIAErAwggASgCBLcQMiECIAFBEGokACACC7oQAwl/An4JfEQAAAAAAADwPyENAkAgAb0iC0IgiKciAkH/////B3EiAyALpyIEckUNACAAvSIMQiCIpyEFAkAgDKciBg0AIAVBgIDA/wNGDQELAkACQCAFQf////8HcSIHQYCAwP8HSw0AIAZBAEcgB0GAgMD/B0ZxDQAgA0GAgMD/B0sNACAERQ0BIANBgIDA/wdHDQELIAAgAaAPCwJAAkACQAJAIAVBf0oNAEECIQggA0H///+ZBEsNASADQYCAwP8DSQ0AIANBFHYhCQJAIANBgICAigRJDQBBACEIIARBswggCWsiCXYiCiAJdCAERw0CQQIgCkEBcWshCAwCC0EAIQggBA0DQQAhCCADQZMIIAlrIgR2IgkgBHQgA0cNAkECIAlBAXFrIQgMAgtBACEICyAEDQELAkAgA0GAgMD/B0cNACAHQYCAwIB8aiAGckUNAgJAIAdBgIDA/wNJDQAgAUQAAAAAAAAAACACQX9KGw8LRAAAAAAAAAAAIAGaIAJBf0obDwsCQCADQYCAwP8DRw0AAkAgAkF/TA0AIAAPC0QAAAAAAADwPyAAow8LAkAgAkGAgICABEcNACAAIACiDwsgBUEASA0AIAJBgICA/wNHDQAgABD9AQ8LIAAQ/AEhDQJAIAYNAAJAIAVB/////wNxQYCAwP8DRg0AIAcNAQtEAAAAAAAA8D8gDaMgDSACQQBIGyENIAVBf0oNAQJAIAggB0GAgMCAfGpyDQAgDSANoSIBIAGjDwsgDZogDSAIQQFGGw8LRAAAAAAAAPA/IQ4CQCAFQX9KDQACQAJAIAgOAgABAgsgACAAoSIBIAGjDwtEAAAAAAAA8L8hDgsCQAJAIANBgYCAjwRJDQACQCADQYGAwJ8ESQ0AAkAgB0H//7//A0sNAEQAAAAAAADwf0QAAAAAAAAAACACQQBIGw8LRAAAAAAAAPB/RAAAAAAAAAAAIAJBAEobDwsCQCAHQf7/v/8DSw0AIA5EnHUAiDzkN36iRJx1AIg85Dd+oiAORFnz+MIfbqUBokRZ8/jCH26lAaIgAkEASBsPCwJAIAdBgYDA/wNJDQAgDkScdQCIPOQ3fqJEnHUAiDzkN36iIA5EWfP4wh9upQGiRFnz+MIfbqUBoiACQQBKGw8LIA1EAAAAAAAA8L+gIgBEAAAAYEcV9z+iIg0gAERE3134C65UPqIgACAAokQAAAAAAADgPyAAIABEAAAAAAAA0L+iRFVVVVVVVdU/oKKhokT+gitlRxX3v6KgIg+gvUKAgICAcIO/IgAgDaEhEAwBCyANRAAAAAAAAEBDoiIAIA0gB0GAgMAASSIDGyENIAC9QiCIpyAHIAMbIgJB//8/cSIEQYCAwP8DciEFQcx3QYF4IAMbIAJBFHVqIQJBACEDAkAgBEGPsQ5JDQACQCAEQfrsLk8NAEEBIQMMAQsgBUGAgEBqIQUgAkEBaiECCyADQQN0IgRBsD9qKwMAIhEgBa1CIIYgDb1C/////w+DhL8iDyAEQZA/aisDACIQoSISRAAAAAAAAPA/IBAgD6CjIhOiIg29QoCAgIBwg78iACAAIACiIhREAAAAAAAACECgIA0gAKAgEyASIAAgBUEBdUGAgICAAnIgA0ESdGpBgIAgaq1CIIa/IhWioSAAIA8gFSAQoaGioaIiD6IgDSANoiIAIACiIAAgACAAIAAgAETvTkVKKH7KP6JEZdvJk0qGzT+gokQBQR2pYHTRP6CiRE0mj1FVVdU/oKJE/6tv27Zt2z+gokQDMzMzMzPjP6CioCIQoL1CgICAgHCDvyIAoiISIA8gAKIgDSAQIABEAAAAAAAACMCgIBShoaKgIg2gvUKAgICAcIO/IgBEAAAA4AnH7j+iIhAgBEGgP2orAwAgDSAAIBKhoUT9AzrcCcfuP6IgAET1AVsU4C8+vqKgoCIPoKAgArciDaC9QoCAgIBwg78iACANoSARoSAQoSEQCyAAIAtCgICAgHCDvyIRoiINIA8gEKEgAaIgASARoSAAoqAiAaAiAL0iC6chAwJAAkAgC0IgiKciBUGAgMCEBEgNAAJAIAVBgIDA+3tqIANyRQ0AIA5EnHUAiDzkN36iRJx1AIg85Dd+og8LIAFE/oIrZUcVlzygIAAgDaFkQQFzDQEgDkScdQCIPOQ3fqJEnHUAiDzkN36iDwsgBUGA+P//B3FBgJjDhARJDQACQCAFQYDovPsDaiADckUNACAORFnz+MIfbqUBokRZ8/jCH26lAaIPCyABIAAgDaFlQQFzDQAgDkRZ8/jCH26lAaJEWfP4wh9upQGiDwtBACEDAkAgBUH/////B3EiBEGBgID/A0kNAEEAQYCAwAAgBEEUdkGCeGp2IAVqIgRB//8/cUGAgMAAckGTCCAEQRR2Qf8PcSICa3YiA2sgAyAFQQBIGyEDIAEgDUGAgEAgAkGBeGp1IARxrUIghr+hIg2gvSELCwJAAkAgA0EUdCALQoCAgIBwg78iAEQAAAAAQy7mP6IiDyABIAAgDaGhRO85+v5CLuY/oiAARDlsqAxhXCC+oqAiDaAiASABIAEgASABoiIAIAAgACAAIABE0KS+cmk3Zj6iRPFr0sVBvbu+oKJELN4lr2pWET+gokSTvb4WbMFmv6CiRD5VVVVVVcU/oKKhIgCiIABEAAAAAAAAAMCgoyANIAEgD6GhIgAgASAAoqChoUQAAAAAAADwP6AiAb0iC0IgiKdqIgVB//8/Sg0AIAEgAxAVIQEMAQsgBa1CIIYgC0L/////D4OEvyEBCyAOIAGiIQ0LIA0LDAAjAEEQayAANgIMCzIBAX8jAEEQayICJAAgAiAANgIMIAIgATYCCCACKAIMIAIoAggQNSEBIAJBEGokACABC1EBAX8jAEEQayICJAAgAiAANgIEIAIgATYCAAJAAkAgAkEIaiACKAIEIAIoAgAQNkEBcUUNACACKAIAIQEMAQsgAigCBCEBCyACQRBqJAAgAQsyAQF/IwBBEGsiAyAANgIMIAMgATYCCCADIAI2AgQgAygCCCgCACADKAIEKAIASUEBcQssAQF/IwBBEGsiASQAIAEgADYCDEEIEAAiACABKAIMEDgaIABB+DxBARABAAs+AQF/IwBBEGsiAiQAIAIgADYCDCACIAE2AgggAigCDCIBIAIoAggQOhogAUHkPEEIajYCACACQRBqJAAgAQsVACAAQbw8NgIAIABBBGoQ1wIaIAALHQAgABC4AhogAEG8PDYCACAAQQRqIAEQuQIaIAALLQEBfyMAQRBrIgIkACACIAA2AgwgAiABNgIIIAIoAgwQPCEBIAJBEGokACABCzMBAX8gAEEBIAAbIQECQANAIAEQ7wIiAA0BAkAQtwIiAEUNACAAEQcADAELCxAGAAsgAAs6AQF/IwBBEGsiAyQAIAMgADYCDCADIAE2AgggAyACNgIEIAMoAgwgAygCCCADKAIEED4gA0EQaiQACzUBAX8jAEEQayIDJAAgAyAANgIMIAMgATYCCCADIAI2AgQgAygCDCADKAIIED8gA0EQaiQACykBAX8jAEEQayICJAAgAiAANgIMIAIgATYCCCACKAIMEEAgAkEQaiQACyIBAX8jAEEQayIBJAAgASAANgIMIAEoAgwQQSABQRBqJAALBwAgABDwAgvtAQEBfyMAQSBrIgEkAEQYLURU+yEZQBogASAAOQMYIAFCubrKkuro98g/NwMQIAEgASsDGEQAAACALLRCwaBEAAAAAKDV4UCjOQMAIAEgASsDACIARM7J5gUzAdq+oiAAoiAAoiAAROt0IOup1bc/oiAAoqAgAEQAAxpHnZPnQaKgRG2QScbobvBAoDkDCCABIAErAwhEOZ1SokbfkT+iRAAAAAAAAG5Ao0QYLURU+yEZQBAjOQMIAkAgASsDCEEAt2NBAXFFDQAgASABKwMIRBgtRFT7IRlAoDkDCAsgASsDCCEAIAFBIGokACAAC/w0AgF/C3wjAEGQB2siDiQAIA4gADYCjAcgDiABOgCLByAOIAI2AoQHIA4gAzkD+AYgDiAEOQPwBiAOIAU5A+gGIA4gBjkD4AYgDiAHOQPYBiAOIAg5A9AGIA4gCTkDyAYgDiAKOQPABiAOIAs5A7gGIA4gDDkDsAYgDiANNgKsBiAORBrfxEFmY3o9OQMAIA4oAqwGQQA2AhQgDigCrAZB7gA6ABIgDigCrAZBALciDDkDGCAOKAKsBiAMOQMgIA4oAqwGIAw5AyggDigCrAYgDDkDMCAOKAKsBiAMOQM4IA4oAqwGIAw5A0AgDigCrAYgDDkDSCAOKAKsBiAMOQNQIA4oAqwGIAw5A1ggDigCrAYgDDkDYCAOKAKsBiAMOQNoIA4oAqwGIAw5A3AgDigCrAYgDDkDeCAOKAKsBiAMOQOAASAOKAKsBiAMOQOIASAOKAKsBiAMOQOQASAOKAKsBiAMOQOYASAOKAKsBiAMOQOgASAOKAKsBiAMOQOoASAOKAKsBiAMOQOwASAOKAKsBiAMOQO4ASAOKAKsBiAMOQPAASAOKAKsBiAMOQPIASAOKAKsBiAMOQPQASAOKAKsBiAMOQPYASAOKAKsBkEANgLgASAOKAKsBiAMOQPoASAOKAKsBiAMOQPwASAOKAKsBiAMOQP4ASAOKAKsBiAMOQOAAiAOKAKsBiAMOQOIAiAOKAKsBiAMOQOQAiAOKAKsBiAMOQOYAiAOKAKsBiAMOQOgAiAOKAKsBiAMOQOoAiAOKAKsBiAMOQOwAiAOKAKsBiAMOQO4AiAOKAKsBiAMOQPAAiAOKAKsBiAMOQPIAiAOKAKsBiAMOQPQAiAOKAKsBiAMOQPYAiAOKAKsBiAMOQPgAiAOKAKsBiAMOQPoAiAOKAKsBiAMOQPwAiAOKAKsBiAMOQP4AiAOKAKsBiAMOQOAAyAOKAKsBiAMOQOIAyAOKAKsBiAMOQOQAyAOKAKsBiAMOQOYAyAOKAKsBiAMOQOgAyAOKAKsBiAMOQOoAyAOKAKsBiAMOQOwAyAOKAKsBiAMOQO4AyAOKAKsBiAMOQPAAyAOKAKsBiAMOQPIAyAOKAKsBiAMOQPQAyAOKAKsBiAMOQPYAyAOKAKsBiAMOQPgAyAOKAKsBiAMOQPoAyAOKAKsBiAMOQPwAyAOKAKsBiAMOQP4AyAOKAKsBiAMOQOABCAOKAKsBiAMOQOIBCAOKAKsBiAMOQOQBCAOKAKsBiAMOQOYBCAOKAKsBiAMOQOgBCAOKAKsBiAMOQOoBCAOKAKsBiAMOQOwBCAOKAKsBiAMOQO4BCAOKAKsBiAMOQPABCAOKAKsBiAMOQPIBCAOKAKsBiAMOQPQBCAOKAKsBiAMOQPYBCAOKAKsBiAMOQPgBCAOKAKsBiAMOQPoBCAOKAKsBiAMOQPwBCAOKAKsBiAMOQP4BCAOKAKsBiAMOQOABSAOKAKsBiAMOQOIBSAOKAKsBiAMOQOQBSAOKAKsBiAMOQOYBSAOKAKMByAOKAKsBkH4BmogDigCrAZBgAdqIA4oAqwGQYgHaiAOKAKsBkGQB2ogDigCrAZBmAdqIA4oAqwGQaAHaiAOKAKsBkGoB2ogDigCrAZBsAdqEEQgDigCrAZBADYCDCAOKAKsBiAOLQCLBzoAECAO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A2ogDigCrAZBgARqIA4oAqwGQYgEaiAOQeADaiAOQdgDaiAOQdADaiAOQcgDaiAOQcADaiAOQbgDaiAOQbADaiAOQaADaiAOQZgDaiAOQZADaiAOQYgDaiAOQYADaiAOQfgCaiAOQfACaiAOQegCaiAOQeACaiAOQdgCaiAOQdACaiAOQcgCaiAOQcACaiAOQbgCaiAOQbACaiAOQagCaiAOQaACaiAOQZgCaiAOQZACaiAOKAKsBkGgBGogDigCrAZBqARqIA4oAqwGQbAEaiAOKAKsBkG4BGogDigCrAZBwARqIA4oAqwGQcgEaiAOKAKsBkHQBGogDigCrAZB2ARqIA4oAqwGQeAEaiAOKAKsBkHoBGogDkGQBGoiAiAOQcgBaiAOQcABaiAOQbgBaiAOQbABaiAOQagBaiAOQaABaiAOQZgBaiAOQZABaiAOQYgBaiAOQYABaiAOQfgAaiAOQfAAaiAOKAKsBkH4BGogDigCrAZBgAVqEEggDigCrAYrA/gCIA4oAqwGKwOAAyAOKAKsBisDiAMgDigCrAYrA5ADIA4oAqwGKwOYAyAOKAKsBisDoAMgDigCrAYrA6gDIA4oAqwGKwOwAyAOKAKsBisDuAMgDigCrAYrA8ADIA4oAqwGKwPIAyAOKAKsBisD0AMgDigCrAYrA9gDIA4oAqwGKwPgAyAOKAKsBisD6AMgDigCrAYrA/ADIA4oAqwGKwP4AyAOKAKsBisDgAQgDigCrAYrA4gEIA4oAqwGKwOAASAOKAKsBisDoAQgDigCrAYrA6gEIA4oAqwGKwOwBCAOKAKsBisDuAQgDigCrAYrA8AEIA4oAqwGKwPIBCAOKAKsBisD0AQgDigCrAYrA9gEIA4oAqwGKwPgBCAOKAKsBisD6AQgDigCrAYrA/gEIA4oAqwGKwOABSAOKwOgBCAOKAKsBi0AEUEYdEEYdSAOKAKsBkGABmogDigCrAZB8AVqIA4oAqwGQfgFaiAOKAKsBkGIBmogDigCrAZBkAZqIA4oAqwGLQAQQRh0QRh1EEkgDiAMOQOwBCAOIAw5A6gEIA4gDDkDmAQgDigCrAYrA5AHIA4rA7gFIA4rA9AEIA4oAqwGKwOIBiAOKwPgAyAOKwPYAyAOKwPQAyAOKwPIAyAOKwPAAyAOKwOwBSAOKwOgAyAOKwOYAyAOKwOQAyAO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OQOAAQJAAkAgJSgCvANBAUdBAXFFDQAgJSgC0AEgJSsDgAFEAAAAAAAAAEAgJSgCyAErAwCioUQAAAAAAAAAQCAlKwOYAaKgOQMAICUoAsQBICUoAsABKwMAICUrA+gBoTkDAAwBCyAlKALQASAlKwOAASAlKALIASsDAKEgJSgC3AErAwChICUrA5gBoDkDACAlKALEASAlKALAASsDACAlKwPoAaE5AwALICUoAsABICUrA+gBICUoAsQBKwMAoDkDAAsgJUHAA2okAAvwHQICfwJ8IwBB8ARrIgokACAKIAA2AuwEIAogATYC6AQgCiACOgDnBCAKIAM6AOYEIAogBDoA5QQgCiAFNgLgBCAKIAY2AtwEIAogBzYC2AQgCiAINgLUBCAKIAk2AtAEIApEOZ1SokbfkT85A8gEIApE+MFjGtylbEA5A8AEIApBADYCxAMgCigC0ARBADYCDCAKQQo2AsgDAkADQCAKKALIA0EPTEEBcUUNAQJAIAooAuwEIAooAsgDai0AAEEYdEEYdUEgRkEBcUUNACAKKALsBCAKKALIA2pB3wA6AAALIAogCigCyANBAWo2AsgDDAAACwALAkAgCigC7AQtACxBGHRBGHVBIEdBAXFFDQAgCigC7AQgCigC7AQtACw6ACsLIAooAuwEQS46ACwCQCAKKALsBC0AB0EYdEEYdUEgRkEBcUUNACAKKALsBEHVADoABwsCQCAKKALsBC0ACUEYdEEYdUEgRkEBcUUNACAKKALsBEEuOgAJCyAKQS02AsgDAkADQCAKKALIA0ExTEEBcUUNAQJAIAooAuwEIAooAsgDai0AAEEYdEEYdUEgRkEBcUUNACAKKALsBCAKKALIA2pBMDoAAAsgCiAKKALIA0EBajYCyAMMAAALAAsCQCAKKALsBC0AM0EYdEEYdUEgRkEBcUUNACAKKALsBEEwOgAzCwJAIAooAuwELQA1QRh0QRh1QSBHQQFxRQ0AIAooAuwEIAooAuwELQA1OgA0CyAKKALsBEEuOgA1IAooAugEQS46ABkgCkEaNgLIAwJAA0AgCigCyANBIExBAXFFDQECQCAKKALoBCAKKALIA2otAABBGHRBGHVBIEZBAXFFDQAgCigC6AQgCigCyANqQTA6AAALIAogCigCyANBAWo2AsgDDAAACwALAkAgCigC7AQtAD5BGHRBGHVBIEZBAXFFDQAgCigC7ARBMDoAPgsCQCAKKALsBC0AREEYdEEYdUEgRkEBcUUNACAKKALsBEEwOgBECyAKKALsBCEJIAooAtAEIQggCigC0AQhByAKKALQBCEGIAooAtAEIQUgCigC0AQhBCAKKALQBCEDIAooAtAEIQIgCigC0AQhASAKKALQBCEAIApBoANqIAooAtAEQbAGajYCACAKQZwDaiAAQawGajYCACAKQZQDaiABQeAFajYCACAKQYwDaiACQdAFajYCACAKQYgDaiADQdgFajYCACAKQYQDaiAEQbgFajYCACAKQYADaiAFQQRqNgIAIAogBkGhBmo2AvwCIAogB0GgBmo2AvgCIAogCDYC9AIgCkGYA2ogCkGsA2o2AgAgCkGQA2ogCkGwA2o2AgAgCiAKQcwDajYC8AIgCUGdCCAKQfACahBRAkACQCAKLQDnBEEYdEEYdUH2AEZBAXFFDQACQAJAIAooAugELQA0QRh0QRh1QSBGQQFxRQ0AIAooAugEIQkgCigC0AQhCCAKKALQBCEHIAooAtAEIQYgCigC0AQhBSAKKALQBCEEIAooAtAEIQMgCigC0AQhAiAKKALQBCEBIAooAtwEIQAgCigC2AQhCyAKQdwBaiAKKALUBDYCACAKQdgBaiALNgIAIApB1AFqIAA2AgAgCkHQAWogAUG0Bmo2AgAgCkHMAWogAkGYBmo2AgAgCkHIAWogA0GQBmo2AgAgCkHEAWogBEGIBmo2AgAgCkHAAWogBUGABmo2AgAgCiAGQfgFajYCvAEgCiAHQfAFajYCuAEgCiAINgK0ASAKIApBzANqNgKwASAJQdsIIApBsAFqEFEMAQsgCigC6AQhCSAKKALQBCEIIAooAtAEIQcgCigC0AQhBiAKKALQBCEFIAooAtAEIQQgCigC0AQhAyAKKALQBCECIAooAtAEIQEgCigC3AQhACAKKALYBCELIApBjAJqIAooAtQENgIAIApBiAJqIAs2AgAgCkGEAmogADYCACAKQYACaiABQbQGajYCACAKQfwBaiACQZgGajYCACAKQfgBaiADQZAGajYCACAKQfQBaiAEQYgGajYCACAKQfABaiAFQYAGajYCACAKIAZB+AVqNgLsASAKIAdB8AVqNgLoASAKIAg2AuQBIAogCkHMA2o2AuAB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AiAANgIMIAIgATYCCCACKAIMKAIAIAIoAggoAgQ2AgQgAigCCCgCBCACKAIMKAIANgIACykBAX8jAEEQayIBJAAgASAANgIMIAEoAgxBCGoQfiEAIAFBEGokACAACyYBAX8jAEEQayIBJAAgASAANgIMIAEoAgwQfCEAIAFBEGokACAACxUBAX8jAEEQayIBIAA2AgwgASgCDAsuAQF/IwBBIGsiAiQAIAIgADYCHCACIAE2AhggAigCHCACKAIYEH8gAkEgaiQACzsBAX8jAEEQayIDJAAgAyAANgIMIAMgATYCCCADIAI2AgQgAygCDCADKAIIIAMoAgQQgAEgA0EQaiQACwwAIwBBEGsgADYCDAsqAQF/IwBBEGsiASQAIAEgADYCDCABKAIMQQhqEIUBIQAgAUEQaiQAIAALJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDBCEASEAIAFBEGokACAACycBAX8jAEEQayIBJAAgASAANgIMIAEoAgwQgQEhACABQRBqJAAgAAsVAQF/IwBBEGsiASAANgIMIAEoAgwLJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDBCDASEAIAFBEGokACAACxcBAX8jAEEQayICIAA2AgQgAiABNgIACzoBAX8jAEEQayIDJAAgAyAANgIMIAMgATYCCCADIAI2AgQgAygCCCADKAIEQQxsQQQQPSADQRBqJAALJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDBCCASEAIAFBEGokACAACxUBAX8jAEEQayIBIAA2AgwgASgCDAsVAQF/IwBBEGsiASAANgIMIAEoAgwLFQEBfyMAQRBrIgEgADYCDCABKAIMCycBAX8jAEEQayIBJAAgASAANgIMIAEoAgwQhgEhACABQRBqJAAgAAsVAQF/IwBBEGsiASAANgIMIAEoAgwLOgEBfyMAQRBrIgEkACABIAA2AgwgASgCDCEAIAAgABB8EH02AgAgACAAEHwQfTYCBCABQRBqJAAgAAtLAQF/IwBBEGsiAyQAIAMgADYCDCADIAE2AgggAyACNgIEIAMoAgwiAiADKAIIEIkBEIoBGiADKAIEEDMgAhCLARogA0EQaiQAIAILFQEBfyMAQRBrIgEgADYCDCABKAIMCzkBAX8jAEEQayICJAAgAiAANgIMIAIgATYCCCACKAIM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OQMYIAcoAhBEAAAAAAAAFkA5AyAgBygCEEQAAAAAAAAaQDkDKCAHKAIQIQYgB0HAAGokACAGC44BAQJ/IwBBIGsiASQAIAFB0McANgIcIAEgADYCGCABIAEoAhwiAhBxNgIUIAFBCGoiACACIAEoAhQQlwEgASgCFCAAEJgBQQhqEHYgASgCGBCZARCaASACIAAQmwEQnAEgABCbARCcARCdASACEHQiAiACKAIAQQFqNgIAIAAQngEgABCfARogAUEgaiQAC1gBAX8jAEEgayIDJAAgAyAANgIcIAMgATYCGCADIAI2AhQgAyADKAIUEKABNgIQIAMoAhBBADYCACAAIAMoAhAgA0EIaiADKAIUEKEBEKIBGiADQSBqJAALKgEBfyMAQRBrIgEkACABIAA2AgwgASgCDBCjASgCACEAIAFBEGokACAACxUBAX8jAEEQayIBIAA2AgwgASgCDAs+AQF/IwBBIGsiAyQAIAMgADYCHCADIAE2AhggAyACNgIUIAMoAhwgAygCGCADKAIUEKQBEKUBIANBIGokAAsqAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEKMBKAIAIQAgAUEQaiQAIAALJgEBfyMAQRBrIgEkACABIAA2AgwgASgCDBB8IQAgAUEQaiQAIAALZQEBfyMAQRBrIgMkACADIAA2AgwgAyABNgIIIAMgAjYCBCADKAIMIgIQciEBIAMoAgQgATYCBCADKAIIIAIoAgA2AgAgAygCCCgCACADKAIINgIEIAIgAygCBDYCACADQRBqJAALNwEBfyMAQRBrIgEkACABIAA2AgwgASABKAIMIgAQpgEoAgA2AgggABCmAUEANgIAIAFBEGokAAsnAQF/IwBBEGsiASQAIAEgADYCDCABKAIMIgAQpwEgAUEQaiQAIAALMwEBfyMAQRBrIgEkACABIAA2AgwgAUEBNgIIIAEoAgwgASgCCBCuASEAIAFBEGokACAACzkBAX8jAEEQayICIAA2AgwgAiABNgIIIAJBATYCBCACKAIMIgEgAigCCDYCACABIAIoAgQ2AgQgAQtDAQF/IwBBEGsiAyQAIAMgADYCDCADIAE2AgggAyACNgIEIAMoAgwiAiADQQhqIAMoAgQQrwEQsAEaIANBEGokACACCycBAX8jAEEQayIBJAAgASAANgIMIAEoAgwQrAEhACABQRBqJAAgAAsVAQF/IwBBEGsiASAANgIMIAEoAgwLPgEBfyMAQSBrIgMkACADIAA2AhQgAyABNgIQIAMgAjYCDCADKAIUIAMoAhAgAygCDBCkARCtASADQSBqJAALJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDBCqASEAIAFBEGokACAAC2MBAn8jAEEQayIBJAAgASAANgIMIAFBADYCCCABIAEoAgwiABCmASgCADYCBCABKAIIIQIgABCmASACNgIAAkAgASgCBEEAR0EBcUUNACAAEKgBIAEoAgQQqQELIAFBEGokAAsqAQF/IwBBEGsiASQAIAEgADYCDCABKAIMQQRqEKsBIQAgAUEQaiQAIAALOAEBfyMAQRBrIgIkACACIAA2AgwgAiABNgIIIAIoAgwiASgCACACKAIIIAEoAgQQeCACQRBqJAALFQEBfyMAQRBrIgEgADYCDCABKAIMCxUBAX8jAEEQayIBIAA2AgwgASgCDAsVAQF/IwBBEGsiASAANgIMIAEoAgwLPAEBfyMAQRBrIgMkACADIAA2AgwgAyABNgIIIAMgAjYCBCADKAIIIAMoAgQQpAEoAgA2AgAgA0EQaiQAC2ABAX8jAEEQayICJAAgAiAANgIMIAIgATYCCCACQQA2AgQgAigCCCEBIAIoAgwQtQECQCABQdWq1aoBS0EBcUUNAEGQDRA3AAsgAigCCEEMbEEEEDshASACQRBqJAAgAQsVAQF/IwBBEGsiASAANgIMIAEoAgwLTwEBfyMAQRBrIgMkACADIAA2AgwgAyABNgIIIAMgAjYCBCADKAIMIgIgAygCCBCxARCyARogAkEEaiADKAIEELMBELQBGiADQRBqJAAgAgsVAQF/IwBBEGsiASAANgIMIAEoAgwLOQEBfyMAQRBrIgIkACACIAA2AgwgAiABNgIIIAIoAgwiASACKAIIELEBKAIANgIAIAJBEGokACABCxUBAX8jAEEQayIBIAA2AgwgASgCDAs5AQF/IwBBEGsiAiQAIAIgADYCDCACIAE2AgggAigCDCIBIAIoAggQswEpAgA3AgAgAkEQaiQAIAELDAAjAEEQayAANgIMC6AGAQF/IwBBsANrIhYkACAWIAA2AqwDIBYgATYCqAMgFiACOQOgAyAWIAM5A5gDIBYgBDkDkAMgFiAFOQOIAyAWIAY5A4ADIBYgBzkD+AIgFiAIOQPwAiAWIAk6AO8CIBYgCjYC6AIgFiALNgLkAiAWIAw2AuACIBYgDTkD2AIgFiAOOQPQAiAWIA85A8gCIBYgEDkDwAIgFiAROgC/AiAWIBI5A7ACIBYgEzkDqAIgFiAUOQOgAiAWIBU2ApwCIBYgFigCqAM2AhBB1A0gFkEQahAbGiAWIBYrA6ADOQMgQdkNIBZBIGoQGxogFiAWKwOYAzkDMEHZDSAWQTBqEBsaIBYgFisDkAM5A0BB2Q0gFkHAAGoQGxogFiAWKwOIAzkDUEHZDSAWQdAAahAbGiAWIBYrA4ADOQNgQdkNIBZB4ABqEBsaIBYgFisD+AI5A3BB2Q0gFkHwAGoQGxogFiAWKwPwAjkDgAFB2Q0gFkGAAWoQGxogFiAWLQDvAkEYdEEYdTYCkAFB4A0gFkGQAWoQGxogFiAWKALoAjYCoAFB1A0gFkGgAWoQGxogFiAWKALkAjYCsAFB5Q0gFkGwAWoQGxogFiAWKALgAjYCwAFB5Q0gFkHAAWoQGxogFiAWKwPYAjkD0AFB2Q0gFkHQAWoQGxogFiAWKwPQAjkD4AFB2Q0gFkHgAWoQGxogFiAWKwPIAjkD8AFB2Q0gFkHwAWoQGxogFiAWKwPAAjkDgAJB2Q0gFkGAAmoQGxoCQCAWLQC/AkEBcQ0AIBZBAToAvwILAkACQCAWKAKcAkEAR0EBcUUNACAWIBYoApwCNgKYAgwBCyAWQcgIEDxBAEHICBAYNgKYAiAWIBYoApgCNgKUAiAWQZQCahCWAUHQxwAQjgEhFSAWKAKYAiAVQQFrNgJsQQBBAUEBcToA2EkLIBYoApgCIBYtAL8CQQFxOgAwIBZB7QA6AJMCIBZB+gA6AJICIBZB6QA6AJECIBZBAjYCjAIgFigCmAIgFigC5AI2AnAgFiAWKAKYAigCcDYCAEHlDSAWEBsaIBZBsANqJABBAAuuAQEBfyMAQSBrIgEkACABIAA2AhwgASABKAIcNgIYIAFBGGoQuAEgASgCGCgCZBCPASABKAIYEJABIAFBADYCFCABQdDHABC5ATYCEAJAA0AgAUHQxwAQugE2AgggAUEQaiABQQhqELsBQQFxRQ0BIAEgASgCFEEBaiIANgIUIAFBEGoQvAEoAgAgADYCbCABQRBqEL0BDAAACwALQQBBAUEBcToA2EkgAUEgaiQAC4gDAQZ/IwBBgAFrIgEkACABQdDHADYCfCABIAA2AnggASgCfCICEL4BIAFB6ABqIAFB4ABqEL8BIQMgASACELkBNgJIIAFB0ABqIAFByABqEMABIQAgASACELoBNgI4IAFBwABqIAFBOGoQwAEhBAJAA0AgACAEEMEBQQFxRQ0BAkACQCAAEMIBKAIAIAEoAngoAgBGQQFxRQ0AIAFBKGogACgCADYCACABIAEoAigQwwE2AjADQEEAIQUCQCABQTBqIAQQwQFBAXFFDQAgAUEwahDCASgCACABKAJ4KAIARiEFCwJAIAVBAXFFDQAgAUEwahDEAQwBCwsgASADELoBNgIYIAFBIGogAUEYahDAASEFIAFBEGogACgCADYCACABQQhqIAFBMGoiBigCADYCACADIAUoAgAgAiABKAIQIAEoAggQxQEgACAGKAIANgIAAkAgACAEEMEBQQFxRQ0AIAAQxAELDAELIAAQxAELDAAACwALIAMQjgEaIAMQbRogAUGAAWokAAsxAQF/IwBBEGsiASQAIAEgADYCBCABIAEoAgQQxgE2AgggASgCCCEAIAFBEGokACAACzEBAX8jAEEQayIBJAAgASAANgIEIAEgASgCBBDHATYCCCABKAIIIQAgAUEQaiQAIAALOQEBfyMAQRBrIgIkACACIAA2AgwgAiABNgIIIAIoAgwgAigCCBDIASEBIAJBEGokACABQX9zQQFxCywBAX8jAEEQayIBJAAgASAANgIMIAEoAgwoAgAQdSEAIAFBEGokACAAQQhqCyIBAX8jAEEQayIBIAA2AgwgASgCDCIAIAAoAgAoAgQ2AgALLAEBfyMAQRBrIgEkACABIAA2AgQgAUEIaiABKAIEEMoBEMsBGiABQRBqJAALNAEBfyMAQRBrIgIkACACIAA2AgwgAiABNgIIIAIoAgwiASACKAIIEMwBGiACQRBqJAAgAQsrAQF/IwBBEGsiAiAANgIMIAIgATYCCCACKAIMIgEgAigCCCgCADYCACABCzkBAX8jAEEQayICJAAgAiAANgIMIAIgATYCCCACKAIMIAIoAggQzQEhASACQRBqJAAgAUF/c0EBcQssAQF/IwBBEGsiASQAIAEgADYCDCABKAIMKAIAEHUhACABQRBqJAAgAEEIagtHAQF/IwBB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AtwkajYC3CQgACgC3CQhASAAQcAAakEQaiAAKAKMpQQrAxA5AwAgAEEINgJMIABBEDYCSCAAQcoPNgJEIABB0w82AkAgACABIABB4CRqaiAAQYYPIABBwABqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAQfAAaiAAKAKMpQQrAxg5AwAgAEEINgJsIABBGDYCaCAAQcoPNgJkIABB1Q82AmAgACABIABB4CRqaiAAQYYPIABB4ABqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAQZABaiAAKAKMpQQrAyA5AwAgAEEINgKMASAAQSA2AogBIABByg82AoQBIABB2A82AoABIAAgASAAQeAkamogAEGGDyAAQYABahDpASAAKALcJGo2AtwkIAAoAtwkIQEgAEGwAWogACgCjKUEKwMoOQMAIABBCDYCrAEgAEEoNgKoASAAQcoPNgKkASAAQdsPNgKgASAAIAEgAEHgJGpqIABBhg8gAEGgAWoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIABB0AFqIAAoAoylBC0AMEEBcTYCACAAQQE2AswBIABBMDYCyAEgAEGnEDYCxAEgAEGfEDYCwAEgACABIABB4CRqaiAAQd4PIABBwAFqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAQfABaiAAKAKMpQQrAzg5AwAgAEEINgLsASAAQTg2AugBIABByg82AuQBIABBrBA2AuABIAAgASAAQeAkamogAEGGDyAAQeABahDpASAAKALcJGo2AtwkIAAoAtwkIQEgAEGQAmogACgCjKUEKwNAOQMAIABBCDYCjAIgAEHAADYCiAIgAEHKDzYChAIgAEGzEDYCgAIgACABIABB4CRqaiAAQYYPIABBgAJqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAQbACaiAAKAKMpQQrA0g5AwAgAEEINgKsAiAAQcgANgKoAiAAQcoPNgKkAiAAQcIQNgKgAiAAIAEgAEHgJGpqIABBhg8gAEGgAmoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIABB0AJqIAAoAoylBCsDUDkDACAAQQg2AswCIABB0AA2AsgCIABByg82AsQCIABB0hA2AsACIAAgASAAQeAkamogAEGGDyAAQcACahDpASAAKALcJGo2AtwkIAAoAtwkIQEgAEHwAmogACgC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IAdBkAZqIA9BAnRqIgIoAgAhAQNAIAFBCmwhASAQQQFqIhBBCUcNAAsgAiABNgIACyAPQQFqIQ8LIBOnIQgCQCAMQQlODQAgDCAISg0AIAhBEUoNAAJAIAhBCUcNACAHQcABaiAFECUgB0GwAWogBygCkAYQKiAHQaABaiAHKQPAASAHQcABakEIaikDACAHKQOwASAHQbABakEIaikDABARIAdBoAFqQQhqKQMAIRMgBykDoAEhFAwCCwJAIAhBCEoNACAHQZACaiAFECUgB0GAAmogBygCkAYQKiAHQfABaiAHKQOQAiAHQZACakEIaikDACAHKQOAAiAHQYACakEIaikDABARIAdB4AFqQQggCGtBAnRBwDVqKAIAECUgB0HQAWogBykD8AEgB0HwAWpBCGopAwAgBykD4AEgB0HgAWpBCGopAwAQEyAHQdABakEIaikDACETIAcpA9ABIRQMAgsgBygCkAYhAQJAIAMgCEF9bGpBG2oiAkEeSg0AIAEgAnYNAQsgB0HgAmogBRAlIAdB0AJqIAEQKiAHQcACaiAHKQPgAiAHQeACakEIaikDACAHKQPQAiAHQdACakEIaikDABARIAdBsAJqIAhBAnRBmDVqKAIAECUgB0GgAmogBykDwAIgB0HAAmpBCGopAwAgBykDsAIgB0GwAmpBCGopAwAQESAHQaACakEIaikDACETIAcpA6ACIRQMAQsDQCAHQZAGaiAPIgJBf2oiD0ECdGooAgBFDQALQQAhEAJAAkAgCEEJbyIBDQBBACELDAELIAEgAUEJaiAIQX9KGyEGAkACQCACDQBBACELQQAhAgwBC0GAlOvcA0EIIAZrQQJ0QcA1aigCACINbSERQQAhDkEAIQFBACELA0AgB0GQBmogAUECdGoiDyAPKAIAIg8gDW4iDCAOaiIONgIAIAtBAWpB/w9xIAsgASALRiAORXEiDhshCyAIQXdqIAggDhshCCARIA8gDCANbGtsIQ4gAUEBaiIBIAJHDQALIA5FDQAgB0GQBmogAkECdGogDjYCACACQQFqIQILIAggBmtBCWohCAsDQCAHQZAGaiALQQJ0aiEMA0ACQCAIQSRIDQACQCAIQSRHDQAgDCgCAEHR6fkESQ0BQSQhCAsCQANAIAJBAWpB/w9xIQYgB0GQBmogAkF/akH/D3FBAnRqIRID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IAAgCyAOQQkgDkEJSBsQpQIgDkF3aiELIBJBBGoiEiADTw0DIA5BCUohFyALIQ4gFw0ADAMACwALAkAgDkEASA0AIAMgEkEEaiADIBJLGyEVIAZBEGpBCHIhECAGQRBqQQlyIQMgEiERA0ACQCARNQIAIAMQqgIiCyADRw0AIAZBMDoAGCAQIQsLAkACQCARIBJGDQAgCyAGQRBqTQ0BA0AgC0F/aiILQTA6AAAgCyAGQRBqSw0ADAIACwALIAAgC0EBEKUCIAtBAWohCwJAIBYNACAOQQFIDQELIABBkzpBARClAgsgACALIAMgC2siFyAOIA4gF0obEKUCIA4gF2shDiARQQRqIhEgFU8NASAOQX9KDQALCyAAQTAgDkESakESQQAQqwIgACATIAwgE2sQpQIMAgsgDiELCyAAQTAgC0EJakEJQQAQqwILIABBICACIAogBEGAwABzEKsCDAELIAlBCWogCSAFQSBxIhEbIQ4CQCADQQtLDQBBDCADayILRQ0ARAAAAAAAACBAIRsDQCAbRAAAAAAAADBAoiEbIAtBf2oiCw0ACwJAIA4tAABBLUcNACAbIAGaIBuhoJohAQwBCyABIBugIBuhIQELAkAgBigCLCISIBJBH3UiC2ogC3OtIAwQqgIiCyAMRw0AIAZBMDoADyAGQQ9qIQsLIAhBAnIhFiALQX5qIhUgBUEPajoAACALQX9qQS1BKyASQQBIGzoAACAEQQhxIRcgBkEQaiESA0AgEiELAkACQCABmUQAAAAAAADgQWNFDQAgAaohEgwBC0GAgICAeCESCyALIBJB4DlqLQAAIBFyOgAAIAEgErehRAAAAAAAADBAoiEBAkAgC0EBaiISIAZBEGprQQFHDQACQCAXDQAgA0EASg0AIAFEAAAAAAAAAABhDQELIAtBLjoAASALQQJqIRILIAFEAAAAAAAAAABiDQALAkACQCADRQ0AIBIgBkEQamtBfmogA04NACADIAxqIBVrQQJqIQsMAQsgDCAGQRBqayAVayASaiELCyAAQSAgAiALIBZqIgogBBCrAiAAIA4gFhClAiAAQTAgAiAKIARBgIAEcxCrAiAAIAZBEGogEiAGQRBqayISEKUCIABBMCALIBIgDCAVayIRamtBAEEAEKsCIAAgFSAREKUCIABBICACIAogBEGAwABzEKsCCyAG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NDQgIDUxLjU5MDggMTY4LjM3ODggMDEyNTM2MiAgODYuNDE4NSAzNTkuNzQ1NCAxNi4wNTA2NDgzMyAgICAwNQAiJXMiOiB7InR5cGUiOiAiJXMiLCAib2Zmc2V0IjogJWx1LCAic2l6ZSI6ICVsdSwgInZhbHVlIjogIiVsZiJ9LAB4AGRvdWJsZQB5AHoAdngAdnkAdnoAIiVzIjogeyJ0eXBlIjogIiVzIiwgIm9mZnNldCI6ICVsdSwgInNpemUiOiAlbHUsICJ2YWx1ZSI6ICIlZCJ9LAB2aXNpYmxlAGJvb2wAcGVyaW9kAHVuaXhfdGltZXN0YW1wAGVwaGVtZXJpc19zdGFydABlcGhlbWVyaXNfc3RvcABlcGhlbWVyaXNfc3RlcABlcGhlbWVyaXNfbGVuZ3RoAGludAAiJXMiOiB7InR5cGUiOiAiJXMiLCAib2Zmc2V0IjogJWx1LCAic2l6ZSI6ICVsdSwgInZhbHVlIjogIiVwIn0sAGVwaGVtZXJpc19wdHIAZG91YmxlKgBlcGhlbWVyaXNfc3RhcnRfaWR4AGFycmF5X2luZGV4ACIlcyI6IHsidHlwZSI6ICIlcyIsICJvZmZzZXQiOiAlbHUsICJzaXplIjogJWx1LCAidmFsdWUiOiAiJWxpIn0sAHNhdG51bQBsb25nIGludAAiJXMiOiB7InR5cGUiOiAiJXMiLCAib2Zmc2V0IjogJWx1LCAic2l6ZSI6ICVsdSwgInZhbHVlIjogIiVpIn0sAGVwb2NoeXIAZXBvY2h0eW51bXJldgBlcnJvcgAiJXMiOiB7InR5cGUiOiAiJXMiLCAib2Zmc2V0IjogJWx1LCAic2l6ZSI6ICVsdSwgInZhbHVlIjogIiVjIn0sAG9wZXJhdGlvbm1vZGUAY2hhcgBpbml0AG1ldGhvZABpc2ltcABheWNvZgBjb240MQBjYzEAY2M0AGNjNQBkMgBkMwBkNABkZWxtbwBldGEAYXJncGRvdABvbWdjb2YAc2lubWFvAHQAdDJjb2YAdDNjb2YAdDRjb2YAdDVjb2YAeDFtdGgyAHg3dGhtMQBtZG90AG5vZGVkb3QAeGxjb2YAeG1jb2YAbm9kZWNmAGlyZXoAZDIyMDEAZDIyMTEAZDMyMTAAZDMyMjIAZDQ0MTAAZDQ0MjIAZDUyMjAA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LURU+yH5P+JlLyJ/K3o8B1wUMyamgTy9y/B6iAdwPAdcFDMmppE8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////////////////////////////////////////wABAgMEBQYHCAn/////////CgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiP///////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAQIEBwMGBQAAABgAAAA1AAAAcQAAAGv////O+///kr///2luZmluaXR5AAAAAAoAAABkAAAA6AMAABAnAACghgEAQEIPAICWmAAA4fUF0XSeAFedvSqAcFIP//8+JxEACgAREREAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAEQAPChEREQMKBwABAAkLCwAACQYLAAALAAYRAAAAERERAAAAAAAAAAAAAAAAAAAAAAsAAAAAAAAAABEACgoREREACgAAAgAJCwAAAAkACwAACwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAwAAAAACQwAAAAAAAwAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAADQAAAAQNAAAAAAkOAAAAAAAOAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAA8AAAAADwAAAAAJEAAAAAAAEAAAEAAAEgAAABISEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAEhISAAAAAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAAAAAAAAACgAAAAAKAAAAAAkLAAAAAAALAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAADAAAAAAJDAAAAAAADAAADAAALSsgICAwWDB4AChudWxsKQAAAAAAAAAAAAAAAAAAAAAwMTIzNDU2Nzg5QUJDREVGLTBYKzBYIDBYLTB4KzB4IDB4AElORgBpbmYATkFOAG5hbgAuAAAAAAAAAAAAAAAAAgAAwAMAAMAEAADABQAAwAYAAMAHAADACAAAwAkAAMAKAADACwAAwAwAAMANAADADgAAwA8AAMAQAADAEQAAwBIAAMATAADAFAAAwBUAAMAWAADAFwAAwBgAAMAZAADAGgAAwBsAAMAcAADAHQAAwB4AAMAfAADAAAAAswEAAMMCAADDAwAAwwQAAMMFAADDBgAAwwcAAMMIAADDCQAAwwoAAMMLAADDDAAAww0AANMOAADDDwAAwwAADLsBAAzDAgAMwwMADMMEAAzTYmFzaWNfc3RyaW5nAHN0ZDo6ZXhjZXB0aW9uAAAAAAAcHgAADgAAAA8AAAAQAAAAbB8AACQeAABTdDlleGNlcHRpb24AAAAAAAAAAEgeAAABAAAAEQAAABIAAADMHgAAVB4AABweAABTdDExbG9naWNfZXJyb3IAAAAAAHgeAAABAAAAEwAAABIAAADMHgAAhB4AAEgeAABTdDEybGVuZ3RoX2Vycm9yAFN0OXR5cGVfaW5mbwAAAGwfAACVHgAAzB4AAEEfAACkHgAAzB4AAOweAACsHgAAAAAAABAfAAAUAAAAFQAAABYAAAAXAAAAGAAAABkAAAAaAAAAGwAAAE4xMF9fY3h4YWJpdjExN19fY2xhc3NfdHlwZV9pbmZvRQAAAMweAAAcHwAAuB4AAE4xMF9fY3h4YWJpdjEyMF9fc2lfY2xhc3NfdHlwZV9pbmZvRQBOMTBfX2N4eGFiaXYxMTZfX3NoaW1fdHlwZV9pbmZvRQAAAAAAAAC4HgAAFAAAABwAAAAWAAAAFwAAABgAAAAdAAAAHgAAAB8AAADgIAAAAAAAAAAA8D8AAAAAAAD4PwAAAAAAAAAABtDPQ+v9TD4AAAAAAAAAAAAAAEADuOI/AEHAPwu0AwkAAAAAAAAAAAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAALAAAA6CQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAALAAAA8CgAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAP//////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAhAAAASCsAAAAEAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAr/////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAgAAAAQYDDAAvIGwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
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
    return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
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
    return getBinaryPromise().then(function(binary) {
      return WebAssembly.instantiate(binary, info);
    }).then(receiver, function(reason) {
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
        return result.then(receiveInstantiatedSource, function(reason) {
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
    } catch(e) {
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

// === Body ===

var ASM_CONSTS = {
  
};




// STATICTOP = STATIC_BASE + 11104;
/* global initializers */  __ATINIT__.push({ func: function() { ___wasm_call_ctors() } });




/* no memory initializer */
// {{PRE_LIBRARY}}


  function abortStackOverflow(allocSize) {
      abort('Stack overflow! Attempted to allocate ' + allocSize + ' bytes on the stack, but stack has only ' + (STACK_MAX - stackSave() + allocSize) + ' bytes available!');
    }

  function callRuntimeCallbacks(callbacks) {
      while(callbacks.length > 0) {
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
        function(x) {
          var y = demangle(x);
          return x === y ? x : (y + ' [' + x + ']');
        });
    }

  
  function dynCallLegacy(sig, ptr, args) {
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      if (args && args.length) {
        // j (64-bit integer) must be passed in as two numbers [low 32, high 32].
        assert(args.length === sig.substring(1).replace(/j/g, '--').length);
      } else {
        assert(sig.length == 1);
      }
      if (args && args.length) {
        return Module['dynCall_' + sig].apply(null, [ptr].concat(args));
      }
      return Module['dynCall_' + sig].call(null, ptr);
    }function dynCall(sig, ptr, args) {
      // Without WASM_BIGINT support we cannot directly call function with i64 as
      // part of thier signature, so we rely the dynCall functions generated by
      // wasm-emscripten-finalize
      if (sig.indexOf('j') != -1) {
        return dynCallLegacy(sig, ptr, args);
      }
  
      return wasmTable.get(ptr).apply(null, args)
    }

  function jsStackTrace() {
      var error = new Error();
      if (!error.stack) {
        // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
        // so try that as a special-case.
        try {
          throw new Error();
        } catch(e) {
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

  
  var ExceptionInfoAttrs={DESTRUCTOR_OFFSET:0,REFCOUNT_OFFSET:4,TYPE_OFFSET:8,CAUGHT_OFFSET:12,RETHROWN_OFFSET:13,SIZE:16};function ___cxa_allocate_exception(size) {
      // Thrown object is prepended by exception metadata block
      return _malloc(size + ExceptionInfoAttrs.SIZE) + ExceptionInfoAttrs.SIZE;
    }

  
  function _atexit(func, arg) {
    }function ___cxa_atexit(a0,a1
  ) {
  return _atexit(a0,a1);
  }

  
  function ExceptionInfo(excPtr) {
      this.excPtr = excPtr;
      this.ptr = excPtr - ExceptionInfoAttrs.SIZE;
  
      this.set_type = function(type) {
        HEAP32[(((this.ptr)+(ExceptionInfoAttrs.TYPE_OFFSET))>>2)]=type;
      };
  
      this.get_type = function() {
        return HEAP32[(((this.ptr)+(ExceptionInfoAttrs.TYPE_OFFSET))>>2)];
      };
  
      this.set_destructor = function(destructor) {
        HEAP32[(((this.ptr)+(ExceptionInfoAttrs.DESTRUCTOR_OFFSET))>>2)]=destructor;
      };
  
      this.get_destructor = function() {
        return HEAP32[(((this.ptr)+(ExceptionInfoAttrs.DESTRUCTOR_OFFSET))>>2)];
      };
  
      this.set_refcount = function(refcount) {
        HEAP32[(((this.ptr)+(ExceptionInfoAttrs.REFCOUNT_OFFSET))>>2)]=refcount;
      };
  
      this.set_caught = function (caught) {
        caught = caught ? 1 : 0;
        HEAP8[(((this.ptr)+(ExceptionInfoAttrs.CAUGHT_OFFSET))>>0)]=caught;
      };
  
      this.get_caught = function () {
        return HEAP8[(((this.ptr)+(ExceptionInfoAttrs.CAUGHT_OFFSET))>>0)] != 0;
      };
  
      this.set_rethrown = function (rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(((this.ptr)+(ExceptionInfoAttrs.RETHROWN_OFFSET))>>0)]=rethrown;
      };
  
      this.get_rethrown = function () {
        return HEAP8[(((this.ptr)+(ExceptionInfoAttrs.RETHROWN_OFFSET))>>0)] != 0;
      };
  
      // Initialize native structure fields. Should be called once after allocated.
      this.init = function(type, destructor) {
        this.set_type(type);
        this.set_destructor(destructor);
        this.set_refcount(0);
        this.set_caught(false);
        this.set_rethrown(false);
      }
  
      this.add_ref = function() {
        var value = HEAP32[(((this.ptr)+(ExceptionInfoAttrs.REFCOUNT_OFFSET))>>2)];
        HEAP32[(((this.ptr)+(ExceptionInfoAttrs.REFCOUNT_OFFSET))>>2)]=value + 1;
      };
  
      // Returns true if last reference released.
      this.release_ref = function() {
        var prev = HEAP32[(((this.ptr)+(ExceptionInfoAttrs.REFCOUNT_OFFSET))>>2)];
        HEAP32[(((this.ptr)+(ExceptionInfoAttrs.REFCOUNT_OFFSET))>>2)]=prev - 1;
        assert(prev > 0);
        return prev === 1;
      };
    }
  
  var exceptionLast=0;
  
  function __ZSt18uncaught_exceptionv() { // std::uncaught_exception()
      return __ZSt18uncaught_exceptionv.uncaught_exceptions > 0;
    }function ___cxa_throw(ptr, type, destructor) {
      var info = new ExceptionInfo(ptr);
      // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
      info.init(type, destructor);
      exceptionLast = ptr;
      if (!("uncaught_exception" in __ZSt18uncaught_exceptionv)) {
        __ZSt18uncaught_exceptionv.uncaught_exceptions = 1;
      } else {
        __ZSt18uncaught_exceptionv.uncaught_exceptions++;
      }
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
      } catch(e) {
        console.error('emscripten_realloc_buffer: Attempted to grow heap from ' + buffer.byteLength  + ' bytes to ' + size + ' bytes, but got error: ' + e);
      }
    }function _emscripten_resize_heap(requestedSize) {
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
      for(var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
  
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), 65536));
  
        var replacement = emscripten_realloc_buffer(newSize);
        if (replacement) {
  
          return true;
        }
      }
      err('Failed to grow the heap from ' + oldSize + ' bytes to ' + newSize + ' bytes, not enough memory!');
      return false;
    }

  
  
  var PATH={splitPath:function(filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function(parts, allowAboveRoot) {
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
      },normalize:function(path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function(path) {
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
      },basename:function(path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function(path) {
        return PATH.splitPath(path)[3];
      },join:function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function(l, r) {
        return PATH.normalize(l + '/' + r);
      }};
  
  
  function setErrNo(value) {
      HEAP32[((___errno_location())>>2)]=value;
      return value;
    }
  
  var PATH_FS={resolve:function() {
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
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function(from, to) {
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
      }};
  
  var TTY={ttys:[],init:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function(stream) {
          // flush any pending line data
          stream.tty.ops.flush(stream.tty);
        },flush:function(stream) {
          stream.tty.ops.flush(stream.tty);
        },read:function(stream, buffer, offset, length, pos /* ignored */) {
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
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function(tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
              var bytesRead = 0;
  
              try {
                bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
              } catch(e) {
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
        },put_char:function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  
  var MEMFS={ops_table:null,mount:function(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function(parent, name, mode, dev) {
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
      },getFileDataAsRegularArray:function(node) {
        if (node.contents && node.contents.subarray) {
          var arr = [];
          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
          return arr; // Returns a copy of the original data.
        }
        return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
      },getFileDataAsTypedArray:function(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function(node, newCapacity) {
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
      },resizeFileStorage:function(node, newSize) {
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
      },node_ops:{getattr:function(node) {
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
        },setattr:function(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function(parent, name) {
          throw FS.genericErrors[44];
        },mknod:function(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function(old_node, new_dir, new_name) {
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
        },unlink:function(parent, name) {
          delete parent.contents[name];
        },rmdir:function(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
        },readdir:function(node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        }},stream_ops:{read:function(stream, buffer, offset, length, position) {
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
        },write:function(stream, buffer, offset, length, position, canOwn) {
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
          MEMFS.expandFileStorage(node, position+length);
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
        },llseek:function(stream, offset, whence) {
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
        },allocate:function(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function(stream, address, length, position, prot, flags) {
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
        },msync:function(stream, buffer, offset, length, mmapFlags) {
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
        }}};
  
  var ERRNO_MESSAGES={0:"Success",1:"Arg list too long",2:"Permission denied",3:"Address already in use",4:"Address not available",5:"Address family not supported by protocol family",6:"No more processes",7:"Socket already connected",8:"Bad file number",9:"Trying to read unreadable message",10:"Mount device busy",11:"Operation canceled",12:"No children",13:"Connection aborted",14:"Connection refused",15:"Connection reset by peer",16:"File locking deadlock error",17:"Destination address required",18:"Math arg out of domain of func",19:"Quota exceeded",20:"File exists",21:"Bad address",22:"File too large",23:"Host is unreachable",24:"Identifier removed",25:"Illegal byte sequence",26:"Connection already in progress",27:"Interrupted system call",28:"Invalid argument",29:"I/O error",30:"Socket is already connected",31:"Is a directory",32:"Too many symbolic links",33:"Too many open files",34:"Too many links",35:"Message too long",36:"Multihop attempted",37:"File or path name too long",38:"Network interface is not configured",39:"Connection reset by network",40:"Network is unreachable",41:"Too many open files in system",42:"No buffer space available",43:"No such device",44:"No such file or directory",45:"Exec format error",46:"No record locks available",47:"The link has been severed",48:"Not enough core",49:"No message of desired type",50:"Protocol not available",51:"No space left on device",52:"Function not implemented",53:"Socket is not connected",54:"Not a directory",55:"Directory not empty",56:"State not recoverable",57:"Socket operation on non-socket",59:"Not a typewriter",60:"No such device or address",61:"Value too large for defined data type",62:"Previous owner died",63:"Not super-user",64:"Broken pipe",65:"Protocol error",66:"Unknown protocol",67:"Protocol wrong type for socket",68:"Math result not representable",69:"Read only file system",70:"Illegal seek",71:"No such process",72:"Stale file handle",73:"Connection timed out",74:"Text file busy",75:"Cross-device link",100:"Device not a stream",101:"Bad font file fmt",102:"Invalid slot",103:"Invalid request code",104:"No anode",105:"Block device required",106:"Channel number out of range",107:"Level 3 halted",108:"Level 3 reset",109:"Link number out of range",110:"Protocol driver not attached",111:"No CSI structure available",112:"Level 2 halted",113:"Invalid exchange",114:"Invalid request descriptor",115:"Exchange full",116:"No data (for no delay io)",117:"Timer expired",118:"Out of streams resources",119:"Machine is not on the network",120:"Package not installed",121:"The object is remote",122:"Advertise error",123:"Srmount error",124:"Communication error on send",125:"Cross mount point (not really error)",126:"Given log. name not unique",127:"f.d. invalid for this operation",128:"Remote address changed",129:"Can   access a needed shared lib",130:"Accessing a corrupted shared lib",131:".lib section in a.out corrupted",132:"Attempting to link in too many libs",133:"Attempting to exec a shared library",135:"Streams pipe error",136:"Too many users",137:"Socket type not supported",138:"Not supported",139:"Protocol family not supported",140:"Can't send after socket shutdown",141:"Too many references",142:"Host is down",148:"No medium (in tape drive)",156:"Level 2 not synchronized"};
  
  var ERRNO_CODES={EPERM:63,ENOENT:44,ESRCH:71,EINTR:27,EIO:29,ENXIO:60,E2BIG:1,ENOEXEC:45,EBADF:8,ECHILD:12,EAGAIN:6,EWOULDBLOCK:6,ENOMEM:48,EACCES:2,EFAULT:21,ENOTBLK:105,EBUSY:10,EEXIST:20,EXDEV:75,ENODEV:43,ENOTDIR:54,EISDIR:31,EINVAL:28,ENFILE:41,EMFILE:33,ENOTTY:59,ETXTBSY:74,EFBIG:22,ENOSPC:51,ESPIPE:70,EROFS:69,EMLINK:34,EPIPE:64,EDOM:18,ERANGE:68,ENOMSG:49,EIDRM:24,ECHRNG:106,EL2NSYNC:156,EL3HLT:107,EL3RST:108,ELNRNG:109,EUNATCH:110,ENOCSI:111,EL2HLT:112,EDEADLK:16,ENOLCK:46,EBADE:113,EBADR:114,EXFULL:115,ENOANO:104,EBADRQC:103,EBADSLT:102,EDEADLOCK:16,EBFONT:101,ENOSTR:100,ENODATA:116,ETIME:117,ENOSR:118,ENONET:119,ENOPKG:120,EREMOTE:121,ENOLINK:47,EADV:122,ESRMNT:123,ECOMM:124,EPROTO:65,EMULTIHOP:36,EDOTDOT:125,EBADMSG:9,ENOTUNIQ:126,EBADFD:127,EREMCHG:128,ELIBACC:129,ELIBBAD:130,ELIBSCN:131,ELIBMAX:132,ELIBEXEC:133,ENOSYS:52,ENOTEMPTY:55,ENAMETOOLONG:37,ELOOP:32,EOPNOTSUPP:138,EPFNOSUPPORT:139,ECONNRESET:15,ENOBUFS:42,EAFNOSUPPORT:5,EPROTOTYPE:67,ENOTSOCK:57,ENOPROTOOPT:50,ESHUTDOWN:140,ECONNREFUSED:14,EADDRINUSE:3,ECONNABORTED:13,ENETUNREACH:40,ENETDOWN:38,ETIMEDOUT:73,EHOSTDOWN:142,EHOSTUNREACH:23,EINPROGRESS:26,EALREADY:7,EDESTADDRREQ:17,EMSGSIZE:35,EPROTONOSUPPORT:66,ESOCKTNOSUPPORT:137,EADDRNOTAVAIL:4,ENETRESET:39,EISCONN:30,ENOTCONN:53,ETOOMANYREFS:141,EUSERS:136,EDQUOT:19,ESTALE:72,ENOTSUP:138,ENOMEDIUM:148,EILSEQ:25,EOVERFLOW:61,ECANCELED:11,ENOTRECOVERABLE:56,EOWNERDEAD:62,ESTRPIPE:135};var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,handleFSError:function(e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return setErrNo(e.errno);
      },lookupPath:function(path, opts) {
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
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
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
      },getPath:function(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function(parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function(node) {
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
      },lookupNode:function(parent, name) {
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
      },createNode:function(parent, name, mode, rdev) {
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function(node) {
        FS.hashRemoveNode(node);
      },isRoot:function(node) {
        return node === node.parent;
      },isMountpoint:function(node) {
        return !!node.mounted;
      },isFile:function(mode) {
        return (mode & 61440) === 32768;
      },isDir:function(mode) {
        return (mode & 61440) === 16384;
      },isLink:function(mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function(mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function(mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function(mode) {
        return (mode & 61440) === 4096;
      },isSocket:function(mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function(str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function(node, perms) {
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
      },mayLookup:function(dir) {
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },mayCreate:function(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function(dir, name, isdir) {
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
      },mayOpen:function(node, flags) {
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
      },MAX_OPEN_FDS:4096,nextfd:function(fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },getStream:function(fd) {
        return FS.streams[fd];
      },createStream:function(stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = /** @constructor */ function(){};
          FS.FSStream.prototype = {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
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
      },closeStream:function(fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function() {
          throw new FS.ErrnoError(70);
        }},major:function(dev) {
        return ((dev) >> 8);
      },minor:function(dev) {
        return ((dev) & 0xff);
      },makedev:function(ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function(dev) {
        return FS.devices[dev];
      },getMounts:function(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function(populate, callback) {
        if (typeof(populate) === 'function') {
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
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function(type, opts, mountpoint) {
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
      },unmount:function (mountpoint) {
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
      },lookup:function(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function(path, mode, dev) {
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
      },create:function(path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function(path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdirTree:function(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },mkdev:function(path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function(oldpath, newpath) {
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
      },rename:function(old_path, new_path) {
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
        } catch(e) {
          err("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
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
        } catch(e) {
          err("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
      },rmdir:function(path) {
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
        } catch(e) {
          err("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          err("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readdir:function(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },unlink:function(path) {
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
        } catch(e) {
          err("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          err("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },stat:function(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },lstat:function(path) {
        return FS.stat(path, true);
      },chmod:function(path, mode, dontFollow) {
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
      },lchmod:function(path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function(fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      },chown:function(path, uid, gid, dontFollow) {
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
      },lchown:function(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function(fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function(path, len) {
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
      },ftruncate:function(fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },utime:function(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function(path, flags, mode, fd_start, fd_end) {
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
        } catch(e) {
          err("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
        }
        return stream;
      },close:function(stream) {
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
      },isClosed:function(stream) {
        return stream.fd === null;
      },llseek:function(stream, offset, whence) {
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
      },read:function(stream, buffer, offset, length, position) {
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
      },write:function(stream, buffer, offset, length, position, canOwn) {
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
        } catch(e) {
          err("FS.trackingDelegate['onWriteToFile']('"+stream.path+"') threw an exception: " + e.message);
        }
        return bytesWritten;
      },allocate:function(stream, offset, length) {
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
      },mmap:function(stream, address, length, position, prot, flags) {
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
      },msync:function(stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:function(stream) {
        return 0;
      },ioctl:function(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function(path, opts) {
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
      },writeFile:function(path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data === 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },cwd:function() {
        return FS.currentPath;
      },chdir:function(path) {
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
      },createDefaultDirectories:function() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:function() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function(stream, buffer, offset, length, pos) { return length; }
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
          random_device = function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
        } else
        if (ENVIRONMENT_IS_NODE) {
          // for nodejs with or without crypto support included
          try {
            var crypto_module = require('crypto');
            // nodejs has crypto support
            random_device = function() { return crypto_module['randomBytes'](1)[0]; };
          } catch (e) {
            // nodejs doesn't have crypto support
          }
        } else
        {}
        if (!random_device) {
          // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
          random_device = function() { abort("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };"); };
        }
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createSpecialDirectories:function() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: function() {
            var node = FS.createNode('/proc/self', 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: function(parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(8);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: function() { return stream.path } }
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },createStandardStreams:function() {
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
      },ensureErrnoError:function() {
        if (FS.ErrnoError) return;
        FS.ErrnoError = /** @this{Object} */ function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = /** @this{Object} */ function(errno) {
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
        [44].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function() {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },init:function(input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function() {
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
      },getMode:function(canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function(parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function(relative, base) {
        return PATH_FS.resolve(base, relative);
      },standardizePath:function(path) {
        return PATH.normalize(path);
      },findObject:function(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          setErrNo(ret.error);
          return null;
        }
      },analyzePath:function(path, dontResolveLastLink) {
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
        };
        return ret;
      },createFolder:function(parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function(parent, path, canRead, canWrite) {
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
      },createFile:function(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function(parent, name, data, canRead, canWrite, canOwn) {
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
      },createDevice:function(parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
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
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
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
      },createLink:function(parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function(obj) {
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
      },createLazyFile:function(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        /** @constructor */
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
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
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
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
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
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
              get: /** @this{Object} */ function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: /** @this{Object} */ function() {
                if(!this.lengthKnown) {
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
            get: /** @this {FSNode} */ function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
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
      },createPreloadedFile:function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
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
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
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
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function() {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function() {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function(paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
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
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function(paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
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
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },mmapAlloc:function(size) {
        var alignedSize = alignMemory(size, 16384);
        var ptr = _malloc(alignedSize);
        while (size < alignedSize) HEAP8[ptr + size++] = 0;
        return ptr;
      }};var SYSCALLS={mappings:{},DEFAULT_POLLMASK:5,umask:511,calculateAt:function(dirfd, path) {
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
      },doStat:function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -54;
          }
          throw e;
        }
        HEAP32[((buf)>>2)]=stat.dev;
        HEAP32[(((buf)+(4))>>2)]=0;
        HEAP32[(((buf)+(8))>>2)]=stat.ino;
        HEAP32[(((buf)+(12))>>2)]=stat.mode;
        HEAP32[(((buf)+(16))>>2)]=stat.nlink;
        HEAP32[(((buf)+(20))>>2)]=stat.uid;
        HEAP32[(((buf)+(24))>>2)]=stat.gid;
        HEAP32[(((buf)+(28))>>2)]=stat.rdev;
        HEAP32[(((buf)+(32))>>2)]=0;
        (tempI64 = [stat.size>>>0,(tempDouble=stat.size,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(40))>>2)]=tempI64[0],HEAP32[(((buf)+(44))>>2)]=tempI64[1]);
        HEAP32[(((buf)+(48))>>2)]=4096;
        HEAP32[(((buf)+(52))>>2)]=stat.blocks;
        HEAP32[(((buf)+(56))>>2)]=(stat.atime.getTime() / 1000)|0;
        HEAP32[(((buf)+(60))>>2)]=0;
        HEAP32[(((buf)+(64))>>2)]=(stat.mtime.getTime() / 1000)|0;
        HEAP32[(((buf)+(68))>>2)]=0;
        HEAP32[(((buf)+(72))>>2)]=(stat.ctime.getTime() / 1000)|0;
        HEAP32[(((buf)+(76))>>2)]=0;
        (tempI64 = [stat.ino>>>0,(tempDouble=stat.ino,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(80))>>2)]=tempI64[0],HEAP32[(((buf)+(84))>>2)]=tempI64[1]);
        return 0;
      },doMsync:function(addr, stream, len, flags, offset) {
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },doMkdir:function(path, mode) {
        // remove a trailing slash, if one - /a/b/ has basename of '', but
        // we want to create b in the context of this function
        path = PATH.normalize(path);
        if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
        FS.mkdir(path, mode, 0);
        return 0;
      },doMknod:function(path, mode, dev) {
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
      },doReadlink:function(path, buf, bufsize) {
        if (bufsize <= 0) return -28;
        var ret = FS.readlink(path);
  
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf+len];
        stringToUTF8(ret, buf, bufsize+1);
        // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
        // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
        HEAP8[buf+len] = endChar;
  
        return len;
      },doAccess:function(path, amode) {
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
      },doDup:function(path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest) FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      },doReadv:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.read(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break; // nothing more to read
        }
        return ret;
      },doWritev:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = HEAP32[(((iov)+(i*8))>>2)];
          var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
          var curr = FS.write(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
        }
        return ret;
      },varargs:undefined,get:function() {
        assert(SYSCALLS.varargs != undefined);
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },getStreamFromFD:function(fd) {
        var stream = FS.getStream(fd);
        if (!stream) throw new FS.ErrnoError(8);
        return stream;
      },get64:function(low, high) {
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
      }};function _fd_close(fd) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_read(fd, iov, iovcnt, pnum) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doReadv(stream, iov, iovcnt);
      HEAP32[((pnum)>>2)]=num
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {try {
  
      
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
      (tempI64 = [stream.position>>>0,(tempDouble=stream.position,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((newOffset)>>2)]=tempI64[0],HEAP32[(((newOffset)+(4))>>2)]=tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _fd_write(fd, iov, iovcnt, pnum) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doWritev(stream, iov, iovcnt);
      HEAP32[((pnum)>>2)]=num
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }

  function _setTempRet0($i) {
      setTempRet0(($i) | 0);
    }
var FSNode = /** @constructor */ function(parent, name, mode, rdev) {
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
    get: /** @this{FSNode} */function() {
     return (this.mode & readMode) === readMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= readMode : this.mode &= ~readMode;
    }
   },
   write: {
    get: /** @this{FSNode} */function() {
     return (this.mode & writeMode) === writeMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= writeMode : this.mode &= ~writeMode;
    }
   },
   isFolder: {
    get: /** @this{FSNode} */function() {
     return FS.isDir(this.mode);
    }
   },
   isDevice: {
    get: /** @this{FSNode} */function() {
     return FS.isChrdev(this.mode);
    }
   }
  });
  FS.FSNode = FSNode;
  FS.staticInit();;
var ASSERTIONS = true;



/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
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
      if (ASSERTIONS) {
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
    for (var i = 0 ; i < decoded.length ; ++i) {
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

if (!Object.getOwnPropertyDescriptor(Module, "intArrayFromString")) Module["intArrayFromString"] = function() { abort("'intArrayFromString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "intArrayToString")) Module["intArrayToString"] = function() { abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["ccall"] = ccall;
Module["cwrap"] = cwrap;
if (!Object.getOwnPropertyDescriptor(Module, "setValue")) Module["setValue"] = function() { abort("'setValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getValue")) Module["getValue"] = function() { abort("'getValue' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "allocate")) Module["allocate"] = function() { abort("'allocate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getMemory")) Module["getMemory"] = function() { abort("'getMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "UTF8ArrayToString")) Module["UTF8ArrayToString"] = function() { abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UTF8ToString")) Module["UTF8ToString"] = function() { abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8Array")) Module["stringToUTF8Array"] = function() { abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8")) Module["stringToUTF8"] = function() { abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF8")) Module["lengthBytesUTF8"] = function() { abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function() { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPreRun")) Module["addOnPreRun"] = function() { abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnInit")) Module["addOnInit"] = function() { abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPreMain")) Module["addOnPreMain"] = function() { abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnExit")) Module["addOnExit"] = function() { abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPostRun")) Module["addOnPostRun"] = function() { abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeStringToMemory")) Module["writeStringToMemory"] = function() { abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeArrayToMemory")) Module["writeArrayToMemory"] = function() { abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeAsciiToMemory")) Module["writeAsciiToMemory"] = function() { abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addRunDependency")) Module["addRunDependency"] = function() { abort("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "removeRunDependency")) Module["removeRunDependency"] = function() { abort("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createFolder")) Module["FS_createFolder"] = function() { abort("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createPath")) Module["FS_createPath"] = function() { abort("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createDataFile")) Module["FS_createDataFile"] = function() { abort("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createPreloadedFile")) Module["FS_createPreloadedFile"] = function() { abort("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createLazyFile")) Module["FS_createLazyFile"] = function() { abort("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createLink")) Module["FS_createLink"] = function() { abort("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createDevice")) Module["FS_createDevice"] = function() { abort("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_unlink")) Module["FS_unlink"] = function() { abort("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "dynamicAlloc")) Module["dynamicAlloc"] = function() { abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "loadDynamicLibrary")) Module["loadDynamicLibrary"] = function() { abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "loadWebAssemblyModule")) Module["loadWebAssemblyModule"] = function() { abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getLEB")) Module["getLEB"] = function() { abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getFunctionTables")) Module["getFunctionTables"] = function() { abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "alignFunctionTables")) Module["alignFunctionTables"] = function() { abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerFunctions")) Module["registerFunctions"] = function() { abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addFunction")) Module["addFunction"] = function() { abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "removeFunction")) Module["removeFunction"] = function() { abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function() { abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "prettyPrint")) Module["prettyPrint"] = function() { abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "makeBigInt")) Module["makeBigInt"] = function() { abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function() { abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getCompilerSetting")) Module["getCompilerSetting"] = function() { abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "print")) Module["print"] = function() { abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "printErr")) Module["printErr"] = function() { abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getTempRet0")) Module["getTempRet0"] = function() { abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setTempRet0")) Module["setTempRet0"] = function() { abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "callMain")) Module["callMain"] = function() { abort("'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "abort")) Module["abort"] = function() { abort("'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToNewUTF8")) Module["stringToNewUTF8"] = function() { abort("'stringToNewUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscripten_realloc_buffer")) Module["emscripten_realloc_buffer"] = function() { abort("'emscripten_realloc_buffer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ENV")) Module["ENV"] = function() { abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_CODES")) Module["ERRNO_CODES"] = function() { abort("'ERRNO_CODES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_MESSAGES")) Module["ERRNO_MESSAGES"] = function() { abort("'ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setErrNo")) Module["setErrNo"] = function() { abort("'setErrNo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "DNS")) Module["DNS"] = function() { abort("'DNS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GAI_ERRNO_MESSAGES")) Module["GAI_ERRNO_MESSAGES"] = function() { abort("'GAI_ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Protocols")) Module["Protocols"] = function() { abort("'Protocols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Sockets")) Module["Sockets"] = function() { abort("'Sockets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "traverseStack")) Module["traverseStack"] = function() { abort("'traverseStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UNWIND_CACHE")) Module["UNWIND_CACHE"] = function() { abort("'UNWIND_CACHE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "withBuiltinMalloc")) Module["withBuiltinMalloc"] = function() { abort("'withBuiltinMalloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgsArray")) Module["readAsmConstArgsArray"] = function() { abort("'readAsmConstArgsArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgs")) Module["readAsmConstArgs"] = function() { abort("'readAsmConstArgs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "mainThreadEM_ASM")) Module["mainThreadEM_ASM"] = function() { abort("'mainThreadEM_ASM' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jstoi_q")) Module["jstoi_q"] = function() { abort("'jstoi_q' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jstoi_s")) Module["jstoi_s"] = function() { abort("'jstoi_s' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getExecutableName")) Module["getExecutableName"] = function() { abort("'getExecutableName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "listenOnce")) Module["listenOnce"] = function() { abort("'listenOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "autoResumeAudioContext")) Module["autoResumeAudioContext"] = function() { abort("'autoResumeAudioContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "dynCallLegacy")) Module["dynCallLegacy"] = function() { abort("'dynCallLegacy' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getDynCaller")) Module["getDynCaller"] = function() { abort("'getDynCaller' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function() { abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "callRuntimeCallbacks")) Module["callRuntimeCallbacks"] = function() { abort("'callRuntimeCallbacks' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "abortStackOverflow")) Module["abortStackOverflow"] = function() { abort("'abortStackOverflow' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "reallyNegative")) Module["reallyNegative"] = function() { abort("'reallyNegative' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "unSign")) Module["unSign"] = function() { abort("'unSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "reSign")) Module["reSign"] = function() { abort("'reSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "formatString")) Module["formatString"] = function() { abort("'formatString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PATH")) Module["PATH"] = function() { abort("'PATH' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PATH_FS")) Module["PATH_FS"] = function() { abort("'PATH_FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SYSCALLS")) Module["SYSCALLS"] = function() { abort("'SYSCALLS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "syscallMmap2")) Module["syscallMmap2"] = function() { abort("'syscallMmap2' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "syscallMunmap")) Module["syscallMunmap"] = function() { abort("'syscallMunmap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "JSEvents")) Module["JSEvents"] = function() { abort("'JSEvents' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "specialHTMLTargets")) Module["specialHTMLTargets"] = function() { abort("'specialHTMLTargets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "maybeCStringToJsString")) Module["maybeCStringToJsString"] = function() { abort("'maybeCStringToJsString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "findEventTarget")) Module["findEventTarget"] = function() { abort("'findEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "findCanvasEventTarget")) Module["findCanvasEventTarget"] = function() { abort("'findCanvasEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "polyfillSetImmediate")) Module["polyfillSetImmediate"] = function() { abort("'polyfillSetImmediate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "demangle")) Module["demangle"] = function() { abort("'demangle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "demangleAll")) Module["demangleAll"] = function() { abort("'demangleAll' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jsStackTrace")) Module["jsStackTrace"] = function() { abort("'jsStackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function() { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getEnvStrings")) Module["getEnvStrings"] = function() { abort("'getEnvStrings' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "checkWasiClock")) Module["checkWasiClock"] = function() { abort("'checkWasiClock' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64")) Module["writeI53ToI64"] = function() { abort("'writeI53ToI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Clamped")) Module["writeI53ToI64Clamped"] = function() { abort("'writeI53ToI64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Signaling")) Module["writeI53ToI64Signaling"] = function() { abort("'writeI53ToI64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Clamped")) Module["writeI53ToU64Clamped"] = function() { abort("'writeI53ToU64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Signaling")) Module["writeI53ToU64Signaling"] = function() { abort("'writeI53ToU64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readI53FromI64")) Module["readI53FromI64"] = function() { abort("'readI53FromI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readI53FromU64")) Module["readI53FromU64"] = function() { abort("'readI53FromU64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "convertI32PairToI53")) Module["convertI32PairToI53"] = function() { abort("'convertI32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "convertU32PairToI53")) Module["convertU32PairToI53"] = function() { abort("'convertU32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exceptionLast")) Module["exceptionLast"] = function() { abort("'exceptionLast' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exceptionCaught")) Module["exceptionCaught"] = function() { abort("'exceptionCaught' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exceptionThrowBuf")) Module["exceptionThrowBuf"] = function() { abort("'exceptionThrowBuf' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfoAttrs")) Module["ExceptionInfoAttrs"] = function() { abort("'ExceptionInfoAttrs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfo")) Module["ExceptionInfo"] = function() { abort("'ExceptionInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "CatchInfo")) Module["CatchInfo"] = function() { abort("'CatchInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exception_addRef")) Module["exception_addRef"] = function() { abort("'exception_addRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exception_decRef")) Module["exception_decRef"] = function() { abort("'exception_decRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Browser")) Module["Browser"] = function() { abort("'Browser' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "funcWrappers")) Module["funcWrappers"] = function() { abort("'funcWrappers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function() { abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setMainLoop")) Module["setMainLoop"] = function() { abort("'setMainLoop' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "FS")) Module["FS"] = function() { abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "MEMFS")) Module["MEMFS"] = function() { abort("'MEMFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "TTY")) Module["TTY"] = function() { abort("'TTY' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PIPEFS")) Module["PIPEFS"] = function() { abort("'PIPEFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SOCKFS")) Module["SOCKFS"] = function() { abort("'SOCKFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "tempFixedLengthArray")) Module["tempFixedLengthArray"] = function() { abort("'tempFixedLengthArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "miniTempWebGLFloatBuffers")) Module["miniTempWebGLFloatBuffers"] = function() { abort("'miniTempWebGLFloatBuffers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "heapObjectForWebGLType")) Module["heapObjectForWebGLType"] = function() { abort("'heapObjectForWebGLType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "heapAccessShiftForWebGLHeap")) Module["heapAccessShiftForWebGLHeap"] = function() { abort("'heapAccessShiftForWebGLHeap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GL")) Module["GL"] = function() { abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGet")) Module["emscriptenWebGLGet"] = function() { abort("'emscriptenWebGLGet' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "computeUnpackAlignedImageSize")) Module["computeUnpackAlignedImageSize"] = function() { abort("'computeUnpackAlignedImageSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetTexPixelData")) Module["emscriptenWebGLGetTexPixelData"] = function() { abort("'emscriptenWebGLGetTexPixelData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetUniform")) Module["emscriptenWebGLGetUniform"] = function() { abort("'emscriptenWebGLGetUniform' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetVertexAttrib")) Module["emscriptenWebGLGetVertexAttrib"] = function() { abort("'emscriptenWebGLGetVertexAttrib' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeGLArray")) Module["writeGLArray"] = function() { abort("'writeGLArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "AL")) Module["AL"] = function() { abort("'AL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_unicode")) Module["SDL_unicode"] = function() { abort("'SDL_unicode' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_ttfContext")) Module["SDL_ttfContext"] = function() { abort("'SDL_ttfContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_audio")) Module["SDL_audio"] = function() { abort("'SDL_audio' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL")) Module["SDL"] = function() { abort("'SDL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_gfx")) Module["SDL_gfx"] = function() { abort("'SDL_gfx' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLUT")) Module["GLUT"] = function() { abort("'GLUT' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "EGL")) Module["EGL"] = function() { abort("'EGL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLFW_Window")) Module["GLFW_Window"] = function() { abort("'GLFW_Window' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLFW")) Module["GLFW"] = function() { abort("'GLFW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLEW")) Module["GLEW"] = function() { abort("'GLEW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "IDBStore")) Module["IDBStore"] = function() { abort("'IDBStore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "runAndAbortIfError")) Module["runAndAbortIfError"] = function() { abort("'runAndAbortIfError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "warnOnce")) Module["warnOnce"] = function() { abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackSave")) Module["stackSave"] = function() { abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackRestore")) Module["stackRestore"] = function() { abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackAlloc")) Module["stackAlloc"] = function() { abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "AsciiToString")) Module["AsciiToString"] = function() { abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToAscii")) Module["stringToAscii"] = function() { abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UTF16ToString")) Module["UTF16ToString"] = function() { abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF16")) Module["stringToUTF16"] = function() { abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF16")) Module["lengthBytesUTF16"] = function() { abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UTF32ToString")) Module["UTF32ToString"] = function() { abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF32")) Module["stringToUTF32"] = function() { abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF32")) Module["lengthBytesUTF32"] = function() { abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8")) Module["allocateUTF8"] = function() { abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8OnStack")) Module["allocateUTF8OnStack"] = function() { abort("'allocateUTF8OnStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["writeStackCookie"] = writeStackCookie;
Module["checkStackCookie"] = checkStackCookie;
if (!Object.getOwnPropertyDescriptor(Module, "intArrayFromBase64")) Module["intArrayFromBase64"] = function() { abort("'intArrayFromBase64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "tryParseAsDataURI")) Module["tryParseAsDataURI"] = function() { abort("'tryParseAsDataURI' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NORMAL")) Object.defineProperty(Module, "ALLOC_NORMAL", { configurable: true, get: function() { abort("'ALLOC_NORMAL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_STACK")) Object.defineProperty(Module, "ALLOC_STACK", { configurable: true, get: function() { abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_DYNAMIC")) Object.defineProperty(Module, "ALLOC_DYNAMIC", { configurable: true, get: function() { abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NONE")) Object.defineProperty(Module, "ALLOC_NONE", { configurable: true, get: function() { abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });


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

var calledMain = false;


dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};





/** @type {function(Array=)} */
function run(args) {
  args = args || arguments_;

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
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}
Module['run'] = run;

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var print = out;
  var printErr = err;
  var has = false;
  out = err = function(x) {
    has = true;
  }
  try { // it doesn't matter if it fails
    var flush = Module['_fflush'];
    if (flush) flush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach(function(name) {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty && tty.output && tty.output.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = print;
  err = printErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.');
  }
}

/** @param {boolean|number=} implicit */
function exit(status, implicit) {
  checkUnflushedContent();

  // if this is just main exit-ing implicitly, and the status is 0, then we
  // don't need to do anything here and can just leave. if the status is
  // non-zero, though, then we need to report it.
  // (we may have warned about this earlier, if a situation justifies doing so)
  if (implicit && noExitRuntime && status === 0) {
    return;
  }

  if (noExitRuntime) {
    // if exit() was called, we may warn the user if the runtime isn't actually being shut down
    if (!implicit) {
      var msg = 'program exited (with status: ' + status + '), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)';
      readyPromiseReject(msg);
      err(msg);
    }
  } else {

    ABORT = true;
    EXITSTATUS = status;

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);
  }

  quit_(status, new ExitStatus(status));
}

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
export default Module;