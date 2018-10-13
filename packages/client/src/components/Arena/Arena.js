import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import CardSlot from 'components/CardSlot/CardSlot';
import styles from './Arena.scss';

export default class Arena extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
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
      userId,
      position,
    } = this.props;

    const cardListClasses = classnames(styles.cardList, styles[position]);

    return (
      <div className={styles.arena}>
        <div className={cardListClasses}>
          <CardSlot userId={userId} slotIndex={0}/>
          <CardSlot userId={userId} slotIndex={1}/>
          <CardSlot userId={userId} slotIndex={2}/>
          <CardSlot userId={userId} slotIndex={3}/>
          <CardSlot userId={userId} slotIndex={4}/>
          <CardSlot userId={userId} slotIndex={5}/>
        </div>
      </div>
    );
  }
}
