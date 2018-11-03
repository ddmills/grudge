import { Component } from 'react';
import { Button, CodeBlock } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';

@connect(({ contextStore }) => ({
  ctx: contextStore.ctx,
  leaveContext: contextStore.leaveContext,
}))
export default class GamePlayScreen extends Component {
  render() {
    const {
      ctx,
      leaveContext,
    } = this.props;

    return (
      <Page>
        {leaveContext && (
          <Button onClick={leaveContext}>
            leave
          </Button>
        )}
        <CodeBlock>
          {ctx}
        </CodeBlock>
      </Page>
    );
  }
}
