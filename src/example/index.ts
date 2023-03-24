import P from 'pino';
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
telegram.ev.on('message', async (msg: ParsedMessageInfo) => {
  if (telegram.logger) {
    telegram.logger.info(msg, '[msg] New Message');
  }

  if (msg?.message?.conversation) {
    if (msg?.message?.conversation.text === '/test') {
      await telegram.client.sendMessage(msg.key.from, {text: 'masuk'});
    } else if (msg?.message?.conversation.text.startsWith('/echo')) {
      await telegram.client.sendMessage(msg.key.from, {
        text: msg?.message?.conversation.text.split(' ').slice(1).join(' '),
      });
    }
  }
});
