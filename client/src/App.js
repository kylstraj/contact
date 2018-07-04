import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import ContactContainer from './containers/ContactContainer';

class App extends Component {
  render() {
    return (
      <ContactContainer />
    );
  }
}

export default App;
