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
    //this.dogClick = this.dogClick.bind(this);
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
        dogsList: response.data.map(dog => ({
          ...dog,
          clicked: false,
        })),
      });
        console.log('doglist: ');
        console.log(this.state.dogsList);
    })
    .catch((error) => {
      console.log('ERROR: ');
      console.log(error);
    });
    
  }
          
  dogClick = (id) => {
      let dogs = this.state.dogsList;
      console.log('dog clicked - id: ' + id);
      dogs.forEach( (dog) => {
        if (dog.dogID === id) {
          if (dog.clicked) {dog.clicked = false}
          else {
            console.log('clicked set to true');
            dog.clicked = true;
          }
          
        }
        else {
          console.log('clicked set to false');
          dog.clicked = false;
        }
      });
    
      this.setState({
        dogsList: dogs
      });
    
    }
          
          
          
  
  render() {
    
    return(
      <div id='dogListWrapper'>
        <h2>My Pack: </h2>
        <div className='dogList'>
          {this.state.dogsList.map((dog) => (
              <Dog key={dog.dogID} id={dog.dogID} name={dog.name} sex={dog.sex} breed={dog.breed} weight={dog.weight} age={dog.age} token={this.props.token} clicked={dog.clicked} onDogClick={this.dogClick}/>))}
        </div>
      </div>
    )
  }
  
}

export default DogList;