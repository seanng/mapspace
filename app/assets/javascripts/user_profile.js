$(document).ready(function() {

  var displayUserMaps = function (data) {
    data.forEach(function (item) {
      var user        = item.user.name;
      var userID      = item.user.id;
      var mapID       = item.id;
      var title       = item.title;
      var tags        = item.tags;
      var likes       = item.likes.length;
      var comments    = item.comments.length;

      var dateRaw     = moment([item.created_at]); // need to check this
      var dateCurrent = moment();
      var dateSince   = dateCurrent.diff(dateRaw);

      var newMap = '' +
      '<div class="row map-item" data-user-id="' + userID + '">' +
        '<div class="col-xs-3 likes">' +
          '<span class="glyphicon glyphicon-star" id="liked-star" aria-hidden="true"></span>' +
          '<h3 id="number-of-likes">' + likes + '</h3>' +
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

      $('.profile-feed').append(newMap);
    });
  };

  var getUserMaps = function () {
    path    = location.pathname.split("/");
    user_id = path[2];

    $.ajax({
      url:"/api/users/" + user_id + "/maps",
      method: "GET",
      success: function(response, status) {
        displayUserMaps(response);
        showEditButtons();
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };

  // Shows edit buttons for maps that belong to current user + profile edit button
  var showEditButtons = function() {
    $.auth.validateToken().then(function (user) {
      path       = location.pathname.split("/");
      user_id    = parseInt(path[2]);

      // edit button for user maps on feed
      userMaps   = $('[data-user-id="' + user.id + '"]');
      editButton = '' +
        '<div>' +
          '<button type="button" class="btn btn-default btn-sm show profile-info">' +
            '<span class="glyphicon glyphicon-edit show profile-info" id="profile-edit-button" aria-hidden="true"></span></button>' +
          '<button type="button" class="btn btn-default btn-sm hidden profile-info" id="profile-save-button">Save</button>' +
        '</div>';

      userMaps.append(editButton);

      // edit buttons for profile + places
      if (user.id != user_id) {
        $('.auth-check').toggleClass('hidden show');
      };
    }).fail(function (resp) {
    });
  };

  var bindSaveProfile = function () {
    $('#profile-save-button').on('click', function () {
      var description = $('input[name="profile-user-description"]').val();

      $('.profile-info').toggleClass('hidden show');
      $('.profile-edit').toggleClass('hidden show');

      $('#profile-description').html(description);

    });
  };

  var bindEditProfile = function () {
    $('#profile-edit-button').on('click', function () {
      var description = $('#profile-description').html();

      $('.profile-info').toggleClass('hidden show');
      $('.profile-edit').toggleClass('hidden show');

      $('input[name="profile-user-description"]').val(description);

    });
  };

  var getProfile = function () {
    path    = location.pathname.split("/");
    user_id = path[2];

    $.ajax({
      url:"/api/users/" + user_id,
      method: "GET",
      success: function(response, status) {
        console.log("success", response);
      },
      error: function (response, status) {
        console.log("failed", response);
      }
    });
  };

  var init = function () {
    getUserMaps();
    bindEditProfile();
    bindSaveProfile();
    getProfile();
  };

  init();

});