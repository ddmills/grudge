import { Component } from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { Heading, CodeBlock } from '@grudge/components';
import { Lobby } from '@grudge/domain';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
}))
export default class LobbyGame extends Component {
  static propTypes = {
    lobby: PropTypes.instanceOf(Lobby),
  }

  static defaultProps = {
    lobby: null,
  }

  render() {
    const {
      lobby,
    } = this.props;

    return (
      <Page showHeader={false} showFooter={false}>
        <CodeBlock>
          {lobby}
        </CodeBlock>
      </Page>
    );
  }
}
