import { AsyncStorage } from 'react-native';
import { getGeolocation} from './lib/geolocation';
import { Model } from './Model';
import { Network } from './Network';

const port = '3000';
const baseURL = 'http://192.168.0.14:' + port + '/graphql';
const network = new Network(baseURL, fetch);
const model = new Model(network, AsyncStorage, getGeolocation);

export { model };