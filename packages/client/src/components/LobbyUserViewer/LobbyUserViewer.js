import { Component } from 'react';
import { Container, Heading, Button } from '@grudge/components';
import { User } from '@grudge/domain';
import Arena from 'components/Arena/Arena';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyUserViewer.scss';

@connect(({ userStore, cardStore, actionStore }) => {
  const user = userStore.selectedUser;
  const onClick = actionStore.hasTargetEnemyUserAction
    ? () => actionStore.onEnemyUserClicked(user)
    : () => {};

  return {
    user,
    playedCards: cardStore.selectedUserPlayedCards,
    onClick,
  };
})
export default class LobbyUserViewer extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(User),
    onClick: PropTypes.func,
  };

  static defaultProps = {
    user: undefined,
    onClick: () => {},
  };

  render() {
    const {
      user,
      onClick,
    } = this.props;

    if (!user) {
      return <Container className={styles.lobbyUserViewer} isPadded={false}/>;
    }

    return (
      <Container className={styles.lobbyUserViewer} isPadded={false}>
        <Button onClick={onClick} color="red">
          {user.displayName}
        </Button>
        <Heading size={4}>
          {`money: ${user.money}`}
        </Heading>
        <Heading size={4}>
          {`health: ${user.health}`}
        </Heading>
        <Arena
          userId={user.id}
          position="bottom"
        />
      </Container>
    );
  }
}
