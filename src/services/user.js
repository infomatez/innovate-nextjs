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
    try {
      const response = await axios({
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        data: dataToUpdate, 
        url:  `${API_BASE_URL}/auth/editUserProfile`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  


  export const getUserFollowers = async (accessToken, userId) => {
    try {
      const response = await axios({
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/user/getUserFollowers?user_id=64949a69b99dd039cf4581d3`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const getUserFollowing = async (accessToken, userId) => {
    try {
      const response = await axios({
        method: 'get',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/user/getUserFollowing?user_id=${userId}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const unfollowUser = async (accessToken, toUserId) => {
    try {
      const response = await axios({
        method: 'put',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/user/unFollowUser?to_user_id=${toUserId}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  export const followUser = async (accessToken, toUserId) => {
    try {
      const response = await axios({
        method: 'put',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        url: `${API_BASE_URL}/user/followUser?to_user_id=${toUserId}`,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };