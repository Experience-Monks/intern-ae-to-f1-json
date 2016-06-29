module.exports = function getPropertyValueType(type) {
  switch(type) {
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