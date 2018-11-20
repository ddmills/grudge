import { Component } from 'react';
import { Heading, Button } from '@grudge/components';
import Page from 'components/Page/Page';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';

@connect(({ playerStore, contextStore }) => ({
  isWinner: playerStore.isCurrentPlayerWinner,
  leaveContext: contextStore.leaveContext,
}))
export default class GameEndScreen extends Component {
  static propTypes = {
    isWinner: PropTypes.bool.isRequired,
    leaveContext: PropTypes.func.isRequired,
  }

  render() {
    const {
      isWinner,
      leaveContext,
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
        <Button onClick={leaveContext} color="primary">
          Leave Game
        </Button>
      </Page>
    );
  }
}
