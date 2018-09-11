import { Component } from 'react';
import PropTypes from 'prop-types';
import { User } from '@grudge/domain';
import { Avatar, Button } from '@grudge/components';
import connect from 'utilities/mobx/Connect';
import classNames from 'classnames';
import autobind from 'autobind-decorator';
import styles from './LobbyAvatar.scss';

@connect(({ userStore }, { user }) => ({
  selectUser: userStore.selectUser,
  isSelected: user.id === userStore.selectedUserId,
}))
export default class LobbyAvatar extends Component {
  static propTypes = {
    user: PropTypes.instanceOf(User).isRequired,
    selectUser: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
  }

  @autobind
  onClick() {
    this.props.selectUser(this.props.user.id);
  }

  render() {
    const {
      user,
      isSelected,
    } = this.props;

    const classes = classNames(
      styles.lobbyAvatar,
      {
        [styles.selected]: isSelected,
      },
    );

    return (
      <Button onClick={this.onClick} isStyled={false}>
        <Avatar user={user} className={classes}/>
      </Button>
    );
  }
}
