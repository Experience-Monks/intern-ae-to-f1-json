const EASE_TYPE = {
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

  if(prop.isSpatial) {
    rVal.easeIn.spatialTangent = getSpatialTangentIn(prop, idxKeyFrame);
    rVal.easeOut.spatialTangent = getSpatialTangentOut(prop, idxKeyFrame);
  }

  return rVal;
};

// get ease type
function getEaseType(type){
  switch(type) {
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
  var rVal = prop[ func ](idxKeyFrame)
  .map(function(easeInfo) {
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
  if(prop.isSpatial) {
    return prop[ func ](idxKeyFrame);
  } else {
    throw new Error('this function should not be called if prop.isSpatial is false');
  }
}