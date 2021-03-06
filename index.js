// load env file
require('dotenv').config();

// server setup
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var bird = require('./lib/bird');


// other imports
var weather = require('./lib/weather');
var timezone = require('./lib/timezone');
var pubnub = require('./lib/pubnub');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// static files
app.use(express.static('public'));



app.get('/ping', function (req, res) {
  // pusher.trigger('bird-house', 'ping', {
  //   "message": "hello world"
  // });
  pubnub.publish({
    channel : 'espi-birdhouse',
    message : 'Pinged the bird',
    callback : function(m){
      console.log(m)
    }
  });
  res.send('Message sent');
});

app.get('/weather/:location', function (req, res, next) {
  var location = req.params.location;
  console.log('getting weather for ', location);
  return weather(location).then(function (data) {
    if(data.length) {
      var city = data[0];
      var location = city.location;
      return timezone(location.lat, location.long)
        .then(function (result) {
          var timezoneInfo = {timezone: result};
          var cityInfo = Object.assign({}, city, timezoneInfo);
          res.send(cityInfo);
        });
    } else {
      res.status(500).send('Could not load weather for ' + location);
    }
  }).catch(function (error) {
    res.status(500).send('Could not load weather for ' +  location);
  });
});




// Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// start the server

app.listen(port, function () {
  console.log('Birdhouse server listening on port ' + port);
});

// let the bird fly
bird.connect();
bird.start();
