
// for some reason typeof is breaking in AE
function getTypeOf(item) {
  var type = null;

  if(item) {
    var strValue = item.toString();
    var isObject = /\[object/.test(strValue);
    var isFunction = /function/.test(strValue);
    var isArray = Array.isArray(item);

    if(isArray) {
      type = Array;
    } else if(isFunction) {
      type = Function;
    } else if(isObject) {
      type = Object;
    } else {
      type = null;
    }
  } else {
    type = null;
  }

  return type;
}