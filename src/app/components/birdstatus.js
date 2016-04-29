import React from 'react';

class BirdStatus extends React.Component {

  render() {
    return (
      <div className="current">
      <img src="images/flying.jpg" className="bird"/>
      <div className="current__status">
        <h2>The bird is currently
        <span className="status">in flight</span></h2>
      </div>
    </div>
    );
  }
}

export default BirdStatus;