'use strict';

module.exports = function getItemValues(item) {
    var extend = require('extend');
    var parseComposition = require('./parseComposition');
    var parseFolder = require('./parseFolder');
    var parseFootage = require('./parseFootage');

    var getItemValues = function getItemValues(target) {
        var rVal = [];
        target.forEach(function (i) {
            if (i.typeName === 'Composition') {
                rVal.push(parseComposition(i));
            } else if (i.typeName === 'Folder') {
                rVal.push(parseFolder(i));
            } else if (i.typeName === 'Footage') {
                rVal.push(parseFootage(i));
            }
        });

        return rVal;
    };

    return getItemValues(item);
};