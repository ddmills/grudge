import { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card/Card';
import { CardSlot, CardContainer } from '@grudge/components';
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
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <CardSlot key={idx}>
            {idx in cardIds ? (
              <Card cardId={cardIds[idx]}/>
            ) : (
              <CardContainer/>
            )}
          </CardSlot>
        ))}
      </div>
    );
  }
}
