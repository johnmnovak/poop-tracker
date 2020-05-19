import React, {Component} from 'react';

class TopBar extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    if (this.props.logged_in) {
      return (
        <div id='topBarLogged'>
          <span id='topLeftMenu' onClick={this.props.toggleSideBar}><h2>Menu</h2></span>
          <h1>The PoopTracker</h1>
          <span id='topRightMenu'></span>
        </div>
      )
    }
    
    else {
      return (
        <div id='topBar'>
          <h1>The PoopTracker</h1>
        </div>
      ) 
    }
    
  }
}

export default TopBar;