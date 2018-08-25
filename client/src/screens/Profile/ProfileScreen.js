import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

@connect(({ profileStore }) => ({
  getUser: profileStore.getUser,
  user: profileStore.user,
  error: profileStore.error,
}))
export default class ProfileScreen extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    error: PropTypes.instanceOf(Error),
  };

  static defaultProps = {
    error: undefined,
    user: undefined,
  };

  componentWillMount() {
    this.props.getUser(this.props.userId);
  }

  render() {
    const {
      userId,
      user,
      error,
    } = this.props;

    return (
      <Page>
        <h1>
          Profile (
          {userId}
          )
        </h1>

        { user && (
          <pre>{JSON.stringify(user, null, 2)}</pre>
        )}

        { error && (
          <pre>{error.toString()}</pre>
        )}

        { !user && !error && (
          <LoadingIndicator/>
        )}

        <Button to="landing">
          Landing page
        </Button>
      </Page>
    );
  }
}
