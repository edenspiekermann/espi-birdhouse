var weather = require('weather-js');

var getWeather = function (location) {
  return new Promise(function (fullfill, reject) {
    var weatherOptions = {
      search: location,
      degreeType: 'C'
    };
    weather.find(weatherOptions, function(err, result) {
      if(err) {
        reject(err);
      }

      fullfill(result);
    });
  });
};

module.exports = getWeather;