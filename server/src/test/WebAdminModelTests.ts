import * as assert from 'assert';
import * as winston from 'winston';
import fetch from 'node-fetch';
import execFixtures from './fixtures/fixture';
import { MenuItem } from '../db/models/menuItem';
import { Order } from '../db/models/Order';
import * as KitchenSchema from '../db/models/kitchen';
import * as TestUtils from './lib/TestUtils';

import { Model, Kitchen } from '../WebAdmin/lib/Model';
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

  it('getFoodMenu', async function() {
    const model: Model = this.model;
    const foodMenu: any[] = await model.getFoodMenuItems();
    assert.equal(3, foodMenu.length);
    assert.equal('Sanduba de frango', foodMenu[0].title);
    assert.equal(8.0, foodMenu[1].price);
  });

  it('get orders', async function() {
    const model: Model = this.model;
    const orders = await model.getOrders();
    assert.equal(2, orders.length);
    assert.equal(38.5, orders[1].total);
    assert.equal('Outra cozinha', orders[1].kitchen.name);
  });

  it('get kitchens', async function() {
    const model: Model = this.model;
    const kitchens = await model.getKitchens();
    assert.equal(2, kitchens.length);
    assert.equal('Outra cozinha', kitchens[1].name);
    assert.equal('Rua bem central', kitchens[1].address);
  });

  it('save kitchen', async function() {
    const kitchen: Kitchen = {
      name: 'nome para salvar',
      address: 'endereço para salvar'
    };
    const model: Model = this.model;
    await model.saveKitchen(kitchen);
    const kitchens: any[] = await KitchenSchema.Kitchen.find();
    assert.equal(3, kitchens.length);
    assert.equal(kitchen.name, kitchens[2].name);
    assert.equal(kitchen.address, kitchens[2].address);
  });

  it('update kitchen', async function() {
    const model: Model = this.model;
    const kitchen_id = await TestUtils.idByValue(KitchenSchema.Kitchen, 'name', 'Cozinha do Marcel');
    const newKitchen: Kitchen = {
      _id: kitchen_id,
      name: 'cozinha editada',
      address: 'address editado'
    };
    const res = await model.updateKitchen(newKitchen);
    assert.equal('OK', res);
    const editedKitchen: any = await KitchenSchema.Kitchen.findById(kitchen_id);
    assert.equal(newKitchen.name, editedKitchen.name);
    assert.equal(newKitchen.address, editedKitchen.address);

    const allKitchens = await KitchenSchema.Kitchen.find();
    assert.equal(2, allKitchens.length);
  });

  it('get one kitchen', async function() {
    const model: Model = this.model;
    const kitchen_id = await TestUtils.idByValue(KitchenSchema.Kitchen, 'name', 'Cozinha do Marcel');
    const kitchen = await model.getKitchen(kitchen_id);
    assert.equal('Cozinha do Marcel', kitchen.name);
    assert.equal('Endereço', kitchen.address);
  });

});