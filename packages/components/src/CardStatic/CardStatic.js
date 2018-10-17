import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './CardStatic.scss';
import CardContainer from '../CardContainer/CardContainer';
import cardBorderImage from './card-border.png';
import attackImage from './attack.png';
import healthImage from './health.png';
import moneyImage from './money.png';

export default class CardStatic extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    value: PropTypes.number,
    attack: PropTypes.number,
    defense: PropTypes.number,
    health: PropTypes.number,
    maxHealth: PropTypes.number,
    isDisabled: PropTypes.bool,
    isSelected: PropTypes.bool,
    isTargeted: PropTypes.bool,
  };

  static defaultProps = {
    value: undefined,
    attack: undefined,
    defense: undefined,
    health: undefined,
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
      defense,
      health,
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
            <h2 className={styles.cardTitle}>
              {name}
            </h2>
          </div>
          <img
            className={styles.cardBorder}
            src={cardBorderImage}
            alt="border"
          />
          <div className={overlayClasses}>
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
          </div>
        </section>
      </CardContainer>
    );
  }
}
