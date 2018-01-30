import * as assert from 'assert';
import { initFixtures } from './fixtures/fixture';
import { User } from '../db/models/User';

describe('User tests', function() {

  beforeEach(async function() {
    await initFixtures();
  });

  it('password', async function() {
    const guilherme = await User.findOne({ login: 'gstiebler' });
    assert.ok(guilherme.passwordMatch('senha_guilherme123'));
    assert.ok(!guilherme.passwordMatch('outra_senha'));
    assert.notEqual('senha_guilherme123', guilherme.password);
    assert.ok(guilherme.password.length > 10);
  });
});
