import { Component } from 'react';
import { Heading, Button } from '@grudge/components';
import Page from 'components/Page/Page';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';

@connect(({ userStore, lobbyStore }) => {
  const user = userStore.currentUser;
  const winner = userStore.winnerUser;

  return {
    isWinner: Boolean(user && winner && winner.id === user.id),
    leaveLobby: lobbyStore.leaveLobby,
  };
})
export default class LobbyEnded extends Component {
  static propTypes = {
    isWinner: PropTypes.bool.isRequired,
    leaveLobby: PropTypes.func.isRequired,
  }

  render() {
    const {
      isWinner,
      leaveLobby,
    } = this.props;

    return (
      <Page>
        {isWinner ? (
          <Heading>
            Victory!
          </Heading>
        ) : (
          <Heading>
            Defeat!
          </Heading>
        )}
        <Button onClick={leaveLobby} color="primary">
          Leave Lobby
        </Button>
      </Page>
    );
  }
}
