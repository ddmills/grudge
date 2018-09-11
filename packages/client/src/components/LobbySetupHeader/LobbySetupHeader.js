import { Component } from 'react';
import PropTypes from 'prop-types';
import { User, Lobby } from '@grudge/domain';
import { Container, Button, ButtonGroup } from '@grudge/components';
import LobbyAvatarSetupList from 'components/LobbyAvatarSetupList/LobbyAvatarSetupList';
import connect from 'utilities/mobx/Connect';
import styles from './LobbySetupHeader.scss';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
  users: lobbyStore.users,
  lobbyCountdown: lobbyStore.countdownTimer.display,
  turnCountdown: lobbyStore.turnTimer.display,
  endTurn: lobbyStore.endTurn,
  leaveLobby: lobbyStore.leaveLobby,
  startLobbyCountdown: lobbyStore.startLobbyCountdown,
  stopLobbyCountdown: lobbyStore.stopLobbyCountdown,
}))
export default class LobbySetupHeader extends Component {
  static propTypes = {
    size: PropTypes.oneOf([
      'sm',
      'md',
      'lg',
      'xl',
      'max',
    ]),
    lobby: PropTypes.instanceOf(Lobby),
    users: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    lobbyCountdown: PropTypes.string.isRequired,
    turnCountdown: PropTypes.string.isRequired,
    leaveLobby: PropTypes.func.isRequired,
    endTurn: PropTypes.func,
    startLobbyCountdown: PropTypes.func,
    stopLobbyCountdown: PropTypes.func,
  }

  static defaultProps = {
    size: 'md',
    lobby: undefined,
    endTurn: undefined,
    startLobbyCountdown: undefined,
    stopLobbyCountdown: undefined,
    users: [],
  }

  render() {
    const {
      size,
      lobby,
      users,
      lobbyCountdown,
      turnCountdown,
      leaveLobby,
      startLobbyCountdown,
      stopLobbyCountdown,
      endTurn,
    } = this.props;

    if (!lobby) {
      return null;
    }

    return (
      <header className={styles.lobbySetupHeaderBanner}>
        <Container size={size}>
          <LobbyAvatarSetupList
            users={users}
            maxUsers={lobby.maxNumberOfPlayers}
          />
          <span>
            {turnCountdown}
          </span>
          <ButtonGroup>
            {endTurn && (
              <Button onClick={endTurn}>
                End Turn
              </Button>
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
                <span>
                  {lobbyCountdown}
                </span>
                {' '}
                Cancel
              </Button>
            )}
          </ButtonGroup>
        </Container>
      </header>
    );
  }
}
