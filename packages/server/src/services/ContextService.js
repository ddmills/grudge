import { Player } from '@grudge/domain';
import ContextRepository from 'repositories/ContextRepository';
import UserRepository from 'repositories/UserRepository';

export default class ContextService {
  static async list() {
    return ContextRepository.browse();
  }

  static async create(user) {
    if (user.contextId) {
      throw new Error('User is already in a game');
    }

    const context = await ContextRepository.create({
      ownerId: user.id,
    });

    return this.join(user, context.id);
  }

  static async join(user, contextId) {
    if (user.contextId) {
      if (user.contextId === contextId) {
        return ContextRepository.get(contextId);
      }

      throw new Error('User is already in a game');
    }

    const context = await ContextRepository.get(contextId);

    if (context.isCountingDown) {
      throw new Error('Game is already starting');
    }

    if (context.isEnded) {
      throw new Error('Game is already over');
    }

    if (context.isStarted) {
      throw new Error('Game is already started');
    }

    if (context.isFull) {
      throw new Error('Game doesn\'t have enough room for additional player');
    }

    const player = Player.createForUser(user);

    context.addPlayer(player);

    await ContextRepository.save(context);
    await UserRepository.updateForId(user.id, {
      contextId: context.id,
    });

    return context;
  }
}
