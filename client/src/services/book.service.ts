import axios from "axios";

const API_URL = "http://localhost:3000/book";

export const fetchBooks = async (
  page: number,
  from: number,
  to: number,
  title: string
) => {
  const response = await axios.get(`${API_URL}/list`, {
    params: {
      page,
      from,
      to,
      title,
    },
  });
  return response.data;
};
