import { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, LoadingIndicator } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { Lobby } from '@grudge/domain';
import Redirect from 'components/Redirect/Redirect';
import LobbySetup from './LobbySetup';
import LobbyGame from './LobbyGame';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
  isSettingUp: lobbyStore.isSettingUp,
  isRunning: lobbyStore.isRunning,
}))
export default class LobbyScreen extends Component {
  static propTypes = {
    lobby: PropTypes.instanceOf(Lobby),
    lobbyId: PropTypes.string.isRequired,
    isSettingUp: PropTypes.bool.isRequired,
    isRunning: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    lobby: null,
  }

  render() {
    const {
      lobby,
      lobbyId,
      isSettingUp,
      isRunning,
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

    if (isSettingUp) {
      return <LobbySetup/>;
    }

    if (isRunning) {
      return <LobbyGame/>;
    }

    return (
      <Redirect to="landing"/>
    );
  }
}
