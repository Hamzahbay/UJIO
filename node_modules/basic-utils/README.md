# basic-utils

[![Greenkeeper badge](https://badges.greenkeeper.io/simon-p-r/basic-utils.svg)](https://greenkeeper.io/)

[![Current Version](https://img.shields.io/npm/v/basic-utils.svg?maxAge=1000)](https://www.npmjs.org/package/basic-utils)
[![dependency Status](https://img.shields.io/david/simon-p-r/basic-utils.svg?maxAge=1000)](https://david-dm.org/simon-p-r/basic-utils)
[![devDependency Status](https://img.shields.io/david/dev/simon-p-r/basic-utils.svg?maxAge=1000)](https://david-dm.org/simon-p-r/basic-utils?type=dev)
[![Build Status](https://travis-ci.org/simon-p-r/basic-utils.svg?branch=master)](https://travis-ci.org/simon-p-r/basic-utils)
[![Windows Build Status](https://img.shields.io/appveyor/ci/simon-p-r/basic-utils/master.svg?label=windows&style=flat-square&maxAge=2592000)](https://ci.appveyor.com/project/simon-p-r/basic-utils)
[![Coveralls](https://img.shields.io/coveralls/simon-p-r/basic-utils.svg?maxAge=1000)](https://coveralls.io/github/simon-p-r/basic-utils)

Basic JS utils module

### API

#### Type checking returns boolean

 - isObj
 - isString
 - isArray
 - isDate
 - isRegex
 - isFunction
 - isNumber
 - isNan
 - isUndefined
 - isNull
 - isObjectID
 - isIp
 - isIp4
 - isIp6
 - isMac
 - isFQDN
 - isInt8
 - isUint8
 - isInt16
 - isUint16
 - isInt32
 - isUnint32
 - isAscii
 - isError
 - isRegexString
 - isDateString
 - isAlpha
 - isNumeric
 - isAlphaNumeric


#### Utils

###### iterateObj

   - prints object key pairs with a tilde delimiter

###### format

   - formats a string

###### deepFreeze

   - returns a recursive frozen object

###### serialize

  - Returns either an error object or a json serialized string

###### deserialize

  - Returns either an error object or a js object deserialized from a json string

###### omit

  - Returns a filtered obj based on one or more keys to omit

###### clone

  - Returns a clone object, only functions remain copied by reference

###### merge

  - Returns a merged object from source and target, source object is destructively merged

###### applyToDefaults

  - Returns a merged object from source and target, source object is non-destructively merged

#### FileSystem

###### isDir

  - Returns boolean if directory exists

###### isFile

  - Returns boolean if file exists

###### rmDirSync

 - recursively deletes a directory sync

###### rmDir

 - recursively deletes a directory async

###### mkDirSync

 - recursively makes directory sync

###### mkDir
 - recursively makes directory async


##### Todo

 - improve docs
 - add more tests
