import { Component } from 'react';
import { Container, CardContainer, Heading, CodeBlock } from '@grudge/components';
import { User, Card } from '@grudge/domain';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import styles from './LobbyUserViewer.scss';

@connect(({ userStore, cardStore }) => ({
  user: userStore.selectedUser,
  playedCards: cardStore.selectedUserPlayedCards,
}))
export default class LobbyUserViewer extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(User),
    playedCards: PropTypes.arrayOf(PropTypes.instanceOf(Card)),
  };

  static defaultProps = {
    user: undefined,
    playedCards: [],
  };

  render() {
    const {
      user,
      playedCards,
    } = this.props;

    return (
      <Container className={styles.lobbyUserViewer}>
        {user && (
          <Heading size={4}>
            {user.displayName}
          </Heading>
        )}
        <ul>
          {playedCards.map((card) => (
            <li key={card.id}>
              {card.cardTypeId}
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}
