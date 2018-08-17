import { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container';
import Link from 'components/Link/Link';
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
      <header className={styles.pageHeader}>
        <Container size={size}>
          <Link className={styles.branding} to="landing">
            Otter
          </Link>
        </Container>
      </header>
    );
  }
}
