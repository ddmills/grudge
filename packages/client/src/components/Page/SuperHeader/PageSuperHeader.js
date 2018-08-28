import { Component } from 'react';
import PropTypes from 'prop-types';
import { User } from '@grudge/domain';
import { Container } from '@grudge/components';
import connect from 'utilities/mobx/Connect';
import styles from './PageSuperHeader.scss';
import ConnectionStatus from 'components/ConnectionStatus/ConnectionStatus';

@connect(({ userStore }) => ({
  currentUser: userStore.currentUser,
}))
export default class PageSuperHeader extends Component {
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

  render() {
    const {
      size,
    } = this.props;

    return (
      <header className={styles.pageSuperHeaderBanner}>
        <Container size={size} className={styles.pageSuperHeader}>
          <ConnectionStatus/>
        </Container>
      </header>
    );
  }
}
