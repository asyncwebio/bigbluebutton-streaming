import { Meteor } from 'meteor/meteor';

const LocalSettings = new Mongo.Collection('local-settings');

if (Meteor.isServer) {
  LocalSettings.createIndexAsync({
    meetingId: 1, userId: 1,
  });
}

export default LocalSettings;
