import { Component } from 'react';
import styles from './CodeBlock.scss';

export default class CodeBlock extends Component {
  render() {
    return (
      <pre className={styles.codeBlock}>
        <code>
          {JSON.stringify(this.props.children, null, 2)}
        </code>
      </pre>
    );
  }
}
