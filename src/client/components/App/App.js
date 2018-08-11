import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

@connect(({ counterStore }) => ({
  count: counterStore.count,
  isLoading: counterStore.isLoading,
  increment: counterStore.increment,
  reset: counterStore.reset,
}))
export default class App extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    increment: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Page size="sm">
        <h1>
          App
        </h1>

        <h2>
          {this.props.count}
        </h2>

        <Button color="primary" onClick={this.props.increment}>
          Increment
        </Button>

        <Button color="red" onClick={this.props.reset}>
          Reset
        </Button>

        <div style={{ position: 'relative', height: '120px' }}>
          { this.props.isLoading ? <LoadingIndicator/> : null }
        </div>
      </Page>
    );
  }
}
