interface ContactMessage {
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
    contact: Contact;
  };
}

interface ContactMessageInfo extends MessageInfoParsed {
  message: {
    contactMessage?: ContactParsed;
    id: number;
  };
}

interface ContactParsed {
  phoneNumber: string;
  firstName: string;
  lastName: string;
  vcard: string;
  isRegistered: boolean;
}
