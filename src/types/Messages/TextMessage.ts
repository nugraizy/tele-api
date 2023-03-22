type Type = 'private' | 'group';

interface TextMessage {
  update_id: number;
  message: {
    message_id: number;
    from: From;
    chat: Chat;
    date: number;
    reply_to_message?: ExtendedContext;
    text: string;
    entities?: Entities[];
  };
}
