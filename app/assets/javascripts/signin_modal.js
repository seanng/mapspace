$(document).ready(function () {

  $.auth.validateToken().then(function(user){
    console.log(user);
  }).fail(function(resp){
    console.log(resp);
  });

  var button = $('#modal-footer-sign-in button');
  var clearInput = function(){
    $('#uLogin').val('');
    $('#uPassword').val('');
  };

  var signInButton = true;

  var signwhat1 = function(){
    $('#signwhat1').click(function(e){
      e.preventDefault();
      $('#lower-modal-text').html("Already have an account? <span id='signwhat2'><a>Sign In!</a></span>");
      button.html('Sign Up');
      $('#modal-header-label').html('Sign Up');
      signInButton = false;
      clearInput();
      signwhat2();
    });
  };

  var signwhat2 = function(){
    $('#signwhat2').click(function(e){
      e.preventDefault();
      $('#lower-modal-text').html("Don't have an account? <span id='signwhat1'><a>Sign Up!</a></span>");
      button.html('Sign In');
      $('#modal-header-label').html('Sign In');
      signInButton = true;
      signwhat1();
    });
  };

// Sign in Modal
  $('#signin-modal').on('hidden.bs.modal', function (e) {
    var inputs = $('form input');
    var title = $('.modal-title');
    inputs.removeAttr("disabled");
    button.removeClass("btn-success")
        .addClass("btn-primary")
        .removeAttr("data-dismiss");
    clearInput();
  });

// Upon clicking button to Sign In
  $('#modal-footer-sign-in button').click(function(e){
    e.preventDefault();
    clearInput();

    // If successfully authenticated,
    if ( button.attr("data-dismiss") != "modal" ){
      // var inputs      = $('.loginmodalforms');
      // var title       = $('.modal-title');
      // var SignIn      = $('#SignIn');

      if (signInButton) {
        // Sign in
        $.auth.emailSignIn({
          email     : $('#uLogin').val(),
          password  : $('#uPassword').val()
        }).then(function (user) {
          window.location.href = '/';
        }).fail(function (resp) {
          console.log(resp);
          $('#uPassword').val('');
        });
      } else {
        // Sign up
        $.auth.emailSignUp({
          email     : $('#uLogin').val(),
          password  : $('#uPassword').val(),
          password_confirmation : $('#uPassword').val()
        }).then(function (user) {
          window.location.href = '/';
        }).fail(function (resp) {
          console.log("trying to sign up");
          console.log(resp);
          alert('Authentication failure: ' + resp.errors.join(' '));
          clearInput();
        });
      }
    }
  });

  signwhat1();

});