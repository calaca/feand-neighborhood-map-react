import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { getDetails } from '../../utils/FoursquareAPI';
import StarIcon from '../../assets/imgs/star.svg';
import FoursquareIcon from '../../assets/imgs/foursquare.svg';
import './MarkerInfo.css';

class MarkerInfo extends Component {
  state = {
    loaded: false,
    placeDetails: {}
  }

  componentDidMount() {
    const placeId = this.props.placeId;
    getDetails(placeId)
      .then(placeDetails => {
        this.setState({ placeDetails, loaded: true })
      });
  }

  /**
  * @description Create the HTML markup to show stars
  * @param {image} StarIcon - The star icon image
  */
  createStars = (rating) => {
    let markup = [];
    for (let i = 0; i < rating; i++) {
      markup.push(`<img class="icon" src="${StarIcon}" alt="star icon" aria-hidden="true"/>`);
    }
    return markup;
  }

  render() {
    const { loaded, placeDetails } = this.state;
    const { placeId, placePos, onToggleOpen, showInfoId } = this.props;
    const rating = parseInt(placeDetails.rating, 10);

    return (
      <Marker
        key={placeId}
        position={placePos}
        onClick={() => onToggleOpen(placeId)}
      >
        {(showInfoId === placeId && loaded === true) &&
          <InfoWindow
          options={{ maxWidth: 250 }}
            key={placeId}
            onCloseClick={() => onToggleOpen(placeId)}
          >
            <div className="details-place" tabIndex="0" key={placeId}>
              <h3 className="details-title">
                <a href={placeDetails.canonicalUrl}>{placeDetails.name}</a>
              </h3>
              <p className="details-address">{placeDetails.location.address || 'Address not found'}</p>
              <div className="details-rating" title={`${placeDetails.name}'s rating is ${rating}`}>
                {/* {this.createStars(rating).join(' ')} */}
                {/* TODO: solve how to add the star images here */}
                {/* TODO: comment the rest of the code */}
              </div>
              <div className="details-price" title={`The price is ${placeDetails.price.message}`}>
                <span aria-hidden="true">{placeDetails.attributes.groups['0'].summary}</span>
              </div>
              <div className="details-category">
                {
                  placeDetails.categories.map(category =>
                    <span key={category.id} className="category-pill">{category.name}</span>
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
          </InfoWindow>
        }
      </Marker>
    );
  }
}

export default MarkerInfo;
