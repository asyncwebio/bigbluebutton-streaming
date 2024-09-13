import { check } from 'meteor/check';
import addPresentation from '../modifiers/addPresentation';

export default async function handlePresentationAdded({ body }, meetingId) {
  check(body, Object);

  const { presentation, podId } = body;

  check(meetingId, String);
  check(podId, String);
  check(presentation, Object);

  await addPresentation(meetingId, podId, presentation);
}
