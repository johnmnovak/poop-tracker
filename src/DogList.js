import React, {Component} from 'react';
import axios from 'axios';

import Dog from './Dog.js';


class DogList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dogsList: [],
    };
    
    this.getDogs = this.getDogs.bind(this);
  }
  
  componentDidMount() {
    this.getDogs();
  }
  
  getDogs = () => {
    let token = this.props.token;
    //console.log(token);
    axios.post('http://localhost/api/get_dogs.php', {
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
        dogsList: response.data.map((dog) => <Dog key={dog.dogID} id={dog.dogID} name={dog.name} sex={dog.sex} breed={dog.breed} weight={dog.weight} age={dog.age} token={this.props.token}/>)
      });
    })
    .catch((error) => {
      console.log('ERROR: ');
      console.log(error);
    });
    
  }
  
  render() {
    return(
      <div>
        <h2>My Pack: </h2>
        <table className='dogList'>
          <thead><tr><th>Name</th><th>Sex</th><th>Breed</th><th>Weight</th><th>Age</th><th>Last Poop</th></tr></thead>
          <tbody>{this.state.dogsList}</tbody>
        </table>
      </div>
    )
  }
  
}

export default DogList;