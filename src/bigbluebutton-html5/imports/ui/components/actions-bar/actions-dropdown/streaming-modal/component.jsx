import React, { Component } from 'react';
import { withModalMounter } from '/imports/ui/components/common/modal/service';
import { defineMessages, injectIntl } from 'react-intl';
import Settings from '/imports/ui/services/settings';
import Styled from './styles';
import { startStreaming } from './service';


class StreamingModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streamUrl:'',
      streamKey:'',
      errorMsg:'',
    };

    
    this.renderUrlError = this.renderUrlError.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.startStreamingHandler = this.startStreamingHandler.bind(this);
  }

 
 async startStreamingHandler(){
    const {
      closeModal,
      handleStreamingStatus
    }=this.props;
    const {streamUrl,streamKey} = this.state;
   
    if(!streamUrl&&!streamKey){
      this.setState({
        ...this.state,
        errorMsg:"Both input fields are required"
      })
    }else if(!streamUrl){
      this.setState({
        ...this.state,
        errorMsg:"RTMP URL is required"
      })
    }else if(!streamKey){
      this.setState({
        ...this.state,
        errorMsg:"Stream Key is required"
      })
    }else{
      try {
      const response= await startStreaming(this.state.streamUrl,this.state.streamKey)
      if(response.status == 200){
        handleStreamingStatus()
        closeModal();
      }
     
      } catch (error) {
        console.error(error)
      this.setState({
        ...this.state,
        errorMsg:error
      }) 
      }
      
    }
   
  }

  

  handleChangeInput(ev){
    const {name, value} = ev.target
    
    this.setState({
      ...this.state,
      [name]:value,
      errorMsg:""
    })

  }
  

  renderUrlError() {
    
    const { animations } = Settings.application;
    return (
      this.state.errorMsg
        ? (
          <Styled.UrlError animations={animations}>
           { this.state.errorMsg}
          </Styled.UrlError>
        )
        : null
    );
  }

  render() {
    const {  closeModal } = this.props;
    const { url, sharing } = this.state;
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
                autoFocus
                id="stream-url"
                onChange={this.handleChangeInput}
                name="streamUrl"
                placeholder={"RTMP URL from Facebook, YouTube or Vimeo"}
                disabled={sharing}
                onPaste={(e) => { e.stopPropagation(); }}
                onCut={(e) => { e.stopPropagation(); }}
                onCopy={(e) => { e.stopPropagation(); }}
              />
            </label>
            <br/>
            <label htmlFor="stream-key">
              {"Stream Key"}
              <input
                id="stream-key"
                onChange={this.handleChangeInput}
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
            {this.renderUrlError()}
          </div>

          <Styled.StartButton
            label={"Start Streaming"}
            onClick={this.startStreamingHandler}
            // disabled={startDisabled}
            data-test="startNewVideo"
            color="primary"
          />
        </Styled.Content>
      </Styled.StreamVideoModal>
    );
  }
}

export default injectIntl(withModalMounter(StreamingModal));
