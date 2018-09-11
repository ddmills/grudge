import { Component } from 'react';
import PropTypes from 'prop-types';
import { User } from '@grudge/domain';
import { Avatar } from '@grudge/components';
import Link from 'components/Link/Link';
import range from 'utilities/array/Range';
import styles from './LobbyAvatarSetupList.scss';

export default class LobbyAvatarSetupList extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    maxUsers: PropTypes.number,
  }

  static defaultProps = {
    users: [],
    maxUsers: undefined,
  }

  render() {
    const {
      users,
      maxUsers,
    } = this.props;

    return (
      <div className={styles.lobbyAvatarList}>
        {users.map((user) => (
          <Link key={user.id} to="profile" params={{ userId: user.id }}>
            <Avatar user={user}/>
          </Link>
        ))}
        {maxUsers && range(maxUsers - users.length).map((idx) => (
          <span key={idx} className={styles.emptySlot}>
            ?
          </span>
        ))}
      </div>
    );
  }
}
