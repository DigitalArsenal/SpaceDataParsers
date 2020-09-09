
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
    STACK_BASE = 5254992,
    STACKTOP = STACK_BASE,
    STACK_MAX = 12112,
    DYNAMIC_BASE = 5254992,
    DYNAMICTOP_PTR = 12096;

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

var wasmBinaryFile = 'data:application/octet-stream;base64,AGFzbQEAAAABsgU7YAF/AX9gAX8AYAJ/fwF/YAN/f38Bf2ACf38AYAN/f38AYAABf2AAAGABfAF8YAR/f39/AGAGf39/f39/AGAFf35+fn4AYAV/f39/fwBgBH9/f38Bf2AFf39/f38Bf2ADf35/AX5gAnx8AXxgBH9+fn8AYAZ/fH9/f38Bf2AFf3x8f38Bf2ABfAF+YAJ/fABgBHx8fHwAYAR/fH9/AX9gAn5/AX9gBH5+fn4Bf2ACfH8BfGADfHx/AXxgB39/f39/f38AYAl/f39/f39/f38AYAp/f39/f39/f39/AGAIf39/f398f38AYA5/f398fHx8fHx8fHx8fwBgA39/fgBgAn9+AGADf35+AGACf30AYAR/fH9/AGAHf3x/f39/fwBgJX98fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH9/f39/f39/f38AYAR8fHx/AGAWfHx8fHx8f39/f39/f39/f39/f39/fwBgWHx8fHx8fHx/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/f38AYCh8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx/f39/f39/AGBJfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8f39/f39/f39/f39/f39/f39/f39/f39/f39/f39/fwBgB39/f39/f38Bf2AHf39/fHx8fwF/YAR/fn9/AX9gFX98fHx8fHx8f39/f3x8fHx/fHx8fwF/YAN+f38Bf2ACfn4Bf2ACfH8Bf2ADfH9/AX9gAn9/AX5gBH9/f34BfmAEf39+fwF+YAJ+fgF9YAF/AXxgAn5+AXwCwgINA2VudhhfX2N4YV9hbGxvY2F0ZV9leGNlcHRpb24AAANlbnYLX19jeGFfdGhyb3cABQNlbnYMX19jeGFfYXRleGl0AAMWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF9jbG9zZQAAFndhc2lfc25hcHNob3RfcHJldmlldzEHZmRfcmVhZAANFndhc2lfc25hcHNob3RfcHJldmlldzEIZmRfd3JpdGUADQNlbnYFYWJvcnQABwNlbnYWZW1zY3JpcHRlbl9yZXNpemVfaGVhcAAAA2VudhVlbXNjcmlwdGVuX21lbWNweV9iaWcAAwNlbnYLc2V0VGVtcFJldDAAARZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxB2ZkX3NlZWsADgNlbnYGbWVtb3J5AgGAA4CAAgNlbnYFdGFibGUBcAAiA/EC7wIGBxkZERELCwsLGjIDAwADAgABAAYBAAQQJAQGBgsVBAs4OgMFBDkQAQICAwECAAICAAUFBAEBCCAdKQgIKissJQMIECceBSYfBAAVCCgWFgcHBwcHBwEABwEDAAUAAAAAAAAAAQAAAAQAAAAEBQEAAAAAAAQFAAAAAAAAAAMAAgAABgABAQgIBxIuAQUAAAUAAAUBAAACAwAABQABAAQAAAAFAgADAAIAAgEwAQEAAAIAAQECAgIAAAEMAAACAgACAgIEAQIFAgQCAwACAAAHBzQCExcXDQgIExMGBgYNAQAAAAAAAAAAAAAAAAAbMw4ICAgIFAgUAAMAAwMEAAMPAAAiADYACxEjCQocNQMAAiEDAAMCBQMaDi0FAAkxGBgMAhIEFAMCAgYGBgYGAAIABwAABAAAAAQEBAMEAAAAAAQEBAYGAwEKBgABAAAAAAEAAQABAQEBAwMAAgoJDAUJBQkMCgABBAAPGxA3Di8ABhACfwFB0N7AAgt/AEG43gALB4IEHhFfX3dhc21fY2FsbF9jdG9ycwAMBmZmbHVzaABVFnNpemVPZnNhdGVsbGl0ZUNhdGFsb2cAjQEHZnJlZVB0cgCPAQRmcmVlAPACCWRlbGV0ZVB0cgCQAQ5yZWdpc3RlckVudGl0eQCVARFyZWdpc3RlckVudGl0eU9NTQC2AQxyZW1vdmVFbnRpdHkAtwEJcmVtb3ZlQWxsANoBCXByb3BhZ2F0ZQDcAQZtYWxsb2MA7wIRZ2VuZXJhdGVFcGhlbWVyaXMA3gEIZ2V0VmFsdWUA3wEYZ2V0VmFsdWVJblJlZmVyZW5jZUZyYW1lAOABD2dldFNhdEF6RWxSYW5nZQDhARpnZXRTYXRBekVsUmFuZ2VGb3JJbnRlcnZhbADkASJnZXRTYXRBekVsUmFuZ2VQb3NpdGlvbkZvckludGVydmFsAOUBDmRlc2NyaWJlT2JqZWN0AOYBEF9fZXJybm9fbG9jYXRpb24AswILX2dldF90em5hbWUAtAINX2dldF9kYXlsaWdodAC1Ag1fZ2V0X3RpbWV6b25lALYCCHNldFRocmV3ACIJc3RhY2tTYXZlAB8Mc3RhY2tSZXN0b3JlACAKc3RhY2tBbGxvYwAhCl9fZGF0YV9lbmQDAQxkeW5DYWxsX2ppamkA9wIQX19ncm93V2FzbU1lbW9yeQD5AglFAQBBAQshOWFk8ALvAq0CrgKhAoICgwKKArACiQLUAtUC1gLaAtsC3ALdAuEC3gLfAuIC5gLoAuoC4ALuAu0C7ALyAvMCCunSB+8CBgBBwN4ACwQAEFwL4AECAX8CfkEBIQQCQCAAQgBSIAFC////////////AIMiBUKAgICAgIDA//8AViAFQoCAgICAgMD//wBRGw0AIAJCAFIgA0L///////////8AgyIGQoCAgICAgMD//wBWIAZCgICAgICAwP//AFEbDQACQCACIACEIAYgBYSEUEUNAEEADwsCQCADIAGDQgBTDQBBfyEEIAAgAlQgASADUyABIANRGw0BIAAgAoUgASADhYRCAFIPC0F/IQQgACACViABIANVIAEgA1EbDQAgACAChSABIAOFhEIAUiEECyAEC9gBAgF/An5BfyEEAkAgAEIAUiABQv///////////wCDIgVCgICAgICAwP//AFYgBUKAgICAgIDA//8AURsNACACQgBSIANC////////////AIMiBkKAgICAgIDA//8AViAGQoCAgICAgMD//wBRGw0AAkAgAiAAhCAGIAWEhFBFDQBBAA8LAkAgAyABg0IAUw0AIAAgAlQgASADUyABIANRGw0BIAAgAoUgASADhYRCAFIPCyAAIAJWIAEgA1UgASADURsNACAAIAKFIAEgA4WEQgBSIQQLIAQLUwEBfgJAAkAgA0HAAHFFDQAgASADQUBqrYYhAkIAIQEMAQsgA0UNACABQcAAIANrrYggAiADrSIEhoQhAiABIASGIQELIAAgATcDACAAIAI3AwgLUwEBfgJAAkAgA0HAAHFFDQAgAiADQUBqrYghAUIAIQIMAQsgA0UNACACQcAAIANrrYYgASADrSIEiIQhASACIASIIQILIAAgATcDACAAIAI3AwgL5QsCBX8PfiMAQeAAayIFJAAgAUIgiCACQiCGhCEKIANCEYggBEIvhoQhCyADQjGIIARC////////P4MiDEIPhoQhDSAEIAKFQoCAgICAgICAgH+DIQ4gAkL///////8/gyIPQiCIIRAgDEIRiCERIARCMIinQf//AXEhBgJAAkACQCACQjCIp0H//wFxIgdBf2pB/f8BSw0AQQAhCCAGQX9qQf7/AUkNAQsCQCABUCACQv///////////wCDIhJCgICAgICAwP//AFQgEkKAgICAgIDA//8AURsNACACQoCAgICAgCCEIQ4MAgsCQCADUCAEQv///////////wCDIgJCgICAgICAwP//AFQgAkKAgICAgIDA//8AURsNACAEQoCAgICAgCCEIQ4gAyEBDAILAkAgASASQoCAgICAgMD//wCFhEIAUg0AAkAgAyAChFBFDQBCgICAgICA4P//ACEOQgAhAQwDCyAOQoCAgICAgMD//wCEIQ5CACEBDAILAkAgAyACQoCAgICAgMD//wCFhEIAUg0AIAEgEoQhAkIAIQECQCACUEUNAEKAgICAgIDg//8AIQ4MAwsgDkKAgICAgIDA//8AhCEODAILAkAgASAShEIAUg0AQgAhAQwCCwJAIAMgAoRCAFINAEIAIQEMAgtBACEIAkAgEkL///////8/Vg0AIAVB0ABqIAEgDyABIA8gD1AiCBt5IAhBBnStfKciCEFxahAPQRAgCGshCCAFKQNQIgFCIIggBUHYAGopAwAiD0IghoQhCiAPQiCIIRALIAJC////////P1YNACAFQcAAaiADIAwgAyAMIAxQIgkbeSAJQQZ0rXynIglBcWoQDyAIIAlrQRBqIQggBSkDQCIDQjGIIAVByABqKQMAIgJCD4aEIQ0gA0IRiCACQi+GhCELIAJCEYghEQsgC0L/////D4MiAiABQv////8PgyIEfiITIANCD4ZCgID+/w+DIgEgCkL/////D4MiA358IgpCIIYiDCABIAR+fCILIAxUrSACIAN+IhQgASAPQv////8PgyIMfnwiEiANQv////8PgyIPIAR+fCINIApCIIggCiATVK1CIIaEfCITIAIgDH4iFSABIBBCgIAEhCIKfnwiECAPIAN+fCIWIBFC/////weDQoCAgIAIhCIBIAR+fCIRQiCGfCIXfCEEIAcgBmogCGpBgYB/aiEGAkACQCAPIAx+IhggAiAKfnwiAiAYVK0gAiABIAN+fCIDIAJUrXwgAyASIBRUrSANIBJUrXx8IgIgA1StfCABIAp+fCABIAx+IgMgDyAKfnwiASADVK1CIIYgAUIgiIR8IAIgAUIghnwiASACVK18IAEgEUIgiCAQIBVUrSAWIBBUrXwgESAWVK18QiCGhHwiAyABVK18IAMgEyANVK0gFyATVK18fCICIANUrXwiAUKAgICAgIDAAINQDQAgBkEBaiEGDAELIAtCP4ghAyABQgGGIAJCP4iEIQEgBEI/iCACQgGGhCECIAtCAYYhCyADIARCAYaEIQQLAkAgBkH//wFIDQAgDkKAgICAgIDA//8AhCEOQgAhAQwBCwJAAkAgBkEASg0AAkBBASAGayIHQYABSQ0AQgAhAQwDCyAFQTBqIAsgBCAGQf8AaiIGEA8gBUEgaiACIAEgBhAPIAVBEGogCyAEIAcQECAFIAIgASAHEBAgBSkDICAFKQMQhCAFKQMwIAVBMGpBCGopAwCEQgBSrYQhCyAFQSBqQQhqKQMAIAVBEGpBCGopAwCEIQQgBUEIaikDACEBIAUpAwAhAgwBCyAGrUIwhiABQv///////z+DhCEBCyABIA6EIQ4CQCALUCAEQn9VIARCgICAgICAgICAf1EbDQAgDiACQgF8IgEgAlStfCEODAELAkAgCyAEQoCAgICAgICAgH+FhEIAUQ0AIAIhAQwBCyAOIAIgAkIBg3wiASACVK18IQ4LIAAgATcDACAAIA43AwggBUHgAGokAAt1AQF+IAAgBCABfiACIAN+fCADQiCIIgQgAUIgiCICfnwgA0L/////D4MiAyABQv////8PgyIBfiIFQiCIIAMgAn58IgNCIIh8IANC/////w+DIAQgAX58IgNCIIh8NwMIIAAgA0IghiAFQv////8Pg4Q3AwALkxICBX8MfiMAQcABayIFJAAgBEL///////8/gyEKIAJC////////P4MhCyAEIAKFQoCAgICAgICAgH+DIQwgBEIwiKdB//8BcSEGAkACQAJAAkAgAkIwiKdB//8BcSIHQX9qQf3/AUsNAEEAIQggBkF/akH+/wFJDQELAkAgAVAgAkL///////////8AgyINQoCAgICAgMD//wBUIA1CgICAgICAwP//AFEbDQAgAkKAgICAgIAghCEMDAILAkAgA1AgBEL///////////8AgyICQoCAgICAgMD//wBUIAJCgICAgICAwP//AFEbDQAgBEKAgICAgIAghCEMIAMhAQwCCwJAIAEgDUKAgICAgIDA//8AhYRCAFINAAJAIAMgAkKAgICAgIDA//8AhYRQRQ0AQgAhAUKAgICAgIDg//8AIQwMAwsgDEKAgICAgIDA//8AhCEMQgAhAQwCCwJAIAMgAkKAgICAgIDA//8AhYRCAFINAEIAIQEMAgsgASANhEIAUQ0CAkAgAyAChEIAUg0AIAxCgICAgICAwP//AIQhDEIAIQEMAgtBACEIAkAgDUL///////8/Vg0AIAVBsAFqIAEgCyABIAsgC1AiCBt5IAhBBnStfKciCEFxahAPQRAgCGshCCAFQbgBaikDACELIAUpA7ABIQELIAJC////////P1YNACAFQaABaiADIAogAyAKIApQIgkbeSAJQQZ0rXynIglBcWoQDyAJIAhqQXBqIQggBUGoAWopAwAhCiAFKQOgASEDCyAFQZABaiADQjGIIApCgICAgICAwACEIg5CD4aEIgJCAEKEyfnOv+a8gvUAIAJ9IgRCABASIAVBgAFqQgAgBUGQAWpBCGopAwB9QgAgBEIAEBIgBUHwAGogBSkDgAFCP4ggBUGAAWpBCGopAwBCAYaEIgRCACACQgAQEiAFQeAAaiAEQgBCACAFQfAAakEIaikDAH1CABASIAVB0ABqIAUpA2BCP4ggBUHgAGpBCGopAwBCAYaEIgRCACACQgAQEiAFQcAAaiAEQgBCACAFQdAAakEIaikDAH1CABASIAVBMGogBSkDQEI/iCAFQcAAakEIaikDAEIBhoQiBEIAIAJCABASIAVBIGogBEIAQgAgBUEwakEIaikDAH1CABASIAVBEGogBSkDIEI/iCAFQSBqQQhqKQMAQgGGhCIEQgAgAkIAEBIgBSAEQgBCACAFQRBqQQhqKQMAfUIAEBIgCCAHIAZraiEGAkACQEIAIAUpAwBCP4ggBUEIaikDAEIBhoRCf3wiDUL/////D4MiBCACQiCIIg9+IhAgDUIgiCINIAJC/////w+DIhF+fCICQiCIIAIgEFStQiCGhCANIA9+fCACQiCGIg8gBCARfnwiAiAPVK18IAIgBCADQhGIQv////8PgyIQfiIRIA0gA0IPhkKAgP7/D4MiEn58Ig9CIIYiEyAEIBJ+fCATVK0gD0IgiCAPIBFUrUIghoQgDSAQfnx8fCIPIAJUrXwgD0IAUq18fSICQv////8PgyIQIAR+IhEgECANfiISIAQgAkIgiCITfnwiAkIghnwiECARVK0gAkIgiCACIBJUrUIghoQgDSATfnx8IBBCACAPfSICQiCIIg8gBH4iESACQv////8PgyISIA1+fCICQiCGIhMgEiAEfnwgE1StIAJCIIggAiARVK1CIIaEIA8gDX58fHwiAiAQVK18IAJCfnwiESACVK18Qn98Ig9C/////w+DIgIgAUI+iCALQgKGhEL/////D4MiBH4iECABQh6IQv////8PgyINIA9CIIgiD358IhIgEFStIBIgEUIgiCIQIAtCHohC///v/w+DQoCAEIQiC358IhMgElStfCALIA9+fCACIAt+IhQgBCAPfnwiEiAUVK1CIIYgEkIgiIR8IBMgEkIghnwiEiATVK18IBIgECANfiIUIBFC/////w+DIhEgBH58IhMgFFStIBMgAiABQgKGQvz///8PgyIUfnwiFSATVK18fCITIBJUrXwgEyAUIA9+IhIgESALfnwiDyAQIAR+fCIEIAIgDX58IgJCIIggDyASVK0gBCAPVK18IAIgBFStfEIghoR8Ig8gE1StfCAPIBUgECAUfiIEIBEgDX58Ig1CIIggDSAEVK1CIIaEfCIEIBVUrSAEIAJCIIZ8IARUrXx8IgQgD1StfCICQv////////8AVg0AIAFCMYYgBEL/////D4MiASADQv////8PgyINfiIPQgBSrX1CACAPfSIRIARCIIgiDyANfiISIAEgA0IgiCIQfnwiC0IghiITVK19IAQgDkIgiH4gAyACQiCIfnwgAiAQfnwgDyAKfnxCIIYgAkL/////D4MgDX4gASAKQv////8Pg358IA8gEH58IAtCIIggCyASVK1CIIaEfHx9IQ0gESATfSEBIAZBf2ohBgwBCyAEQiGIIRAgAUIwhiAEQgGIIAJCP4aEIgRC/////w+DIgEgA0L/////D4MiDX4iD0IAUq19QgAgD30iCyABIANCIIgiD34iESAQIAJCH4aEIhJC/////w+DIhMgDX58IhBCIIYiFFStfSAEIA5CIIh+IAMgAkIhiH58IAJCAYgiAiAPfnwgEiAKfnxCIIYgEyAPfiACQv////8PgyANfnwgASAKQv////8Pg358IBBCIIggECARVK1CIIaEfHx9IQ0gCyAUfSEBIAIhAgsCQCAGQYCAAUgNACAMQoCAgICAgMD//wCEIQxCACEBDAELIAZB//8AaiEHAkAgBkGBgH9KDQACQCAHDQAgAkL///////8/gyAEIAFCAYYgA1YgDUIBhiABQj+IhCIBIA5WIAEgDlEbrXwiASAEVK18IgNCgICAgICAwACDUA0AIAMgDIQhDAwCC0IAIQEMAQsgB61CMIYgAkL///////8/g4QgBCABQgGGIANaIA1CAYYgAUI/iIQiASAOWiABIA5RG618IgEgBFStfCAMhCEMCyAAIAE3AwAgACAMNwMIIAVBwAFqJAAPCyAAQgA3AwAgAEKAgICAgIDg//8AIAwgAyAChFAbNwMIIAVBwAFqJAAL5AYCBX8EfiMAQYABayIFJAACQAJAAkAgAyAEQgBCABANRQ0AIAMgBBAWIQYgAkIwiKciB0H//wFxIghB//8BRg0AIAYNAQsgBUEQaiABIAIgAyAEEBEgBSAFKQMQIgQgBUEQakEIaikDACIDIAQgAxATIAVBCGopAwAhAiAFKQMAIQQMAQsCQCABIAitQjCGIAJC////////P4OEIgogAyAEQjCIp0H//wFxIgmtQjCGIARC////////P4OEIgsQDUEASg0AAkAgASAKIAMgCxANRQ0AIAEhBAwCCyAFQfAAaiABIAJCAEIAEBEgBUH4AGopAwAhAiAFKQNwIQQMAQsCQAJAIAhFDQAgASEEDAELIAVB4ABqIAEgCkIAQoCAgICAgMC7wAAQESAFQegAaikDACIKQjCIp0GIf2ohCCAFKQNgIQQLAkAgCQ0AIAVB0ABqIAMgC0IAQoCAgICAgMC7wAAQESAFQdgAaikDACILQjCIp0GIf2ohCSAFKQNQIQMLIApC////////P4NCgICAgICAwACEIgogC0L///////8/g0KAgICAgIDAAIQiDH0gBCADVK19Ig1Cf1UhBiAEIAN9IQsCQCAIIAlMDQADQAJAAkAgBkEBcUUNAAJAIA0gC4RCAFINACAFQSBqIAEgAkIAQgAQESAFQShqKQMAIQIgBSkDICEEDAULIAtCP4ghCiANQgGGIQ0MAQsgBEI/iCENIApCAYYhCiAEIQsLIA0gCoQiCiAMfSALQgGGIgQgA1StfSINQn9VIQYgBCADfSELIAhBf2oiCCAJSg0ACyAJIQgLAkAgBkUNACANIQogCyEEIA0gC4RCAFINACAFQTBqIAEgAkIAQgAQESAFQThqKQMAIQIgBSkDMCEEDAELAkAgCkL///////8/Vg0AA0AgBEI/iCEDIAhBf2ohCCAEQgGGIQQgAyAKQgGGhCIKQoCAgICAgMAAVA0ACwsgB0GAgAJxIQYCQCAIQQBKDQAgBUHAAGogBCAKQv///////z+DIAhB+ABqIAZyrUIwhoRCAEKAgICAgIDAwz8QESAFQcgAaikDACECIAUpA0AhBAwBCyAKQv///////z+DIAggBnKtQjCGhCECCyAAIAQ3AwAgACACNwMIIAVBgAFqJAALrgEAAkACQCABQYAISA0AIABEAAAAAAAA4H+iIQACQCABQf8PTg0AIAFBgXhqIQEMAgsgAEQAAAAAAADgf6IhACABQf0XIAFB/RdIG0GCcGohAQwBCyABQYF4Sg0AIABEAAAAAAAAEACiIQACQCABQYNwTA0AIAFB/gdqIQEMAQsgAEQAAAAAAAAQAKIhACABQYZoIAFBhmhKG0H8D2ohAQsgACABQf8Haq1CNIa/ogtLAgJ/AX4gAUL///////8/gyEEAkACQCABQjCIp0H//wFxIgJB//8BRg0AQQQhAyACDQFBAkEDIAQgAIRQGw8LIAQgAIRQIQMLIAMLkgQBA38CQCACQYAESQ0AIAAgASACEAgaIAAPCyAAIAJqIQMCQAJAIAEgAHNBA3ENAAJAAkAgAkEBTg0AIAAhAgwBCwJAIABBA3ENACAAIQIMAQsgACECA0AgAiABLQAAOgAAIAFBAWohASACQQFqIgIgA08NASACQQNxDQALCwJAIANBfHEiBEHAAEkNACACIARBQGoiBUsNAANAIAIgASgCADYCACACIAEoAgQ2AgQgAiABKAIINgIIIAIgASgCDDYCDCACIAEoAhA2AhAgAiABKAIUNgIUIAIgASgCGDYCGCACIAEoAhw2AhwgAiABKAIgNgIgIAIgASgCJDYCJCACIAEoAig2AiggAiABKAIsNgIsIAIgASgCMDYCMCACIAEoAjQ2AjQgAiABKAI4NgI4IAIgASgCPDYCPCABQcAAaiEBIAJBwABqIgIgBU0NAAsLIAIgBE8NAQNAIAIgASgCADYCACABQQRqIQEgAkEEaiICIARJDQAMAgALAAsCQCADQQRPDQAgACECDAELAkAgA0F8aiIEIABPDQAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCwJAIAIgA08NAANAIAIgAS0AADoAACABQQFqIQEgAkEBaiICIANHDQALCyAAC/MCAgN/AX4CQCACRQ0AIAIgAGoiA0F/aiABOgAAIAAgAToAACACQQNJDQAgA0F+aiABOgAAIAAgAToAASADQX1qIAE6AAAgACABOgACIAJBB0kNACADQXxqIAE6AAAgACABOgADIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIBNgIAIAMgAiAEa0F8cSIEaiICQXxqIAE2AgAgBEEJSQ0AIAMgATYCCCADIAE2AgQgAkF4aiABNgIAIAJBdGogATYCACAEQRlJDQAgAyABNgIYIAMgATYCFCADIAE2AhAgAyABNgIMIAJBcGogATYCACACQWxqIAE2AgAgAkFoaiABNgIAIAJBZGogATYCACAEIANBBHFBGHIiBWsiAkEgSQ0AIAGtIgZCIIYgBoQhBiADIAVqIQEDQCABIAY3AxggASAGNwMQIAEgBjcDCCABIAY3AwAgAUEgaiEBIAJBYGoiAkEfSw0ACwsgAAtcAQF/IAAgAC0ASiIBQX9qIAFyOgBKAkAgACgCACIBQQhxRQ0AIAAgAUEgcjYCAEF/DwsgAEIANwIEIAAgACgCLCIBNgIcIAAgATYCFCAAIAEgACgCMGo2AhBBAAvDAQEEfwJAAkAgAigCECIDDQBBACEEIAIQGQ0BIAIoAhAhAwsCQCADIAIoAhQiBWsgAU8NACACIAAgASACKAIkEQMADwtBACEGAkAgAiwAS0EASA0AIAEhBANAIAQiA0UNASAAIANBf2oiBGotAABBCkcNAAsgAiAAIAMgAigCJBEDACIEIANJDQEgACADaiEAIAEgA2shASACKAIUIQUgAyEGCyAFIAAgARAXGiACIAIoAhQgAWo2AhQgBiABaiEECyAECywBAX8jAEEQayICJAAgAiABNgIMQQAoAvw+IAAgARCFAiEBIAJBEGokACABCwQAQQELAgALnAEBA38gACEBAkACQCAAQQNxRQ0AAkAgAC0AAA0AIAAgAGsPCyAAIQEDQCABQQFqIgFBA3FFDQEgAS0AAEUNAgwAAAsACwNAIAEiAkEEaiEBIAIoAgAiA0F/cyADQf/9+3dqcUGAgYKEeHFFDQALAkAgA0H/AXENACACIABrDwsDQCACLQABIQMgAkEBaiIBIQIgAw0ACwsgASAAawsEACMACwYAIAAkAAsSAQJ/IwAgAGtBcHEiASQAIAELHQACQEEAKALwQg0AQQAgATYC9EJBACAANgLwQgsLtgQCA38EfgJAAkAgAb0iBUIBhiIGUA0AIAVC////////////AINCgICAgICAgPj/AFYNACAAvSIHQjSIp0H/D3EiAkH/D0cNAQsgACABoiIBIAGjDwsCQCAHQgGGIgggBlgNACAFQjSIp0H/D3EhAwJAAkAgAg0AQQAhAgJAIAdCDIYiBkIAUw0AA0AgAkF/aiECIAZCAYYiBkJ/VQ0ACwsgB0EBIAJrrYYhBgwBCyAHQv////////8Hg0KAgICAgICACIQhBgsCQAJAIAMNAEEAIQMCQCAFQgyGIghCAFMNAANAIANBf2ohAyAIQgGGIghCf1UNAAsLIAVBASADa62GIQUMAQsgBUL/////////B4NCgICAgICAgAiEIQULIAYgBX0iCEJ/VSEEAkAgAiADTA0AA0ACQCAEQQFxRQ0AIAghBiAIQgBSDQAgAEQAAAAAAAAAAKIPCyAGQgGGIgYgBX0iCEJ/VSEEIAJBf2oiAiADSg0ACyADIQILAkAgBEUNACAIIQYgCEIAUg0AIABEAAAAAAAAAACiDwsCQAJAIAZC/////////wdYDQAgBiEIDAELA0AgAkF/aiECIAZCgICAgICAgARUIQMgBkIBhiIIIQYgAw0ACwsgB0KAgICAgICAgIB/gyEGAkACQCACQQFIDQAgCEKAgICAgICAeHwgAq1CNIaEIQgMAQsgCEEBIAJrrYghCAsgCCAGhL8PCyAARAAAAAAAAAAAoiAAIAggBlEbC+ABAgN/An4jAEEQayICJAACQAJAIAG8IgNB/////wdxIgRBgICAfGpB////9wdLDQAgBK1CGYZCgICAgICAgMA/fCEFQgAhBgwBCwJAIARBgICA/AdJDQAgA61CGYZCgICAgICAwP//AIQhBUIAIQYMAQsCQCAEDQBCACEGQgAhBQwBCyACIAStQgAgBGciBEHRAGoQDyACQQhqKQMAQoCAgICAgMAAhUGJ/wAgBGutQjCGhCEFIAIpAwAhBgsgACAGNwMAIAAgBSADQYCAgIB4ca1CIIaENwMIIAJBEGokAAuMAQICfwJ+IwBBEGsiAiQAAkACQCABDQBCACEEQgAhBQwBCyACIAEgAUEfdSIDaiADcyIDrUIAIANnIgNB0QBqEA8gAkEIaikDAEKAgICAgIDAAIVBnoABIANrrUIwhnwgAUGAgICAeHGtQiCGhCEFIAIpAwAhBAsgACAENwMAIAAgBTcDCCACQRBqJAALBABBAAsEAEEAC+8KAgR/BH4jAEHwAGsiBSQAIARC////////////AIMhCQJAAkACQCABQn98IgpCf1EgAkL///////////8AgyILIAogAVStfEJ/fCIKQv///////7///wBWIApC////////v///AFEbDQAgA0J/fCIKQn9SIAkgCiADVK18Qn98IgpC////////v///AFQgCkL///////+///8AURsNAQsCQCABUCALQoCAgICAgMD//wBUIAtCgICAgICAwP//AFEbDQAgAkKAgICAgIAghCEEIAEhAwwCCwJAIANQIAlCgICAgICAwP//AFQgCUKAgICAgIDA//8AURsNACAEQoCAgICAgCCEIQQMAgsCQCABIAtCgICAgICAwP//AIWEQgBSDQBCgICAgICA4P//ACACIAMgAYUgBCAChUKAgICAgICAgIB/hYRQIgYbIQRCACABIAYbIQMMAgsgAyAJQoCAgICAgMD//wCFhFANAQJAIAEgC4RCAFINACADIAmEQgBSDQIgAyABgyEDIAQgAoMhBAwCCyADIAmEUEUNACABIQMgAiEEDAELIAMgASADIAFWIAkgC1YgCSALURsiBxshCSAEIAIgBxsiC0L///////8/gyEKIAIgBCAHGyICQjCIp0H//wFxIQgCQCALQjCIp0H//wFxIgYNACAFQeAAaiAJIAogCSAKIApQIgYbeSAGQQZ0rXynIgZBcWoQD0EQIAZrIQYgBUHoAGopAwAhCiAFKQNgIQkLIAEgAyAHGyEDIAJC////////P4MhBAJAIAgNACAFQdAAaiADIAQgAyAEIARQIgcbeSAHQQZ0rXynIgdBcWoQD0EQIAdrIQggBUHYAGopAwAhBCAFKQNQIQMLIARCA4YgA0I9iIRCgICAgICAgASEIQQgCkIDhiAJQj2IhCEBIANCA4YhAyALIAKFIQoCQCAGIAhrIgdFDQACQCAHQf8ATQ0AQgAhBEIBIQMMAQsgBUHAAGogAyAEQYABIAdrEA8gBUEwaiADIAQgBxAQIAUpAzAgBSkDQCAFQcAAakEIaikDAIRCAFKthCEDIAVBMGpBCGopAwAhBAsgAUKAgICAgICABIQhDCAJQgOGIQICQAJAIApCf1UNAAJAIAIgA30iASAMIAR9IAIgA1StfSIEhFBFDQBCACEDQgAhBAwDCyAEQv////////8DVg0BIAVBIGogASAEIAEgBCAEUCIHG3kgB0EGdK18p0F0aiIHEA8gBiAHayEGIAVBKGopAwAhBCAFKQMgIQEMAQsgBCAMfCADIAJ8IgEgA1StfCIEQoCAgICAgIAIg1ANACABQgGIIARCP4aEIAFCAYOEIQEgBkEBaiEGIARCAYghBAsgC0KAgICAgICAgIB/gyECAkAgBkH//wFIDQAgAkKAgICAgIDA//8AhCEEQgAhAwwBC0EAIQcCQAJAIAZBAEwNACAGIQcMAQsgBUEQaiABIAQgBkH/AGoQDyAFIAEgBEEBIAZrEBAgBSkDACAFKQMQIAVBEGpBCGopAwCEQgBSrYQhASAFQQhqKQMAIQQLIAFCA4ggBEI9hoQhAyAEQgOIQv///////z+DIAKEIAetQjCGhCEEIAGnQQdxIQYCQAJAAkACQAJAECYOAwABAgMLIAQgAyAGQQRLrXwiASADVK18IQQCQCAGQQRGDQAgASEDDAMLIAQgAUIBgyICIAF8IgMgAlStfCEEDAMLIAQgAyACQgBSIAZBAEdxrXwiASADVK18IQQgASEDDAELIAQgAyACUCAGQQBHca18IgEgA1StfCEEIAEhAwsgBkUNAQsQJxoLIAAgAzcDACAAIAQ3AwggBUHwAGokAAuNAgICfwN+IwBBEGsiAiQAAkACQCABvSIEQv///////////wCDIgVCgICAgICAgHh8Qv/////////v/wBWDQAgBUI8hiEGIAVCBIhCgICAgICAgIA8fCEFDAELAkAgBUKAgICAgICA+P8AVA0AIARCPIYhBiAEQgSIQoCAgICAgMD//wCEIQUMAQsCQCAFUEUNAEIAIQZCACEFDAELIAIgBUIAIASnZ0EgaiAFQiCIp2cgBUKAgICAEFQbIgNBMWoQDyACQQhqKQMAQoCAgICAgMAAhUGM+AAgA2utQjCGhCEFIAIpAwAhBgsgACAGNwMAIAAgBSAEQoCAgICAgICAgH+DhDcDCCACQRBqJAALdAIBfwJ+IwBBEGsiAiQAAkACQCABDQBCACEDQgAhBAwBCyACIAGtQgBB8AAgAWdBH3MiAWsQDyACQQhqKQMAQoCAgICAgMAAhSABQf//AGqtQjCGfCEEIAIpAwAhAwsgACADNwMAIAAgBDcDCCACQRBqJAALQAEBfyMAQRBrIgUkACAFIAEgAiADIARCgICAgICAgICAf4UQKCAAIAUpAwA3AwAgACAFKQMINwMIIAVBEGokAAvCAwIDfwF+IwBBIGsiAiQAAkACQCABQv///////////wCDIgVCgICAgICAwL9AfCAFQoCAgICAgMDAv398Wg0AIAFCGYinIQMCQCAAUCABQv///w+DIgVCgICACFQgBUKAgIAIURsNACADQYGAgIAEaiEDDAILIANBgICAgARqIQMgACAFQoCAgAiFhEIAUg0BIANBAXEgA2ohAwwBCwJAIABQIAVCgICAgICAwP//AFQgBUKAgICAgIDA//8AURsNACABQhmIp0H///8BcUGAgID+B3IhAwwBC0GAgID8ByEDIAVC////////v7/AAFYNAEEAIQMgBUIwiKciBEGR/gBJDQAgAkEQaiAAIAFC////////P4NCgICAgICAwACEIgUgBEH/gX9qEA8gAiAAIAVBgf8AIARrEBAgAkEIaikDACIFQhmIpyEDAkAgAikDACACKQMQIAJBEGpBCGopAwCEQgBSrYQiAFAgBUL///8PgyIFQoCAgAhUIAVCgICACFEbDQAgA0EBaiEDDAELIAAgBUKAgIAIhYRCAFINACADQQFxIANqIQMLIAJBIGokACADIAFCIIinQYCAgIB4cXK+C+gDAgJ/An4jAEEgayICJAACQAJAIAFC////////////AIMiBEKAgICAgIDA/0N8IARCgICAgICAwIC8f3xaDQAgAEI8iCABQgSGhCEEAkAgAEL//////////w+DIgBCgYCAgICAgIAIVA0AIARCgYCAgICAgIDAAHwhBQwCCyAEQoCAgICAgICAwAB8IQUgAEKAgICAgICAgAiFQgBSDQEgBUIBgyAFfCEFDAELAkAgAFAgBEKAgICAgIDA//8AVCAEQoCAgICAgMD//wBRGw0AIABCPIggAUIEhoRC/////////wODQoCAgICAgID8/wCEIQUMAQtCgICAgICAgPj/ACEFIARC////////v//DAFYNAEIAIQUgBEIwiKciA0GR9wBJDQAgAkEQaiAAIAFC////////P4NCgICAgICAwACEIgQgA0H/iH9qEA8gAiAAIARBgfgAIANrEBAgAikDACIEQjyIIAJBCGopAwBCBIaEIQUCQCAEQv//////////D4MgAikDECACQRBqQQhqKQMAhEIAUq2EIgRCgYCAgICAgIAIVA0AIAVCAXwhBQwBCyAEQoCAgICAgICACIVCAFINACAFQgGDIAV8IQULIAJBIGokACAFIAFCgICAgICAgICAf4OEvwv5AgEBfwJAIAAgAUYNAAJAIAEgAGsgAmtBACACQQF0a0sNACAAIAEgAhAXDwsgASAAc0EDcSEDAkACQAJAIAAgAU8NAAJAIANFDQAgACEDDAMLAkAgAEEDcQ0AIAAhAwwCCyAAIQMDQCACRQ0EIAMgAS0AADoAACABQQFqIQEgAkF/aiECIANBAWoiA0EDcUUNAgwAAAsACwJAIAMNAAJAIAAgAmpBA3FFDQADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAwDAAsACyACQQNNDQADQCADIAEoAgA2AgAgAUEEaiEBIANBBGohAyACQXxqIgJBA0sNAAsLIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL2QEBAX8jAEEgayIDIAA2AhwgAyABNgIYIAMgAjYCFCADQQA2AhACQANAIAMoAhBBAkxBAXFFDQEgAygCFCADKAIQQQN0akEAtzkDACADQQA2AgwCQANAIAMoAgxBAkxBAXFFDQEgAygCFCADKAIQQQN0aiADKAIUIAMoAhBBA3RqKwMAIAMoAhwgAygCEEEYbGogAygCDEEDdGorAwAgAygCGCADKAIMQQN0aisDAKKgOQMAIAMgAygCDEEBajYCDAwAAAsACyADIAMoAhBBAWo2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A5ABIA4oAqwGIAw5A5gBIA4oAqwGIAw5A6ABIA4oAqwGIAw5A6gBIA4oAqwGIAw5A7ABIA4oAqwGIAw5A7gBIA4oAqwGIAw5A8ABIA4oAqwGIAw5A8gBIA4oAqwGIAw5A9ABIA4oAqwGIAw5A9gBIA4oAqwGQQA2AuABIA4oAqwGIAw5A+gBIA4oAqwGIAw5A/ABIA4oAqwGIAw5A/gBIA4oAqwGIAw5A4ACIA4oAqwGIAw5A4gCIA4oAqwGIAw5A5ACIA4oAqwGIAw5A5gCIA4oAqwGIAw5A6ACIA4oAqwGIAw5A6gCIA4oAqwGIAw5A7ACIA4oAqwGIAw5A7gCIA4oAqwGIAw5A8ACIA4oAqwGIAw5A8gCIA4oAqwGIAw5A9ACIA4oAqwGIAw5A9gCIA4oAqwGIAw5A+ACIA4oAqwGIAw5A+gCIA4oAqwGIAw5A/ACIA4oAqwGIAw5A/gCIA4oAqwGIAw5A4ADIA4oAqwGIAw5A4gDIA4oAqwGIAw5A5ADIA4oAqwGIAw5A5gDIA4oAqwGIAw5A6ADIA4oAqwGIAw5A6gDIA4oAqwGIAw5A7ADIA4oAqwGIAw5A7gDIA4oAqwGIAw5A8ADIA4oAqwGIAw5A8gDIA4oAqwGIAw5A9ADIA4oAqwGIAw5A9gDIA4oAqwGIAw5A+ADIA4oAqwGIAw5A+gDIA4oAqwGIAw5A/ADIA4oAqwGIAw5A/gDIA4oAqwGIAw5A4AEIA4oAqwGIAw5A4gEIA4oAqwGIAw5A5AEIA4oAqwGIAw5A5gEIA4oAqwGIAw5A6AEIA4oAqwGIAw5A6gEIA4oAqwGIAw5A7AEIA4oAqwGIAw5A7gEIA4oAqwGIAw5A8AEIA4oAqwGIAw5A8gEIA4oAqwGIAw5A9AEIA4oAqwGIAw5A9gEIA4oAqwGIAw5A+AEIA4oAqwGIAw5A+gEIA4oAqwGIAw5A/AEIA4oAqwGIAw5A/gEIA4oAqwGIAw5A4AFIA4oAqwGIAw5A4gFIA4oAqwGIAw5A5AFIA4oAqwGIAw5A5gFIA4oAowHIA4oAqwGQfgGaiAOKAKsBkGAB2ogDigCrAZBiAdqIA4oAqwGQZAHaiAOKAKsBkGYB2ogDigCrAZBoAdqIA4oAqwGQagHaiAOKAKsBkGwB2oQRCAOKAKsBkEANgIMIA4oAqwGIA4tAIsHOgAQIA4o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aiAOKAKsBkGABGogDigCrAZBiARqIA5B4ANqIA5B2ANqIA5B0ANqIA5ByANqIA5BwANqIA5BuANqIA5BsANqIA5BoANqIA5BmANqIA5BkANqIA5BiANqIA5BgANqIA5B+AJqIA5B8AJqIA5B6AJqIA5B4AJqIA5B2AJqIA5B0AJqIA5ByAJqIA5BwAJqIA5BuAJqIA5BsAJqIA5BqAJqIA5BoAJqIA5BmAJqIA5BkAJqIA4oAqwGQaAEaiAOKAKsBkGoBGogDigCrAZBsARqIA4oAqwGQbgEaiAOKAKsBkHABGogDigCrAZByARqIA4oAqwGQdAEaiAOKAKsBkHYBGogDigCrAZB4ARqIA4oAqwGQegEaiAOQZAEaiICIA5ByAFqIA5BwAFqIA5BuAFqIA5BsAFqIA5BqAFqIA5BoAFqIA5BmAFqIA5BkAFqIA5BiAFqIA5BgAFqIA5B+ABqIA5B8ABqIA4oAqwGQfgEaiAOKAKsBkGABWoQSCAOKAKsBisD+AIgDigCrAYrA4ADIA4oAqwGKwOIAyAOKAKsBisDkAMgDigCrAYrA5gDIA4oAqwGKwOgAyAOKAKsBisDqAMgDigCrAYrA7ADIA4oAqwGKwO4AyAOKAKsBisDwAMgDigCrAYrA8gDIA4oAqwGKwPQAyAOKAKsBisD2AMgDigCrAYrA+ADIA4oAqwGKwPoAyAOKAKsBisD8AMgDigCrAYrA/gDIA4oAqwGKwOABCAOKAKsBisDiAQgDigCrAYrA4ABIA4oAqwGKwOgBCAOKAKsBisDqAQgDigCrAYrA7AEIA4oAqwGKwO4BCAOKAKsBisDwAQgDigCrAYrA8gEIA4oAqwGKwPQBCAOKAKsBisD2AQgDigCrAYrA+AEIA4oAqwGKwPoBCAOKAKsBisD+AQgDigCrAYrA4AFIA4rA6AEIA4oAqwGLQARQRh0QRh1IA4oAqwGQYAGaiAOKAKsBkHwBWogDigCrAZB+AVqIA4oAqwGQYgGaiAOKAKsBkGQBmogDigCrAYtABBBGHRBGHUQSSAOIAw5A7AEIA4gDDkDqAQgDiAMOQOYBCAOKAKsBisDkAcgDisDuAUgDisD0AQgDigCrAYrA4gGIA4rA+ADIA4rA9gDIA4rA9ADIA4rA8gDIA4rA8ADIA4rA7AFIA4rA6ADIA4rA5gDIA4rA5ADIA4r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PkEYdEEYdUEgRkEBcUUNACAKKALsBEEwOgA+CwJAIAooAuwELQBEQRh0QRh1QSBGQQFxRQ0AIAooAuwEQTA6AEQLIAooAuwEIQkgCigC0AQhCCAKKALQBCEHIAooAtAEIQYgCigC0AQhBSAKKALQBCEEIAooAtAEIQMgCigC0AQhAiAKKALQBCEBIAooAtAEIQAgCkGgA2ogCigC0ARBsAZqNgIAIApBnANqIABBrAZqNgIAIApBlANqIAFB4AVqNgIAIApBjANqIAJB0AVqNgIAIApBiANqIANB2AVqNgIAIApBhANqIARBuAVqNgIAIApBgANqIAVBBGo2AgAgCiAGQaEGajYC/AIgCiAHQaAGajYC+AIgCiAINgL0AiAKQZgDaiAKQawDajYCACAKQZADaiAKQbADajYCACAKIApBzANqNgLwAiAJQZ0IIApB8AJqEFECQAJAIAotAOcEQRh0QRh1QfYARkEBcUUNAAJAAkAgCigC6AQtADRBGHRBGHVBIEZBAXFFDQAgCigC6AQhCSAKKALQBCEIIAooAtAEIQcgCigC0AQhBiAKKALQBCEFIAooAtAEIQQgCigC0AQhAyAKKALQBCECIAooAtAEIQEgCigC3AQhACAKKALYBCELIApB3AFqIAooAtQENgIAIApB2AFqIAs2AgAgCkHUAWogADYCACAKQdABaiABQbQGajYCACAKQcwBaiACQZgGajYCACAKQcgBaiADQZAGajYCACAKQcQBaiAEQYgGajYCACAKQcABaiAFQYAGajYCACAKIAZB+AVqNgK8ASAKIAdB8AVqNgK4ASAKIAg2ArQBIAogCkHMA2o2ArABIAlB2wggCkGwAWoQUQwBCyAKKALoBCEJIAooAtAEIQggCigC0AQhByAKKALQBCEGIAooAtAEIQUgCigC0AQhBCAKKALQBCEDIAooAtAEIQIgCigC0AQhASAKKALcBCEAIAooAtgEIQsgCkGMAmogCigC1AQ2AgAgCkGIAmogCzYCACAKQYQCaiAANgIAIApBgAJqIAFBtAZqNgIAIApB/AFqIAJBmAZqNgIAIApB+AFqIANBkAZqNgIAIApB9AFqIARBiAZqNgIAIApB8AFqIAVBgAZqNgIAIAogBkH4BWo2AuwBIAogB0HwBWo2AugBIAogCDYC5AEgCiAKQcwDajYC4AEg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AAsJAEHAxwAQbRoLBgAgABA8C0kBAn8jAEEgayIAJAAgAEGwxwA2AhwgAEHkDDYCGCAAKAIcIgEgAEEQaiAAQQhqEGUaIAEgACgCGCAAKAIYEGYQZyAAQSBqJAALCQBBsMcAEGgaC0oBAX8jAEEgayIDJAAgAyAANgIcIAMgATYCGCADIAI2AhQgAygCHCECIAMoAhgQMyACEGkaIAMoAhQQMyACEGoaIANBIGokACACCyYBAX8jAEEQayIBJAAgASAANgIMIAEoAgwQHiEAIAFBEGokACAAC2MBAn8CQCACQXBPDQACQAJAIAJBCksNACAAIAIQvgIgABC/AiEDDAELIAAgAhDAAkEBaiIEEMECIgMQwgIgACAEEMMCIAAgAhDEAgsgAyABIAIQxQIgAmpBABDGAg8LELsCAAscAAJAIAAQ7wFFDQAgABDJAiAAEMoCEMsCCyAACxUBAX8jAEEQayIBIAA2AgQgASgCBAsnAQF/IwBBEGsiASQAIAEgADYCBCABKAIEIgAQaxogAUEQaiQAIAALFQEBfyMAQRBrIgEgADYCDCABKAIMCz8BAX8jAEEQayIBJAAgASAANgIMIAEoAgwiABCHARogAUEANgIIIABBCGogAUEIaiABEIgBGiABQRBqJAAgAAsnAQF/IwBBEGsiASQAIAEgADYCDCABKAIMIgAQbhogAUEQaiQAIAALJgEBfyMAQRBrIgEkACABIAA2AgwgASgCDCIAEG8gAUEQaiQAIAALtwEBAX8jAEEgayIBJAAgASAANgIcAkAgASgCHCIAEHBBAXENACABIAAQcTYCGCABIAAoAgQ2AhQgASAAEHI2AhAgASgCFCABKAIQKAIAEHMgABB0QQA2AgACQANAIAEoAhQgASgCEEdBAXFFDQEgASABKAIUEHU2AgwgASABKAIUKAIENgIUIAEoAhggASgCDEEIahB2EHcgASgCGCABKAIMQQEQeAwAAAsACyAAEHkLIAFBIGokAAsvAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEHooAgAhACABQRBqJAAgAEEARkEBcQspAQF/IwBBEGsiASQAIAEgADYCDCABKAIMQQhqEHshACABQRBqJAAgAAsoAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEHwQfSEAIAFBEGokACAACz0BAX8jAEEQayIC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AxggBygCEEQAAAAAAAAWQDkDICAHKAIQRAAAAAAAABpAOQMoIAcoAhAhBiAHQcAAaiQAIAYLjgEBAn8jAEEgayIBJAAgAUHAxwA2AhwgASAANgIYIAEgASgCHCICEHE2AhQgAUEIaiIAIAIgASgCFBCXASABKAIUIAAQmAFBCGoQdiABKAIYEJkBEJoBIAIgABCbARCcASAAEJsBEJwBEJ0BIAIQdCICIAIoAgBBAWo2AgAgABCeASAAEJ8BGiABQSBqJAALWAEBfyMAQSBrIgMkACADIAA2AhwgAyABNgIYIAMgAjYCFCADIAMoAhQQoAE2AhAgAygCEEEANgIAIAAgAygCECADQQhqIAMoAhQQoQEQogEaIANBIGokAAsqAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEKMBKAIAIQAgAUEQaiQAIAALFQEBfyMAQRBrIgEgADYCDCABKAIMCz4BAX8jAEEgayIDJAAgAyAANgIcIAMgATYCGCADIAI2AhQgAygCHCADKAIYIAMoAhQQpAEQpQEgA0EgaiQACyoBAX8jAEEQayIBJAAgASAANgIMIAEoAgwQowEoAgAhACABQRBqJAAgAAsmAQF/IwBBEGsiASQAIAEgADYCDCABKAIMEHwhACABQRBqJAAgAAtlAQF/IwBBEGsiAyQAIAMgADYCDCADIAE2AgggAyACNgIEIAMoAgwiAhByIQEgAygCBCABNgIEIAMoAgggAigCADYCACADKAIIKAIAIAMoAgg2AgQgAiADKAIENgIAIANBEGokAAs3AQF/IwBBEGsiASQAIAEgADYCDCABIAEoAgwiABCmASgCADYCCCAAEKYBQQA2AgAgAUEQaiQACycBAX8jAEEQayIBJAAgASAANgIMIAEoAgwiABCnASABQRBqJAAgAAszAQF/IwBBEGsiASQAIAEgADYCDCABQQE2AgggASgCDCABKAIIEK4BIQAgAUEQaiQAIAALOQEBfyMAQRBrIgIgADYCDCACIAE2AgggAkEBNgIEIAIoAgwiASACKAIINgIAIAEgAigCBDYCBCABC0MBAX8jAEEQayIDJAAgAyAANgIMIAMgATYCCCADIAI2AgQgAygCDCICIANBCGogAygCBBCvARCwARogA0EQaiQAIAILJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDBCs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AX8jAEEQayIBJAAgASAANgIMIAEoAgxBCGoQ2AEhACABQRBqJAAgAAscAQF/IwBBEGsiAiAANgIMIAIgATYCCCACKAIMC04BAX8jAEEQayICJAAgAiAANgIMIAIgATYCCCACKAIMIgEQhwEaIAJBADYCBCABQQhqIAJBBGogAiACKAIIENQBENUBGiACQRBqJAAgAQsrAQF/IwBBEGsiAiAANgIMIAIgATYCCCACKAIMKAIAIAIoAggoAgBGQQFxCy8BAX8jAEEQayICJAAgAiAANgIMIAIgATYCCCACKAIMIAIoAggQ0wEgAkEQaiQACyIBAX8jAEEQayIBIAA2AgwgASgCDCIAIAAoAgAoAgA2AgALUwEBfyMAQTBrIgIkACACIAA2AiggAiABNgIgIAJBGGogAkEoaigCADYCACACQRBqIAJBIGooAgA2AgAgAigCGCACKAIQENIBIQEgAkEwaiQAIAELWAEBfyMAQRBrIgMgADYCDCADIAE2AgggAyACNgIEIAMoAgwoAgAgAygCCDYCBCADKAIIIAMoAgwoAgA2AgAgAygCDCADKAIENgIAIAMoAgQgAygCDDYCBAtkAQF/IwBBIGsiAiQAIAIgADYCGCACIAE2AhAgAkEANgIEAkADQCACQRhqIAJBEGoQwQFBAXFFDQEgAiACKAIEQQFqNgIEIAJBGGoQxAEMAAALAAsgAigCBCEBIAJBIGokACABC5IBAQF/IwBBEGsiAiQAIAIgADYCBCACIAE2AgACQAJAIAIoAgBBAE5BAXFFDQACQANAIAIoAgBBAEpBAXFFDQEgAigCBBDEASACIAIoAgBBf2o2AgAMAAALAAsMAQsCQANAIAIoAgBBAEhBAXFFDQEgAigCBBDPASACIAIoAgBBAWo2AgAMAAALAAsLIAJBEGokAAscAQF/IwBBEGsiAiAANgIMIAIgATYCCCACKAIMC0wBAX8jAEEQayIDJAAgAyAANgIMIAMgATYCCCADIAI2AgQgAygCDCICIAMoAggQiQEQigEaIAIgAygCBBDWARDXARogA0EQaiQAIAILFQEBfyMAQRBrIgEgADYCDCABKAIMCzQBAX8jAEEQayICJAAgAiAANgIMIAIgATYCCCACKAIMIQEgAigCCBDWARogAkEQaiQAIAELJwEBfyMAQRBrIgEkACABIAA2AgwgASgCDBDZASEAIAFBEGokACAACxUBAX8jAEEQayIBIAA2AgwgASgCDAuLAQEBfyMAQSBrIgAkACAAQcDHABC5ATYCGAJAA0AgAEHAxwAQugE2AhAgAEEYaiAAQRBqELsBQQFxRQ0BIAAgAEEYahC8ASgCADYCDCAAKAIMKAJkEI8BIAAoAgwQkAEgAEEYahC9AQwAAAsACxDbAUEAQQFBAXE6AMhJQQAoAsxJEI8BIABBIGokAAskAQF/IwBBEGsiACQAIABBwMcANgIMIAAoAgwQbyAAQRBqJAALiQMBAX8jAEEwayIDJAAgAyAAOQMoIAMgAToAJyADIAI6ACYCQEEAKALMSUEAR0EBcQ0AQQBBwMcAEI4BQQNsQQN0QQURAAA2AsxJQQBBAEEBcToAyEkLAkBBAC0AyElBAXFBAXFFDQBBAEEAKALMSUHAxwAQjgFBA2xBA3QQ3QE2AsxJQQBBAEEBcToAyEkLAkAgAy0AJ0EBcUUNACADIAMrAyhEAAAAAHCZlEGjRAAAAMDFnkJBoEEAtyIAoDkDGCADIAMrAxhEAAAAgCy0QkGhRAAAAACg1eFAozkDECADKwMQIAMrAxggACAAEFoLIANBADYCDCADQcDHABC5ATYCCAJAA0AgA0HAxwAQugE2AgAgA0EIaiADELsBQQFxRQ0BIANBCGoQvAEoAgAgAysDKCADLQAnQQFxQQAoAsxJIAMoAgxBA2xBA3RqIAMtACZBAXFBAUEBcRCUARogA0EIahC9ASADIAMoAgxBAWo2AgwMAAALAAtBACgCzEkhAiADQTBqJAAgAgvsCAELfwJAIAANACABEO8CDwsCQCABQUBJDQBBAEEwNgKkUkEADwsgAUELSSECIAFBC2pBeHEhAyAAQXxqIgQoAgAiBUF4cSEGIAVBA3EhBwJAQQAoAshSIgggAEF4aiIJSw0AIAdBAUYNACAGQQFIGgtBECADIAIbIQICQAJAAkAgBw0AIAJBgAJJDQEgBiACQQRySQ0BIAYgAmtBACgCmFZBAXRNDQIMAQsgCSAGaiEHAkAgBiACSQ0AIAYgAmsiAUEQSQ0CIAQgBUEBcSACckECcjYCACAJIAJqIgYgAUEDcjYCBCAHIAcoAgRBAXI2AgQgBiABEPECIAAPCwJAQQAoAtBSIAdHDQBBACgCxFIgBmoiBiACTQ0BIAQgBUEBcSACckECcjYCACAJIAJqIgEgBiACayIGQQFyNgIEQQAgBjYCxFJBACABNgLQUiAADwsCQEEAKALMUiAHRw0AQQAoAsBSIAZqIgYgAkkNAQJAAkAgBiACayIBQRBJDQAgBCAFQQFxIAJyQQJyNgIAIAkgAmoiAiABQQFyNgIEIAkgBmoiBiABNgIAIAYgBigCBEF+cTYCBAwBCyAEIAVBAXEgBnJBAnI2AgAgCSAGaiIBIAEoAgRBAXI2AgRBACEBQQAhAgtBACACNgLMUkEAIAE2AsBSIAAPCyAHKAIEIgNBAnENACADQXhxIAZqIgogAkkNACAKIAJrIQsCQAJAIANB/wFLDQAgBygCDCEBAkAgBygCCCIGIANBA3YiA0EDdEHg0gBqIgdGDQAgCCAGSxoLAkAgASAGRw0AQQBBACgCuFJBfiADd3E2ArhSDAILAkAgASAHRg0AIAggAUsaCyAGIAE2AgwgASAGNgIIDAELIAcoAhghDAJAAkAgBygCDCIDIAdGDQACQCAIIAcoAggiAUsNACABKAIMIAdHGgsgASADNgIMIAMgATYCCAwBCwJAIAdBFGoiASgCACIGDQAgB0EQaiIBKAIAIgYNAEEAIQMMAQsDQCABIQggBiIDQRRqIgEoAgAiBg0AIANBEGohASADKAIQIgYNAAsgCEEANgIACyAMRQ0AAkACQCAHKAIcIgZBAnRB6NQAaiIBKAIAIAdHDQAgASADNgIAIAMNAUEAQQAoArxSQX4gBndxNgK8UgwCCyAMQRBBFCAMKAIQIAdGG2ogAzYCACADRQ0BCyADIAw2AhgCQCAHKAIQIgFFDQAgAyABNgIQIAEgAzYCGAsgBygCFCIBRQ0AIANBFGogATYCACABIAM2AhgLAkAgC0EPSw0AIAQgBUEBcSAKckECcjYCACAJIApqIgEgASgCBEEBcjYCBCAADwsgBCAFQQFxIAJyQQJyNgIAIAkgAmoiASALQQNyNgIEIAkgCmoiBiAGKAIEQQFyNgIEIAEgCxDxAiAADwsCQCABEO8CIgYNAEEADwsgBiAAQXxBeCAEKAIAIgJBA3EbIAJBeHFqIgIgASACIAFJGxAXGiAAEPACIAYhAAsgAAvYAwEBfyMAQeAAayIFJAAgBSAANgJcIAUgATkDUCAFIAI5A0ggBSADNgJEIAUgBDoAQwJAIAUoAkQNACAFQdoANgJECwJAIAUtAENBAXENACAFQQE6AEMLIAUgBSgCXDYCPCAFIAUoAjwrAzggBSgCRLejOQMwIAUgBSsDUCAFKwMwoTkDKCAFIAUrA0ggBSsDMKA5AyACQAJAIAUrAyAgBSsDKKEgBSsDMKObRAAAAAAAAPA/oCICmUQAAAAAAADgQWNFDQAgAqohBAwBC0GAgICAeCEECyAFIAQ2AhwgBSAFKwMoOQMQAkAgBSgCPCgCZEEAR0EBcQ0AIAUoAhxBA2xBA3RBBREAACEEIAUoAjwgBDYCZAsgBUEANgIMAkADQCAFKAIMIAUoAhxIQQFxRQ0BIAUgBSgCXCAFKwMQIAUtAENBAXEgBSgCPCgCZCAFKAIMQQNsQQN0akEAQQFxQQBBAXEQlAE2AgggBSAFKAIMQQFqNgIMIAUgBSsDECAFKwMwoDkDEAwAAAsACyAFKAI8IAUrAyg5A0ggBSgCPCAFKwMgOQNQIAUoAjwgBSsDMDkDWCAFKAI8IAUoAhxBA2w2AmAgBSgCPCgCZCEEIAVB4ABqJAAgBAt3AQF/IwBBIGsiBCQAIAQgADYCHCAEIAE5AxAgBCACOgAPIAQgAzoADgJAIAQtAA9BAXENACAEQQE6AA8LIAQoAhwgBCsDECAELQAPQQFxQQAoArxHIAQtAA5BAXFBAEEBcRCUARpBACgCvEchAyAEQSBqJAAgAwtjAQF/IwBBIGsiBCQAIAQgADYCHCAEIAE5AxAgBCACOgAPIAQgAzoADiAEKAIcIAQrAxAgBC0AD0EBcUEAKAK8RyAELQAOQQFxQQBBAXEQlAEaQQAoArxHIQMgBEEgaiQAIAMLxwUCAX8CfCMAQfAAayIEJAAgBCAANgJoIAQgATYCZCAEIAI2AmAgBCADNgJcAkACQCAEKAJkQcCEPUpBAXFFDQAgBEEANgJsDAELIAQgBCgCYCsDGDkDUCAEIAQoAmArAyA5A0ggBEEANgJEAkADQCAEKAJEIAQoAmRIQQFxRQ0BIAQoAmghAyAEIAQoAkQiAkEBajYCRCAEIAMgAkEDdGorAwAgBCgCYCsDAKE5AzggBCgCaCEDIAQgBCgCRCICQQFqNgJEIAQgAyACQQN0aisDACAEKAJgKwMIoTkDMCAEKAJoIQMgBCAEKAJEIgJBAWo2AkQgBCADIAJBA3RqKwMAIAQoAmArAxChOQMoIAQgBCsDUBBHIAQrA0gQRqIgBCsDOKIgBCsDUBBHIAQrA0gQR6IgBCsDMKKgIAQrA1AQRiAEKwMooqE5AyAgBCAEKwNIEEeaIAQrAziiIAQrA0gQRiAEKwMwoqA5AxggBCAEKwNQEEYgBCsDSBBGoiAEKwM4oiAEKwNQEEYgBCsDSBBHoiAEKwMwoqAgBCsDUBBHIAQrAyiioDkDECAEKAJcIAQoAkRBAWtBA3RqIAQrAyAgBCsDIKIgBCsDGCAEKwMYoqAgBCsDECAEKwMQoqCfIgU5AwAgBCAFOQMIIAQoAlwgBCgCREECa0EDdGogBCsDECAEKwMIoxDiASIFOQMAIAQgBTkDACAEKwMAIQVEUrgehetR8D8gBCsDABCSAUSamZmZmZkkQCAEKwMAEJIBRHE9CtejcBRAoKOgEJEBEOMBo0QAAAAAAABOQKMQkQEhBiAEKAJcIAQoAkRBAmtBA3RqIAUgBqA5AwAgBCgCXCAEKAJEQQNrQQN0aiAEKwMYmiAEKwMgEE5EGC1EVPshCUCgOQMADAAACwALIAQgBCgCXDYCbAsgBCgCbCEDIARB8ABqJAAgAwvIAgMBfwF+A3wCQAJAAkAgAL0iAkIgiKdB/////wdxIgFBgIDA/wNJDQAgAUGAgMCAfGogAqdyDQEgAEQYLURU+yH5P6JEAAAAAAAAcDigDwsCQCABQf////4DSw0AIAFBgIBAakGAgIDyA0kNAiAAIACiEPsBIACiIACgDwtEAAAAAAAA8D8gABD8AaFEAAAAAAAA4D+iIgMQ/QEhACADEPsBIQQCQAJAIAFBs+a8/wNJDQBEGC1EVPsh+T8gACAAIASioCIAIACgRAdcFDMmppG8oKEhAAwBC0QYLURU+yHpPyAAvUKAgICAcIO/IgUgBaChIAAgAKAgBKJEB1wUMyamkTwgAyAFIAWioSAAIAWgoyIAIACgoaGhRBgtRFT7Iek/oCEACyAAIACaIAJCf1UbDwtEAAAAAAAAAAAgACAAoaMhAAsgAAuIAQECfyMAQRBrIgEkAAJAAkAgAL1CIIinQf////8HcSICQfvDpP8DSw0AIAJBgICA8gNJDQEgAEQAAAAAAAAAAEEAEPgBIQAMAQsCQCACQYCAwP8HSQ0AIAAgAKEhAAwBCyAAIAEQ+QEhAiABKwMAIAErAwggAkEBcRD4ASEACyABQRBqJAAgAAusAgEBfyMAQcAAayIFJAAgBSAANgI8IAUgATkDMCAFIAI5AyggBSADNgIkIAUgBDYCICAFQX8gBSgCJEEDbCIEQQN0IARB/////wFxIARHQQFxGxBiNgIcAkACQCAFKAIkQQFKQQFxRQ0AIAUrAyggBSsDMKEgBSgCJEEBa7ejIQIMAQtBALchAgsgBSACOQMQIAVBADYCDAJAA0AgBSgCDCAFKAIkSEEBcUUNASAFIAUrAzAgBSgCDLcgBSsDEKKgOQMAIAUoAjwgBSsDAEEBQQFxQQAoArxHQQBBAXFBAEEBcRCUARpBACgCvEdBAyAFKAIgIAUoAhwgBSgCDEEDbEEDdGoQ4QEaIAUgBSgCDEEBajYCDAwAAAsACyAFKAIcIQQgBUHAAGokACAEC8gCAQF/IwBBwABrIgUkACAFIAA2AjwgBSABOQMwIAUgAjkDKCAFIAM2AiQgBSAENgIgIAVBfyAFKAIkQQZsIgRBA3QgBEH/////AXEgBEdBAXEbEGI2AhwCQAJAIAUoAiRBAUpBAXFFDQAgBSsDKCAFKwMwoSAFKAIkQQFrt6MhAgwBC0EAtyECCyAFIAI5AxAgBUEANgIMAkADQCAFKAIMIAUoAiRIQQFxRQ0BIAUgBSsDMCAFKAIMtyAFKwMQoqA5AwAgBSgCPCAFKwMAQQFBAXEgBSgCHCAFKAIMQQZsQQNqQQN0akEAQQFxQQBBAXEQlAEaIAUoAhwgBSgCDEEGbEEDakEDdGpBAyAFKAIgIAUoAhwgBSgCDEEGbEEDdGoQ4QEaIAUgBSgCDEEBajYCDAwAAAsACyAFKAIcIQQgBUHAAGokACAEC+SAAQIDfwF8IwBBsKYEayIAJAAQkwECQAJAEOcBQQFxDQAgABDoATYCrKYEDAELIABB4KUEakHgDUHGABAXIQEgAEGQpQRqQbAOQcYAEBchAiAAQcgIEDxBAEHICBAYNgKMpQQgACgCjKUEQQE6ADAgAEHtADoAi6UEIABB+gA6AIqlBCAAQekAOgCJpQQgAEECNgKEpQQgASACIAAtAIulBEEYdEEYdSAALQCKpQRBGHRBGHUgAC0AiaUEQRh0QRh1IAAoAoSlBCAAQfikBGogAEHwpARqIABB6KQEaiAAKAKMpQRB8ABqEFAgACgCjKUEIAAoAoylBCsDsAYgACgCjKUEKwO4BqBEAAAAwMWeQkGhRAAAAABwmZRBojkDQCAAKAKMpQREGC1EVPshGUAgACgCjKUEKwOIB6NEAAAAAAAATkCiRAAAAAAAQI9AojkDOCAAKAKMpQRBALciAzkDSCAAKAKMpQQgAzkDUCAAKAKMpQQgAzkDWCAAKAKMpQRBADYCZCAAQeAkakEAQYCABBAYIQEgAEH7ADoA4CQgAEEBNgLcJCAAKALcJCECIABBEGogACgCjKUEKwMAOQMAIABBCDYCDCAAQQA2AgggAEG6DzYCBCAAQbgPNgIAIAAgASACaiAAQfYOIAAQ6QEgACgC3CRqNgLcJCAAKALcJCEBIABBMGogACgCjKUEKwMIOQMAIABBCDYCLCAAQQg2AiggAEG6DzYCJCAAQcEPNgIgIAAgASAAQeAkamogAEH2DiAAQSBqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAQcAAakEQaiAAKAKMpQQrAxA5AwAgAEEINgJMIABBEDYCSCAAQboPNgJEIABBww82AkAgACABIABB4CRqaiAAQfYOIABBwABqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAQfAAaiAAKAKMpQQrAxg5AwAgAEEINgJsIABBGDYCaCAAQboPNgJkIABBxQ82AmAgACABIABB4CRqaiAAQfYOIABB4ABqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAQZABaiAAKAKMpQQrAyA5AwAgAEEINgKMASAAQSA2AogBIABBug82AoQBIABByA82AoABIAAgASAAQeAkamogAEH2DiAAQYABahDpASAAKALcJGo2AtwkIAAoAtwkIQEgAEGwAWogACgCjKUEKwMoOQMAIABBCDYCrAEgAEEoNgKoASAAQboPNgKkASAAQcsPNgKgASAAIAEgAEHgJGpqIABB9g4gAEGgAWoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIABB0AFqIAAoAoylBC0AMEEBcTYCACAAQQE2AswBIABBMDYCyAEgAEGXEDYCxAEgAEGPEDYCwAEgACABIABB4CRqaiAAQc4PIABBwAFqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAQfABaiAAKAKMpQQrAzg5AwAgAEEINgLsASAAQTg2AugBIABBug82AuQBIABBnBA2AuABIAAgASAAQeAkamogAEH2DiAAQeABahDpASAAKALcJGo2AtwkIAAoAtwkIQEgAEGQAmogACgCjKUEKwNAOQMAIABBCDYCjAIgAEHAADYCiAIgAEG6DzYChAIgAEGjEDYCgAIgACABIABB4CRqaiAAQfYOIABBgAJqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAQbACaiAAKAKMpQQrA0g5AwAgAEEINgKsAiAAQcgANgKoAiAAQboPNgKkAiAAQbIQNgKgAiAAIAEgAEHgJGpqIABB9g4gAEGgAmoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIABB0AJqIAAoAoylBCsDUDkDACAAQQg2AswCIABB0AA2AsgCIABBug82AsQCIABBwhA2AsACIAAgASAAQeAkamogAEH2DiAAQcACahDpASAAKALcJGo2AtwkIAAoAtwkIQEgAEHwAmogACgCjKUEKwNYOQMAIABBCDYC7AIgAEHYADYC6AIgAEG6DzYC5AIgAEHREDYC4AIgACABIABB4CRqaiAAQfYOIABB4AJqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAQZADaiAAKAKMpQQoAmA2AgAgAEEENgKMAyAAQeAANgKIAyAAQfEQNgKEAyAAQeAQNgKAAyAAIAEgAEHgJGpqIABBzg8gAEGAA2oQ6QEgACgC3CRqNgLcJCAAKALcJCEBIABBsANqIAAoAoylBCgCZDYCACAAQQQ2AqwDIABB5AA2AqgDIABBxBE2AqQDIABBthE2AqADIAAgASAAQeAkamogAEH1ECAAQaADahDpASAAKALcJGo2AtwkIAAoAtwkIQEgAEHQA2ogACgCjKUEKAJoNgIAIABBBDYCzAMgAEHoADYCyAMgAEHxEDYCxAMgAEHMETYCwAMgACABIABB4CRqaiAAQc4PIABBwANqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAQfADaiAAKAKMpQQoAmw2AgAgAEEENgLsAyAAQewANgLoAyAAQfEQNgLkAyAAQeARNgLgAyAAIAEgAEHgJGpqIABBzg8gAEHgA2oQ6QEgACgC3CRqNgLcJCAAQfAANgLYJCAAKALcJCEBIAAoAtgkIQIgAEGQBGogACgCjKUEKAJwNgIAIABBBDYCjAQgACACQQBqNgKIBCAAQbUSNgKEBCAAQa4SNgKABCAAIAEgAEHgJGpqIABB7BEgAEGABGoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEGwBGogACgCjKUEKAJ0NgIAIABBBDYCrAQgACACQQRqNgKoBCAAQfEQNgKkBCAAQf8SNgKgBCAAIAEgAEHgJGpqIABBvhIgAEGgBGoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHQBGogACgCjKUEKAJ4NgIAIABBBDYCzAQgACACQQhqNgLIBCAAQfEQNgLEBCAAQYcTNgLABCAAIAEgAEHgJGpqIABBvhIgAEHABGoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHwBGogACgCjKUEKAJ8NgIAIABBBDYC7AQgACACQQxqNgLoBCAAQfEQNgLkBCAAQZUTNgLgBCAAIAEgAEHgJGpqIABBvhIgAEHgBGoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEGQBWogACgCjKUELQCAAUEYdEEYdTYCACAAQQE2AowFIAAgAkEQajYCiAUgAEHqEzYChAUgAEHcEzYCgAUgACABIABB4CRqaiAAQZsTIABBgAVqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABBsAVqIAAoAoylBC0AgQFBGHRBGHU2AgAgAEEBNgKsBSAAIAJBEWo2AqgFIABB6hM2AqQFIABB7xM2AqAFIAAgASAAQeAkamogAEGbEyAAQaAFahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQdAFaiAAKAKMpQQtAIIBQRh0QRh1NgIAIABBATYCzAUgACACQRJqNgLIBSAAQeoTNgLEBSAAQfQTNgLABSAAIAEgAEHgJGpqIABBmxMgAEHABWoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHwBWogACgCjKUEKAKEATYCACAAQQQ2AuwFIAAgAkEUajYC6AUgAEHxEDYC5AUgAEH7EzYC4AUgACABIABB4CRqaiAAQb4SIABB4AVqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABBkAZqIAAoAoylBCsDiAE5AwAgAEEINgKMBiAAIAJBGGo2AogGIABBug82AoQGIABBgRQ2AoAGIAAgASAAQeAkamogAEH2DiAAQYAGahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQbAGaiAAKAKMpQQrA5ABOQMAIABBCDYCrAYgACACQSBqNgKoBiAAQboPNgKkBiAAQYcUNgKgBiAAIAEgAEHgJGpqIABB9g4gAEGgBmoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHQBmogACgCjKUEKwOYATkDACAAQQg2AswGIAAgAkEoajYCyAYgAEG6DzYCxAYgAEGNFDYCwAYgACABIABB4CRqaiAAQfYOIABBwAZqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB8AZqIAAoAoylBCsDoAE5AwAgAEEINgLsBiAAIAJBMGo2AugGIABBug82AuQGIABBkRQ2AuAGIAAgASAAQeAkamogAEH2DiAAQeAGahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQZAHaiAAKAKMpQQrA6gBOQMAIABBCDYCjAcgACACQThqNgKIByAAQboPNgKEByAAQZUUNgKAByAAIAEgAEHgJGpqIABB9g4gAEGAB2oQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEGwB2ogACgCjKUEKwOwATkDACAAQQg2AqwHIAAgAkHAAGo2AqgHIABBug82AqQHIABBmRQ2AqAHIAAgASAAQeAkamogAEH2DiAAQaAHahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQdAHaiAAKAKMpQQrA7gBOQMAIABBCDYCzAcgACACQcgAajYCyAcgAEG6DzYCxAcgAEGcFDYCwAcgACABIABB4CRqaiAAQfYOIABBwAdqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB8AdqIAAoAoylBCsDwAE5AwAgAEEINgLsByAAIAJB0ABqNgLoByAAQboPNgLkByAAQZ8UNgLgByAAIAEgAEHgJGpqIABB9g4gAEHgB2oQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEGQCGogACgCjKUEKwPIATkDACAAQQg2AowIIAAgAkHYAGo2AogIIABBug82AoQIIABBohQ2AoAIIAAgASAAQeAkamogAEH2DiAAQYAIahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQbAIaiAAKAKMpQQrA9ABOQMAIABBCDYCrAggACACQeAAajYCqAggAEG6DzYCpAggAEGoFDYCoAggACABIABB4CRqaiAAQfYOIABBoAhqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB0AhqIAAoAoylBCsD2AE5AwAgAEEINgLMCCAAIAJB6ABqNgLICCAAQboPNgLECCAAQawUNgLACCAAIAEgAEHgJGpqIABB9g4gAEHACGoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHwCGogACgCjKUEKwPgATkDACAAQQg2AuwIIAAgAkHwAGo2AugIIABBug82AuQIIABBtBQ2AuAIIAAgASAAQeAkamogAEH2DiAAQeAIahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQZAJaiAAKAKMpQQrA+gBOQMAIABBCDYCjAkgACACQfgAajYCiAkgAEG6DzYChAkgAEG7FDYCgAkgACABIABB4CRqaiAAQfYOIABBgAlqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABBsAlqIAAoAoylBCsD8AE5AwAgAEEINgKsCSAAIAJBgAFqNgKoCSAAQboPNgKkCSAAQcIUNgKgCSAAIAEgAEHgJGpqIABB9g4gAEGgCWoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHQCWogACgCjKUEKwP4ATkDACAAQQg2AswJIAAgAkGIAWo2AsgJIABBug82AsQJIABBxBQ2AsAJIAAgASAAQeAkamogAEH2DiAAQcAJahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQfAJaiAAKAKMpQQrA4ACOQMAIABBCDYC7AkgACACQZABajYC6AkgAEG6DzYC5AkgAEHKFDYC4AkgACABIABB4CRqaiAAQfYOIABB4AlqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABBkApqIAAoAoylBCsDiAI5AwAgAEEINgKMCiAAIAJBmAFqNgKICiAAQboPNgKECiAAQdAUNgKACiAAIAEgAEHgJGpqIABB9g4gAEGACmoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEGwCmogACgCjKUEKwOQAjkDACAAQQg2AqwKIAAgAkGgAWo2AqgKIABBug82AqQKIABB1hQ2AqAKIAAgASAAQeAkamogAEH2DiAAQaAKahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQdAKaiAAKAKMpQQrA5gCOQMAIABBCDYCzAogACACQagBajYCyAogAEG6DzYCxAogAEHcFDYCwAogACABIABB4CRqaiAAQfYOIABBwApqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB8ApqIAAoAoylBCsDoAI5AwAgAEEINgLsCiAAIAJBsAFqNgLoCiAAQboPNgLkCiAAQeMUNgLgCiAAIAEgAEHgJGpqIABB9g4gAEHgCmoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEGQC2ogACgCjKUEKwOoAjkDACAAQQg2AowLIAAgAkG4AWo2AogLIABBug82AoQLIABB6hQ2AoALIAAgASAAQeAkamogAEH2DiAAQYALahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQbALaiAAKAKMpQQrA7ACOQMAIABBCDYCrAsgACACQcABajYCqAsgAEG6DzYCpAsgAEHvFDYCoAsgACABIABB4CRqaiAAQfYOIABBoAtqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB0AtqIAAoAoylBCsDuAI5AwAgAEEINgLMCyAAIAJByAFqNgLICyAAQboPNgLECyAAQfcUNgLACyAAIAEgAEHgJGpqIABB9g4gAEHAC2oQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHwC2ogACgCjKUEKwPAAjkDACAAQQg2AuwLIAAgAkHQAWo2AugLIABBug82AuQLIABB/RQ2AuALIAAgASAAQeAkamogAEH2DiAAQeALahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQZAMaiAAKAKMpQQrA8gCOQMAIABBCDYCjAwgACACQdgBajYCiAwgAEG6DzYChAwgAEGDFTYCgAwgACABIABB4CRqaiAAQfYOIABBgAxqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABBsAxqIAAoAoylBCgC0AI2AgAgAEEENgKsDCAAIAJB4AFqNgKoDCAAQfEQNgKkDCAAQYoVNgKgDCAAIAEgAEHgJGpqIABBvhIgAEGgDGoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHQDGogACgCjKUEKwPYAjkDACAAQQg2AswMIAAgAkHoAWo2AsgMIABBug82AsQMIABBjxU2AsAMIAAgASAAQeAkamogAEH2DiAAQcAMahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQfAMaiAAKAKMpQQrA+ACOQMAIABBCDYC7AwgACACQfABajYC6AwgAEG6DzYC5AwgAEGVFTYC4AwgACABIABB4CRqaiAAQfYOIABB4AxqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABBkA1qIAAoAoylBCsD6AI5AwAgAEEINgKMDSAAIAJB+AFqNgKIDSAAQboPNgKEDSAAQZsVNgKADSAAIAEgAEHgJGpqIABB9g4gAEGADWoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEGwDWogACgCjKUEKwPwAjkDACAAQQg2AqwNIAAgAkGAAmo2AqgNIABBug82AqQNIABBoRU2AqANIAAgASAAQeAkamogAEH2DiAAQaANahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQdANaiAAKAKMpQQrA/gCOQMAIABBCDYCzA0gACACQYgCajYCyA0gAEG6DzYCxA0gAEGnFTYCwA0gACABIABB4CRqaiAAQfYOIABBwA1qEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB8A1qIAAoAoylBCsDgAM5AwAgAEEINgLsDSAAIAJBkAJqNgLoDSAAQboPNgLkDSAAQa0VNgLgDSAAIAEgAEHgJGpqIABB9g4gAEHgDWoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEGQDmogACgCjKUEKwOIAzkDACAAQQg2AowOIAAgAkGYAmo2AogOIABBug82AoQOIABBsxU2AoAOIAAgASAAQeAkamogAEH2DiAAQYAOahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQbAOaiAAKAKMpQQrA5ADOQMAIABBCDYCrA4gACACQaACajYCqA4gAEG6DzYCpA4gAEG5FTYCoA4gACABIABB4CRqaiAAQfYOIABBoA5qEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB0A5qIAAoAoylBCsDmAM5AwAgAEEINgLMDiAAIAJBqAJqNgLIDiAAQboPNgLEDiAAQb8VNgLADiAAIAEgAEHgJGpqIABB9g4gAEHADmoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHwDmogACgCjKUEKwOgAzkDACAAQQg2AuwOIAAgAkGwAmo2AugOIABBug82AuQOIABBxRU2AuAOIAAgASAAQeAkamogAEH2DiAAQeAOahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQZAPaiAAKAKMpQQrA6gDOQMAIABBCDYCjA8gACACQbgCajYCiA8gAEG6DzYChA8gAEHLFTYCgA8gACABIABB4CRqaiAAQfYOIABBgA9qEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABBsA9qIAAoAoylBCsDsAM5AwAgAEEINgKsDyAAIAJBwAJqNgKoDyAAQboPNgKkDyAAQdAVNgKgDyAAIAEgAEHgJGpqIABB9g4gAEGgD2oQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHQD2ogACgCjKUEKwO4AzkDACAAQQg2AswPIAAgAkHIAmo2AsgPIABBug82AsQPIABB1RU2AsAPIAAgASAAQeAkamogAEH2DiAAQcAPahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQfAPaiAAKAKMpQQrA8ADOQMAIABBCDYC7A8gACACQdACajYC6A8gAEG6DzYC5A8gAEHaFTYC4A8gACABIABB4CRqaiAAQfYOIABB4A9qEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABBkBBqIAAoAoylBCsDyAM5AwAgAEEINgKMECAAIAJB2AJqNgKIECAAQboPNgKEECAAQd8VNgKAECAAIAEgAEHgJGpqIABB9g4gAEGAEGoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEGwEGogACgCjKUEKwPQAzkDACAAQQg2AqwQIAAgAkHgAmo2AqgQIABBug82AqQQIABB5BU2AqAQIAAgASAAQeAkamogAEH2DiAAQaAQahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQdAQaiAAKAKMpQQrA9gDOQMAIABBCDYCzBAgACACQegCajYCyBAgAEG6DzYCxBAgAEHpFTYCwBAgACABIABB4CRqaiAAQfYOIABBwBBqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB8BBqIAAoAoylBCsD4AM5AwAgAEEINgLsECAAIAJB8AJqNgLoECAAQboPNgLkECAAQe8VNgLgECAAIAEgAEHgJGpqIABB9g4gAEHgEGoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEGQEWogACgCjKUEKwPoAzkDACAAQQg2AowRIAAgAkH4Amo2AogRIABBug82AoQRIABB9RU2AoARIAAgASAAQeAkamogAEH2DiAAQYARahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQbARaiAAKAKMpQQrA/ADOQMAIABBCDYCrBEgACACQYADajYCqBEgAEG6DzYCpBEgAEH4FTYCoBEgACABIABB4CRqaiAAQfYOIABBoBFqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABB0BFqIAAoAoylBCsD+AM5AwAgAEEINgLMESAAIAJBiANqNgLIESAAQboPNgLEESAAQfwVNgLAESAAIAEgAEHgJGpqIABB9g4gAEHAEWoQ6QEgACgC3CRqNgLcJCAAKALcJCEBIAAoAtgkIQIgAEHwEWogACgCjKUEKwOABDkDACAAQQg2AuwRIAAgAkGQA2o2AugRIABBug82AuQRIABBgBY2AuARIAAgASAAQeAkamogAEH2DiAAQeARahDpASAAKALcJGo2AtwkIAAoAtwkIQEgACgC2CQhAiAAQZASaiAAKAKMpQQrA4gEOQMAIABBCDYCjBIgACACQZgDajYCiBIgAEG6DzYChBIgAEGFFjYCgBIgACABIABB4CRqaiAAQfYOIABBgBJqEOkBIAAoAtwkajYC3CQgACgC3CQhASAAKALYJCECIABBsBJqIAAoAoylBCsDkAQ5AwAgAEEINgKsEiAAIAJBoANqNgKoEiAAQboPNgKkEiAAQYkWNgKgEiAAIAEgAEHgJGpqIABB9g4gAEGgEmoQ6QEgACgC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ajYCBAsCQCAJIANUDQACQCADp0EBcQ0AIAYNAEEAQcQANgKkUiADQn98IQMMAwsgCSADWA0AQQBBxAA2AqRSDAILIAkgBqwiA4UgA30hAwwBC0IAIQMgAEIAEI0CCyAEQRBqJAAgAwsQACAAQSBGIABBd2pBBUlyCzUAIAAgATcDACAAIARCMIinQYCAAnEgAkIwiKdB//8BcXKtQjCGIAJC////////P4OENwMIC+ICAQF/IwBB0ABrIgQkAAJAAkAgA0GAgAFIDQAgBEEgaiABIAJCAEKAgICAgICA//8AEBEgBEEgakEIaikDACECIAQpAyAhAQJAIANB//8BTg0AIANBgYB/aiEDDAILIARBEGogASACQgBCgICAgICAgP//ABARIANB/f8CIANB/f8CSBtBgoB+aiEDIARBEGpBCGopAwAhAiAEKQMQIQEMAQsgA0GBgH9KDQAgBEHAAGogASACQgBCgICAgICAwAAQESAEQcAAakEIaikDACECIAQpA0AhAQJAIANBg4B+TA0AIANB/v8AaiEDDAELIARBMGogASACQgBCgICAgICAwAAQESADQYaAfSADQYaAfUobQfz/AWohAyAEQTBqQQhqKQMAIQIgBCkDMCEBCyAEIAEgAkIAIANB//8Aaq1CMIYQESAAIARBCGopAwA3AwggACAEKQMANwMAIARB0ABqJAALHAAgACACQv///////////wCDNwMIIAAgATcDAAvgCAIGfwJ+IwBBMGsiBCQAQgAhCgJAAkAgAkECSw0AIAFBBGohBSACQQJ0IgJBmDVqKAIAIQYgAkGMNWooAgAhBwNAAkACQCABKAIEIgIgASgCaE8NACAFIAJBAWo2AgAgAi0AACECDAELIAEQjgIhAgsgAhCQAg0AC0EBIQgCQAJAIAJBVWoOAwABAAELQX9BASACQS1GGyEIAkAgASgCBCICIAEoAmhPDQAgBSACQQFqNgIAIAItAAAhAgwBCyABEI4CIQILQQAhCQJAAkACQANAIAJBIHIgCUGkNWosAABHDQECQCAJQQZLDQACQCABKAIEIgIgASgCaE8NACAFIAJBAWo2AgAgAi0AACECDAELIAEQjgIhAgsgCUEBaiIJQQhHDQAMAgALAAsCQCAJQQNGDQAgCUEIRg0BIANFDQIgCUEESQ0CIAlBCEYNAQsCQCABKAJoIgFFDQAgBSAFKAIAQX9qNgIACyADRQ0AIAlBBEkNAANAAkAgAUUNACAFIAUoAgBBf2o2AgALIAlBf2oiCUEDSw0ACwsgBCAIskMAAIB/lBAkIARBCGopAwAhCyAEKQMAIQoMAgsCQAJAAkAgCQ0AQQAhCQNAIAJBIHIgCUH/OWosAABHDQECQCAJQQFLDQACQCABKAIEIgIgASgCaE8NACAFIAJBAWo2AgAgAi0AACECDAELIAEQjgIhAgsgCUEBaiIJQQNHDQAMAgALAAsCQAJAIAkOBAABAQIBCwJAIAJBMEcNAAJAAkAgASgCBCIJIAEoAmhPDQAgBSAJQQFqNgIAIAktAAAhCQwBCyABEI4CIQkLAkAgCUFfcUHYAEcNACAEQRBqIAEgByAGIAggAxCVAiAEKQMYIQsgBCkDECEKDAYLIAEoAmhFDQAgBSAFKAIAQX9qNgIACyAEQSBqIAEgAiAHIAYgCCADEJYCIAQpAyghCyAEKQMgIQoMBAsCQCABKAJoRQ0AIAUgBSgCAEF/ajYCAAtBAEEcNgKkUgwBCwJAAkAgASgCBCICIAEoAmhPDQAgBSACQQFqNgIAIAItAAAhAgwBCyABEI4CIQILAkACQCACQShHDQBBASEJDAELQoCAgICAgOD//wAhCyABKAJoRQ0DIAUgBSgCAEF/ajYCAAwDCwNAAkACQCABKAIEIgIgASgCaE8NACAFIAJBAWo2AgAgAi0AACECDAELIAEQjgIhAgsgAkG/f2ohCAJAAkAgAkFQakEKSQ0AIAhBGkkNACACQZ9/aiEIIAJB3wBGDQAgCEEaTw0BCyAJQQFqIQkMAQsLQoCAgICAgOD//wAhCyACQSlGDQICQCABKAJoIgJFDQAgBSAFKAIAQX9qNgIACwJAIANFDQAgCUUNAwNAIAlBf2ohCQJAIAJFDQAgBSAFKAIAQX9qNgIACyAJDQAMBAALAAtBAEEcNgKkUgtCACEKIAFCABCNAgtCACELCyAAIAo3AwAgACALNwMIIARBMGokAAunDwIIfwd+IwBBsANrIgYkAAJAAkAgASgCBCIHIAEoAmhPDQAgASAHQQFqNgIEIActAAAhBwwBCyABEI4CIQcLQQAhCEIAIQ5BACEJAkACQAJAA0ACQCAHQTBGDQAgB0EuRw0EIAEoAgQiByABKAJoTw0CIAEgB0EBajYCBCAHLQAAIQcMAwsCQCABKAIEIgcgASgCaE8NAEEBIQkgASAHQQFqNgIEIActAAAhBwwBC0EBIQkgARCOAiEHDAAACwALIAEQjgIhBwtBASEIQgAhDiAHQTBHDQADQAJAAkAgASgCBCIHIAEoAmhPDQAgASAHQQFqNgIEIActAAAhBwwBCyABEI4CIQcLIA5Cf3whDiAHQTBGDQALQQEhCEEBIQkLQoCAgICAgMD/PyEPQQAhCkIAIRBCACERQgAhEkEAIQtCACETAkACQANAIAdBIHIhDAJAAkAgB0FQaiINQQpJDQACQCAHQS5GDQAgDEGff2pBBUsNBQsgB0EuRw0AIAgNA0EBIQggEyEODAELIAxBqX9qIA0gB0E5ShshBwJAAkAgE0IHVQ0AIAcgCkEEdGohCgwBCwJAIBNCHFUNACAGQTBqIAcQJSAGQSBqIBIgD0IAQoCAgICAgMD9PxARIAZBEGogBikDICISIAZBIGpBCGopAwAiDyAGKQMwIAZBMGpBCGopAwAQESAGIBAgESAGKQMQIAZBEGpBCGopAwAQKCAGQQhqKQMAIREgBikDACEQDAELIAsNACAHRQ0AIAZB0ABqIBIgD0IAQoCAgICAgID/PxARIAZBwABqIBAgESAGKQNQIAZB0ABqQQhqKQMAECggBkHAAGpBCGopAwAhEUEBIQsgBikDQCEQCyATQgF8IRNBASEJCwJAIAEoAgQiByABKAJoTw0AIAEgB0EBajYCBCAHLQAAIQcMAQsgARCOAiEHDAAACwALQS4hBwsCQAJAAkACQCAJDQACQCABKAJoDQAgBQ0DDAILIAEgASgCBCIHQX9qNgIEIAVFDQEgASAHQX5qNgIEIAhFDQIgASAHQX1qNgIEDAILAkAgE0IHVQ0AIBMhDwNAIApBBHQhCiAPQgF8Ig9CCFINAAsLAkACQCAHQV9xQdAARw0AIAEgBRCXAiIPQoCAgICAgICAgH9SDQECQCAFRQ0AQgAhDyABKAJoRQ0CIAEgASgCBEF/ajYCBAwCC0IAIRAgAUIAEI0CQgAhEwwEC0IAIQ8gASgCaEUNACABIAEoAgRBf2o2AgQLAkAgCg0AIAZB8ABqIAS3RAAAAAAAAAAAohApIAZB+ABqKQMAIRMgBikDcCEQDAMLAkAgDiATIAgbQgKGIA98QmB8IhNBACADa61XDQBBAEHEADYCpFIgBkGgAWogBBAlIAZBkAFqIAYpA6ABIAZBoAFqQQhqKQMAQn9C////////v///ABARIAZBgAFqIAYpA5ABIAZBkAFqQQhqKQMAQn9C////////v///ABARIAZBgAFqQQhqKQMAIRMgBikDgAEhEAwDCwJAIBMgA0GefmqsUw0AAkAgCkF/TA0AA0AgBkGgA2ogECARQgBCgICAgICAwP+/fxAoIBAgEUIAQoCAgICAgID/PxAOIQcgBkGQA2ogECARIBAgBikDoAMgB0EASCIBGyARIAZBoANqQQhqKQMAIAEbECggE0J/fCETIAZBkANqQQhqKQMAIREgBikDkAMhECAKQQF0IAdBf0pyIgpBf0oNAAsLAkACQCATIAOsfUIgfCIOpyIHQQAgB0EAShsgAiAOIAKtUxsiB0HxAEgNACAGQYADaiAEECUgBkGIA2opAwAhDkIAIQ8gBikDgAMhEkIAIRQMAQsgBkHgAmpEAAAAAAAA8D9BkAEgB2sQFRApIAZB0AJqIAQQJSAGQfACaiAGKQPgAiAGQeACakEIaikDACAGKQPQAiISIAZB0AJqQQhqKQMAIg4QkQIgBikD+AIhFCAGKQPwAiEPCyAGQcACaiAKIApBAXFFIBAgEUIAQgAQDUEARyAHQSBIcXEiB2oQKiAGQbACaiASIA4gBikDwAIgBkHAAmpBCGopAwAQESAGQZACaiAGKQOwAiAGQbACakEIaikDACAPIBQQKCAGQaACakIAIBAgBxtCACARIAcbIBIgDhARIAZBgAJqIAYpA6ACIAZBoAJqQQhqKQMAIAYpA5ACIAZBkAJqQQhqKQMAECggBkHwAWogBikDgAIgBkGAAmpBCGopAwAgDyAUECsCQCAGKQPwASIQIAZB8AFqQQhqKQMAIhFCAEIAEA0NAEEAQcQANgKkUgsgBkHgAWogECARIBOnEJICIAYpA+gBIRMgBikD4AEhEAwDC0EAQcQANgKkUiAGQdABaiAEECUgBkHAAWogBikD0AEgBkHQAWpBCGopAwBCAEKAgICAgIDAABARIAZBsAFqIAYpA8ABIAZBwAFqQQhqKQMAQgBCgICAgICAwAAQESAGQbABakEIaikDACETIAYpA7ABIRAMAgsgAUIAEI0CCyAGQeAAaiAEt0QAAAAAAAAAAKIQKSAGQegAaikDACETIAYpA2AhEAsgACAQNwMAIAAgEzcDCCAGQbADaiQAC7EfAwx/Bn4BfCMAQZDGAGsiByQAQQAhCEEAIAQgA2oiCWshCkIAIRNBACELAkACQAJAA0ACQCACQTBGDQAgAkEuRw0EIAEoAgQiAiABKAJoTw0CIAEgAkEBajYCBCACLQAAIQIMAwsCQCABKAIEIgIgASgCaE8NAEEBIQsgASACQQFqNgIEIAItAAAhAgwBC0EBIQsgARCOAiECDAAACwALIAEQjgIhAgtBASEIQgAhEyACQTBHDQADQAJAAkAgASgCBCICIAEoAmhPDQAgASACQQFqNgIEIAItAAAhAgwBCyABEI4CIQILIBNCf3whEyACQTBGDQALQQEhC0EBIQgLQQAhDCAHQQA2ApAGIAJBUGohDQJAAkACQAJAAkACQAJAAkAgAkEuRiIODQBCACEUIA1BCU0NAEEAIQ9BACEQDAELQgAhFEEAIRBBACEPQQAhDANAAkACQCAOQQFxRQ0AAkAgCA0AIBQhE0EBIQgMAgsgC0UhCwwECyAUQgF8IRQCQCAPQfwPSg0AIAJBMEYhDiAUpyERIAdBkAZqIA9BAnRqIQsCQCAQRQ0AIAIgCygCAEEKbGpBUGohDQsgDCARIA4bIQwgCyANNgIAQQEhC0EAIBBBAWoiAiACQQlGIgIbIRAgDyACaiEPDAELIAJBMEYNACAHIAcoAoBGQQFyNgKARkHcjwEhDAsCQAJAIAEoAgQiAiABKAJoTw0AIAEgAkEBajYCBCACLQAAIQIMAQsgARCOAiECCyACQVBqIQ0gAkEuRiIODQAgDUEKSQ0ACwsgEyAUIAgbIRMCQCACQV9xQcUARw0AIAtFDQACQCABIAYQlwIiFUKAgICAgICAgIB/Ug0AIAZFDQVCACEVIAEoAmhFDQAgASABKAIEQX9qNgIECyALRQ0DIBUgE3whEwwFCyALRSELIAJBAEgNAQsgASgCaEUNACABIAEoAgRBf2o2AgQLIAtFDQILQQBBHDYCpFILQgAhFCABQgAQjQJCACETDAELAkAgBygCkAYiAQ0AIAcgBbdEAAAAAAAAAACiECkgB0EIaikDACETIAcpAwAhFAwBCwJAIBRCCVUNACATIBRSDQACQCADQR5KDQAgASADdg0BCyAHQTBqIAUQJSAHQSBqIAEQKiAHQRBqIAcpAzAgB0EwakEIaikDACAHKQMgIAdBIGpBCGopAwAQESAHQRBqQQhqKQMAIRMgBykDECEUDAELAkAgEyAEQX5trVcNAEEAQcQANgKkUiAHQeAAaiAFECUgB0HQAGogBykDYCAHQeAAakEIaikDAEJ/Qv///////7///wAQESAHQcAAaiAHKQNQIAdB0ABqQQhqKQMAQn9C////////v///ABARIAdBwABqQQhqKQMAIRMgBykDQCEUDAELAkAgEyAEQZ5+aqxZDQBBAEHEADYCpFIgB0GQAWogBRAlIAdBgAFqIAcpA5ABIAdBkAFqQQhqKQMAQgBCgICAgICAwAAQESAHQfAAaiAHKQOAASAHQYABakEIaikDAEIAQoCAgICAgMAAEBEgB0HwAGpBCGopAwAhEyAHKQNwIRQMAQsCQCAQRQ0AAkAgEEEISg0AIAdBkAZqIA9BAnRqIgIoAgAhAQNAIAFBCmwhASAQQQFqIhBBCUcNAAsgAiABNgIACyAPQQFqIQ8LIBOnIQgCQCAMQQlODQAgDCAISg0AIAhBEUoNAAJAIAhBCUcNACAHQcABaiAFECUgB0GwAWogBygCkAYQKiAHQaABaiAHKQPAASAHQcABakEIaikDACAHKQOwASAHQbABakEIaikDABARIAdBoAFqQQhqKQMAIRMgBykDoAEhFAwCCwJAIAhBCEoNACAHQZACaiAFECUgB0GAAmogBygCkAYQKiAHQfABaiAHKQOQAiAHQZACakEIaikDACAHKQOAAiAHQYACakEIaikDABARIAdB4AFqQQggCGtBAnRBsDVqKAIAECUgB0HQAWogBykD8AEgB0HwAWpBCGopAwAgBykD4AEgB0HgAWpBCGopAwAQEyAHQdABakEIaikDACETIAcpA9ABIRQMAgsgBygCkAYhAQJAIAMgCEF9bGpBG2oiAkEeSg0AIAEgAnYNAQsgB0HgAmogBRAlIAdB0AJqIAEQKiAHQcACaiAHKQPgAiAHQeACakEIaikDACAHKQPQAiAHQdACakEIaikDABARIAdBsAJqIAhBAnRBiDVqKAIAECUgB0GgAmogBykDwAIgB0HAAmpBCGopAwAgBykDsAIgB0GwAmpBCGopAwAQESAHQaACakEIaikDACETIAcpA6ACIRQMAQsDQCAHQZAGaiAP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QQhxIRcgBkEQaiESA0AgEiELAkACQCABmUQAAAAAAADgQWNFDQAgAaohEgwBC0GAgICAeCESCyALIBJB0DlqLQAAIBFyOgAAIAEgErehRAAAAAAAADBAoiEBAkAgC0EBaiISIAZBEGprQQFHDQACQCAXDQAgA0EASg0AIAFEAAAAAAAAAABhDQELIAtBLjoAASALQQJqIRILIAFEAAAAAAAAAABiDQALAkACQCADRQ0AIBIgBkEQamtBfmogA04NACADIAxqIBVrQQJqIQsMAQsgDCAGQRBqayAVayASaiELCyAAQSAgAiALIBZqIgogBBCrAiAAIA4gFhClAiAAQTAgAiAKIARBgIAEcxCrAiAAIAZBEGogEiAGQRBqayISEKUCIABBMCALIBIgDCAVayIRamtBAEEAEKsCIAAgFSAREKUCIABBICACIAogBEGAwABzEKsCCyAGQbAEaiQAIAIgCiAKIAJIGwsqAQF/IAEgASgCAEEPakFwcSICQRBqNgIAIAAgAikDACACKQMIEC05AwALBQAgAL0L3wIBB38jAEEgayIDJAAgAyAAKAIcIgQ2AhAgACgCFCEFIAMgAjYCHCADIAE2AhggAyAFIARrIgE2AhQgASACaiEGQQIhByADQRBqIQECQAJAAkACQCAAKAI8IANBEGpBAiADQQxqEAUQhAINAANAIAYgAygCDCIERg0CIARBf0wNAyABIAQgASgCBCIISyIFQQN0aiIJIAkoAgAgBCAIQQAgBRtrIghqNgIAIAFBDEEEIAUbaiIJIAkoAgAgCGs2AgAgBiAEayEGIAAoAjwgAUEIaiABIAUbIgEgByAFayIHIANBDGoQBRCEAkUNAAsLIANBfzYCDCAGQX9HDQELIAAgACgCLCIBNgIcIAAgATYCFCAAIAEgACgCMGo2AhAgAiEEDAELQQAhBCAAQQA2AhwgAEIANwMQIAAgACgCAEEgcjYCACAHQQJGDQAgAiABKAIEayEECyADQSBqJAAgBAtZAQJ/IAEtAAAhAgJAIAAtAAAiA0UNACADIAJB/wFxRw0AA0AgAS0AASECIAAtAAEiA0UNASABQQFqIQEgAEEBaiEAIAMgAkH/AXFGDQALCyADIAJB/wFxawugAgEBf0EBIQICQAJAIABFDQAgAUH/AE0NAQJAAkBBACgCiFINACABQYB/cUGAvwNGDQNBAEEZNgKkUgwBCwJAIAFB/w9LDQAgACABQT9xQYABcjoAASAAIAFBBnZBwAFyOgAAQQIPCwJAAkAgAUGAsANJDQAgAUGAQHFBgMADRw0BCyAAIAFBP3FBgAFyOgACIAAgAUEMdkHgAXI6AAAgACABQQZ2QT9xQYABcjoAAUEDDwsCQCABQYCAfGpB//8/Sw0AIAAgAUE/cUGAAXI6AAMgACABQRJ2QfABcjoAACAAIAFBBnZBP3FBgAFyOgACIAAgAUEMdkE/cUGAAXI6AAFBBA8LQQBBGTYCpFILQX8hAgsgAg8LIAAgAToAAEEBCwYAQaTSAAsGAEGo0gALBgBBsNIACwYAQbTSAAsFABDTAgsMACAAQYA8NgIAIAALOQECfyABEB4iAkENahA8IgNBADYCCCADIAI2AgQgAyACNgIAIAAgAxC6AiABIAJBAWoQFzYCACAACwcAIABBDGoLCABB3DsQNwALBwAgABC9AgsEACAACwwAIAAQvAIgAToACwsHACAAELwCCy0BAX9BCiEBAkAgAEELSQ0AIABBAWoQxwIiACAAQX9qIgAgAEELRhshAQsgAQsHACAAEMgCCwwAIAAQvAIgATYCAAsTACAAELwCIAFBgICAgHhyNgIICwwAIAAQvAIgATYCBAsVAAJAIAJFDQAgACABIAIQFxoLIAALCQAgACABOgAACwoAIABBD2pBcHELCAAgAEEBEDsLCgAgABC8AigCAAsRACAAEPIBKAIIQf////8HcQsJACAAIAEQzAILCgAgACABQQEQPQtCAQJ/AkAQzgIiAiABSQ0AEM8CIAAgARDQAiABakEAEMYCIAEQ0QIPCyACIAEgAmtBsMcAEOsBIgMgAyABIAAQ0gILIwEBf0EKIQACQEGwxwAQ7wFFDQBBsMcAEMoCQX9qIQALIAALHgACQEGwxwAQ7wFFDQBBsMcAEMkCDwtBsMcAEL8CCxUAAkAgAkUNACAAIAEgAhAuGgsgAAsiAAJAQbDHABDvAUUNAEGwxwAgABDEAg8LQbDHACAAEL4CC9MBAQN/IwBBEGsiBiQAAkBBbiAAayABSQ0AEM8CIQdBbyEIAkAgAEHm////B0sNACAGIABBAXQ2AgggBiABIABqNgIMIAZBDGogBkEIahA0KAIAEMACQQFqIQgLIAgQwQIgBSAEEMUCIQECQCACIANrIgJFDQAgASAEaiAHIANqIAIQxQIaCwJAIABBAWoiAEELRg0AIAcgABDLAgtBsMcAIAEQwgJBsMcAIAgQwwJBsMcAIAIgBGoiABDEAiABIABqQQAQxgIgBkEQaiQADwsQuwIACwQAQQALBAAgAAsGACAAEEELBQBB6TsLIgEBfwJAIAAoAgAQ2AIiAUEIahDZAkF/Sg0AIAEQQQsgAAsHACAAQXRqCxUBAX8gACAAKAIAQX9qIgE2AgAgAQsIACAAEDkQQQsHACAAKAIECwsAIAAQORogABBBCwQAIAALAgALAgALBgAgABBBCwYAIAAQQQutAQECfyMAQcAAayIDJABBASEEAkAgACABQQAQ4wINAAJAIAENAEEAIQQMAQtBACEEIAEQ5AIiAUUNACADQX82AhQgAyAANgIQIANBADYCDCADIAE2AgggA0EYakEAQScQGBogA0EBNgI4IAEgA0EIaiACKAIAQQEgASgCACgCHBEJAAJAIAMoAiAiAUEBRw0AIAIgAygCGDYCAAsgAUEBRiEECyADQcAAaiQAIAQLPgACQCACDQAgAEEEaigCACABQQRqKAIAEOUCDwsCQCAAIAFHDQBBAQ8LIABBBGooAgAgAUEEaigCABCxAkULpQIBBH8jAEHAAGsiASQAIAAoAgAiAkF8aigCACEDIAJBeGooAgAhBCABQZw9NgIQIAEgADYCDCABQag9NgIIQQAhAiABQRRqQQBBKxAYGiAAIARqIQACQAJAIANBqD1BABDjAkUNACABQQE2AjggAyABQQhqIAAgAEEBQQAgAygCACgCFBEKACAAQQAgASgCIEEBRhshAgwBCyADIAFBCGogAEEBQQAgAygCACgCGBEMAAJAAkAgASgCLA4CAAECCyABKAIcQQAgASgCKEEBRhtBACABKAIkQQFGG0EAIAEoAjBBAUYbIQIMAQsCQCABKAIgQQFGDQAgASgCMA0BIAEoAiRBAUcNASABKAIoQQFHDQELIAEoAhghAgsgAUHAAGokACACCwcAIAAgAUYLPAACQCAAIAEoAgggBRDjAkUNACABIAIgAyAEEOcCDwsgACgCCCIAIAEgAiADIAQgBSAAKAIAKAIUEQoAC6gBACAAQQE6ADUCQCAAKAIEIAJHDQAgAEEBOgA0AkAgACgCECICDQAgAEEBNgIkIAAg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dmFsdWUiOiAiJWkifSwAZXBvY2h5cgBlcG9jaHR5bnVtcmV2AGVycm9yACIlcyI6IHsidHlwZSI6ICIlcyIsICJvZmZzZXQiOiAlbHUsICJzaXplIjogJWx1LCAidmFsdWUiOiAiJWMifSwAb3BlcmF0aW9ubW9kZQBjaGFyAGluaXQAbWV0aG9kAGlzaW1wAGF5Y29mAGNvbjQxAGNjMQBjYzQAY2M1AGQyAGQzAGQ0AGRlbG1vAGV0YQBhcmdwZG90AG9tZ2NvZgBzaW5tYW8AdAB0MmNvZgB0M2NvZgB0NGNvZgB0NWNvZgB4MW10aDIAeDd0aG0xAG1kb3QAbm9kZWRvdAB4bGNvZgB4bWNvZgBub2RlY2YAaXJlegBkMjIwMQBkMjIxMQBkMzIxMABkMzIyMgBkNDQxMABkNDQyMgBkNTIyMABkNTIzMgBkNTQyMQBkNTQzMwBkZWR0AGRlbDEAZGVsMgBkZWwzAGRpZHQAZG1kdABkbm9kdABkb21kdABlMwBlZTIAcGVvAHBnaG8AcGhvAHBpbmNvAHBsbwBzZTIAc2UzAHNnaDIAc2doMwBzZ2g0AHNoMgBzaDMAc2kyAHNpMwBzbDIAc2wzAHNsNABnc3RvAHhmYWN0AHhnaDIAeGdoMwB4Z2g0AHhoMgB4aDMAeGkyAHhpMwB4bDIAeGwzAHhsNAB4bGFtbwB6bW9sAHptb3MAYXRpbWUAeGxpAHhuaQBhAGFsdHAAYWx0YQBlcG9jaGRheXMAamRzYXRlcG9jaABqZHNhdGVwb2NoRgBuZGRvdABuZG90AGJzdGFyAHJjc2UAaW5jbG8Abm9kZW8AZWNjbwBhcmdwbwBtbwBub19rb3phaQBjbGFzc2lmaWNhdGlvbgAiJXMiOiB7InR5cGUiOiAiJXMiLCAib2Zmc2V0IjogJWx1LCAic2l6ZSI6ICVsdSwgInZhbHVlIjogIiUxMHMifSwAaW50bGRlc2cAY2hhcl8xMQBlcGh0eXBlAGVsbnVtAGxvbmcAcmV2bnVtAG5vX3Vua296YWkAYW0AZW0AaW0AT20Ab20AbW0Abm0AdHVtaW4AbXUAcmFkaXVzZWFydGhrbQB4a2UAajIAajMAajQAajNvajIAZGlhX21tAHBlcmlvZF9zZWMAIiVzIjogeyJ0eXBlIjogIiVzIiwgIm9mZnNl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5dt7AMQ6wgAm9OoA92eKAA2SvwBloysAPZOxAL18CwCkUdwAJ91jAGnh3QCalBkAqCmVAGjOKAAJ7bQARJ8gAE6YygBwgmMAfnwjAA+5MgCn9Y4AFFbnACHxCAC1nSoAb35NAKUZUQC1+asAgt/WAJbdYQAWNgIAxDqfAIOioQBy7W0AOY16AIK4qQBrMlwARidbAAA07QDSAHcA/PRVAAFZTQDgcYAAAAAAAAAAAAAAAABA+yH5PwAAAAAtRHQ+AAAAgJhG+DwAAABgUcx4OwAAAICDG/A5AAAAQCAlejgAAACAIoLjNgAAAAAd82k1GC1EVPsh6T8YLURU+yHpv9IhM3982QJA0iEzf3zZAsAAAAAAAAAAAAAAAAAAAACAGC1EVPshCUAYLURU+yEJwE+7YQVnrN0/GC1EVPsh6T+b9oHSC3PvPxgtRFT7Ifk/4mUvIn8rejwHXBQzJqaBPL3L8HqIB3A8B1wUMyamkTwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////////////////////////////////////////////////AAECAwQFBgcICf////////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wABAgQHAwYFAAAAGAAAADUAAABxAAAAa////877//+Sv///aW5maW5pdHkAAAAACgAAAGQAAADoAwAAECcAAKCGAQBAQg8AgJaYAADh9QXRdJ4AV529KoBwUg///z4nEQAKABEREQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAARAA8K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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
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




// STATICTOP = STATIC_BASE + 11088;
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
      return 12096;
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