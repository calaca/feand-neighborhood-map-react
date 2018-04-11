import React, { Component } from 'react';
import { Debounce } from 'react-throttle';
import './Filter.css';
import FilterIcon from '../../assets/imgs/funnel.svg';

class Filter extends Component {
  state = {
    query: '',
    showingPlaces: []
  }

  // TODO: add third party info about the places
  // TODO: remove that useless filter button
  // TODO: improve a11y (dev tools audit)
  // TODO: add service worker to cache the app
  // TODO: update README file

  /**
  * @description Sets initial state for result list, markers, etc.
  */
  componentDidMount() {
    // set initial result list, markers and friends
    this.filterPlaces(this.state.query);
  }

  /**
  * @description Filter places to show
  * @param {string} query - The search query
  */
  filterPlaces = (query) => {
    const { places, infowindow } = this.props.data;
    let showingPlaces;

    // update query in state
    this.setState({
      query: query.toLowerCase().trim()
    });

    // close all infowindows when the user starts typing
    infowindow.close();

    // hide all markers
    places.forEach(place => {
      if (place.marker) {
        place['marker'].setMap(null);
      }
    });

    // filter the places to show
    if (query) {
      showingPlaces = places.filter(place => place['name'].toLowerCase().includes(query));
    } else {
      showingPlaces = places;
    }

    // set places to show in state
    this.setState({ showingPlaces });

    // create and show markers for each place that matches the query
    this.createMarkers(showingPlaces);
  }

  /**
  * @description Create infowindow content
  * @param {object} place - The place object containing information about it
  */
  createContent = (place) => {
    return `<p>This is the content for ${place.name}</p>`;
  }

  /**
  * @description Animate marker to bounce once
  * @param {object} marker - The place marker
  */
  markerAnimation = (marker) => {
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(() => {
      marker.setAnimation(null);
    }, 375);
  }

  /**
  * @description Configure and set the infowindow
  * @param {object} map - The map
  * @param {object} place - The infowindow place
  * @param {object} infowindow - The infowindow itself
  * @param {object} marker - The place marker
  */
  setInfowindow = (map, place, infowindow, marker) => {
    infowindow.setContent(this.createContent(place));
    infowindow.open(map, marker);
    this.markerAnimation(marker);
  }

/**
  * @description Create a marker for each place and save it in the place object
  * @param {array} places - The places
  */
  createMarkers = (places) => {
    const { map, infowindow, bounds } = this.props.data;
    const self = this;

    places.forEach(place => {
      // create a marker for each place
      place.marker = new window.google.maps.Marker({
        position: place.position,
        map: map,
        title: place.name,
        animation: window.google.maps.Animation.DROP
      });
      
      // create a listener for a click and link it to the infowindow
      place.marker.addListener('click', function() {
        self.setInfowindow(map, place, infowindow, this);
      });

      // extends map bounds to the marker
      bounds.extend(place.marker.position);
    });

    // center the map based on markers' bounds
    map.fitBounds(bounds);
  }

  /**
  * @description Open a infowindow when the respective list item is clicked
  * @param {event} e - The event
  * @param {object} place - The infowindow place
  */
  openInfowindow = (e, place) => {
    const { map, infowindow } = this.props.data;
    this.setInfowindow(map, place, infowindow, place.marker);
  }

  render() {
    const { places } = this.props.data;
    const { showingPlaces } = this.state;

    return (
      <aside className="filter">
        <h2 className="filter-title">Filter Search</h2>
        <div className="input-wrapper">
          <Debounce time="300" handler="onChange">
            <input 
              type="text"
              placeholder="Type a location name here"
              aria-label="Type a location name here"
              onChange={e => this.filterPlaces(e.target.value)}
            />
          </Debounce>
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
              showingPlaces.map(place => (
                <li
                  key={place.id}
                  className="result-item"
                  onClick={e => this.openInfowindow(e, place)}
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
