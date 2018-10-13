import { Component } from 'react';
import PropTypes from 'prop-types';
import { CardView, CardContainer } from '@grudge/components';
import { Card as CardModel, CardType } from '@grudge/domain';
import connect from 'utilities/mobx/Connect';

@connect(({
  cardTypeStore, cardStore, actionStore, windowSizeStore,
}, { cardId }) => {
  const card = cardStore.getCard(cardId);

  return {
    card,
    isSelected: actionStore.isCardSelected(card),
    isTargeted: actionStore.isCardTargeted(card),
    cardType: card && cardTypeStore.findCardType(card.cardTypeId),
    onClick: () => actionStore.onClickCard(card),
    onClickHold: () => cardStore.inspectCard(card.id),
    responsiveCardSize: windowSizeStore.responsiveCardSize,
  };
})
export default class Card extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(CardModel),
    cardType: PropTypes.instanceOf(CardType),
    onClick: PropTypes.func,
    onClickHold: PropTypes.func,
    isSelected: PropTypes.bool,
    isTargeted: PropTypes.bool,
    isResponsive: PropTypes.bool,
    responsiveCardSize: PropTypes.string,
  }

  static defaultProps = {
    card: undefined,
    cardType: undefined,
    onClick: undefined,
    onClickHold: undefined,
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
      isSelected,
      isTargeted,
      isResponsive,
      responsiveCardSize,
      ...passProps
    } = this.props;

    const size = isResponsive ? responsiveCardSize : undefined;

    if (card) {
      return (
        <CardView
          card={card}
          cardType={cardType}
          onClick={onClick}
          onClickHold={onClickHold}
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
