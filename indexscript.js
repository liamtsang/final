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

function getUsername(id, users) {
  for (var i=0 ; i < Object.keys(users).length ; i++)
  {
      if (users[i].participant.id == id) {
          return users[i].participant.name;
      }
  }
}

function makeOpen(m, users,t){
  console.log(m)
  var p1 = getUsername(m.player1Id, users);
  var p2 = getUsername(m.player2Id, users);
  $(document).ready(function() {addDiv(m,p1,p2,t)});
}

function addDiv(m,p1,p2,t) {
  var main = $("<div/>", {  
    id: m.id,
    "class": "openmatch",      
    appendTo: "#gridc"
  });
  //Name Divs
  var p1d = $("<div/>", {  
    text: p1,
    
    "class": "leftplayer",      
    on: {
      click: function(){
        $("#"+m.player1Id + "" + m.id).slideToggle("slow");
      }
    },
    appendTo: main
  });
  var p2d = $("<div/>", {  
    text: p2,
    "class": "rightplayer",      
    on: {
      click: function() {
          $("#"+m.player2Id + "" + m.id).slideToggle("slow");
        }
    },
    appendTo: main
  });
  //Slideouts
  var p1s = $("<div/>", {  
    "class": "leftslideout",
    id: m.player1Id + "" + m.id,
    on: {
      click: function() {
        console.log("Hy! My ID is: "+ this.id);
      }
    },
      appendTo: main
    });
  var p2s = $("<div/>", {  
    "class": "rightslideout",   
    id: m.player2Id + "" + m.id,
    on: {
      click: function() {
        console.log("Hy! My ID is: "+ this.id);
      }
    },
      appendTo: main
    });
  
  var p1f = "http://localhost:3000/makeBet/".concat(t).concat("/").concat(m.id).concat("/").concat(m.player1Id).concat("/").concat(50)
  var p1h = "http://localhost:3000/makeBet/".concat(t).concat("/").concat(m.id).concat("/").concat(m.player1Id).concat("/").concat(100)
  var p1t = "http://localhost:3000/makeBet/".concat(t).concat("/").concat(m.id).concat("/").concat(m.player1Id).concat("/").concat(300)
  
  var p2f = "http://localhost:3000/makeBet/".concat(t).concat("/").concat(m.id).concat("/").concat(m.player2Id).concat("/").concat(50)
  var p2h = "http://localhost:3000/makeBet/".concat(t).concat("/").concat(m.id).concat("/").concat(m.player2Id).concat("/").concat(100)
  var p2t = "http://localhost:3000/makeBet/".concat(t).concat("/").concat(m.id).concat("/").concat(m.player2Id).concat("/").concat(300)
  
  //Betting Numbers
  $("<a/>", {
    text: '50',
    target: "_blank",
    href: p1f,
    appendTo: p1s
  });
  $("<a/>", {
    text: '100',
    target: "_blank",
    href: p1h,
    appendTo: p1s
  });
  $("<a/>", {
    text: '300',
    target: "_blank",
    href: p1t,
    appendTo: p1s
  });
  
  $("<a/>", {
    text: '50',
    target: "_blank",
    href: p2f,
    appendTo: p2s
  });
  $("<a/>", {
    text: '100',
    target: "_blank",
    href: p2h,
    appendTo: p2s
  });
  $("<a/>", {
    text: '300',
    target: "_blank",
    href: p2t,
    appendTo: p2s
  });
}

function sendMatches(id){
  var matches = readTournament(id);
  var users = readParticipants(id);
  for (var i = 0; i < Object.keys(matches).length; i++) {
    if (matches[i].match.state == "open") {
      makeOpen(matches[i].match, users,id);
    }
  }
}

sendMatches('zae0f9dq');
