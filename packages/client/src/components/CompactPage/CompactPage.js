import { Component } from 'react';
import Link from 'components/Link/Link';
import styles from './CompactPage.scss';

export default class CompactPage extends Component {
  render() {
    return (
      <div className={styles.backdrop}>
        <div className={styles.compactPage}>
          <Link to="landing" className={styles.branding}>
            Grudge
          </Link>
          <section className={styles.content}>
            {this.props.children}
          </section>
        </div>
      </div>
    );
  }
}
