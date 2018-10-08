import CardRepository from 'repositories/CardRepository';
import UserRepository from 'repositories/UserRepository';
import LobbyRepository from 'repositories/LobbyRepository';
import NotificationService from 'services/NotificationService';

export default class TraitService {
  static async addTrait(cardId, trait) {
    let card = await CardRepository.get(cardId);

    if (card.hasTrait(trait.id)) {
      card = card.clone({
        traits: card.traits.filter((t) => t.id !== trait.id),
      });
    }

    const cardWithTrait = card.clone({
      traits: [...card.traits, trait],
    });

    const user = await UserRepository.get(cardWithTrait.userId);
    const lobby = await LobbyRepository.get(user.lobbyId);

    NotificationService.onCardTraitAdded(lobby, cardWithTrait);

    await CardRepository.save(cardWithTrait);

    return cardWithTrait;
  }

  static async removeTrait(cardId, traitId) {
    const card = await CardRepository.get(cardId);

    const cardWithoutTrait = card.clone({
      traits: card.traits.filter((t) => t.id !== traitId),
    });

    await CardRepository.save(cardWithoutTrait);

    return cardWithoutTrait;
  }
}
