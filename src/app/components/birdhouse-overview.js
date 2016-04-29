import React from 'react';
import moment from 'moment';

class BirdhouseOverview extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  renderUsers(users) {
    return users.map((user, index) => {
      const name = user.state.name;
      const location = user.state.location;
      const temperature = user.state.weather.current.temperature;
      const skyText = user.state.weather.current.skytext;
      const timeZone = Number(user.state.weather.location.timezone);
      const time = moment().local().format('hh:mm a');
      const localTime = moment().utcOffset(timeZone).format('hh:mm a');


      return (

        <tr key={"row" + index}>
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
    let users = this.props.users;
    const userRows = this.renderUsers(users);
    return (
      <div className="past">
        <h3>Currently available locations</h3>
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
      </div>
    );
  }
}

export default BirdhouseOverview;