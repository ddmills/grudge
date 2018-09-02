import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, LoadingIndicator, CodeBlock, Alert, Heading,
} from '@grudge/components';
import connect from 'utilities/mobx/Connect';
import Page from 'components/Page/Page';
import autobind from 'autobind-decorator';
import { User } from '@grudge/domain';

@connect(({ profileStore }) => ({
  user: profileStore.user,
  error: profileStore.error,
}))
export default class ProfileScreen extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(User),
    error: PropTypes.instanceOf(Error),
  };

  static defaultProps = {
    error: undefined,
    user: undefined,
  };

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
        <Heading>
          {user && <Avatar user={user}/>}
          {' '}
          {user && user.displayName}
        </Heading>
        <p>
          {user && user.name}
        </p>
        {user && <CodeBlock>{user}</CodeBlock>}
        <LoadingIndicator isVisible={!user && !error}/>
        <Alert error={error}/>
      </Page>
    );
  }
}
