import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CardContainer } from '@grudge/components';
import Card from 'components/Card/Card';
import connect from 'utilities/mobx/Connect';
import styles from './CardSlot.scss';

@connect(({
  cardStore, playerStore, actionStore, windowSizeStore,
}, { playerId, slotIndex }) => {
  const card = cardStore.getCardAtSlot(playerId, slotIndex);
  const isOwn = playerId === playerStore.currentPlayerId;
  const isEmpty = !card;
  const size = windowSizeStore.responsiveCardSize;

  return {
    cardId: card && card.id,
    onClick: isOwn && isEmpty ? () => actionStore.onSlotClicked(slotIndex) : () => {},
    highlightStyle: actionStore.getCardHighlight(playerId, slotIndex),
    size,
  };
})
export default class CardSlot extends Component {
  static propTypes = {
    className: PropTypes.string,
    cardId: PropTypes.string,
    onClick: PropTypes.func,
    highlightStyle: PropTypes.oneOf([
      'open',
      'attack',
      'heal',
      'none',
    ]),
    size: PropTypes.string,
  };

  static defaultProps = {
    className: undefined,
    cardId: undefined,
    onClick: () => {},
    highlightStyle: 'none',
    size: 'md',
  }

  render() {
    const {
      cardId,
      className,
      onClick,
      highlightStyle,
      size,
    } = this.props;

    const classes = classnames(
      styles.slot,
      className,
      styles[highlightStyle],
    );

    return (
      <div className={classes}>
        {cardId ? (
          <Card cardId={cardId} onClick={onClick} size={size}/>
        ) : (
          <CardContainer onClick={onClick} size={size}/>
        )}
      </div>
    );
  }
}
