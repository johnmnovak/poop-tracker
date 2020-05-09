import React, {Component} from 'react';
import Moment from 'react-moment';

class PoopTimer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      now: Date.now(),
    };
  }
  
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
    
  }
  
  tick() {
    this.setState({
      now: Date.now()
    });
  }
  
  render() {
    if (this.props.lastPoop) {
      return( 
        <p>
          <Moment format='h:mm A ddd DD MMM YYYY'>{this.props.lastPoop}</Moment><br/>
          <span className='timer'><Moment date={this.props.lastPoop} durationFromNow/></span>
        </p>
      )  
    }
    else {
      return(
        <p className='timer'>No Poops Available!</p>
      )
    }
    
  }
  
}

export default PoopTimer;