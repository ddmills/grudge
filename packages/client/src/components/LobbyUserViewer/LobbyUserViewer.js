import { Component } from 'react';
import { Container, Heading } from '@grudge/components';
import { User } from '@grudge/domain';
import Arena from 'components/Arena/Arena';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyUserViewer.scss';

@connect(({ userStore, cardStore }) => ({
  user: userStore.selectedUser,
  playedCards: cardStore.selectedUserPlayedCards,
}))
export default class LobbyUserViewer extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(User),
  };

  static defaultProps = {
    user: undefined,
  };

  render() {
    const {
      user,
    } = this.props;

    return (
      <Container className={styles.lobbyUserViewer}>
        {user && (
          <Heading size={4}>
            {user.displayName}
            {' '}
            {`(${user.money})`}
          </Heading>
        )}
        {user && (
          <Arena userId={user.id} position="bottom"/>
        )}
      </Container>
    );
  }
}
