import { Component } from 'react';
import { Container } from '@grudge/components';
import PropTypes from 'prop-types';
import { User } from '@grudge/domain';
import Hand from 'components/Hand/Hand';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyUserHUD.scss';

@connect(({ userStore }) => ({
  user: userStore.currentUser,
}))
export default class LobbyUserHUD extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(User),
  }

  static defaultProps = {
    user: undefined,
  }

  render() {
    const { user } = this.props;

    return (
      <div className={styles.userHUDBanner}>
        {user && (
          <Container className={styles.userHUD} isPadded={false}>
            <div className={styles.userHUDRight}>
              <Hand/>
            </div>
            <div className={styles.userHUDLeft}>
              <p>
                Money: {user.money}
              </p>
              <p>
                Health: {user.health}
              </p>
            </div>
          </Container>
        )}
      </div>
    );
  }
}
