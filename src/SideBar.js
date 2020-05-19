import React, {Component} from 'react';

class SideBar extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const classes = ['sideBar'];
    if (this.props.show) {
      classes.push('show');
    }
    
    return(
      <div className={classes.join(' ')}>
        <h1>SideBar: </h1>
        <h3>ID: {this.props.id}</h3>
        <h3>Name: {this.props.firstName} {this.props.lastName}</h3>
        <h3>Email: {this.props.email}</h3>
        <h3>Account Status: {this.props.active}</h3>
        <br></br>
        <button onClick={this.props.logOut}>Logout</button>
      </div>
    )
  }
}

export default SideBar;