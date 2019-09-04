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
  genUserReviews = () => this.state.restaurant.reviews.map((x,index) => <Review key={`review${index}`} getStars={this.getStars} review={x}/>)
  
  formatDate = (dateObj) => {
    var ret = [];
    var trackDay = 0;
    var string = "";
    for(let i = 0 ; i < dateObj.length; i++){ //indicies will always be 0-6
      
      if(dateObj[i].day !== trackDay){ //if day is new
        switch(dateObj[i].day){
          case(0):
            ret.push(<p key='Monday' className='mb-0'>Monday</p>);
            break;
          case(1):
            ret.push(<p key='Tuesday' className='mb-0'>Tuesday</p>);
            break;
          case(2):
            ret.push(<p key='Wednesday' className='mb-0'>Wednesday</p>);
            break;
          case(3):
            ret.push(<p key='Thursday' className='mb-0'>Thursday</p>);  
            break;
          case(4):
            ret.push(<p key='Friday' className='mb-0'>Friday</p>);
            break;
          case(5):
            ret.push(<p key='Saturday' className='mb-0'>Saturday</p>);
            break;
          case(6):
            ret.push(<p key='Sunday' className='mb-0'>Sunday</p>);
            break;
        }
        // ret.push(<p className='mb-0 d-inline'><small><strong>{`${dateObj[i].start} - ${dateObj[i].end}`}</strong></small></p>)
        trackDay = dateObj[i].day;
      }
        ret.push(<p key={`${i}`} className='mb-0 d-inline'><small><strong>{`   ${dateObj[i].start} - ${dateObj[i].end}`}</strong></small></p>)
      
      
    }
    return ret;
  }

  
  
  genSidebarData = () => {
    return(
      <div>
        <p className='header-detail mb-0'>Phone #</p>
        <h6>{this.state.restaurant.display_phone ? this.state.restaurant.display_phone : "N/A"}</h6>
        <p className='header-detail mb-0'>Hours</p>
        
        {
          this.formatDate(this.state.restaurant.hours[0].open)
          // this.state.restaurant.hours[0].open.map((x, index) => { 
          //   if(typeof x !== 'undefined' && x.day === x.day + 1)
          //     <p className='d-inline' key={index}> {`${x.start} -  ${x.end}`}</p>
          //   else
          //     <p key={index}> {`${x.start} -  ${x.end}`}</p>
          // }
          
        }
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
        // console.log(this.state.restaurant);
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
            </div>
            {/* <Footer/> */}
          </div>
        );
      }
    }
  }
     
}
export default App;
