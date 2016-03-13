$(document).ready(function() {

  $.auth.validateToken().then(function(user){
    console.log('authenticated');
    $('.nav-link').eq(0).hide();
  }).fail(function(resp){
    console.log('not authenticated');
    $('.dropdown-toggle').eq(0).hide();
    console.log(resp);
  });

  var searchInput = $('.searchBar').val();

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
        populateFilterPage(searchInput);
      },
      error: function (response1, status){
        console.log ('could not load filter page.');
      }
    });
  };



  var populateFilterPage = function(searchInput) {
    $.ajax({
      method: 'GET',
      url: "/api/maps/filter",
      data: {
        searchInput: searchInput
      },
      success: function (response2, status2) {
        console.log (response2);
        $('.searchBar').val('');

        var searchField = response2.searchInput;
        $('#searchField').html(searchField);

        var searchResults = response2.searchResults;

        for (var i = 0; i < searchResults.length; i++) {
          for (var j = 0; j < searchResults[i].length; j++) {
            $('#filter-feed').append(searchResults[i][j].title); //<- DO CRAZY STUFF BETWEEN THOSE BRACKETS!!
          }
        }

      },
      error: function(response2, status2){
        console.log (response2);
        console.log ('fail get');
      }
    });
  };


  var init = function () {
    bindSignOut();
    searchEvent();
    populateFilterPage(searchInput);
  };

  init();
});