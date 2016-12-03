# JavaScript utilities
Load library

	const utils = require('wg-utils');

## String utilities
Some simple string manipulation utilities that are missing from JavaScript.
	
	var test = utils.startsWith("Hello, world", "Hello");
	var test = utils.endsWith("Hello, world", "world");

## Checksums
Compute MD5 checksum of file. The file is not loaded in memory, but read as a stream

	utils.md5(__dirname + "/Hello, World.txt", function(err, md5) {
		...

## Hexadecimal conversion
Convert numbers to their hexadecimal representation

	var str = utils.hex8(0xA3);
	var str = utils.hex16(0xABCD);
	var str = utils.hex24(0xABCDEF);
	var str = utils.hex32(0xABCD1234);
	
## Escaping functions

Database escaping

	var escaped = "WHERE name='" + utils.escapeForWhere(name) + "'";
	var escaped = "WHERE name LIKE '%" + utils.escapeForLike(name) + "%'";

Shell command execution

	var command = "convert " + utils.escapeFilenameForCommand(src) + " " + utils.escapeFilenameForCommand(dst);

## File utilities

Get the extension part of a filename

	var ext = utils.getExtension("/this/is/a/file.txt");
	assert.strictEqual(ext, "txt")

Get the "short file name" part of a filename

	var ext = utils.getExtension("/this/is/a/file.txt");
	assert.strictEqual(ext, "file.txt")

## Date utilities

Get the current date/time

	var now = utils.now();

## Testing object types

	var test = utils.isArray([1,2,3]);
	var test = utils.isDate(now);
	var test = utils.isObject({ x:0 });

