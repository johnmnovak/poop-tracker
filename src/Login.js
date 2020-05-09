import React, {Component} from 'react';

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
    
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePwdChange = this.handlePwdChange.bind(this);
  }
  
  handleEmailChange = (e) => {
    this.props.onEmailChange(e.target.value);
  }
  
  handlePwdChange = (e) => {
    this.props.onPwdChange(e.target.value);
  }
  
  
  
  render() {
    return(
      <div className='card login'>
        <h1>Login</h1>
        <form className='loginForm' onSubmit={(e) => {
            this.props.attemptLogin();
            e.preventDefault();
          }}>
          <label>E-Mail: </label>
          <input type='text' id='email' className='inputField' value={this.state.email} onChange={this.handleEmailChange}></input>
          <label>Password: </label>
          <input type='password' id='pwd' className='inputField' value={this.state.pwd} onChange={this.handlePwdChange}></input>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
    
  }
}

export default Login;