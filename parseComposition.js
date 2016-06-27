'use strict';

var extend = require('extend');
var getTypeOf = require('./getTypeOf');
var parseLayers = require('./parseLayers');
var collectionToArray = require('./collectionToArray');
var extend = require('extend');

module.exports = function (item) {
    var rVal = extend({}, {
        duration: item.duration,
        frameDuration: item.frameDuration,
        hasVideo: item.hasVideo,
        height: item.height,
        width: item.width,
        name: item.name,
        time: item.time,
        typeName: item.typeName,
        layers: parseLayers(collectionToArray(item.layers))
    });

    return rVal;
};