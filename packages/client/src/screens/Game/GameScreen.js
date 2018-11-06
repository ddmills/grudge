import { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadingIndicator } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import GameSetupScreen from 'screens/GameSetup/GameSetupScreen';
import GamePlayScreen from 'screens/GamePlay/GamePlayScreen';
import Redirect from 'components/Redirect/Redirect';

@connect(({ contextStore }) => ({
  isLoading: contextStore.isLoading,
  isSettingUp: contextStore.isSettingUp,
  isRunning: contextStore.isRunning,
  isEnded: contextStore.isEnded,
}))
export default class GameScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSettingUp: PropTypes.bool.isRequired,
    isRunning: PropTypes.bool.isRequired,
    isEnded: PropTypes.bool.isRequired,
  }

  render() {
    const {
      isLoading,
      isSettingUp,
      isRunning,
      isEnded,
    } = this.props;

    if (isLoading) {
      return (
        <Page>
          <LoadingIndicator/>
        </Page>
      );
    }

    if (isSettingUp) {
      return <GameSetupScreen/>;
    }

    if (isRunning) {
      return <GamePlayScreen/>;
    }

    if (isEnded) {
      return (
        <Page>
          {'isEnded'}
        </Page>
      );
    }

    return (
      <Redirect to="landing"/>
    );
  }
}
