import { Component } from 'react';
import PropTypes from 'prop-types';
import { CardView, CardContainer } from '@grudge/components';
import { Card, CardType } from '@grudge/domain';
import connect from 'utilities/mobx/Connect';

@connect(({ cardTypeStore }, { card }) => ({
  cardType: cardTypeStore.findCardType(card.cardTypeId),
}))
export default class ArenaCard extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(Card),
    cardType: PropTypes.instanceOf(CardType),
  }

  static defaultProps = {
    card: undefined,
    cardType: undefined,
  }

  render() {
    const {
      card,
      cardType,
    } = this.props;

    if (card) {
      return (
        <CardView
          card={card}
          cardType={cardType}
        />
      );
    }

    return <CardContainer/>;
  }
}
