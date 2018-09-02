import { Component } from 'react';
import { Container } from '@grudge/components';
import PropTypes from 'prop-types';
import LobbyHeader from 'components/LobbyHeader/LobbyHeader';
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
    showLobbyHeader: PropTypes.bool,
  }

  static defaultProps = {
    size: 'md',
    showLobbyHeader: true,
  }

  render() {
    const {
      size,
      children,
      showLobbyHeader,
    } = this.props;

    return (
      <section className={styles.page}>
        <PageSuperHeader size={size}/>
        <PageHeader size={size}/>
        <LobbyHeader size={size} isVisible={showLobbyHeader}/>
        <Container size={size} className={styles.pageContent}>
          {children}
        </Container>
        <PageFooter size={size}/>
      </section>
    );
  }
}
