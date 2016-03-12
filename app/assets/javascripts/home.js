$(document).ready(function() {

  var bindFilterWeekly = function() {
    $('#weekly').on('click', function(e) {
      e.preventDefault();

    });
  };

  var init = function() {
    bindFilterWeekly();
  };

  init();

});