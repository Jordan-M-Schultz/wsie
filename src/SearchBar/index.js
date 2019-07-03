import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import './SearchBar.css';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            searchText:  ''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({searchText: event.target.value});
    }
    render(){
        return(
            <div className = 'SearchBar'>
                <div className ='input-group md-form form-sm'>
                    <div className='input-group-prepend'>
                        <span className=' input-group-text'>
                            <i className='fas fa-search text-white'></i>
                        </span>
                    </div>
                    <input 
                        type="text" className="form-control " placeholder="Search..." 
                        value = {this.state.searchText} onChange={this.handleChange}
                    />
                </div>
                <p>{this.state.searchText}</p>
            </div>
        );
    }
}

export default SearchBar;

