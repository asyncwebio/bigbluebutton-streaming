import { Meteor } from 'meteor/meteor';
import validateAuthToken from './methods/validateAuthToken';
import setSpeechLocale from './methods/setSpeechLocale';
import setSpeechOptions from './methods/setSpeechOptions';
import setMobileUser from './methods/setMobileUser';
import setEmojiStatus from './methods/setEmojiStatus';
import changeAway from './methods/changeAway';
import changeRaiseHand from './methods/changeRaiseHand';
import assignPresenter from './methods/assignPresenter';
import changeRole from './methods/changeRole';
import removeUser from './methods/removeUser';
import toggleUserLock from './methods/toggleUserLock';
import toggleUserChatLock from './methods/toggleUserChatLock';
import setUserEffectiveConnectionType from './methods/setUserEffectiveConnectionType';
import userActivitySign from './methods/userActivitySign';
import userLeftMeeting from './methods/userLeftMeeting';
import changePin from './methods/changePin';
import setRandomUser from './methods/setRandomUser';
import setExitReason from './methods/setExitReason';
import clearAllUsersEmoji from './methods/clearAllUsersEmoji';

Meteor.methods({
  setSpeechLocale,
  setSpeechOptions,
  setMobileUser,
  setEmojiStatus,
  clearAllUsersEmoji,
  changeAway,
  changeRaiseHand,
  assignPresenter,
  changeRole,
  removeUser,
  validateAuthToken,
  toggleUserLock,
  toggleUserChatLock,
  setUserEffectiveConnectionType,
  userActivitySign,
  userLeftMeeting,
  changePin,
  setRandomUser,
  setExitReason,
});
