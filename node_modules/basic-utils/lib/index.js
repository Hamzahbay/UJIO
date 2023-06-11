'use strict';


const internals = {
    File: require('./fs'),
    Objects: require('./utils'),
    Types: require('./types')

};


Object.keys(internals).forEach((comp) => {

    const functions = internals[comp];
    Object.keys(functions).forEach((func) => {

        const toExport = functions[func];
        module.exports[func] = toExport;

    });

});
