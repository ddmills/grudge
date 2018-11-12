import NotificationService from 'services/NotificationService';
import { ContextAdministrator } from '@grudge/domain/interpreters';
import { EffectIds } from '@grudge/data';
import Effect from './Effect';

export default class AddTraitEffect extends Effect {
  static id = EffectIds.ADD_TRAIT;

  static execute(ctx, effectParams, { cardId }) {
    const trait = {
      id: effectParams.traitId,
      ...effectParams.traitParams,
    };

    ContextAdministrator.addTraitToCard(ctx, cardId, trait);
    NotificationService.onTraitAddedToCard(ctx, cardId, trait);
  }
}
