import React, {Component} from 'react';
import axios from 'axios';
import DogList from './DogList.js';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      active: null,
    };
    
    this.getUserInfo = this.getUserInfo.bind(this);
  }
  
  componentDidMount() {
    this.getUserInfo();
  }
  
  getUserInfo = () => {
    let token = this.props.token;
    //console.log(token);
    axios.post('http://localhost/api/get_user_info.php', {
    }, {
     headers: {
       Authorization: 'Bearer ' + token,
     } 
    })
    .then((response) => {
      //console.log('RESPONSE: ');
      //console.log(response);
      this.setState({
        id: response.data.id,
        firstName: response.data.firstname,
        lastName: response.data.lastname,
        email: response.data.email,
        active: response.data.active
      });
    })
    .catch((error) => {
      console.log('ERROR: ');
      console.log(error);
    });
  }
  
  render() {
    return (
      <div className='dash'>
        <h1>Dashboard</h1>
        <h3>ID: {this.state.id}</h3>
        <h3>Name: {this.state.firstName} {this.state.lastName}</h3>
        <h3>Email: {this.state.email}</h3>
        <h3>Account Status: {this.state.active}</h3>
        <br></br>
        <DogList token={this.props.token}/>
        <button onClick={this.props.logOut}>Logout</button>
      </div>
    )
  }
}

export default Dashboard;