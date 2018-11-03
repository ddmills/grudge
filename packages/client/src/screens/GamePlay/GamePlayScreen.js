import { Component } from 'react';
import { Context } from '@grudge/domain';
import { Button, CodeBlock, Container } from '@grudge/components';
import PageSuperHeader from 'components/Page/SuperHeader/PageSuperHeader';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import styles from './GamePlayScreen.scss';

@connect(({ contextStore }) => ({
  ctx: contextStore.ctx,
  leaveContext: contextStore.leaveContext,
}))
export default class GamePlayScreen extends Component {
  static propTypes = {
    ctx: PropTypes.instanceOf(Context).isRequired,
    leaveContext: PropTypes.func.isRequired,
  }

  render() {
    const {
      ctx,
      leaveContext,
    } = this.props;

    return (
      <section className={styles.fullPage}>
        <PageSuperHeader/>
        <div className={styles.content}>
          <Container className={styles.viewer} isPadded={false}>
            {leaveContext && (
              <Button onClick={leaveContext}>
                leave
              </Button>
            )}
            <CodeBlock>
              {ctx}
            </CodeBlock>
          </Container>
        </div>
      </section>
    );
  }
}
