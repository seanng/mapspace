$(document).ready(function() {

  $.auth.validateToken().then(function(user){
    console.log('authenticated');
    $('.nav-link').eq(0).hide();
  }).fail(function(resp){
    console.log('not authenticated');
    $('.dropdown-toggle').eq(0).hide();
    console.log(resp);
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

      $.ajax({
        method: 'GET',
        url: "/api/maps/filter.json",
        data: {
          searchInput: searchInput
        },
        success: function (response, status) {
          console.log (response);
          window.location.href = '/filters?searchInput=' + searchInput;
          console.log ('successful get!');
        },
        error: function(response, status){
          console.log (response);
          console.log ('fail get');
        }
      });
    });
  };

  var init = function () {
    bindSignOut();
    searchEvent();
  };

  init();
});