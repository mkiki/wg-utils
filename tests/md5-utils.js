/**
 * wg-utils - test md5 utilities
 */
//(C) Alexandre Morin 2015 - 2016

const assert = require('assert');
const utils = require('../lib/utils.js');


describe('md5', function() {
  it('Should compute MD5 of reference file', function(done) {
    return utils.md5(__dirname + "/data/md5-HelloWorld.txt", function(err, md5) {
      assert (err === null);
      assert (md5 === "bc6e6f16b8a077ef5fbc8d59d0b931b9");
      return done();
    });
  });
  it('Should compute MD5 of empty file', function(done) {
    return utils.md5(__dirname + "/data/md5-EmptyFile.txt", function(err, md5) {
      assert (err === null);
      assert (md5 === "d41d8cd98f00b204e9800998ecf8427e");
      return done();
    });
  });
  it('Should fail to compute MD5 of inexisting file', function(done) {
    return utils.md5(__dirname + "/data/md5-HelloWorld2.txt", function(err, md5) {
      return done();
    });
  });
});

