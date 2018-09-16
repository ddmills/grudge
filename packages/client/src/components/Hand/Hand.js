import { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@grudge/domain';
import HandCard from 'components/HandCard/HandCard';
import connect from 'utilities/mobx/Connect';
import styles from './Hand.scss';

@connect(({ cardStore }) => ({
  hand: cardStore.hand,
}))
export default class Hand extends Component {
  static propTypes = {
    hand: PropTypes.arrayOf(PropTypes.instanceOf(Card)),
  }

  static defaultProps = {
    hand: [],
  }

  render() {
    const {
      hand,
    } = this.props;

    return (
      <div className={styles.hand}>
        {hand.map((card) => (
          <HandCard key={card.id} card={card}/>
        ))}
      </div>
    );
  }
}
