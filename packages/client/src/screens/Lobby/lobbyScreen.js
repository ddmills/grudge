import { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Alert, CodeBlock, Heading } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { Lobby, User } from '@grudge/domain';
import { Button } from '../../../../components/index';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
  users: lobbyStore.users.slice(),
  error: lobbyStore.error,
  leaveLobby: lobbyStore.leaveLobby,
}))
export default class LobbyScreen extends Component {
  static propTypes = {
    lobby: PropTypes.instanceOf(Lobby),
    users: PropTypes.arrayOf(PropTypes.instanceOf(User)),
    error: PropTypes.instanceOf(Error),
    leaveLobby: PropTypes.func.isRequired,
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
      leaveLobby,
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
        <Button onClick={leaveLobby}>
          Leave lobby
        </Button>
      </Page>
    );
  }
}
