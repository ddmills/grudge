import { Component } from 'react';
import Page from 'components/Page/Page';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

export default class App extends Component {
  render() {
    return (
      <Page size="sm">
        <h1>
          Hello world
        </h1>
        <LoadingIndicator>
          Folding laundry…
        </LoadingIndicator>
      </Page>
    );
  }
}
