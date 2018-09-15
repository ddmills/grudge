import { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading, CardStatic, CardContainer } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { CardType } from '@grudge/domain';
import styles from './LibraryScreen.scss';

@connect(({ cardTypeStore }) => ({
  cardTypes: cardTypeStore.cardTypes,
}))
export default class LobbyScreen extends Component {
  static propTypes = {
    cardTypes: PropTypes.arrayOf(PropTypes.instanceOf(CardType)),
  }

  static defaultProps = {
    cardTypes: [],
  }

  render() {
    const { cardTypes } = this.props;

    return (
      <Page>
        <Heading>
          Card Library
        </Heading>
        <div className={styles.cardList}>
          <CardContainer isInspectable>
            Hello bob
          </CardContainer>
          {cardTypes.map((cardType) => (
            <CardStatic isInspectable cardType={cardType} key={cardType.id}>
              {cardType.name}
            </CardStatic>
          ))}
        </div>
      </Page>
    );
  }
}
