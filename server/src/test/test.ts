import * as assert from 'assert';
import execFixtures from './fixtures/fixture';
import { execGQLQuery } from '../graphql_controller';

let a = new Promise((accept, reject) => {
  accept('guilherme');
});

describe('Array', function() {

  beforeEach(async function() {
    await execFixtures();
  });

  describe('#indexOf()', function() {

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

    it('kitchen', async function() {
      const query = 'query { kitchen }';
      const result = await execGQLQuery(query);
      const parsed = JSON.parse(result.data.kitchen);
      assert.equal('Cozinha do Marcel', parsed.name);
    });
  });
});

