import { FS_CLIENT_ID, FS_CLIENT_SECRET } from './apiKeys';

const api = 'https://api.foursquare.com/v2/venues/';
const version = '20180411';
const lang = 'en';

export const getDetails = (id) =>
  fetch(`${api}${id}?client_id=${FS_CLIENT_ID}&client_secret=${FS_CLIENT_SECRET}&v=${version}&locale=${lang}`)
    .then(res => res.json())
    .then(data => data.response.venue)
    .catch(err => console.log('Couldn\'t retrieve venue details with ', err))
