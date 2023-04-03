import {Request} from 'express';

import {parseMessages} from '../parser/universal-parser.js';
import {emitHandler} from '../event/messages-received.js';

export default (req: Request) => {
  const {body} = req;
  emitHandler('message', parseMessages(body));
};
