import * as assert from 'assert';
import * as http from 'http';
import * as winston from 'winston';
import fetch from 'node-fetch';
import execFixtures from './fixtures/fixture';
import app from './../app';
import { Model } from '../../../MobileApp/src/Model';
import { Network } from '../../../MobileApp/src/Network';


const port = '4000';

describe('React Native model test', function() {

  before(async function() {
    const server = http.createServer(app);
    server.listen(port);
    server.on('error', (err) => {
      winston.error(err.stack);
    });
    this.server = server;

    const baseURL = 'http://localhost:' + port + '/graphql';
    this.network = new Network(baseURL, fetch);
  });

  after(async function() {
    this.server.close();
  });

  beforeEach(async function() {
    await execFixtures();
    function getGeolocation() {
      return {
        latitude: 23.0,
        longitude: -45.3
      };
    }
    const asyncStorage = {
      getItem: (key) => { return '333'; },
      setItem: (a, b) => {}
    };

    this.model = new Model(this.network, asyncStorage, getGeolocation);
  });

  it('getFoodMenu', async function() {
    const foodMenu: any[] = await this.model.getFoodMenu();
    assert.equal(3, foodMenu.length);
    assert.equal('Sanduba de frango', foodMenu[0].title);
    assert.equal(8.0, foodMenu[1].price);
  });

});