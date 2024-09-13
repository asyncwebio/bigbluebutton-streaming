import { check } from 'meteor/check';
import UsersPersistentData from '/imports/api/users-persistent-data';
import Logger from '/imports/startup/server/logger';
import Breakouts from '/imports/api/breakouts';

export default async function updateUserBreakoutRoom(meetingId, breakoutId, users) {
  check(meetingId, String);
  check(breakoutId, String);
  check(users, Array);

  const lastBreakoutRoom = await Breakouts.findOneAsync({ breakoutId }, {
    fields: {
      isDefaultName: 1,
      sequence: 1,
      shortName: 1,
    },
  });
  await Promise.all(users.map(async (user) => {
    const userId = user.id.substr(0, user.id.lastIndexOf('-'));

    const selector = {
      userId,
      meetingId,
    };

    const modifier = {
      $set: {
        lastBreakoutRoom,
      },
    };

    try {
      await UsersPersistentData.updateAsync(selector, modifier);
    } catch (err) {
      Logger.error(`Updating users persistent data's lastBreakoutRoom to the collection: ${err}`);
    }
  }));
}
