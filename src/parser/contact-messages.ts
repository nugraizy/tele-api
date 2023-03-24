import {parseQuoted} from './quoted-messages.js';

export const parseContactMessage = (obj: ContactMessage) => {
  console.log(obj);
  const {
    message: {from, contact, date, chat, message_id},
    update_id,
  } = obj;
  const {id: chatId, type, first_name: chatName, title} = chat;
  const {id: fromId, is_bot: isBot, first_name: senderName} = from;

  const contactMessage = {
    phoneNumber: contact.phone_number,
    firstName: contact.first_name,
    lastName: contact.last_name || null,
    isRegistered: contact.user_id ? true : false,
    vcard: contact.vcard,
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
      contactMessage,
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
  } as ContactMessageInfo;
};
