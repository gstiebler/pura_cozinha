import { expect } from 'chai';
import { Store } from '../model/Store';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import { Order } from '../../../server/src/db/models/Order';
import * as logger from 'winston';
import * as moment from 'moment-timezone';

describe('kitchen web app store', () => {

  beforeEach(async () => {
    await initFixtures();
  });

  it('get default kitchen', async () => {
    const store = new Store();
    await store.getDefaultKitchen();
    expect(store.kitchen._id).to.equal('5aa9b17fe5a77b0c7ba3145e');
  });

  it('get closed orders', async () => {
    const store = new Store();
    await store.onOrdersOpen('CLOSED');
    expect(store.orders).to.have.lengthOf(3);
    expect(store.orders[2].local).to.equal('Prédio 2');
    expect(store.orders[2].totalAmount).to.equal(48.0);
  });

  it('get menu items by kitchen', async () => {
    const store = new Store();
    await store.getDefaultKitchen();
    expect(store.kitchen._id).to.equal('5aa9b17fe5a77b0c7ba3145e');
    await store.getItemsByKitchen();
    expect(store.foodMenuItems[0].title).to.equal('Sanduba de frango');
    expect(store.foodMenuItems[1].title).to.equal('Açai');
    expect(store.foodMenuItems[2].title).to.equal('Sanduíche de Mignon');
  });

  it('update items availability', async () => {
    const store = new Store();
    await store.getDefaultKitchen();
    expect(store.kitchen._id).to.equal('5aa9b17fe5a77b0c7ba3145e');
    await store.getItemsByKitchen();
    await store.updateItemAvailabilityInStock(store.foodMenuItems[0]._id);
    await store.updateItemAvailabilityInStock(store.foodMenuItems[1]._id);
    expect(store.kitchen.stock[0].quantity).to.equal(0);
    expect(store.kitchen.stock[1].quantity).to.equal(1);
  });

  it('update kitchen activeness', async () => {
    const store = new Store();
    await store.getDefaultKitchen();
    expect(store.kitchen._id).to.equal('5aa9b17fe5a77b0c7ba3145e');
    await store.onKitchenStatusChange();
    expect(store.kitchen.active).to.equal(false);
  });

  it('getOrderDetails', async () => {
    const store = new Store();
    await store.onOrdersOpen('OPEN');
    await store.onOrderSelected(store.orders[0]._id);
    expect(store.currentOrder.local).equal('Prédio 1');
    expect(store.currentOrder.items[0].qty).equal(2);
  });

  it('update order status', async () => {
    const store = new Store();
    await store.onOrdersOpen('OPEN');
    await store.onOrderSelected(store.orders[0]._id);
    await store.onStatusChanged('DELIVERED');
    const order = await Order.findById(store.orders[0]._id);
    expect(order.statusHistory).to.have.lengthOf(1);
    expect(order.statusHistory[0].status).to.equal('DELIVERED');
  });

  it('save kitchen comments', async () => {
    const store = new Store();
    await store.onOrdersOpen('OPEN');
    await store.onOrderSelected(store.orders[0]._id);
    store.onCommentsChanged('Cliente pediu sem cebola');
    await store.saveKitchenComments();
    expect(store.currentOrder.kitchenComments).to.equal('Cliente pediu sem cebola');
  });

  it('get ingredient types stock', async () => {
    const store = new Store();
    await store.onIngredientTypesStockPage();
    const it1 = store.ingredientTypes.filter(obj => obj.title === 'Carne moída')[0];
    const itStock1 = store.ingredientTypesStock.filter(obj => obj._id === it1._id)[0];
    expect(itStock1.total).to.equal(3);

    const it2 = store.ingredientTypes.filter(obj => obj.title === 'Seleta de Legumes')[0];
    const itStock2 = store.ingredientTypesStock.filter(obj => obj._id === it2._id)[0];
    expect(itStock2.total).to.equal(15);

    const it3 = store.ingredientTypes.filter(obj => obj.title === 'Leite')[0];
    const itStock3 = store.ingredientTypesStock.filter(obj => obj._id === it3._id)[0];
    expect(itStock3.total).to.equal(10);
  });

});