import React from 'react';
import { compose } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import MapStyles from '../../utils/mapStyles.json';
import MarkerInfo from '../MarkerInfo/MarkerInfo';
import './Map.css';

const Map = compose(withScriptjs, withGoogleMap)(props =>
  <GoogleMap
    defaultZoom={16}
    center={{ lat: -15.8511, lng: -48.9589 }}
    defaultOptions={{ styles: MapStyles }}
  >
  {
    props.showingPlaces.length === 0 ?
      props.places.map(place => (
          <MarkerInfo
            key={place.id}
            placeId={place.id}
            placePos={place.position}
            onToggleOpen={props.onToggleOpen}
            showInfoId={props.showInfoId}
            action={props.action}
          />
      ))
    :
      props.showingPlaces.map(place => (
        <MarkerInfo
          key={place.id}
          placeId={place.id}
          placePos={place.position}
          onToggleOpen={props.onToggleOpen}
          showInfoId={props.showInfoId}
          action={props.action}
        />
      ))
  }
  </GoogleMap>
);


export default Map;
