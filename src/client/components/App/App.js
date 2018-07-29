import { Component } from 'react';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';
import ButtonGroup from 'components/ButtonGroup/ButtonGroup';
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator';

export default class App extends Component {
  render() {
    return (
      <Page size="xl">
        <p>
          Hello world
        </p>
        <LoadingIndicator>
          Redirecting to steam&hellip;
        </LoadingIndicator>

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

        <ButtonGroup>
          <Button>
            First
          </Button>
          <Button>
            Second
          </Button>
          <Button>
            Third
          </Button>
          <Button>
            Fourth
          </Button>
        </ButtonGroup>
      </Page>
    );
  }
}
