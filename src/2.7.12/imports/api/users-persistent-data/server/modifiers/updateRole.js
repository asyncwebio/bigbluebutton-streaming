import { check } from 'meteor/check';
import UsersPersistentData from '/imports/api/users-persistent-data';
import Logger from '/imports/startup/server/logger';

export default async function updateRole(userId, meetingId, role) {
  check(userId, String);
  check(meetingId, String);
  check(role, String);

  const selector = {
    userId,
    meetingId,
  };

  const modifier = {
    $set: {
      role,
    },
  };

  try {
    await UsersPersistentData.updateAsync(selector, modifier);
  } catch (err) {
    Logger.error(`Updating users persistent data's role to the collection: ${err}`);
  }
}
