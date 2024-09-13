import React, { useContext } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import GuestPolicyComponent from './component';
import Service from '../service';
import Auth from '/imports/ui/services/auth';
import { UsersContext } from '/imports/ui/components/components-data/users-context/context';

const ROLE_MODERATOR = Meteor.settings.public.user.role_moderator;

const GuestPolicyContainer = (props) => {
  const usingUsersContext = useContext(UsersContext);
  const { users } = usingUsersContext;
  const currentUser = users[Auth.meetingID][Auth.userID];
  const amIModerator = currentUser.role === ROLE_MODERATOR;

  return amIModerator && <GuestPolicyComponent {...props} />;
};

export default withTracker(( ) => ({
  guestPolicy: Service.getGuestPolicy(),
  changeGuestPolicy: Service.changeGuestPolicy,
}))(GuestPolicyContainer);
