/**
 * wg-utils - test type test utilities
 */
//(C) Alexandre Morin 2015 - 2016

const assert = require('assert');
const utils = require('../lib/utils.js');

describe('is* (type detection)', function() {
  it('Should detect arrays', function(done) {
    assert (utils.isArray([])                 === true,     "Empty Array");
    assert (utils.isArray([1,2])              === true,     "Regular Array");
    assert (utils.isArray(new Array(1, 2))    === true,     "Array created with new");
    assert (utils.isArray("array")            === false,    "String");
    assert (utils.isArray(4)                  === false,    "Number");
    assert (utils.isArray(new Date())         === false,    "Date");
    assert (utils.isArray({ x:1, length:3 })  === false,    "Litteral object");
    assert (utils.isArray(null)               === false,    "null");
    assert (utils.isArray(undefined)          === false,    "undefined");
    return done();
  });
  it('Should detect objects', function(done) {
    assert (utils.isObject([])                === true,     "Empty Array");
    assert (utils.isObject([1,2])             === true,     "Regular Array");
    assert (utils.isObject(new Array(1, 2))   === true,     "Array created with new");
    assert (utils.isObject("array")           === false,    "String");
    assert (utils.isObject(4)                 === false,    "Number");
    assert (utils.isObject(new Date())        === true,     "Date");
    assert (utils.isObject({ x:1, length:3 }) === true,     "Litteral object");
    assert (utils.isObject(null)              === false,    "null");
    assert (utils.isObject(undefined)         === false,    "undefined");
    return done();
  });
  it('Should detect dates', function(done) {
    assert (utils.isDate([])                  === false,    "Empty Array");
    assert (utils.isDate([1,2])               === false,    "Regular Array");
    assert (utils.isDate(new Array(1, 2))     === false,    "Array created with new");
    assert (utils.isDate("array")             === false,    "String");
    assert (utils.isDate(4)                   === false,    "Number");
    assert (utils.isDate(new Date())          === true,     "Date");
    assert (utils.isDate({ x:1, length:3 })   === false,    "Litteral object");
    assert (utils.isDate(null)                === false,    "null");
    assert (utils.isDate(undefined)           === false,    "undefined");
    return done();
  });
});

