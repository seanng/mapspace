$(document).ready(function() {

  $.auth.validateToken().then(function(user){
  }).fail(function(resp){
    $('.auth-place-info').toggleClass('hidden show');
  });


  var init = function () {

  };

  init();
});