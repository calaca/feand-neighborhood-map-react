import React from 'react';
import './Top.css';
import Logo from '../../assets/imgs/logo-world.svg';

const Top = () => (
  <header className="top">
    <h1 className="top-title">
      <img src={Logo} alt="World with markers and paths in it" className="icon"/>
      <span>Neighborhood Map</span>
    </h1>
  </header>
);

export default Top;
