import * as assert from 'assert';
import execFixtures from './fixtures/fixture';
import { execGQLQuery } from '../graphql_controller';
import * as util from 'util';


describe('basic tests', function() {

  beforeEach(async function() {
    await execFixtures();
  });

  it('first test', async function() {
    assert.equal(-1, [1,2,3].indexOf(4));
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
});

