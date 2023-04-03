interface DocumentMessage {
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
    document: Document;
  };
}

interface DocumentMessageInfo extends MessageInfoParsed {
  message: {
    documentMessage?: DocumentParsed;
    contextInfo?: {
      quotedMessage?: QuotedMessageParsed;
    };
    id: number;
  };
}

interface DocumentParsed {
  fileName: string;
  mimetype: string;
  id: string;
  size: number;
  uid: string;
  thumbnail?: {
    id: string;
    size: number;
    uid: string;
    dimention: {
      width: number;
      height: number;
    };
  };
}
