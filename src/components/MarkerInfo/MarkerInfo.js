import React from 'react';
import PropTypes from 'prop-types';
import { Marker, InfoWindow } from 'react-google-maps';
import FoursquareIcon from '../../assets/imgs/foursquare.svg';
import './MarkerInfo.css';
import icon from '../../assets/imgs/pin_def.svg';

const MarkerInfo = ({
  place,
  onToggleOpen,
  showInfoId,
  action,
  markerAnimation
}) => (
  <Marker
    icon={{ url: icon }}
    key={place.id}
    position={{ lat: place.location.lat, lng: place.location.lng }}
    animation={showInfoId === place.id && action ? markerAnimation : null}
    onClick={() => onToggleOpen(place.id, true)}
  >
    {showInfoId === place.id && action && (
      <InfoWindow
        options={{ maxWidth: 250 }}
        key={place.id}
        onCloseClick={() => onToggleOpen(place.id, false)}
      >
        <div className="details-place" tabIndex="0" key={place.id}>
          <h3 className="details-title">
            <a
              href={`https://foursquare.com/v/${place.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {place.name}
            </a>
          </h3>
          <p className="details-address">
            {place.location.address || 'Address not found'}
          </p>
          <div className="details-category">
            {place.categories.map(category => (
              <span key={category.id} className="category-pill">
                {category.name}{' '}
              </span>
            ))}
          </div>
          <a
            className="details-more"
            href={`https://foursquare.com/v/${place.id}`}
            title="More at Foursquare"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={FoursquareIcon} alt="Foursquare icon" />
          </a>
        </div>
      </InfoWindow>
    )}
  </Marker>
);

MarkerInfo.propTypes = {
  place: PropTypes.object.isRequired,
  onToggleOpen: PropTypes.func.isRequired,
  showInfoId: PropTypes.string.isRequired,
  action: PropTypes.bool.isRequired
};

export default MarkerInfo;
