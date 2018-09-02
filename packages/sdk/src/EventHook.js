import autobind from 'autobind-decorator';

@autobind
export default class EventHook {
  listeners = [];

  constructor(eventName, hookName, transformer = (r) => r) {
    this.eventName = eventName;
    this.hookName = hookName;
    this.transformer = transformer;
  }

  trigger(payload) {
    const result = this.transformer(payload);

    this.listeners.forEach((listener) => listener(result));
  }

  addListener(fn) {
    this.listeners.push(fn);
  }

  attach(host) {
    Object.assign(host, {
      [this.hookName]: (...args) => this.addListener(...args),
    });
  }

  listen(socket) {
    socket.on(this.eventName, this.trigger);
  }
}
