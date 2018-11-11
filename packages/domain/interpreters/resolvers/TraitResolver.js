import { RefIds } from '@grudge/data';
import ContextInterrogator from '../ContextInterrogator';

export default class TraitResolver {
  static id = RefIds.TRAIT;

  static resolve(ctx, cardId, ref) {
    if (!ContextInterrogator.cardHasTrait(ctx, cardId, ref.traitId)) {
      return;
    }

    const property = ref.traitProp || 'value';
    const value = ContextInterrogator.getTraitForCard(ctx, cardId, ref.traitId)[property];

    return value;
  }
}
