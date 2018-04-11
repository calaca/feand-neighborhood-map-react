import React from 'react';
import './Error.css';
import ErrorIcon from '../../assets/imgs/multiply.svg';

const Error = ({ message }) => (
  <div className="error">
    <p className="message" role="alert">
      <img src={ErrorIcon} alt="Red letter X"/>
      <p>{ message }</p>
    </p>
  </div>
);

export default Error;
