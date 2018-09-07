import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, CodeBlock, Heading, Button, LoadingIndicator,
} from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { Lobby, User } from '@grudge/domain';
import autobind from 'autobind-decorator';

@connect(({ lobbyStore, routerStore }) => ({
  lobby: lobbyStore.lobby,
  users: lobbyStore.users.slice(),
  error: lobbyStore.error,
  leaveLobby: lobbyStore.leaveLobby,
  startLobbyCountdown: lobbyStore.startLobbyCountdown,
  stopLobbyCountdown: lobbyStore.stopLobbyCountdown,
  navigate: routerStore.navigate,
}))
export default class LobbyScreen extends Component {
  static propTypes = {
    lobby: PropTypes.instanceOf(Lobby),
    users: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    error: PropTypes.instanceOf(Error),
    leaveLobby: PropTypes.func.isRequired,
    startLobbyCountdown: PropTypes.func,
    stopLobbyCountdown: PropTypes.func,
    navigate: PropTypes.func.isRequired,
    lobbyId: PropTypes.string.isRequired,
  }

  static defaultProps = {
    lobby: null,
    users: [],
    error: null,
    startLobbyCountdown: null,
    stopLobbyCountdown: null,
  }

  render() {
    const {
      lobby,
      lobbyId,
      error,
      leaveLobby,
      startLobbyCountdown,
      stopLobbyCountdown,
    } = this.props;

    if (lobby) {
      if (lobbyId !== lobby.id) {
        return (
          <Page>
            <Alert>
              User is already in a lobby;
            </Alert>
          </Page>
        );
      }
    } else {
      return (
        <Page>
          <LoadingIndicator/>
        </Page>
      );
    }

    return (
      <Page>
        <Heading>
          Lobby
        </Heading>
        <Alert error={error}/>
        {lobby && (
          <CodeBlock>
            {lobby}
          </CodeBlock>
        )}
        {leaveLobby && (
          <Button onClick={leaveLobby}>
            Leave lobby
          </Button>
        )}
        {startLobbyCountdown && (
          <Button onClick={startLobbyCountdown}>
            Start lobby
          </Button>
        )}
        {stopLobbyCountdown && (
          <Button onClick={stopLobbyCountdown}>
            Cancel Countdown
          </Button>
        )}
      </Page>
    );
  }
}
