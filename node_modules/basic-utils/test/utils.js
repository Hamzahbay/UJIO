'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

// Fixtures

const Utils = require('../lib/index.js');


// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('Object', () => {


    it('should expose a deepFreeze method', () => {

        expect(Utils.deepFreeze).to.be.a.function();
    });

    it('should test iterateObj method', () => {

        const test = {
            a: 'value',
            b: 1,
            c: {},
            d: 'anotherValue'
        };

        expect(Utils.iterateObj(test)).to.be.a.string().and.equal('a~value\nd~anotherValue\n');

    });


    it('should test format method', () => {

        const expected = 'This is the first entry and this is the second entry';
        expect(Utils.format('{0} is the first entry and this is the {1} entry', 'This', 'second')).to.equal(expected);
    });

    it('should test serialize method', () => {

        const fn = function () {};
        const toString = {
            hello: null,
            int: 123
        };
        const circular = {};
        circular.a = {
            b: circular
        };

        const obj = {
            date: new Date(),
            regexp: new RegExp(),
            nan: NaN,
            positive: Infinity,
            negative: -Infinity,
            key: 'value'
        };

        const string = Utils.serialize(obj);
        const parsed = Utils.deserialize(string);
        expect(string).to.be.a.string();
        expect(parsed).to.be.an.object();
        expect(parsed.date).to.be.a.date();
        expect(parsed.regexp).to.be.a.regexp();
        expect(parsed.nan).to.equal(NaN);
        expect(parsed.positive).to.equal(Infinity);
        expect(parsed.negative).to.equal(-Infinity);
        expect(Utils.serialize(fn)).to.be.a.string();
        expect(Utils.serialize(toString)).to.be.a.string();
        expect(Utils.serialize(circular)).to.be.an.instanceof(Error);
    });

    it('should test deserialize method', () => {

        const fn = function () {};
        const deserialize = Utils.serialize(fn);
        const date = Utils.serialize(new Date());
        expect(Utils.deserialize(deserialize)).to.be.a.function();
        expect(Utils.deserialize(date)).to.be.a.date();
        expect(Utils.deserialize('[1,2,3]')).to.be.an.array();
        expect(Utils.deserialize(new RegExp())).to.be.an.instanceof(Error);
    });


    it('should test omit method', () => {

        const obj = {
            key: 1,
            test: 'hello'
        };

        expect(Utils.omit(null, 'key')).to.be.null();
        expect(Utils.omit(obj, null)).to.equal(obj);
        expect(Utils.omit(obj, 'key')).to.equal({ test: 'hello' });
        expect(Utils.omit(obj, ['key', 'test'])).to.equal({ });

    });


    it('should test applyToDefaults method', () => {

        const defaults = {
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: [5, 6]
            },
            f: 6,
            g: 'test'
        };

        const obj = {
            a: null,
            c: {
                e: [4]
            },
            f: 0,
            g: {
                h: 5
            }
        };

        const result = Utils.applyToDefaults(defaults, obj);
        expect(result.c.e).to.equal([4]);
        expect(result.a).to.equal(1);
        expect(result.b).to.equal(2);
        expect(result.f).to.equal(0);
        expect(result.g).to.equal({ h: 5 });

    });

    it('should test clone method', () => {

        const defaults = {
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: [5, 6]
            },
            f: 6,
            g: 'test'
        };

        const obj = {
            a: null,
            c: {
                e: [4]
            },
            f: 0,
            g: {
                h: 5
            }
        };

        const result = Utils.clone(defaults, obj);
        expect(result.c.e).to.equal([5,6]);
        expect(result.a).to.equal(1);
        expect(result.b).to.equal(2);
        expect(result.f).to.equal(6);
        expect(result.g).to.equal('test');

    });

    it('should test merge method', () => {

        const defaults = {
            a: 1,
            b: 2,
            c: {
                d: 3,
                e: [5, 6]
            },
            f: 6,
            g: 'test'
        };

        const obj = {
            a: null,
            c: {
                e: [4]
            },
            f: 0,
            g: {
                h: 5
            }
        };

        const result = Utils.merge(defaults, obj);
        expect(result.c.e).to.equal([5,6,4]);
        expect(result.a).to.equal(null);
        expect(result.b).to.equal(2);
        expect(result.f).to.equal(0);
        expect(result.g).to.equal({ h: 5 });

    });


});
