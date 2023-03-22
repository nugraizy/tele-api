interface DocumentMessage {
  update_id: number;
  message: {
    message_id: number;
    from: From;
    chat: Chat;
    date: number;
    reply_to_message?: ExtendedContext;
    entities?: Entities[];
    document: Document;
  };
}
