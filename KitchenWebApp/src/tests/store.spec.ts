import { expect } from 'chai';
import { Store } from '../model/Store';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import * as logger from 'winston';
import * as moment from 'moment-timezone';

describe('kitchen web app store', () => {

  before(async () => {
    await initFixtures();
  });

  it('first', async () => {
    const store = new Store();
    await store.onOrdersOpen();
    expect(store.orders).to.have.lengthOf(1);
    expect(store.orders[0].local).to.equal('Prédio 1');
    expect(store.orders[0].totalAmount).to.equal(50.0);
  });

});