interface ExtendedContext {
  message_id: number;
  from: From;
  chat: Chat;
  date: number;
  text?: string;
  voice?: Voice;
  photo?: Photo[];
  location?: Location;
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
  first_name: string;
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
  type: 'regular' | 'quiz';
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
  file_size: 16120;
}

interface Thumbnail {
  file_id: string;
  file_unique_id: string;
  file_size: number;
  width: number;
  height: number;
}
