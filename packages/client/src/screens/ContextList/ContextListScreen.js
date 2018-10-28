import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, ButtonGroup, Heading, List, ListItem, ButtonLink,
} from '@grudge/components';
import { Context } from '@grudge/domain';
import Page from 'components/Page/Page';
import connect from 'utilities/mobx/Connect';

@connect(({ contextListStore }) => ({
  refreshContexts: contextListStore.refreshContexts,
  createContext: contextListStore.createContext,
  contexts: contextListStore.contexts,
}))
export default class ContextListScreen extends Component {
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
          Lobbies
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
              <ButtonLink to="context" params={{ contextId: context.id }}>
                join
              </ButtonLink>
            </ListItem>
          ))}
        </List>
      </Page>
    );
  }
}
