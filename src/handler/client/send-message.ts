import axios from 'axios';
import {isAbsolute} from 'path';
import {tokens} from '../../index.js';

const _api = (endpoint: string) => ({
  text: `${tokens.get('SERVER_URL')}/bot${tokens.get('BOT_TOKEN')}${endpoint}`,
});

export const sendMessage = async (
  to: number,
  message: any,
  contextInfo: any = {}
) => {
  let url: string = '';
  let params: any = {};
  try {
    if ('text' in message) {
      url = _api('/sendMessage').text;
      params = {
        chat_id: to,
        text: message.text,
      };
    } else if ('sticker' in message) {
      console.log('sini');
      url = _api('/sendSticker').text;
      const stickerFile = await prepareMedia(
        message.sticker?.url ? message.sticker.url : message.sticker
      );
      params = {
        chat_id: to,
        sticker: url,
      };
      if (stickerFile.file_path && isAbsolute(stickerFile.file_path)) {
        const pathfile = stickerFile.file_path.split('/').slice(-2);
        const stickerUrl = new URL(
          `./file/bot${tokens.get('BOT_TOKEN')}/${pathfile.join('/')}`,
          'https://api.telegram.org'
        );

        params.sticker = stickerUrl;
      } else {
        const stickerUrl = new URL(
          `./file/bot${tokens.get('BOT_TOKEN')}/${stickerFile.file_id}`,
          'https://api.telegram.org'
        );
        params.sticker = stickerUrl;
      }
    } else if ('image' in message) {
      url = _api('/sendPhoto').text;
      const imageFile = await prepareMedia(
        message.image?.url ? message.image.url : message.image
      );
      params = {
        chat_id: to,
        photo: url,
      };
      if (imageFile.file_path && isAbsolute(imageFile.file_path)) {
        const pathfile = imageFile.file_path.split('/').slice(-2);
        const imageUrl = new URL(
          `./file/bot${tokens.get('BOT_TOKEN')}/${pathfile.join('/')}`,
          'https://api.telegram.org'
        );

        params.photo = imageUrl;
      } else {
        const imageUrl = `https://api.telegram.org/file/bot${tokens.get(
          'BOT_TOKEN'
        )}/${imageFile.file_path}`;
        params.photo = imageUrl;
      }
    }

    console.log(url, params);

    return (await axios.get(url, {params})).data;
  } catch (error) {
    // console.log(error);
  }
};

const prepareMedia = async (file_id: string) =>
  (
    await axios.get(
      `https://api.telegram.org/bot${tokens.get('BOT_TOKEN')}/getFile`,
      {
        params: {
          file_id,
        },
      }
    )
  ).data.result;
