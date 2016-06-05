import React from 'react';

class InstructionsPage extends React.Component {
  render() {
    return (
      <div>
        <h1 className='text-center'>Ready to film your masterpiece?</h1>
        <p>
          <img src='../images/dolphin icon.png' className='icon' /> Tell Mike your name and where you're from.
        </p>
        <p>
          <img src='../images/dolphin icon.png' className='icon' /> Then tell him clearly why he should change the law to end dolphin captivity in NSW.
        </p>
        <p>
          <img src='../images/dolphin icon.png' className='icon' /> Wear a dolphin suit, film in the pool, talk in Dolphinese... Do what it takes to get Mike's attention
        </p>
        <p>
          <img src='../images/dolphin icon.png' className='icon' /> Click 'Next' to start recording!
        </p>
      </div>
    );
  }
}

export default InstructionsPage;