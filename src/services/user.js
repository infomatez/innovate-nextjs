import axios from 'axios';
const API_BASE_URL = process.env.API_BASE_URL;

export const getUserProfile = async (accessToken) => {
  try {
      const response = await axios({
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/user/getUserProfile`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const editUserProfile = async (accessToken, dataToUpdate) => {
    console.log("2343431------------------",dataToUpdate);
    try {
      const response = await axios({
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        data: dataToUpdate, 
        url:  `${API_BASE_URL}/auth/editUserProfile`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  