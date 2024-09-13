import React from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import Users from '/imports/api/users';
import Auth from '/imports/ui/services/auth';
import PollingService from './service';
import PollService from '/imports/ui/components/poll/service';
import PollingComponent from './component';
import { isPollingEnabled } from '/imports/ui/services/features';

const propTypes = {
  pollExists: PropTypes.bool.isRequired,
  presentationIsFullscreen: PropTypes.bool.isRequired,
};

const PollingContainer = ({ pollExists, presentationIsFullscreen, ...props }) => {
  const currentUser = Users.findOne({ userId: Auth.userID }, { fields: { presenter: 1 } });
  const showPolling = pollExists && !currentUser.presenter && isPollingEnabled();

  if (showPolling) {
    if (presentationIsFullscreen) {
      return createPortal(
        <PollingComponent {...props} />,
        document.getElementById('presentation-polling-placeholder'),
      );
    }
    return (
      <PollingComponent {...props} />
    );
  }
  return null;
};

PollingContainer.propTypes = propTypes;

export default withTracker(() => {
  const {
    pollExists, handleVote, poll, handleTypedVote,
  } = PollingService.mapPolls();
  const { pollTypes } = PollService;
  const presentationIsFullscreen = Session.get('presentationIsFullscreen');

  if (poll && poll?.pollType) {
    const isResponse = poll.pollType === pollTypes.Response;
    Meteor.subscribe('polls', isResponse);
  }

  return ({
    pollExists,
    handleVote,
    handleTypedVote,
    poll,
    pollAnswerIds: PollService.pollAnswerIds,
    pollTypes,
    isDefaultPoll: PollService.isDefaultPoll,
    isMeteorConnected: Meteor.status().connected,
    presentationIsFullscreen,
  });
})(PollingContainer);
