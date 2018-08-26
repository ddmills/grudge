import { Component } from 'react';
import PropTypes from 'prop-types';
import { CompactPage, LoadingIndicator } from '@grudge/components';
import ButtonLink from 'components/ButtonLink/ButtonLink';
import connect from 'utilities/mobx/Connect';
import Redirect from 'components/Redirect/Redirect';
import autobind from 'autobind-decorator';

@connect(({ authStore, routerStore }) => ({
  isAuthenticated: authStore.isAuthenticated,
  buildUrl: routerStore.buildUrl,
}))
export default class SignInScreen extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    target: PropTypes.string,
  };

  static defaultProps = {
    target: '/',
  };

  state = {
    isRedirecting: false,
  }

  @autobind
  navigate() {
    this.setState({
      isRedirecting: true,
    });
  }

  render() {
    const {
      target,
      isAuthenticated,
    } = this.props;

    if (isAuthenticated) {
      return <Redirect to={target}/>;
    }

    if (this.state.isRedirecting) {
      return (
        <LoadingIndicator>
          Redirecting to Steam…
        </LoadingIndicator>
      );
    }

    return (
      <CompactPage>
        <ButtonLink
          isBlock
          color="primary"
          to="auth-steam"
          params={{ target }}
          onClick={this.navigate}
        >
          Sign in with Steam
        </ButtonLink>
      </CompactPage>
    );
  }
}
