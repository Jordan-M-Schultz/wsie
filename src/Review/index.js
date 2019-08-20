import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import './Review.css';

class Review extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        // var test = (this.props.review.user.profile_url) ? this.props.review.user.profil_url : 'https://via.placeholder.com/350x250.png?text=No+image+available'
        return(
            <div className='review' key={this.props.review.user.name}>
                <div className = 'row'>
                    <div className = 'col-lg-4'>
                        <p>{this.props.review.user.name}</p>
                        <a className = 'thumbnail' 
                            href = {(this.props.review.user.profile_url) ? this.props.review.user.profil_url : 'https://via.placeholder.com/350x250.png?text=No+image+available'}>
                            <img alt = {`userLogo${this.props.review.user.name}`} src = {this.props.review.user.image_url} />
                        </a>
                    </div>
                    <div className = 'col-lg-8'>
                        {this.props.getStars(this.props.review.rating)}
                        <p>{this.props.review.time_created.split(' ')[0]}</p>
                        <p className = 'mb-0'>{this.props.review.text}</p>
                        <a href = {this.props.review.url} target="_blank" rel="noopener noreferrer"> Read More</a>
                    </div>                                                        
                </div>
            </div>
        );
    }
}
export default Review;

