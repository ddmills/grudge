import { Component } from 'react';
import PropTypes from 'prop-types';
import { CardType } from '@grudge/domain';
import CardStatic from '../CardStatic/CardStatic';

const getTrait = (cardType, traitId) => {
  return cardType.hasTrait(traitId) ? cardType.getTrait(traitId).value : undefined;
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
        defense={getTrait(cardType, 'trt-defense')}
        cost={getTrait(cardType, 'trt-cost')}
        points={getTrait(cardType, 'trt-points')}
        {...passProps}
      />
    );
  }
}
