import React, {Component} from 'react';

import axios from 'axios';

class CreateDogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogName: '',
      breed: '',
      sex: '',
      weight: '',
      birthday: '',
      breedList: []
    };
    
    this.handleBack = this.handleBack.bind(this);
    
    this.handleDogNameChange = this.handleDogNameChange.bind(this);
    this.handleBreedChange = this.handleBreedChange.bind(this);
    this.sexChange = this.sexChange.bind(this);
    this.weightChange = this.weightChange.bind(this);
    this.birthdayChange = this.birthdayChange.bind(this);
    
    this.getBreedList = this.getBreedList.bind(this);
  }
  
  componentDidMount () {
    this.getBreedList();
  }
  
  handleBack = () => {
    this.props.handleActionChange('show_dogs');
  }
  
  handleDogNameChange = (e) => {
    this.setState({
      dogName: e.target.value,
    });
    console.log(this.state);
  }
  
  handleBreedChange = (e) => {
    this.setState({
      breed: e.target.value,
    });
  }
  
  sexChange = (e) => {
    this.setState({
      sex: e.target.value,
    });
  }
  
  weightChange = (e) => {
    this.setState({
      weight: e.target.value
    });
  }
  
  birthdayChange =(e) => {
    this.setState({
      birthday: e.target.value
    });
  }
  
  getBreedList = () => {
    let token = this.props.token;
    axios.post('http://localhost/api/get_breed_list.php', {
    }, {
      headers: {
        Authorization: 'Bearer ' + token,
      }
    })
    .then((response) => {
      //console.log('RESPONSE: ');
      //console.log(response);
      this.setState({
        breedList: response.data
      });
      console.log(this.state.breedList);
    })
    .catch((error) => {
      console.log('ERROR: ');
      console.log(error);
    });
  }
  
  render() {
    return(
      <div id='dogListWrapper'>
        <h2>Add Dog:</h2>
        <form id='createDogForm' onSubmit={(e) => {
            this.props.addDog();
            e.preventDefault();
          }}>
          <div className='formRow'>
            <label>Name: </label>
            <input type='text' id='dogName' className='inputField' value={this.state.dogName} onChange={this.handleDogNameChange}></input>
          </div>
          
          <div className='formRow'>
            <label>Breed: </label>
            <select name='breed' id='breed' value={this.state.breed} onChange={this.handleBreedChange}>
              {this.state.breedList.map( (breed) => (
                <option value={breed.breedID}>{breed.breedName}</option>
              ))}
            </select>
          </div>
          
          <div className='formRow'>
            <label>Sex: </label>
            <input type='radio' id='male' name='sex' value='1' checked={this.state.sex === '1'} onChange={this.sexChange}></input>
            <label for='male'>Male</label>
            <input type='radio' id='female' name='sex' value='0' checked={this.state.sex === '0'} onChange={this.sexChange}></input>
            <label for='female'>Female</label>
          </div>
          
          <div className='formRow'>
            <label>Weight: </label>
            <input type='number' id='weight' value={this.state.weight} onChange={this.weightChange}></input>
          </div>
          
          <div className='formRow'>
            <label>Birthday: </label>
            <input type='date' id='birthday' value={this.state.birthday} onChange={this.birthdayChange}></input>
          </div>
          
          <button type='submit' id='addDogButton'>Add New Dog</button>
        </form>
        
          <button onClick={this.handleBack}>Back</button>
      </div>
    );
    
  }
}


export default CreateDogForm;