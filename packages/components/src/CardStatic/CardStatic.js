import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './CardStatic.scss';
import CardContainer from '../CardContainer/CardContainer';
import cardBorderImage from './card-border.png';
import attackImage from './attack.png';
import healthImage from './health.png';
import moneyImage from './money.png';
import bannerImage from './banner.png';
import costImage from './coin.png';

export default class CardStatic extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    value: PropTypes.number,
    attack: PropTypes.number,
    health: PropTypes.number,
    cost: PropTypes.number,
    maxHealth: PropTypes.number,
    isDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    isTargeted: PropTypes.bool,
  };

  static defaultProps = {
    value: undefined,
    attack: undefined,
    health: undefined,
    cost: undefined,
    maxHealth: undefined,
    isDisabled: false,
    isSelected: false,
    isTargeted: false,
  };

  render() {
    const {
      id,
      name,
      description,
      value,
      attack,
      health,
      cost,
      maxHealth,
      isDisabled,
      isSelected,
      isTargeted,
      ...passProps
    } = this.props;

    const overlayClasses = classnames(styles.overlay, {
      [styles.isDisabled]: isDisabled,
      [styles.isSelected]: isSelected,
      [styles.isTargeted]: isTargeted,
    });

    return (
      <CardContainer {...passProps}>
        <section className={styles.cardStatic}>
          <div className={styles.content}>
            <img
              className={styles.image}
              src={`https://loremflickr.com/300/420/${name}?random=${id}&lock=${name.length}`}
              alt={description}
            />
          </div>
          <img
            className={styles.cardBorder}
            src={cardBorderImage}
            alt="border"
          />
          <div className={overlayClasses}>
            <img
              className={styles.bannerImage}
              src={bannerImage}
              alt="banner"
            />
            <h2 className={styles.cardTitle}>
              {name}
            </h2>
            <div className={styles.attributes}>
              {attack && (
                <span className={styles.attack}>
                  <img
                    className={styles.attackImage}
                    src={attackImage}
                    alt="sword"
                  />
                  <span className={styles.attributeValue}>
                    {attack}
                  </span>
                </span>
              )}
              {value && (
                <span className={styles.money}>
                  <img
                    className={styles.moneyImage}
                    src={moneyImage}
                    alt="money"
                  />
                  <span className={styles.attributeValue}>
                    {value}
                  </span>
                </span>
              )}
              {health && (
                <span className={styles.health}>
                  <img
                    className={styles.healthImage}
                    src={healthImage}
                    alt="health"
                  />
                  <span className={styles.attributeValue}>
                    {health}
                  </span>
                </span>
              )}
            </div>
            {cost && (
              <div className={styles.cost}>
                <span className={styles.costValue}>
                  {cost}
                </span>
                <img
                  className={styles.costImage}
                  src={costImage}
                  alt="cost"
                />
              </div>
            )}
          </div>
        </section>
      </CardContainer>
    );
  }
}
