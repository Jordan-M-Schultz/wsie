import React, {Component} from 'react';
import './App.css';
import './components/SearchBar';

import SearchBar from './components/SearchBar';
import Entry from './components/Entry';
import Review from './components/Review';
import Footer from './components/Footer';
import Map from './components/Map';
import starArray from './components/Entry/images'
// import { isFulfilled } from 'q';
// import { exportDefaultSpecifier } from '@babel/types';

class App extends Component {
  constructor(props) {
    super(props); //class constructors must call super in ES6 if they are a subclass
    this.state = {
      name: '',
      displayError: false,
      restaurant: {}
    };
  }

  /*
    Function expressions to avoid polution of the global namespace
  */

  handleRestaurantData = (data) => { //called from handleSubmit in SearchBar 
    if(data){
      this.setState({
        restaurant: data,
        displayError: false
      });
    }else{
      this.setState({displayError: true});
    }
  } 

  //insert graphic based on numerical value
  getStars = (rating) => {
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
  
  //Create user reviews
  genUserReviews = () => this.state.restaurant.reviews.map((x,index) => <Review key={`review${index}`} getStars={this.getStars} review={x}/>)
  
  formatDate = (dateObj) => {
    var ret = [];
    var trackDay = -1;
    var abbr = '';
    for(let i = 0 ; i < dateObj.length; i++){ //indicies will always be 0-6
      if(dateObj[i].day !== trackDay){ //if day has not been encountered
        switch(dateObj[i].day){
          case(0):
          abbr = 'Mon ';
            break;
          case(1):
          abbr = 'Tue ';
            break;
          case(2):
          abbr = 'Wed ';
            break;
          case(3):
          abbr = 'Thu ';
            break;
          case(4):
          abbr = 'Fri ';
            break;
          case(5):
          abbr = 'Sat ';
            break;
          case(6):
          abbr = 'Sun ';
            break;
          default:
            break;
        }
        abbr += `${this.translateTime(dateObj[i].start)} - ${this.translateTime(dateObj[i].end)}`;
        if(dateObj[i+1]!== undefined && dateObj[i+1].day !== dateObj[i].day){
          ret.push(<p key={`${i}`} className='mb-0'><small><strong>{`${abbr}`}</strong></small></p>);
        }
        trackDay = dateObj[i].day;
      }else{
        abbr += `, ${this.translateTime(dateObj[i].start)} - ${this.translateTime(dateObj[i].end)}`;
        ret.push(<p key={`${i}`} className='mb-0'><small><strong>{`${abbr}`}</strong></small></p>);
        abbr = '';
      }
       
    }
    return ret;
  }

  //convert military time to standard time 
  translateTime = (time) => {
    //0000 to 2400
    let hours = time.substr(0,2);
    let minutes = time.substr(2,2);
    let converted = '';
    let abbr = '';
    if(hours === 0 || hours === 24){
      converted+=12;
      abbr = 'am'
    }else if(hours < 12){
      converted += hours;
      abbr = 'am';
    }else{
      converted += (parseInt(hours) - 12)
      abbr = 'pm';
    }
    return converted + ':' + minutes + abbr;
  }
  
  genSidebarData = () => {
    const displayAddress = (this.state.restaurant.location.display_address)
                .map((field, index) => <h6 key={index}>{field}</h6> );
    return(
      <div>
        <p className='header-detail mb-0'>Phone #</p>
        <h6>{this.state.restaurant.display_phone ? this.state.restaurant.display_phone : "N/A"}</h6>
        <p className='header-detail mb-0'>Hours</p>
        {this.state.restaurant.hours ? this.formatDate(this.state.restaurant.hours[0].open) : "N/A"}
        <br></br>
        {displayAddress}
      </div>
    );
  }

  render() {
    console.log('App.js render called');
    if(this.state.displayError){
      return(
        <div className="Content-wrapper">
          <div className='wrap-center-top'>
            <SearchBar handleRestaurantData={this.handleRestaurantData}/>
          </div>
          <div className='wrap-center-entry'>
            <Entry getStars={this.getStars} restaurantData={null}/>
          </div>
          <div></div>
          <div className='footer'>
          </div>
        </div>
      );
    }else{
      console.log('No display error');
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
        return(
          <div className='Content-wrapper'>
            <div className='wrap-center-top'>
                <SearchBar handleRestaurantData={this.handleRestaurantData}/>
                {/* <h5>WSIE?</h5> */}
            </div>
            <div className='wrap-center-entry'>
              <Entry getStars={this.getStars} restaurantData={this.state.restaurant}/>
              <div className='sidebar'>
                {this.genSidebarData()}
              </div>
              <div className='reviews'>
                {this.genUserReviews()}
              </div>
              <div className='map'>
                <Map address={this.state.restaurant.location}/>
              </div>
            </div>
            <Footer/>
          </div>
        );
      }
    }
  }
     
}
export default App;
