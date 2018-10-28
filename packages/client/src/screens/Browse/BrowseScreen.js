import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, Heading, List, ListItem,
} from '@grudge/components';
import { Context } from '@grudge/domain';
import ButtonLink from 'components/ButtonLink/ButtonLink';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';

@connect(({ browseStore }) => ({
  refreshContexts: browseStore.refreshContexts,
  createContext: browseStore.createContext,
  contexts: browseStore.contexts.slice(),
}))
export default class BrowseScreen extends Component {
  static propTypes = {
    refreshContexts: PropTypes.func.isRequired,
    createContext: PropTypes.func.isRequired,
    contexts: PropTypes.arrayOf(PropTypes.instanceOf(Context)).isRequired,
  };

  render() {
    const {
      refreshContexts,
      createContext,
      contexts,
    } = this.props;

    return (
      <Page>
        <Heading>
          Browse Games
        </Heading>
        <ButtonGroup>
          <Button onClick={refreshContexts}>
            Refresh
          </Button>
          <Button onClick={createContext} color="green">
            Create
          </Button>
        </ButtonGroup>
        <List>
          {contexts.map((context) => (
            <ListItem key={context.id}>
              {context.id}
              {' '}
              <ButtonLink to="game" params={{ contextId: context.id }}>
                join
              </ButtonLink>
            </ListItem>
          ))}
        </List>
      </Page>
    );
  }
}
