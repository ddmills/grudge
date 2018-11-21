import { Component } from 'react';
import connect from 'utilities/mobx/Connect';
import PropTypes from 'prop-types';
import styles from './PlayerMoney.scss';

@connect(({ playerStore }, { playerId }) => ({
  money: playerStore.getMoneyForPlayer(playerId),
}))
export default class PlayerMoney extends Component {
  static propTypes = {
    money: PropTypes.number,
  }

  static defaultProps = {
    money: 0,
  }

  render() {
    const {
      money,
    } = this.props;

    return (
      <div className={styles.moneyContainer}>
        {money}
      </div>
    );
  }
}
