module.exports = function(item, ignore) {
  var rVal = {};
  var type;

  for(var i in item) {
    if(!ignore || ignore.indexOf(i) === -1) {
      // for some properties even if you try to access
      // them an error will be thrown for instance an error like
      // [Error: After Effects error: Unable to access lightType because layer is not a LightLayer.]
      // coulr be thrown
      try {
        if(item[ i ]) {
          // for some reason typeof was failing in ae so using this
          // method instead
          type = getTypeOf(item[ i ]);

          if(type === Array) {
            type = getTypeOf(item[ i ][ 0 ]);

            // null is number or string or boolean
            if(type === null) {
              rVal[ i ] = item[ i ].slice();
            }
          // the type is a number string or boolean
          } else if(type !== Object && type !== Function) {
            rVal[ i ] = item[ i ];
          } 
        } else if(item[ i ] === null) {

          rVal[ i ] = item[ i ];
        }
      } catch(e) {}
    }
  }

  return rVal;
};
