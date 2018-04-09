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
        id: '01',
        name: 'Bistrô Maria Doceu',
        position: {
          lat: -15.8513359,
          lng: -48.9583927
        }
      },
      {
        id: '02',
        name: 'Casebre Restaurante',
        position: {
          lat: -15.8504318,
          lng: -48.9569744
        }
      },
      {
        id: '03',
        name: 'Montserrat Gastronomia',
        position: {
          lat: -15.8487617,
          lng: -48.9600882
        }
      },
      {
        id: '04',
        name: 'Santa Dica Cervejaria',
        position: {
          lat: -15.8503222,
          lng: -48.9576594
        }
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
        styles: MapStyles
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
