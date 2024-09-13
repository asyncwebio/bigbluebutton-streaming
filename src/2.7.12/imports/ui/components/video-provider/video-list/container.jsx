import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import VideoList from '/imports/ui/components/video-provider/video-list/component';
import VideoService from '/imports/ui/components/video-provider/service';
import { layoutSelect, layoutSelectOutput, layoutDispatch } from '../../layout/context';
import Users from '/imports/api/users';

const VideoListContainer = ({ children, ...props }) => {
  const layoutType = layoutSelect((i) => i.layoutType);
  const cameraDock = layoutSelectOutput((i) => i.cameraDock);
  const layoutContextDispatch = layoutDispatch();
  const { streams } = props;

  return (
    !streams.length
      ? null
      : (
        <VideoList {...{
          layoutType,
          cameraDock,
          layoutContextDispatch,
          ...props,
        }}
        >
          {children}
        </VideoList>
      )
  );
};

export default withTracker((props) => {
  const { streams } = props;

  return {
    ...props,
    numberOfPages: VideoService.getNumberOfPages(),
    streams: streams.filter((stream) => Users.findOne({ userId: stream.userId },
      {
        fields: {
          userId: 1,
        },
      })),
  };
})(VideoListContainer);
