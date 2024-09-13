import { Meteor } from 'meteor/meteor';

const collectionOptions = Meteor.isClient ? {
  connection: null,
} : {};

const Pads = new Mongo.Collection('pads', collectionOptions);
const PadsSessions = new Mongo.Collection('pads-sessions', collectionOptions);
const PadsUpdates = new Mongo.Collection('pads-updates', collectionOptions);

if (Meteor.isServer) {
  Pads.createIndexAsync({ meetingId: 1, externalId: 1 });
  PadsSessions.createIndexAsync({ meetingId: 1, userId: 1 });
  PadsUpdates.createIndexAsync({ meetingId: 1, externalId: 1 });
}

export {
  PadsSessions,
  PadsUpdates,
};

export default Pads;
