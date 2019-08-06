import React, {Component} from 'react';
import './App.css';
import './SearchBar';

import SearchBar from './SearchBar';
import Entry from './Entry';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props); //class constructors must call super in ES6 if they are a subclass
    this.state = {
      name: '',
      displayError: false,
      restaurant: {}
    };
  }

  //called from handleSubmit in SearchBar
  handleRestaurantData = (data) => {
    if(data){
      this.setState({
        restaurant: data,
        displayError: false
      });
    }else{
      this.setState({displayError: true});
    }
  } 
  
  render() {
    if(this.state.displayError){
      return(
        <div className="Content-wrapper">
          <div className='wrap-center-top'>
            <SearchBar handleRestaurantData={this.handleRestaurantData}/>
          </div>
          <div className='wrap-center-entry'>
            <Entry restaurantData={null}/>
          </div>
          <div className='footer'>
          </div>
        </div>
      );
    }else{
      if(Object.entries(this.state.restaurant).length === 0 && this.state.restaurant.constructor === Object){ //if user hasn't typed anything
        return(
          <div className='Content-wrapper'>
            <div className='logoContent'>
              <h1>What Should I Eat?</h1>
            </div>
            <div className='wrap-center'>
              <SearchBar handleRestaurantData={this.handleRestaurantData}/>
            </div>
            <Footer/>


            

          </div>
        );
      }else{
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
            <Footer/>
          </div>
        );
      }
    }
  }
     
}
export default App;
