import P from 'pino';
import colorize from '@pinojs/json-colorizer';
import {TelegramAPI, TelegramInit} from '../index.js';
import {config} from 'dotenv';

config();

const init = new TelegramInit({
  token: process.env.TELEGRAM_TOKEN!,
  serverURL: process.env.SERVER_URL!,
  webhookURL: process.env.WEBHOOK_URL!,
  logger: P({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }),
});
const telegram = new TelegramAPI(init);
await telegram.setupConnection();
telegram.ev.on('message', async msg => {
  if (telegram.logger) {
    telegram.logger.info(
      colorize(JSON.stringify(msg, null, 2)),
      '[msg] New Message'
    );
  }

  if (msg?.message?.conversation) {
    const {
      conversation: {text},
    } = msg.message;
    if (text === '/test') {
      await telegram.client.sendMessage(msg.key.from, {text: 'masuk'});
    } else if (text.startsWith('/echo')) {
      await telegram.client.sendMessage(msg.key.from, {
        text: text.split(' ').slice(1).join(' '),
      });
    } else if (text === '/sticker') {
      await telegram.client.sendMessage(msg.key.from, {
        sticker:
          msg.message.contextInfo?.quotedMessage?.message.imageMessage?.id,
      });
    } else if (text === '/image') {
      await telegram.client.sendMessage(msg.key.from, {
        image: msg.message.contextInfo?.quotedMessage?.message.imageMessage?.id,
      });
    }
  }
});
