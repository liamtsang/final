const express = require('express');
const app = express();

app.get("/", function(req, res, next) {
  res.send("Hello world");
})

app.listen(3000, function() {
  console.log("Started on port 3000")
})