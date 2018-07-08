import React from 'react';
import ErrorScreen from './screens/error';
import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import RegisterScreenContainer from '../containers/RegisterScreenContainer';
import ContactsScreenContainer from '../containers/ContactsScreenContainer';
import SearchUsersScreenContainer from '../containers/SearchUsersScreenContainer';
import UserScreenContainer from '../containers/UserScreenContainer';
import Nav from './Nav';
import { SCREENS } from '../actions/actions';

const Header = (props) => <h1>Contact</h1>;

const renderScreen = state => {
  const { credentials, screen, user, loginFlash, contacts } = state.main;
  const { onLoginAttempts, fetchContacts } = state;
  switch (screen) {
    case SCREENS.HOME:
      return (<HomeScreen/>);
    case SCREENS.LOGIN:
      return (<LoginScreen loginFlash={loginFlash} onLoginAttempts={onLoginAttempts}/>);
    case SCREENS.REGISTER:
      return (<RegisterScreenContainer/>);
    case SCREENS.USER:
      return (<UserScreenContainer/>);
    case SCREENS.CONTACTS:
      return (<ContactsScreenContainer contacts={contacts}/>);
    case SCREENS.SEARCH:
      return (<SearchUsersScreenContainer/>);
    default:
      return (<ErrorScreen error={'404'}/>);
  }
};

const screenTitlesDefault = [
  'Home',
  'Login',
  'Register',
];

const screenTitlesLoggedIn = [
  'Home',
  'Contacts',
  'About you',
  'Search Users',
  'Logout',
];

const ContactView = props => {
  return (
    props.dev
      ? (
        <div>
          <Header/>
          <Nav clicks={props.clicks} 
            titles={props.main.user !== {} ? screenTitlesLoggedIn : screenTitlesDefault}/>
          { renderScreen(props) }
          <footer>{JSON.stringify(props)}</footer>
        </div>
        )
      : (
        <div>
          <Header/>
          <Nav clicks={props.clicks} 
            titles={props.main.loggedIn ? screenTitlesLoggedIn : screenTitlesDefault}/>
          { renderScreen(props) }
        </div>
        )
  );
};

export default ContactView;
