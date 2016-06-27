"use strict";

module.exports = function (collection) {
  var rVal = [];

  for (var i = collection.length; i >= 1; i--) {
    rVal.push(collection[i]);
  }

  return rVal;
};