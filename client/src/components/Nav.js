import React from 'react';
import Button from './shared/Button';
import { withStyles } from '@material-ui/core/styles';

//const styles = () => (
  //{
    //button: {
      //margin: '1em',
    //},
    //nav: {
      //textAlign: 'center',
    //},
  //}
//);

let NavButton = ({ classes, onClick, title }) => (
  <Button onClick={ () => onClick() }>{ title }</Button>
);

//NavButton = withStyles(styles)(NavButton);

const Nav = ({ classes, clicks, titles }) => (
  <nav>
    { titles.map(title => <NavButton onClick={ clicks[title] } title={ title } />) }
  </nav>
);

//export default withStyles(styles)(Nav);
export default Nav;
