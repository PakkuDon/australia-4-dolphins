import React from 'react';

class TopStatesList extends React.Component {
  render() {
    var stateItems = this.props.states.map((state) => {
      return (
        <li key={state}>{state}</li>
      );
    });

    return (
      <div>
        <h3>Top States</h3>
        <ol>
          {stateItems}
        </ol>
      </div>
    );
  }
}

export default TopStatesList;