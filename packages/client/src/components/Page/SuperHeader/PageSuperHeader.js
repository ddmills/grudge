import { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@grudge/components';
import ConnectionStatus from 'components/ConnectionStatus/ConnectionStatus';
import MenuOverlay from 'components/MenuOverlay/MenuOverlay';
import Link from 'components/Link/Link';
import connect from 'utilities/mobx/Connect';
import styles from './PageSuperHeader.scss';

@connect(({ menuStore }) => ({
  openMenu: menuStore.open,
  menuIsVisible: menuStore.isVisible,
}))
export default class PageSuperHeader extends Component {
  static propTypes = {
    size: PropTypes.oneOf([
      'sm',
      'md',
      'lg',
      'xl',
      'max',
    ]),
    openMenu: PropTypes.func.isRequired,
    menuIsVisible: PropTypes.bool,
  }

  static defaultProps = {
    size: 'md',
    menuIsVisible: false,
  }

  render() {
    const {
      size,
      openMenu,
      menuIsVisible,
    } = this.props;

    return (
      <header className={styles.pageSuperHeaderBanner}>
        <MenuOverlay/>
        <Container size={size} className={styles.pageSuperHeader}>
          <Link className={styles.branding} to="landing">
            Grudge
          </Link>
          <span className={styles.spacer}/>
          <ConnectionStatus/>
          {menuIsVisible && (
            <button className={styles.menuButton} onClick={openMenu}>
              ☰
            </button>
          )}
        </Container>
      </header>
    );
  }
}
