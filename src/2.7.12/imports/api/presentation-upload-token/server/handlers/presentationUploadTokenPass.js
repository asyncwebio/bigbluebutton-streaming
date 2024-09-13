import { check } from 'meteor/check';
import Logger from '/imports/startup/server/logger';
import PresentationUploadToken from '/imports/api/presentation-upload-token';

export default async function handlePresentationUploadTokenPass({ body, header }, meetingId) {
  check(body, Object);

  const { userId } = header;
  const { podId, authzToken, filename, temporaryPresentationId } = body;

  check(userId, String);
  check(podId, String);
  check(authzToken, String);
  check(filename, String);
  check(temporaryPresentationId, String)

  const selector = {
    meetingId,
    podId,
    userId,
    filename,
    temporaryPresentationId,
  };

  const modifier = {
    meetingId,
    podId,
    userId,
    filename,
    authzToken,
    temporaryPresentationId,
    failed: false,
    used: false,
  };

  try {
    const { insertedId } = await PresentationUploadToken.upsertAsync(selector, modifier);

    if (insertedId) {
      Logger.info(`Inserting presentationToken filename=${filename} podId=${podId} meeting=${meetingId}`);
    }
  } catch (err) {
    Logger.error(`Inserting presentationToken from collection: ${err}`);
  }
}
