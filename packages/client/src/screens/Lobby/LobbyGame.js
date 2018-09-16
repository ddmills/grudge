import { Component } from 'react';
import { Container, CodeBlock } from '@grudge/components';
import PageSuperHeader from 'components/Page/SuperHeader/PageSuperHeader';
import LobbyGameHeader from 'components/LobbyGameHeader/LobbyGameHeader';
import LobbyTimeline from 'components/LobbyTimeline/LobbyTimeline';
import LobbyUserViewer from 'components/LobbyUserViewer/LobbyUserViewer';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyGame.scss';

@connect(({ cardStore }) => ({
  hand: cardStore.hand,
}))
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
            <CodeBlock>
              {this.props.hand}
            </CodeBlock>
          </Container>
        </div>
      </section>
    );
  }
}
