const LEFT_JUSTIFY = 7213;
const RIGHT_JUSTIFY = 7214;
const CENTER_JUSTIFY = 7215;
const FULL_JUSTIFY_LASTLINE_LEFT = 7216;
const FULL_JUSTIFY_LASTLINE_RIGHT = 7217;
const FULL_JUSTIFY_LASTLINE_CENTER = 7218;
const FULL_JUSTIFY_LASTLINE_FULL = 7219;

module.exports = function(code) {
  switch(code) {
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
}