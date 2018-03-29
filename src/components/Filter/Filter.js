import React, { Component } from 'react';
import './Filter.css';
import FilterIcon from '../../assets/imgs/funnel.svg';

class Filter extends Component {
  render() {
    return (
      <aside className="filter">
        <h2 className="filter-title">Filter Search</h2>
        <div className="input-wrapper">
          <input type="text" placeholder="Type a location name here" aria-label="Type a location name here"/>
          <button className="filter-btn" aria-label="Filter">
            <img src={FilterIcon} alt="Filter" className="icon" title="Filter"/>
          </button>
        </div>
        <div className="results">
          <p className="results-summary">
            Showing <strong>4</strong> of <strong>4</strong> places.
          </p>
          <ul className="results-list">
            <li className="result-item">
              Bistrô Maria Doceu
            </li>
            <li className="result-item">
              Casebre Restaurante
            </li>
            <li className="result-item">
              Montserrat Gastronomia
            </li>
            <li className="result-item">
              Santa Dica Cervejaria Artesanal
            </li>
          </ul>
        </div>
      </aside>
    )
  }
};

export default Filter;
