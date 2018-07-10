import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ErrorScreen from './screens/error';
import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import RegisterScreenContainer from '../containers/RegisterScreenContainer';
import ContactsScreenContainer from '../containers/ContactsScreenContainer';
import SearchUsersScreenContainer from '../containers/SearchUsersScreenContainer';
import UserScreenContainer from '../containers/UserScreenContainer';
import Nav from './Nav';
import { SCREENS } from '../actions/actions';

const styles = () => ({
  header: {
    textAlign: 'center',
  },
  main: {
    textAlign: 'center',
  },
});

let Header = (props) => <h1 className={props.classes.header}>Contact</h1>;
Header = withStyles(styles)(Header);

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
        <div className={props.classes.main}>
          <Header/>
          <Nav clicks={props.clicks} 
            titles={props.main.user !== {} ? screenTitlesLoggedIn : screenTitlesDefault}/>
          { renderScreen(props) }
          <footer>{JSON.stringify(props)}</footer>
        </div>
        )
      : (
        <div className={props.classes.main}>
          <Header/>
          <Nav clicks={props.clicks} 
            titles={props.main.loggedIn ? screenTitlesLoggedIn : screenTitlesDefault}/>
          { renderScreen(props) }
        </div>
        )
  );
};

export default withStyles(styles)(ContactView);
