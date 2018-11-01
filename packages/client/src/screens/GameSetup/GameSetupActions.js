import { Component } from 'react';
import { Button, ButtonGroup } from '@grudge/components';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';

@connect(({ contextStore }) => ({
  leaveContext: contextStore.leaveContext,
  startContextCountdown: contextStore.startContextCountdown,
  stopContextCountdown: contextStore.stopContextCountdown,
}))
export default class GameSetupActions extends Component {
  static propTypes = {
    leaveContext: PropTypes.func.isRequired,
    startContextCountdown: PropTypes.func,
    stopContextCountdown: PropTypes.func,
  };

  static defaultProps = {
    startContextCountdown: undefined,
    stopContextCountdown: undefined,
  };

  render() {
    const {
      leaveContext,
      startContextCountdown,
      stopContextCountdown,
    } = this.props;

    return (
      <ButtonGroup>
        <Button onClick={leaveContext}>
          leave
        </Button>
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
