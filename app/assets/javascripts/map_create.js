$(document).ready(function() {

  var newPlace = '<div class="pin-entry">'+
      '<div class="col-xs-8 place-name-div form-group">'+
        '<input type="input" class="form-control place-name-field" placeholder="Place name">'+
      '</div>'+
      '<button class="btn btn-warning delete-entry" type="submit">Trash this</button>'+
      '<div class="form-group">'+
        '<textarea class="form-control" placeholder="Description" rows="2"></textarea>'+
      '</div>'+
    '</div>';

  var autocompletePlaceField = function() {
    var lastInput = $('.place-name-field').last();
    var autocomplete = new google.maps.places.Autocomplete(lastInput[0]);
    google.maps.event.addDomListener(window, 'load', autocomplete);
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
      var place = autocomplete.getPlace();
      lastInput.data('pindata', {
        getID: place.place_id,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng()
      });
      console.log(lastInput.data());
    });
  };

  var appendNewPlace = function(){
    $('#all-entries').append(newPlace);
    autocompletePlaceField();
    bindDeleteEntryButton();
  };

  var bindDeleteEntryButton = function() {
    $('.btn-warning.delete-entry').off().on('click', function(e){
      e.preventDefault();
      $(this).parent().remove();
    });
  };

  var bindAddPlaceButton = function() {
    $('.add-new-place').on('click', function(e){
      e.preventDefault();
      appendNewPlace();
    });
  };

  var postPlaceInfo = function(placeInfo) {
    $.ajax({
      type: 'POST',
      url: '/api/pins',
      data: placeInfo,
      error: function (response, status) {
        console.log ('there was an error in posting place information.');
        console.log (response);
      },
      success: function (response, status) {
        console.log ('success posting');
        console.log (response);
      }
    });
  };

  var bindYesButton = function() {
    $('.btn-success').on('click', function(e){
      e.preventDefault();
      yesToCategories();
    });
  };

  var yesToCategories = function() {
    $('#categoryOption').hide();

  };

  var bindNoButton = function() {
    $('.btn-danger').on('click', function(e){
      e.preventDefault();
      noToCategories();
    });
  };

  var noToCategories = function() {
    $('#categoryOption').hide();
    $('.add-new-place').show();
    appendNewPlace();
  };

  var init = function() {
    bindYesButton();
    bindNoButton();
    $('.add-new-place').hide();
    bindAddPlaceButton();
  };

  init();

});