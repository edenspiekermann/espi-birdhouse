var timezoner = require('timezoner');

var geTimezone = function (latitude, longitude) {
  return new Promise(function (fullfill, reject) {
    timezoner.getTimeZone(
      latitude,
      longitude,
      function(err, data) {
        if (err) {
          reject(err);
        } else {
          fullfill(data);
        }
      }
    );
  });
};

module.exports = geTimezone;