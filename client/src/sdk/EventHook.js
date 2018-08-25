import autobind from 'autobind-decorator';

@autobind
export default class EventHook {
  listeners = [];

  constructor(eventName, hookName) {
    this.eventName = eventName;
    this.hookName = hookName;
  }

  trigger(...payload) {
    this.listeners.forEach((listener) => listener(...payload));
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
