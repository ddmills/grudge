import { Component } from 'react';
import { Button, CodeBlock } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';

@connect(({ contextStore }) => ({
  context: contextStore.context,
  leaveContext: contextStore.leaveContext,
}))
export default class GamePlayScreen extends Component {
  render() {
    const {
      context,
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
          {context}
        </CodeBlock>
      </Page>
    );
  }
}
