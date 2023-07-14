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

const containerName = 'bbb-stream';

app.post('/bot/start', async (req, res) => {
  try {
    const {
      meetingId,
      showPresentation,
      hideUserListAndChat,
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

    const attendiePassword = info.response.attendeePW[0];

    // Replace with your container name
    const envVariables = {
      MEETING_ID: meetingId,
      ATTENDIEE_PW: attendiePassword,
      SHOW_PRESENTATION: showPresentation,
      HIDE_USER_LIST_AND_CHAT: hideUserListAndChat,
      RTMP_URL: rtmpUrl
      // Add more environment variables as needed
    };


    // Check if the container is already running
    docker.listContainers({ all: true }, (err, containers) => {
      if (err) {
        console.error('Error listing containers:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const runningContainer = containers.find(
        (container) => container.Names.includes(`/${containerName}`)
      );

      if (runningContainer) {
        const containerId = runningContainer.Id;
        const containerName = runningContainer.Names[0].replace('/', '');
        console.error(`Container '${containerName}' with ID '${containerId}' is already running`);
        return res.status(500).json({ error: `Container '${containerName}' with ID '${containerId}' is already streaming. You can stream when that streaming ends.` });
      }

      const hostConfig = {
        Binds: ['/var/run/docker.sock:/var/run/docker.sock'], // Mount the Docker socket
      };
      // Create and start the container
      docker.createContainer(
        {
          Image: `${containerName}:v1.0`, // Replace with your container image
          name: containerName,
          Env: Object.entries(envVariables).map(([name, value]) => `${name}=${value}`),
          HostConfig: hostConfig, // Add HostConfig with volume mount
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

            console.log('Container started successfully');
            return res.status(200).json({ message: 'Stream started successfully' });
          });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error })
  }

});

app.get('/bot/stop', async (req, res) => {
  try {
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

const server = app.listen(3000, () => {
  console.log("Server running on port 3000");
})