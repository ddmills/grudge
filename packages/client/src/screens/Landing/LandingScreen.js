import { Component } from 'react';
import Page from 'components/Page/Page';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';

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
        <h1>
          {this.props.greeting}
        </h1>

        <ButtonGroup>
          <Button to="landing" params={{ greeting: 'Greetings' }}>
            Greeting One
          </Button>
          <Button to="lobbies">
            Join a game
          </Button>
          <Button to="profile" params={{ userId: '1' }}>
            User Profile
          </Button>
          <Button to="/profile/666" color="red">
            No user
          </Button>
        </ButtonGroup>
      </Page>
    );
  }
}
