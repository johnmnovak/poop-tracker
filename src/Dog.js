import React, {Component} from 'react';
import PoopTimer from './PoopTimer.js';
import axios from 'axios';
import Moment from 'react-moment';

var moment = require('moment');

class Dog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: this.props.name,
      sex: '',
      breed: this.props.breed,
      weight: this.props.weight,
      age: '',
      lastPoop: '',
    };
    
    //console.log(this.props.age);
    this.getSex = this.getSex.bind(this);
    this.getAge = this.getAge.bind(this);
    this.getLatestPoop = this.getLatestPoop.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }
  
  componentDidMount = () => {
    this.getSex();
    this.getAge();
    this.getLatestPoop();
  }
  
  getSex = () => {
    this.setState({
      sex: this.props.sex === 0 ? 'Female' : 'Male'
    });
  }
  
  getAge = () => {
    const bd = new Date(Date.parse(this.props.age));
    let elapsed = Date.now() - bd;
    var ageYrs = Math.floor(elapsed/31557600000);
    this.setState({
      age: ageYrs + ' Years'
    });
  }
  
  getLatestPoop = () => {
    let dogID = this.state.id;
    let token = this.props.token;
    
    axios.post('http://localhost/api/get_latest_poop.php', {
      dogID: dogID
    }, {
     headers: {
       Authorization: 'Bearer ' + token,
     } 
    })
    .then((response) => {
      //console.log('RESPONSE: ');
      //console.log(response);
      console.log(response.data);
      this.setState({
        lastPoop: response.data.last_poop
      });
    })
    .catch((error) => {
      console.log('ERROR: ');
      console.log(error);
    });
  }
  
  handleClick = (e) => {
    this.props.onDogClick(this.props.id);
  }
  
  handleAdd = (e) => {
    let dogID = this.state.id;
    let token = this.props.token;
    e.stopPropagation();
    
    if (window.confirm('Please confirm poop.')) {
      axios.post('http://localhost/api/add_poop_now.php', {
        dogID: dogID
      }, {
       headers: {
         Authorization: 'Bearer ' + token,
       } 
      })
      .then((response) => {
        //console.log('RESPONSE: ');
        //console.log(response);
        console.log(response.data);
        this.getLatestPoop();
      })
      .catch((error) => {
        console.log('ERROR: ');
        console.log(error);
      });
    
      
    }
    
  }
  
  
  render() {
    if (this.props.clicked) {
      return(
        <>
        <div className='dogCard' onClick={this.handleClick}>
          <h3>{this.state.name}</h3>
          <PoopTimer lastPoop={this.state.lastPoop}/>
          <button onClick={this.handleAdd}>Add Poop</button>
        </div>
        <div className='dogInfoPanel'>
          <p>Sex: {this.state.sex}</p>
          <p>Breed: {this.state.breed}</p>
          <p>Weight: {this.state.weight}</p>
          <p>Age: {this.state.age}</p>
        </div>
        
          
        
        
        </>
      )
    }
    else {
      return(
        <div className='dogCard' onClick={this.handleClick}>
          {this.state.name}
          <PoopTimer lastPoop={this.state.lastPoop}/>
          <button onClick={this.handleAdd}>Add Poop</button>
        </div>
      )
    }
    
  }
  
  
}

export default Dog;