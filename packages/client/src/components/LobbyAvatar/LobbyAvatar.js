import { Component } from 'react';
import PropTypes from 'prop-types';
import { User } from '@grudge/domain';
import { Avatar, Button } from '@grudge/components';
import connect from 'utilities/mobx/Connect';
import autobind from 'autobind-decorator';
import styles from './LobbyAvatar.scss';

@connect(({ userStore }) => ({
  selectUser: userStore.selectUser,
}))
export default class LobbyUsers extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(User).isRequired,
    selectUser: PropTypes.func.isRequired,
  }

  @autobind
  onClick() {
    this.props.selectUser(this.props.user.id);
  }

  render() {
    const {
      user,
    } = this.props;

    return (
      <Button onClick={this.onClick} isStyled={false}>
        <Avatar user={user} className={styles.lobbyAvatar}/>
      </Button>
    );
  }
}
