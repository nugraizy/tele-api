import {config} from 'dotenv';
import express from 'express';
config();

import handler from '../handler/messages-received.js';
import {setupWebhook} from './webhook.js';
import type {PinoLogger} from '../types/Socket/Connection.js';

const {PORT} = process.env;

export const setupConnection = (
  BOT_TOKEN: string,
  WEBHOOK_URL: string,
  options: {logger: PinoLogger | undefined}
) => {
  const URI = `/webhook/${BOT_TOKEN}`;
  const app = express();

  app.use(express.json());

  app.post(URI, (req, res) => {
    handler(req);

    res.status(200).send('ok');
  });

  app.listen(PORT, async () => {
    try {
      options?.logger?.info({}, `Server is up and Running at PORT : ${PORT}`);
      const webhook = await setupWebhook(WEBHOOK_URL, BOT_TOKEN);
      if (!webhook.ok) {
        options?.logger?.error('Webhook failed to connect');
        process.exit(0);
      }
    } catch (error: any) {
      options?.logger?.error(error.message);
    }
  });
};
