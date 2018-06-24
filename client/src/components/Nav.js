import React, { Component } from 'react';

const NavButton = ({ onClick, title }) => (
  <button onClick={ () => onClick(title) }>{ title }</button>
);

const Nav = ({ viewChangeFunction, titles }) => (
  <nav>
    { titles.map(title => <NavButton onClick={ viewChangeFunction } title={ title } />) }
  </nav>
);

export default Nav;
