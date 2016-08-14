import React from 'react';

class Wizard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children[this.props.current_index]}
      </div>
    );
  }
}

export default Wizard;