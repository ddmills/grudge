import { Component } from 'react';
import PropTypes from 'prop-types';
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
  };

  static defaultProps = {
    value: undefined,
    attack: undefined,
    defense: undefined,
    cost: undefined,
    points: undefined,
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
      ...passProps
    } = this.props;

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
              {attack && (
                <span className={styles.attack}>
                  {attack}
                </span>
              )}
              {defense && (
                <span className={styles.defense}>
                  {defense}
                </span>
              )}
            </div>
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
