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
    expect(store.foodMenuItems[0].title).to.equal('Sanduba de frango');
    expect(store.foodMenuItems[1].title).to.equal('Açai');
    expect(store.foodMenuItems[2].title).to.equal('Sanduíche de Mignon');
  });

});