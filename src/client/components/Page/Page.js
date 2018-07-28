import { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container';
import PageHeader from 'components/PageHeader/PageHeader';

export default class Page extends Component {
  static propTypes = {
    size: PropTypes.oneOf([
      'sm',
      'md',
      'lg',
      'xl',
      'max',
    ]),
  }

  static defaultProps = {
    size: 'md',
  }

  render() {
    const {
      size,
      children,
    } = this.props;

    return (
      <section>
        <PageHeader size={size}/>
        <Container size={size}>
          {children}
        </Container>
      </section>
    );
  }
}
