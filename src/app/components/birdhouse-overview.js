import React from 'react';
import Card from 'material-ui/Card'
import CardHeader from 'material-ui/Card'
import Table from 'material-ui/Table';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableRow from 'material-ui/Table/TableRow';
import TableHeader from 'material-ui/Table/TableHeader';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import TableBody from 'material-ui/Table/TableBody';
import pubnubClient from '../helpers/pubnub-client';
import moment from 'moment';

class BirdhouseOverview extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.getPresentUsers = this.getPresentUsers.bind(this);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    let self = this;
    pubnubClient.here_now({
      channel: 'espi-birdhouse',
      state: true,
      callback: (data) => {
        console.log(data.uuids);
        self.getPresentUsers(data);
      }
    });
  }

  getPresentUsers(data) {
    let users = data.uuids.filter((item) => {
      return item.state;
    });
    this.setState({users: users});
  }

  getUserLocalTime(timezone) {

  }

  renderUsers(users) {
    return users.map((user) => {
      const name = user.state.name;
      const location = user.state.location;
      const temperature = user.state.weather.current.temperature;
      const skyText = user.state.weather.current.skytext;
      const timeZone = Number(user.state.weather.location.timezone);
      const time = moment().local().format('hh:mm a');
      const localTime = moment().utcOffset(timeZone).format('hh:mm a');


      return (

        <tr>
          <td>{name}</td>
          <td>{location}</td>
          <td>{skyText}, {temperature}°C</td>
          <td>{localTime}</td>
          <td>{time}</td>
        </tr>
        );
    });
  }

  render() {
    let users = this.state.users;
    const userRows = this.renderUsers(users);
    return (

      <table>
        <thead>
        <tr>
          <th>Birdhouse</th>
          <th>Location</th>
          <th>Weather</th>
          <th>Local Time</th>
          <th>Your Time</th>
        </tr>
        </thead>
        <tbody>
          {userRows}
        </tbody>
      </table>
    );
  }
}

export default BirdhouseOverview;