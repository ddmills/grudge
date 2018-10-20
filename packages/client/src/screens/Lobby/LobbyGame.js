import { Component } from 'react';
import { Container } from '@grudge/components';
import PropTypes from 'prop-types';
import PageSuperHeader from 'components/Page/SuperHeader/PageSuperHeader';
import LobbyGameHeader from 'components/LobbyGameHeader/LobbyGameHeader';
import LobbyTimeline from 'components/LobbyTimeline/LobbyTimeline';
import LobbyUserViewer from 'components/LobbyUserViewer/LobbyUserViewer';
import LobbyUserHUD from 'components/LobbyUserHUD/LobbyUserHUD';
import CardInspector from 'components/CardInspector/CardInspector';
import { User } from '@grudge/domain';
import Arena from 'components/Arena/Arena';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyGame.scss';

@connect(({ userStore }) => ({
  user: userStore.currentUser,
}))
export default class LobbyGame extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(User),
  }

  static defaultProps = {
    user: undefined,
  }

  render() {
    const { user } = this.props;

    return (
      <section className={styles.fullPage}>
        <CardInspector/>
        <PageSuperHeader/>
        <LobbyGameHeader/>
        <div className={styles.content}>
          <LobbyUserViewer/>
          <LobbyTimeline/>
          <Container className={styles.viewer} isPadded={false}>
            {user && (
              <Arena userId={user.id}/>
            )}
          </Container>
          <LobbyUserHUD/>
        </div>
      </section>
    );
  }
}
