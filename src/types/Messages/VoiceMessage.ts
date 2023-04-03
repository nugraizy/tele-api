interface VoiceMessage {
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
    voice: Voice;
  };
}

interface VoiceMessageInfo extends MessageInfoParsed {
  message: {
    voiceMessage?: VoiceParsed;
    contextInfo?: {
      quotedMessage?: QuotedMessageParsed;
    };
    id: number;
  };
}

interface VoiceParsed {
  duration: number;
  mimetype: string;
  id: string;
  size: number;
  uid: string;
}
