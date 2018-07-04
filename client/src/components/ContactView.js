import React from 'react';
import ErrorScreen from './screens/error';
import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import UserScreen from './screens/user';
import ContactScreen from './screens/contact';
import Nav from './Nav';
import { SCREENS } from '../actions/actions';

const Header = (props) => <h1>Contact</h1>;

const renderScreen = state => {
  const { screen, user, loginFlash } = state.main;
  const { onLoginAttempts } = state;
  switch (screen) {
    case SCREENS.CONTACT:
      return (<ContactScreen data={user}/>);
    case SCREENS.HOME:
      return (<HomeScreen/>);
    case SCREENS.LOGIN:
      return (<LoginScreen loginFlash={loginFlash} onLoginAttempts={onLoginAttempts}/>);
    case SCREENS.REGISTER:
      return (<RegisterScreen/>);
    case SCREENS.USER:
      return (<UserScreen user={user}/>);
    default:
      return (<ErrorScreen error={'404'}/>);
  }
};

const screenTitles = [
  'Home',
  'About you',
  'Login',
  'Register',
  'Logout',
];

const ContactView = props => {
  return (
    <div>
      <Header/>
      <Nav clicks={props.clicks} 
        titles={screenTitles}/>
      { renderScreen(props) }
      <footer>{JSON.stringify(props)}</footer>
    </div>
  );
};

export default ContactView;
