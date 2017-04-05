import * as TelegramBot from 'node-telegram-bot-api';
import * as winston from 'winston';
import { Kitchen } from '../db/models/kitchen';

export function startServer(token) {
  const bot = new TelegramBot(token, {polling: true});
  bot.on('message', onMessage.bind(null, bot));
  winston.info('Started Telegram kitchen server');
}

function onMessage(bot, msg) {
  console.log(JSON.stringify(msg, undefined, 2));
  const chatId = msg.chat.id;
  sendMainMenu(bot, chatId, msg.from.username);
}

async function sendMainMenu(bot, chatId, username: string) {
  const kitchen: any = await Kitchen.findOne({ 'telegram_username': username });
  if (!kitchen) {
    bot.sendMessage(chatId, 'Cozinha não encontrada');
    return;
  }
  let msg = '';
  if (kitchen.active === 'YES') {
    msg = 'Cozinha está ativa';
  } else {
    msg = 'Cozinha está inativa';
  }
  bot.sendMessage(chatId, msg);
}