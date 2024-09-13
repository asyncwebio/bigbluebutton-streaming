import Logger from '/imports/startup/server/logger';
import UsersPersistentData from '/imports/api/users-persistent-data';

export default async function changeHasConnectionStatus(hasConnectionStatus, userId, meetingId) {
  const selector = {
    meetingId,
    userId,
  };

  const modifier = {
    $set: {
      'shouldPersist.hasConnectionStatus': hasConnectionStatus,
    },
  };

  try {
    const numberAffected = await UsersPersistentData.updateAsync(selector, modifier);

    if (numberAffected) {
      Logger.info(`Changed hasConnectionStatus=${hasConnectionStatus} id=${userId} meeting=${meetingId}`);
    }
  } catch (err) {
    Logger.error(`Change hasConnectionStatus error: ${err}`);
  }
}
