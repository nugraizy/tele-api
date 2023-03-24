import {parseQuoted} from './quoted-messages.js';

export const parseImageMessage = (obj: ImageMessage) => {
  const {
    message: {from, photo, date, chat, message_id, caption},
    update_id,
  } = obj;
  const {id: chatId, type, first_name: chatName, title} = chat;
  const {id: fromId, is_bot: isBot, first_name: senderName} = from;

  const len = photo.length;
  const imageMessage = {
    caption,
    id: photo[len - 1].file_id,
    size: photo[len - 1].file_size,
    uid: photo[len - 1].file_unique_id,
    dimention: {
      width: photo[len - 1].width,
      height: photo[len - 1].height,
    },
  };

  const message = {
    date,
    senderName,
    chatName,
    isBot,

    key: {
      id: update_id,
      participant: fromId,
      from: chatId,
      type,
      isGroup: type === 'group' || type === 'supergroup',
      groupSubject: title ? title : null,
    },
    message: {
      imageMessage,
      id: message_id,
    },
  };

  if (obj.message.reply_to_message) {
    Object.assign(message.message, {
      contextInfo: {
        quotedMessage: parseQuoted(obj.message.reply_to_message, update_id),
      },
    });
  }

  return {
    ...message,
  } as ImageMessageInfo;
};
