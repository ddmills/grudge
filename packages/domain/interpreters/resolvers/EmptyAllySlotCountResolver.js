import { RefIds, SLOT_COUNT } from '@grudge/data';
import ContextInterrogator from '../ContextInterrogator';

export default class EmptyAllySlotCountResolver {
  static id = RefIds.EMPTY_ALLY_SLOT_COUNT;

  static resolve(ctx, cardId) {
    const playerId = ContextInterrogator.getPlayerForCard(ctx, cardId);
    const playedCards = ContextInterrogator.getPlayedCardsForPlayer(ctx, playerId);

    return SLOT_COUNT - playedCards;
  }
}
