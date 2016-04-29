import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/Main'; // Our custom react component
import PubNub from 'pubnub';
// fetch polyfill
// import 'whatwg-fetch';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();


// // Enable pusher logging - don't include this in production
// Pusher.log = function(message) {
//   if (window.console && window.console.log) {
//     window.console.log(message);
//   }
// };

// var pusher = new Pusher('18bba7435bddbeeb7939', {
//   authEndpoint: '/pusher/auth',
//   encrypted: true
// });

// var channel = pusher.subscribe('bird-house');
// var presenceChannel = pusher.subscribe('presence-birdhouse');

// presenceChannel.bind('pusher:subscription_succeeded', function() {
//   var me = presenceChannel.members.me;
//   var userId = me.id;
//   var userInfo = me.info;
//   console.log(me);
// });


// channel.bind('ping', function(data) {
//   Pusher.log(data.message);
// });




// Render the main app react component
ReactDOM.render(<Main />, document.getElementById('app'));
