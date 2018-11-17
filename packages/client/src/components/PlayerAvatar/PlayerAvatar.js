import { Component } from 'react';
import { Player } from '@grudge/domain';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import connect from 'utilities/mobx/Connect';
import styles from './PlayerAvatar.scss';

@connect(({ playerStore }, { playerId }) => ({
  player: playerStore.getPlayer(playerId),
}))
export default class PlayerAvatar extends Component {
  static propTypes = {
    player: PropTypes.instanceOf(Player),
    className: PropTypes.string,
  }

  static defaultProps = {
    player: undefined,
    className: undefined,
  }

  render() {
    const {
      player,
      className,
    } = this.props;

    if (!player) {
      return;
    }

    const classes = classNames(
      styles.avatarImage,
      className,
    );

    return (
      <img
        className={classes}
        src={player.avatar}
        alt={player.displayName}
        title={player.displayName}
      />
    );
  }
}
