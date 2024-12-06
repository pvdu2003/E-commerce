import axios from "axios";

const API_URL = "http://localhost:3000";

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
