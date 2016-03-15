$(document).ready(function() {

  var getMapInfo = function(map_id) {
    $.ajax({
      url:"/api/maps/" + map_id,
      method: "GET",
      success: function(info, status) {
        console.log (info);

        populateMapInfo(info);
        populateList();
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };

  var init = function () {
    var splitPath = location.pathname.split('/');
    if (splitPath[1] === 'maps' && parseInt(splitPath[2]) !== isNaN && !splitPath[3]) {
      getMapInfo(splitPath[2]);
    }
  };

  init();
});