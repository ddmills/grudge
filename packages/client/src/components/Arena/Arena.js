import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CardSlot from 'components/CardSlot/CardSlot';
import styles from './Arena.scss';

export default class Arena extends Component {
  static propTypes = {
    playerId: PropTypes.string.isRequired,
    position: PropTypes.oneOf([
      'top',
      'bottom',
    ]),
  }

  static defaultProps = {
    position: 'top',
  }

  render() {
    const {
      playerId,
      position,
    } = this.props;

    const cardListClasses = classnames(styles.cardList, styles[position]);

    return (
      <div className={styles.arena}>
        <div className={cardListClasses}>
          <CardSlot playerId={playerId} slotIndex={0}/>
          <CardSlot playerId={playerId} slotIndex={1}/>
          <CardSlot playerId={playerId} slotIndex={2}/>
          <CardSlot playerId={playerId} slotIndex={3}/>
          <CardSlot playerId={playerId} slotIndex={4}/>
          <CardSlot playerId={playerId} slotIndex={5}/>
        </div>
      </div>
    );
  }
}
