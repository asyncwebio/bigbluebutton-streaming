import { check } from 'meteor/check';
import changeRole from '/imports/api/users/server/modifiers/changeRole';

export default async function handleChangeRole(payload, meetingId) {
  check(payload.body, Object);
  check(meetingId, String);

  const { userId, role, changedBy } = payload.body;

  await changeRole(role, userId, meetingId, changedBy);
}
