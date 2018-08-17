import { Component } from 'react';
import PropTypes from 'prop-types';
import CompactPage from 'components/CompactPage/CompactPage';
import Button from 'components/Button/Button';
import connect from 'utilities/mobx/Connect';
import Redirect from 'components/Redirect/Redirect';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';
import autobind from 'autobind-decorator';

@connect(({ authStore, routerStore }) => ({
  isAuthenticated: authStore.isAuthenticated,
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
        <Button
          isBlock
          color="primary"
          to="auth-steam"
          params={{ target }}
          onClick={this.navigate}
        >
          Sign in with Steam
        </Button>
      </CompactPage>
    );
  }
}
