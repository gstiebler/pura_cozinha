import 'whatwg-fetch';
import { Model } from './lib/Model';
import { Network } from './lib/Network';

const baseApiURL = '/graphql';

const network = new Network(baseApiURL, fetch);
const model = new Model(network);

export { model };