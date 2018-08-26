import { Component } from 'react';
import PropTypes from 'prop-types';
import { Lobby } from '@grudge/domain';
import { List, ListItem } from '@grudge/components';
import ButtonLink from 'components/ButtonLink/ButtonLink';

export default class LobbyList extends Component {
  static propTypes = {
    lobbies: PropTypes.arrayOf(PropTypes.instanceOf(Lobby)).isRequired,
  };

  render() {
    const {
      lobbies,
    } = this.props;

    if (lobbies.length === 0) {
      return (
        <p>
          No games found
        </p>
      );
    }

    const byTimestamp = (a, b) => b.createdTimestamp - a.createdTimestamp;

    return (
      <List>
        {lobbies.slice().sort(byTimestamp).map((lobby) => (
          <ListItem key={lobby.id}>
            {lobby.id}
            {' '}
            {(new Date(lobby.createdTimestamp)).toString()}
            <ButtonLink to="lobby" params={{ lobbyId: lobby.id }}>
              join
            </ButtonLink>
          </ListItem>
        ))}
      </List>
    );
  }
}
