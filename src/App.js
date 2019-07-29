import React, {Component} from 'react';
import './App.css';
import './SearchBar';
import SearchBar from './SearchBar';
import Entry from './Entry';

class App extends Component {
  constructor(props) {
    super(props); //class constructors must call super in ES6 if they are a subclass
    this.state = {
      name: '',
      displayError: false,
      restaurant: {}
    };
  }

  handleRestaurantData = (data) => {
    if(data){
      this.setState({restaurant:data});
      this.setState({displayError: false});
    }else{
      this.setState({displayError: true});
    }
  } 
  
  render() {
    if(this.state.displayError){
      console.log('implement'); 
    }else{
      if(Object.entries(this.state.restaurant).length === 0 && this.state.restaurant.constructor === Object){
        return(
          <div className='App'>
            <div className='header'>
              <h1>What Should I Eat?</h1>
            </div>
            <div className='wrap-center'>
              <SearchBar handleRestaurantData={this.handleRestaurantData}/>
            </div>
          </div>
        );
      }else{
        // const displayAddress = (this.state.restaurant.location.display_address)
        //   .map((field, index) => <h5 key={index}>{field}</h5> );
        console.log('first');
        return(
          <div className='Content-wrapper'>
            <div className='header'>
            </div>
            <div className='wrap-center-top'>
                <SearchBar handleRestaurantData={this.handleRestaurantData}/>
                {/* <h5>WSIE?</h5> */}
            </div>
            <div className='wrap-center-entry'>
              <Entry restaurantData={this.state.restaurant}/>
            </div>
          </div>
        );
      }
    }
  }
     
}
export default App;
