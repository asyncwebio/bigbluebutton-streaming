import React, { useContext } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { injectIntl } from 'react-intl';
import getFromUserSettings from '/imports/ui/services/users-settings';
import Auth from '/imports/ui/services/auth';
import PresentationService from '/imports/ui/components/presentation/service';
import Presentations from '/imports/api/presentations';
import { UsersContext } from '../components-data/users-context/context';
import ActionsBar from './component';
import Service from './service';
import UserListService from '/imports/ui/components/user-list/service';
import ExternalVideoService from '/imports/ui/components/external-video-player/service';
import CaptionsService from '/imports/ui/components/captions/service';
import TimerService from '/imports/ui/components/timer/service';
import { layoutSelectOutput, layoutDispatch } from '../layout/context';
import { isExternalVideoEnabled, isPollingEnabled, isPresentationEnabled } from '/imports/ui/services/features';
import { isScreenBroadcasting, isCameraAsContentBroadcasting } from '/imports/ui/components/screenshare/service';

import MediaService from '../media/service';

const ActionsBarContainer = (props) => {
  const actionsBarStyle = layoutSelectOutput((i) => i.actionBar);
  const layoutContextDispatch = layoutDispatch();

  const usingUsersContext = useContext(UsersContext);
  const { users } = usingUsersContext;

  const currentUser = { userId: Auth.userID, emoji: users[Auth.meetingID][Auth.userID].emoji };

  const amIPresenter = users[Auth.meetingID][Auth.userID].presenter;

  if (actionsBarStyle.display === false) return null;

  return (
    <ActionsBar {
      ...{
        ...props,
        currentUser,
        layoutContextDispatch,
        actionsBarStyle,
        amIPresenter,
      }
    }
    />
  );
};

const SELECT_RANDOM_USER_ENABLED = Meteor.settings.public.selectRandomUser.enabled;
const RAISE_HAND_BUTTON_ENABLED = Meteor.settings.public.app.raiseHandActionButton.enabled;
const RAISE_HAND_BUTTON_CENTERED = Meteor.settings.public.app.raiseHandActionButton.centered;

const isReactionsButtonEnabled = () => {
  const USER_REACTIONS_ENABLED = Meteor.settings.public.userReaction.enabled;
  const REACTIONS_BUTTON_ENABLED = Meteor.settings.public.app.reactionsButton.enabled;

  return USER_REACTIONS_ENABLED && REACTIONS_BUTTON_ENABLED;
};

export default withTracker(() => ({
  amIModerator: Service.amIModerator(),
  stopExternalVideoShare: ExternalVideoService.stopWatching,
  enableVideo: getFromUserSettings('bbb_enable_video', Meteor.settings.public.kurento.enableVideo),
  setPresentationIsOpen: MediaService.setPresentationIsOpen,
  handleTakePresenter: Service.takePresenterRole,
  currentSlidHasContent: PresentationService.currentSlidHasContent(),
  parseCurrentSlideContent: PresentationService.parseCurrentSlideContent,
  isSharingVideo: Service.isSharingVideo(),
  isSharedNotesPinned: Service.isSharedNotesPinned(),
  hasScreenshare: isScreenBroadcasting(),
  hasCameraAsContent: isCameraAsContentBroadcasting(),
  isCaptionsAvailable: CaptionsService.isCaptionsAvailable(),
  isTimerActive: TimerService.isActive(),
  isTimerEnabled: TimerService.isEnabled(),
  isMeteorConnected: Meteor.status().connected,
  isPollingEnabled: isPollingEnabled() && isPresentationEnabled(),
  isSelectRandomUserEnabled: SELECT_RANDOM_USER_ENABLED,
  isRaiseHandButtonEnabled: RAISE_HAND_BUTTON_ENABLED,
  isRaiseHandButtonCentered: RAISE_HAND_BUTTON_CENTERED,
  isReactionsButtonEnabled: isReactionsButtonEnabled(),
  isThereCurrentPresentation: Presentations.findOne({ meetingId: Auth.meetingID, current: true },
    { fields: {} }),
  allowExternalVideo: isExternalVideoEnabled(),
  setEmojiStatus: UserListService.setEmojiStatus,
}))(injectIntl(ActionsBarContainer));
