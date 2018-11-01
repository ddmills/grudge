import { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadingIndicator, CodeBlock, Button } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { Context } from '@grudge/domain';
import GameSetupScreen from 'screens/GameSetup/GameSetupScreen';
import Redirect from 'components/Redirect/Redirect';

@connect(({ contextStore }) => ({
  ctx: contextStore.context,
}))
export default class GameScreen extends Component {
  static propTypes = {
    ctx: PropTypes.instanceOf(Context),
  }

  static defaultProps = {
    ctx: null,
  }

  render() {
    const {
      ctx,
    } = this.props;

    if (!ctx) {
      return (
        <Page>
          <LoadingIndicator/>
        </Page>
      );
    }

    if (ctx.isSettingUp) {
      return <GameSetupScreen/>;
    }

    if (ctx.isRunning) {
      return (
        <Page>
          {'isRunning'}
          <CodeBlock>
            {ctx}
          </CodeBlock>
        </Page>
      );
    }

    if (ctx.isEnded) {
      return (
        <Page>
          {'isEnded'}
          <CodeBlock>
            {ctx}
          </CodeBlock>
        </Page>
      );
    }

    return (
      <Redirect to="landing"/>
    );
  }
}
