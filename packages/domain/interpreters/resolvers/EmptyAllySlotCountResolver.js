import { RefIds, SLOT_COUNT } from '@grudge/data';
import ContextInterpreter from '../ContextInterpreter';

export default class EmptyAllySlotCountResolver {
  static id = RefIds.EMPTY_ALLY_SLOT_COUNT;

  static resolve(ctx, cardId) {
    const playerId = ContextInterpreter.getPlayerForCard(ctx, cardId);
    const playedCards = ContextInterpreter.getPlayedCardsForPlayer(ctx, playerId);

    return SLOT_COUNT - playedCards;
  }
}
