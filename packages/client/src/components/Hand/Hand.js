import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import Card from 'components/Card/Card';
import styles from './Hand.scss';

@connect(({ cardStore }) => ({
  cardIds: cardStore.hand.map((c) => c.id),
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
          <div key={cardId} className={styles.handCard}>
            <Card cardId={cardId}/>
          </div>
        ))}
      </div>
    );
  }
}
