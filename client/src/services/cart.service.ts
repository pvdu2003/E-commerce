import axios from "axios";

const API_URL = "http://localhost:3000/cart";

export const fetchCartDetail = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
