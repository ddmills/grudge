import { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading, CardContainer } from '@grudge/components';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';
import { CardType } from '@grudge/domain';

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
        {cardTypes.map((cardType) => (
          <CardContainer key={cardType.id}>
            {cardType.name}
          </CardContainer>
        ))}
      </Page>
    );
  }
}
