import { Component } from 'react';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';

export default class App extends Component {
  render() {
    return (
      <Page>
        <p>
          Hello world
        </p>
        <Button isBlock>
          Default button
        </Button>
        <Button isBlock isDisabled>
          Default button
        </Button>
        <Button color="primary">
          Primary button
        </Button>
        <Button color="primary" isDisabled>
          Primary button disabled
        </Button>
        <Button color="red">
          Red button
        </Button>
        <Button color="red" isDisabled>
          Red button disabled
        </Button>
        <Button color="green">
          Green button
        </Button>
        <Button color="green" isDisabled>
          Green button disabled
        </Button>
        <Button color="blue">
          Blue button
        </Button>
        <Button color="blue" isDisabled>
          Blue button disabled
        </Button>
        <Button color="purple">
          Purple button
        </Button>
        <Button color="purple" isDisabled>
          Purple button disabled
        </Button>
      </Page>
    );
  }
}
