import * as assert from 'assert';
import execFixtures from './fixtures/fixture';
import { Kitchen } from '../db/models/kitchen';
import { User } from '../db/models/User';
import { MenuItem } from '../db/models/menuItem';
import { removeJSONQuotes } from '../lib/StringUtils';
import { Order } from '../db/models/Order';
import { execGQLQuery } from '../graphql/graphql_controller';
import * as Paypal from '../core/Paypal';

describe('Payment tests', function () {

  beforeEach(async function () {
    await execFixtures();
  });

  it('Paypal', async function () {
    const res = await Paypal.confirmPayment('PAY-3S7706967U665390ELFHPPLA', 1.70);
    assert.ok(res);
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
    assert.equal(4, orders.length);
    const lastOrder: any = orders[orders.length - 1];
    assert.equal(11.99, lastOrder.total_paid);
    assert.equal('PAYMENT_OK', lastOrder.status);
    assert.equal(1, lastOrder.items.length);
    assert.equal('Sanduba de frango', lastOrder.items[0].title);
  });

});
