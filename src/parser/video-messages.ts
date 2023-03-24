import {parseQuoted} from './quoted-messages.js';

export const parseVideoMessage = (obj: VideoMessage) => {
  const {
    message: {from, video, date, chat, message_id},
    update_id,
  } = obj;
  const {id: chatId, type, first_name: chatName, title} = chat;
  const {id: fromId, is_bot: isBot, first_name: senderName} = from;

  const videoMessage = {
    duration: video.duration,
    mimetype: video.mime_type,
    id: video.file_id,
    uid: video.file_unique_id,
    size: video.file_size,
    dimention: {
      width: video.height,
      height: video.height,
    },
    thumbnail: {
      id: video.thumbnail.file_id,
      size: video.thumbnail.file_size,
      uid: video.thumbnail.file_unique_id,
      dimention: {
        width: video.thumbnail.width,
        height: video.thumbnail.height,
      },
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
      videoMessage,
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
  } as VideoMessageInfo;
};
