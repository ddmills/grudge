import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, LoadingIndicator, CodeBlock, Alert,
} from '@grudge/components';
import connect from 'utilities/mobx/Connect';
import Page from 'components/Page/Page';
import autobind from 'autobind-decorator';
import { User } from '@grudge/domain';

@connect(({ profileStore }) => ({
  getUser: profileStore.getUser,
  user: profileStore.user,
  error: profileStore.error,
}))
export default class ProfileScreen extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    user: PropTypes.instanceOf(User),
    error: PropTypes.instanceOf(Error),
  };

  static defaultProps = {
    error: undefined,
    user: undefined,
  };

  componentWillMount() {
    this.props.getUser(this.props.userId);
  }

  @autobind
  renderTitleText() {
    if (this.props.user) {
      return this.props.user.name;
    }

    if (this.props.error) {
      return 'Error';
    }

    return 'Loading profile';
  }

  render() {
    const {
      user,
      error,
    } = this.props;

    return (
      <Page>
        <h1>
          {user && user.displayName}
        </h1>
        <p>
          {user && user.name}
        </p>
        {user && <Avatar user={user}/>}
        {user && <CodeBlock>{user}</CodeBlock>}
        <LoadingIndicator isVisible={!user && !error}/>
        <Alert error={error}/>
      </Page>
    );
  }
}
