import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import browserInfo from '/imports/utils/browserInfo';
import VideoService from '/imports/ui/components/video-provider/service';
import FullscreenService from '/imports/ui/components/common/fullscreen-button/service';
import BBBMenu from '/imports/ui/components/common/menu/component';
import PropTypes from 'prop-types';
import Styled from './styles';
import Auth from '/imports/ui/services/auth';
import { notify } from '/imports/ui/services/notification';

const intlMessages = defineMessages({
  focusLabel: {
    id: 'app.videoDock.webcamFocusLabel',
  },
  focusDesc: {
    id: 'app.videoDock.webcamFocusDesc',
  },
  unfocusLabel: {
    id: 'app.videoDock.webcamUnfocusLabel',
  },
  unfocusDesc: {
    id: 'app.videoDock.webcamUnfocusDesc',
  },
  pinLabel: {
    id: 'app.videoDock.webcamPinLabel',
  },
  unpinLabel: {
    id: 'app.videoDock.webcamUnpinLabel',
  },
  disableLabel: {
    id: 'app.videoDock.webcamDisableLabel',
  },
  enableLabel: {
    id: 'app.videoDock.webcamEnableLabel',
  },
  pinDesc: {
    id: 'app.videoDock.webcamPinDesc',
  },
  unpinDesc: {
    id: 'app.videoDock.webcamUnpinDesc',
  },
  mirrorLabel: {
    id: 'app.videoDock.webcamMirrorLabel',
  },
  mirrorDesc: {
    id: 'app.videoDock.webcamMirrorDesc',
  },
  fullscreenLabel: {
    id: 'app.videoDock.webcamFullscreenLabel',
    description: 'Make fullscreen option label',
  },
  squeezedLabel: {
    id: 'app.videoDock.webcamSqueezedButtonLabel',
    description: 'User selected webcam squeezed options',
  },
  disableDesc: {
    id: 'app.videoDock.webcamDisableDesc',
  },
  disableWarning: {
    id: 'app.videoDock.webcamDisableWarning',
  },
});

