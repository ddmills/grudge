import { Component } from 'react';
import PropTypes from 'prop-types';
import { CardType } from '@grudge/domain';
import CardStatic from '../CardStatic/CardStatic';

const getTrait = (cardType, traitId, property = 'value') => {
  const value = cardType.hasTrait(traitId) ? cardType.getTrait(traitId)[property] : undefined;

  if (typeof value === 'object') {
    return undefined;
  }

  return value;
};

export default class CardTypeView extends Component {
  static propTypes = {
    cardType: PropTypes.instanceOf(CardType).isRequired,
  };

  render() {
    const {
      cardType,
      ...passProps
    } = this.props;

    return (
      <CardStatic
        name={cardType.name}
        description={cardType.description}
        value={getTrait(cardType, 'trt-value')}
        attack={getTrait(cardType, 'trt-attack')}
        health={getTrait(cardType, 'trt-health')}
        cost={getTrait(cardType, 'trt-cost')}
        maxHealth={getTrait(cardType, 'trt-health', 'max')}
        {...passProps}
      />
    );
  }
}
