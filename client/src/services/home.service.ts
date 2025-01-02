import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

export const fetchHotBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/home`);
    return response.data.topBooksPerCategory;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An error occurred"
    );
  }
};
