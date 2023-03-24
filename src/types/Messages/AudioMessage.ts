interface AudioMessage {
  update_id: number;
  message: {
    message_id: number;
    from: From;
    chat: Chat;
    date: number;
    author_signature?: string;
    sender_chat?: {
      id: number;
      title: string;
      type: string;
    };
    forward_from?: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username: string;
    };
    forward_from_chat?: {
      id: number;
      is_bot: boolean;
      first_name: string;
      username: string;
    };
    forward_date?: number;
    reply_to_message?: ExtendedContext;
    entities?: Entities[];
    audio: Audio;
  };
}

interface AudioMessageInfo extends MessageInfoParsed {
  message: {
    audioMessage?: AudioParsed;
    id: number;
  };
}

interface AudioParsed {
  fileName: string;
  title: string;
  performer: string;
  duration: number;
  mimetype: string;
  id: string;
  size: number;
  uid: string;
}
