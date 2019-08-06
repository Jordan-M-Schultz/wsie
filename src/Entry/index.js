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

    render(){
        if(this.props.restaurantData){
            const displayAddress = (this.props.restaurantData.location.display_address)
            .map((field, index) => <h6 key={index}>{field}</h6> );
            return(
            <div className='entry'>
                <div className = 'name'>
                    <div className = 'col-lg-12'>
                        <p className='header-detail mb-0'>Name</p>
                        <h3>{this.props.restaurantData.name}</h3>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-lg-3'>
                        <p className='header-detail mb-0'>Phone #</p>
                        <h6>{this.props.restaurantData.display_phone ? this.props.restaurantData.display_phone: ''}</h6>
                        <p className='header-detail mb-0'>Location</p>
                        {displayAddress}
                        
                    </div>
                    <div className = 'col-lg-4'>
                            {this.getStars(this.props.restaurantData.rating)}
                            <small><p className='header-detail mb-0'>Based on {this.props.restaurantData.review_count} reviews</p></small>
                            {/* <h5>{this.props.restaurantData.review_count}</h5> */}
                            <br></br>
                            
                            <p className='header-detail mb-0'>Price</p>
                            <h6>{this.props.restaurantData.price}</h6>      
                            
                            
                    </div>
                    <div className = 'col-lg-4'>
                        <img alt='business' className='entry-img' src={this.props.restaurantData.image_url}/>
                    </div>
                    
                </div>
                <div className='logo'>
                    <div className = 'col-lg-12'>
                        <a className='yelpLogo' href={this.props.restaurantData.url}>
                            <img alt='yelpLogo' src={YELP_LOGO}></img>    
                        </a>      
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
                            <img className='entry-img' src='https://via.placeholder.com/350x250.png?text=No+image+available'></img>
                        </div>
                    </div>
                    
                </div>
            );
        }
    }
}

export default Entry;

