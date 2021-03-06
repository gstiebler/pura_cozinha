import * as assert from 'assert';
import * as http from 'http';
import * as winston from 'winston';
import fetch from 'node-fetch';
import { initFixtures } from './fixtures/fixture';
import app from './../app';

const port = '4000';

async function fetchQuery(query: string) {
  const res = await fetch('http://localhost:' + port + '/graphql', {
    method: 'POST',
    headers: { "Content-type": "application/json", "Accept": "application/json"},
    body: JSON.stringify({ query })
  });
  const json = await res.json();
  return json.data;
}

describe('functional express api tests', function() {

  before(async function() {
    const server = http.createServer(app);
    server.listen(port);
    server.on('error', (err) => {
      winston.error(err.stack);
    });
    this.server = server;
  });

  after(async function() {
    this.server.close();
  });

  beforeEach(async function() {
    await initFixtures();
  });

  it('first test', async function() {
    const kitchenFields = '_id, name, address';
    const queryKitchens = 'query { kitchens { ' + kitchenFields + ' } }';
    const data = await fetchQuery(queryKitchens);
    const kitchens = data.kitchens;
    assert.equal(3, kitchens.length);
    assert.equal('Cozinha do Marcel', kitchens[0].name);
    assert.equal('Rua Barata Ribeiro, 419', kitchens[1].address);
  });

});