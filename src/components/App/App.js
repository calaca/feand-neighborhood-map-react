import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import { MAP_API_KEY } from '../../data/apiKeys';
import MapStyles from '../../data/mapStyles.json';
import Top from '../Top/Top';
import Filter from '../Filter/Filter';
import Map from '../Map/Map';
import Footer from '../Footer/Footer';
import './App.css';

class App extends Component {
  state = {
    places: [
      {
        id: '53c2cf54498ef154bed18e66',
        name: 'Bistrô Maria Docéu',
        position: {
          lat: -15.8513359,
          lng: -48.9583927
        },
      },
      {
        id: '53f937e5498e07b7679f1cb5',
        name: 'Casebre Restaurante',
        position: {
          lat: -15.8504318,
          lng: -48.9569744
        },
      },
      {
        id: '4daa3de9cda1652a2b894f83',
        name: 'Montserrat Gastronomia',
        position: {
          lat: -15.8487617,
          lng: -48.9600882
        },
      },
      {
        id: '55be44a2498e1d6c95826a24',
        name: 'Santa Dica Cervejaria',
        position: {
          lat: -15.8503222,
          lng: -48.9576594
        },
      },
      {
        id: '542939e2498e7e2b1a5d0b96',
        name: 'Pé di Café',
        position: {
          lat: -15.8501328,
          lng: -48.9578972
        },
      }
    ],
    map: null,
    loaded: false,
    error: false,
    infowindow: {},
    bounds: {},
    center: { lat: -15.8511, lng: -48.9589 }
  }

  // https://stackoverflow.com/questions/41709765/how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require
  componentWillReceiveProps({ isScriptLoadSucceed }) {
    if (isScriptLoadSucceed) {
      const { center } = this.state;

      // init map
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: center,
        styles: MapStyles,
        title: 'Map of interesting places in Pirenópolis'
      });

      // init bounds and infowindow
      const bounds = new window.google.maps.LatLngBounds();
      const infowindow = new window.google.maps.InfoWindow({});

      // store map info in state
      this.setState({
        map,
        infowindow,
        bounds,
        loaded: true
      });

    } else {
      this.setState({ error: true });
      console.log('There was an error while loading the Map scripts.');
    }

  }

  render() {
    return (
      <div className="app">
        <Top />
        <div className="content">
          {
            this.state.loaded && <Filter data={this.state} />
          }
          <Map />
        </div>
        <Footer />
      </div>
    )
  }
}

export default scriptLoader(
  [`https://maps.googleapis.com/maps/api/js?key=${MAP_API_KEY}`]
)(App);
