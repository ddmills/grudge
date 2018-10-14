import { Component } from 'react';
import { Container, Heading } from '@grudge/components';
import { User } from '@grudge/domain';
import Arena from 'components/Arena/Arena';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
    highlightStyle: user && actionStore.getUserHighlight(user.id),
    onClick,
  };
})
export default class LobbyUserViewer extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(User),
    highlightStyle: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    user: undefined,
    highlightStyle: undefined,
    onClick: () => {},
  };

  render() {
    const {
      user,
      onClick,
      highlightStyle,
    } = this.props;

    if (!user) {
      return <Container className={styles.lobbyUserViewer} isPadded={false}/>;
    }

    const classes = classnames(
      styles.userName,
      styles[highlightStyle],
    );

    return (
      <Container className={styles.lobbyUserViewer} isPadded={false}>
        <button className={classes} onClick={onClick}>
          {user.displayName}
        </button>
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
