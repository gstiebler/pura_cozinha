import * as assert from 'assert';
import execFixtures from './fixtures/fixture';
import * as MercadoPago from '../core/MercadoPago';
import { Kitchen } from '../db/models/kitchen';
import { User } from '../db/models/User';
import { MenuItem } from '../db/models/menuItem';
import { removeJSONQuotes } from '../lib/StringUtils';
import { Order } from '../db/models/Order';
import { execGQLQuery } from '../graphql/graphql_controller';


import * as mock from 'mock-require';
mock('../MobileApp/lib/NetworkUtils', '../lib/NetworkUtils');

/*mock('../MobileApp/lib/NetworkUtils', { fetchSync: function(a, b) {
  console.log('NetworkUtils called');
}});*/
import * as MercadoPagoRN from '../MobileApp/core/MercadoPago';

describe('Payment tests', function () {

  beforeEach(async function () {
    await execFixtures();

    const cc_info: MercadoPagoRN.CreditCardInfo = {
      cardNumber: '4509953566233704',
      securityCode: '123',
      expirationMonth: 12,
      expirationYear: 2020,
      cardHolderName: 'Joe Doe'
      // cpf: '05533146709'
    };
    this.cardToken = await MercadoPagoRN.cardToken(cc_info);
    // console.log('second token' + JSON.stringify(this.cardToken));
  });

  it('Mercado Pago', async function() {
    const payRes = await MercadoPago.execPay(this.cardToken.id, 10.0, 'descrip');
    assert.equal('approved', payRes.status);
  });

  it('order save', async function() {
    const sandubaFrango: any = await MenuItem.findOne({ title: 'Sanduba de frango' });
    const kitchen: any = await Kitchen.findOne();
    const user: any = await User.findOne();

    const items = [
      {
        food_menu_item_id: sandubaFrango._id,
        quantity: 1.0
      }
    ];
    const orderFields = 'user_id, cc_token, selected_kitchen_id, addresss, name, items { food_menu_item_id, quantity }';
    const orderValues = {
      user_id: user._id,
      cc_token: this.cardToken.id,
      selected_kitchen_id: kitchen._id,
      items: items
    };
    const mutSave = `mutation { saveOrder(newOrderData: ${removeJSONQuotes(orderValues)}) }`;
    const resSave = await execGQLQuery(mutSave);
    if (resSave.errors) {
      throw new Error(JSON.stringify(resSave.errors));
    }

    const orders = await Order.find();
    assert.equal(3, orders.length);
    const lastOrder: any = orders[orders.length - 1];
    assert.equal(11.99, lastOrder.total_paid);
    assert.equal('PAYMENT_OK', lastOrder.status);
    assert.equal(1, lastOrder.items.length);
    assert.equal('Sanduba de frango', lastOrder.items[0].title);
  });

});
