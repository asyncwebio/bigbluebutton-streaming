// create express app to handle streming request
const express = require("express")
const Docker = require('dockerode');
const dotenv = require("dotenv");
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
const constructUrl = require('./utils/construct-url')
const xmlToJson = require('./utils/xmltojson')




const app = express();
const docker = new Docker();
dotenv.config();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(express.static('public'));
app.use(cors());


const bbb = {
  host: process.env.BBB_URL,
  salt: process.env.BBB_SECRET,
};


app.post('/bot/start', async (req, res) => {
  try {
    const {
      meetingId,
      hidePresentation,
      rtmpUrl
    } = req.body;

    // get meeting info from bbb 
    const params = {
      meetingID: meetingId,
    }
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const meetingInfo = await axios.get(constructUrl(bbb, 'getMeetingInfo', params), config)

    const info = xmlToJson(meetingInfo.data)

    const attendeePassword = info.response.attendeePW[0];

    const envVariables = {
      MEETING_ID: meetingId,
      ATTENDEE_PW: attendeePassword,
      HIDE_PRESENTATION: hidePresentation,
      RTMP_URL: rtmpUrl
    };

    const image = 'bbb-stream:v1.0';

    let containers = await docker.listContainers({ all: true });
    let streamingContainers = containers.filter(container => container.Image === image);

    if (streamingContainers.length >= process.env.NUMBER_OF_CONCURRENT_STREAMINGS) {
      return res.status(500).json({ error: `Too Many Streams: You've reached the streaming limit. Check back in a while to continue.` });
    }

    const containerName = `bbb-stream-${meetingId}`; // create a unique container name using the meetingId

    const hostConfig = {
      Binds: ['/var/run/docker.sock:/var/run/docker.sock'], // Mount the Docker socket
      AutoRemove: true,
    };

    docker.createContainer(
      {
        Image: image,
        name: containerName,
        Env: Object.entries(envVariables).map(([name, value]) => `${name}=${value}`),
        Tty: false,
        HostConfig: hostConfig,
      },
      (err, container) => {
        if (err) {
          console.error('Error creating container:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        container.start((err) => {
          if (err) {
            console.error('Error starting container:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
          }

          console.log('Stream started successfully');
          return res.status(200).json({ message: 'Stream started successfully' });
        });
      }
    );

  } catch (error) {
    return res.status(500).json({ error });
  }
});


app.post('/bot/stop', async (req, res) => {
  try {
    const {
      meetingId,
    } = req.body;

    const containerName = `bbb-stream-${meetingId}`;
    const container = docker.getContainer(containerName);

    container.remove({ force: true }, function (err) {
      if (err) {
        console.log('Error in stop streaming:', err);
        return res.status(500).json({ error: 'Error in stop streaming' });
      }


      return res.status(200).json({ message: 'Stream stopped successfully' });
    });
  } catch (error) {

  }
})

const server = app.listen(4500, () => {
  console.log("Server running on port 4500");
})
