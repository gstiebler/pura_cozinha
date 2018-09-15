import { expect } from 'chai';
// import * as sinon from 'sinon';
import * as Twitter from '../../../server/src/lib/Twitter';
import { Store } from '../model/Store';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import * as logger from 'winston';
import * as pagSeguroLib from '../../../server/src/graphql/resolvers/PagSeguro';
import { Order } from '../../../server/src/db/models/Order';
import * as xmlResponse from './pagseguroResponses';

describe('consumer web app store', () => {

  // const twitterSendMessageStub = sinon.stub(Twitter, 'sendTwit', () => {});
  // const createCardTokenStub = sinon.stub(pagSeguroLib, 'createCardToken').callsFake(() => {});
  // const getPaymentSessionIdStub = sinon.stub(pagSeguroLib, 'getPaymentSessionId').callsFake(() => {});
  // const getSenderHashStub = sinon.stub(pagSeguroLib, 'getSenderHash').callsFake(() => {});
  // const transactionRequestStub = sinon.stub(pagSeguroLib, 'transactionPostRequest').callsFake(() => {});

  before(async () => {
    await initFixtures();
  });

  beforeEach(() => {
    //twitterSendMessageStub.returns(null);
  })

  afterEach(() => {
    // twitterSendMessageStub.restore();
    // createCardTokenStub.restore();
    // getPaymentSessionIdStub.restore();
    // getSenderHashStub.restore();
    // transactionRequestStub.restore();
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

  // it('send order with payment (successful)', async () => {
  //   //Mocks
  //     // createCardTokenStub.resolves('e87bd21e4eb2469f908ef61822b61ac0');
  //     // getPaymentSessionIdStub.resolves('ff49a2ef41814e4da7c0de1da73373f5');
  //     // getSenderHashStub.resolves('0e46eb437854589a89decf8590a11dcb272159ac72dfbc458ae67c7132a07e8a');
  //     // transactionRequestStub.resolves(xmlResponse.successResponse);

  //   const store = new Store();
  //   await store.onMenuPageLoad();
  //   store.usePreviousPayment = false;
  //   //Order items
  //   const sandubaFrango = store.foodMenuItems[0];
  //   store.onFmiSelected(sandubaFrango._id);
  //   store.onItemQtyIncreased(store.lastItemIndex);

  //   expect(store.orderSummary.items[0].fmi.title).to.equal('Sanduba de frango');
  //   expect(store.orderSummary.items[0].fmi.price).to.equal(11.99);
  //   expect(store.orderSummary.items[0].qty).to.equal(1);

  //   expect(store.orderSummary.totalAmount).to.be.closeTo(11.99, 0.001);
  //   store.onLocalSelected('Stella Vita');
  //   store.onPaymentOptionSelected('Cartão');
  //   store.onTelNumberChanged('1234');
  //   store.onCommentsChanged('Sem cebola, por favor');

  //   //Payment info
  //   store.onCardNameChanged('4111111111111111');
  //   store.onCVVChanged('123');
  //   store.onExpirationDateChanged('12/2020');
  //   store.onSenderNameChanged('Keawa Uscasao da Xuase');
  //   store.onSenderCpfChanged('66471535007');
  //   store.onSenderBirthdayChanged('18/03/1994');
  //   store.onSenderPhoneChanged('98 983329436');
  //   store.onSenderEmailChanged('keawa@sandbox.pagseguro.com.br');
  //   store.toggleIsCardHolderOwner(); //It will receive new info for credit card holder
  //   store.onCardNameChanged('Dafao Rugupayl Suyta');
  //   store.onCardCpfChanged('89158039066');
  //   store.onCardBirthdayChanged('12/02/1993');
  //   store.onCardPhoneChanged('98 991339372');
  //   await store.pagSeguroTransaction();
  // });
});