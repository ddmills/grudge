import TraitService from 'services/TraitService';
import NotificationService from 'services/NotificationService';
import CardRepository from 'repositories/CardRepository';
import LobbyRepository from 'repositories/LobbyRepository';
import { EffectIds, TraitIds } from '@grudge/data';
import Effect from './Effect';

export default class DamageEffect extends Effect {
  static id = EffectIds.DAMAGE;

  static async apply(effectParams, { card, user, targetCard }) {
    const damage = card.getTrait(TraitIds.ATTACK).value;
    const health = targetCard.getTrait(TraitIds.HEALTH);
    const remaining = health.value - damage;
    const value = remaining <= 0 ? 0 : remaining;

    const updatedCard = await TraitService.addTrait(targetCard.id, {
      id: TraitIds.HEALTH,
      max: health.max,
      value,
    });

    if (value <= 0) {
      const trashedCard = updatedCard.clone({
        isTrashed: true,
        slotIndex: null,
      });

      await CardRepository.save(trashedCard);

      const lobby = await LobbyRepository.get(user.lobbyId);

      NotificationService.onCardTrashed(lobby, trashedCard);
    }
  }
}
