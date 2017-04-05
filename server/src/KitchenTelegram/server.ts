import * as TelegramBot from 'node-telegram-bot-api';
import * as winston from 'winston';
import { KitchenBotLogic } from './KitchenBotLogic';

export function startServer(token) {
  const bot = new TelegramBot(token, {polling: true});
  bot.on('message', onMessage.bind(null, bot));
  winston.info('Started Telegram kitchen server');
}

const kitchens = new Map<string, KitchenBotLogic>();

async function onMessage(bot, msg) {
  console.log(JSON.stringify(msg, undefined, 2));
  const chatId = msg.chat.id;
  const username = msg.from.username;

  let logic: KitchenBotLogic;
  if (kitchens.has(username)) {
    logic = kitchens.get(username);
  } else {
    logic = new KitchenBotLogic(sendMessage.bind(null, bot, chatId));
    await logic.initialize(username);
    kitchens.set(username, logic);
  }

  logic.receive(msg);
}

function sendMessage(bot, chatId, msg, options) {
  bot.sendMessage(chatId, msg, options);
}