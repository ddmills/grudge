import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Heading } from '@grudge/components';
import { Lobby } from '@grudge/domain';
import Page from 'components/Page/Page';
import LobbyList from 'components/LobbyList/LobbyList';
import connect from 'utilities/mobx/Connect';

@connect(({ lobbyListStore }) => ({
  refreshLobbies: lobbyListStore.refreshLobbies,
  createLobby: lobbyListStore.createLobby,
  lobbies: lobbyListStore.lobbies,
}))
export default class LobbyListScreen extends Component {
  static propTypes = {
    refreshLobbies: PropTypes.func.isRequired,
    createLobby: PropTypes.func.isRequired,
    lobbies: PropTypes.arrayOf(PropTypes.instanceOf(Lobby)).isRequired,
  };

  render() {
    const {
      refreshLobbies,
      createLobby,
      lobbies,
    } = this.props;

    return (
      <Page>
        <Heading>
          Lobbies
        </Heading>
        <ButtonGroup>
          <Button onClick={refreshLobbies}>
            Refresh
          </Button>
          <Button onClick={createLobby} color="green">
            Create
          </Button>
        </ButtonGroup>
        <LobbyList lobbies={lobbies}/>
      </Page>
    );
  }
}
