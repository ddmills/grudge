import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import { CodeBlock, Container } from '@grudge/components';
import { Lobby } from '@grudge/domain';
import PageSuperHeader from 'components/Page/SuperHeader/PageSuperHeader';
import styles from './LobbyGame.scss';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
}))
export default class LobbyGame extends Component {
  static propTypes = {
    lobby: PropTypes.instanceOf(Lobby),
  }

  static defaultProps = {
    lobby: null,
  }

  render() {
    const {
      lobby,
    } = this.props;

    return (
      <section className={styles.fullPage}>
        <PageSuperHeader/>
        <div className={styles.header}>
          <Container>
            Lobby Header
          </Container>
        </div>
        <div className={styles.content}>
          <Container className={styles.viewer}/>
          <div className={styles.timeline}/>
          <Container className={styles.viewer}>
            <CodeBlock>
              {lobby}
            </CodeBlock>
          </Container>
        </div>
      </section>
    );
  }
}
