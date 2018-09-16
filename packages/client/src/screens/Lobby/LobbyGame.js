import { Component } from 'react';
import { Container } from '@grudge/components';
import PageSuperHeader from 'components/Page/SuperHeader/PageSuperHeader';
import LobbyGameHeader from 'components/LobbyGameHeader/LobbyGameHeader';
import LobbyTimeline from 'components/LobbyTimeline/LobbyTimeline';
import LobbyUserViewer from 'components/LobbyUserViewer/LobbyUserViewer';
import Hand from 'components/Hand/Hand';
import styles from './LobbyGame.scss';

export default class LobbyGame extends Component {
  render() {
    return (
      <section className={styles.fullPage}>
        <PageSuperHeader/>
        <LobbyGameHeader/>
        <div className={styles.content}>
          <LobbyUserViewer/>
          <LobbyTimeline/>
          <Container className={styles.viewer}>
            <Hand/>
          </Container>
        </div>
      </section>
    );
  }
}
