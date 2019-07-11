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
      greeting: '',
      restaurant: {
      }
      
    };
    
  }

  handleRestaurantData = (data) => {
    let min = 0;
    let max = data.length;
    const random = Math.floor(Math.random()*(max-min+1)+min);
    console.log(data);
    this.setState({restaurant:data[random]});
   
  }


  render() {
    if(Object.entries(this.state.restaurant).length === 0 && this.state.restaurant.constructor === Object)
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
    else{
      // const displayAddress = (this.state.restaurant.location.display_address)
      //   .map((field, index) => <h5 key={index}>{field}</h5> );
      
      return(
        <div className='Content-wrapper'>
          <div className='header'>
          </div>
          <div className='wrap-center-top'>
              <SearchBar handleResult={this.handleResult}/>
              <h5>WSIE?</h5>
          </div>
          <div className='wrap-center-entry'>
            <Entry restaurantData={this.state.restaurant}/>
          </div>
          
          
        </div>
      );
    }
  }
}
export default App;
