import { Component } from 'react';
import Page from 'components/Page/Page';
import PropTypes from 'prop-types';
import Link from 'components/Link/Link';
import connect from 'utilities/mobx/Connect';
import Button from 'components/Button/Button';

@connect(({ authStore }) => ({
  deauthenticate: authStore.deauthenticate,
  token: authStore.token,
}))
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

        <p>
          <Link to="profile" params={{ userId: '123' }}>
            Profile
          </Link>
        </p>

        <Button onClick={this.props.deauthenticate}>
          Sign out
        </Button>
        <p>
          {this.props.token}
        </p>

        <p>
          <Link to="landing" params={{ greeting: 'Yo' }}>
            Greeting Two
          </Link>
        </p>
      </Page>
    );
  }
}
