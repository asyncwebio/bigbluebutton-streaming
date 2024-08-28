
import Auth from '/imports/ui/services/auth';
import axios from 'axios';

const URL = window.location.origin

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
    } else if (error.response && error.response.status === 502) {
      throw ("Something went wrong, please contact your server administrator.");
    }
    else {
      console.error('inside Error', error.response.status);
      throw new Error('An error occurred');
    }
  }
};

const stopStreaming = async () => {
  try {
    const data = {
      meetingId: Auth._meetingID
    };
    const response = await axios.post(`${URL}/bot/stop`, data, config)
    return response;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      throw (error.response.data.error);
    } else if (error.response && error.response.status === 502) {
      throw ("Something went wrong, please contact your server administrator.");
    }
    else {
      console.error('inside Error', error);
      throw new Error('An error occurred');
    }
  }

}



export {
  startStreaming,
  stopStreaming
};
