import { AsyncStorage } from 'react-native';
import { getGeolocation} from './lib/geolocation';
import { Model } from './Model';
import { Network } from './Network';
import * as ENV from './app.env';

const port = '3000';
const baseURL = 'http://' + ENV.VARS.DEV_SERVER_IP + ':' + port + '/graphql';
const network = new Network(baseURL, fetch);
const model = new Model(network, AsyncStorage, getGeolocation);

export { model };