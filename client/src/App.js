import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    fetch('/helloWorld')
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          { Object.keys(this.state.data).map(key => key + ": " + this.state.data[key]) }
        </p>
      </div>
    );
  }
}

export default App;
