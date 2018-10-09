import { Component } from 'react';
import PropTypes from 'prop-types';
import CardSlot from 'components/CardSlot/CardSlot';
import styles from './Arena.scss';

export default class Arena extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
  }

  render() {
    const {
      userId,
    } = this.props;

    return (
      <div className={styles.arena}>
        <CardSlot userId={userId} slotIndex={0}/>
        <CardSlot userId={userId} slotIndex={1}/>
        <CardSlot userId={userId} slotIndex={2}/>
        <CardSlot userId={userId} slotIndex={3}/>
        <CardSlot userId={userId} slotIndex={4}/>
        <CardSlot userId={userId} slotIndex={5}/>
      </div>
    );
  }
}
