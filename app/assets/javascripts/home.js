$(document).ready(function () {

  var displayMaps = function (data) {
    console.log(data);
  //   data.forEach(function (item) {
  //     var followers = item.followers.length;
  //     var styles     = item.styles.join(", ");
  //     var newArtist = '' +
  //       '<div class="row">' +
  //         '<div class="col-xs-6 col-sm-4 col-md-3">' +
  //           '<div class="thumbnail">' +
  //             '<img src="' + item.avatar + '">' +
  //             '<div class="caption text-center">' +
  //               '<h4><strong>' + item.username + '</strong></h4>' +
  //               '<p>' + followers + ' followers </p>' +
  //               '<p>' + item.location + '</p>' +
  //               '<p>' + styles + '</p>' +
  //             '</div>' +
  //           '</div>' +
  //         '</div>' +
  //       '</div>';

  //       $('#main').append(newArtist);
  //   });
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