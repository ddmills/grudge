import {
  ContextAdministrator,
  ContextInterrogator,
  ReferenceResolver,
} from '@grudge/domain/interpreters';
import { EffectIds, TraitIds } from '@grudge/data';
import NotificationService from 'services/NotificationService';
import Effect from './Effect';

export default class DamageEffect extends Effect {
  static id = EffectIds.DAMAGE;

  static execute(ctx, { value }, { cardId, targetCardId }) {
    const healthTrait = ContextInterrogator.getTraitForCard(ctx, targetCardId, TraitIds.HEALTH);
    const damage = ReferenceResolver.resolve(ctx, cardId, value);
    const health = ReferenceResolver.resolve(ctx, targetCardId, healthTrait.value);
    const difference = health - damage;
    const remaining = difference <= 0 ? 0 : difference;
    const trait = {
      id: TraitIds.HEALTH,
      max: healthTrait.max,
      value: remaining,
    };

    ContextAdministrator.addTraitToCard(ctx, targetCardId, trait);
    NotificationService.onTraitAddedToCard(ctx, targetCardId, trait);

    if (remaining <= 0) {
      ContextAdministrator.resetCard(ctx, targetCardId);
      NotificationService.onCardKilled(ctx, targetCardId);
    }
  }
}
