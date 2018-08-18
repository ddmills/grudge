import { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container';
import Link from 'components/Link/Link';
import Button from 'components/Button/Button';
import connect from 'utilities/mobx/Connect';
import styles from './PageHeader.scss';

@connect(({ authStore }) => ({
  isAuthenticated: authStore.isAuthenticated,
}))
export default class PageHeader extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    size: PropTypes.oneOf([
      'sm',
      'md',
      'lg',
      'xl',
      'max',
    ]),
  }

  static defaultProps = {
    size: 'md',
  }

  renderAuthButton() {
    if (this.props.isAuthenticated) {
      return (
        <Button
          to="sign-out"
          size="sm"
        >
          Sign out
        </Button>
      );
    }

    return (
      <Button
        to="sign-in"
        size="sm"
      >
        Sign in
      </Button>
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
            Otter
          </Link>
          <span className={styles.spacer}/>
          {this.renderAuthButton()}
        </Container>
      </header>
    );
  }
}
