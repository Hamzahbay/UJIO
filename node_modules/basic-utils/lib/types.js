'use strict';

const MAX_ASCII_CHAR_CODE = 127;

const internals = {};

internals.ipv4 = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/);

internals.ipv6 = new RegExp(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/);

internals.MacAddress = new RegExp(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/);

internals.FQDN = new RegExp(/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/);

internals.validRegFlags = ['g', 'i', 'm', 'u', 'y'];

internals.alphaReg = new RegExp(/^[A-Za-z]+$/);

internals.numericReg = new RegExp(/^[0-9]+$/);

internals.alphaNumericReg = new RegExp(/^[A-Za-z0-9]+$/);


exports.isError = (value) => {

    return value instanceof Error;
};

exports.isNan = (value) => {

    return value !== value;
};

exports.isObj = (value) => {

    return (!!value) && (value.constructor === Object);
};

exports.isString = (value) => {

    return (!!value) && (value.constructor === String);
};

exports.isArray = (value) => {

    return (!!value) && (value.constructor === Array);
};

exports.isDate = (value) => {

    return (!!value) && (value.constructor === Date);
};

exports.isRegex = (value) => {

    return (!!value) && (value.constructor === RegExp);
};

exports.isFunction = (value) => {

    return (!!value) && (value.constructor === Function);
};

exports.isNumber = (value) => {

    return (!!value) && (value.constructor === Number) && (isFinite(value));
};

exports.isUndefined = (value) => {

    return value === void 0;
};

exports.isNull = (value) => {

    return value === null;
};

exports.isEmpty = (value) => {

    return exports.isUndefined(value) || exports.isNull(value);
};

exports.isObjectID = (value) => {

    if (!value) {
        return false;
    }

    return (/^[0-9a-fA-F]{24}$/).test(value);
};

exports.isFQDN = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    return internals.FQDN.test(value);
};


exports.isIp = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    return internals.ipv4.test(value) || internals.ipv6.test(value);
};

exports.isIp6 = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    return internals.ipv6.test(value);
};

exports.isIp4 = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    return internals.ipv4.test(value);
};

exports.isMac = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    return internals.MacAddress.test(value);
};

exports.isInt8 = (value) => {
    // -128 to 127
    return Number.isInteger(value) ? value >= -128 && value <= 127 : false;
};

exports.isUint8 = (value) => {
    // 0 to 255
    return Number.isInteger(value) ? value >= 0 && value <= 255 : false;
};

exports.isInt16 = (value) => {
    // -32,768 to 32,767
    return Number.isInteger(value) ? value >= -32768 && value <= 32767 : false;
};

exports.isUint16 = (value) => {
    // 0 to 65,535
    return Number.isInteger(value) ? value >= 0 && value <= 65535 : false;
};

exports.isInt32 = (value) => {
    // -2,147,483,648 to 2,147,483,647
    return Number.isInteger(value) ? value >= -2147483648 && value <= 2147483647 : false;
};

exports.isUint32 = (value) => {
    // 0 to 4,294,967,295
    return Number.isInteger(value) ? value >= 0 && value <= 4294967295 : false;
};


exports.isAscii = (value) => {
    // charcode upto 127
    if (!exports.isString(value)) {
        return false;
    }

    for (let i = 0; i < value.length; ++i) {
        if (value.charCodeAt(i) > MAX_ASCII_CHAR_CODE) {
            return false;
        }
    }

    return true;
};


exports.isDateString = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    return (new Date(value).toString() !== 'Invalid Date') && (!isNaN(new Date(value)));
};


exports.isRegexString = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    const firstChar = value[0];
    const lastChar = value[value.length - 1];

    if ((firstChar === '/') && (lastChar === '/' || ~internals.validRegFlags.indexOf(lastChar))) {
        return true;
    }

    return false;
};


exports.isAlpha = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    return internals.alphaReg.test(value);
};


exports.isNumeric = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    return internals.numericReg.test(value);
};

exports.isAlphaNumeric = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    return internals.alphaNumericReg.test(value);
};


exports.isUpperCase = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    return value === value.toUpperCase();
};


exports.isLowerCase = (value) => {

    if (!exports.isString(value)) {
        return false;
    }

    return value === value.toLowerCase();
};
