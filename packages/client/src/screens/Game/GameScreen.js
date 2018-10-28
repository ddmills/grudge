import { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadingIndicator } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { Context } from '@grudge/domain';
import Redirect from 'components/Redirect/Redirect';

@connect(({ contextStore }) => ({
  context: contextStore.context,
  error: contextStore.error,
}))
export default class GameScreen extends Component {
  static propTypes = {
    context: PropTypes.instanceOf(Context),
  }

  static defaultProps = {
    context: null,
  }

  render() {
    const {
      context,
    } = this.props;

    if (!context) {
      return (
        <Page>
          <LoadingIndicator/>
        </Page>
      );
    }

    if (context.isSettingUp) {
      return (
        <Page>
          {'isSettingUp'}
        </Page>
      );
    }

    if (context.isRunning) {
      return (
        <Page>
          {'isRunning'}
        </Page>
      );
    }

    if (context.isEnded) {
      return (
        <Page>
          {'isEnded'}
        </Page>
      );
    }

    return (
      <Page>
        {'yo'}
      </Page>
    );

    // return (
    //   <Redirect to="landing"/>
    // );
  }
}
