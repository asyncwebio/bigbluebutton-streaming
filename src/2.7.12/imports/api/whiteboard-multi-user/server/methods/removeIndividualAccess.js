import RedisPubSub from '/imports/startup/server/redis';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { getMultiUser } from '/imports/api/whiteboard-multi-user/server/helpers';
import { extractCredentials } from '/imports/api/common/server/helpers';
import Logger from '/imports/startup/server/logger';

export default async function removeIndividualAccess(whiteboardId, userId) {
  try {
    const REDIS_CONFIG = Meteor.settings.private.redis;
    const CHANNEL = REDIS_CONFIG.channels.toAkkaApps;
    const EVENT_NAME = 'ModifyWhiteboardAccessPubMsg';

    check(whiteboardId, String);
    check(userId, String);

    const { meetingId, requesterUserId } = extractCredentials(this.userId);

    check(meetingId, String);
    check(requesterUserId, String);

    const multiUser = await getMultiUser(meetingId, whiteboardId);

    if (multiUser.includes(userId)) {
      const payload = {
        multiUser: multiUser.filter(id => id !== userId),
        whiteboardId,
      };

      RedisPubSub.publishUserMessage(CHANNEL, EVENT_NAME, meetingId, requesterUserId, payload);
    }
  } catch (err) {
    Logger.error(`Exception while invoking method removeIndividualAccess ${err.stack}`);
  }
}
