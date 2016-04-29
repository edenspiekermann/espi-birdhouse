import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './login';
import BirdhouseOverview from './birdhouse-overview';
import BirdStatus from './birdstatus';
import pubnubClient from '../helpers/pubnub-client';
import axios from 'axios';

const muiTheme = getMuiTheme(theme);

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleLogin = this.handleLogin.bind(this);
    this.filterValidUsers = this.filterValidUsers.bind(this);

    this.state = {
      connected: false,
      users: []
    };
  }

  handleLogin(name, location) {
    if(name && location) {
      axios.get('/weather/' + location)
      .then((response) => {
        console.log(response);
        var state = {
          name: name,
          location: location,
          weather: response.data
        }
        this.connect(state);
      });
    }
  }

  connect(state) {
    pubnubClient.subscribe({
      channel: 'espi-birdhouse',
      noheresync: true,
      message: function(m){
       console.log(m);
      },

      presence: function(m) {
       console.log(m);
      },

      state: state
    });
    this.setState({connected: true})
    setTimeout(this.updateUserList.bind(this), 1000);
  }

  componentDidMount() {
    this.updateUserList();
  }

  updateUserList() {
    let self = this;
    pubnubClient.here_now({
      channel: 'espi-birdhouse',
      state: true,
      callback: (data) => {
        console.log(data.uuids);
        this.filterValidUsers(data);
      }
    });
  }

  filterValidUsers(data) {
    let users = data.uuids.filter((item) => {
      return item.state;
    });
    this.setState({users: users});
  }


  render() {
    const { connected, users } = this.state;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <BirdStatus />
          <BirdhouseOverview users={users}  />

          { !connected ?

            <Login onLogin={this.handleLogin} />
            : null
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
