import { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card/Card';
import connect from 'utilities/mobx/Connect';
import styles from './Arena.scss';

@connect(({ cardStore }, { userId }) => ({
  cardIds: cardStore.getPlayedCardsForUser(userId).map((card) => card.id),
}))
export default class Arena extends Component {
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
      <div className={styles.arena}>
        {cardIds.map((cardId) => (
          <Card
            key={cardId}
            cardId={cardId}
          />
        ))}
      </div>
    );
  }
}
