import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/Users';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    fetch('/home')
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
        <Users users={this.state.data.users || []} />
      </div>
    );
  }
}

export default App;
