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
