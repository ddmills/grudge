import { Component } from 'react';
import PropTypes from 'prop-types';
import { User, Lobby } from '@grudge/domain';
import { Container, Button, ButtonGroup } from '@grudge/components';
import LobbyAvatarList from 'components/LobbyAvatarList/LobbyAvatarList';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyHeader.scss';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
  users: lobbyStore.users,
  lobbyCountdown: lobbyStore.timer.display,
  leaveLobby: lobbyStore.leaveLobby,
  startLobbyCountdown: lobbyStore.startLobbyCountdown,
  stopLobbyCountdown: lobbyStore.stopLobbyCountdown,
}))
export default class LobbyHeader extends Component {
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
    isVisible: PropTypes.bool,
    lobbyCountdown: PropTypes.string.isRequired,
    leaveLobby: PropTypes.func.isRequired,
    startLobbyCountdown: PropTypes.func,
    stopLobbyCountdown: PropTypes.func,
  }

  static defaultProps = {
    size: 'md',
    lobby: undefined,
    startLobbyCountdown: undefined,
    stopLobbyCountdown: undefined,
    users: [],
    isVisible: true,
  }

  render() {
    const {
      size,
      isVisible,
      lobby,
      users,
      lobbyCountdown,
      leaveLobby,
      startLobbyCountdown,
      stopLobbyCountdown,
    } = this.props;

    if (!lobby || !isVisible) {
      return null;
    }

    return (
      <header className={styles.lobbyHeaderBanner}>
        <Container size={size}>
          <LobbyAvatarList users={users} maxUsers={lobby.maxNumberOfPlayers}/>
          <ButtonGroup>
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
