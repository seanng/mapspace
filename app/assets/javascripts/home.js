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

  var putLikes = function() {
    $.ajax({
      url:"/api/likes/popular",
      method: "PUT",
      success: function(response, status) {
        displayPopularMaps(response);
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };

  var bindLikeButton = function(){
    $('div.likes').off().one('click',function(e){
      e.preventDefault();
      var button = $(this);
      var data_likes = $(this).attr('data-likes');
      var likeArr = data_likes.split(',');
      console.log(likeArr);
      $.auth.validateToken().then(function(user){
        var current_user = user.id.toString();
        if (likeArr.indexOf(current_user) === -1) {
          console.log('current_user not found.');
          var likeCount = parseInt(button.find('.number-of-likes').text());
          likeCount++;
          button.find('.number-of-likes').text(likeCount);

        }
      });
    });
  };

  var displayPopularMaps = function (data) {
    data.forEach(function (item) {
      var user        = item.user.name;
      var userID      = item.user.id;
      var mapID       = item.id;
      var title       = item.title;
      var tags        = item.tags ? item.tags.join(' ') : '';
      var likes       = item.likes.length;
      var like_likeids= [];
      var likesIDs    = [];
      var comments    = item.comments.length;

      var dateRaw     = item.created_at;
      var dateCurrent = moment();
      var dateSince   = dateCurrent.diff(dateRaw, 'days');

      item.likes.forEach(function(like){
        likesIDs.push(like.user_id);
      });

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


      $('.home-feed').append(newMap);
    });
    bindLikeButton();
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
      var likes       = item.likes.length;
      var likesIDs    = [];
      var comments    = item.comments.length;
      var tags        = item.tags ? item.tags.join(' ') : '';

      var dateRaw     = item.created_at;
      var dateCurrent = moment();
      var dateSince   = dateCurrent.diff(dateRaw, 'days');

      item.likes.forEach(function(like){
        likesIDs.push(like.user_id);
      });

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

      $('.home-feed').append(newMap);
    });
    bindLikeButton();
  };

  var getNewestMaps = function () {
    $.ajax({
      url:"/api/maps",
      method: "GET",
      success: function(response, status) {
        console.log('newmaps', response);
        displayNewestMaps(response);
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };

  var init = function() {
    var path = location.pathname;
    if (path === '/') {
      bindFilterNewestButton();
      bindFilterPopularButton();
      getNewestMaps();
    };
  };

  init();

});