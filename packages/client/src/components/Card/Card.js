import { Component } from 'react';
import PropTypes from 'prop-types';
import { CardView, CardContainer } from '@grudge/components';
import { Card as CardModel, CardType } from '@grudge/domain';
import connect from 'utilities/mobx/Connect';

@connect(({ cardTypeStore, commandStore, cardStore }, { cardId }) => {
  const card = cardStore.getCard(cardId);

  return {
    card,
    cardType: card && cardTypeStore.findCardType(card.cardTypeId),
    onClick: () => commandStore.onClickCard(card),
  };
})
export default class Card extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(CardModel),
    cardType: PropTypes.instanceOf(CardType),
    onClick: PropTypes.func,
  }

  static defaultProps = {
    card: undefined,
    cardType: undefined,
    onClick: undefined,
  }

  render() {
    const {
      card,
      cardType,
      onClick,
    } = this.props;

    if (card) {
      return (
        <CardView
          card={card}
          cardType={cardType}
          onClickEnd={onClick}
        />
      );
    }

    return <CardContainer/>;
  }
}
