var express = require('express');
var app = express();
var getWeather = require('./helpers/weather');

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '201919',
  key: '18bba7435bddbeeb7939',
  secret: '8308a4f67139666a8b4b',
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

app.use(express.static('public'));


// Error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

