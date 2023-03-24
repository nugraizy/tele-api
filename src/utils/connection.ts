import {config} from 'dotenv';
import express from 'express';

config();

import {setupWebhook} from './webhook.js';
import {parseMessages} from '../parser/universal-parser.js';
import {emitHandler} from '../event/messages-received.js';

const {PORT} = process.env;

export const setupConnection = (BOT_TOKEN: string, WEBHOOK_URL: string) => {
  const URI = `/webhook/${BOT_TOKEN}`;
  const app = express();

  app.use(express.json());

  app.post(URI, (req, res) => {
    emitHandler('message', parseMessages(req.body));

    res.status(200).send('ok');
  });

  app.listen(PORT, async () => {
    try {
      console.log(`Server is up and Running at PORT : ${PORT}`);
      const webhook = await setupWebhook(WEBHOOK_URL, BOT_TOKEN);
      if (!webhook.ok) {
        console.log('Webhook failed to connect');
        process.exit(0);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  });
};
