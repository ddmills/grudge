import { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@grudge/components';
import connect from 'utilities/mobx/Connect';
import ConnectionStatus from 'components/ConnectionStatus/ConnectionStatus';
import ButtonLink from 'components/ButtonLink/ButtonLink';
import Link from 'components/Link/Link';
import styles from './PageFooter.scss';

@connect(({ authStore }) => ({
  isAuthenticated: authStore.isAuthenticated,
}))
export default class PageFooter extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    size: PropTypes.oneOf([
      'sm',
      'md',
      'lg',
      'xl',
      'max',
    ]),
  }

  static defaultProps = {
    isAuthenticated: false,
    size: 'md',
  }

  render() {
    const {
      size,
      isAuthenticated,
    } = this.props;

    return (
      <header className={styles.pageFooterBanner}>
        <Container size={size} className={styles.pageFooter}>
          <h4>
            <ConnectionStatus/>
            {' '}
            <Link to="https://github.com/ddmills">
              Dalton Mills
            </Link>
          </h4>
          <span className={styles.spacer}/>
          {isAuthenticated && (
            <ButtonLink to="sign-out" size="sm">
              Sign out
            </ButtonLink>
          )}
        </Container>
      </header>
    );
  }
}
