import axios from 'axios';
import {tokens} from '../index.js';
const _api = (endpoint: string) => ({
  text: `${tokens.get('SERVER_URL')}/bot${tokens.get('BOT_TOKEN')}${endpoint}`,
});

export const sendMessage = async (
  to: number,
  message: any,
  contextInfo: any
) => {
  let url: string = '';
  let params = {};
  if ('text' in message) {
    url = _api('/sendMessage').text;
    params = {
      chat_id: to,
      text: message.text,
    };
  }

  return (await axios.get(url, {params})).data;
};
