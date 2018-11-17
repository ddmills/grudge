import { Component } from 'react';
import { Container } from '@grudge/components';
import PropTypes from 'prop-types';
import GamePlayerAvatar from 'components/GamePlayerAvatar/GamePlayerAvatar';
import connect from 'utilities/mobx/Connect';
import styles from './PlayerViewer.scss';

@connect(({ playerStore }) => ({
  selectedPlayerId: playerStore.selectedPlayerId,
}))
export default class PlayerViewer extends Component {
  static propTypes = {
    selectedPlayerId: PropTypes.string,
  }

  static defaultProps = {
    selectedPlayerId: undefined,
  }

  render() {
    const {
      selectedPlayerId,
    } = this.props;

    return (
      <Container className={styles.playerViewer} isPadded={false}>
        <GamePlayerAvatar playerId={selectedPlayerId}/>
      </Container>
    );
  }
}
