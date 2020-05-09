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
      lastPoop: ''
    };
    
    console.log(this.props.age);
    this.getSex = this.getSex.bind(this);
    this.getAge = this.getAge.bind(this);
    this.getLatestPoop = this.getLatestPoop.bind(this);
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
  
  
  render() {
    return(
      <tr className='dogCard' onClick={()=> alert("Dog's Page!")}>
        <td>{this.state.name}</td>
        <td>{this.state.sex}</td>
        <td>{this.props.breed}</td>
        <td>{this.props.weight} lbs</td>
        <td>{this.state.age}</td>
        <td><PoopTimer lastPoop={this.state.lastPoop}/></td>
        <td><button onClick={()=> alert("Add Poop!")}>Add Poop</button></td>
      </tr>
    )
  }
  
  
}

export default Dog;