import { Component } from 'react';
import { Container } from '@grudge/components';
import LobbyUsers from 'components/LobbyUsers/LobbyUsers';
import styles from './LobbyGameHeader.scss';

export default class LobbyGameHeader extends Component {
  render() {
    return (
      <header className={styles.lobbyGameHeaderBanner}>
        <Container className={styles.lobbyGameHeader}>
          <LobbyUsers/>
        </Container>
      </header>
    );
  }
}
