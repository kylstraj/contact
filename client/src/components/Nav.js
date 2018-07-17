import React from 'react';
import Button from './shared/Button';
import { withStyles } from '@material-ui/core/styles';

let NavButton = ({ classes, onClick, title }) => (
  <Button onClick={ () => onClick() }>{ title }</Button>
);


const Nav = ({ classes, clicks, contacts, titles }) => (
  <nav>
    { titles.map(title => <NavButton onClick={ () => clicks[title](contacts) } title={ title } />) }
  </nav>
);

export default Nav;
