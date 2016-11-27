/**
 * wg-utils - test hexadecimal string utilities
 */
//(C) Alexandre Morin 2015 - 2016

const assert = require('assert');
const utils = require('../lib/utils.js');

describe('hex8', function() {
  it('Should compute hexadecimal representation of 8 bit numbers', function(done) {
    assert (utils.hex8(0) === "00");
    assert (utils.hex8(12) === "0C");
    assert (utils.hex8(127) === "7F");
    assert (utils.hex8(0xA3) === "A3");
    assert (utils.hex8(255) === "FF");
    return done();
  });
  it('Should clamp bigger numbers to 8-bit range', function(done) {
    assert (utils.hex8(0xB1 + 256*4) === "B1");
    return done();
  });
  it('Should deal with negative numbers', function(done) {
    assert (utils.hex8(-1) === "FF");
    return done();
  });
});
