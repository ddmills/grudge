import ContextService from 'services/ContextService';

export default class ContextController {
  static async list() {
    return ContextService.list();
  }

  static async create({ user }) {
    return ContextService.create(user);
  }

  static async join({ user, contextId }) {
    return ContextService.join(user, contextId);
  }

  static async leave({ user }) {
    return ContextService.leave(user);
  }

  static async startCountdown({ user }) {
    return ContextService.startCountdown(user);
  }

  static async stopCountdown({ user }) {
    return ContextService.stopCountdown(user);
  }
}
