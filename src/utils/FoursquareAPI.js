import { FS_CLIENT_ID, FS_CLIENT_SECRET } from './apiKeys';

const api = 'https://api.foursquare.com/v2/venues/explore?';
const version = '20181125';
const limit = 10;
const center = '-15.8535404,-48.9699847';
const query = 'restaurant';
const lang = 'en';

export const getAll = () =>
  fetch(
    `${api}client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}&v=${version}&limit=${limit}&ll=${center}&query=${query}&locale=${lang}`
  )
    .then(res => res.json())
    .then(data => data.response.groups['0'].items)
    .then(res => {
      const venues = res.map(item => item.venue);
      return venues;
    })
    .catch(err => console.log("Couldn't retrieve venue details with ", err));
