import { Component } from 'react';
import styles from './CompactPage.scss';

export default class CompactPage extends Component {
  render() {
    return (
      <div className={styles.backdrop}>
        <div className={styles.compactPage}>
          <h1 className={styles.branding}>
              Grudge
          </h1>
          <section className={styles.content}>
            {this.props.children}
          </section>
        </div>
      </div>
    );
  }
}
