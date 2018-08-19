import { Component } from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page/Page';
import Button from 'components/Button/Button';

export default class ProfileScreen extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Page>
        <h1>
          Profile (
          {this.props.userId}
          )
        </h1>

        <Button to="landing">
          Landing page
        </Button>
      </Page>
    );
  }
}
