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

  it('get default kitchen', async () => {
    const store = new Store();
    await store.getKitchen();    
    expect(store.kitchen._id).to.equal('5aa9b17fe5a77b0c7ba3145e');
  });

  it('get food menu items', async () => {
    const store = new Store();
    await store.onMenuPageLoad();
    expect(store.foodMenuItems[0].title).to.equal('Sanduba de frango');
    expect(store.foodMenuItems[1].title).to.equal('Açai');
    expect(store.foodMenuItems[2].title).to.equal('Sanduíche de Mignon');

    expect(store.foodMenuItems[1].boolOptions).to.have.lengthOf(1);
    expect(store.foodMenuItems[1].boolOptions[0].label).to.equal('Granola');
    expect(store.foodMenuItems[1].boolOptions[0].price).to.equal(2.00);

    const sanduicheMignonItem = store.foodMenuItems[2];
    expect(sanduicheMignonItem.options).to.have.lengthOf(1);
    expect(sanduicheMignonItem.options[0].optionItems).to.have.lengthOf(2);

    const sanduicheMignonItemSauce = sanduicheMignonItem.options[0];
    expect(sanduicheMignonItemSauce.label).to.equal('Molho');

    const barbecueSauce = sanduicheMignonItemSauce.optionItems[0];
    expect(barbecueSauce.label).to.equal('Barbecue');
    expect(barbecueSauce.price).to.equal(1.00);
  });

  it('order summary', async () => {
    const store = new Store();
    await store.onMenuPageLoad();
    store.onFmiSelected(store.foodMenuItems[0]._id);
    store.onItemQtyIncreased(store.lastItemIndex);
    store.onItemQtyIncreased(store.lastItemIndex);
    expect(store.orderSummary.items[0].fmi.title).to.equal('Sanduba de frango');
    expect(store.orderSummary.items[0].fmi.price).to.equal(11.99);
    expect(store.orderSummary.items[0].qty).to.equal(2);
    expect(store.orderSummary.totalAmount).to.equal(23.98);
  });

  it('send order', async () => {
    const store = new Store();
    await store.onMenuPageLoad();

    const sandubaFrango = store.foodMenuItems[0];
    store.onFmiSelected(sandubaFrango._id);
    store.onItemQtyIncreased(store.lastItemIndex);
    store.onItemQtyIncreased(store.lastItemIndex);

    const acai = store.foodMenuItems[1];
    store.onFmiSelected(acai._id);
    const granola = acai.boolOptions[0];
    store.onItemQtyIncreased(store.lastItemIndex);
    store.onBoolOptionSelected(store.lastItemIndex, granola.key);

    const sandMignon = store.foodMenuItems[2];
    const molho = sandMignon.options[0];
    const italian = molho.optionItems[1];
    store.onFmiSelected(sandMignon._id);
    store.onItemQtyIncreased(store.lastItemIndex);
    store.onMenuItemOptionSelected(store.lastItemIndex, molho.key, italian.key);
  
    expect(store.orderSummary.items[0].fmi.title).to.equal('Sanduba de frango');
    expect(store.orderSummary.items[0].fmi.price).to.equal(11.99);
    expect(store.orderSummary.items[0].qty).to.equal(2);
    // 2 * (11.99) + (8.00 + 2.00) + (15.00 + 1.20)
    expect(store.orderSummary.totalAmount).to.be.closeTo(50.18, 0.001);
    store.onLocalSelected('Stella Vita');
    store.onPaymentOptionSelected('Dinheiro');
    store.onTelNumberChanged('1234');
    store.onCommentsChanged('Comida muito boa!');
    await store.onSendOrderRequested();

    const orders = await Order.find().sort({createdOn:-1}).limit(1);
    const lastOrder = orders[0];
    expect(lastOrder.status).to.equal('PENDING');
    expect(lastOrder.userId).to.equal('coffee_shop');
    expect(lastOrder.paymentOption).to.equal('Dinheiro');
    expect(lastOrder.telephoneNumber).to.equal('1234');
    expect(lastOrder.comments).to.equal('Comida muito boa!');
    expect(lastOrder.totalAmount).to.be.closeTo(50.18, 0.001);
    expect(lastOrder.items).to.have.lengthOf(3);
    expect(lastOrder.items[0].qty).to.equal(2);
    expect(lastOrder.items[0].itemTotalPrice).to.be.closeTo(23.98, 0.001);
    expect(lastOrder.items[0].foodMenuItem.title).to.equal('Sanduba de frango');
    expect(lastOrder.items[0].foodMenuItem.description).to.equal('Muito gostoso, feito com frango desfiado');
    expect(lastOrder.items[0].foodMenuItem.price).to.equal(11.99);
  });

});