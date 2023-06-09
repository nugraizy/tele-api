import EventEmitter from 'events';

const ev = new EventEmitter();

export const emitHandler = (eventName: string, message: ParsedMessageInfo) => {
  ev.emit(eventName, message);
};

export {ev};
