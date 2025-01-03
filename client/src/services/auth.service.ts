import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;
// const api = axios.create({
//     baseURL: 'http://localhost:3001', // Your NestJS API URL
//     withCredentials: true, // Include cookies in requests
//   });
// const API = (token) =>
//   axios.create({
//     // eslint-disable-next-line no-undef
//     baseURL: API_URL,
//     headers: { Authorization: `Bearer ${token}` },
//   });
export const register = async (
  username: string,
  email: string,
  password: string,
  name: string,
  gender: string,
  phone_num?: string,
  address?: string,
  dob?: string
) => {
  console.log({
    username,
    email,
    password,
    name,
    phone_num,
    address,
    gender,
    dob,
  });
  try {
    const resp = await axios.post(API_URL + "/auth/signup", {
      username,
      email,
      password,
      name,
      phone_num,
      address,
      gender,
      dob,
    });
    console.log(resp.data);
    return resp.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: error.response.status,
      };
    } else {
      console.error(error);
    }
  }
};

export const login = async (username: string, password: string) => {
  try {
    const resp = await axios.post(API_URL + "/auth/signin", {
      username,
      password,
    });
    console.log(resp);

    return resp.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: error.response.status,
      };
    } else {
      console.error(error);
    }
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
