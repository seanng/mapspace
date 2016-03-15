$(document).ready(function () {

  var bindFilterNewestButton = function() {
    $('#newest').on('click', function (e) {
      e.preventDefault();

      //clear popular maps
      $('.home-feed').empty();

      //bold/unbold filter links
      $('#newest').css('font-weight', 'bold');
      $('#popular').css('font-weight', 'normal');

      // display popular maps
      getNewestMaps();
    });
  };

  var displayPopularMaps = function (data) {
    data.forEach(function (item) {
      var user        = item.user.name;
      var userID      = item.user.id;
      var mapID       = item.id;
      var title       = item.title;
      var tags        = item.tags;
      var likes       = item.likes.length;
      var comments    = item.comments.length;

      var dateRaw     = item.created_at;
      var dateCurrent = moment();
      var dateSince   = dateCurrent.diff(dateRaw, 'days');

      var newMap = '' +
      '<div class="row map-item" data-user-id="' + userID + '">' +
        '<div class="col-xs-3">' +
          '<div class="likes">' +
            '<div class="number-of-likes">' + likes + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="col-xs-6 map-about">' +
          '<h3><a href="/maps/' + mapID + '">' + title + '</a></h3>' +
          '<ul class="map-stats">' +
            '<li class="map-stats-comments"><a href="/maps/' + mapID + '/comments">' + comments + '</a> comments</li>' +
            '<ul class="map-stats-user">' +
              '<li class="map-stats-date">' + dateSince + ' days ago</li>' +
              '<li class="map-stats-owner">by ' + '<a href="/profile/' + userID + '">' + user + '</a></li>' +
            '</ul>' +
          '</ul>' +
        '</div>' +
        '<div class="col-xs-3 map-tag"><h5>' + tags + '</h5></div>' +
      '</div>';

      $('.home-feed').append(newMap);
    });
  };

  var getPopularMaps = function () {
    $.ajax({
      url:"/api/maps/popular",
      method: "GET",
      success: function(response, status) {
        displayPopularMaps(response);
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };

  var bindFilterPopularButton = function() {
    $('#popular').on('click', function (e) {
      e.preventDefault();

      //clear newest maps
      $('.home-feed').empty();

      //bold/unbold filter links
      $('#newest').css('font-weight', 'normal');
      $('#popular').css('font-weight', 'bold');

      // display popular maps
      getPopularMaps();
    });
  };

  var displayNewestMaps = function (data) {
    data.forEach(function (item) {
      var user        = item.user.name;
      var userID      = item.user.id;
      var mapID       = item.id;
      var title       = item.title;
      var tags        = item.tags;
      var likes       = item.likes.length;
      var comments    = item.comments.length;

      var dateRaw     = item.created_at;
      var dateCurrent = moment();
      var dateSince   = dateCurrent.diff(dateRaw, 'days');

      var newMap = '' +
      '<div class="row map-item" data-user-id="' + userID + '">' +
        '<div class="col-xs-3">' +
          '<div class="likes">' +
            '<h3 id="number-of-likes">' + likes + '</h3>' +
          '</div>' +
        '</div>' +
        '<div class="col-xs-6 map-about">' +
          '<h3><a href="/maps/' + mapID + '">' + title + '</a></h3>' +
          '<ul class="map-stats">' +
            '<li class="map-stats-comments"><a href="/maps/' + mapID + '/comments">' + comments + '</a> comments</li>' +
            '<ul class="map-stats-user">' +
              '<li class="map-stats-date">' + dateSince + ' days ago</li>' +
              '<li class="map-stats-owner">by ' + '<a href="/profile/' + userID + '">' + user + '</a></li>' +
            '</ul>' +
          '</ul>' +
        '</div>' +
        '<div class="col-xs-3 map-tag"><h5>' + tags + '</h5></div>' +
      '</div>';

      $('.home-feed').append(newMap);
    });
  };

  var getNewestMaps = function () {
    $.ajax({
      url:"/api/maps",
      method: "GET",
      success: function(response, status) {
        displayNewestMaps(response);
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };

  var init = function() {
    bindFilterNewestButton();
    bindFilterPopularButton();
    getNewestMaps();
  };

  init();

});