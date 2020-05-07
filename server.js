const express = require('express');
const cors = require('cors');
const app = express();
const hbs = require('express-handlebars');
const challonge = require('challonge');
const fs = require('fs');


//CHALLONGE
const client = challonge.createClient({
  apiKey: '13ov7hJBEjm8LiCeduqgPpXBiPNrLDKUPnKcL8Mm',
});

function getMatches(){
    client.matches.index({
    id: 'bccprfeb',
    callback: (err, data) => {
      console.log(data);
      return data[2].match;
      } 
    });
}

getMatches();

//HBS
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/',
  helpers: {
    toJSON : function(object) {
      return JSON.stringify(object);
    }
  }
}));

//RENDERING
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('main', {layout : 'index' });
});

app.get("/getMatches/:id", function(req, res, next) {
  client.matches.index({
  id: req.params.id,
    callback: (err, data) => {
      console.log(err, data);
      let j = JSON.stringify(data);
      fs.writeFileSync("./json/tournaments/" + req.params.id + '.json', j);
      res.send(data);
    }
  });
})

app.get("/getParticipants/:id", function(req, res, next) {
   client.participants.index({
    id: req.params.id,
    callback: (err, data) => {
      console.log(err, data);
      let j = JSON.stringify(data);
      fs.writeFileSync("./json/participants/" + req.params.id + '.json', j);
      res.send(data);
    }
  });
})

app.get("/makeBet/:tid/:mid/:pid/:bet", function(req, res, next) {
  res.send("Bet placed!")
  
  const fileloc = './json/bets/'.concat(req.params.tid).concat('.json')
  
  
  const obj = {
   "matchid": req.params.mid,
   "playerid":  req.params.pid,
   "bet": req.params.bet
  }
  console.log(obj)
  fs.readFile(fileloc, 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
      objz = JSON.parse(data); //now it an object
      objz.push(obj); //add some data
      json = JSON.stringify(objz); //convert it back to json
      fs.writeFile(fileloc, json, 'utf8'); // write it back 
  }})
})

app.listen(3000, function() {
  console.log("Started on port 3000")
})