import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubNub from 'pubnub';
import pubnubClient from '../helpers/pubnub-client';


class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    let name = this.refs.name.input.value;
    let location = this.refs.location.input.value;
    this.props.onLogin(name, location);
  }


  render () {
    return (
      <div className="login-container">
        <h3>Add your own birdhouse</h3>

        <div>
          <TextField
            ref="name"
            id="name"
            hintText="Name of your birdhouse"
            floatingLabelText="Name of your birdhouse"
          />
        </div>
        <div>
          <TextField ref="location"
            hintText="Your location"
            floatingLabelText="Your location"
          />
        </div>
        <br />
        <RaisedButton
          label="Connect"
          onTouchTap={this.handleLogin}
         />
      </div>
    );
  }
}


export default Login;