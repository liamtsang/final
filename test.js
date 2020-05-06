const http = require('http')


//const challonge = require('challonge');
// 
//// create a new instance of the client
//const client = challonge.createClient({
//  apiKey: '13ov7hJBEjm8LiCeduqgPpXBiPNrLDKUPnKcL8Mm',
//});
// 
//// create a tournament
//client.matches.index({
//  id: '5gbixxsr',
//  callback: (err, data) => {
//    //console.log(err, data);
//  }
//});

var fs = require("fs");

var options = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
};

var req = http.request(options, function (res) {
    console.log(res);
});

req.end();
