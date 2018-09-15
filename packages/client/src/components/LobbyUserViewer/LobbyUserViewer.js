import { Component } from 'react';
import { Container, CardContainer, Heading } from '@grudge/components';
import { User } from '@grudge/domain';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyUserViewer.scss';

@connect(({ userStore }) => ({
  user: userStore.selectedUser,
}))
export default class LobbyUserViewer extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(User),
  };

  static defaultProps = {
    user: undefined,
  };

  render() {
    const { user } = this.props;

    return (
      <Container className={styles.lobbyUserViewer}>
        {user && (
          <Heading size={4}>
            {user.displayName}
          </Heading>
        )}
        <CardContainer/>
      </Container>
    );
  }
}
