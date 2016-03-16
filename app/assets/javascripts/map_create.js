$(document).ready(function() {

  $.auth.validateToken().then(function(user){
    mapInfo.user_id = user.id;
  });

  var tagsarray = [];

  var mapHasCategories = false;

  var appendNewPlace = function(){
    $('#all-additions').append(newPlace);
    autocompletePlaceField();
  };

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
    '<div class="form-group col-xs-8 category-name-div">'+
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

  var bindTagSubmit = function() {
    $('.mc-tags-form').off().on('submit', function(e){
      e.preventDefault();
      var newTag = $(this).find('.mc-tags-input').val();
      addNewTagRow(newTag);
      tagsarray.push(newTag);
    });
  };

  var addNewTagRow = function(oldrow) {
    var newRow = '<form class="mc-tags-form">'+
            '<input type="text" class="form-control mc-tags-input" placeholder="Add tag">'+
          '</form>';
    var agedrow = '<button class="btn btn-default newhashtag" data-tag="'+ oldrow+'" type="submit"><i>#'+oldrow+'</i></button>';
    $('.mc-tags-form').remove();
    $('.tags-body').append(agedrow);
    $('.tags-body').append(newRow);
    bindTagSubmit();
    bindNewTag();
    $('.mc-tags-input').last().focus();
  };

  var bindNewTag = function(){
    $('.newhashtag').last().off().on('click', function(e){
      console.log(tagsarray, "1");
      e.preventDefault();
      var value = $(this).attr('data-tag');
      for (var i=tagsarray.length-1; i>=0; i--) {
        if (tagsarray[i] == value) {
          tagsarray.splice(i, 1);
        }
      }
      $(this).remove();
      console.log(tagsarray, "2");
    });
  };

  var addData = function(){
    mapInfo.title = $('#mapTitle').val();
    mapInfo.description = $('#mapDescription').val();
    mapInfo.featured = $('#featured-checkbox').is(":checked");
    $('.pin-entry').each(function(index){
      var field = $(this).find('.place-name-field');
      var pinDescription = $(this).find('.place-description').val();
      var pinCategory = mapHasCategories ? $(this).parent().find('div.col-xs-8').eq(0).find('.category-name').val() : null;
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
    tags: tagsarray
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
        window.location.href ='/maps/'+response;
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
      mapHasCategories ? $(this).before(newPlace) : appendNewPlace();

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
    $('.featuredornot').hide();
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
    $('.featuredornot').show();
    $('.create-map-button').show();
    appendNewPlace();
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
    bindTagSubmit();
    $('.add-new-category').hide();
    $('.add-new-place').hide();
    $('.create-map-button').hide();
    $('.featuredornot').hide();
    bindAddPlaceButton();
    bindAddNewCategory();
    bindCreateButton();
  };

  init();

});