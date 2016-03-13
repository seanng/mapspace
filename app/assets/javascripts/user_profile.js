$(document).ready(function() {

  var bindEditProfile = function () {
    $('#profile-edit-button').on('click', function () {
      var description = $('#profile-description').html();

      $('.profile-info').toggleClass('hidden show');
      $('.profile-edit').toggleClass('hidden show');

      $('input[name="profile-user-description"]').val(description);

    });
  };

  var bindSaveProfile = function () {
    $('#profile-save-button').on('click', function () {
      var description = $('input[name="profile-user-description"]').val();

      $('.profile-info').toggleClass('hidden show');
      $('.profile-edit').toggleClass('hidden show');

      $('#profile-description').html(description);

    });
  };

  var init = function () {
    bindEditProfile();
    bindSaveProfile();
  };

  init();

});