$(document).ready(function() {
  var currentPos;
  var locationAllowed = false;

  var categoryAccordion = function(number) {
    return '<div class="panel panel-default">'+
      '<div class="panel-heading" role="tab" id="heading'+number+'">'+
        '<h4 class="panel-title">'+
          '<a class="catName"role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+number+'" aria-expanded="true" aria-controls="collapse'+number+'">'+
            'Collapsible Group Item #1'+
          '</a>'+
        '</h4>'+
      '</div>'+
      '<div id="collapse'+number+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+number+'">'+
        '<div class="panel-body">'+
        // PINS GO HERE
        '</div>'+
      '</div>'+
    '</div>';
  };

  var placeList = function(pin){
    var calculateDistance = function (lat, long) {
      function getDistance(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
      }
      function deg2rad(deg) {
        return deg * (Math.PI/180);
      }
      var userlat = currentPos.coords.latitude;
      var userlong = currentPos.coords.longitude;
      var distance = getDistance(userlat, userlong, parseFloat(lat), parseFloat(long));
      console.log(distance);
      return (distance).toFixed(1);
    };

    var distanceHTML = '';
    if (locationAllowed) {
      distanceHTML = '<div id="place-travel-info">' +
                       '<p id="mv-distance">'+ calculateDistance(pin.place.lat, pin.place.long) +" km away"+'</p>'+
                     '</div>';
    }

    var placeHTML = '<div class="row place-row">'+
                      '<div class="col-xs-4" id="mv-place-name">'+
                        '<h3>'+ pin.place.name +'</h3>'+
                      '</div>'+
                      '<div class="col-xs-8" id="mv-place-description">'+
                        '<p>'+ pin.description +'</p>'+
                        distanceHTML +
                      '</div>'+
                    '</div>';

    $('.panel-body').last().append(placeHTML);
  };

  var renderMapList = function(obj){
    var keyArray = Object.keys(obj.grouped_pins);
    console.log(keyArray);
    keyArray.forEach(function(cat, i){
      $('#accordion').append(categoryAccordion(i+1));
      $('.catName').last().html(cat);
      obj.grouped_pins[cat].forEach(function(pin){
        placeList(pin);
      });
    });

  };

  var renderMapSummary = function(obj){
    $('#mv-title').text(obj.title);
    $('#mv-description').text(obj.description);
    $('#mv-creator-name').text('by '+obj.user.name);
    $('#number-of-likes').text(obj.likes.length);
  };

  var drawMap = function(obj) {

  };

  var getMapInfo = function(map_id) {
    $.ajax({
      url:"/api/maps/" + map_id,
      method: "GET",
      success: function(response, status) {
        renderMapSummary (response);
        renderMapList (response);
        drawMap (response);
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };

  var init = function () {
    var splitPath = location.pathname.split('/');
    if (splitPath[1] === 'maps' && parseInt(splitPath[2]) !== isNaN && !splitPath[3]) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
          console.log("got location");
          locationAllowed = true;
          currentPos = pos;
          getMapInfo(splitPath[2]);
        });
      } else {
        console.log("not allowed");
        getMapInfo(splitPath[2]);
      }
    }
  };

  init();
});