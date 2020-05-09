import React, {Component} from 'react';

class TopBar extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div id='topBar'>
        <h1>The PoopTracker</h1>
      </div>
    )
  }
}

export default TopBar;