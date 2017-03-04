import { assert } from 'chai';

async function bfun() {
  throw 'problema';
}

describe('Array', function() {
  describe('#indexOf()', function() {
    let a = new Promise((accept, reject) => {
      accept('guilherme');
    });

    it('should return -1 when the value is not present', async function() {
      const b = await a.then();
      assert.equal('guilherme', b);
      assert.equal(-1, [1,2,3].indexOf(4));
      await bfun();
    });
  });
});