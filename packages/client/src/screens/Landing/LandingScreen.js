import { Component } from 'react';
import { ButtonGroup, Heading } from '@grudge/components';
import Page from 'components/Page/Page';
import ButtonLink from 'components/ButtonLink/ButtonLink';

export default class LandingScreen extends Component {
  render() {
    return (
      <Page>
        <Heading>
          Grudge Game
        </Heading>
        <ButtonGroup>
          <ButtonLink to="library">
            Card Library
          </ButtonLink>
          <ButtonLink to="lobbies">
            Join a game
          </ButtonLink>
        </ButtonGroup>
      </Page>
    );
  }
}
