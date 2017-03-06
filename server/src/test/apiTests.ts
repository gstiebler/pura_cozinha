import * as assert from 'assert';
import execFixtures from './fixtures/fixture';

describe('functional express api tests', function() {

  beforeEach(async function() {
    await execFixtures();
  });

  it('first test', async function() {
    assert.equal(-1, [1,2,3].indexOf(4));
  });

});