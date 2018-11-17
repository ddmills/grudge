import { Component } from 'react';
import { List, ListItem, Heading } from '@grudge/components';
import { Player } from '@grudge/domain';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import PlayerAvatar from 'components/PlayerAvatar/PlayerAvatar';
import styles from './GameSetupPlayers.scss';

@connect(({ playerStore }) => ({
  players: playerStore.players,
}))
export default class GameSetupPlayers extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(PropTypes.instanceOf(Player)).isRequired,
  };

  render() {
    const { players } = this.props;

    return (
      <List>
        {players.map((player) => (
          <ListItem key={player.id}>
            <PlayerAvatar className={styles.playerAvatar} playerId={player.id}/>
            <Heading size={4} className={styles.playerNameHeader}>
              {player.displayName}
            </Heading>
          </ListItem>
        ))}
      </List>
    );
  }
}
