import { Component } from 'react';
import PropTypes from 'prop-types';
import Page from 'components/Page/Page';
import Link from 'components/Link/Link';
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

        <Link to="landing">
          <Button>
            Test
          </Button>
        </Link>
      </Page>
    );
  }
}
