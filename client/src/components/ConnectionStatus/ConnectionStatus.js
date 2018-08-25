import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import classNames from 'classnames';
import styles from './ConnectionStatus.scss';

@connect(({ connectionStore }) => ({
  isConnected: connectionStore.isConnected,
  isConnecting: connectionStore.isConnecting,
}))
export default class ConnectionStatus extends Component {
  static propTypes = {
    isConnected: PropTypes.bool,
    isConnecting: PropTypes.bool,
  }

  static defaultProps = {
    isConnected: false,
    isConnecting: false,
  }

  render() {
    const {
      isConnected,
      isConnecting,
    } = this.props;

    const classes = classNames(styles.status, {
      [styles.connecting]: isConnecting,
      [styles.connected]: isConnected,
      [styles.disconnected]: !isConnected && !isConnecting,
    });

    return (
      <span className={classes}/>
    );
  }
}
