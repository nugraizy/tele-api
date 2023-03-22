import EventEmitter from 'events';

export const emitHandler = (eventName: string, handler: any) => {
  new EventEmitter().emit(eventName, handler);
};
