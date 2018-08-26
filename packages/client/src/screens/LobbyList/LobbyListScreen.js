import { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobXPropTypes } from 'mobx-react';
import Page from 'components/Page/Page';
import LobbyList from 'components/LobbyList/LobbyList';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import Button from 'components/Button/Button';
import connect from 'utilities/mobx/Connect';
import { Lobby } from '@grudge/domain';

@connect(({ lobbyListStore }) => ({
  refreshLobbies: lobbyListStore.refreshLobbies,
  createLobby: lobbyListStore.createLobby,
  lobbies: lobbyListStore.lobbies,
}))
export default class LobbyListScreen extends Component {
  static propTypes = {
    refreshLobbies: PropTypes.func.isRequired,
    createLobby: PropTypes.func.isRequired,
    lobbies: MobXPropTypes.observableArrayOf(Lobby).isRequired,
  };

  render() {
    const {
      refreshLobbies,
      createLobby,
      lobbies,
    } = this.props;

    return (
      <Page>
        <h1>
          Lobbies
        </h1>
        <ButtonGroup>
          <Button onClick={refreshLobbies}>
            Refresh
          </Button>
          <Button onClick={createLobby} color="primary">
            Create
          </Button>
        </ButtonGroup>
        <LobbyList lobbies={lobbies}/>
      </Page>
    );
  }
}
