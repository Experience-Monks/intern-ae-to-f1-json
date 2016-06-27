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