var pubnub = require('./pubnub');
var _ = require('lodash');

var getAvailableLocations = function () {
  return new Promise (function (fullfill, reject) {
    pubnub.here_now({
      channel: 'espi-birdhouse',
      state: true,
      callback: function (data) {
        var users = data.uuids.filter(function (user) {
          return user.state;
        });
        fullfill(users);
      }
    });
  });
};

var bird = {
 connect: function () {
    pubnub.subscribe({
      channel: 'espi-birdhouse',
      message: this.handleMessage,
      connect: this.onConnect,
      disconnect: this.onDisconnect,
      error: this.onError,
      presence: this.handlePresence
    });
  },

  onConnect: function(){
    console.log("Connected")
  },
  onDisconnect: function(){
    console.log("Disconnected")
  },
  onReconnect : function(){
    console.log("Reconnected")
  },
  onError : function(){
    console.log("Network Error")
  },

  handleMessage: function (message) {
    console.log('message arrived', message);
  },

  handlePresence: function (message) {
    console.log('presence changed', message);
  },

  chooseLocation: function () {
    var self = this;
    getAvailableLocations()
    .then(function (locations) {
      console.log('choosing from ' + locations.length + " locations");
      // pick a random location
      var newLocation = _.sample(locations);
      console.log('setting new location to ' + newLocation.state.name);

      self.setLocation(newLocation);
    })
  },

  setLocation: function (location) {
    console.log('setting new location to ' + location.state.name);

    var message = {
      type: 'change:location',
      location: location
    };

    pubnub.publish({
      channel : 'espi-birdhouse',
      message : message,
      store_in_history: true
    });
  },

  start: function () {
    this.chooseLocation();
    this.intervalID = setInterval(this.chooseLocation.bind(this), 1000 * 30);
  },
  stop: function () {
    clearInterval(this.intervalID);
  }

}

module.exports = bird;