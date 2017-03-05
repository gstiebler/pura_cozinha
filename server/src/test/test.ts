import * as assert from 'assert';

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import execFixtures from './fixtures/fixture';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        }
      }
    }
  })
});

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
      const result = await graphql(schema, query);
      console.log(result);
    });
  });
});

