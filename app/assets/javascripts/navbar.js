$(document).ready(function(){

  var bindSignOut = function () {
    $('#signout-button').on('click', function(){
      $.auth.signOut();
    });
  };

  var init = function () {
    bindSignOut();
  };

  init();
});