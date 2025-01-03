import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_URL}/book`;

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

export const fetchBookDetail = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
