import { Component } from 'react';
import Container from 'components/Container/Container';
import styles from './App.scss';

export default class App extends Component {
  render() {
    return (
      <Container size="sm">
        <h1 className={styles.hello}>
          Porpoise
        </h1>
      </Container>
    );
  }
}
