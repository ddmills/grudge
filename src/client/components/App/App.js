import {Component} from 'react';
import styles from './App.scss';
import Container from 'components/Container/Container';

export default class App extends Component {
  render() {
    return (
      <Container>
        <h1 className={styles.hello}>Porpoise</h1>
        <h1>Porpoise</h1>
        <h2>Porpoise</h2>
        <h3>Porpoise</h3>
        <h4>Porpoise</h4>
        <h5>Porpoise</h5>
        <h6>Porpoise</h6>
      </Container>
    );
  }
}
