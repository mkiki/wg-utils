/**
 * @file Willie - Utils
 *
 * Utility functions
 */
// (C) Alexandre Morin 2015 - 2016

const crypto = require('crypto');
const fs = require('fs');

/** ================================================================================
  * String utilities
  * ================================================================================ */

/**
 * Does a string start with a prefix?
 * @param {string} s - is the string to test
 * @param {string} prefix - is the prefix
 * @param {boolean} returns true if the string s starts witht the prefix
 */
startsWith = function (s, prefix) {
  if( !s ) return false;
  return s.substring(0, prefix.length) === prefix;
};

/**
 * Does a string end with a suffix?
 * @param {string} s - is the string to test
 * @param {string} suffix - is the suffix
 * @param {boolean} returns true if the string s ends witht the suffix
 */
endsWith = function (s, suffix) {
  if( !s ) return false;
  return s.substring(s.length-suffix.length, s.length) === suffix;
};

/**
 * Escapes a string to be used in a SQL LIKE condition
 * @param {string} s - is the string to escape
 * @return {string} the escaped string
 */
escapeForLike = function(s) {
  return s.replace(/'/g, "''").replace(/%/g, "\\%");
};

/**
 * Escapes a string to be used in a SQL WHERE condition
 * @param {string} s - is the string to escape
 * @return {string} the escaped string
 */
escapeForWhere = function(s) {
  return s.replace(/'/g, "''");
};

/**
 * Escape a file name to include in a command line
 * @param {string} s - is the string to escape
 * @return {string} the escaped string
 */
escapeFilenameForCommand = function(fn) {
  return fn.replace(/"/g, '\\"')
           .replace(/ /g, '\\ ');
};

/**
 * Compute md5 of file
 * @param {String} longFilename is the fully qualified file name
 * @param {md5_callback} the return callback
 */
md5 = function(longFilename, callback) {
  var sum = crypto.createHash('md5');
  var s = fs.ReadStream(longFilename);
  s.on('error', function(err) {
    return callback(err);
  });
  s.on('data', function(d) {
    sum.update(d);
  });
  s.on('end', function() {
    var md5 = sum.digest('hex');
    return callback(null, md5);
  });
}
/**
 * Callback for the md5 function.
 * @callback md5_callback
 * @param err - is the error code/message
 * @param {string} - is the md5 string
 */

/**
 * Returns the hexadecimal representation of an 8-bit number
 * @param {integer} v is the numer. If not 8 bit, it will be clamped to the [0-255] range
 * @return {string} a 2-character hexadecimal (uppercase) representation of the number
 */
hex8 = function(v) {
  v = v & 0xFF;
  return _hex[v>>4] + _hex[v&0xF];
}
var _hex = "0123456789ABCDEF";

hex16 = function(v) {
  var v1 = (v>>8) & 0xFF;
  var v2 = v & 0xFF;
  return _hex[v1>>4] + _hex[v1&0xF] +
         _hex[v2>>4] + _hex[v2&0xF];
}

hex24 = function(v) {
  var v1 = (v>>16) & 0xFF;
  var v2 = (v>>8) & 0xFF;
  var v3 = v & 0xFF;
  return _hex[v1>>4] + _hex[v1&0xF] +
         _hex[v2>>4] + _hex[v2&0xF] +
         _hex[v3>>4] + _hex[v3&0xF];
}

hex32 = function(v) {
  var v1 = (v>>24) & 0xFF;
  var v2 = (v>>16) & 0xFF;
  var v3 = (v>>8) & 0xFF;
  var v4 = v & 0xFF;
  return _hex[v1>>4] + _hex[v1&0xF] +
         _hex[v2>>4] + _hex[v2&0xF] +
         _hex[v3>>4] + _hex[v3&0xF] +
         _hex[v4>>4] + _hex[v4&0xF];
}


/** ================================================================================
  * Type detection
  * ================================================================================ */

/**
 * Test if an object is an array
 * @param obj - is the object to test
 * @return {boolean} returns a boolean indicating whether the object is a JavaScript array or not
 */
isArray = function (obj) {
  if( obj === null || obj === undefined )
    return false;
  return obj.constructor === [].constructor;
};

/**
 * Test if an object is an javasctipt native date
 * @param obj - is the object to test
 * @return {boolean} returns a boolean indicating whether the object is a JavaScript native date or not
 */
isDate = function(obj) {
  return toString.call(obj) === '[object Date]';
}

/**
 * Test if an object is an javasctipt object
 * @param obj - is the object to test
 * @return {boolean} returns a boolean indicating whether the object is a JavaScript object or not
 */
isObject = function(obj) {
  if( obj === null || obj === undefined )
    return false;
  var type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

/** ================================================================================
  * File utilities
  * ================================================================================ */

/**
 * Compute the extension of a short file name (text after the last .)
 *
 * @param {string} shortFilename - the (short) file name. This function is not supposed to work on fully qualified path names
 * @return {string} the extension, or an empty string if file has no extension.
 * 
 * @see getShortFilename
 */
getExtension = function(shortFilename) {
  var i = shortFilename.lastIndexOf('.');
  if (i===-1) return "";
  return shortFilename.substring(i+1);
}

/**
 * Get the short file name for a fully qualified file name
 *
 * @param {string} longFilename - is the file name, or fully qualified file name
 * @return {string} the short file name, after the last /
 */
getShortFilename = function(longFilename) {
  var lastSlashIndex = longFilename.lastIndexOf('/');
  if (lastSlashIndex !== -1) return longFilename.substr(lastSlashIndex+1);
  return longFilename;
}


/**
 * Get current time (ms)
 * @return {integer} the current UNIX time, in milliseconds since 1970/1/1
 */
now = function() {
  return new Date().getTime();
};


/** ================================================================================
  * Public interface
  * ================================================================================ */
module.exports = {

  // String utilities
  startsWith:                 startsWith,
  endsWith:                   endsWith,

  // MD5 utilities
  md5:                        md5,

  // Hexadecimal utilities
  hex8:                       hex8,
  hex16:                      hex16,
  hex24:                      hex24,
  hex32:                      hex32,

  // String escape utilities
  escapeForWhere:             escapeForWhere,
  escapeForLike:              escapeForLike,
  escapeFilenameForCommand:   escapeFilenameForCommand,

  // File utilities
  getExtension:               getExtension,
  getShortFilename:           getShortFilename,

  // Date + time utilities  
  now:                        now,

  // Type testing utilities
  isArray:                    isArray,
  isDate:                     isDate,
  isObject:                   isObject
};


