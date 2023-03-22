import {config} from 'dotenv';

config();

import express from 'express';
import axios from 'axios';
const {PORT, TELEGRAM_TOKEN, SERVER_URL} = process.env;

const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const URI = `/webhook/${TELEGRAM_TOKEN}`;
const webhookURL = `${SERVER_URL}${URI}`;

const app = express();

app.use(express.json());

const setupWebhook = async () => {
  try {
    const {data} = await axios.get(
      `${TELEGRAM_API}/setWebhook?url=${webhookURL}&drop_pending_updates=true`
    );
    console.log(data);
  } catch (error) {
    return error;
  }
};

app.post(URI, (req, res) => {
  console.log(JSON.stringify(req.body, undefined, 2));

  res.status(200).send('ok');
});

app.listen(PORT, async () => {
  try {
    console.log(`Server is up and Running at PORT : ${PORT}`);
    await setupWebhook();
  } catch (error: any) {
    console.log(error.message);
  }
});
