import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';
import ErrorIcon from '../../assets/imgs/multiply.svg';

const Error = ({ message, size }) => (
  <div className={`error ${size}`}>
    <div className="message" role="alert">
      <img src={ErrorIcon} alt="Red letter X" />
      <p>{message}</p>
    </div>
  </div>
);

Error.propTypes = {
  message: PropTypes.string.isRequired,
  size: PropTypes.string
};

export default Error;
