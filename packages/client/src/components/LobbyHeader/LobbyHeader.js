import { Component } from 'react';
import PropTypes from 'prop-types';
import { User, Lobby } from '@grudge/domain';
import { Avatar, Container } from '@grudge/components';
import Link from 'components/Link/Link';
import LobbyAvatarList from 'components/LobbyAvatarList/LobbyAvatarList';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyHeader.scss';
import { Heading } from '../../../../components/index';

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
        <Container size={size} className={styles.lobbyHeader}>
          <LobbyAvatarList users={users} maxUsers={lobby.maxNumberOfPlayers}/>
        </Container>
      </header>
    );
  }
}
