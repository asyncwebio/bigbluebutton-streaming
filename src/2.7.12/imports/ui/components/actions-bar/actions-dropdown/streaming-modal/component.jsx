import React, { Component } from 'react';
import Settings from '/imports/ui/services/settings';
import Styled from './styles';
import { startStreaming } from './service';
import CircularProgress from '@material-ui/core/CircularProgress'



class StreamingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streamUrl: '',
      streamKey: '',
      errorMsg: '',
      isLoading: false,
    };

    this.renderUrlError = this.renderUrlError.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.startStreamingHandler = this.startStreamingHandler.bind(this);
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
      handleStreamingStatus,
      setIsOpen,
      callbackToClose
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

        const response = await startStreaming(this.state.streamUrl, this.state.streamKey)
        if (response.status == 200) {
          handleStreamingStatus();
          callbackToClose();
          setIsOpen(false);
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
    const { setIsOpen, isOpen, onRequestClose, priority, } = this.props;
    const { animations } = Settings.application;



    return (
      <Styled.StreamVideoModal
        onRequestClose={() => setIsOpen(false)}
        contentLabel={"Streaming"}
        title={"Start streaming the class"}
        {...{
          isOpen,
          priority,
        }}
      >
        <Styled.Content>
          <Styled.InputBox animations={animations}>
            <label htmlFor="stream-url">
              {"RTMP URL"}
              <input
                autoFocus
                id="stream-url"
                onChange={this.handleChangeInput}
                name="streamUrl"
                placeholder={"RTMP URL from Facebook, YouTube or Vimeo"}
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
                name="streamKey"
                placeholder={"stream key from Facebook, YouTube or Vimeo"}
                onPaste={(e) => { e.stopPropagation(); }}
                onCut={(e) => { e.stopPropagation(); }}
                onCopy={(e) => { e.stopPropagation(); }}
              />
            </label>
          </Styled.InputBox>

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

export default StreamingModal;
