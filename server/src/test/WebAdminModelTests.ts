import * as assert from 'assert';
import * as winston from 'winston';
import fetch from 'node-fetch';
import execFixtures from './fixtures/fixture';
import { MenuItem } from '../db/models/menuItem';
import { Order } from '../db/models/Order';
import * as TestUtils from './lib/TestUtils';

import { Model } from '../../../WebAdmin/src/lib/Model';
import { Network } from '../../../WebAdmin/src/lib/Network';


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

});