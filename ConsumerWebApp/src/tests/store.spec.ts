import { expect } from 'chai';
import * as sinon from 'sinon';
import * as Twitter from '../../../server/src/lib/Twitter';
import { Store } from '../model/Store';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import * as logger from 'winston';
import { Order } from '../../../server/src/db/models/Order';

describe('consumer web app store', () => {

  const twitterSendMessageStub = sinon.stub(Twitter, 'sendTwit', () => {});

  before(async () => {
    await initFixtures();
  });

  beforeEach(() => {
    //twitterSendMessageStub.returns(null);
  })

  afterEach(() => {
    // twitterSendMessageStub.restore();
  })

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
    expect(store.orderSummary.totalAmount).to.equal(23.98);
  });

  it('send order', async () => {
    const store = new Store();
    await store.onMenuPageLoad();
    store.onItemQtyIncreased(store.foodMenuItems[0]._id);
    store.onItemQtyIncreased(store.foodMenuItems[0]._id);
    expect(store.orderSummary.items[0].fmi.title).to.equal('Sanduba de frango');
    expect(store.orderSummary.items[0].fmi.price).to.equal(11.99);
    expect(store.orderSummary.items[0].qty).to.equal(2);
    expect(store.orderSummary.totalAmount).to.equal(23.98);
    store.onLocalSelected('Stella Vita');
    store.onPaymentOptionSelected('Dinheiro');
    store.onTelNumberChanged('1234');
    await store.onSendOrderRequested();

    const orders = await Order.find().sort({createdOn:-1}).limit(1);
    const lastOrder = orders[0];
    expect(lastOrder.status).to.equal('PENDING');
    expect(lastOrder.userId).to.equal('coffee_shop');
    expect(lastOrder.paymentOption).to.equal('Dinheiro');
    expect(lastOrder.telephoneNumber).to.equal('1234');
    expect(lastOrder.totalAmount).to.equal(23.98);
    expect(lastOrder.items).to.have.lengthOf(1);
    expect(lastOrder.items[0].qty).to.equal(2);
    expect(lastOrder.items[0].itemTotalPrice).to.equal(23.98);
    expect(lastOrder.items[0].foodMenuItem.title).to.equal('Sanduba de frango');
    expect(lastOrder.items[0].foodMenuItem.description).to.equal('Muito gostoso, feito com frango desfiado');
    expect(lastOrder.items[0].foodMenuItem.price).to.equal(11.99);
  });

});