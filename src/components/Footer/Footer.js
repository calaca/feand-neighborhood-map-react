import React from 'react';
import './Footer.css';
import ReactIcon from '../../assets/imgs/logo.svg';

const Footer = () => (
  <footer>
    <p className="made-with">
      made with
      <img src={ReactIcon} alt="React" title="React"/>
      by <a href="https://calaca.github.io/">calaca</a>
    </p>
  </footer>
);

export default Footer;
