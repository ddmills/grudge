import { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container';
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
      <header className={styles.banner}>
        <Container size={size}>
          <h1 className={styles.branding}>
            Otter
          </h1>
        </Container>
      </header>
    );
  }
}
