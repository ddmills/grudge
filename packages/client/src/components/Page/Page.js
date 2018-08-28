import { Component } from 'react';
import { Container } from '@grudge/components';
import PropTypes from 'prop-types';
import PageSuperHeader from './SuperHeader/PageSuperHeader';
import PageHeader from './Header/PageHeader';
import PageFooter from './Footer/PageFooter';
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
        <PageSuperHeader size={size}/>
        <PageHeader size={size}/>
        <Container size={size} className={styles.pageContent}>
          {children}
        </Container>
        <PageFooter size={size}/>
      </section>
    );
  }
}
