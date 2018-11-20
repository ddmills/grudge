import { Component } from 'react';
import connect from 'utilities/mobx/Connect';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PlayerAvatar from 'components/PlayerAvatar/PlayerAvatar';
import PlayerHealthBar from 'components/PlayerHealthBar/PlayerHealthBar';
import styles from './GamePlayerAvatar.scss';

@connect(({ actionStore }, { playerId }) => ({
  onClick: () => actionStore.onClickPlayer(playerId),
  highlightStyle: actionStore.getPlayerHighlight(playerId),
}))
export default class GamePlayerAvatar extends Component {
  static propTypes = {
    playerId: PropTypes.string,
    onClick: PropTypes.func,
    highlightStyle: PropTypes.string,
  }

  static defaultProps = {
    playerId: undefined,
    onClick: () => {},
    highlightStyle: undefined,
  }

  render() {
    const {
      playerId,
      onClick,
      highlightStyle,
    } = this.props;

    if (!playerId) {
      return;
    }

    const classes = classnames(
      styles.avatarImage,
      styles[highlightStyle],
    );

    return (
      <button className={styles.avatarButton} onClick={onClick}>
        <PlayerAvatar className={classes} playerId={playerId}/>
        <PlayerHealthBar playerId={playerId}/>
      </button>
    );
  }
}
