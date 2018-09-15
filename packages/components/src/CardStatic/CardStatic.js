import { Component } from 'react';
import PropTypes from 'prop-types';
import { CardType } from '@grudge/domain';
import styles from './CardStatic.scss';
import CardContainer from '../CardContainer/CardContainer';

export default class CardStatic extends Component {
  static propTypes = {
    cardType: PropTypes.instanceOf(CardType).isRequired,
  };

  render() {
    const {
      cardType,
      ...passProps
    } = this.props;

    return (
      <CardContainer {...passProps}>
        <section className={styles.cardStatic}>
          <img
            className={styles.image}
            src={`https://loremflickr.com/g/100/140/${cardType.id}?random=${cardType.id}&lock=${cardType.name.length}`}
            alt={cardType.description}
          />
          <div className={styles.content}>
            <h2 className={styles.cardTitle}>
              {cardType.name}
            </h2>
            <div className={styles.attributes}>
              {cardType.value > 0 && (
                <span className={styles.value}>{cardType.value}</span>
              )}
              {cardType.attack > 0 && (
                <span className={styles.attack}>{cardType.attack}</span>
              )}
              {cardType.defense > 0 && (
                <span className={styles.defense}>{cardType.defense}</span>
              )}
              {cardType.points > 0 && (
                <span className={styles.points}>{cardType.points}</span>
              )}
            </div>
            <span className={styles.cost}>{cardType.cost}</span>
          </div>
        </section>
      </CardContainer>
    );
  }
}
