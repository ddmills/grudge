import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CardContainer } from '@grudge/components';
import Card from 'components/Card/Card';
import connect from 'utilities/mobx/Connect';
import styles from './CardSlot.scss';

@connect(({ cardStore }, { userId, slotIndex }) => {
  const card = cardStore.getCardAtSlot(userId, slotIndex);

  return {
    cardId: card && card.id,
  };
})
export default class CardSlot extends Component {
  static propTypes = {
    className: PropTypes.string,
    cardId: PropTypes.string,
  };

  static defaultProps = {
    className: undefined,
    cardId: undefined,
  }

  render() {
    const {
      cardId,
      className,
    } = this.props;

    const classes = classNames(
      styles.slot,
      className,
    );

    return (
      <div className={classes}>
        {cardId ? (
          <Card cardId={cardId}/>
        ) : (
          <CardContainer/>
        )}
      </div>
    );
  }
}
