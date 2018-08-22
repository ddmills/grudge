import { Component } from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import connect from 'utilities/mobx/Connect';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

@connect(({ profileStore }) => ({
  getUser: profileStore.getUser,
  user: profileStore.user,
}))
export default class ProfileScreen extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    user: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    user: undefined,
  };

  componentWillMount() {
    this.props.getUser(this.props.userId);
  }

  render() {
    return (
      <Page>
        <h1>
          Profile (
          {this.props.userId}
          )
        </h1>

        { this.props.user ? (
          <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
        ) : (
          <LoadingIndicator/>
        )}

        <Button to="landing">
          Landing page
        </Button>
      </Page>
    );
  }
}
