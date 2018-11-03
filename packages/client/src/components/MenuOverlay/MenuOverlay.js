import { Component } from 'react';
import { Button, Container } from '@grudge/components';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import styles from './MenuOverlay.scss';

@connect(({ menuStore }) => ({
  close: menuStore.close,
  isOpen: menuStore.isOpen,
  menuItems: menuStore.menuItems,
}))
export default class MenuOverlay extends Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
    menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  static defaultProps = {
    isOpen: false,
  }

  render() {
    const {
      close,
      isOpen,
      menuItems,
    } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div className={styles.curtain}>
        <Container size="sm">
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Button onClick={close} isBlock>
                Cancel
              </Button>
            </li>
            {menuItems.map((item) => (
              <li className={styles.menuItem} key={item.label}>
                <Button onClick={item.fn} color={item.color} isBlock>
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    );
  }
}
