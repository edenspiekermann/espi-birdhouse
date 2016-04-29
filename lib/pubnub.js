var PubNub = require("pubnub");

var client = PubNub.init({
  publish_key   : process.env.PUBNUB_PUBLISH,
  subscribe_key : process.env.PUBNUB_SUBSCRIBE,
  uuid: 'espi-bird',
  error: function (error) {
    console.log('PubNub Error:', error);
  }
});

module.exports = client;