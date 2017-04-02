import * as assert from 'assert';
import * as winston from 'winston';
import fetch from 'node-fetch';
import execFixtures from './fixtures/fixture';
import { MenuItem } from '../db/models/menuItem';
import { Order } from '../db/models/Order';
import * as TestUtils from './lib/TestUtils';

import { Model } from '../MobileApp/Model';
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

  it('getFoodMenu', async function() {
    await this.model.fetchFoodMenu();
    const foodMenu: any[] = this.model.getFoodMenu();
    assert.equal(3, foodMenu.length);
    assert.equal('Sanduba de frango', foodMenu[0].title);
    assert.equal(8.0, foodMenu[1].price);
  });

  it('save order', async function() {
    const sandubaFrango: any = await MenuItem.findOne({ title: 'Sanduba de frango' });
    await this.model.fetchFoodMenu();
    this.model.setCartQty(sandubaFrango._id, 3);
    await this.model.pay({});

    const orders: any[] = await Order.find();
    assert.equal(3, orders.length);
    const lastOrder = orders[2];
    assert.equal('333', lastOrder.user_id);
    assert.equal(1, lastOrder.items.length);
    assert.equal('Sanduba de frango', lastOrder.items[0].title);
  });

  describe('Kitchen', function() {

    it('Kitchens by distance', async function() {
      const cariocaCoordinates = {
        lat: -22.906922,
        lng: -43.178046
      };
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
