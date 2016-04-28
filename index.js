// load env file
require('dotenv').config();

// server setup
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// helpers
var getWeather = require('./helpers/weather');

// pusher setup
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  encrypted: true
});

app.get('/ping', function (req, res) {
  pusher.trigger('bird-house', 'ping', {
    "message": "hello world"
  });
  res.send('Message sent');
});

app.get('/weather/:location', function (req, res, next) {
  var location = req.params.location;
  console.log('getting weather for ', location);
  return getWeather(location).then(function (data) {
    if(data.length) {
      res.send(data[0]);
    } else {
      res.status(500).send('Could not load weather for ' + location);
    }
  }).catch(function (error) {
    res.status(500).send('Could not load weather for ' +  location);
  });
});

// static files

app.use(express.static('public'));


// Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// start the server

app.listen(port, function () {
  console.log('Example app listening on port ' + port);
});

