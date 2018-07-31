import { Component } from 'react';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';

function signIn() {
  window.location.href = `/sign-in?target=${encodeURIComponent('/?authenticated')}`;
}

export default class App extends Component {
  render() {
    return (
      <Page size="sm">
        <h1>
          Hello world
        </h1>
        <Button onClick={signIn}>
          Sign in
        </Button>
      </Page>
    );
  }
}
