import React, { Component } from 'react';
import Top from '../Top/Top';
import Filter from '../Filter/Filter';
import Map from '../Map/Map';
import Footer from '../Footer/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Top />
        <div className="content">
          <Filter />
          <Map />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
