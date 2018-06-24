import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/Users';
import Nav from './components/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: "Users",
      data: {},
      views: {
        "Users": () => (<Users users={ this.state.data.users || [] } />),
        "Test": () => (<p>THIS IS A TEST</p>),
      },
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/home')
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  setView(title) {
    this.setState(
      Object.assign(
        {},
        this.state,
        { activeView: title },
      )
    );
  }
        //<Users users={this.state.data.users || []} />

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Contact</h1>
        </header>
        <Nav viewChangeFunction={ this.setView } titles={ Object.keys(this.state.views) }/>
        { this.state.views[this.state.activeView]() }
      </div>
    );
  }
}

export default App;
