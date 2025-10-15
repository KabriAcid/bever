import axios from "axios";

const API_BASE_URL = "/api/auth";

interface User {
  id: string;
  businessName: string;
  businessAddress: string;
  ward: string;
  subArea?: string;
  customerCategory:
    | "Office"
    | "Provision Store"
    | "Home"
    | "Retailer"
    | "Wholesaler"
    | "Restaurant"
    | "Hotel"
    | "Supermarket";
  phoneNumber: string;
  beverCode: string;
  verificationStatus: "Pending" | "Verified" | "Agent Visit";
  shopPhoto?: string;
  avatar?: string;
  coverPhoto?: string;
  createdAt: Date;
  hasPin: boolean;
}

export const loginUser = async (
  identifier: string,
  password: string
): Promise<{ user: User }> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      identifier,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

export const verifyToken = async (): Promise<{ valid: boolean }> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verify`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "An error occurred" };
  }
};

export const logoutUser = async (): Promise<{ success: boolean }> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "An error occurred" };
  }
};
