import axios from "axios";

const API_URL = "http://localhost:3000/cart";

export const fetchCartDetail = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
export const addToCart = async (
  user_id: string,
  book_id: string,
  publisher: string,
  quantity: number
) => {
  const response = await axios.post(`${API_URL}/${user_id}`, {
    book_id,
    publisher,
    quantity,
  });
  return response.data;
};
