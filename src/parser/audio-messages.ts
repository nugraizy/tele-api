import {parseQuoted} from './quoted-messages.js';

export const parseAudioMessage = (obj: AudioMessage) => {
  const {
    message: {from, date, chat, message_id, audio},
    update_id,
  } = obj;
  const {id: chatId, type, first_name: chatName, title} = chat;
  const {id: fromId, is_bot: isBot, first_name: senderName} = from;

  const {
    duration,
    file_id,
    file_name,
    file_size,
    file_unique_id,
    mime_type,
    performer,
    title: audioTitle,
  } = audio;

  const audioMessage = {
    fileName: file_name,
    title: audioTitle,
    performer,
    duration,
    mimetype: mime_type,
    id: file_id,
    size: file_size,
    uid: file_unique_id,
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
      audioMessage,
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
  } as AudioMessageInfo;
};
