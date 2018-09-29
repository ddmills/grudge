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
            src={`https://loremflickr.com/300/420/${cardType.name}?random=${cardType.id}&lock=${cardType.name.length}`}
            alt={cardType.description}
          />
          <div className={styles.content}>
            <h2 className={styles.cardTitle}>
              {cardType.name}
            </h2>
            <div className={styles.attributes}>
              {cardType.hasTrait('trt-value') && (
                <span className={styles.value}>
                  {cardType.getTrait('trt-value').value}
                </span>
              )}
              {cardType.hasTrait('trt-attack') && (
                <span className={styles.attack}>
                  {cardType.getTrait('trt-attack').value}
                </span>
              )}
              {cardType.hasTrait('trt-defense') && (
                <span className={styles.defense}>
                  {cardType.getTrait('trt-defense').value}
                </span>
              )}
            </div>
            {cardType.hasTrait('trt-cost') && (
              <span className={styles.cost}>
                {cardType.getTrait('trt-cost').value}
              </span>
            )}
            {cardType.hasTrait('trt-points') && (
              <span className={styles.points}>
                {cardType.getTrait('trt-points').value}
              </span>
            )}
          </div>
        </section>
      </CardContainer>
    );
  }
}
