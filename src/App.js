import React, {Component} from 'react';
import './App.css';
import './SearchBar';

import SearchBar from './SearchBar';
import Entry from './Entry';
import Review from './Review';
import Footer from './Footer';
import starArray from './Entry/images'

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

  getStars(rating){
    switch(parseFloat(rating)){
        case 0: 
            return(<img alt='yelp icon' src={starArray[0]}></img>);
        case 1:
            return(<img alt='yelp icon' src={starArray[1]}></img>);
        case 1.5:  
            return(<img alt='yelp icon' src={starArray[2]}></img>);
        case 2:
            return(<img alt='yelp icon' src={starArray[3]}></img>);
        case 2.5:
            return(<img alt='yelp icon' src={starArray[4]}></img>);
        case 3: 
            return(<img alt='yelp icon' src={starArray[5]}></img>);
        case 3.5: 
            return(<img alt='yelp icon' src={starArray[6]}></img>);
        case 4: 
            return(<img alt='yelp icon' src={starArray[7]}></img>);
        case 4.5:
            return(<img alt='yelp icon' src={starArray[8]}></img>);
        case 5: 
            return(<img alt='yelp icon' src={starArray[9]}></img>);
        default:
            break;
    }
  }
  genUserReviews = () => this.state.restaurant.reviews.map((x,index) => <Review key={`review${index}`} getStars={this.getStars} review={x}/>)
  
  render() {
    if(this.state.displayError){
      return(
        <div className="Content-wrapper">
          <div className='wrap-center-top'>
            <SearchBar handleRestaurantData={this.handleRestaurantData}/>
          </div>
          <div className='wrap-center-entry'>
            <Entry getStars={this.getStars} restaurantData={null}/>
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
      }else{ //everything went alright, display regular view
        var userReviews = this.genUserReviews();
        return(
          <div className='Content-wrapper'>
            <div className='wrap-center-top'>
                <SearchBar handleRestaurantData={this.handleRestaurantData}/>
                {/* <h5>WSIE?</h5> */}
            </div>
            <div className='wrap-center-entry'>
              <Entry getStars={this.getStars} restaurantData={this.state.restaurant}/>
              
            </div>
            <div className='sidebar'>
              <p>nice</p>
            </div>
            <div className='wrap-center-reviews'>
              {userReviews}
            </div>
            {/* <Footer/> */}
          </div>
        );
      }
    }
  }
     
}
export default App;
