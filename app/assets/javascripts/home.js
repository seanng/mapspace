$(document).ready(function () {

  var displayMaps = function (data) {
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

  var getMaps = function () {
    $.ajax({
      url:"/api/maps",
      method: "GET",
      success: function(response, status) {
        displayMaps(response);
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };


  var bindFilterPopularButton = function() {
    $('#popular').on('click', function (e) {
      e.preventDefault();

    });
  };

  var init = function() {
    bindFilterPopularButton();
    getMaps();
  };

  init();

});