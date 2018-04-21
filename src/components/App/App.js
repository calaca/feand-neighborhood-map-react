import React, { Component } from 'react';
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
    center: { lat: -15.8511, lng: -48.9589 },
    showInfoId: false,
    loaded: false
  }

  componentDidMount() {
    this.setState({
      places: PlacesData,
      loaded: true
    });
  }

  onToggleOpen = (place) => {
    this.setState({
      showInfoId: place
    });
  }

  render() {
    return (
      <div className="app">
        <Top />
        <div className="content">
          {
            this.state.loaded && <Filter data={this.state} onToggleOpen={this.onToggleOpen} />
          }
          {
            <Map
              onToggleOpen={this.onToggleOpen}
              showInfoId={this.state.showInfoId}
              places={this.state.places}
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
