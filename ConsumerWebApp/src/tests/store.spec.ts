import * as winston from 'winston';
import { expect } from 'chai';
import { Store } from '../model/Store';
import * as logger from 'winston';

describe('store', () => {

  before(async () => {
    await initFixtures();
  });

  it('get food menu items', async () => {
    const store = new Store();
  });

});