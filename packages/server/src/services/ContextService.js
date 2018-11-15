import { Player } from '@grudge/domain';
import { ContextInterrogator, ContextAdministrator } from '@grudge/domain/interpreters';
import ContextRepository from 'repositories/ContextRepository';
import UserRepository from 'repositories/UserRepository';
import NotificationService from 'services/NotificationService';
import DelayedProcessor from 'services/DelayedProcessor';
import DeckService from 'services/DeckService';
import CardService from 'services/CardService';
import timestamp from 'utilities/Timestamp';
import Random from 'utilities/Random';

export default class ContextService {
  static async getCurrentContext(user) {
    if (user.contextId) {
      return ContextRepository.get(user.contextId);
    }
  }

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

  static async addPlayer(player, ctx) {
    if (ctx.isCountingDown) {
      throw new Error('Game is already starting');
    }

    if (ctx.isEnded) {
      throw new Error('Game is already over');
    }

    if (ctx.isStarted) {
      throw new Error('Game is already started');
    }

    if (ctx.isFull) {
      throw new Error('Game doesn\'t have enough room for additional player');
    }

    ContextAdministrator.addPlayer(ctx, player);

    await ContextRepository.save(ctx);

    NotificationService.onPlayerJoined(ctx, player);

    return ctx;
  }

  static async join(user, contextId) {
    if (user.contextId) {
      if (user.contextId === contextId) {
        return ContextRepository.get(contextId);
      }

      throw new Error('User is already in a game');
    }

    const ctx = await ContextRepository.get(contextId);
    const player = Player.create({
      id: Random.id('ply'),
      userId: user.id,
      displayName: user.displayName,
      isBot: false,
    });

    await this.addPlayer(player, ctx);
    await UserRepository.updateForId(user.id, {
      contextId: ctx.id,
    });

    return ctx;
  }

  static async leave(user, ctx) {
    const player = ctx.getPlayerForUser(user.id);

    ContextAdministrator.removePlayer(ctx, player.id);

    await ContextRepository.save(ctx);
    await UserRepository.updateForId(user.id, {
      contextId: null,
    });

    NotificationService.onPlayerLeft(ctx, player);

    await this.checkWinCondition(ctx);

    return ctx;
  }

  static async startCountdown(user, ctx) {
    if (ctx.countdownStartedAt) {
      throw new Error('Countdown has already started');
    }

    if (ctx.ownerId !== user.id) {
      throw new Error('User does not have permission to start the game');
    }

    ContextAdministrator.startCountdown(ctx, timestamp());

    await ContextRepository.save(ctx);

    NotificationService.onCountdownStarted(ctx);
    DelayedProcessor.scheduleCountdown(ctx);
  }

  static async stopCountdown(user, ctx) {
    if (ctx.isStarted) {
      throw new Error('Game has already started');
    }

    if (!ctx.isCountdownStarted) {
      return ctx;
    }

    ContextAdministrator.stopCountdown(ctx);

    await DelayedProcessor.stopCountdown(ctx);
    await ContextRepository.save(ctx);

    NotificationService.onCountdownStopped(ctx);
  }

  static async start(contextId) {
    const ctx = await ContextRepository.get(contextId);

    if (!ctx.isCountdownStarted) {
      throw new Error('Game countdown has been cancelled');
    }

    if (ctx.isStarted) {
      throw new Error('Game has already started');
    }

    ctx.set('players', Random.shuffle(ctx.players));

    ctx.players.forEach((p, idx) => {
      p.set('turnOrder', idx);
      p.set('money', 3);
      p.set('health', 16);
    });

    ctx.set('startedAt', timestamp());
    ctx.set('turnStartedAt', timestamp());

    await DeckService.populateStarterCards(ctx);
    await ContextRepository.save(ctx);

    NotificationService.onContextStarted(ctx);

    await CardService.drawHands(ctx);

    DelayedProcessor.scheduleTurn(ctx);

    return ctx;
  }

  static async addBotPlayer(user, context) {
    if (context.ownerId !== user.id) {
      throw new Error('User does not have permission to add a bot to the current game');
    }

    const player = Player.create({
      id: Random.id('ply'),
      displayName: 'Bot',
      isBot: true,
    });

    await this.addPlayer(player, context);

    return player;
  }

  static async checkWinCondition(ctx) {
    const alive = ContextInterrogator.getAlivePlayers(ctx);

    if (alive === 1) {
      ContextAdministrator.contextEnded(ctx, alive[0].id, timestamp());

      await ContextRepository.save(ctx);

      NotificationService.onContextEnded(ctx);
    }
  }
}
