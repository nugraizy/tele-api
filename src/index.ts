import {ev} from './event/messages-received.js';
import {setupConnection} from './utils/connection.js';
import {sendMessage} from './handler/client/send-message.js';
import type {
  EventHandle,
  PinoLogger,
  TelegramInitConfig,
} from './types/Socket/Connection';

export class TelegramInit {
  token: string;
  webhookURL: string;
  serverURL?: string;
  logger?: PinoLogger;
  constructor({token, webhookURL, serverURL, logger}: TelegramInitConfig) {
    if (!serverURL) {
      const localhost = 'http://localhost:8081';
      this.serverURL = localhost;
      serverURL = localhost;
    }
    this.token = token;
    this.webhookURL = webhookURL;
    this.serverURL = serverURL;
    this.logger = logger;
  }
}

export const tokens = new Map();
export class TelegramAPI {
  setupConnection;
  ev: EventHandle = {
    on: (event, handler) => {},
    off: (event, handler) => {},
  };
  client: {
    sendMessage: (to: number, message: any, contextInfo?: any) => Promise<void>;
  };
  logger;
  constructor(config: TelegramInitConfig) {
    if (!config.token) {
      throw new Error(
        'Could not find any token. Please put token inside of the config.'
      );
    }
    if (config.logger) {
      this.logger = config.logger;
    }
    tokens.set('SERVER_URL', config.serverURL);
    tokens.set('BOT_TOKEN', config.token);
    this.setupConnection = async () =>
      setupConnection(config.token, config.webhookURL, {logger: this.logger});

    this.ev.on = (event, handler) => ev.on(event, handler);
    this.ev.off = (event, handler) => ev.off(event, handler);

    this.client = {sendMessage};
  }
}
