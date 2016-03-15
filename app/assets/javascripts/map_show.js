$(document).ready(function() {

  var getMapInfo = function() {

  }

  var init = function () {
    var splitPath = location.pathname.split('/');
    if (splitPath[1] === 'maps' && parseInt(splitPath[2]) !== isNaN && !splitPath[3]) {
      getMapInfo();
    }
  };

  init();
});