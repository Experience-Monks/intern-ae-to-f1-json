var merge = require('xtend');

var getKeyframesForProp = require('./getKeyframesForProp');
var getNonObjectValues = require('./getNonObjectValues');
var getPropertyValueType = require('./getPropertyValueType');

// this function will export all properties for a layer
module.exports = function getProperties(layer, extract) {

  // PropertyGroup

  var properties = {};

  var getProperties = function(layer, target, parent) {
    getPropertyGroupArray(layer, extract, parent)
    .reduce(function(target, property) {
      try {
        var currentTarget =  {};
        var baseValues;

        if(property.propertyValueType !== PropertyValueType.CUSTOM_VALUE) {
          baseValues = getNonObjectValues(property);

          //// now we want to check if this property is actually a 
          //// property group
          if(property instanceof PropertyGroup) {
            getProperties(property, currentTarget, false);
          }

          currentTarget = merge(
            currentTarget,
            baseValues,
            {
              keyframes: getKeyframesForProp(property),
              propertyValueType: getPropertyValueType(property.propertyValueType)
            }
          );
        } 
        // we want to remove name as it will be the objects variable name
        // delete currentTarget.name;
        target[ property.name ] = currentTarget;
      } catch(e) {
        target[ property.name ] = {
          exportError: true,
          message: e.message
        };
      }

      return target;
    }, target);
  };

  getProperties(layer, properties, true);

  return properties;
};

function getPropertyGroupArray(layer, extract, parent) {
  var rVal = [];
  if(parent) {
    extract.forEach(function(item) {
      if(layer.property(item)) rVal.push(layer.property(item));
    });  
  }
  else {
    for(var i = 1; i <= layer.numProperties; i++) {
      rVal.push(layer.property(i));
    }
  }
  
  
  return rVal;
}