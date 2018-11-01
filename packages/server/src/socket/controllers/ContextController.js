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

  static async leave({ user, context }) {
    return ContextService.leave(user, context);
  }

  static async startCountdown({ user, context }) {
    return ContextService.startCountdown(user, context);
  }

  static async stopCountdown({ user, context }) {
    return ContextService.stopCountdown(user, context);
  }
}
