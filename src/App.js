import React, {Component} from 'react';
import './App.css';
import './SearchBar';
import SearchBar from './SearchBar';

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

  handleResult = (data) => {
    this.setState({restaurant:data});
    console.log(data);
   
  }


  render() {
    if(Object.entries(this.state.restaurant).length === 0 && this.state.restaurant.constructor === Object)
      return(
        <div className='App'>
          <div className='header'>
            <h1>What Should I Eat?</h1>
          </div>
          <div className='wrap-center'>
            <SearchBar handleResult={this.handleResult}/>
          </div>
        </div>
      );
    else{
      const displayAddress = (this.state.restaurant.location.display_address).map((field, index) =>
        <h5 key={index}>{field}</h5>
      );
      return(
        
        <div className='App'>
          <div className='header'>
            
          </div>
          <div className='wrap-center-top'>
              <SearchBar handleResult={this.handleResult}/>
              <h5>WSIE?</h5>
          </div>
          <div className='wrap-center-entry'>
            <div className = 'row'>
              <div className = 'col-lg-12'>
                <p className='header-detail mb-0'>Name</p>
                <h3>{this.state.restaurant.name}</h3>
              </div>
            </div>
            <div className = 'row'>
              <div className = 'col-lg-6'>
                
                <p className='header-detail mb-0'>Phone #</p>
                <h5>{this.state.restaurant.display_phone}</h5>
                <p className='header-detail mb-0'>Location</p>
                {displayAddress}
              </div>
              <div className = 'col-lg-6'>
                <p className='header-detail mb-0'>Rating</p>
                <h5>{this.state.restaurant.rating}</h5>
                <p className='header-detail mb-0'>Review Count</p>
                <h5>{this.state.restaurant.review_count}</h5>
                <p className='header-detail mb-0'>Price</p>
                <h5>{this.state.restaurant.price}</h5>      
                <p className='header-detail mb-0'>Yelp Link</p>
                <a href={this.state.restaurant.url}>Go</a>      
              </div>
            </div>
            <img alt='business' className='entry-img' src={this.state.restaurant.image_url}/>
          </div>
          
          
        </div>
      );
    }
  }
}
export default App;
