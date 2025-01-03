import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_URL}/user`;

export const updateProfile = async (
  user_id: string,
  name: string,
  username: string,
  email: string,
  dob: string | null,
  phone_num: string | null,
  address: string | null
) => {
  try {
    const response = await axios.patch(`${API_URL}/${user_id}`, {
      name,
      username,
      email,
      dob,
      phone_num,
      address,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const changePwd = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await axios.patch(`${API_URL}/change-password`, {
      userId,
      currentPassword,
      newPassword,
    });

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response.data.message) {
      return error.response.data.message;
    }
    console.error("Error updating profile:", error);
    throw error;
  }
};
