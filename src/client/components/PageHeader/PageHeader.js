import { Component } from 'react';
import Container from 'components/Container/Container';
import styles from './PageHeader.scss';

export default class PageHeader extends Component {
  render() {
    return (
      <header className={styles.banner}>
        <Container>
          <h1 className={styles.branding}>
            Otter
          </h1>
        </Container>
      </header>
    );
  }
}
