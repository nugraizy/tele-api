import {parseQuoted} from './quoted-messages.js';

export const parseAnimationMessage = (obj: AnimationsMessage) => {
  const {
    message: {from, date, chat, message_id},
    update_id,
    message: messages,
  } = obj;
  const {id: chatId, type, first_name: chatName, title} = chat;
  const {id: fromId, is_bot: isBot, first_name: senderName} = from;
  let {animation, document} = messages;

  const animationMessage = {
    animation: {
      fileName: animation.file_name,
      duration: animation.duration,
      mimetype: animation.mime_type,
      id: animation.file_id,
      size: animation.file_size,
      uid: animation.file_unique_id,
      dimention: {
        width: animation.width,
        height: animation.height,
      },
    },
    document: {
      fileName: document.file_name,
      mimetype: document.mime_type,
      id: document.file_id,
      size: document.file_size,
      uid: document.file_unique_id,
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
      animationMessage,
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
  } as AnimationMessageInfo;
};
