import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import StreamingModal from './component';


const StreamingModalContainer = props => <StreamingModal {...props} />;

export default withModalMounter(withTracker(({ mountModal }) => ({
  closeModal: () => {
    mountModal(null);
  },
}))(StreamingModalContainer));
