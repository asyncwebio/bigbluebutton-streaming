import Breakouts from '/imports/api/breakouts';
import Logger from '/imports/startup/server/logger';
import { check } from 'meteor/check';
import flat from 'flat';
import handleBreakoutRoomsListHist from '/imports/api/breakouts-history/server/handlers/breakoutRoomsList';

export default async function handleBreakoutRoomsList({ body }, meetingId) {
  // 0 seconds default breakout time, forces use of real expiration time
  const DEFAULT_TIME_REMAINING = 0;

  const {
    meetingId: parentMeetingId,
    rooms,
    sendInviteToModerators,
  } = body;

  // set firstly the last seq, then client will know when receive all
  await rooms.sort((a, b) => ((a.sequence < b.sequence) ? 1 : -1)).forEach(async (breakout) => {
    const { breakoutId, html5JoinUrls, ...breakoutWithoutUrls } = breakout;

    check(meetingId, String);

    const selector = {
      breakoutId,
    };

    const urls = {};
    if (typeof html5JoinUrls === 'object' && Object.keys(html5JoinUrls).length > 0) {
      Object.keys(html5JoinUrls).forEach((userId) => {
        urls[`url_${userId}`] = {
          redirectToHtml5JoinURL: html5JoinUrls[userId],
          insertedTime: new Date().getTime(),
        };
      });
    }

    const modifier = {
      $set: {
        breakoutId,
        joinedUsers: [],
        timeRemaining: DEFAULT_TIME_REMAINING,
        parentMeetingId,
        sendInviteToModerators,
        ...flat(breakoutWithoutUrls),
        ...urls,
      },
    };
    const numberAffected = await Breakouts.upsertAsync(selector, modifier);
    if (numberAffected) {
      Logger.info('Updated timeRemaining and externalMeetingId '
          + `for breakout id=${breakoutId}`);
    } else {
      Logger.error(`updating breakout: ${numberAffected}`);
    }
    handleBreakoutRoomsListHist({ body });
  });
}
