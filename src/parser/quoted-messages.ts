export const parseQuoted = (obj: ExtendedContext, id: number) => {
  const {
    message_id,
    chat,
    date,
    from,
    caption,
    location,
    photo,
    audio,
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
    messageInfo = {imageMessage};
  } else if (voice) {
    const voiceMessage = {
      duration: voice.duration,
      mimetype: voice.mime_type,
      id: voice.file_id,
      size: voice.file_size,
      uid: voice.file_unique_id,
    };
    messageInfo = {voiceMessage};
  } else if (video) {
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
    messageInfo = {videoMessage};
  } else if (contact) {
    const contactMessage = {
      phoneNumber: contact.phone_number,
      firstName: contact.first_name,
      lastName: contact.last_name || null,
      isRegistered: contact.user_id ? true : false,
      vcard: contact.vcard,
    };
    messageInfo = {contactMessage};
  } else if (document && !animation) {
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
    messageInfo = {documentMessage};
  } else if (sticker) {
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
    messageInfo = {stickerMessage};
  } else if (poll) {
    const pollMessage = {
      id: poll.id,
      question: poll.question,
      votePoll: poll.options.map(options => ({
        pollTitle: options.text,
        totalVote: options.voter_count,
      })),
      totalVoter: poll.total_voter_count,
      isEnded: poll.is_closed,
      isAnonymously: poll.is_anonymous,
      type: poll.type,
      isMultiAnswersAllowed: poll.allows_multiple_answers,
      correctAnswerId: poll.correct_option_id,
      explanation: poll.explanation,
    };
    messageInfo = {pollMessage};
  } else if (document && animation) {
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
    messageInfo = {animationMessage};
  } else if (audio) {
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
    messageInfo = {audioMessage};
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

  return message as QuotedMessageParsed;
};
