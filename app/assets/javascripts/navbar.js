$(document).ready(function(){

  var bindSignOut = function () {
    $('#signout-button').on('click', function(){
      $.auth.signOut();
      console.log("success")
    });
  };

  var init = function () {
    bindSignOut();
  };

  init();
});