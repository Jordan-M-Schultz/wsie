import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import './SearchBar.css';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            restaurantType:  '',
            location: '',
            restaurantArray: [],
            error: false,
            searchDidChange: false
        }
        // this.handleChange = this.handleChange.bind(this); //this.handleChange is bound to this to call later
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        this.setState({searchDidChange:true});
        
    }
    handleSubmit = (event) => {
        if(this.state.searchDidChange){ //If the user has never searched before
            if(!this.state.restaurantType || !this.state.location){
                this.setState({error:true});
            }else{
                fetch(`/search?term=${this.state.restaurantType}&location=${this.state.location}`)
                .then(response => response.json())
                .then(function(data){
                    console.log(data);
                    this.setState({restaurantArray:data});
                    this.props.handleRestaurantData(data);
                });
                // .then(data => this.props.handleRestaurantData(data));
            }
            this.setState({searchDidChange:false});
        }else{ //user didnt change criteria, select another 
            console.log("fail");
        }
        
        event.preventDefault();
    }
    

    render(){
        return(
            <div className = 'SearchBar'>
                <form className='SearchBar input-group' onSubmit={this.handleSubmit}>
                    <button><i className="fas fa-search"></i></button>
                    <input 
                        name = "restaurantType" 
                        type="text" 
                        className= {`form-control ${this.state.error ? 'error' : ''}`}
                        placeholder="Find ..." 
                        value = {this.state.restaurantType} 
                        onChange={this.handleChange}
                    />
                    <input 
                        name = "location" 
                        type="text" 
                        className={`form-control ${this.state.error ? 'error' : ''}`}
                        placeholder="Near ..." 
                        value = {this.state.location} 
                        onChange={this.handleChange}
                    />
                </form>
            </div>
        );
    }
}

export default SearchBar;

