import { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Alert, CodeBlock, Heading } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { Lobby, User } from '@grudge/domain';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
  users: lobbyStore.users.slice(),
  error: lobbyStore.error,
}))
export default class LobbyScreen extends Component {
  static propTypes = {
    lobby: PropTypes.instanceOf(Lobby),
    users: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    error: PropTypes.instanceOf(Error),
  }

  static defaultProps = {
    lobby: null,
    users: [],
    error: null,
  }

  render() {
    const {
      lobby,
      users,
      error,
    } = this.props;

    return (
      <Page>
        <Heading>
          Lobby
        </Heading>
        <Alert error={error}/>
        {lobby && (
          <CodeBlock>
            {lobby}
          </CodeBlock>
        )}
        {users.length > 0 && (
          <CodeBlock>
            {users}
          </CodeBlock>
        )}
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Heading size={4}>
                {user.displayName}
              </Heading>
              <Avatar user={user}/>
            </li>
          ))}
        </ul>
      </Page>
    );
  }
}
