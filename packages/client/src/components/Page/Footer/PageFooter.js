import { Component } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@grudge/components';
import ConnectionStatus from 'components/ConnectionStatus/ConnectionStatus';
import Button from 'components/Button/Button';
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
      <header className={styles.pageFooterBanner}>
        <Container size={size} className={styles.pageFooter}>
          <h4>
            {'© Dalton Mills'}
            {' '}
            <ConnectionStatus/>
          </h4>
          <span className={styles.spacer}/>
          <Button to="sign-out" size="sm">
            Sign out
          </Button>
        </Container>
      </header>
    );
  }
}
