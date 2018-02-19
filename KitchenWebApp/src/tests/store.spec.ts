import { expect } from 'chai';
import { Store } from '../model/Store';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import * as logger from 'winston';

describe('kitchen web app store', () => {

  before(async () => {
    await initFixtures();
  });

  it('first', async () => {
  });

});