import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CardContainer } from '@grudge/components';
import Card from 'components/Card/Card';
import connect from 'utilities/mobx/Connect';
import styles from './CardSlot.scss';

@connect(({ cardStore, userStore, actionStore }, { userId, slotIndex }) => {
  const card = cardStore.getCardAtSlot(userId, slotIndex);
  const isOwn = userId === userStore.currentUserId;
  const isEmpty = !card;

  return {
    cardId: card && card.id,
    onClick: isOwn && isEmpty ? () => actionStore.onSlotClicked(slotIndex) : () => {},
    highlightStyle: actionStore.getHighlight(userId, slotIndex),
  };
})
export default class CardSlot extends Component {
  static propTypes = {
    className: PropTypes.string,
    cardId: PropTypes.string,
    onClick: PropTypes.func,
    highlightStyle: PropTypes.oneOf([
      'open',
      'enemy',
      'none',
    ]),
  };

  static defaultProps = {
    className: undefined,
    cardId: undefined,
    onClick: () => {},
    highlightStyle: 'none',
  }

  render() {
    const {
      cardId,
      className,
      onClick,
      highlightStyle,
    } = this.props;

    const classes = classNames(
      styles.slot,
      className,
      styles[highlightStyle],
    );

    return (
      <div className={classes}>
        {cardId ? (
          <Card cardId={cardId} onClick={onClick}/>
        ) : (
          <CardContainer onClick={onClick}/>
        )}
      </div>
    );
  }
}
