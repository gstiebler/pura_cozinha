import * as assert from 'assert';
import * as winston from 'winston';
import fetch from 'node-fetch';
import execFixtures from './fixtures/fixture';
import { MenuItem } from '../db/models/menuItem';
import { Order, PaymentStatus } from '../db/models/Order';
import { Kitchen } from '../db/models/kitchen';
import * as TestUtils from './lib/TestUtils';

import { Network } from '../MobileApp/Network';

describe('React Native model test', function() {

  before(async function() {
    this.server = TestUtils.createServer();
    this.network = new Network(TestUtils.baseURL, fetch);
  });

  after(async function() {
    this.server.close();
  });

  beforeEach(async function() {
    await execFixtures();
    function getGeolocation() {
      return {
        latitude: 23.0,
        longitude: -45.3
      };
    }
    const asyncStorage = {
      getItem: (key) => { return '333'; },
      setItem: (a, b) => {}
    };

    this.model = new Model(this.network, asyncStorage, getGeolocation);
  });

  describe('Food menu items', function() {

    it('getFoodMenu', async function() {
      await this.model.fetchFoodMenu();
      const foodMenu: any[] = this.model.getFoodMenu();
      assert.equal(3, foodMenu.length);
      assert.equal('Sanduba de frango', foodMenu[0].title);
      assert.equal(8.0, foodMenu[1].price);
    });

    it('Food menu items by kitchen', async function() {
      const kitchen1: any = await Kitchen.findOne({ name: 'Cozinha do Marcel' });
      const model: Model = this.model;
      model.setSelectedKitchenId(kitchen1._id);
      const menuItemsByKitchen = await model.menuItemsByKitchen();
      assert.equal(2, menuItemsByKitchen.length);
      assert.equal('Sanduba de frango', menuItemsByKitchen[0].title);
      assert.equal('Sanduíche de Mignon', menuItemsByKitchen[1].title);
    });

  });

  describe('Order', function() {

    it('Save order', async function() {
      const model: Model = this.model;
      const sandubaFrango: any = await MenuItem.findOne({ title: 'Sanduba de frango' });
      await model.fetchFoodMenu();
      model.setCartQty(sandubaFrango._id.toString(), 3);
      const kitchen: any = await Kitchen.findOne();
      model.setSelectedKitchenId(kitchen._id.toString());
      model.setAddress('5th Avenue');
      model.name = 'John Doe';

      const creditCardInfo: CreditCardInfo = {
        // type: 'visa',
        cardNumber: '4509953566233704',
        expirationMonth: 12,
        expirationYear: 2020,
        securityCode: '123',
        cardHolderName: 'Joe Doe'
      };
      await model.order(creditCardInfo);

      const orders: any[] = await Order.find();
      assert.equal(4, orders.length);
      const lastOrder = orders[3];
      assert.equal(PaymentStatus.PAYMENT_OK, lastOrder.status);
      assert.equal('333', lastOrder.user_id);
      assert.equal(35.97, lastOrder.total_paid);
      assert.equal('5th Avenue', lastOrder.address);
      assert.equal('John Doe', lastOrder.name);
      assert.equal(1, lastOrder.items.length);
      assert.equal(kitchen._id.toString(), lastOrder.kitchen.toString());
      assert.equal('Sanduba de frango', lastOrder.items[0].title);
    });

    it('Convert credit card format from screen to MercadoPago', async function() {
      const interfaceCCInfo = {
        number: '4417 1196 6982 0331',
        expiry: '11/19',
        cvc: '123',
        type: 'visa'
      };
      const converted = convertCCFormat(interfaceCCInfo);
      assert.equal('4417119669820331', converted.cardNumber);
      // assert.equal('visa', converted.type);
      assert.equal('123', converted.securityCode);
      assert.equal('11', converted.expirationMonth);
      assert.equal('2019', converted.expirationYear);
    });

  });

  describe('Kitchen', function() {

    it('Kitchens by distance', async function() {
      const cariocaCoordinates = {
        lat: -22.906922,
        lng: -43.178046
      };

      const kitchensAvailable = await this.model.getKitchensByDistance(cariocaCoordinates);
      assert.equal(2, kitchensAvailable.length);
      assert.equal('Outra cozinha', kitchensAvailable[0].name);
      assert.equal('Cozinha do Marcel', kitchensAvailable[1].name);
      await Kitchen.update({ name: 'Cozinha Centro' }, { $set: { active: 'YES' } });

      const kitchensFromCarioca = await this.model.getKitchensByDistance(cariocaCoordinates);
      assert.equal('Av. Mal. Floriano, 71', kitchensFromCarioca[0].address);
      assert.equal(815, kitchensFromCarioca[0].distMeters);
      assert.equal('Rua Barata Ribeiro, 419', kitchensFromCarioca[1].address);
      assert.equal(6913, kitchensFromCarioca[1].distMeters);
      assert.equal('R. Jorn. Henrique Cordeiro, 310', kitchensFromCarioca[2].address);
      assert.equal(18343, kitchensFromCarioca[2].distMeters);

      const downtownCoordinates = {
        lat: -23.003716,
        lng: -43.317238,
      };
      const kitchensFromDowntown = await this.model.getKitchensByDistance(downtownCoordinates);
      assert.equal('R. Jorn. Henrique Cordeiro, 310', kitchensFromDowntown[0].address);
      assert.equal(515, kitchensFromDowntown[0].distMeters);
      assert.equal('Rua Barata Ribeiro, 419', kitchensFromDowntown[1].address);
      assert.equal(13984, kitchensFromDowntown[1].distMeters);
      assert.equal('Av. Mal. Floriano, 71', kitchensFromDowntown[2].address);
      assert.equal(17804, kitchensFromDowntown[2].distMeters);
    });

  });

});
