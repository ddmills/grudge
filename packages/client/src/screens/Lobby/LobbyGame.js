import { Component } from 'react';
import { Container } from '@grudge/components';
import PageSuperHeader from 'components/Page/SuperHeader/PageSuperHeader';
import LobbyGameHeader from 'components/LobbyGameHeader/LobbyGameHeader';
import LobbyTimeline from 'components/LobbyTimeline/LobbyTimeline';
import styles from './LobbyGame.scss';

export default class LobbyGame extends Component {
  render() {
    return (
      <section className={styles.fullPage}>
        <PageSuperHeader/>
        <LobbyGameHeader/>
        <div className={styles.content}>
          <Container className={styles.viewer}/>
          <LobbyTimeline/>
          <Container className={styles.viewer}/>
        </div>
      </section>
    );
  }
}
