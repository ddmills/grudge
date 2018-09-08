import { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@grudge/components';
import ConnectionStatus from 'components/ConnectionStatus/ConnectionStatus';
import Link from 'components/Link/Link';
import styles from './PageSuperHeader.scss';

export default class PageSuperHeader extends Component {
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
      <header className={styles.pageSuperHeaderBanner}>
        <Container size={size} className={styles.pageSuperHeader}>
          <Link to="landing">
            <ConnectionStatus/>
          </Link>
        </Container>
      </header>
    );
  }
}
