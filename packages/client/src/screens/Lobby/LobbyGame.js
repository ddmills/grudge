import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import { Container } from '@grudge/components';
import { Lobby } from '@grudge/domain';
import PageSuperHeader from 'components/Page/SuperHeader/PageSuperHeader';
import LobbyGameHeader from 'components/LobbyGameHeader/LobbyGameHeader';
import LobbyTimeline from 'components/LobbyTimeline/LobbyTimeline';
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
