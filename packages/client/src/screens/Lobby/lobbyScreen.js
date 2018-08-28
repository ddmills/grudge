import { Component } from 'react';
import PropTypes from 'prop-types';
import { CodeBlock, Heading } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { Lobby } from '@grudge/domain';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
}))
export default class LobbyScreen extends Component {
  static propTypes = {
    lobby: PropTypes.instanceOf(Lobby),
  }

  static defaultProps = {
    lobby: null,
  }

  render() {
    const { lobby } = this.props;

    return (
      <Page>
        <Heading>
          Lobby boi
        </Heading>
        <CodeBlock>
          {lobby}
        </CodeBlock>
      </Page>
    );
  }
}
