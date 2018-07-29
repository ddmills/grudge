import { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container';
import PageHeader from './Header/PageHeader';
import styles from './Page.scss';

export default class Page extends Component {
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
      children,
    } = this.props;

    return (
      <section className={styles.page}>
        <PageHeader size={size}/>
        <Container size={size} className={styles.pageContent}>
          {children}
        </Container>
      </section>
    );
  }
}
