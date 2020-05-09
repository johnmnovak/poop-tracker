import React, {Component} from 'react';
import './App.css';
import Login from './Login.js';
import Dashboard from './Dashboard.js';
import TopBar from './TopBar.js';
import axios from 'axios';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      email: '',
      pwd: '',
      jwt: document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1")
    }
    
    this.changeEmail = this.changeEmail.bind(this);
    this.changePwd = this.changePwd.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);
    this.setCookie = this.setCookie.bind(this);
    this.validateCookie = this.validateCookie.bind(this);
    this.clearCookie = this.clearCookie.bind(this);
    this.logOut = this.logOut.bind(this);
  }
  
  
  componentDidMount () {
    if (this.state.jwt !== '') {
      this.validateCookie(this.state.jwt);
    }
  }
  
  
  changeEmail = (e) => {
    this.setState({email: e})
  }
  
  changePwd = (e) => {
    this.setState({pwd: e})
  }
  
  attemptLogin = () => {
    axios.post('http://localhost/api/login.php', {
      email: this.state.email,
      password: this.state.pwd
    })
    .then((response) => {
      //console.log('RESPONSE: ');
      //console.log(response);
      this.setCookie('jwt', response.data.jwt, response.data.expireAt);
      this.setState({logged_in: true, pwd: ''});
    })
    .catch((error) => {
      console.log('ERROR: ');
      console.log(error);
    });
  }
  
  setCookie = (cname, cvalue, cexpire) => {
    //console.log('setting cookie');
    var d = new Date(cexpire);
    var expiry = d.toUTCString();
    var ck = cname + '=' + cvalue + ';expires=' + expiry + ';path=/';
    //console.log(ck);
    document.cookie = ck;
    this.setState({jwt: document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1")});
  }
  
  validateCookie = (ck) => {
    axios.post('http://localhost/api/validate_token.php', {
    }, {
      headers: {
        Authorization: 'Bearer ' + ck,
      }
    })
    .then((response) => {
      //console.log('RESPONSE: ');
      //console.log(response);
      this.setState({logged_in: true, pwd: ''});
    })
    .catch((error) => {
      console.log('ERROR: ');
      console.log(error);
    });
  }
  
  clearCookie = (cname) => {
    document.cookie = cname + '=' 
  }
  
  logOut = () => {
    console.log('logging out');
    this.setState({
      logged_in: false,
      email: '',
      pwd: '',
      jwt: ''
    });
    this.clearCookie('jwt');
  }
  
  
  // IF ELSE TREE NEEDS TO BE CHANGED
  render() {
    if (this.state.logged_in) {
      return(
        <div className='AppContainer'>
          <TopBar />
          <Dashboard token={this.state.jwt} logOut={this.logOut}/>
        </div>
      ) 
    }
    else if (this.state.jwt) {
      this.validateCookie(this.state.jwt);
      return(
        <div className='AppContainer'>
          <TopBar />
        </div>
      )
    }
    else {
      return(
        <div className='AppContainer'>
          <TopBar />
          <Login
            onEmailChange={this.changeEmail}
            onPwdChange={this.changePwd}
            attemptLogin={this.attemptLogin}
            />
        </div>
      ) 
      
    }
    
  }
}

export default App;
