import { Component } from 'react';
import PropTypes from 'prop-types';
import Container from 'components/Container/Container';
import ConnectionStatus from 'components/ConnectionStatus/ConnectionStatus';
import styles from './PageFooter.scss';

export default class PageFooter extends Component {
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
    } = this.props;

    return (
      <header className={styles.pageFooter}>
        <Container size={size}>
          <h4>
            {'© Dalton Mills'}
            {' '}
            <ConnectionStatus/>
          </h4>
        </Container>
      </header>
    );
  }
}
