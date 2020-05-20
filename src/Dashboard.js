import React, {Component} from 'react';
import axios from 'axios';
import DogList from './DogList.js';
import CreateDogForm from './CreateDogForm.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      action: 'show_dogs'
    };
    
    this.changeAction = this.changeAction.bind(this);
  }
  
  changeAction = (cmd) => {
    console.log('Changing Dashboard Action: ' + cmd);
    this.setState({
      action: cmd,
    });
    
  }
  
  render() {
    if (this.state.action === 'add_dog') {
      return (
        <div className='dash'>
          
          <CreateDogForm token={this.props.token} handleActionChange={this.changeAction} />
        </div>
      )
    }
    
    else if (this.state.action === 'show_dogs') {
      return (
        <div className='dash'>

          <DogList token={this.props.token} handleActionChange={this.changeAction} />
        </div>
      )
    }
    
    
  }
}

export default Dashboard;