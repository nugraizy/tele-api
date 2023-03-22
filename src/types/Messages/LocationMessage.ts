interface LocationMessage {
  update_id: number;
  message: {
    message_id: number;
    from: From;
    chat: Chat;
    date: number;
    reply_to_message?: ExtendedContext;
    entities?: Entities[];
    photo: Location;
  };
}
