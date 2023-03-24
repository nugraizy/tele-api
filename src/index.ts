import type {Logger} from 'pino';
import {ev} from './event/messages-received.js';
import {setupConnection} from './utils/connection.js';
import {sendMessage} from './client/send-message.js';

type Event = 'message' | 'deleted' | 'participant';
interface TelegramInitConfig {
  token: string;
  webhookURL: string;
  serverURL: string;
  logger?: Logger;
}
interface IEvent {
  on: (event: Event, handler: any) => void;
  off: (event: Event, handler: any) => void;
}

export class TelegramInit {
  token: string;
  webhookURL: string;
  serverURL: string;
  logger?: Logger;
  constructor({token, webhookURL, serverURL, logger}: TelegramInitConfig) {
    this.token = token;
    this.webhookURL = webhookURL;
    this.serverURL = serverURL;
    this.logger = logger;
  }
}

export const tokens = new Map();
export class TelegramAPI {
  setupConnection;
  ev: IEvent = {
    on: (event: Event, handler: (msg: MessageInfo) => {}) => {},
    off: (event: Event, handler: (msg: MessageInfo) => {}) => {},
  };
  client: any;
  logger;
  constructor(config: TelegramInitConfig) {
    if (config.logger) {
      this.logger = config.logger;
    }
    tokens.set('SERVER_URL', config.serverURL);
    tokens.set('BOT_TOKEN', config.token);
    this.setupConnection = async () =>
      setupConnection(config.token, config.webhookURL);

    this.ev.on = (event: Event, handler: (msg: MessageInfo) => {}) =>
      ev.on(event, handler);
    this.ev.off = (event: Event, handler: (msg: MessageInfo) => {}) =>
      ev.off(event, handler);

    this.client = {sendMessage};
  }
}
