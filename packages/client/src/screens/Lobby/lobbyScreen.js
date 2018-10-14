import { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, LoadingIndicator } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { Lobby } from '@grudge/domain';
import Redirect from 'components/Redirect/Redirect';
import LobbySetup from './LobbySetup';
import LobbyGame from './LobbyGame';
import LobbyEnded from './LobbyEnded';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
  error: lobbyStore.error,
}))
export default class LobbyScreen extends Component {
  static propTypes = {
    lobby: PropTypes.instanceOf(Lobby),
    error: PropTypes.instanceOf(Error),
  }

  static defaultProps = {
    lobby: null,
    error: null,
  }

  render() {
    const {
      lobby,
      error,
    } = this.props;

    if (error) {
      return (
        <Page>
          <Alert>
            {error.message}
          </Alert>
        </Page>
      );
    }

    if (!lobby) {
      return (
        <Page>
          <LoadingIndicator/>
        </Page>
      );
    }

    if (lobby.isSettingUp) {
      return <LobbySetup/>;
    }

    if (lobby.isRunning) {
      return <LobbyGame/>;
    }

    if (lobby.isEnded) {
      return <LobbyEnded/>;
    }

    return (
      <Redirect to="landing"/>
    );
  }
}
