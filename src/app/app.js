import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/Main'; // Our custom react component
import PubNub from 'pubnub';

injectTapEventPlugin();

// Render the main app react component
ReactDOM.render(<Main />, document.getElementById('app'));
