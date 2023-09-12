import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

export const login = async (username:string, email:string, password:string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (username:string, email:string, password:string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (accessToken:string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
