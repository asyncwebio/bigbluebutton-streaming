import { check } from 'meteor/check';
import Logger from '/imports/startup/server/logger';
import Users from '/imports/api/users';
import { UsersTyping } from '/imports/api/group-chat-msg';
import stopTyping from './stopTyping';

const TYPING_TIMEOUT = 5000;

export default async function startTyping(meetingId, userId, chatId) {
  check(meetingId, String);
  check(userId, String);

  const selector = {
    meetingId,
    userId,
  };

  const user = await Users.findOneAsync(selector, { fields: { name: 1, role: 1 } });

  const modifier = {
    meetingId,
    userId,
    name: user.name,
    isTypingTo: chatId,
    role: user.role,
    time: (new Date()),
  };

  const typingUser = await UsersTyping.findOneAsync(selector, {
    fields: {
      time: 1,
    },
  });

  if (typingUser) {
    if (modifier.time - typingUser.time <= TYPING_TIMEOUT - 100) return;
  }

  try {
    const { numberAffected } = await UsersTyping.upsertAsync(selector, modifier);

    if (numberAffected) {
      Logger.debug('Typing indicator update', { userId, chatId });
      Meteor.setTimeout(() => {
        stopTyping(meetingId, userId);
      }, TYPING_TIMEOUT);
    }
  } catch (err) {
    Logger.error(`Typing indicator update error: ${err}`);
  }
}
