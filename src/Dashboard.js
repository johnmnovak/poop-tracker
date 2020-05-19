import React, {Component} from 'react';
import axios from 'axios';
import DogList from './DogList.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className='dash'>
        
        <DogList token={this.props.token}/>
      </div>
    )
  }
}

export default Dashboard;