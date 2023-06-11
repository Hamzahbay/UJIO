'use strict';

const Fs = require('fs');
const MkDir = require('mkdirp');
const RmDir = require('rimraf');

module.exports = {
    mkDirSync: MkDir.sync,
    mkDir: MkDir,
    rmDirSync: RmDir.sync,
    rmDir: RmDir,
    isFile: (file) => {

        try {
            return Fs.statSync(file).isFile();
        }
        catch (e) {
            return false;
        }
    },
    isDir: (p) => {

        try {
            return Fs.statSync(p).isDirectory();
        }
        catch (e) {
            return false;
        }
    }
};

