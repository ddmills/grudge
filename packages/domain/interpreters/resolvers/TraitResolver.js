import { RefIds } from '@grudge/data';
import ContextInterpreter from '../ContextInterpreter';

export default class TraitResolver {
  static id = RefIds.TRAIT;

  static resolve(ctx, cardId, ref) {
    if (!ContextInterpreter.cardHasTrait(ctx, cardId, ref.traitId)) {
      return;
    }

    const property = ref.traitProp || 'value';
    const value = ContextInterpreter.getTrait(ctx, cardId, ref.traitId)[property];

    return value;
  }
}
