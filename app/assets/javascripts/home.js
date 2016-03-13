$(document).ready(function () {

  var displayMaps = function (data) {
    data.forEach(function (item) {
      var user        = item.user.name;
      var userID      = item.user.user_id;
      var mapID       = item.id;
      var title       = item.title;
      var tags        = item.tags;
      var likes       = item.keys(likes.user).length; // need to check this
      var comments    = item.keys(comments.user).length; // need to check this

      var dateRaw     = moment([item.created_at]); // need to check this
      var dateCurrent = moment();
      var dateSince   = dateCurrent.diff(dateRaw);

      var newMap = '' +
      '<div class="row map-item">' +
        '<div class="col-xs-3 likes">' +
          '<span class="glyphicon glyphicon-star" id="liked-star" aria-hidden="true"></span>' +
          '<h3 id="number-of-likes">' + likes + '</h3>' +
        '</div>' +
        '<div class="col-xs-6 map-about">' +
          '<h3><a href="/maps/mapID">' + Title + '</a></h3>' +
          '<ul class="map-stats">' +
            '<li class="map-stats-comments"><a href="/maps/mapID/comments">' + comments + '</a>comments</li>' +
            '<ul class="map-stats-user">' +
              '<li class="map-stats-date">' + dateSince + 'days ago</li>' +
              '<li class="map-stats-owner">by ' + '<a href="/profile/userID">' + user + '</a></li>' +
            '</ul>' +
          '</ul>' +
        '</div>' +
        '<div class="col-xs-3 map-tag"><h5>' + tags + ' tags</h5></div>' +
      '</div>';

      $('.map-feed').append(newMap);

  };

  var getMaps = function () {
    $.ajax({
      url:"/api/maps",
      method: "GET",
      success: function(response, status) {
        console.log(response);
        displayMaps();
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };


  var bindFilterWeekly = function() {
    $('#weekly').on('click', function (e) {
      e.preventDefault();
    });
  };

  var init = function() {
    bindFilterWeekly();
    getMaps();
  };

  init();

});