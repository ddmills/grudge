import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './FacedownCard.scss';
import CardContainer from '../CardContainer/CardContainer';
import cardBackImage from './card-back.png';

export default class FacedownCard extends Component {
  static propTypes = {
    isResponsive: PropTypes.bool,
    responsiveCardSize: PropTypes.string,
  }

  static defaultProps = {
    isResponsive: true,
    responsiveCardSize: 'sm',
  }

  render() {
    const {
      isResponsive,
      responsiveCardSize,
    } = this.props;

    const size = isResponsive ? responsiveCardSize : undefined;

    return (
      <CardContainer size={size}>
        <img
          className={styles.cardBack}
          src={cardBackImage}
          alt="card back"
        />
      </CardContainer>
    );
  }
}
