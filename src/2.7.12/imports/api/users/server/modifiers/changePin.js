import Logger from '/imports/startup/server/logger';
import Users from '/imports/api/users';

export default async function changePin(meetingId, userId, pin, changedBy) {
  const selector = {
    meetingId,
    userId,
  };

  const modifier = {
    $set: {
      pin,
    },
  };

  try {
    const numberAffected = await Users.updateAsync(selector, modifier);

    if (numberAffected) {
      Logger.info(`Change pin=${pin} id=${userId} meeting=${meetingId} changedBy=${changedBy}`);
    }
  } catch (err) {
    Logger.error(`Change pin error: ${err}`);
  }
}
