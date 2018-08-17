import { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container';
import Link from 'components/Link/Link';
import Button from 'components/Button/Button';
import styles from './PageHeader.scss';

export default class PageHeader extends Component {
  static propTypes = {
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
          <Button
            className={styles.signInButton}
            to="sign-in"
            size="sm"
          >
            Sign in
          </Button>
        </Container>
      </header>
    );
  }
}
