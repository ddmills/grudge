import { Component } from 'react';
import { Context } from '@grudge/domain';
import { CodeBlock, Container } from '@grudge/components';
import PageSuperHeader from 'components/Page/SuperHeader/PageSuperHeader';
import LobbyTimeline from 'components/LobbyTimeline/LobbyTimeline';
import PropTypes from 'prop-types';
import connect from 'utilities/mobx/Connect';
import styles from './GamePlayScreen.scss';

@connect(({ contextStore }) => ({
  ctx: contextStore.ctx,
}))
export default class GamePlayScreen extends Component {
  static propTypes = {
    ctx: PropTypes.instanceOf(Context).isRequired,
  }

  render() {
    const {
      ctx,
    } = this.props;

    return (
      <section className={styles.fullPage}>
        <PageSuperHeader/>
        <div className={styles.content}>
          <LobbyTimeline/>
          <Container className={styles.viewer} isPadded={false}>
            <CodeBlock>
              {ctx}
            </CodeBlock>
          </Container>
        </div>
      </section>
    );
  }
}
