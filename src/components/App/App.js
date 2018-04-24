import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { MAP_API_KEY } from '../../utils/apiKeys';
import PlacesData from '../../utils/placesData.json';
import Top from '../Top/Top';
import Filter from '../Filter/Filter';
import Map from '../Map/Map';
import Footer from '../Footer/Footer';
import Error from '../Error/Error';
import './App.css';

class App extends Component {
  state = {
    places: [],
    showingPlaces: [],
    query: '',
    center: { lat: -15.8511, lng: -48.9589 },
    showInfoId: false,
    loaded: false,
    action: ''
  }

  /**
  * @description Load initial data
  */
  componentDidMount() {
    this.setState({
      places: PlacesData,
      showingPlaces: PlacesData,
      loaded: true
    });
  }

  /**
  * @description Toggle maker's infowindow open
  * @param {string} id - The marker's place ID
  * @param {string} action - Type of action fired (open or close)
  */
  onToggleOpen = (id, action) => {
    this.setState({
      showInfoId: id,
      action
    });
  }

  /**
  * @description Filter places to show
  * @param {string} query - The search query
  */
  filterPlaces = (query) => {
    const { places } = this.state;
    let showingPlaces;

    // update query in state
    this.setState({
      query: query.trim()
    });

    // filter places to show based on query
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingPlaces = places.filter(place => match.test(place.name));
    } else {
      showingPlaces = places;
    }

    // sort places to show by place name
    showingPlaces.sort(sortBy('name'));

    // update places to show in state
    this.setState({ showingPlaces });
  }

  render() {
    return (
      <div className="app">
        <Top />
        <div className="content">
          {
            this.state.loaded &&
            <Filter
              data={this.state}
              onToggleOpen={this.onToggleOpen}
              filterPlaces={this.filterPlaces}
            />
          }
          {
            <Map
              onToggleOpen={this.onToggleOpen}
              showInfoId={this.state.showInfoId}
              action={this.state.action}
              places={this.state.places}
              showingPlaces={this.state.showingPlaces}
              containerElement={<main className="map" role="application" tabIndex="0"></main>}
              mapElement={<div style={{ height: `100%` }}></div>}
              loadingElement={
                <Error message={'There was an error while loading the Google Maps scripts. Please try again later.'} />
              }
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}&v=3`}
            />
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
