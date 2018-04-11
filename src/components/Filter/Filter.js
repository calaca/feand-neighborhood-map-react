import React, { Component } from 'react';
import { Debounce } from 'react-throttle';
import { getDetails } from '../../utils/FoursquareAPI';
import './Filter.css';
import FilterIcon from '../../assets/imgs/funnel.svg';
import StarIcon from '../../assets/imgs/star.svg';
import FoursquareIcon from '../../assets/imgs/foursquare.svg';
import ErrorIcon from '../../assets/imgs/multiply.svg';

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
    infowindow.setContent(marker.content);
    infowindow.open(map, marker);
    this.markerAnimation(marker);
  }

  /**
  * @description Create the HTML markup to show stars
  * @param {image} StarIcon - The star icon image
  */
  createStars = (rating) => {
    let markup = [];
    for(let i = 0; i < rating; i++) {
      markup.push(`<img class="icon" src="${StarIcon}" alt="star icon" aria-hidden="true"/>`);
    }
    return markup;
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

      // create infowindow content
      getDetails(place.id)
        .then(placeDetails => {
          const address = placeDetails.location.address || 'Address not found';
          const categories = placeDetails.categories;
          const price = placeDetails.attributes.groups['0'].summary;
          const priceText = placeDetails.price.message;
          const rating = parseInt(placeDetails.rating, 10);
          const stars = this.createStars(rating);
          const link = placeDetails.canonicalUrl;
          const photo = `${placeDetails.bestPhoto.prefix}width150${placeDetails.bestPhoto.suffix}`

          place['marker'].content = `
          <div class="details-place" tabindex="0">
            <h3 class="details-title">
              <a href="${link}">${place.name}</a>
            </h3>
            <p class="details-address">${address}</p>
            <div class="details-rating" title="${place.name}'s rating is ${rating}">
              ${ stars.join(' ') }
            </div>
            <div class="details-price" title="The price is ${priceText}">
              <span aria-hidden="true">${price}</span>
            </div>
            <div class="details-category">
              ${
                categories.map(category =>
                  `<span class="category-pill">${category.name}</span>`
                )
              }
            </div>
            <div class="details-img">
              <img src="${photo}" alt="Best photo of ${place.name}"/>
            </div>
            <a class="details-more" href="${link}" title="More at Foursquare">
              <img src="${FoursquareIcon}" alt="Foursquare icon"/>
            </a>
          </div>`
        })
        .catch(err => {
          console.log('There was an error while getting the venue details with ', err);
          place['marker'].content = `
          <p class="infowindow-error">
            <img src="${ErrorIcon}" alt="Red letter X"/>
            <span>There was an error while getting the venue details. Please try again later.</span>
          </p>
          `
        })

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
    if (e.key === 'Enter' || e.type === 'click') {
      const { map, infowindow } = this.props.data;
      this.setInfowindow(map, place, infowindow, place.marker);
    }
  }

  render() {
    const { places } = this.props.data;
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
                  onClick={e => this.openInfowindow(e, place)}
                  onKeyPress={e => this.openInfowindow(e, place)}
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
