import * as assert from 'assert';
import execFixtures from './fixtures/fixture';
import { execGQLQuery } from '../graphql/graphql_controller';
import { Order } from '../db/models/Order';
import { MenuItem } from '../db/models/menuItem';
import * as util from 'util';
import { idByValue } from './lib/TestUtils';
import { removeJSONQuotes } from '../lib/StringUtils';


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
    assert.equal('Rua Barata Ribeiro, 419', resKitchen.data.kitchen.address);
  });

  it('kitchen save', async function() {
    const kitchenValues = `{
      name: "Teste nome cozinha",
      address: "Endereço salvar",
      coordinates: {
        lat: 11.1,
        lng: 22.2
      }
    }`;
    const mutSave = util.format('mutation { saveKitchen(newKitchenData: %s) }',
          kitchenValues);
    const resSave = await execGQLQuery(mutSave);

    const kitchenFields = 'name, address';
    const queryKitchens = 'query { kitchens { ' + kitchenFields + ' } }';
    const result = await execGQLQuery(queryKitchens);
    assert.equal(4, result.data.kitchens.length);
  });

  it('get menu items', async function() {
    const fields = '_id, title, price, imgURL';
    const query = 'query { menuItems(lat: 11.5, lng: 12.8) { ' + fields + ' } }';
    const result = await execGQLQuery(query);
    assert.equal('Sanduba de frango', result.data.menuItems[0].title);
  });
});

