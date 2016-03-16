$(document).ready(function() {

  var bindSaveProfile = function () {
    $('#profile-save-button').on('click', function () {
      var caption = $('input[name="profile-user-caption"]').val();

      $('.profile-info').toggleClass('hidden show');
      $('.profile-edit').toggleClass('hidden show');

      $('#profile-caption').html(caption);

      path    = location.pathname.split("/");
      user_id = path[2];

      $.ajax({
      method: "PUT",
      url:"/api/users/" + user_id,
      data: { caption: caption },
      success: function (response, status) {},
      error: function (response, status) {
        console.log(response);
      }
      });
    });
  };

  var bindEditProfile = function () {
    $('#profile-edit-button').on('click', function (e) {
      e.preventDefault();
      var caption = $('#profile-caption').html();

      $('.profile-info').toggleClass('hidden show');
      $('.profile-edit').toggleClass('hidden show');

      $('input[name="profile-user-caption"]').val(caption);
    });
  };

  // Shows edit buttons for maps that belong to current user + profile info edit button
  var showEditButtons = function() {
    $.auth.validateToken().then(function (user) {
      path       = location.pathname.split("/");
      user_id    = parseInt(path[2]);

      // show profile and map edit buttons if they belong to logged in user
      if (user.id != user_id) {
        $('.auth-check').addClass('hidden');
      };

    }).fail(function (resp) {
      // if no user is logged in, hide all edit buttons
      $('.auth-check').addClass('hidden');
    });
  };

  var displayUserMaps = function (data) {
    data.forEach(function (item) {
      var user        = item.user.name;
      var userID      = item.user.id;
      var mapID       = item.id;
      var title       = item.title;
      var tags        = item.tags.join(' ');
      var likes       = item.likes.length;
      var comments    = item.comments.length;

      var dateRaw     = item.created_at;
      var dateCurrent = moment();
      var dateSince   = dateCurrent.diff(dateRaw, 'days');

      var newMap =
'<div class="row map-item" data-user-id="'+userID+'">'+
  '<div class="col-xs-2">'+
    '<div class="likes" data-likes="'+likesIDs+'">'+
      '<div class="number-of-likes">'+likes+'</div>'+
    '</div>'+
  '</div>'+
  '<div class="col-xs-10 map-about">'+
    '<div class="row top-half">'+
      '<div class="col-xs-7">'+
        '<h3><a href="/maps/'+mapID+'">'+title+'</a></h3>'+
      '</div>'+
      '<div class="col-xs-5 map-tag">'+
        '<h5>'+tags+'</h5>'+
      '</div>'+
    '</div>'+
    '<div class="row bottom-half">'+
      '<ul class="map-stats">'+
        '<li class="map-stats-comments"><a href="/maps/'+mapID+'/comments">'+comments+'</a> comments </li>'+
        '<ul class="map-stats-user">'+
          '<li class="map-stats-date">'+  dateSince+ '  days ago </li>'+
          '<li class="map-stats-owner"> by '+ '<a href="/profile/'+userID+'">'+user+'</a></li>'+
        '</ul>'+
      '</ul>'+
    '</div>'+
  '</div>'+
'</div>';

      $('.profile-feed').append(newMap);
    });
  };

  var getUserMaps = function () {
    path    = location.pathname.split("/");
    user_id = path[2];

    $.ajax({
      method: "GET",
      url:"/api/users/" + user_id + "/maps",
      success: function(response, status) {
        displayUserMaps(response);
        showEditButtons();
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };

  var getProfile = function () {
    path    = location.pathname.split("/");
    user_id = path[2];

    $.ajax({
      method: 'GET',
      url: "/api/users/" + user_id
    }).done(function(resp) {
      $('#profile-header').append(resp);
      showEditButtons();
      bindEditProfile();
      bindSaveProfile();
    });
  };

  var init = function () {
    var splitPath = location.pathname.split('/');
    if (splitPath[1] === 'profile' && parseInt(splitPath[2]) !== isNaN && !splitPath[3]) {
      getUserMaps();
      getProfile();
    }
  };

  init();

});