interface StickerMessage {
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
    sticker: Sticker;
  };
}

interface StickerMessageInfo extends MessageInfoParsed {
  message: {
    stickerMessage?: StickerParsed;
    contextInfo?: {
      quotedMessage?: QuotedMessageParsed;
    };
    id: number;
  };
}

interface StickerParsed {
  emoji: string;
  id: string;
  uid: string;
  size: number;
  setName: string;
  isAnimated: boolean;
  isVideo: boolean;
  type: string;
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
