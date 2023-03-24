interface AnimationsMessage {
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
    animation: Animation;
    document: Document;
  };
}

interface AnimationMessageInfo extends MessageInfoParsed {
  message: {
    animationMessage?: {
      animation: AnimationParsed;
      document: DocumentParsed;
    };
    id: number;
  };
}

interface AnimationParsed {
  fileName: string;
  duration: number;
  mimetype: string;
  id: string;
  size: number;
  uid: string;
  dimention: {
    width: number;
    height: number;
  };
}
