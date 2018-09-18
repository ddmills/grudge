import { Component } from 'react';
import PropTypes from 'prop-types';
import { CardStatic, CardContainer } from '@grudge/components';
import { CardType } from '@grudge/domain';
import connect from 'utilities/mobx/Connect';

@connect(({ cardTypeStore }, { card }) => ({
  cardType: cardTypeStore.findCardType(card.cardTypeId),
}))
export default class Hand extends Component {
  static propTypes = {
    cardType: PropTypes.instanceOf(CardType),
  }

  static defaultProps = {
    cardType: undefined,
  }

  render() {
    const {
      cardType,
    } = this.props;

    if (cardType) {
      return (
        <CardStatic cardType={cardType} isInspectable/>
      );
    }

    return <CardContainer/>;
  }
}
