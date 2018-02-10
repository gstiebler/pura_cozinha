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

  it('order summary', async () => {
    const store = new Store();
    await store.onMenuPageLoad();
    store.onItemQtyIncreased(store.foodMenuItems[0]._id);
    store.onItemQtyIncreased(store.foodMenuItems[0]._id);
    expect(store.orderSummary.items[0].fmi.title).to.equal('Sanduba de frango');
    expect(store.orderSummary.items[0].fmi.price).to.equal(11.99);
    expect(store.orderSummary.items[0].qty).to.equal(2);
    expect(store.orderSummary.total).to.equal(23.98);
  });

});