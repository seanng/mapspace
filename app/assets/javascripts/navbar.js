$(document).ready(function() {

  $.auth.validateToken().then(function(user){
    console.log('authenticated');
    $('.nav-link').eq(0).hide();
  }).fail(function(resp){
    console.log('not authenticated', resp);
    $('.dropdown-toggle').eq(0).hide();
  });

  var bindSignOut = function () {
    $('#signout-button').on('click', function(){
      $.auth.signOut();
      console.log("success");
      window.location.href = "/";
    });
  };

  var searchEvent = function () {
    $('.searchForm').on('submit', function (e) {
      e.preventDefault();
      var searchInput = $('.searchBar').val();
      console.log('testing123');
      getFilterPage(searchInput);
    });
  };


  var getFilterPage = function(searchInput) {
    $.ajax({
      method: 'GET',
      url: '/filters?searchInput=' + searchInput,
      success: function(response1, status){
        $('main').html(response1);
        console.log ("hiiiiiii", response1);
        $('#searchField').html(searchInput);
        populateFilterPage(searchInput);
      },
      error: function (response1, status){
        console.log ('could not load filter page.');
      }
    });
  };

  var populateFilterPage = function(inputs) {
    $.ajax({
      method: 'GET',
      url: "/api/maps/filter",
      data: {
        searchInput: inputs
      },
      success: function (response2, status2) {
        console.log(response2);
        displayMaps(response2);

        $('.searchBar').val('');
      },
      error: function(response2, status2){
        console.log (searchInput);
        console.log (response2);
        console.log ('fail get');
      }
    });
  };

  var displayMaps = function(data) {
    data.forEach(function(item){
      var user = item.user.name;
      var userID = item.user_id;
      var mapID = item.id;
      var title       = item.title;
      var tags        = item.tags;
      var likes       = item.likes.length;
      var comments    = item.comments.length;
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
          '<h3><a href="/maps/' + mapID + '">' + title + '</a></h3>' +
          '<ul class="map-stats">' +
            '<li class="map-stats-comments"><a href="/maps/' + mapID + '/comments">' + comments + '</a>comments</li>' +
            '<ul class="map-stats-user">' +
              '<li class="map-stats-date">' + dateSince + 'days ago</li>' +
              '<li class="map-stats-owner">by ' + '<a href="/profile/' + userID + '">' + user + '</a></li>' +
            '</ul>' +
          '</ul>' +
        '</div>' +
        '<div class="col-xs-3 map-tag"><h5>' + tags + ' tags</h5></div>' +
      '</div>';

      $('#filter-feed').append(newMap);

    });
  };


  var init = function () {
    bindSignOut();
    searchEvent();
  };

  init();
});