$(document).ready(function() {
  var currentPos;
  var locationAllowed = false;

  var drawMarker = function(map, pin){
    var latlng = {lat: pin.place.lat, lng: pin.place.long};
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: pin.place.name
    });

    marker.addListener('click', function(){
      $('[data-name="'+pin.place.name+'"]')[0].click(function () {
      });
    });
  };

  var categoryAccordion = function(number) {
    return '<div class="panel panel-default">'+
      '<div class="panel-heading" role="tab" id="heading'+number+'">'+
        '<h4 class="panel-title">'+
          '<a class="catName"role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+number+'" aria-expanded="true" aria-controls="collapse'+number+'">'+
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
        var R = 6371;
        var dLat = deg2rad(lat2-lat1);
        var dLon = deg2rad(lon2-lon1);
        var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        return d;
      }
      function deg2rad(deg) {
        return deg * (Math.PI/180);
      }
      var userlat = currentPos.coords.latitude;
      var userlong = currentPos.coords.longitude;
      var distance = getDistance(userlat, userlong, parseFloat(lat), parseFloat(long));
      return (distance).toFixed(1);
    };

    var distanceHTML = '';
    if (locationAllowed) {
      distanceHTML =  '' +
                      '<div class="col-xs-11 place-travel-info">' +
                         '<p class="mv-distance">'+ calculateDistance(pin.place.lat, pin.place.long) +" km away"+'</p>'+
                      '</div>';
    }

    var placeHTML = '<div class="row place-row">'+
                      '<div class="col-xs-12 mv-place-name">'+
                        '<h4 class="mv-place-name-data"' +
                          'data-lat="'+     pin.place.lat     +'"' +
                          'data-long="'+    pin.place.long    +'"' +
                          'data-name="'+    pin.place.name    +'"' +
                          'data-address="'+ pin.place.address +'"' +
                          'data-phone="'+   pin.place.phone   +'"' +
                          'data-website="'+   pin.place.website +'">' +
                          pin.place.name +'</h4>'+
                      '</div>'+
                      '<div class="col-xs-12 mv-place-description">'+
                        '<p class="pin-description">'+ pin.description +'</p>' +
                      '</div>'+
                      '<div class="col-xs-12 edit-pin-info">' +
                        ''+ distanceHTML +'' +
                      '</div>' +
                    '</div>';

    $('.panel-body').last().append(placeHTML);
    showPinModal();
  };

  var refreshPinModal = function () {
    $('#place-modal').on('show.bs.modal', function (e) {
      console.log("test");
      google.maps.event.trigger(map, 'resize');
    });
  };

  var showPinModal = function () {
    $('.mv-place-name-data').on('click', function (e) {
      e.preventDefault();
      var $pin  = $(this);
      var place = {
        lat    : $pin.data('lat'),
        long   : $pin.data('long'),
        name   : $pin.data('name'),
        address: $pin.data('address'),
        phone  : $pin.data('phone'),
        website: $pin.data('website')
      };

      var $modal = $('#place-modal');

      $modal.on('shown.bs.modal', function(e) {
        // add map to modal
        var map = new google.maps.Map(document.getElementById('place-modal-map'), {
          center: {lat: place.lat, lng: place.long},
          scrollwheel: false,
          zoom: 15
        });

        // place marker on map
        var marker = new google.maps.Marker({
          position: {lat: place.lat, lng: place.long},
          map: map,
          title: place.name
        });

        google.maps.event.trigger(map, 'resize');
        map.setCenter(new google.maps.LatLng(place.lat, place.long));
      });

      // add data to modal
      $('#place-modal-name').text(place.name);
      $('#place-modal-address').text(place.address);
      $('#place-modal-phone').text(place.phone);
      $('#place-modal-website').text(place.website);

      $modal.modal('show');
    });
  };

  var saveEdits = function(input, pin_id){
    $.ajax({
      url:"/api/pins/" + pin_id,
      data: {input: input},
      method: "PUT",
      success: function(response, status) {
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };

  var allowEditing = function(pin){
    var editButton =
    '<div class="col-xs-1 edit-pin-buttons">' +
      '<button type="button" class="btn btn-default btn-sm show pin-edit">' +
        '<span class="glyphicon glyphicon-edit show pin-edit" aria-hidden="true"></span></button>' +
      '<button type="button" data="' + pin.id + '" class="btn btn-default btn-sm hidden pin-save">Save</button>' +
    '</div>';
    $('.edit-pin-info').last().append(editButton);
  };

  var renderMapList = function(obj){
    var user_id = obj.user_id;
    var keyArray = Object.keys(obj.grouped_pins);

    var map = new google.maps.Map(document.getElementById('googlemap'), {
      center: {lat: 22.2783, lng: 114.1747},
      scrollwheel: false,
      zoom: 12
    });

    $.auth.validateToken().then(function(user){
      // if logged and owner of pins, show pins and edit button
      keyArray.forEach(function(cat, i){
        $('#accordion').append(categoryAccordion(i+1));
        $('.catName').last().html(cat);
        obj.grouped_pins[cat].forEach(function(pin){
          placeList(pin);
          drawMarker(map, pin);

           if (user_id == user.id) {
             allowEditing(pin);
             bindPinEditButton();
             bindPinSaveButton();
           };
        });
      });
    }).fail(function (resp) {
      // if not logged in, show pins
      keyArray.forEach(function(cat, i){
        $('#accordion').append(categoryAccordion(i+1));
        $('.catName').last().html(cat);
        obj.grouped_pins[cat].forEach(function(pin){
          placeList(pin);
          drawMarker(map, pin);
        });
      });
    });
  };

  var bindPinEditButton = function(){
    $('.btn.pin-edit').off().on('click', function(e){
      var desc = $(this).parent().parent().parent().find('.pin-description').text();
      $(this).parent().parent().parent().find('.pin-description').html(inputBox(desc));
      $(this).addClass('hidden');
      $(this).parent().find('.pin-save').removeClass('hidden');
    });

    var inputBox = function(description) {
      console.log('working?')
      return '<input type="text" class="form-control pin-edit" value="'+description+'">';
    };
  };

  var bindPinSaveButton = function(){

    $('.btn.pin-save').off().on('click', function(e){
      var input = $(this).parent().parent().parent().find('.form-control.pin-edit').val();
      $(this).parent().parent().parent().find('.pin-description').html(input);
      $(this).addClass('hidden');
      $(this).parent().find('.btn.pin-edit').removeClass('hidden');
      var pin_id = $(this).attr('data');
      saveEdits(input, pin_id);
    });
  };

  var renderMapSummary = function(obj){
    $('#mv-title').text(obj.title);
    $('#mv-description').text(obj.description);
    $('#mv-creator-name').text('by '+obj.user.name);
    $('#number-of-likes').text(obj.likes.length);
    obj.tags.forEach(function(tag){
      $('#mv-tags').append(' #'+tag);
    });
  };

  var getMapInfo = function(map_id) {
    $.ajax({
      url:"/api/maps/" + map_id,
      method: "GET",
      success: function(response, status) {
        renderMapSummary (response);
        renderMapList (response);
      },
      error: function (response, status) {
      }
    });
  };

  var init = function () {
    // refreshPinModal();
    var splitPath = location.pathname.split('/');
    if (splitPath[1] === 'maps' && parseInt(splitPath[2]) !== isNaN && !splitPath[3]) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos){
          locationAllowed = true;
          currentPos = pos;
          getMapInfo(splitPath[2]);
        });
      } else {
        getMapInfo(splitPath[2]);
      }
    }
  };

  init();
});