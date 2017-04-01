import * as assert from 'assert';
import * as winston from 'winston';
import fetch from 'node-fetch';
import execFixtures from './fixtures/fixture';
import { MenuItem } from '../db/models/menuItem';
import { Order } from '../db/models/Order';
import * as KitchenSchema from '../db/models/kitchen';
import * as MenuItemSchema from '../db/models/menuItem';
import * as TestUtils from './lib/TestUtils';

import { Model, Kitchen, FoodMenuItem } from '../WebAdmin/lib/Model';
import { Network } from '../WebAdmin/lib/Network';


describe('Web Admin model test', function() {

  before(async function() {
    this.server = TestUtils.createServer();
    this.network = new Network(TestUtils.baseURL, fetch);
  });

  after(async function() {
    this.server.close();
  });

  beforeEach(async function() {
    await execFixtures();
    this.model = new Model(this.network);
  });

  it('get orders', async function() {
    const model: Model = this.model;
    const orders = await model.getOrders();
    assert.equal(2, orders.length);
    assert.equal(38.5, orders[1].total);
    assert.equal('Outra cozinha', orders[1].kitchen.name);
  });

  describe('kitchen', function() {

    it('get kitchens', async function() {
      const model: Model = this.model;
      const kitchens = await model.getKitchens();
      assert.equal(3, kitchens.length);
      assert.equal('Outra cozinha', kitchens[1].name);
      assert.equal('Rua Barata Ribeiro, 419', kitchens[1].address);
    });

    it('save kitchen', async function() {
      const kitchen: Kitchen = {
        name: 'nome para salvar',
        address: 'endereço para salvar',
        coordinates: {
          lat: 30,
          lng: 40
        }
      };
      const model: Model = this.model;
      await model.saveKitchen(kitchen);
      const kitchens: any[] = await KitchenSchema.Kitchen.find();
      assert.equal(4, kitchens.length);
      assert.equal(kitchen.name, kitchens[3].name);
      assert.equal(kitchen.address, kitchens[3].address);
      assert.equal(kitchen.coordinates.lat, kitchens[3].coordinates.lat);
    });

    it('update kitchen', async function() {
      const model: Model = this.model;
      const kitchen_id = await TestUtils.idByValue(KitchenSchema.Kitchen, 'name', 'Cozinha do Marcel');
      const newKitchen: Kitchen = {
        _id: kitchen_id,
        name: 'cozinha editada',
        address: 'address editado',
        coordinates: {
          lat: 55,
          lng: 66
        }
      };
      const res = await model.updateKitchen(newKitchen);
      assert.equal('OK', res);
      const editedKitchen: any = await KitchenSchema.Kitchen.findById(kitchen_id);
      assert.equal(newKitchen.name, editedKitchen.name);
      assert.equal(newKitchen.address, editedKitchen.address);
      assert.equal(newKitchen.coordinates.lat, editedKitchen.coordinates.lat);

      const count = await KitchenSchema.Kitchen.count({});
      assert.equal(3, count);
    });

    it('get one kitchen', async function() {
      const model: Model = this.model;
      const kitchen_id = await TestUtils.idByValue(KitchenSchema.Kitchen, 'name', 'Cozinha do Marcel');
      const kitchen = await model.getKitchen(kitchen_id);
      assert.equal('Cozinha do Marcel', kitchen.name);
      assert.equal('R. Jorn. Henrique Cordeiro, 310', kitchen.address);
      assert.equal(-43.321984, kitchen.coordinates.lng);
    });

    it('delete kitchen', async function() {
      const model: Model = this.model;
      const kitchen_id = await TestUtils.idByValue(KitchenSchema.Kitchen, 'name', 'Cozinha do Marcel');
      await model.deleteKitchen(kitchen_id);
      const deletedKitchen: any = await KitchenSchema.Kitchen.findById(kitchen_id);
      assert.ok(!deletedKitchen);
      const count = await KitchenSchema.Kitchen.count({});
      assert.equal(2, count);
    });

  });

  describe('Food menu items', function() {

    it('Get items', async function() {
      const model: Model = this.model;
      const foodMenu: any[] = await model.getFoodMenuItems();
      assert.equal(3, foodMenu.length);
      assert.equal('Sanduba de frango', foodMenu[0].title);
      assert.equal(8.0, foodMenu[1].price);
    });

    it('Create', async function() {
      const foodMenuItem: FoodMenuItem = {
        title: 'nome para salvar',
        description: 'endereço para salvar',
        price: 33.4,
        imgURL: 'google.com/example.jpg'
      };
      const model: Model = this.model;
      await model.saveFoodMenuItem(foodMenuItem);
      const foodMenuItems: any[] = await MenuItemSchema.MenuItem.find();
      assert.equal(4, foodMenuItems.length);
      assert.equal(foodMenuItem.title, foodMenuItems[3].title);
      assert.equal(foodMenuItem.description, foodMenuItems[3].description);
      assert.equal(foodMenuItem.price, foodMenuItems[3].price);
      assert.equal(foodMenuItem.imgURL, foodMenuItems[3].imgURL);
    });

    it('Update', async function() {
      const model: Model = this.model;
      const acai_id = await TestUtils.idByValue(MenuItemSchema.MenuItem, 'title', 'Açai');
      const newFMI: FoodMenuItem = {
        _id: acai_id,
        title: 'nome para editar',
        description: 'endereço para editar',
        price: 42.42,
        imgURL: 'wikipedia.com/food.jpg'
      };
      const res = await model.updateFoodMenuItem(newFMI);
      assert.equal('OK', res);
      const editedFMI: any = await MenuItemSchema.MenuItem.findById(acai_id);
      assert.equal(newFMI.title, editedFMI.title);
      assert.equal(newFMI.description, editedFMI.description);
      assert.equal(newFMI.price, editedFMI.price);
      assert.equal(newFMI.imgURL, editedFMI.imgURL);

      const count = await MenuItemSchema.MenuItem.count({});
      assert.equal(3, count);
    });

    it('Read one', async function() {
      const model: Model = this.model;
      const acai_id = await TestUtils.idByValue(MenuItemSchema.MenuItem, 'title', 'Açai');
      const fmi = await model.getFoodMenuItem(acai_id);
      assert.equal('Açai', fmi.title);
      assert.equal('Açai batido com banana e morango, vem cheião.', fmi.description);
      assert.equal(8.00, fmi.price);
      assert.equal('http://www.mundoboaforma.com.br/wp-content/uploads/2015/04/Acai-na-Tigela-500x330.jpg', fmi.imgURL);
    });

    it('Delete', async function() {
      const model: Model = this.model;
      const acai_id = await TestUtils.idByValue(MenuItemSchema.MenuItem, 'title', 'Açai');
      await model.deleteFoodMenuItem(acai_id);
      const deletedFMI: any = await MenuItemSchema.MenuItem.findById(acai_id);
      assert.ok(!deletedFMI);
      const count = await MenuItemSchema.MenuItem.count({});
      assert.equal(2, count);
    });

  });

});