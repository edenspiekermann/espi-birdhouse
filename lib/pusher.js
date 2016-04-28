var Pusher = require('pusher');

var init = function () {
  return new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    encrypted: true
  });
}

module.exports = init();
