
import Auth from '/imports/ui/services/auth';
import axios from 'axios';

const URL = 'http://localhost:4000'

const config = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

const startStreaming = async (streamUrl, streamKey) => {
  try {
    const data = {
      meetingId: Auth._meetingID,
      showPresentation: true,
      hideUserListAndChat: false,
      rtmpUrl: `${streamUrl}/${streamKey}`
    };

    const response = await axios.post(`${URL}/bot/start`, data, config);

    return response;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      throw (error.response.data.error);
    } else {
      console.error('inside Error', error.message);
      throw new Error('An error occurred');
    }
  }
};

const stopStreaming = async () => {
  try {
    const response = await axios.get(`${URL}/bot/stop`, config)
    return response;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      throw (error.response.data.error);
    } else {
      console.error('inside Error', error.message);
      throw new Error('An error occurred');
    }
  }

}



export {
  startStreaming,
  stopStreaming
};
