import { Component } from 'react';
import PropTypes from 'prop-types';
import { CardStatic, CardContainer } from '@grudge/components';
import { Card as CardModel, CardType } from '@grudge/domain';
import { TraitIds } from '@grudge/data';
import connect from 'utilities/mobx/Connect';

const getTrait = (card, traitId, resolveRef, property = 'value') => {
  if (!card.hasTrait(traitId)) {
    return;
  }

  const value = card.getTrait(traitId)[property];

  return resolveRef(card, value);
};

@connect(({
  cardTypeStore, cardStore, actionStore, windowSizeStore, actionRefStore,
}, { cardId }) => {
  const card = cardStore.getCard(cardId);

  return {
    card,
    isSelected: false, //actionStore.isCardSelected(card),
    isTargeted: false, //actionStore.isCardTargeted(card),
    cardType: card && cardTypeStore.findCardType(card.cardTypeId),
    onClick: () => {}, // () => actionStore.onClickCard(card),
    onClickHold: () => {}, // () => cardStore.inspectCard(card.id),
    resolveRef: actionRefStore.resolve,
    responsiveCardSize: windowSizeStore.responsiveCardSize,
  };
})
export default class Card extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(CardModel).isRequired,
    cardType: PropTypes.instanceOf(CardType).isRequired,
    onClick: PropTypes.func.isRequired,
    onClickHold: PropTypes.func.isRequired,
    resolveRef: PropTypes.func.isRequired,
    isSelected: PropTypes.bool,
    isTargeted: PropTypes.bool,
    isResponsive: PropTypes.bool,
    responsiveCardSize: PropTypes.string,
  }

  static defaultProps = {
    isResponsive: true,
    isSelected: false,
    isTargeted: false,
    responsiveCardSize: 'lg',
  }

  render() {
    const {
      card,
      cardType,
      onClick,
      onClickHold,
      resolveRef,
      isSelected,
      isTargeted,
      isResponsive,
      responsiveCardSize,
      ...passProps
    } = this.props;

    const size = isResponsive ? responsiveCardSize : undefined;

    if (card) {
      return (
        <CardStatic
          id={cardType.id}
          name={cardType.name}
          description={cardType.description}
          isDisabled={card.hasTrait(TraitIds.DISABLED)}
          value={getTrait(card, TraitIds.VALUE, resolveRef)}
          attack={getTrait(card, TraitIds.ATTACK, resolveRef)}
          health={getTrait(card, TraitIds.HEALTH, resolveRef)}
          cost={card.isInHand ? getTrait(card, TraitIds.COST, resolveRef) : undefined}
          maxHealth={getTrait(card, TraitIds.HEALTH, resolveRef, 'max')}
          onClick={onClick}
          onClickHold={onClickHold}
          isDefender={card.hasTrait(TraitIds.DEFENDER)}
          isSelected={isSelected}
          isTargeted={isTargeted}
          size={size}
          {...passProps}
        />
      );
    }

    return <CardContainer size={size}/>;
  }
}
