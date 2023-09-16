import React, { Component } from 'react';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import { injectIntl } from 'react-intl';
import Settings from '/imports/ui/services/settings';
import Styled from './styles';
import { startStreaming } from './service';
import CircularProgress from '@material-ui/core/CircularProgress'
import Toggle from '/imports/ui/components/common/switch/component';

const rtmpURL = Meteor.settings.public.app.rtmpURL;
const streamKey = Meteor.settings.public.app.streamKey;


class StreamingModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      streamUrl: rtmpURL,
      streamKey: streamKey,
      errorMsg: '',
      isLoading: false,
      hidePresentation: false,
    };

    this.renderUrlError = this.renderUrlError.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.startStreamingHandler = this.startStreamingHandler.bind(this);
    this.handlePresentationToggle = this.handlePresentationToggle.bind(this);
  }

  handlePresentationToggle() {
    this.setState({
      ...this.state,
      hidePresentation: !this.state.hidePresentation
    })
  }

  handleChangeInput(ev) {
    const { name, value } = ev.target

    this.setState({
      ...this.state,
      [name]: value,
      errorMsg: ""
    })

  }

  async startStreamingHandler() {
    const {
      closeModal,
      handleStreamingStatus
    } = this.props;
    const { streamUrl, streamKey } = this.state;

    if (!streamUrl && !streamKey) {
      this.setState({
        ...this.state,
        errorMsg: "RTMP URL & Stream Key is required"
      })
    } else if (!streamUrl) {
      this.setState({
        ...this.state,
        errorMsg: "RTMP URL is required"
      })
    } else if (!/^rtmp(s)?:\/\//.test(streamUrl)) {
      this.setState({
        ...this.state,
        errorMsg: "Invalid RTMP URL"
      })

    }
    else if (!streamKey) {
      this.setState({
        ...this.state,
        errorMsg: "Stream Key is required"
      })
    } else {
      try {
        this.setState({
          ...this.state,
          isLoading: true
        })

        const response = await startStreaming(this.state.streamUrl, this.state.streamKey, this.state.hidePresentation)
        if (response.status == 200) {
          handleStreamingStatus()
          closeModal();
        }

      } catch (error) {
        console.error(error)

        this.setState({
          ...this.state,
          errorMsg: error,
          isLoading: false
        })

      }

    }

  }

  renderUrlError() {

    const { animations } = Settings.application;
    return (
      this.state.errorMsg
        ? (
          <Styled.UrlError animations={animations}>
            {this.state.errorMsg}
          </Styled.UrlError>
        )
        : null
    );
  }

  render() {
    const { closeModal } = this.props;
    const { streamUrl, streamKey, sharing, hidePresentation } = this.state;
    const { animations } = Settings.application;



    return (
      <Styled.StreamVideoModal
        onRequestClose={closeModal}
        contentLabel={"Streaming"}
        title={"Start streaming the class"}
      >
        <Styled.Content>
          <Styled.InputBox animations={animations}>
            <label htmlFor="stream-url">
              {"RTMP URL"}
              <input
                id="stream-url"
                onChange={this.handleChangeInput}
                value={streamUrl}
                name="streamUrl"
                placeholder={"RTMP URL from Facebook, YouTube or Vimeo"}
                disabled={sharing}
                onPaste={(e) => { e.stopPropagation(); }}
                onCut={(e) => { e.stopPropagation(); }}
                onCopy={(e) => { e.stopPropagation(); }}
              />
            </label>
            <br />
            <label htmlFor="stream-key">
              {"Stream Key"}
              <input
                id="stream-key"
                onChange={this.handleChangeInput}
                value={streamKey}
                name="streamKey"
                placeholder={"stream key from Facebook, YouTube or Vimeo"}
                disabled={sharing}
                onPaste={(e) => { e.stopPropagation(); }}
                onCut={(e) => { e.stopPropagation(); }}
                onCopy={(e) => { e.stopPropagation(); }}
              />
            </label>
          </Styled.InputBox>

          <div>
            <Styled.Toggle>
              {"Hide Presentation"} &nbsp;&nbsp;
              <Toggle
                icons={false}
                defaultChecked={hidePresentation}
                onChange={() => this.handlePresentationToggle()}
                ariaLabel={hidePresentation ? "Hide Presentation" : "Show Presentation"}
                showToggleLabel={false}
                data-test="hidePresentationToggle"
              />

            </Styled.Toggle>
          </div>

          <div>
            {this.renderUrlError()}
          </div>
          {
            this.state.isLoading ? <Styled.Loader><CircularProgress /></Styled.Loader> : <Styled.StartButton
              label={"Start Streaming"}
              onClick={this.startStreamingHandler}
              // disabled={startDisabled}
              data-test="startNewVideo"
              color="primary"
            />
          }

        </Styled.Content>
      </Styled.StreamVideoModal>
    );
  }
}

export default injectIntl(withModalMounter(StreamingModal));
