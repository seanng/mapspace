$(document).ready(function() {

  $.auth.validateToken().then(function(user){
    mapInfo.user_id = user.id;
  });

  var mapHasCategories = false;

  var newPlace = '<div class="pin-entry">'+
      '<div class="col-xs-8 place-name-div form-group">'+
        '<input type="input" class="form-control place-name-field" placeholder="Place name">'+
      '</div>'+
      '<button class="btn btn-warning delete-entry" type="submit">Delete place</button>'+
      '<div class="form-group">'+
        '<textarea class="form-control place-description" placeholder="Description" rows="2"></textarea>'+
      '</div>'+
    '</div>';

  var newCategory = '<div class="category-entry form-group">'+
    '<div class="form-group col-xs-8">'+
      '<input type="text" class="form-control category-name" placeholder="Category name">'+
    '</div>'+
    '<button type="button" class="btn btn-danger remove-category">Remove category</button>'+
    '<div class="pin-entry">'+
      '<div class="col-xs-8 place-name-div form-group">'+
        '<input type="input" class="form-control place-name-field" placeholder="Place name">'+
      '</div>'+
      '<button class="btn btn-warning delete-entry" type="submit">Delete place</button>'+
      '<div class="form-group">'+
        '<textarea class="form-control place-description" placeholder="Description" rows="2"></textarea>'+
      '</div>'+
    '</div>'+
    '<button type="button" class="btn btn-default add-new-place">Add new place</button>'+
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
        longitude: place.geometry.location.lng(),
        phone_number: place.formatted_phone_number,
        address: place.formatted_address
      });
      console.log(place);
      console.log(lastInput.data());
    });
  };

  var appendNewCategory = function() {
    $('#all-additions').append(newCategory);
    bindAddPlaceButton();
    bindDeletePlaceButton();
    autocompletePlaceField();
    bindRemoveCategory();
  };

  var addData = function(){
    mapInfo.title = $('#mapTitle').val();
    mapInfo.description = $('#mapDescription').val();
    mapInfo.featured = $('#featured-checkbox').is(":checked");
    $('.pin-entry').each(function(index){
      var field = $(this).find('.place-name-field');
      var pinDescription = $(this).find('.place-description').val();
      var pinCategory = mapHasCategories ? $(this).closest('div.category-entry').val() : null;
      var pin = {
        name: field.val(),
        google_id: field.data().pindata.getID,
        lat: field.data().pindata.latitude,
        long: field.data().pindata.longitude,
        phone_number: field.data().pindata.phone_number,
        address: field.data().pindata.address,
        description: pinDescription,
        category: pinCategory
      };
      mapInfo.pins.push(pin);
    });
  };

  var mapInfo = {
    user_id: null,
    title: null,
    description: null,
    featured: $('#featured-checkbox').is(":checked"),
    pins: [],
  };

  var postMap = function(){
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(mapInfo),
      url: '/api/maps',
      error: function(response,status){
        console.log(response);
      },
      success: function(response,status){
        console.log(response);
        console.log ('successfully created a map!');
        window.location.href ='/maps/:map_id';
      }
    });
  };

  var bindDeletePlaceButton = function() {
    $('.btn-warning.delete-entry').off().on('click', function(e){
      e.preventDefault();
      $(this).parent().remove();
    });
  };

  var bindAddPlaceButton = function() {
    $('.add-new-place').off().on('click', function(e){
      console.log('listening');
      e.preventDefault();
      mapHasCategories ? $(this).before(newPlace) : $('#all-additions').append(newPlace);

    var lastInput = $(this).parent().find('.place-name-field').last();
    var autocomplete = new google.maps.places.Autocomplete(lastInput[0]);

    google.maps.event.addDomListener(window, 'load', autocomplete);

    google.maps.event.addListener(autocomplete, 'place_changed', function(){
      var place = autocomplete.getPlace();
      lastInput.data('pindata', {
        getID: place.place_id,
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
        phone_number: place.formatted_phone_number,
        address: place.formatted_address
      });
    });

    bindDeletePlaceButton();
    });
  };

  var bindYesButton = function() {
    $('.btn-success.yesss').on('click', function(e){
      e.preventDefault();
      yesToCategories();
    });
  };


  var bindAddNewCategory = function(){
    $('.add-new-category').off().on('click', function(e){
      e.preventDefault();
      appendNewCategory();
    });
  };

  var yesToCategories = function() {
    $('#categoryOption').hide();
    mapHasCategories = true;
    $('.add-new-category').show();
    $('.create-map-button').show();
    appendNewCategory();
  };

  var bindNoButton = function() {
    $('.btn-danger.nooo').on('click', function(e){
      e.preventDefault();
      noToCategories();
    });
  };

  var noToCategories = function() {
    $('#categoryOption').hide();
    $('.add-new-place').show();
    $('.create-map-button').show();
    $('#all-additions').append(newPlace);
  };

  var bindCreateButton = function() {
    $('.btn.create-map-button').on('click', function(e){
      e.preventDefault();
      if (mapInfo.user_id){
        $(this).removeAttr('data-target');
        $(this).removeAttr('data-toggle');
        console.log ('logged in');
        addData();
        postMap();
      }
    });
  };

  var bindRemoveCategory = function() {
    $('.btn.remove-category').on('click', function(e){
      e.preventDefault();
      $(this).parent().remove();
    });
  };

  var init = function() {
    bindYesButton();
    bindNoButton();
    $('.add-new-category').hide();
    $('.add-new-place').hide();
    $('.create-map-button').hide();
    bindAddPlaceButton();
    bindAddNewCategory();
    bindCreateButton();
  };

  init();

});