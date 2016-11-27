/**
 * wg-utils - test string utilities
 */
//(C) Alexandre Morin 2015 - 2016

const assert = require('assert');
const utils = require('../lib/utils.js');

describe('startsWith', function() {
  it('Should start with "Hello"', function(done) {
    assert (utils.startsWith("Hello, world", "Hello"));
    return done();
  });
  it('Should should not ignore spaces', function(done) {
    assert (!utils.startsWith(" Hello, world", "Hello"));
    return done();
  });
  it('Should should be case sensitive', function(done) {
    assert (!utils.startsWith("Hello, world", "hello"));
    return done();
  });
  it('Should match full string', function(done) {
    assert (utils.startsWith("Hello, world", "Hello, world"));
    return done();
  });
  it('Should not match long prefix', function(done) {
    assert (!utils.startsWith("Hello", "Hello, world"));
    return done();
  });
});

describe('endsWith', function() {
  it('Should end with "world"', function(done) {
    assert (utils.endsWith("Hello, world", "world"));
    return done();
  });
  it('Should should not ignore spaces', function(done) {
    assert (!utils.endsWith("Hello, world ", "world"));
    return done();
  });
  it('Should should be case sensitive', function(done) {
    assert (!utils.endsWith("Hello, world", "World"));
    return done();
  });
  it('Should match full string', function(done) {
    assert (utils.endsWith("Hello, world", "Hello, world"));
    return done();
  });
  it('Should not match long suffix', function(done) {
    assert (!utils.endsWith("world", "Hello, world"));
    return done();
  });
});



