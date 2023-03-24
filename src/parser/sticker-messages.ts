import {parseQuoted} from './quoted-messages.js';

export const parseStickerMessage = (obj: StickerMessage) => {
  const {
    message: {from, sticker, date, chat, message_id},
    update_id,
  } = obj;
  const {id: chatId, type, first_name: chatName, title} = chat;
  const {id: fromId, is_bot: isBot, first_name: senderName} = from;

  const stickerMessage = {
    emoji: sticker.emoji,
    id: sticker.file_id,
    uid: sticker.file_unique_id,
    size: sticker.file_size,
    setName: sticker.set_name,
    isAnimated: sticker.is_animated,
    isVideo: sticker.is_video,
    type: sticker.type,
    dimention: {
      width: sticker.width,
      height: sticker.height,
    },
    thumbnail: {
      id: sticker.thumbnail.file_id,
      size: sticker.thumbnail.file_size,
      uid: sticker.thumbnail.file_unique_id,
      dimention: {
        width: sticker.thumbnail.width,
        height: sticker.thumbnail.height,
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
      stickerMessage,
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
  } as StickerMessageInfo;
};
