import { expect } from 'chai';
import { Store } from '../model/Store';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import * as logger from 'winston';

describe('store', () => {

  before(async () => {
    await initFixtures();
  });

  it('get food menu items', async () => {
    const store = new Store();
    await store.onMenuPageLoad();
    logger.debug(JSON.stringify(store.foodMenuItems, null, 2));
  });

});