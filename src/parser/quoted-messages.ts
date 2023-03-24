export const parseQuoted = (obj: ExtendedContext, id: number) => {
  const {
    message_id,
    chat,
    date,
    from,
    location,
    photo,
    text,
    voice,
    animation,
    contact,
    document,
    poll,
    sticker,
    video,
    message_thread_id,
  } = obj;

  const {first_name: chatName, id: chatId, type, title} = chat;
  const {id: fromId, is_bot: isBot, first_name: senderName} = from;

  let messageInfo = null;
  if (text) {
    messageInfo = {conversation: {text}};
  } else if (location) {
    messageInfo = {locationMessage: location};
  } else if (photo) {
    messageInfo = {imageMessage: photo};
  } else if (voice) {
    messageInfo = {voiceMessage: voice};
  } else if (video) {
    messageInfo = {videoMessage: video};
  } else if (contact) {
    messageInfo = {contactMessage: contact};
  } else if (document) {
    messageInfo = {documentMessage: document};
  } else if (sticker) {
    messageInfo = {stickerMessage: document};
  } else if (poll) {
    messageInfo = {pollMessage: poll};
  } else if (animation) {
    messageInfo = {animationMessage: {animation, document}};
  }

  const message = {
    date,
    senderName,
    chatName,
    isBot,

    key: {
      id,
      participant: fromId,
      from: chatId,
      type,
      isGroup: type === 'group' || type === 'supergroup',
      groupSubject: title || null,
    },
    message: {
      ...messageInfo,
      id: message_id,
      message_thread_id,
    },
  };

  return message;
};
