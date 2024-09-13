import { check } from 'meteor/check';
import Logger from '/imports/startup/server/logger';
import Users from '/imports/api/users';

export default async function updateUserConnectionId(meetingId, userId, connectionId) {
  check(meetingId, String);
  check(userId, String);
  check(connectionId, String);

  const selector = { meetingId, userId };

  const modifier = {
    $set: {
      currentConnectionId: connectionId,
      connectionIdUpdateTime: new Date().getTime(),
    },
  };

  const User = await Users.findOneAsync(selector);

  if (User) {
    try {
      const updated = await Users.updateAsync(selector, modifier);

      if (updated) {
        Logger.info(`Updated connection user=${userId} connectionid=${connectionId} meeting=${meetingId}`);
      }
    } catch (err) {
      Logger.error(`Updating user connection: ${err}`);
    }
  }
}
