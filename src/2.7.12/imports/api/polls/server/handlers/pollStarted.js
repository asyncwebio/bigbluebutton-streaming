import { check } from 'meteor/check';
import addPoll from '../modifiers/addPoll';
import setPublishedPoll from '../../../meetings/server/modifiers/setPublishedPoll';

export default async function pollStarted({ body }, meetingId) {
  const {
    userId, poll, pollType, secretPoll, question,
  } = body;

  check(meetingId, String);
  check(userId, String);
  check(poll, Object);
  check(pollType, String);
  check(secretPoll, Boolean);
  check(question, String);

  setPublishedPoll(meetingId, false);

  const result = await addPoll(meetingId, userId, poll, pollType, secretPoll, question);

  return result;
}
