import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_URL}/cart`;

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

export const updateCart = async (
  user_id: string,
  bookId: string,
  publisher: string,
  quantity: number
) => {
  console.log(user_id, bookId, publisher, quantity);

  await axios.patch(`${API_URL}/update/${user_id}`, {
    bookId,
    publisher,
    quantity,
  });
};
