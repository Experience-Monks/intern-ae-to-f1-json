var merge = require('xtend');
//var getNonObjectValues = require('./util/getNonObjectValues');
var getProjectValues = require('./util/getProjectValues');
var getItemValues = require('./util/getItemValues');
//var getItems = require('./getItems');


module.exports = function getProject() {
  const IGNORE_PROPS = [
    'file',
    'xmpPacket'
  ];

  var rVal = merge(
    {},
    getProjectValues(app.project, IGNORE_PROPS)
  );

  return rVal;
};