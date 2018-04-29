import { expect } from 'chai';
import * as sinon from 'sinon';
import * as Twitter from '../../../server/src/lib/Twitter';
import { Store } from '../model/Store';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import * as logger from 'winston';

describe('admin web app store', () => {

  before(async () => {
    await initFixtures();
  });

  beforeEach(() => {
    //twitterSendMessageStub.returns(null);
  })

  afterEach(() => {
    // twitterSendMessageStub.restore();
  })

  it('get ingredients', async () => {
    const store = new Store();
    await store.onIngredientsPageLoad();
    expect(store.ingredients[0].title).to.equal('Carne moída');
    expect(store.ingredients[1].title).to.equal('Leite');
    expect(store.ingredients[2].title).to.equal('Seleta de Legumes');
  });

});