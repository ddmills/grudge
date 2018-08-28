import { Component } from 'react';
import { ButtonGroup, Heading } from '@grudge/components';
import PropTypes from 'prop-types';
import Page from 'components/Page/Page';
import ButtonLink from 'components/ButtonLink/ButtonLink';

export default class LandingScreen extends Component {
  static propTypes = {
    greeting: PropTypes.string,
  };

  static defaultProps = {
    greeting: 'Hello',
  };

  render() {
    return (
      <Page>
        <Heading>
          {this.props.greeting}
        </Heading>

        <ButtonGroup>
          <ButtonLink to="landing" params={{ greeting: 'Greetings' }}>
            Greeting One
          </ButtonLink>
          <ButtonLink to="lobbies">
            Join a game
          </ButtonLink>
          <ButtonLink to="profile" params={{ userId: 'user-1' }}>
            User Profile
          </ButtonLink>
          <ButtonLink to="/profile/666" color="red">
            No user
          </ButtonLink>
        </ButtonGroup>
      </Page>
    );
  }
}
