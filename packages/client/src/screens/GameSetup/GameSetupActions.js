import { Component } from 'react';
import { Button, ButtonGroup } from '@grudge/components';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';

@connect(({ contextStore }) => ({
  leaveContext: contextStore.leaveContext,
}))
export default class GameSetupActions extends Component {
  static propTypes = {
    leaveContext: PropTypes.func.isRequired,
  };

  render() {
    const { leaveContext } = this.props;

    return (
      <ButtonGroup>
        <Button onClick={leaveContext}>
          leave
        </Button>
      </ButtonGroup>
    );
  }
}
