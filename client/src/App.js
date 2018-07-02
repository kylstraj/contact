import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/Users';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import MyAccount from './components/MyAccount';
import ContactContainer from './containers/ContactContainer';

class App extends Component {
  render() {
    return (
      <ContactContainer />
    );
  }
}

export default App;
