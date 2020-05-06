//function getMatches(id) {
//  var settings = {
//      "async": true,
//      "crossDomain": false,
//      "url": "localhost:3000",
//      "method": "GET",
//  }
//  $.ajax(settings).done(function (response) {
//	console.log(response);
//    })
//}
//
//getMatches('1');

$.get( "localhost:3000", function( data ) {
  alert( "Data Loaded: " + data );
});