import { Component } from 'react';
import { PropTypes as MobXPropTypes } from 'mobx-react';
import { Lobby } from '@grudge/domain';
import { List, ListItem } from '@grudge/components';

export default class LobbyList extends Component {
  static propTypes = {
    lobbies: MobXPropTypes.observableArrayOf(Lobby).isRequired,
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

    return (
      <List>
        {lobbies.map((lobby) => (
          <ListItem key={lobby.id}>
            {lobby.id}
          </ListItem>
        ))}
      </List>
    );
  }
}
