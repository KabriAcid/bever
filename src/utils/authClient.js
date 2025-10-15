import axios from "axios";

const API_BASE_URL = "/api/auth";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

export const verifyToken = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verify`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

export const logoutUser = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "An error occurred" };
  }
};
