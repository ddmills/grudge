import { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardType } from '@grudge/domain';
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
        value={getTrait(card, 'trt-value')}
        attack={getTrait(card, 'trt-attack')}
        defense={getTrait(card, 'trt-defense')}
        cost={getTrait(card, 'trt-cost')}
        points={getTrait(card, 'trt-points')}
        {...passProps}
      />
    );
  }
}
