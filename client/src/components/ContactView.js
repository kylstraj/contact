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

const renderScreen = (screen, data) => {
  switch (screen) {
    case SCREENS.CONTACT:
      return (<ContactScreen data={data}/>);
    case SCREENS.HOME:
      return (<HomeScreen/>);
    case SCREENS.LOGIN:
      return (<LoginScreen/>);
    case SCREENS.REGISTER:
      return (<RegisterScreen/>);
    case SCREENS.USER:
      return (<UserScreen data={data}/>);
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

const ContactView = props => (
  <div>
    <Header/>
    <Nav clicks={props.clicks} titles={screenTitles}/>
    {renderScreen(props.screen, props.data)}
  </div>
);

export default ContactView;
