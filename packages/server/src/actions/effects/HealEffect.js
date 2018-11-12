import {
  ContextAdministrator,
  ContextInterrogator,
  ReferenceResolver,
} from '@grudge/domain/interpreters';
import { EffectIds, TraitIds } from '@grudge/data';
import NotificationService from 'services/NotificationService';
import Effect from './Effect';

export default class HealEffect extends Effect {
  static id = EffectIds.HEAL;

  static execute(ctx, { value }, { cardId, targetCardId }) {
    const healthTrait = ContextInterrogator.getTraitForCard(ctx, targetCardId, TraitIds.HEALTH);
    const heal = ReferenceResolver.resolve(ctx, cardId, value);
    const health = ReferenceResolver.resolve(ctx, targetCardId, healthTrait.value);
    const max = ReferenceResolver.resolve(ctx, targetCardId, healthTrait.max);
    const difference = health + heal;
    const remaining = difference >= max ? max : difference;
    const trait = {
      id: TraitIds.HEALTH,
      max: healthTrait.max,
      value: remaining,
    };

    ContextAdministrator.addTraitToCard(ctx, targetCardId, trait);
    NotificationService.onTraitAddedToCard(ctx, targetCardId, trait);
  }
}
