import { Component } from 'react';
import PropTypes from 'prop-types';
import { User } from '@grudge/domain';
import LobbyAvatar from 'components/LobbyAvatar/LobbyAvatar';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyUsers.scss';

@connect(({ userStore }) => ({
  users: userStore.users,
}))
export default class LobbyUsers extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.instanceOf(User)),
  }

  static defaultProps = {
    users: [],
  }

  render() {
    const {
      users,
    } = this.props;

    return (
      <div className={styles.lobbyAvatarList}>
        {users.map((user) => (
          <LobbyAvatar
            user={user}
            key={user.id}
          />
        ))}
      </div>
    );
  }
}
