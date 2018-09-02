import { Component } from 'react';
import PropTypes from 'prop-types';
import { User, Lobby } from '@grudge/domain';
import { Container } from '@grudge/components';
import LobbyAvatarList from 'components/LobbyAvatarList/LobbyAvatarList';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyHeader.scss';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
  users: lobbyStore.users,
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
  }

  static defaultProps = {
    size: 'md',
    lobby: undefined,
    users: [],
    isVisible: true,
  }

  render() {
    const {
      size,
      isVisible,
      lobby,
      users,
    } = this.props;

    if (!lobby || !isVisible) {
      return null;
    }

    return (
      <header className={styles.lobbyHeaderBanner}>
        <Container size={size}>
          <LobbyAvatarList users={users} maxUsers={lobby.maxNumberOfPlayers}/>
        </Container>
      </header>
    );
  }
}
