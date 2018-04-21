import React, { Component } from 'react';
import { Debounce } from 'react-throttle';
import './Filter.css';
import FilterIcon from '../../assets/imgs/funnel.svg';

class Filter extends Component {
  state = {
    query: '',
    showingPlaces: []
  }

  /**
  * @description Sets initial state for result list, markers, etc.
  */
  componentDidMount() {
    this.filterPlaces(this.state.query);
  }

  /**
  * @description Filter places to show
  * @param {string} query - The search query
  */
  filterPlaces = (query) => {
    const { places } = this.props.data;
    let showingPlaces;

    // update query in state
    this.setState({
      query: query.toLowerCase().trim()
    });

    // filter the places to show
    if (query) {
      showingPlaces = places.filter(place => place['name'].toLowerCase().includes(query));
    } else {
      showingPlaces = places;
    }

    // set places to show in state
    this.setState({ showingPlaces });
  }

  render() {
    const { places } = this.props.data;
    const onToggleOpen = this.props.onToggleOpen;
    const { showingPlaces } = this.state;

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
              onChange={e => this.filterPlaces(e.target.value)}
            />
          </Debounce>
        </div>
        <div className="results">
          {
            showingPlaces.length !== places.length &&
            (
              <p className="results-summary">
                Showing < strong >{showingPlaces.length}</strong> of <strong>{places.length}</strong> places.
              </p>
            )
          }
          <ul className="results-list" tabIndex="0">
            {
              showingPlaces.map(place => (
                <li
                  key={place.id}
                  className="result-item"
                  tabIndex="0"
                  onClick={() => onToggleOpen(place.id)}
                >
                  {place.name}
                </li>
              ))
            }
          </ul>
        </div>
      </aside>
    )
  }
};

export default Filter;
