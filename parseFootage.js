'use strict';

var extend = require('extend');
var getTypeOf = require('./getTypeOf');
var parseLayers = require('./parseLayers');
var getNonObjectValues = require('./getNonObjectValues');
var collectionToArray = require('./collectionToArray');
var extend = require('extend');

module.exports = function (item) {
    var rVal = extend({}, {
        duration: item.duration,
        frameDuration: item.frameDuration,
        frameRate: item.frameRate,
        hasVideo: item.hasVideo,
        height: item.height,
        width: item.width,
        name: item.name,
        time: item.time,
        typeName: item.typeName,
        mainSource: {
            file: item.mainSource.file && item.mainSource.file.toString()
        }
    });

    return rVal;
};