'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const Path = require('path');
const Utils = require('../lib/index.js');

// Fixtures


// Set-up lab
const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('File', () => {

    const directory = process.cwd();
    const file = Path.resolve(directory, 'package.json');

    it('should expose mkDirSync method', () => {

        expect(Utils.mkDirSync).to.be.a.function();
    });


    it('should expose mkDir method', () => {

        expect(Utils.mkDir).to.be.a.function();
    });


    it('should expose rmDirSync method', () => {

        expect(Utils.rmDirSync).to.be.a.function();
    });


    it('should expose rmDir method', () => {

        expect(Utils.rmDir).to.be.a.function();
    });

    it('should test fileExists method', () => {

        expect(Utils.isFile(directory)).to.be.false();
        expect(Utils.isFile()).to.be.false();
        expect(Utils.isFile(file)).to.be.true();
    });

    it('should test dirExists method', () => {


        expect(Utils.isDir()).to.be.false();
        expect(Utils.isDir(file)).to.be.false();
        expect(Utils.isDir(directory)).to.be.true();
    });


});