const UserActions = (props) => {
  const {
    name, cameraId, numOfStreams, onHandleVideoFocus, user, focused, onHandleMirror,
    isVideoSqueezed, videoContainer, isRTL, isStream, isSelfViewDisabled,
  } = props;

  const intl = useIntl();
  const enableVideoMenu = Meteor.settings.public.kurento.enableVideoMenu || false;
  const { isFirefox } = browserInfo;

  const getAvailableActions = () => {
    const pinned = user?.pin;
    const userId = user?.userId;
    const isPinnedIntlKey = !pinned ? 'pin' : 'unpin';
    const isFocusedIntlKey = !focused ? 'focus' : 'unfocus';
    const disabledCams = Session.get('disabledCams') || [];
    const isCameraDisabled = disabledCams && disabledCams?.includes(cameraId);
    const enableSelfCamIntlKey = !isCameraDisabled ? 'disable' : 'enable';

    const menuItems = [];

    const toggleDisableCam = () => {
      if (!isCameraDisabled) {
        Session.set('disabledCams', [...disabledCams, cameraId]);
        notify(intl.formatMessage(intlMessages.disableWarning), 'info', 'warning');
      } else {
        Session.set('disabledCams', disabledCams.filter((cId) => cId !== cameraId));
      }
    };

    if (isVideoSqueezed) {
      menuItems.push({
        key: `${cameraId}-name`,
        label: name,
        description: name,
        onClick: () => { },
        disabled: true,
      });

      if (isStream) {
        menuItems.push(
          {
            key: `${cameraId}-fullscreen`,
            label: intl.formatMessage(intlMessages.fullscreenLabel),
            description: intl.formatMessage(intlMessages.fullscreenLabel),
            onClick: () => FullscreenService.toggleFullScreen(videoContainer.current),
          },
        );
      }
    }
    if (userId === Auth.userID && isStream && !isSelfViewDisabled) {
      menuItems.push({
        key: `${cameraId}-disable`,
        label: intl.formatMessage(intlMessages[`${enableSelfCamIntlKey}Label`]),
        description: intl.formatMessage(intlMessages[`${enableSelfCamIntlKey}Label`]),
        onClick: () => toggleDisableCam(cameraId),
        dataTest: 'selfViewDisableBtn',
      });
    }

    if (isStream) {
      menuItems.push({
        key: `${cameraId}-mirror`,
        label: intl.formatMessage(intlMessages.mirrorLabel),
        description: intl.formatMessage(intlMessages.mirrorDesc),
        onClick: () => onHandleMirror(cameraId),
        dataTest: 'mirrorWebcamBtn',
      });
    }

    if (numOfStreams > 2 && isStream) {
      menuItems.push({
        key: `${cameraId}-focus`,
        label: intl.formatMessage(intlMessages[`${isFocusedIntlKey}Label`]),
        description: intl.formatMessage(intlMessages[`${isFocusedIntlKey}Desc`]),
        onClick: () => onHandleVideoFocus(cameraId),
        dataTest: 'FocusWebcamBtn',
      });
    }

    if (VideoService.isVideoPinEnabledForCurrentUser() && isStream) {
      menuItems.push({
        key: `${cameraId}-pin`,
        label: intl.formatMessage(intlMessages[`${isPinnedIntlKey}Label`]),
        description: intl.formatMessage(intlMessages[`${isPinnedIntlKey}Desc`]),
        onClick: () => VideoService.toggleVideoPin(userId, pinned),
        dataTest: 'pinWebcamBtn',
      });
    }

    return menuItems;
  };

  const renderSqueezedButton = () => (
    <Styled.MenuWrapperSqueezed>
      <BBBMenu
        trigger={(
          <Styled.OptionsButton
            label={intl.formatMessage(intlMessages.squeezedLabel)}
            aria-label={`${name} ${intl.formatMessage(intlMessages.squeezedLabel)}`}
            data-test="webcamOptionsMenuSqueezed"
            icon="device_list_selector"
            ghost
            color="primary"
            hideLabel
            size="sm"
            onClick={() => null}
          />
        )}
        actions={getAvailableActions()}
      />
    </Styled.MenuWrapperSqueezed>
  );

  const renderDefaultButton = () => (
    <Styled.MenuWrapper>
      {enableVideoMenu && getAvailableActions().length >= 1
        ? (
          <BBBMenu
            trigger={(
              <Styled.DropdownTrigger
                tabIndex={0}
                data-test="dropdownWebcamButton"
                isRTL={isRTL}
              >
                {name}
              </Styled.DropdownTrigger>
            )}
            actions={getAvailableActions()}
            opts={{
              id: `webcam-${user?.userId}-dropdown-menu`,
              keepMounted: true,
              transitionDuration: 0,
              elevation: 3,
              getcontentanchorel: null,
              fullwidth: 'true',
              anchorOrigin: { vertical: 'bottom', horizontal: isRTL ? 'right' : 'left' },
              transformOrigin: { vertical: 'top', horizontal: isRTL ? 'right' : 'left' },
            }}
          />
        )
        : (
          <Styled.Dropdown isFirefox={isFirefox}>
            <Styled.UserName noMenu={numOfStreams < 3}>
              {name}
            </Styled.UserName>
          </Styled.Dropdown>
        )}
    </Styled.MenuWrapper>
  );

  return (
    isVideoSqueezed
      ? renderSqueezedButton()
      : renderDefaultButton()
  );
};

export default UserActions;

UserActions.defaultProps = {
  focused: false,
  isVideoSqueezed: false,
  videoContainer: () => { },
  onHandleVideoFocus: () => {},
};

UserActions.propTypes = {
  name: PropTypes.string.isRequired,
  cameraId: PropTypes.string.isRequired,
  numOfStreams: PropTypes.number.isRequired,
  onHandleVideoFocus: PropTypes.func,
  user: PropTypes.shape({
    pin: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  focused: PropTypes.bool,
  isVideoSqueezed: PropTypes.bool,
  videoContainer: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  onHandleMirror: PropTypes.func.isRequired,
  onHandleDisableCam: PropTypes.func.isRequired,
};
