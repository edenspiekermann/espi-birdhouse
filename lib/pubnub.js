var PubNub = require("pubnub");

var client = PubNub.init({
  ssl           : true,  // <- enable TLS Tunneling over TCP
  publish_key   : process.env.PUBNUB_PUBLISH,
  subscribe_key : process.env.PUBNUB_SUBSCRIBE,
  error: function (error) {
    console.log('PubNub Error:', error);
  }
});

client.subscribe({
    channel: 'bird-house',
    message: function(m){
      console.log(m)
    }
});

module.exports = client;