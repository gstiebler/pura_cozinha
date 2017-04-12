import * as assert from 'assert';
import execFixtures from './fixtures/fixture';
import { KitchenBotLogic } from '../KitchenTelegram/KitchenBotLogic';
import { Kitchen } from '../db/models/kitchen';
import { MenuItem } from '../db/models/menuItem';


describe('Kitchen Telegram', function() {

  beforeEach(async function() {
    await execFixtures();
  });

  it('first', async function() {
    const responses = [];
    function sendMessage(msg: string, options?: any) {
      responses.push({msg, options});
    }

    function lastResponse() {
      return responses[responses.length - 1];
    }

    const logic = new KitchenBotLogic(sendMessage);
    await logic.initialize('marcel');

    await logic.receive({ text: 'a' });
    assert.equal('Cozinha está ativa', lastResponse().msg);
    let replay_markup = JSON.parse(lastResponse().options.reply_markup);
    assert.equal(2, replay_markup.keyboard.length);
    assert.equal('Definir cozinha como inativa', replay_markup.keyboard[0][0].text);
    assert.equal('Modificar estoque', replay_markup.keyboard[1][0].text);

    await logic.receive({ text: 'Definir cozinha como inativa' });
    assert.equal('Cozinha está inativa', lastResponse().msg);
    replay_markup = JSON.parse(lastResponse().options.reply_markup);
    assert.equal(2, replay_markup.keyboard.length);
    assert.equal('Definir cozinha como ativa', replay_markup.keyboard[0][0].text);
    assert.equal('Modificar estoque', replay_markup.keyboard[1][0].text);
    const kitchen1: any = await Kitchen.findOne({ name: 'Cozinha do Marcel' });
    assert.equal('NO', kitchen1.active);

    await logic.receive({ text: 'Modificar estoque' });
    assert.equal('Estoque:\nSanduba de frango: 8\nAçai: 0\nSanduíche de Mignon: 7\n', lastResponse().msg);
    replay_markup = JSON.parse(lastResponse().options.reply_markup);
    assert.equal(3, replay_markup.inline_keyboard.length);
    assert.equal('Sanduba de frango', replay_markup.inline_keyboard[0][0].text);
    assert.equal('Açai', replay_markup.inline_keyboard[1][0].text);
    assert.equal('Sanduíche de Mignon', replay_markup.inline_keyboard[2][0].text);

    const sanduba: any = await MenuItem.findOne({ title: 'Sanduba de frango' });
    await logic.callbackQuery({ data: sanduba._id.toString() });
    assert.equal('Digite a quantidade de Sanduba de frango:', lastResponse().msg);
    await logic.receive({ text: '6' });
    const kitchen2: any = await Kitchen.findOne({ name: 'Cozinha do Marcel' });
    assert.equal(6, kitchen2.stock[0].quantity);
    assert.equal('Quantidade de Sanduba de frango atualizada para 6', responses[responses.length - 2].msg);
    assert.equal('Cozinha está inativa', lastResponse().msg);
    replay_markup = JSON.parse(lastResponse().options.reply_markup);
    assert.equal(2, replay_markup.keyboard.length);
    assert.equal('Definir cozinha como ativa', replay_markup.keyboard[0][0].text);
    assert.equal('Modificar estoque', replay_markup.keyboard[1][0].text);
  });

});