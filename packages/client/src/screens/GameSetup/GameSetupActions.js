import { Component } from 'react';
import { Button, ButtonGroup } from '@grudge/components';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';

@connect(({ contextStore, playerStore }) => ({
  leaveContext: contextStore.leaveContext,
  startContextCountdown: contextStore.startContextCountdown,
  stopContextCountdown: contextStore.stopContextCountdown,
  addBotPlayer: playerStore.addBotPlayer,
}))
export default class GameSetupActions extends Component {
  static propTypes = {
    leaveContext: PropTypes.func.isRequired,
    startContextCountdown: PropTypes.func,
    stopContextCountdown: PropTypes.func,
    addBotPlayer: PropTypes.func,
  };

  static defaultProps = {
    startContextCountdown: undefined,
    stopContextCountdown: undefined,
    addBotPlayer: undefined,
  };

  render() {
    const {
      leaveContext,
      startContextCountdown,
      stopContextCountdown,
      addBotPlayer,
    } = this.props;

    return (
      <ButtonGroup>
        <Button onClick={leaveContext}>
          leave
        </Button>
        {addBotPlayer && (
          <Button onClick={addBotPlayer}>
            Add bot player
          </Button>
        )}
        {startContextCountdown && (
          <Button onClick={startContextCountdown} color="green">
            start
          </Button>
        )}
        {stopContextCountdown && (
          <Button onClick={stopContextCountdown} color="red">
            stop
          </Button>
        )}
      </ButtonGroup>
    );
  }
}
