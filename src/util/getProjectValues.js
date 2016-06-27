var getItemValues = require('./getItemValues');
var collectionToArray = require('./collectionToArray');

module.exports = function(item, ignore) {
  
  var rVal = {
    items: getItemValues(collectionToArray(item.items))
  };

  return rVal;
};
