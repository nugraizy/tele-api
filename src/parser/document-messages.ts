import {parseQuoted} from './quoted-messages.js';

export const parseDocumentMessage = (obj: DocumentMessage) => {
  const {
    message: {from, document, date, chat, message_id},
    update_id,
  } = obj;
  const {id: chatId, type, first_name: chatName, title} = chat;
  const {id: fromId, is_bot: isBot, first_name: senderName} = from;

  const documentMessage = {
    fileName: document.file_name,
    mimetype: document.mime_type,
    id: document.file_id,
    size: document.file_size,
    uid: document.file_unique_id,
    thumbnail: {
      id: document.thumbnail?.file_id,
      size: document.thumbnail?.file_size,
      uid: document.thumbnail?.file_unique_id,
      dimention: {
        width: document.thumbnail?.width,
        height: document.thumbnail?.height,
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
      documentMessage,
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
  } as DocumentMessageInfo;
};
