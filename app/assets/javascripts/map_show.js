$(document).ready(function() {

  var getCurrentLocation = function() {

  }

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

    var calculateDistance = function (lat, long){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
          var userlat = pos.coords.latitude;
          var userlong = pos.coords.longitude;
        });

        setTimeout(function(){
          ;
        }, 7000);
      } else {
        ;
      }

      return distance;
    };

    var placeHTML = '<div class="row place-row">'+
                      '<div class="col-xs-4" id="mv-place-name">'+
                        '<h3>'+ pin.place.name +'</h3>'+
                      '</div>'+
                      '<div class="col-xs-8" id="mv-place-description">'+
                        '<p>'+ pin.description +'</p>'+
                        '<div id="place-travel-info">'+
                          '<p id="mv-distance">'+ calculateDistance(pin.place.lat, pin.place.long) +'</p>'+
                        '</div>'+
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
      obj.grouped_pins[cat].forEach(function(pin, index){
        placeList(pin, i)
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
        console.log(response);
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
      getCurrentLocation();
      getMapInfo(splitPath[2]);
    }
  };

  init();
});