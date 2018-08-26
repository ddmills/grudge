import { Component } from 'react';
import PropTypes from 'prop-types';
import List from 'components/List/List';
import ListItem from 'components/List/ListItem/ListItem';

export default class LobbyList extends Component {
  static propTypes = {
    lobbies: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    lobbies: [],
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
            {lobby.title}
          </ListItem>
        ))}
      </List>
    );
  }
}
