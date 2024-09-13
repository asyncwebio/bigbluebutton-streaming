import { check } from 'meteor/check';
import Logger from '/imports/startup/server/logger';
import VoiceUsers from '/imports/api/voice-users';
import flat from 'flat';

export default async function addVoiceUser(meetingId, voiceUser) {
  check(meetingId, String);
  check(voiceUser, {
    voiceUserId: String,
    intId: String,
    callerName: String,
    callerNum: String,
    color: String,
    muted: Boolean,
    talking: Boolean,
    callingWith: String,
    listenOnly: Boolean,
    voiceConf: String,
    joined: Boolean, // This is a HTML5 only param.
  });

  const { intId, talking } = voiceUser;

  const selector = {
    meetingId,
    intId,
  };

  const modifier = {
    $set: {
      meetingId,
      spoke: talking,
      ...flat(voiceUser),
    },
  };

  try {
    const { numberAffected } = await VoiceUsers.upsertAsync(selector, modifier);

    if (numberAffected) {
      Logger.info(`Add voice user=${intId} meeting=${meetingId}`);
    }
  } catch (err) {
    Logger.error(`Add voice user=${intId}: ${err}`);
  }
}
