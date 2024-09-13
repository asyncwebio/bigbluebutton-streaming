import { check } from 'meteor/check';

import updateVoiceUser from '../modifiers/updateVoiceUser';

export default async function handleVoiceUpdate({ body }, meetingId) {
  const voiceUser = body;

  check(meetingId, String);

  // If a person is muted we have to force them to not talking
  if (voiceUser.muted) {
    voiceUser.talking = false;
  }

  const result = await updateVoiceUser(meetingId, voiceUser);
  return result;
}
