interface QuotedMessage {
  date: number;
  senderName: string;
  chatName: string;
  isBot: boolean;
  key: {
    id: number;
    participant: number;
    from: number;
    type: string;
    isGroup: boolean;
    groupSubject: string | null;
  };
}

interface QuotedMessageParsed extends QuotedMessage {
  message: {
    animationMessage?: {
      animation: AnimationParsed;
      document: DocumentParsed;
    };
    audioMessage?: AudioParsed;
    contactMessage?: ContactParsed;
    documentMessage?: DocumentParsed;
    imageMessage?: ImageParsed;
    locationMessage?: Location;
    pollMessage?: PollParsed;
    stickerMessage?: StickerParsed;
    conversationMessage?: {
      text: string;
    };
    videoMessage?: VideoParsed;
    voiceMessage?: VoiceParsed;
  };
}
