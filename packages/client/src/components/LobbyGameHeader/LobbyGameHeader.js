import { Component } from 'react';
import PropTypes from 'prop-types';
import { User, Lobby } from '@grudge/domain';
import { Container } from '@grudge/components';
import LobbyAvatarList from 'components/LobbyAvatarList/LobbyAvatarList';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyGameHeader.scss';

@connect(({ lobbyStore }) => ({
  users: lobbyStore.users,
}))
export default class LobbyGameHeader extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.instanceOf(User)),
  }

  static defaultProps = {
    users: [],
  }

  render() {
    const {
      users,
    } = this.props;

    return (
      <header className={styles.lobbyGameHeaderBanner}>
        <Container className={styles.lobbyGameHeader}>
          <LobbyAvatarList users={users}/>
        </Container>
      </header>
    );
  }
}
