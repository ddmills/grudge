import {
  ContextAdministrator,
  ContextInterrogator,
  ReferenceResolver,
} from '@grudge/domain/interpreters';
import { EffectIds, TraitIds } from '@grudge/data';
import Effect from './Effect';
import NotificationService from 'services/NotificationService';

export default class DamageEffect extends Effect {
  static id = EffectIds.DAMAGE;

  static async execute(context, { value }, { cardId, targetCardId }) {
    const targetHealthTrait = ContextInterrogator.getTraitForCard(
      context,
      targetCardId,
      TraitIds.HEALTH,
    );
    const damage = ReferenceResolver.resolve(context, cardId, value);
    const health = ReferenceResolver.resolve(context, targetCardId, targetHealthTrait.value);
    const difference = health - damage;
    const remaining = difference <= 0 ? 0 : difference;

    const trait = {
      id: TraitIds.HEALTH,
      max: targetHealthTrait.max,
      value: remaining,
    };

    ContextAdministrator.addTraitToCard(context, targetCardId, trait);
    NotificationService.onTraitAddedToCard(context, targetCardId, trait);

    if (remaining <= 0) {
      // ContextAdministrator.
    }
  }
}
