import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';
import ErrorIcon from '../../assets/imgs/multiply.svg';

const Error = ({ message }) => (
  <div className="error">
    <div className="message" role="alert">
      <img src={ErrorIcon} alt="Red letter X"/>
      <p>{ message }</p>
    </div>
  </div>
);

Error.propTypes = {
  message: PropTypes.string.isRequired
}

export default Error;
