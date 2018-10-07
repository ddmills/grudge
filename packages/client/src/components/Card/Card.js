import { Component } from 'react';
import PropTypes from 'prop-types';
import { CardView, CardContainer } from '@grudge/components';
import { Card as CardModel, CardType } from '@grudge/domain';
import connect from 'utilities/mobx/Connect';

@connect(({ cardTypeStore, cardStore, actionStore }, { cardId }) => {
  const card = cardStore.getCard(cardId);

  return {
    card,
    isSelected: actionStore.isCardSelected(card),
    isTargeted: actionStore.isCardTargeted(card),
    cardType: card && cardTypeStore.findCardType(card.cardTypeId),
    onClick: () => actionStore.onClickCard(card),
  };
})
export default class Card extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(CardModel),
    cardType: PropTypes.instanceOf(CardType),
    onClick: PropTypes.func,
    isSelected: PropTypes.bool,
    isTargeted: PropTypes.bool,
  }

  static defaultProps = {
    card: undefined,
    cardType: undefined,
    onClick: undefined,
    isSelected: false,
    isTargeted: false,
  }

  render() {
    const {
      card,
      cardType,
      onClick,
      isSelected,
      isTargeted,
    } = this.props;

    if (card) {
      return (
        <CardView
          card={card}
          cardType={cardType}
          onClickEnd={onClick}
          isSelected={isSelected}
          isTargeted={isTargeted}
        />
      );
    }

    return <CardContainer/>;
  }
}
