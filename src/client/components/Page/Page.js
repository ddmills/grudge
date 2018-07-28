import { Component } from 'react';
import Container from 'components/Container/Container';
import PageHeader from 'components/PageHeader/PageHeader';

export default class Page extends Component {
  render() {
    return (
      <section>
        <PageHeader/>
        <Container>
          {this.props.children}
        </Container>
      </section>
    );
  }
}
