<div align="center">
   <img alt="bbb-streaming" width="250" src="https://higheredlab.com/wp-content/uploads/hel-logo.png">
</div>
<h1 align="center">BigBlueButton Streaming</h1>
<p align="center">Live streaming of BigBlueButton made easy.</p>
<p align="center">This free application will enables Quick setup and Easy streaming.</p>

<br />
<img style="width: 100%; height: auto;" src="/static/bigbluebutton-streaming.gif" alt="bigbluebutton-streaming" /> <br/><br/>

## ⏳ Installation

- Clone the respository.
- Goto `bigbluebutton-streaming/streaming-server/`
- Add `.env` file.
 ```bash
BBB_URL=<BigBlueButton URL>
BBB_SECRET=<BigBlueButton secret>
IMAGE_NAME=bbb-stream
```
> Note: Please keep it IMAGE_NAME=bbb-stream as it is.
- Goto `bigbluebutton-streaming/`
- run install .sh

> Note: install.sh will restart the bigbluebutton server, please make sure there is no meetings running on the server.
