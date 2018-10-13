import { Component } from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card/Card';
import { Heading } from '@grudge/components';
import { Card as CardModel, CardType } from '@grudge/domain';
import connect from 'utilities/mobx/Connect';
import styles from './CardInspector.scss';

@connect(({ cardStore, cardTypeStore }) => {
  const card = cardStore.inspectedCard;
  const cardType = card && cardTypeStore.findCardType(card.cardTypeId);

  return {
    card,
    cardType,
    onClick: cardStore.clearInspectedCard,
  };
})
export default class CardInspector extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(CardModel),
    cardType: PropTypes.instanceOf(CardType),
    onClick: PropTypes.func,
  }

  static defaultProps = {
    card: null,
    cardType: null,
    onClick: () => {},
  }

  render() {
    const {
      card,
      cardType,
      onClick,
    } = this.props;

    if (!card) {
      return null;
    }

    return (
      <button className={styles.inspector} onClick={onClick}>
        <div className={styles.inspectorContent}>
          <Heading className={styles.inspectedName}>
            {cardType.name}
          </Heading>
          <div className={styles.inspectedCard}>
            <Card cardId={card.id} size="xl"/>
          </div>
          <div className={styles.inspectedDescription}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac elementum elit.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
              Donec porttitor bibendum maximus. Praesent a dolor ac augue ornare pretium. Pellentesque
              habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec
              porta nibh sed est varius dapibus. In fringilla diam elit, eu maximus nisl scelerisque vel.
              Proin porttitor nulla ut dapibus blandit. Morbi placerat augue nec justo interdum, quis
              dictum felis aliquam.
            </p>
          </div>
        </div>
      </button>
    );
  }
}
