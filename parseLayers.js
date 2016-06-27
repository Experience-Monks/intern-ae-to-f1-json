'use strict';

var extend = require('extend');
var getTypeOf = require('./getTypeOf');
var extend = require('extend');
var getProperties = require('./getProperties');

module.exports = function (item) {
    var rVal = [];

    item.forEach(function (layer) {
        var animationData = ['Transform', 'Time Remap'];
        var props = getProperties(layer, animationData);
        var layerSource;
        if (layer.source) {
            layerSource = layer.source.file && layer.source.file.toString();
        }
        rVal.push({
            hasVideo: layer.hasVideo,
            height: layer.height,
            width: layer.width,
            name: layer.name,
            nullLayer: layer.nullLayer,
            source: layerSource,
            time: layer.time,
            properties: props
        });
    });

    return rVal;
};