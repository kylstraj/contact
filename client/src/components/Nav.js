import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = () => (
  {
    button: {
      margin: '2em',
    },
  }
);

let NavButton = ({ onClick, title }) => (
  <Button variant='contained' color='primary' onClick={ () => onClick() }>{ title }</Button>
);

NavButton = withStyles(styles)(NavButton);

const Nav = ({ clicks, titles }) => (
  <nav>
    { titles.map(title => <NavButton onClick={ clicks[title] } title={ title } />) }
  </nav>
);

export default Nav;
