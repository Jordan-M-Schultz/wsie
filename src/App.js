import React, {Component} from 'react';
import './App.css';
import './SearchBar';
import SearchBar from './SearchBar';

class App extends Component {
  constructor(props) {
    super(props); //class constructors must call super in ES6 if they are a subclass
    this.state = {
      name: '',
      greeting: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    // fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
    //   .then(response => response.json())
    //   .then(state => this.setState(state));
    fetch(`/api?name=${encodeURIComponent(this.state.name)}`)
      .then(response => response.json())
      .then(state => this.setState(state));
  }

  render() {
    return(
      <div className='App'>
        <div className='header'>
          <h1>Header Here</h1>
        </div>
        <div className='wrap-center'>
          <SearchBar/>
        </div>
      </div>
      
    );
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <form onSubmit={this.handleSubmit}>
    //         <label htmlFor="name">Enter your name: </label>
    //         <input
    //           id="name"
    //           type="text"
    //           value={this.state.name}
    //           onChange={this.handleChange}
    //         />
    //         <button type="submit">Submit</button>
    //       </form>
    //       <p>{this.state.greeting}</p>
    //       <SearchBar/>
    //     </header>
    //   </div>
    // );
  }
}
export default App;
