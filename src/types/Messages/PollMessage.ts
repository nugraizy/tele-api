interface PollMessage {
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
    poll: Poll;
  };
}

interface PollMessageInfo extends MessageInfoParsed {
  message: {
    pollMessage?: PollParsed;
    id: number;
  };
}

interface PollParsed {
  id: string;
  question: string;
  votePoll: {
    pollTitle: string;
    totalVote: number;
  }[];
  totalVoter: number;
  isEnded: boolean;
  isAnonymously: boolean;
  type: PollType;
  isMultiAnswersAllowed: boolean;
  correctAnswerId?: number;
  explanation?: string;
}
