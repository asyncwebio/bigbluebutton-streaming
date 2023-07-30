import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import StreamingModal from './component';
import { startWatching, getVideoUrl } from '/imports/ui/components/external-video-player/service';

const StreamingModalContainer = props => <StreamingModal {...props} />;

export default withTracker(({ setIsOpen, callbackToClose }) => ({
  closeModal: () => {
    callbackToClose();
    setIsOpen(false);
  },
}))(StreamingModalContainer);
