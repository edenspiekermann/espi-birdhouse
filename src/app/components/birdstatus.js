import React from 'react';
import pubnubClient from '../helpers/pubnub-client';
import _ from 'lodash';


class BirdStatus extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleMessage = this.handleMessage.bind(this);

    this.state = {
      location: {}
    };
  }

  componentWillMount() {
    pubnubClient.subscribe({
      channel : 'espi-birdhouse',
      message : this.handleMessage,
      error : function (error) {
        // Handle error here
        console.log(JSON.stringify(error));
      }
    });
  }

  handleMessage(message) {
    console.log(message);
    if(message.type && message.type === "change:location") {
      let location = message.location.state;
      this.setState({location: location});
    }
  }

  render() {
    const {name, weather, location} = this.state.location;
    let defaultMessages = [
      "flight",
      "town grabbing some food",
      "an airplane and feeling lazy",
      "a sleepy mood",
      "your kitchen stealing your food"
    ];
    let status = _.sample(defaultMessages);
    if(name && location) {
      status = location + ' chilling at ' + name;
    }
    return (
      <div className="current">
      <img src="images/flying.jpg" className="bird"/>
      <div className="current__status">
        <h2>The bird is currently
        <span className="status">in {status}</span></h2>
      </div>
    </div>
    );
  }
}

export default BirdStatus;