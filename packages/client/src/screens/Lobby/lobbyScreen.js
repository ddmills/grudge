import { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, CodeBlock, Heading } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { Lobby } from '@grudge/domain';

@connect(({ lobbyStore }) => ({
  lobby: lobbyStore.lobby,
  error: lobbyStore.error,
}))
export default class LobbyScreen extends Component {
  static propTypes = {
    lobby: PropTypes.instanceOf(Lobby),
    error: PropTypes.instanceOf(Error),
  }

  static defaultProps = {
    lobby: null,
    error: null,
  }

  render() {
    const {
      lobby,
      error,
    } = this.props;

    return (
      <Page>
        <Heading>
          Lobby
        </Heading>
        <Alert error={error}/>
        {lobby && (
          <CodeBlock>
            {lobby}
          </CodeBlock>
        )}
      </Page>
    );
  }
}
