<div align="center">
 <a href="https://higheredlab.com/" target="_blank"> <img alt="bbb-streaming" width="250" src="/static/hel-general-logo.png"> </a>
</div>
<h1 align="center">BigBlueButton Streaming</h1>
<p align="center">BigBlueButton Streaming - Your free, open-source solution to expand your virtual classrooms to thousands of learners globally. Stream live on YouTube, Facebook, Vimeo, or any RTMP server right from BigBlueButton. No more user limit - teach without boundaries.</p>

<br /><br/>
<img style="width: 100%; height: auto;" src="/static/bigbluebutton-streaming.gif" alt="bigbluebutton-streaming" /> <br/><br/>

<p>Embrace a limitless learning experience with BigBlueButton Streaming, the ultimate solution for your expanding educational needs. Developed as a free open-source software extension, BigBlueButton Streaming allows you to extend your virtual classrooms to thousands of learners around the globe.

Widely recognized as the leading open-source classroom software, BigBlueButton is trusted by countless educational institutions worldwide. However, with a capacity limit of 100 users per class, larger educational sessions became a challenge – until now.

Introducing BigBlueButton Streaming, your key to conducting large-scale, one-time events or regular oversized classes. Seamlessly stream your virtual classes directly from BigBlueButton to platforms such as YouTube, Facebook, Vimeo, or any RTMP server.

It's simple to use - enter the RTMP URL and access key, click on "Start Streaming", and voila! Your class is live and can now reach thousands of students concurrently. This intuitive, user-friendly tool breaks boundaries in digital learning, bringing education closer to those who crave it.

Experience this revolutionary extension today. Unleash the full potential of virtual learning with BigBlueButton Streaming, because education should know no boundaries.</p>

<br/><br/>

## 🗝️ Unlock Limitless Learning: Key Features of BigBlueButton Streaming

1. 📺 **Live Streaming on Multiple Platforms**: Directly stream your classroom to YouTube, Facebook, Vimeo, or any RTMP server, maximizing your reach and availability for students around the world.
2. 🎥 **Ease of Streaming:** Begin live streaming your classes simply by entering the RTMP URL and access key, and pressing "Start Streaming."
3. 🚀 **Large-Scale Class Capacity**: Accommodate thousands of students in a single class, bypassing the original 100 users limit of BigBlueButton.
4. 🔗 **Compatibility with BigBlueButton**: Works directly within BigBlueButton, the widely-adopted virtual classroom software used by many educational institutions globally.
5. 🆓 **Open-Source and Free**: BigBlueButton Streaming is an open-source software extension, available to all users at no cost.

<br/><br/>

## 💡 5 Benefits: Amplify Impact with BigBlueButton Streaming

1. 🌍 **Expanded Reach**: You can now teach thousands of students from various geographical locations simultaneously.
2. 📱 **Increased Accessibility**: With classes being streamed on popular platforms, students can access lessons from devices they already use in their everyday lives.
3. 💰 **Cost-Efficiency**: As a free, open-source software, BigBlueButton Streaming allows educational institutions to reduce costs associated with premium virtual classroom tools.
4. ⏰ **Flexibility and Convenience**: The ability to schedule large classes or one-time events provides flexibility to educators and convenience to learners.
5. 🧩 **Ease of Integration**: Being an extension of the already popular BigBlueButton, integrating this tool into existing educational frameworks is straightforward and hassle-free.

<br/><br/>

## 📋 Requirements

The requirement to install this software is BigBlueButton should be installed.

**Minimum environment requirements**

- BigBlueButton versions ['2.6.10' '2.7.0-beta.2'].
- Docker must be installed on the system to manage containerization and deployment of     BigBlueButton.
- A properly configured and functioning TURN server is necessary for real-time communication and media relay.

<br/><br/>


## 📦 Installation

- Clone the repository.
- Goto `bigbluebutton-streaming/`
- Run install.sh
```bash
git clone https://github.com/AsyncWeb/bigbluebutton-streaming.git

cd bigbluebutton-streaming

bash install.sh
```

> Note: install.sh will restart the bigbluebutton server, please make sure there is no meetings running on the server.

> Make sure to stop streaming before Ending the BigBlueButton session.

<br/>

[📺 Installation Demo](https://bbb1.asyncweb.io/recording/bigbluebutton-streaming-installation.mp4)

<br/>
<br/>

## 🗑️ Uninstallation

- Goto `bigbluebutton-streaming/`.
- run `uninstall.sh`.
```bash
cd bigbluebutton-streaming

bash uninstall.sh
```

<br/><br/>

## 🔎 How it works

1. 🚀 **Node.js App:** The Node.js app start streaming container, serving as a controller for streaming BigBlueButton meetings.

2. 📬 **REST API:** The app exposes a REST API to receive requests for starting and stopping streaming.

3. 🔑 **Environment Variables:** Sensitive data, such as the BigBlueButton URL, secret, and other configurations, are stored in environment variables loaded from a .env file.

4. 🔗 **Puppeteer Integration:** Puppeteer is utilized to launch a headless Chrome browser, enabling programmatic interaction with the BigBlueButton meeting UI. 

5. 🖥️ **Virtual Display:** Xvfb creates a virtual display for Chrome, allowing it to run without a physical display server.

6. 🤝 **Joining the Meeting:** The app configures Puppeteer to join the BigBlueButton meeting as a viewer with specific settings, such as listen-only mode and element visibility.

7. 📼 **Screen Recording:** A child process invokes ffmpeg to record the meeting screen and stream it to a specified RTMP server.

8. ⏹️ **Stop Streaming**: The app waits for the stop streaming or meeting to end and stops the, streaming, ffmpeg process, finalizing the streaming process.
<br /> <br />
<img alt="bbb-streaming"  src="/static/bigbluebutton-streaming-sequence.png"/>

<br/><br/>

## 🚀 <a href="https://higheredlab.com" target="_blank">Ready to Transform Your Online Teaching Experience?</a>

Discover a new era of online learning with HigherEdLab's BigBlueButton hosting service. 

With features ranging from crystal-clear HD video learning to interactive tools such as chat, poll, and presentations, we ensure that your virtual classrooms emulate the dynamic environment of physical ones.

Enjoy the benefits of AI with ChatGPT-powered quizzes and transcriptions that enhance the learning experience. With HigherEdLab, you can customize your virtual learning space with your own domain, logo, and colors to align with your institution's brand identity.

We also offer advanced user management, seamless integration options, and comprehensive analytics to give you complete control over your teaching platform.

Ready to embrace the next level of digital education?

<a href="https://higheredlab.com" target="_blank"><strong>Sign Up</strong></a> Now for HigherEdLab's BigBlueButton Hosting Service and transform the way you teach online.

