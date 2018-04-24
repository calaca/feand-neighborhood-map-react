/*global google*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Marker, InfoWindow } from 'react-google-maps';
import { getDetails } from '../../utils/FoursquareAPI';
import StarIcon from '../../assets/imgs/star.svg';
import FoursquareIcon from '../../assets/imgs/foursquare.svg';
import Error from '../Error/Error';
import './MarkerInfo.css';
import IconDef from '../../assets/imgs/pin_def.svg';
import IconSel from '../../assets/imgs/pin_sel.svg';

class MarkerInfo extends Component {
  state = {
    loaded: false,
    error: false,
    placeDetails: {}
  }

  /**
  * @description Load details about a place via Foursquare's API
  */
  componentDidMount() {
    const placeId = this.props.placeId;

    getDetails(placeId)
      .then(placeDetails => {
        this.setState({ placeDetails, loaded: true })
      })
      .catch(err => {
        console.log('Foursquare API returned with ', err);
        this.setState({ error: true });
      });
  }

  render() {
    const { loaded, error, placeDetails } = this.state;
    const { placeId, placePos, onToggleOpen, showInfoId, action } = this.props;

    return (
      <Marker
        icon={showInfoId === placeId && action === 'open' ? { url: IconSel } : { url: IconDef }}
        key={placeId}
        position={placePos}
        animation={google.maps.Animation.DROP}
        onClick={() => onToggleOpen(placeId, 'open')}
      >
        {
          (showInfoId === placeId && loaded === true && action === 'open') &&
          <InfoWindow
          options={{ maxWidth: 250 }}
            key={placeId}
            onCloseClick={() => onToggleOpen(placeId, 'close')}
          >
          {
            error ? <Error message="There was an error while fetching this place's data. Please try again later." />
            : <div className="details-place" tabIndex="0" key={placeId}>
              <h3 className="details-title">
                <a href={placeDetails.canonicalUrl}>{placeDetails.name}</a>
              </h3>
              <p className="details-address">{placeDetails.location.address || 'Address not found'}</p>
              <div
                className="details-rating"
                title={`The rating is ${placeDetails.rating}`}
              >
                <img className="icon" src={StarIcon} alt="star icon" aria-hidden="true" />
                <span className="rating-number" aria-hidden="true">{placeDetails.rating}</span>
              </div>
              <div className="details-price" title={`The price is ${placeDetails.price.message}`}>
                <span aria-hidden="true">{placeDetails.attributes.groups['0'].summary}</span>
              </div>
              <div className="details-category">
                {
                  placeDetails.categories.map(category =>
                    <span key={category.id} className="category-pill">{category.name} </span>
                  )
                }
              </div>
              <div className="details-img">
                <img src={`${placeDetails.bestPhoto.prefix}width150${placeDetails.bestPhoto.suffix}`} alt={`Best of ${placeDetails.name}`} />
              </div>
              <a className="details-more" href={placeDetails.canonicalUrl} title="More at Foursquare">
                <img src={FoursquareIcon} alt="Foursquare icon" />
              </a>
            </div>
          }
          </InfoWindow>
        }
      </Marker>
    );
  }
}

MarkerInfo.propTypes = {
  key: PropTypes.string.isRequired,
  placeId: PropTypes.string.isRequired,
  placePos: PropTypes.object.isRequired,
  onToggleOpen: PropTypes.func.isRequired,
  showInfoId: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired
}

export default MarkerInfo;
