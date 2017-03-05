import * as assert from 'assert';
import execFixtures from './fixtures/fixture';
import { execGQLQuery } from '../graphql_controller';

let a = new Promise((accept, reject) => {
  accept('guilherme');
});

describe('basic tests', function() {

  beforeEach(async function() {
    await execFixtures();
  });

  describe('second level of basic tests', function() {

    it('should return -1 when the value is not present', async function() {
      const b = await a.then();
      assert.equal('guilherme', b);
      assert.equal(-1, [1,2,3].indexOf(4));
    });

    it('graphql', async function() {
      const query = 'query teste { hello }';
      const result = await execGQLQuery(query);
      assert.equal('world', result.data.hello);
    });

    it('kitchen test', async function() {
      const query = 'query { kitchens { _id, name, address } }';
      const result = await execGQLQuery(query);
      assert.equal('Cozinha do Marcel', result.data.kitchens[0].name);
    });
  });
});

