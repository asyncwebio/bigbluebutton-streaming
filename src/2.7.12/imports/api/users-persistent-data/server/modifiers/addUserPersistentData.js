import { check } from 'meteor/check';
import UsersPersistentData from '/imports/api/users-persistent-data';
import Logger from '/imports/startup/server/logger';

export default async function addUserPersistentData(user) {
  check(user, {
    meetingId: String,
    sortName: String,
    color: String,
    speechLocale: String,
    mobile: Boolean,
    breakoutProps: Object,
    inactivityCheck: Boolean,
    responseDelay: Number,
    loggedOut: Boolean,
    intId: String,
    extId: String,
    name: String,
    pin: Boolean,
    role: String,
    guest: Boolean,
    authed: Boolean,
    waitingForAcceptance: Match.Maybe(Boolean),
    guestStatus: String,
    emoji: String,
    reactionEmoji: String,
    raiseHand: Boolean,
    away: Boolean,
    presenter: Boolean,
    locked: Boolean,
    avatar: String,
    webcamBackground: String,
    clientType: String,
    left: Boolean,
    effectiveConnectionType: null,
  });

  const {
    intId,
    extId,
    meetingId,
    name,
    role,
    token,
    avatar,
    webcamBackground,
    guest,
    color,
    pin,
  } = user;

  const userData = {
    userId: intId,
    extId,
    meetingId,
    name,
    role,
    token,
    avatar,
    webcamBackground,
    guest,
    color,
    pin,
    loggedOut: false,
  };

  const selector = {
    userId: intId,
    meetingId,
  };

  const modifier = {
    $set: userData,
  };

  try {
    const { insertedId } = await UsersPersistentData.upsertAsync(selector, modifier);

    if (insertedId) {
      Logger.info(`Added user id=${intId} to user persistent Data: meeting=${meetingId}`);
    } else {
      Logger.info(`Upserted user id=${intId} to user persistent Data: meeting=${meetingId}`);
    }
  } catch (err) {
    Logger.error(`Adding note to the collection: ${err}`);
  }
}
