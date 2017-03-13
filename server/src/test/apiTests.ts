import * as assert from 'assert';
import * as http from 'http';
import * as winston from 'winston';
import fetch from 'node-fetch';
import execFixtures from './fixtures/fixture';
import app from './../app';

function initializeServer(port) {
    app.set('port', port);
    const server = http.createServer(app);
    server.listen(port);
    server.on('error', onError);
    
    function onError(error) {
        winston.error(error);
    }
    
    return server;
}

describe('functional express api tests', function() {

  beforeEach(async function() {
    await execFixtures();
    //this.server = initializeServer(3333);
  });

  afterEach(async function() {
    //this.server.close();
  });

  it('first test', async function() {
    const kitchenFields = '_id, name, address';
    const queryKitchens = 'query { kitchens { ' + kitchenFields + ' } }';
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: { "Content-type": "application/json", "Accept": "application/json"},
      body: JSON.stringify({ query: queryKitchens })
    });
    const json = await res.json();
    const kitchens = json.data.kitchens;
    assert.equal(2, kitchens.length);
    assert.equal('Cozinha do Marcel', kitchens[0].name);
    assert.equal('Rua bem central', kitchens[1].address);
  });

});