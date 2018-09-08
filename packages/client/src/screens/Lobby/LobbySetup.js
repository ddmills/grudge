import { Component } from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { Heading, CodeBlock } from '@grudge/components';
import { Lobby } from '@grudge/domain';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
}))
export default class LobbySetup extends Component {
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
      <Page>
        <Heading>
          Setup
        </Heading>
        <CodeBlock>
          {lobby}
        </CodeBlock>
      </Page>
    );
  }
}
