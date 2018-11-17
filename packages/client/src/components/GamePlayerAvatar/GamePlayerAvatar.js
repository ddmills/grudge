import { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerAvatar from 'components/PlayerAvatar/PlayerAvatar';
import styles from './GamePlayerAvatar.scss';

export default class GamePlayerAvatar extends Component {
  static propTypes = {
    playerId: PropTypes.string,
  }

  static defaultProps = {
    playerId: undefined,
  }

  render() {
    const {
      playerId,
    } = this.props;

    if (!playerId) {
      return;
    }

    return (
      <PlayerAvatar className={styles.avatarImage} playerId={playerId}/>
    );
  }
}
