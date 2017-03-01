"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simple_variants_1 = require("../src/simple-variants");
var path = require("path");
it('gets the default value', function () {
    var v = new simple_variants_1.default();
    expect(v.key('foo.bar')).toBe('baz');
});
it('returns undefined when the key is not valid', function () {
    var v = new simple_variants_1.default();
    expect(v.key('foo.buzz')).toBe(undefined);
});
it('can not overwrite a value', function () {
    var v = new simple_variants_1.default();
    var e = v.export();
    expect(function () { e.foo.bar = 'zap'; }).toThrow();
    expect(Object.isFrozen(e)).toBe(true);
    expect(v.key('foo.bar')).toBe('baz');
});
it('gets the variant value', function () {
    var v = new simple_variants_1.default('bing');
    expect(v.key('foo.bar')).toBe('zip');
});
it('gets the a custom file', function () {
    var v = new simple_variants_1.default(undefined, path.join(__dirname, 'fixtures/foo.json'));
    expect(v.key('foo.bar')).toBe('quux');
});
it('throws an error when there is no file', function () {
    expect(function () {
        new simple_variants_1.default(undefined, path.join(__dirname, 'fixtures/bad.json'));
    }).toThrow();
});
