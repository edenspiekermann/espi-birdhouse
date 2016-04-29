var PubNub = require("pubnub");

var client = PubNub.init({
  publish_key   : PUBNUB_PUBLISH,
  subscribe_key : PUBNUB_SUBSCRIBE,
  error: function (error) {
    console.log('PubNub Error:', error);
  }
});

module.exports = client;