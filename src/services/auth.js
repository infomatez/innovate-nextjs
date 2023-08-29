import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

export const login = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, { username, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
