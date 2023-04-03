type Type = 'private' | 'group' | 'supergroup';
type PollType = 'regular' | 'quiz';

type MessageInfo = AnimationsMessage &
  AudioMessage &
  ContactMessage &
  DocumentMessage &
  ImageMessage &
  LocationMessage &
  PollMessage &
  StickerMessage &
  TextMessage &
  VideoMessage &
  VoiceMessage;

type ParsedMessageInfo =
  | (AnimationMessageInfo &
      AudioMessageInfo &
      ContactMessageInfo &
      DocumentMessageInfo &
      LocationMessageInfo &
      ImageMessageInfo &
      PollMessageInfo &
      StickerMessageInfo &
      TextMessageInfo &
      VideoMessageInfo &
      VoiceMessageInfo)
  | undefined;

interface ExtendedContext {
  message_id: number;
  from: From;
  chat: Chat;
  date: number;
  message_thread_id?: number;
  caption?: string;
  audio?: Audio;
  text?: string;
  voice?: Voice;
  photo?: Photo[];
  location?: Location;
  sticker?: Sticker;
  video?: Video;
  document?: Document;
  contact?: Contact;
  poll?: Poll;
  animation?: Animation;
}

interface Entities {
  offset: number;
  length: number;
  type: string;
}

interface From {
  id: number;
  is_bot: false;
  first_name: string;
  language_code: string;
}

interface Chat {
  id: number;
  first_name?: string;
  title?: string;
  type: Type;
}

interface Voice {
  duration: number;
  mime_type: string;
  file_id: string;
  file_unique_id: string;
  file_size: number;
}

interface Photo {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  width: number;
  height: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface Audio {
  duration: number;
  file_name: string;
  mime_type: string;
  title?: string;
  performer?: string;
  file_id: string;
  file_unique_id: string;
  file_size: number;
}

interface Video {
  duration: number;
  width: number;
  height: number;
  mime_type: string;
  thumbnail: Thumbnail;
  thumb: Thumbnail;
  file_id: string;
  file_unique_id: string;
  file_size: number;
}

interface Contact {
  phone_number: string;
  first_name: string;
  last_name?: string;
  vcard: string;
  user_id?: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOptions[];
  total_voter_count: number;
  is_closed: boolean;
  is_anonymous: boolean;
  type: PollType;
  allows_multiple_answers: boolean;
  correct_option_id?: number;
  explanation?: string;
  explanation_entities?: [];
}

interface PollOptions {
  text: string;
  voter_count: number;
}

interface Document {
  file_name: string;
  mime_type: string;
  thumbnail?: Thumbnail;
  thumb?: Thumbnail;
  file_id: string;
  file_unique_id: string;
  file_size: number;
}

interface Sticker {
  width: number;
  height: number;
  emoji: string;
  set_name: string;
  is_animated: boolean;
  is_video: boolean;
  type: string;
  thumbnail: Thumbnail;
  thumb: Thumbnail;
  file_id: string;
  file_unique_id: string;
  file_size: number;
}

interface Animation {
  file_name: string;
  mime_type: string;
  duration: number;
  width: number;
  height: number;
  file_id: string;
  file_unique_id: string;
  file_size: number;
}

interface Thumbnail {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  width: number;
  height: number;
}

interface MessageInfoParsed {
  date: number;
  senderName: string;
  chatName: string;
  isBot: boolean;
  key: {
    id: number;
    participant: number;
    from: number;
    type: string;
    isGroup: boolean;
    groupSubject: string | null;
  };
}
