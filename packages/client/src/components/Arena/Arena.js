import { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@grudge/domain';
import ArenaCard from 'components/ArenaCard/ArenaCard';
import connect from 'utilities/mobx/Connect';
import styles from './Arena.scss';

@connect(({ cardStore }, { userId }) => ({
  cards: cardStore.getPlayedCardsForUser(userId),
}))
export default class Arena extends Component {
  static propTypes = {
    cards: PropTypes.arrayOf(PropTypes.instanceOf(Card)),
  }

  static defaultProps = {
    cards: [],
  }

  render() {
    const {
      cards,
    } = this.props;

    return (
      <div className={styles.arena}>
        {cards.map((card) => (
          <ArenaCard
            key={card.id}
            card={card}
          />
        ))}
      </div>
    );
  }
}
