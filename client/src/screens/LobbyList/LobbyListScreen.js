import { Component } from 'react';
import Page from 'components/Page/Page';
import LobbyList from 'components/LobbyList/LobbyList';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import Button from 'components/Button/Button';

export default class LobbyListScreen extends Component {
  render() {
    return (
      <Page>
        <h1>
          Lobbies
        </h1>
        <ButtonGroup>
          <Button>
            Refresh
          </Button>
          <Button color="primary">
            Create
          </Button>
        </ButtonGroup>
        <LobbyList/>
      </Page>
    );
  }
}
