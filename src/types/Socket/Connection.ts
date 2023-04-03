import type {Logger} from 'pino';

type Event = 'message' | 'deleted' | 'participant';
export type PinoLogger = Logger;

export interface TelegramInitConfig {
  token: string;
  webhookURL: string;
  serverURL?: string;
  logger?: PinoLogger;
}

export interface EventHandle {
  on: <P extends Event>(
    event: P,
    handler: (
      msg: {
        message: ParsedMessageInfo;
        deleted: {originalMessage: string; isBot: boolean};
        participant: {
          originalMessage: string;
          editedMessage: string;
          isBot: boolean;
        };
      }[P]
    ) => any
  ) => void;
  off: (event: Event, handler: () => any) => void;
}
