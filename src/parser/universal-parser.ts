import {parseAnimationMessage} from './animation-messages.js';
import {parseAudioMessage} from './audio-messages.js';
import {parseContactMessage} from './contact-messages.js';
import {parseDocumentMessage} from './document-messages.js';
import {parseImageMessage} from './image-messages.js';
import {parseLocationMessage} from './location-messages.js';
import {parsePollMessage} from './poll-messages.js';
import {parseStickerMessage} from './sticker-messages.js';
import {parseTextMessage} from './text-messages.js';
import {parseVideoMessage} from './video-messages.js';
import {parseVoiceMessage} from './voice-messages.js';

export const parseMessages = (obj: MessageInfo) => {
  const {message} = obj;

  const {
    animation,
    audio,
    contact,
    document,
    location,
    photo,
    poll,
    sticker,
    text,
    video,
    voice,
  } = message;

  if (animation) {
    return parseAnimationMessage(obj) as AnimationMessageInfo;
  } else if (audio) {
    return parseAudioMessage(obj) as AudioMessageInfo;
  } else if (contact) {
    return parseContactMessage(obj) as ContactMessageInfo;
  } else if (document) {
    return parseDocumentMessage(obj) as DocumentMessageInfo;
  } else if (location) {
    return parseLocationMessage(obj) as LocationMessageInfo;
  } else if (photo) {
    return parseImageMessage(obj) as ImageMessageInfo;
  } else if (poll) {
    return parsePollMessage(obj) as PollMessageInfo;
  } else if (sticker) {
    return parseStickerMessage(obj) as StickerMessageInfo;
  } else if (text) {
    return parseTextMessage(obj) as TextMessageInfo;
  } else if (voice) {
    return parseVoiceMessage(obj) as VoiceMessageInfo;
  } else if (video) {
    return parseVideoMessage(obj) as VideoMessageInfo;
  }
};
