import { Component } from 'react';
import { Heading } from '@grudge/components';
import Page from 'components/Page/Page';
import GameSetupActions from './GameSetupActions';
import GameSetupPlayers from './GameSetupPlayers';

export default class GameSetupScreen extends Component {
  render() {
    return (
      <Page>
        <Heading>
          Game Setup
        </Heading>
        <GameSetupActions/>
        <GameSetupPlayers/>
      </Page>
    );
  }
}
