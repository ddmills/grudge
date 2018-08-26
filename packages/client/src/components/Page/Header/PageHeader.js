import { Component } from 'react';
import PropTypes from 'prop-types';
import { User } from '@grudge/domain';
import { Container, Avatar } from '@grudge/components';
import connect from 'utilities/mobx/Connect';
import Link from 'components/Link/Link';
import ButtonLink from 'components/ButtonLink/ButtonLink';
import styles from './PageHeader.scss';

@connect(({ userStore }) => ({
  currentUser: userStore.currentUser,
}))
export default class PageHeader extends Component {
  static propTypes = {
    currentUser: PropTypes.instanceOf(User),
    size: PropTypes.oneOf([
      'sm',
      'md',
      'lg',
      'xl',
      'max',
    ]),
  }

  static defaultProps = {
    currentUser: undefined,
    size: 'md',
  }

  renderAuthButton() {
    const {
      currentUser,
    } = this.props;

    if (currentUser) {
      return (
        <Link to="profile" params={{ userId: currentUser.id }}>
          <Avatar user={currentUser}/>
        </Link>
      );
    }

    return (
      <ButtonLink to="sign-in" size="sm">
        Sign in
      </ButtonLink>
    );
  }

  render() {
    const {
      size,
    } = this.props;

    return (
      <header className={styles.pageHeaderBanner}>
        <Container size={size} className={styles.pageHeader}>
          <Link className={styles.branding} to="landing">
            Grudge
          </Link>
          <span className={styles.spacer}/>
          {this.renderAuthButton()}
        </Container>
      </header>
    );
  }
}
