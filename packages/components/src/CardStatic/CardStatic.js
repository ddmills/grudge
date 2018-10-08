import { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './CardStatic.scss';
import CardContainer from '../CardContainer/CardContainer';

export default class CardStatic extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    value: PropTypes.number,
    attack: PropTypes.number,
    defense: PropTypes.number,
    cost: PropTypes.number,
    points: PropTypes.number,
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
    cost: undefined,
    points: undefined,
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
      cost,
      points,
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
          <img
            className={styles.image}
            src={`https://loremflickr.com/300/420/${name}?random=${id}&lock=${name.length}`}
            alt={description}
          />
          <div className={styles.content}>
            <h2 className={styles.cardTitle}>
              {name}
            </h2>
            <div className={styles.attributes}>
              {value && (
                <span className={styles.value}>
                  {value}
                </span>
              )}
            </div>
          </div>
          <div className={overlayClasses}>
            {attack && (
              <span className={styles.attack}>
                {attack}
              </span>
            )}
            {health && (
              <span className={styles.health}>
                {health}
              </span>
            )}
            {cost && (
              <span className={styles.cost}>
                {cost}
              </span>
            )}
            {points && (
              <span className={styles.points}>
                {points}
              </span>
            )}
          </div>
        </section>
      </CardContainer>
    );
  }
}
