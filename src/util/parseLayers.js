var extend = require('extend');
var getTypeOf = require('./getTypeOf');
var extend = require('extend');
var getProperties = require('./getProperties');

module.exports = function(item) {
    var rVal = [];
    
    item.forEach(function(layer) {
        var animationData = [
            'Transform', 
            'Time Remap'
        ];
        var fontExtract = ['font', 'fontSize', 'fillColor', 'text', 'justification'];
        var props = getProperties(layer, animationData)
        var layerSource;
        var font = {}
        if(layer.source) {
          layerSource = layer.source.file && layer.source.file.toString();
        }
        if(layer.matchName === 'ADBE Text Layer') {
            var textDoc = layer.property('Source Text').value;
            fontExtract.forEach(function (e) {
                if(textDoc[e]) font[e] = textDoc[e];
            });
        }
        rVal.push({
            hasVideo: layer.hasVideo,
            height: layer.height,
            width: layer.width,
            name: layer.name,
            nullLayer: layer.nullLayer,
            source: layerSource,
            time: layer.time,
            font: font,
            properties: props
        });
    });
    
  return rVal;
};
