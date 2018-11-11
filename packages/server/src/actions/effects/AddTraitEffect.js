import NotificationService from 'services/NotificationService';
import { ContextAdministrator } from '@grudge/domain/interpreters';
import { EffectIds } from '@grudge/data';
import Effect from './Effect';

export default class AddTraitEffect extends Effect {
  static id = EffectIds.ADD_TRAIT;

  static execute(context, effectParams, { cardId }) {
    const trait = {
      id: effectParams.traitId,
      ...effectParams.traitParams,
    };

    ContextAdministrator.addTraitToCard(context, cardId, trait);
    NotificationService.onTraitAddedToCard(context, cardId, trait);
  }
}
