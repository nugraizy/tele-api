interface VideoMessage {
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
    reply_to_message?: ExtendedContext;
    entities?: Entities[];
    video: Video;
    caption?: string;
  };
}

interface VideoMessageInfo extends MessageInfoParsed {
  message: {
    videoMessage?: VideoParsed;
    contextInfo?: {
      quotedMessage?: QuotedMessageParsed;
    };
    id: number;
  };
}

interface VideoParsed {
  duration: number;
  mimetype: string;
  id: string;
  uid: string;
  size: number;
  thumbnail: {
    id: string;
    size: number;
    uid: string;
    dimention: {
      width: number;
      height: number;
    };
  };
  dimention: {
    width: number;
    height: number;
  };
}
