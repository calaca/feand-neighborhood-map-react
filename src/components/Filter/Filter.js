import React from 'react';
import PropTypes from 'prop-types';
import { Debounce } from 'react-throttle';
import './Filter.css';
import FilterIcon from '../../assets/imgs/funnel.svg';

const Filter = ({ data, filterPlaces, onToggleOpen }) => {
  const { places, showingPlaces } = data;

  return (
    <aside className="filter">
      <h2 className="filter-title" tabIndex="0">
        <img src={FilterIcon} alt="Filter" className="icon" title="Filter icon" />
        Filter Search
      </h2>
      <div className="input-wrapper">
        <Debounce time="300" handler="onChange">
          <input 
            type="text"
            placeholder="Type a location name here to filter places"
            aria-label="Type a location name here to filter places"
            onChange={e => filterPlaces(e.target.value)}
          />
        </Debounce>
      </div>
      <div className="results">
        <p className="results-summary">
          Showing < strong >{showingPlaces.length}</strong> of <strong>{places.length}</strong> places.
        </p>
        <ul className="results-list" tabIndex="0">
          {
            showingPlaces.map(place =>
              <li
                key={place.id}
                className="result-item"
                tabIndex="0"
                onClick={() => onToggleOpen(place.id, 'open')}
              >
                {place.name}
              </li>
            )
          }
        </ul>
      </div>
    </aside>
  )
};

Filter.propTypes = {
  data: PropTypes.object.isRequired,
  onToggleOpen: PropTypes.func.isRequired,
  filterPlaces: PropTypes.func.isRequired
}

export default Filter;
