import * as TelegramBot from 'node-telegram-bot-api';
import * as winston from 'winston';
import { KitchenBotLogic, getKitchenLogic } from './KitchenBotLogic';

export function startServer(token) {
  const bot = new TelegramBot(token, {polling: true});
  bot.on('message', onMessage.bind(null, bot));
  bot.on('callback_query', onCallbackQuery.bind(null, bot));
  winston.info('Started Telegram kitchen server');
}

async function onMessage(bot, msg) {
  console.log(JSON.stringify(msg, undefined, 2));
  const chatId = msg.chat.id;
  const username = msg.from.username;
  const logic = await getKitchenLogic(username, sendMessage.bind(null, bot, chatId));
  logic.receive(msg);
}

async function onCallbackQuery(bot, callbackQuery) {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  console.log('Callback query', JSON.stringify(callbackQuery, undefined, 2));
  const chatId = msg.chat.id;
  const username = callbackQuery.from.username;
  const logic = await getKitchenLogic(username, sendMessage.bind(null, bot, chatId));
  logic.callbackQuery(callbackQuery);
}

function sendMessage(bot, chatId, msg, options) {
  bot.sendMessage(chatId, msg, options);
}