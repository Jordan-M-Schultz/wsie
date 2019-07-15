import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
import './SearchBar.css';

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            restaurantType:  '',
            location: '',
            price: ["","","",""],
            openNow: false,
            error: false,
        }
        // this.handleChange = this.handleChange.bind(this); //this.handleChange is bound to this to call later
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleClick = (event, pos="") => {
        if(pos !== ""){ //adjusting for price
            let priceCP = [...this.state.price]; // create the copy of state array
            if(priceCP[pos-1] === "") //remember, position index starts at 1, have to shift left
                priceCP[pos-1] = pos;
            else
                priceCP[pos-1] = "";
            this.setState({price: priceCP}); 
        }else{
            this.setState({[event.target.name] : event.target.value});
            console.log(this.state.openNow);
        }
        
    }


    handleSubmit = (event) => {
        if(!this.state.restaurantType || !this.state.location){
            this.setState({error:true});
        }else{
            var fetchURI = `/search?term=${this.state.restaurantType}&location=${this.state.location}`;
            var priceURI = this.state.price.filter(Boolean);
            if(priceURI)
                fetchURI += `&price=${priceURI}`;
            console.log('sending', fetchURI);
            
            fetch(fetchURI)
            .then(response => response.json()) //result is response, convert to json
            .then(data => { //data is json, 
                console.log('passing in', data);
                this.props.handleRestaurantData(data);
            });
        }
        
        event.preventDefault();
    }
    

    render(){
        return(
            <div className = 'SearchBar'>
                <form className='SearchBar input-group' onSubmit={this.handleSubmit}>
                    <button className = 'filterBtn' type="button" aria-expanded="false" data-toggle="collapse" data-target="#filter"><i className="fas fa-filter"></i></button>
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
                        onChange={this.handleChange }
                    />

                </form>
                
                <div id = 'filter' className = 'collapse form-group'>
                    <div className="form-check">
                        <div className = "row">
                            <ul className = 'costList col-lg-3'>
                                <h6>Price</h6>
                                <li>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="price"
                                        defaultChecked={false}
                                        onClick={(event) => this.handleClick(event, 1)} //start at position 1 because yelp API requires index start
                                    />
                                    <label className="form-check-label">$</label>
                                </li>
                                <li>
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        name="price" 
                                        defaultChecked = {false}
                                        onClick={(event) => this.handleClick(event, 2)}
                                    />
                                    <label className="form-check-label">$$</label>        
                                </li>
                                <li>
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        name="price" 
                                        defaultChecked = {false}
                                        onClick={(event) => this.handleClick(event, 3)}
                                    />
                                    <label className="form-check-label">$$$</label>        
                                </li>
                                <li>
                                    <input 
                                        className="form-check-input" 
                                        type="checkbox" 
                                        name="price" 
                                        defaultChecked = {false}
                                        onClick={(event) => this.handleClick(event, 4)}
                                    />
                                    <label className="form-check-label">$$$$</label>        
                                </li>
                            </ul>
                            <ul className = 'openNow col-lg-3'>
                                <h6>Time</h6>
                                <li>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="openNow"
                                        defaultChecked={false}
                                        onClick={(event) => this.handleClick(event)} //start at position 1 because yelp API requires index start
                                    />
                                    <label className="form-check-label">Open Now</label>
                                </li>
                            </ul>
                            <ul className = 'openNow col-lg-3'>
                                <h6>Attributes</h6>
                                <li>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="hotNew"
                                        defaultChecked={false}
                                        onClick={(event) => this.handleClick(event)} //start at position 1 because yelp API requires index start
                                    />
                                    <label className="form-check-label">Hot and New</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;

