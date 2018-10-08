import { Component } from 'react';
import PropTypes from 'prop-types';
import { CardSlot } from '@grudge/components';
import Card from 'components/Card/Card';
import connect from 'utilities/mobx/Connect';
import styles from './Hand.scss';

@connect(({ cardStore }) => ({
  cardIds: cardStore.hand.map((card) => card.id),
}))
export default class Hand extends Component {
  static propTypes = {
    cardIds: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    cardIds: [],
  }

  render() {
    const {
      cardIds,
    } = this.props;

    return (
      <div className={styles.hand}>
        {cardIds.map((cardId) => (
          <CardSlot key={cardId}>
            <Card cardId={cardId}/>
          </CardSlot>
        ))}
      </div>
    );
  }
}
