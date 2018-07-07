import React from 'react';

const NavButton = ({ onClick, title }) => (
  <button onClick={ () => onClick() }>{ title }</button>
);

const Nav = ({ clicks, titles }) => (
  <nav>
    { titles.map(title => <NavButton onClick={ clicks[title] } title={ title } />) }
  </nav>
);

export default Nav;
