import axios from 'axios';
const API_BASE_URL = process.env.API_BASE_URL;

export const getAllHofData = async (accessToken: string | null) => {
  try {
    const response = await axios({
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      url: `${API_BASE_URL}/hof/getAllHof`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserAllNotifications = async (accessToken: string | undefined) => {
  try {
    const response = await axios({
      method: 'get',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      url: `${API_BASE_URL}/notification/userAllNotification`,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
