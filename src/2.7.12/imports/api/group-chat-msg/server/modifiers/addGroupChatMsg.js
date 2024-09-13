import { Match, check } from 'meteor/check';
import Logger from '/imports/startup/server/logger';
import { GroupChatMsg } from '/imports/api/group-chat-msg';
import { BREAK_LINE } from '/imports/utils/lineEndings';
import changeHasMessages from '/imports/api/users-persistent-data/server/modifiers/changeHasMessages';
import GroupChat from '/imports/api/group-chat';

export function parseMessage(message) {
  let parsedMessage = message || '';

  // Replace \r and \n to <br/>
  parsedMessage = parsedMessage.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${BREAK_LINE}$2`);

  // Replace flash links to html valid ones
  parsedMessage = parsedMessage.split('<a href=\'event:').join('<a target="_blank" href=\'');
  parsedMessage = parsedMessage.split('<a href="event:').join('<a target="_blank" href="');

  return parsedMessage;
}

export default async function addGroupChatMsg(meetingId, chatId, msg) {
  check(meetingId, String);
  check(chatId, String);
  check(msg, {
    id: Match.Maybe(String),
    timestamp: Number,
    sender: Object,
    chatEmphasizedText: Boolean,
    message: String,
    correlationId: Match.Maybe(String),
  });

  const {
    sender,
    ...restMsg
  } = msg;

  const groupChat = GroupChat.findOne({ meetingId, chatId });

  const msgDocument = {
    ...restMsg,
    sender: sender.id,
    senderName: sender.name,
    senderRole: sender.role,
    meetingId,
    chatId,
    participants: [...groupChat.users],
    message: parseMessage(msg.message),
  };

  try {
    const insertedId = await GroupChatMsg.insertAsync(msgDocument);

    if (insertedId) {
      await changeHasMessages(true, sender.id, meetingId, chatId);
      Logger.info(`Added group-chat-msg msgId=${msg.id} chatId=${chatId} meetingId=${meetingId}`);
    }
  } catch (err) {
    Logger.error(`Error on adding group-chat-msg to collection: ${err}`);
  }
}
