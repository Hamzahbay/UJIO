'use strict';

module.exports = {

    nonString: [
        null,
        undefined,
        [],
        function () {},
        1234,
        Infinity,
        new Date(),
        new RegExp(),
        new Error(),
        new TypeError(),
        new RangeError(),
        new EvalError(),
        new URIError(),
        NaN,
        Boolean,
        Error,
        true
    ],

    nonObject: [
        null,
        undefined,
        [],
        function () {},
        1234,
        Infinity,
        'test',
        new Date(),
        new RegExp(),
        new Error(),
        new TypeError(),
        new RangeError(),
        new EvalError(),
        new URIError(),
        NaN,
        Boolean,
        Error,
        true

    ],

    nonNan: [
        null,
        undefined,
        {},
        [],
        function () {},
        1234,
        Infinity,
        'test',
        new Date(),
        new RegExp(),
        new Error(),
        new TypeError(),
        new RangeError(),
        new EvalError(),
        new URIError(),
        Boolean,
        Error,
        true

    ],

    nonArray: [
        null,
        undefined,
        function () {},
        1234,
        Infinity,
        'test',
        new Date(),
        new RegExp(),
        new Error(),
        new TypeError(),
        new RangeError(),
        new EvalError(),
        new URIError(),
        NaN,
        Boolean,
        Error,
        true
    ],

    nonInt: [
        null,
        undefined,
        [],
        function () {},
        'test',
        new Date(),
        new RegExp(),
        new Error(),
        new TypeError(),
        new RangeError(),
        new EvalError(),
        new URIError(),
        NaN,
        Boolean,
        Error,
        true
    ],

    nonUndef: [
        null,
        [],
        function () {},
        'test',
        new Date(),
        new RegExp(),
        new Error(),
        new TypeError(),
        new RangeError(),
        new EvalError(),
        new URIError(),
        NaN,
        Boolean,
        Error,
        true
    ],

    v4: [
        '0.0.0.0',
        '8.8.8.8',
        '127.0.0.1',
        '100.100.100.100',
        '192.168.0.1',
        '18.101.25.153',
        '123.23.34.2',
        '172.26.168.134',
        '212.58.241.131',
        '128.0.0.0',
        '23.71.254.72',
        '223.255.255.255',
        '192.0.2.235',
        '99.198.122.146',
        '46.51.197.88',
        '173.194.34.134'
    ],

    v4not: [
        '.100.100.100.100',
        '100..100.100.100.',
        '100.100.100.100.',
        '999.999.999.999',
        '256.256.256.256',
        '256.100.100.100.100',
        '123.123.123',
        'http://123.123.123',
        '1000.2.3.4',
        '999.2.3.4'
    ],

    v6: [
        '::',
        '1::',
        '1::8',
        '1::7:8',
        '1:2:3:4:5:6:7:8',
        '1:2:3:4:5:6::8',
        '1:2:3:4:5:6:7::',
        '1:2:3:4:5::7:8',
        '1:2:3:4:5::8',
        '1:2:3::8',
        '1::4:5:6:7:8',
        '1::6:7:8',
        '1::3:4:5:6:7:8',
        '1:2:3:4::6:7:8',
        '1:2::4:5:6:7:8',
        '::2:3:4:5:6:7:8',
        '1:2::8'
    ],

    v6not: [
        '1:2:3:4:5:6:1.2.3.4',
        '1:',
        ':1',
        '11:36:12'
    ],

    mac: [
        '3D:F2:C9:A6:B3:4F',
        '3D-F2-C9-A6-B3-4F',
        '00:11:22:33:44:55',
        '3d-f2-c9-a6-b3-4f',
        'e4:ce:8f:5b:a7:fc',
        'e4-ce-8f-5b-a7-fe',
        '00:18:31:8A:41:C6',
        'ab:ab:ab:ab:ab:ab',
        'FF:FF:FF:FF:FF:FF',
        '01:02:03:04:05:ab',
        '01:AB:03:04:05:06',
        '00:00:00:00:00:00'
    ],

    notMac: [
        '',
        'invalid',
        [],
        {},
        new RegExp(),
        null,
        undefined,
        'e4:ce:8f:5b:a7fe',
        'abc',
        '01:02:03:04:05',
        '01:02:03:04::ab',
        '1:2:3:4:5:6',
        'AB:CD:EF:GH:01:02'
    ],

    notFQDN: [
        undefined,
        null,
        true,
        '',
        'invalid',
        '$xample.com',
        'domain_name.com',
        'abc',
        '256.0.0.0',
        '_.com',
        '*.some.com',
        's!ome.com',
        'domain.com/',
        '/more.com',
        'e4:ce:8f:5b:a7fe',
        'notvalid.com.',
        '.notvalid.com',
        '-notvalid.com',
        'notvalid.com-',
        '598e882b9f56330b32b4932513e1f491050b94b2de8d5983a3beee2a62100dfa41593d9b045f2bahjb005d69d493907dd0bac44963f87bca570fc03e5e40b49629c2',
        'invalid.helloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworldhelloworld'
    ],

    FQDN: [
        'some-example.construction',
        'example.co.uk',
        'example.aerodrome.aero',
        'g.co',
        'test--dashes-to.com',
        'example.blackfriday',
        'test-name.co.uk',
        'a.domain',
        'www.domain.com',
        'www.goggle.co.uk',
        'www.google.com',
        'a.test.co',
        'test.com',
        'example.test.net',
        'domain.com',
        'dom.plato',
        'a.domain.co',
        'foo--bar.com',
        'xn--froschgrn-x9a.com',
        'rebecca.blackfriday'
    ],

    int8: [
        -128,
        -56,
        0,
        54,
        127
    ],

    notInt8: [
        'some-example.construction',
        null,
        undefined,
        {},
        null,
        NaN,
        1.234,
        Infinity,
        -129,
        128
    ],

    uInt8: [
        0,
        255,
        103,
        10.00,
        34,
        11,
        67
    ],

    notUint8: [
        'some-example.construction',
        NaN,
        Infinity,
        -10,
        45.678,
        256,
        null,
        undefined,
        {},
        []
    ],


    int16: [
        0,
        255,
        103,
        10.00,
        34,
        11,
        67,
        32767,
        -32768
    ],

    notInt16: [
        'some-example.construction',
        NaN,
        Infinity,
        -32769,
        32768,
        45.678,
        null,
        undefined,
        {},
        []
    ],

    uInt16: [
        0,
        255,
        103,
        10.00,
        34,
        11,
        67,
        32767,
        65535
    ],

    notUint16: [
        'some-example.construction',
        NaN,
        Infinity,
        -32769,
        100.23456,
        65536,
        null,
        undefined,
        {},
        []
    ],

    int32: [
        0,
        255,
        103,
        10.00,
        34,
        11,
        67,
        32767,
        -32768,
        -2147483648,
        2147483647
    ],

    notInt32: [
        'some-example.construction',
        NaN,
        Infinity,
        -2147483649,
        2147483648,
        2147483647.34567,
        null,
        undefined,
        {},
        []
    ],

    uInt32: [
        0,
        255,
        103,
        10.00,
        34,
        11,
        67,
        32767,
        65535,
        4294967295
    ],

    notUint32: [
        'some-example.construction',
        NaN,
        103.56,
        Infinity,
        -32769,
        4294967296,
        null,
        undefined,
        {},
        []
    ],

    ascii: [
        'a ascii string',
        '@^&**((%$))'
    ],

    notAscii: [
        '‽‽‽',
        'This contains an invalid character \u0100',
        null
    ]


};
