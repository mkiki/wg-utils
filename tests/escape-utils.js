/**
 * wg-utils - test string escape utilities
 */
//(C) Alexandre Morin 2015 - 2016

const assert = require('assert');
const utils = require('../lib/utils.js');

describe('escapeForLike', function() {
  it('Should not escape normal chars', function(done) {
    assert (utils.escapeForLike("Test string") === "Test string");
    assert (utils.escapeForLike("Backquotes ` are ok") === "Backquotes ` are ok");
    return done();
  });
  it('Should escape single quotes', function(done) {
    assert (utils.escapeForLike("It's a test string") === "It''s a test string");
    assert (utils.escapeForLike("It's a tes' string with 2 single quotes") === "It''s a tes'' string with 2 single quotes");
    assert (utils.escapeForLike("'At the beginning") === "''At the beginning");
    assert (utils.escapeForLike("At the end'") === "At the end''");
    assert (utils.escapeForLike("Two consecutive quotes: ''") === "Two consecutive quotes: ''''");
    return done();
  });
  it('Should escape percentages', function(done) {
    assert (utils.escapeForLike("It's 3% higher") === "It''s 3\\% higher");
    assert (utils.escapeForLike("It's a test % string with 2 % percents") === "It''s a test \\% string with 2 \\% percents");
    assert (utils.escapeForLike("%At the beginning") === "\\%At the beginning");
    assert (utils.escapeForLike("At the end%") === "At the end\\%");
    assert (utils.escapeForLike("Two consecutive percents: %%") === "Two consecutive percents: \\%\\%");
    return done();
  });
});

describe('escapeForWhere', function() {
  it('Should not escape normal chars', function(done) {
    assert (utils.escapeForWhere("Test string") === "Test string");
    assert (utils.escapeForWhere("Backquotes ` are ok") === "Backquotes ` are ok");
    return done();
  });
  it('Should escape single quotes', function(done) {
    assert (utils.escapeForWhere("It's a test string") === "It''s a test string");
    assert (utils.escapeForWhere("It's a tes' string with 2 single quotes") === "It''s a tes'' string with 2 single quotes");
    assert (utils.escapeForWhere("'At the beginning") === "''At the beginning");
    assert (utils.escapeForWhere("At the end'") === "At the end''");
    assert (utils.escapeForWhere("Two consecutive quotes: ''") === "Two consecutive quotes: ''''");
    return done();
  });
  it('Should not escape percentages', function(done) {
    assert (utils.escapeForWhere("It's 3% higher") === "It''s 3% higher");
    assert (utils.escapeForWhere("It's a test % string with 2 % percents") === "It''s a test % string with 2 % percents");
    assert (utils.escapeForWhere("%At the beginning") === "%At the beginning");
    assert (utils.escapeForWhere("At the end%") === "At the end%");
    assert (utils.escapeForWhere("Two consecutive percents: %%") === "Two consecutive percents: %%");
    return done();
  });
});

describe('escapeFilenameForCommand', function() {
  it('Should escape properly', function(done) {
    assert (utils.escapeFilenameForCommand("toto.txt") === "toto.txt",                    "Simple file name");
    assert (utils.escapeFilenameForCommand("toto tutu.txt") === "toto\\ tutu.txt",        "Filename with space");
    assert (utils.escapeFilenameForCommand("toto\".txt") === "toto\\\".txt",              "Filename double quote");
    return done();
  });
});

