import { Component } from 'react';
import PropTypes from 'prop-types';
import { CardView, CardContainer } from '@grudge/components';
import { Card, CardType } from '@grudge/domain';
import connect from 'utilities/mobx/Connect';

@connect(({ cardTypeStore, cardStore }, { card }) => ({
  cardType: cardTypeStore.findCardType(card.cardTypeId),
  playCard: () => cardStore.playCard(card),
}))
export default class Hand extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(Card),
    cardType: PropTypes.instanceOf(CardType),
    playCard: PropTypes.func,
  }

  static defaultProps = {
    card: undefined,
    cardType: undefined,
    playCard: undefined,
  }

  render() {
    const {
      card,
      cardType,
      playCard,
    } = this.props;

    if (card) {
      return (
        <CardView
          card={card}
          cardType={cardType}
          onClickEnd={playCard}
        />
      );
    }

    return <CardContainer/>;
  }
}
