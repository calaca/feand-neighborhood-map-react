import React, { Component } from 'react';
import './Filter.css';
import FilterIcon from '../../assets/imgs/funnel.svg';

class Filter extends Component {
  state = {
    query: '',
    showingPlaces: []
  }

  // TODO: link infowindows with result list
  // TODO: get extra data from third party API

  componentDidMount() {
    // set initial result list, markers and friends
    this.filterPlaces(this.state.query);
  }

  filterPlaces = (query) => {
    const { places, infowindow } = this.props.data;
    let showingPlaces;

    // update query in state
    this.setState({
      query: query.toLowerCase().trim()
    });

    // close all infowindows when the user starts typing
    infowindow.close();

    // filter the places to show
    if (query) {
      showingPlaces = places.filter(place => place['name'].toLowerCase().includes(query));
    } else {
      showingPlaces = places;
    }

    // set places to show in state
    this.setState({ showingPlaces });

    // create and show markers for each place
    this.createMarkers(showingPlaces);
  }

  createMarkers = (places) => {
    const { map, infowindow, bounds } = this.props.data;

    places.forEach(place => {
      // create a marker for each place
      place.marker = new window.google.maps.Marker({
        position: place.position,
        map: map,
        title: place.name,
        animation: window.google.maps.Animation.DROP
      });

      // create a listener for a click and set the infowindow for each marker
      place.marker.addListener('click', function() {
        infowindow.setContent(`<p>This is the content for ${place.name}</p>`);
        infowindow.open(map, this);

        // make marker bounce only once
        this.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          this.setAnimation(null);
        }, 375);
      });

      // extends map bounds to the marker
      bounds.extend(place.marker.position);
    });

    // center the map based on markers' bounds
    map.fitBounds(bounds);
  }

  render() {
    const { places } = this.props.data;
    const { showingPlaces } = this.state;

    return (
      <aside className="filter">
        <h2 className="filter-title">Filter Search</h2>
        <div className="input-wrapper">
          <input 
            type="text"
            placeholder="Type a location name here"
            aria-label="Type a location name here"
            onChange={e => this.filterPlaces(e.target.value)}
          />
          <button className="filter-btn" aria-label="Filter">
            <img src={FilterIcon} alt="Filter" className="icon" title="Filter"/>
          </button>
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
          <ul className="results-list">
            {
              showingPlaces.map(p => (
                <li key={p.id} className="result-item">
                  {p.name}
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
