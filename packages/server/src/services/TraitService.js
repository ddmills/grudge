import CardRepository from 'repositories/CardRepository';

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

    return CardRepository.save(cardWithTrait);
  }

  static async removeTrait(cardId, traitId) {
    const card = await CardRepository.get(cardId);

    const cardWithoutTrait = card.clone({
      traits: card.traits.filter((t) => t.id !== traitId),
    });

    return CardRepository.save(cardWithoutTrait);
  }
}
