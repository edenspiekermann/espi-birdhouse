import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubNub from 'pubnub';
import pubnubClient from '../helpers/pubnub-client';

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 50,
    paddingBottom: 50
  },
};

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
      <div class="login-container" style={styles.container}>
        <h3>Connect your bird house</h3>

        <div>
          <TextField
            ref="name"
            id="name"
            hintText="Name of your bird house"
            floatingLabelText="Name of your bird house"
          />
        </div>
        <div>
          <TextField ref="location"
            hintText="Your location"
            floatingLabelText="Your location"
          />
        </div>
        <RaisedButton
          label="Connect"
          primary={true}
          onTouchTap={this.handleLogin}
         />
      </div>
    );
  }
}


export default Login;