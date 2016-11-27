/**
 * wg-utils - test file utilities
 */
//(C) Alexandre Morin 2015 - 2016

const assert = require('assert');
const utils = require('../lib/utils.js');

describe('getExtension', function() {
  it('Should compute extension', function(done) {
    assert (utils.getExtension('fi.txt')      === 'txt',    "File name with extension");
    assert (utils.getExtension('file')        === '',       "File name without extension");
    assert (utils.getExtension('file.')       === '',       "File name with a trailing .");
    assert (utils.getExtension('fi.txt.pdf')  === 'pdf',    "File name with 2 extensions");
    assert (utils.getExtension('')            === '',       "Empty file name");
    return done();
  });
});

describe('getShortFilename', function() {
  it('Should compute file name', function(done) {
    assert (utils.getShortFilename('fi.txt')          === 'fi.txt',    "Short file name with extension");
    assert (utils.getShortFilename('a/b/fi.txt')      === 'fi.txt',    "Long file name with extension");
    assert (utils.getShortFilename('/fi')             === 'fi',        "File at root");
    assert (utils.getShortFilename('')                === '',          "Empty file name");
    return done();
  });
});
