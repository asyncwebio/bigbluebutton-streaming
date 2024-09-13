import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Styled from './styles';
import UserParticipantsContainer from './user-participants/container';
import UserMessagesContainer from './user-messages/container';
import UserNotesContainer from './user-notes/container';
import TimerContainer from './timer/container';
import UserCaptionsContainer from './user-captions/container';
import WaitingUsersContainer from './waiting-users/container';
import UserPollsContainer from './user-polls/container';
import BreakoutRoomContainer from './breakout-room/container';
import { isChatEnabled } from '/imports/ui/services/features';

const propTypes = {
  currentUser: PropTypes.shape({}).isRequired,
  isTimerActive: PropTypes.bool.isRequired,
};

const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;
const ALWAYS_SHOW_WAITING_ROOM = Meteor.settings.public.app.alwaysShowWaitingRoomUI;

class UserContent extends PureComponent {
  render() {
    const {
      currentUser,
      isTimerActive,
      pendingUsers,
      isWaitingRoomEnabled,
      isGuestLobbyMessageEnabled,
      compact,
    } = this.props;

    const showWaitingRoom = (ALWAYS_SHOW_WAITING_ROOM && isWaitingRoomEnabled)
      || pendingUsers.length > 0;

    return (
      <Styled.Content data-test="userListContent">
        {isChatEnabled() ? <UserMessagesContainer /> : null}
        <UserCaptionsContainer />
        <UserNotesContainer />
        { isTimerActive && (
          <TimerContainer
            isModerator={currentUser?.role === ROLE_MODERATOR}
          />
        ) }
        {showWaitingRoom && currentUser.role === ROLE_MODERATOR
          ? (
            <WaitingUsersContainer {...{ pendingUsers }} />
          ) : null}
        <UserPollsContainer isPresenter={currentUser.presenter} />
        <BreakoutRoomContainer />
        <UserParticipantsContainer compact={compact}/>
      </Styled.Content>
    );
  }
}

UserContent.propTypes = propTypes;

export default UserContent;
