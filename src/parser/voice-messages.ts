import {parseQuoted} from './quoted-messages.js';

export const parseVoiceMessage = (obj: VoiceMessage) => {
  const {
    message: {from, date, chat, message_id},
    update_id,
    message: messages,
  } = obj;
  const {id: chatId, type, first_name: chatName, title} = chat;
  const {id: fromId, is_bot: isBot, first_name: senderName} = from;
  let {voice} = messages;

  const voiceMessage = {
    duration: voice.duration,
    mimetype: voice.mime_type,
    id: voice.file_id,
    size: voice.file_size,
    uid: voice.file_unique_id,
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
      voiceMessage,
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
  } as VoiceMessageInfo;
};
