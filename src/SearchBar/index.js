import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import './SearchBar.css';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            restaurantType:  '',
            location: '',
            error: false
        }
        // this.handleChange = this.handleChange.bind(this); //this.handleChange is bound to this to call later
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit = (event) => {
        if(!this.state.restaurantType || !this.state.location){
            this.setState({error:true});
        }else{
            fetch(`/search?term=${this.state.restaurantType}&location=${this.state.location}`)
            .then(response => response.json())
            .then(data => this.props.handleResult(data));
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

