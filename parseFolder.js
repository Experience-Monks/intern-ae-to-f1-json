'use strict';

var extend = require('extend');
var getTypeOf = require('./getTypeOf');
var getItemValues = require('./getItemValues');
var collectionToArray = require('./collectionToArray');
var extend = require('extend');

module.exports = function (item) {
    var rVal = extend({}, {
        typeName: item.typeName,
        name: item.name,
        items: getItemValues(collectionToArray(item.items))
    });

    return rVal;
};