import { Component } from 'react';
import Page from 'components/Page/Page';
import PropTypes from 'prop-types';
import Link from 'components/Link/Link';
import connect from 'utilities/mobx/Connect';
import Button from 'components/Button/Button';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';

@connect(({ authStore }) => ({
  deauthenticate: authStore.deauthenticate,
}))
export default class LandingScreen extends Component {
  static propTypes = {
    deauthenticate: PropTypes.func.isRequired,
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

        <p>
          <Link to="profile" params={{ userId: '123' }}>
            Profile
          </Link>
        </p>

        <ButtonGroup>
          <Button to="landing" params={{ greeting: 'Greetings' }} color="blue">
            Greeting One
          </Button>
          <Button to="landing" params={{ greeting: 'Yo' }} color="blue">
            Greeting Two
          </Button>
          <Button onClick={this.props.deauthenticate} color="red">
            Sign out
          </Button>
        </ButtonGroup>

        <p>
          <Link to="/profile/666">
            Auth requried page
          </Link>
        </p>
      </Page>
    );
  }
}
