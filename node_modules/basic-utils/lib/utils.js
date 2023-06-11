'use strict';

const DeepFreeze = require('deep-freeze');
const Hoek = require('@hapi/hoek');
const Eval = require('vm').runInNewContext;
const Types = require('./types');


const internals = {};



internals.replacer = (key, value) => {

    if (Types.isFunction(value)) {
        return value.toString();
    }

    if (Types.isNumber(Date.parse(value))) {
        return new Date(value).toString();
    }

    if (Types.isRegex(value)) {
        return value.toString();
    }

    if (Types.isNan(value)) {
        return 'NaN';
    }

    if (value === Infinity) {
        return 'Infinity';
    }

    if (value === -Infinity) {
        return '-Infinity';
    }

    return value;

};


internals.reviver = (key, value) => {

    // check if string is date first
    if (Types.isDateString(value)) {
        return new Date(value);
    }

    if (Types.isString(value)) {

        if (value === 'NaN') {
            return NaN;
        }

        if (value === 'Infinity') {
            return Infinity;
        }

        if (value === '-Infinity') {
            return -Infinity;
        }

        if (Types.isRegexString(value)) {
            return new RegExp(value);
        }

        return (value.substring(0, 8) === 'function') ? Eval('(' + value + ')') : value;
    }

    return value;

};



exports.deepFreeze = DeepFreeze;


exports.iterateObj = (obj) => {

    let txt = '';
    for (const key of (Object.keys(obj))) {
        if (typeof obj[key] === 'string') {
            txt += key + '~' + obj[key] + '\n';
        }
    }

    return txt;
};


exports.format = function (...params) {

    const args = Array.from(params);
    let str = args.shift();
    const items = args;
    for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        const sep = `{${i}}`;
        str = str.replace(sep, item);

    }

    return str;
};


exports.serialize = (obj, spacer) => {

    // Returns value and converts if it is a function to a string
    try {
        return JSON.stringify(obj, internals.replacer, 4);
    }
    catch (e) {

        return e;
    }
};

exports.deserialize = (str) => {

    try {
        return JSON.parse(str, internals.reviver);
    }
    catch (e) {

        return e;
    }
};


exports.omit = (obj, omitKey) => {

    if (Types.isObj(obj)) {

        if (!Types.isString(omitKey)) {
            if (!Types.isArray(omitKey)) {
                return obj;
            }
        }

        if (Types.isString(omitKey)) {
            omitKey = [omitKey];
        }

        return Object.keys(obj)
            .filter((key) => !omitKey.includes(key))
            .reduce((reducedObj, key) => {

                reducedObj[key] = obj[key];
                return reducedObj;
            }, {});
    }

    return null;
};


exports.clone = function (obj) {

    return Hoek.clone(obj);
};


exports.merge = function (target, source) {

    return Hoek.merge(target, source);
};



exports.applyToDefaults = function (defaults, source) {

    return Hoek.applyToDefaults(defaults, source);
};


