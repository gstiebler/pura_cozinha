import * as assert from 'assert';
import execFixtures from './fixtures/fixture';
import { execGQLQuery } from '../graphql_controller';
import { Order } from '../db/models/Order';
import * as util from 'util';


describe('basic tests', function() {

  beforeEach(async function() {
    await execFixtures();
  });

  it('first test', async function() {
    assert.equal(-1, [1, 2, 3].indexOf(4));
  });

  it('graphql', async function() {
    const query = 'query teste { hello }';
    const result = await execGQLQuery(query);
    assert.equal('world', result.data.hello);
  });

  it('kitchen test', async function() {
    const kitchenFields = '_id, name, address';
    const queryKitchens = 'query { kitchens { ' + kitchenFields + ' } }';
    const result = await execGQLQuery(queryKitchens);
    assert.equal('Cozinha do Marcel', result.data.kitchens[0].name);
    const id = result.data.kitchens[1]._id;
    const queryOneKitchen = util.format('query { kitchen(id: "%s") { %s } }', id, kitchenFields);
    const resKitchen = await execGQLQuery(queryOneKitchen);
    assert.equal('Rua bem central', resKitchen.data.kitchen.address);
  });

  it('kitchen save', async function() {
    const kitchenFields = 'name, address';
    const kitchenValues = '{ name: "Teste nome cozinha", address: "Endereço salvar" }';
    const mutSave = util.format('mutation { saveKitchen(newKitchenData: %s) { %s } }',
          kitchenValues, kitchenFields);
    const resSave = await execGQLQuery(mutSave);

    const queryKitchens = 'query { kitchens { ' + kitchenFields + ' } }';
    const result = await execGQLQuery(queryKitchens);
    assert.equal(3, result.data.kitchens.length);
  });

  it('get menu items', async function() {
    const fields = '_id, title, price, imgURL';
    const query = 'query { menuItems(lat: 11.5, lng: 12.8) { ' + fields + ' } }';
    const result = await execGQLQuery(query);
    assert.equal('Sanduba de frango', result.data.menuItems[0].title);
  });

  it('order save', async function() {
    const orderFields = 'user_id, items { food_menu_item_id, quantity, item_title, price }';
    const orderValues = '{ user_id: "uuu", items: [ { food_menu_item_id: "fmii", quantity: 1.0, item_title: "it", price: 15.0 } ] }';
    const mutSave = util.format('mutation { saveOrder(newOrderData: %s) { %s } }',
          orderValues, orderFields);
    const resSave = await execGQLQuery(mutSave);

    const orders = await Order.find();
    const lastOrder: any = orders[orders.length - 1];
    assert.equal(15.35, lastOrder.total_paid);
    assert.equal('kkk', lastOrder.kitchen_id);
    assert.equal(1, lastOrder.items.length);
    assert.equal('it', lastOrder.items[0].item_title);
  });
});

