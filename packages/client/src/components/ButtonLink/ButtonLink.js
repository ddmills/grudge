import { Component } from 'react';
import { Button } from '@grudge/components';
import Link from 'components/Link/Link';

export default class ButtonLink extends Component {
  render() {
    return (
      <Button BtnComponent={Link} {...this.props}/>
    );
  }
}
