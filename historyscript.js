function readTournament(id) {
    var jsonTemp = null;
    $.ajax({
        'async': false,
        'url': "./json/tournaments/" + id + ".json",
        'success': function (data) {
            jsonTemp = data;
        }
    });
    return jsonTemp;
}

function readParticipants(id) {
    var jsonTemp = null;
    $.ajax({
        'async': false,
        'url': "./json/participants/" + id + ".json",
        'success': function (data) {
            jsonTemp = data;
        }
    });
    return jsonTemp;
}

function readBets(id) {
    var jsonTemp = null;
    $.ajax({
        'async': false,
        'url': "./json/bets/" + id +".json",
        'success': function (data) {
            jsonTemp = data;
        }
    });
   console.log(jsonTemp);
    return jsonTemp;
}

function getUsername(id, users) {
  for (var i=0 ; i < Object.keys(users).length ; i++)
  {
      if (users[i].participant.id == id) {
          return users[i].participant.name;
      }
  }
}

function makeComplete(m, users, gid){
  console.log(m)
  var wid = m.winnerId;
  var w = getUsername(m.winnerId, users);
  $(document).ready(function() {addDiv(m,w,wid,gid)});
}

function addDiv(m, winner, wid, gid) {
  var outcome;
  var bets = readBets(gid);

  for (var i = 0; i < Object.keys(bets).length; i++) {
    if (bets[i].matchid == m.id && bets[i].playerid == wid) {
        outcome = 'win'
    }
    if (bets[i].matchid == m.id && bets[i].playerid != wid) {
        outcome = 'loss'
    }
  }
  var main = $("<div/>", {
      id: outcome,
      "class": "completematch",      
      appendTo: "body"
    });
  $("<p/>", { 
      id: wid,
      text: 'Winner: '.concat(winner),    
      appendTo: main
  });
  
  for (var i = 0; i < Object.keys(bets).length; i++) {
    if (bets[i].matchid == m.id && bets[i].playerid == wid) {
      $("<p/>", { 
          text: ' Win: +$'.concat(bets[i].bet),    
          appendTo: main
      });
    }
    if (bets[i].matchid == m.id && bets[i].playerid != wid) {
      $("<p/>", { 
          text: ' Loss: -$'.concat(bets[i].bet),    
          appendTo: main
      });
    }
  }
}

function sendMatches(id){
  var matches = readTournament(id);
  var users = readParticipants(id);
  for (var i = 0; i < Object.keys(matches).length; i++) {
    if (matches[i].match.state == "complete") {
      makeComplete(matches[i].match, users, id);
    }
  }
}

sendMatches('zae0f9dq');
