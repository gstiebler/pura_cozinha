import 'whatwg-fetch';
import { Model } from './lib/Model';
import { Network } from './lib/Network';

const port = '3000';
const baseURL = 'http://localhost:' + port + '/graphql';

const network = new Network(baseURL, fetch);
const model = new Model(network);

export { model };