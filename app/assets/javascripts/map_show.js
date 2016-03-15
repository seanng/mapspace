$(document).ready(function() {

  var categoryAccordion = function(number) {
    return '<div class="panel panel-default">'+
      '<div class="panel-heading" role="tab" id="heading'+number+'">'+
        '<h4 class="panel-title">'+
          '<a class="catName"role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+number+'" aria-expanded="true" aria-controls="collapse'+number+'">'+
            'Collapsible Group Item #1'+
          '</a>'+
        '</h4>'+
      '</div>'+
      '<div id="collapse'+number+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading'+number+'">'+
        // PINS GO HERE
      '</div>'+
    '</div>';
  };

  var renderMapList = function(obj){
    var keyArray = Object.keys(obj.grouped_pins);
    console.log(keyArray);
    keyArray.forEach(function(cat, i){
      $('#accordion').append(categoryAccordion(i+1));
      $('.catName').last().html(cat);
    });
  };

  var renderMapSummary = function(obj){
    $('#mv-title').text(obj.title);
    $('#mv-description').text(obj.description);
    $('#mv-creator-name').text('by '+obj.user.name);
    $('#number-of-likes').text(obj.likes.length);
  };

  var drawMap = function(obj) {

  };

  var getMapInfo = function(map_id) {
    $.ajax({
      url:"/api/maps/" + map_id,
      method: "GET",
      success: function(response, status) {
        console.log(response);
        renderMapSummary (response);
        renderMapList (response);
        drawMap (response);
      },
      error: function (response, status) {
        console.log(response);
      }
    });
  };

  var init = function () {
    var splitPath = location.pathname.split('/');
    if (splitPath[1] === 'maps' && parseInt(splitPath[2]) !== isNaN && !splitPath[3]) {
      getMapInfo(splitPath[2]);
    }
  };

  init();
});