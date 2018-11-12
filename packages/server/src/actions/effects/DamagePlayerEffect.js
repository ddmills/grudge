import {
  ContextAdministrator,
  ContextInterrogator,
  ReferenceResolver,
} from '@grudge/domain/interpreters';
import { EffectIds } from '@grudge/data';
import NotificationService from 'services/NotificationService';
import Effect from './Effect';

export default class DamagePlayerEffect extends Effect {
  static id = EffectIds.DAMAGE_PLAYER;

  static apply(ctx, { value }, { cardId, targetPlayerId }) {
    const damage = ReferenceResolver.resolve(ctx, cardId, value);

    ContextAdministrator.subtractHealthFromPlayer(ctx, targetPlayerId, damage);

    const health = ContextInterrogator.getHealthForPlayer(ctx, targetPlayerId);

    NotificationService.onPlayerHealthUpdated(ctx, targetPlayerId, health);
  }
}
