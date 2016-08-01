module.exports = function() {
var window = {};
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.aeToJSON = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var merge = require('xtend');
var getNonObjectValues = require('./util/getNonObjectValues');
var getProject = require('./getProject');

module.exports = function () {
  var rVal = merge({}, getNonObjectValues(app), {
    project: getProject()
  });

  return rVal;
};
},{"./getProject":2,"./util/getNonObjectValues":10,"xtend":5}],2:[function(require,module,exports){
'use strict';

var merge = require('xtend');
//var getNonObjectValues = require('./util/getNonObjectValues');
var getProjectValues = require('./util/getProjectValues');
var getItemValues = require('./util/getItemValues');
//var getItems = require('./getItems');

module.exports = function getProject() {
  var IGNORE_PROPS = ['file', 'xmpPacket'];

  var rVal = merge({}, getProjectValues(app.project, IGNORE_PROPS));

  return rVal;
};
},{"./util/getItemValues":8,"./util/getProjectValues":11,"xtend":5}],3:[function(require,module,exports){
'use strict';

var getApp = require('./getApp');

module.exports = function () {
  return getApp();
};
},{"./getApp":1}],4:[function(require,module,exports){
'use strict';

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) {/**/}

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0],
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[name] = extend(deep, clone, copy);

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						target[name] = copy;
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


},{}],5:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],6:[function(require,module,exports){
"use strict";

module.exports = function (collection) {
  var rVal = [];

  for (var i = collection.length; i >= 1; i--) {
    rVal.push(collection[i]);
  }

  return rVal;
};
},{}],7:[function(require,module,exports){
'use strict';

var EASE_TYPE = {
  BEZIER: 'bezier',
  LINEAR: 'linear',
  HOLD: 'hold'
};

// get the key ease info for the key frame
module.exports = function getEaseForKeyFrame(prop, idxKeyFrame) {
  var rVal = {
    easeIn: {
      type: getEaseType(prop.keyInInterpolationType(idxKeyFrame)),
      temporalEase: getTemporalEaseIn(prop, idxKeyFrame)
    },

    easeOut: {
      type: getEaseType(prop.keyOutInterpolationType(idxKeyFrame)),
      temporalEase: getTemporalEaseOut(prop, idxKeyFrame)
    }
  };

  if (prop.isSpatial) {
    rVal.easeIn.spatialTangent = getSpatialTangentIn(prop, idxKeyFrame);
    rVal.easeOut.spatialTangent = getSpatialTangentOut(prop, idxKeyFrame);
  }

  return rVal;
};

// get ease type
function getEaseType(type) {
  switch (type) {
    case KeyframeInterpolationType.BEZIER:
      return EASE_TYPE.BEZIER;
      break;

    case KeyframeInterpolationType.LINEAR:
      return EASE_TYPE.LINEAR;
      break;

    case KeyframeInterpolationType.HOLD:
      return EASE_TYPE.HOLD;
      break;

    default:
      throw new Error('unknown ease type');
      break;
  }
}

// gets temporal ease in
function getTemporalEaseIn(prop, idxKeyFrame) {
  return getTemporalEase('keyInTemporalEase', prop, idxKeyFrame);
}

// gets temporal ease out
function getTemporalEaseOut(prop, idxKeyFrame) {
  return getTemporalEase('keyOutTemporalEase', prop, idxKeyFrame);
}

function getTemporalEase(func, prop, idxKeyFrame) {
  var type = prop.propertyValueType;
  var rVal = prop[func](idxKeyFrame).map(function (easeInfo) {
    return {
      speed: easeInfo.speed,
      influence: easeInfo.influence
    };
  });

  return rVal;
}

// get in spatial tangent
function getSpatialTangentIn(prop, idxKeyFrame) {
  return getSpatialTangent('keyInSpatialTangent', prop, idxKeyFrame);
}

// get out spatial tangent
function getSpatialTangentOut(prop, idxKeyFrame) {
  return getSpatialTangent('keyOutSpatialTangent', prop, idxKeyFrame);
}

function getSpatialTangent(func, prop, idxKeyFrame) {
  if (prop.isSpatial) {
    return prop[func](idxKeyFrame);
  } else {
    throw new Error('this function should not be called if prop.isSpatial is false');
  }
}
},{}],8:[function(require,module,exports){
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
},{"./parseComposition":16,"./parseFolder":17,"./parseFootage":18,"extend":4}],9:[function(require,module,exports){
'use strict';

var getEaseForKeyFrame = require('./getEaseForKeyFrame');

// this function will export keyframes for a property
module.exports = function getKeyFramesForProp(prop) {
  var rVal = [];

  // some properties don't have a value set on them
  if (prop.propertyValueType !== PropertyValueType.NO_VALUE) {
    // we have keyframes add all keyframes
    if (prop.numKeys > 0) {
      // Position needs to be an expression to track curved motion
      if (prop.name === 'Position' && prop.numKeys > 2) {
        convertToExpression(prop);
      }

      for (var i = 1; i <= prop.numKeys; i++) {
        rVal.push([prop.keyTime(i), prop.keyValue(i), getEaseForKeyFrame(prop, i)]);
      }
      // we do not have keyframes just add the first
    } else {

      // some properties don't have this
      if (prop.valueAtTime) {
        rVal.push([0, prop.valueAtTime(0, false)]);
      }
    }
  }

  return rVal;

  function convertToExpression(prop) {
    prop.selected = true;
    app.executeCommand(2702);
    app.executeCommand(2639);
  }
};
},{"./getEaseForKeyFrame":7}],10:[function(require,module,exports){
"use strict";

module.exports = function (item, ignore) {
  var rVal = {};
  var type;

  for (var i in item) {
    if (!ignore || ignore.indexOf(i) === -1) {
      // for some properties even if you try to access
      // them an error will be thrown for instance an error like
      // [Error: After Effects error: Unable to access lightType because layer is not a LightLayer.]
      // coulr be thrown
      try {
        if (item[i]) {
          // for some reason typeof was failing in ae so using this
          // method instead
          type = getTypeOf(item[i]);

          if (type === Array) {
            type = getTypeOf(item[i][0]);

            // null is number or string or boolean
            if (type === null) {
              rVal[i] = item[i].slice();
            }
            // the type is a number string or boolean
          } else if (type !== Object && type !== Function) {
            rVal[i] = item[i];
          }
        } else if (item[i] === null) {

          rVal[i] = item[i];
        }
      } catch (e) {}
    }
  }

  return rVal;
};
},{}],11:[function(require,module,exports){
'use strict';

var getItemValues = require('./getItemValues');
var collectionToArray = require('./collectionToArray');

module.exports = function (item, ignore) {

  var rVal = {
    items: getItemValues(collectionToArray(item.items))
  };

  return rVal;
};
},{"./collectionToArray":6,"./getItemValues":8}],12:[function(require,module,exports){
'use strict';

var merge = require('xtend');

var getKeyframesForProp = require('./getKeyframesForProp');
var getNonObjectValues = require('./getNonObjectValues');
var getPropertyValueType = require('./getPropertyValueType');

// this function will export all properties for a layer
module.exports = function getProperties(layer, extract) {

  // PropertyGroup

  var properties = {};

  var getProperties = function getProperties(layer, target, parent) {
    getPropertyGroupArray(layer, extract, parent).reduce(function (target, property) {
      try {
        var currentTarget = {};
        var baseValues;

        if (property.propertyValueType !== PropertyValueType.CUSTOM_VALUE) {
          baseValues = getNonObjectValues(property);

          //// now we want to check if this property is actually a
          //// property group
          if (property instanceof PropertyGroup) {
            getProperties(property, currentTarget, false);
          }

          currentTarget = merge(currentTarget, baseValues, {
            keyframes: getKeyframesForProp(property),
            propertyValueType: getPropertyValueType(property.propertyValueType)
          });
        }
        // we want to remove name as it will be the objects variable name
        // delete currentTarget.name;
        target[property.name] = currentTarget;
      } catch (e) {
        target[property.name] = {
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
  if (parent) {
    extract.forEach(function (item) {
      if (layer.property(item)) rVal.push(layer.property(item));
    });
  } else {
    for (var i = 1; i <= layer.numProperties; i++) {
      rVal.push(layer.property(i));
    }
  }

  return rVal;
}
},{"./getKeyframesForProp":9,"./getNonObjectValues":10,"./getPropertyValueType":13,"xtend":5}],13:[function(require,module,exports){
'use strict';

module.exports = function getPropertyValueType(type) {
  switch (type) {
    case PropertyValueType.NO_VALUE:
      return 'NO_VALUE';

    case PropertyValueType.ThreeD_SPATIAL:
      return 'ThreeD_SPATIAL';

    case PropertyValueType.ThreeD:
      return 'ThreeD';

    case PropertyValueType.TwoD_SPATIAL:
      return 'TwoD_SPATIAL';

    case PropertyValueType.TwoD:
      return 'TwoD';

    case PropertyValueType.OneD:
      return 'OneD';

    case PropertyValueType.COLOR:
      return 'COLOR';

    case PropertyValueType.CUSTOM_VALUE:
      return 'CUSTOM_VALUE';

    case PropertyValueType.MARKER:
      return 'MARKER';

    case PropertyValueType.LAYER_INDEX:
      return 'LAYER_INDEX';

    case PropertyValueType.MASK_INDEX:
      return 'MASK_INDEX';

    case PropertyValueType.SHAPE:
      return 'SHAPE';

    case PropertyValueType.TEXT_DOCUMENT:
      return 'TEXT_DOCUMENT';

    default:
      return 'UNKNOWN';
  }
};
},{}],14:[function(require,module,exports){
"use strict";

// for some reason typeof is breaking in AE
function getTypeOf(item) {
  var type = null;

  if (item) {
    var strValue = item.toString();
    var isObject = /\[object/.test(strValue);
    var isFunction = /function/.test(strValue);
    var isArray = Array.isArray(item);

    if (isArray) {
      type = Array;
    } else if (isFunction) {
      type = Function;
    } else if (isObject) {
      type = Object;
    } else {
      type = null;
    }
  } else {
    type = null;
  }

  return type;
}
},{}],15:[function(require,module,exports){
'use strict';

var LEFT_JUSTIFY = 7213;
var RIGHT_JUSTIFY = 7214;
var CENTER_JUSTIFY = 7215;
var FULL_JUSTIFY_LASTLINE_LEFT = 7216;
var FULL_JUSTIFY_LASTLINE_RIGHT = 7217;
var FULL_JUSTIFY_LASTLINE_CENTER = 7218;
var FULL_JUSTIFY_LASTLINE_FULL = 7219;

module.exports = function (code) {
  switch (code) {
    case LEFT_JUSTIFY:
      return 'left';
    case RIGHT_JUSTIFY:
      return 'right';
    case CENTER_JUSTIFY:
      return 'center';
    case FULL_JUSTIFY_LASTLINE_LEFT:
      return 'justify';
    case FULL_JUSTIFY_LASTLINE_RIGHT:
      return 'justify';
    case FULL_JUSTIFY_LASTLINE_CENTER:
      return 'justify';
    case FULL_JUSTIFY_LASTLINE_FULL:
      return 'justify';
  }
};
},{}],16:[function(require,module,exports){
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
},{"./collectionToArray":6,"./getTypeOf":14,"./parseLayers":19,"extend":4}],17:[function(require,module,exports){
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
},{"./collectionToArray":6,"./getItemValues":8,"./getTypeOf":14,"extend":4}],18:[function(require,module,exports){
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
},{"./collectionToArray":6,"./getNonObjectValues":10,"./getTypeOf":14,"./parseLayers":19,"extend":4}],19:[function(require,module,exports){
'use strict';

var extend = require('extend');
var getTypeOf = require('./getTypeOf');
var extend = require('extend');
var getProperties = require('./getProperties');
var justifyCodeToString = require('./justifyCodeToString');

module.exports = function (item) {
    var rVal = [];

    item.forEach(function (layer) {
        var animationData = ['Transform', 'Time Remap'];
        var fontExtract = ['font', 'fontSize', 'fillColor', 'text', 'justification'];
        var props = getProperties(layer, animationData);
        var layerSource;
        var font = {};
        if (layer.source) {
            layerSource = layer.source.file && layer.source.file.toString();
        }
        if (layer.matchName === 'ADBE Text Layer') {
            var textDoc = layer.property('Source Text').value;
            fontExtract.forEach(function (e) {
                if (textDoc[e] && e === 'justification') {
                    font[e] = justifyCodeToString(textDoc[e]);
                } else if (textDoc[e]) font[e] = textDoc[e];
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
},{"./getProperties":12,"./getTypeOf":14,"./justifyCodeToString":15,"extend":4}]},{},[3])(3)
});
return window.aeToJSON.apply(undefined, arguments);
};
