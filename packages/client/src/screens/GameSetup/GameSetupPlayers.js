import { Component } from 'react';
import { List, ListItem } from '@grudge/components';
import { Player } from '@grudge/domain';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';

@connect(({ contextStore }) => ({
  players: contextStore.players,
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
            {player.displayName}
          </ListItem>
        ))}
      </List>
    );
  }
}
