import { Meteor } from 'meteor/meteor';

const collectionOptions = Meteor.isClient ? {
  connection: null,
} : {};

const GroupChat = new Mongo.Collection('group-chat', collectionOptions);

if (Meteor.isServer) {
  GroupChat.createIndexAsync({
    meetingId: 1, chatId: 1, access: 1, users: 1,
  });
}

export default GroupChat;

const CHAT_ACCESS = {
  PUBLIC: 'PUBLIC_ACCESS',
  PRIVATE: 'PRIVATE_ACCESS',
};

export const CHAT_ACCESS_PUBLIC = CHAT_ACCESS.PUBLIC;
export const CHAT_ACCESS_PRIVATE = CHAT_ACCESS.PRIVATE;
