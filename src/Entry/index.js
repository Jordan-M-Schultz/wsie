import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import './Entry.css';
// import star from './img/regular_0.png'
import starArray from './images'
import YELP_LOGO from './img/Yelp_trademark_RGB.png'

class Entry extends Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.restaurantData){
            console.log(this.props.restaurantData);
            const displayAddress = (this.props.restaurantData.location.display_address)
                .map((field, index) => <h6 key={index}>{field}</h6> );
            // console.log(this.props.restaurantData.reviews);
            // const userReviews = this.genUserReviews();
            
            return(
            <div className='entry'>
                <div className = 'name'>
                    <div className = 'col-lg-12'>
                        <p className='header-detail mb-0'>Name</p>
                        <h3>{this.props.restaurantData.name}</h3>
                    </div>
                </div>
                <div className = 'row'>
                    {/* <div className = 'col-lg-2'>
                        <p className='header-detail mb-0'>Phone #</p>
                        <h6>{this.props.restaurantData.display_phone ? this.props.restaurantData.display_phone: ''}</h6>
                        <p className='header-detail mb-0'>Location</p>
                        {displayAddress}
                        <a className = 'yelpLogo' href = {this.props.restaurantData.url} target="_blank" rel="noopener noreferrer">
                            <img alt = 'yelp_logo' src = {YELP_LOGO} />
                        </a>
                        
                    </div> */}
                    <div className = 'col-lg-3'>
                            {this.props.getStars(this.props.restaurantData.rating)}
                            <small><p className='header-detail mb-0'>Based on {this.props.restaurantData.review_count} reviews</p></small>
                            <br></br>
                            
                            <p className='header-detail mb-0'>Price</p>
                            <h6>{this.props.restaurantData.price}</h6>  
                            <a className = 'yelpLogo' href = {this.props.restaurantData.url} target="_blank" rel="noopener noreferrer">
                                <img alt = 'yelp_logo' src = {YELP_LOGO} />
                            </a>    
                            
                            
                    </div>
                    <div className = 'col-lg-9'>
                        <img alt='business' className='entry-img d-inline-block m-1' src={this.props.restaurantData.photos[0]}/>
                        <img alt='business' className='entry-img d-inline-block m-1' src={this.props.restaurantData.photos[1]}/>
                        <img alt='business' className='entry-img d-inline-block m-1' src={this.props.restaurantData.photos[2]}/>
                    </div>
                </div>
            </div>
            );
        }else{ //query not found based on selected parameters
            return(
                <div className='entry'>
                    <div className = 'row'>
                        <div className = 'col-lg-8'>
                            <p className='header-detail mb-0'>Detail</p>
                            <h2>No matching businesses found</h2>
                            <h2>Please alter your search criteria</h2>
                        </div>
                        <div className='col-lg-4'>
                            <p className='header-detail mb-0'></p>
                            <img alt='placeholder' className='entry-img' src='https://via.placeholder.com/350x250.png?text=No+image+available'></img>
                        </div>
                    </div>
                    
                </div>
            );
        }
    }
}

export default Entry;

