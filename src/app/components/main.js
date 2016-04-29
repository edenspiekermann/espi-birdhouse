import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './login';
import BirdhouseOverview from './birdhouse-overview';


const muiTheme = getMuiTheme(theme);

class Main extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      connected: false,
    };
  }



  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <Login />

          <div class="past">
            <h3>Currently available locations</h3>
            <BirdhouseOverview />
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;