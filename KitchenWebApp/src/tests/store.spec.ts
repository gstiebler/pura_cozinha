import { expect } from 'chai';
import { Store } from '../model/Store';
import { initFixtures } from '../../../server/src/test/fixtures/fixture';
import { Order } from '../../../server/src/db/models/Order';
import  OrderInfiniteScrollFixtures  from '../../../server/src/test/fixtures/OrderInfiniteScrollFixtures';
import * as ConsumerStore from '../../../ConsumerWebApp/src/model/Store';
import * as AdminStore from '../../../WebAdminApp/src/model/Store';

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

  it('check ingredient types stock processes', async () => {
    const store = new Store();
    await store.getDefaultKitchen();
    await store.onIngredientTypesStockPage();
    const ingredient = store.ingredientTypes.find(it => it.title == "Filé Mignon");

    //Init test considering only purchases and orders of File Mignon based on test fixtures
    const itStock1 = store.ingredientTypesStock.find(obj => obj._id === ingredient._id); 
    expect(itStock1.total).to.equal(9.8);

    //Test of editing ingredient type kitchen stock of 'File Mignon'
    store.setCurrentIngredientType(ingredient._id);
    store.onKitchenStockQtyChanged('30');
    await store.updateIngredientTypeStock();
    const itStock = store.ingredientTypesStock.find(obj => obj._id === ingredient._id); 
    expect(itStock.total).to.equal(30);

    //Test of adding new purchase of 'File Mignon' after stock edit
    const adminStore = new AdminStore.Store();
    await adminStore.onPurchasesPageLoad();
    adminStore.ingredientTypeSelected(ingredient._id);
    adminStore.quantityChanged('4.5');
    adminStore.valueChanged('120');
    adminStore.buyDateChanged(new Date());
    adminStore.addNewPurchase();
    await adminStore.onSendPurchaseRequested();

    await store.onIngredientTypesStockPage();
    const prStock = store.ingredientTypesStock.find(obj => obj._id === ingredient._id); 
    expect(prStock.total).to.equal(34.5);

    //Test stock after ordering 2 Mignon sandwiches
    const consumerStore = new ConsumerStore.Store();
    await consumerStore.onMenuPageLoad();
    const sandMignon = consumerStore.foodMenuItems[2];
    consumerStore.onFmiSelected(sandMignon._id);
    consumerStore.onItemQtyIncreased(consumerStore.lastItemIndex);
    consumerStore.onItemQtyIncreased(consumerStore.lastItemIndex);
    consumerStore.onLocalSelected('Stella Vita');
    consumerStore.onPaymentOptionSelected('Dinheiro');
    consumerStore.onTelNumberChanged('1234');
    consumerStore.onCommentsChanged('Teste de baixa de estoque');
    await consumerStore.onSendOrderRequested();

    await store.onIngredientTypesStockPage();
    const csStock = store.ingredientTypesStock.find(obj => obj._id === ingredient._id); 
    expect(csStock.total).to.equal(34.1);
  });

  it('check orders infinite scroll', async () => {
    //init order fixtures for infinite scrolling test - 10 more
    await Order.insertMany(await OrderInfiniteScrollFixtures());

    //Test start
    const store = new Store();
    await store.onOrdersOpen('OPEN');
    expect(store.orders.length).to.equal(7);
    expect(store.hasMore).to.equal(true);

    await store.fetchMoreOrdersData();
    expect(store.orders.length).to.equal(11);
    expect(store.hasMore).to.equal(false);
  });


});