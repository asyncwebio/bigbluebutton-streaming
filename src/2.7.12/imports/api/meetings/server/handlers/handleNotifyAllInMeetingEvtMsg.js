import { check } from 'meteor/check';
import emitNotification from '/imports/api/meetings/server/modifiers/emitNotification';

export default function handleNotifyAllInMeeting({ body }) {
  check(body, {
    meetingId: String,
    notificationType: String,
    icon: String,
    messageId: String,
    messageDescription: String,
    messageValues: Array,
  });
  return emitNotification(body, 'notifyAllInMeeting');
}
