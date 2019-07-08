import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import './SearchBar.css';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText:  '',
            returnedText: '',
            returnObj: {}
        }
        this.handleChange = this.handleChange.bind(this); //this.handleChange is bound to this to call later
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({searchText: event.target.value});
    }
    handleSubmit(event){
        fetch(`/search?zip=${this.state.searchText}`)
        .then(response => response.json())
        // .then(data => this.setState({returnObj:data}));
        .then(data => console.log(data));
        event.preventDefault();
    }

    render(){
        return(
            <div className = 'SearchBar'>
                <form className='SearchBar' onSubmit={this.handleSubmit}>
                    <button><i className="fas fa-search"></i></button>
                    <input 
                        type="text" className="form-control " placeholder="Search..." 
                        value = {this.state.searchText} onChange={this.handleChange}
                    />    
                </form>
            </div>
        );
    }
}

export default SearchBar;

