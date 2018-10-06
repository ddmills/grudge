import { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardType } from '@grudge/domain';
import { TraitIds } from '@grudge/data';
import CardStatic from '../CardStatic/CardStatic';

const getTrait = (card, traitId) => {
  return card.hasTrait(traitId) ? card.getTrait(traitId).value : undefined;
};

export default class CardView extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(Card).isRequired,
    cardType: PropTypes.instanceOf(CardType).isRequired,
  };

  render() {
    const {
      card,
      cardType,
      ...passProps
    } = this.props;

    return (
      <CardStatic
        id={cardType.id}
        name={cardType.name}
        description={cardType.description}
        isDisabled={card.hasTrait(TraitIds.DISABLED)}
        value={getTrait(card, TraitIds.VALUE)}
        attack={getTrait(card, TraitIds.ATTACK)}
        defense={getTrait(card, TraitIds.DEFENSE)}
        cost={getTrait(card, TraitIds.COST)}
        points={getTrait(card, TraitIds.POINTS)}
        {...passProps}
      />
    );
  }
}
